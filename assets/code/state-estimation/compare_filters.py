"""
Compare KF / EKF / UKF / H-infinity on pitch estimation for a wheeled-bipedal
robot (WBR), modelled as a nonlinear inverted pendulum.

State x = [theta, omega]  (pitch [rad], pitch rate [rad/s])
Dynamics    theta_ddot = a*sin(theta) - c*omega + b*u + d(t) + w
Measurement y1 = sin(theta) + v1     (accelerometer, tilt channel, normalised by g)
            y2 = omega + bias + v2   (gyroscope)

Run:    python compare_filters.py
Output: figures + LaTeX tables + JSON in ./report/ (next to filter_comparison.tex)
"""
import json
import os
import time

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "report")

SEED = 20261103
DT = 0.01
T_END = 8.0
N_STEPS = int(round(T_END / DT))
N_RUNS = 60          # Monte-Carlo runs per scenario
N_RUNS_SWEEP = 30    # Monte-Carlo runs for the gamma sweep
T_SKIP = 0.5         # skip the initial transient when computing RMSE [s]
GAMMA_FACTOR = 2.0   # gamma = GAMMA_FACTOR * gamma_min (chosen in advance, not tuned)

# ----------------------------------------------------------------------------
# Model
# ----------------------------------------------------------------------------
A_TRUE, B_TRUE, C_TRUE = 30.0, 20.0, 0.5   # (g/l)_eff, torque gain, viscous friction
K_FB = np.array([4.0, 1.0])                # state feedback that generates the true trajectory
QC = 2.0                                   # continuous process-noise intensity [(rad/s^2)^2 s]
SIG_ACC, SIG_GYRO = 0.05, 0.02             # measurement standard deviations
R_MAT = np.diag([SIG_ACC ** 2, SIG_GYRO ** 2])
Q_MAT = QC * np.array([[DT ** 3 / 3, DT ** 2 / 2], [DT ** 2 / 2, DT]])
P0_MAT = np.diag([0.2 ** 2, 0.2 ** 2])
I2 = np.eye(2)


class Pendulum:
    """Discrete nonlinear model (RK4) used for the truth, EKF, UKF and H-inf."""

    def __init__(self, a, b, c):
        self.a, self.b, self.c = a, b, c

    def _fc(self, x, u):
        return np.stack([x[..., 1],
                         self.a * np.sin(x[..., 0]) - self.c * x[..., 1] + self.b * u], axis=-1)

    def f(self, x, u):
        k1 = self._fc(x, u)
        k2 = self._fc(x + 0.5 * DT * k1, u)
        k3 = self._fc(x + 0.5 * DT * k2, u)
        k4 = self._fc(x + DT * k3, u)
        return x + DT / 6 * (k1 + 2 * k2 + 2 * k3 + k4)

    def Fjac(self, x, u=0.0):
        A = np.array([[0.0, 1.0], [self.a * np.cos(x[0]), -self.c]])
        return I2 + DT * A + 0.5 * DT ** 2 * A @ A

    def h(self, x):
        return np.stack([np.sin(x[..., 0]), x[..., 1]], axis=-1)

    def Hjac(self, x):
        return np.array([[np.cos(x[0]), 0.0], [0.0, 1.0]])


class LinearModel:
    """x+ = F x + B u, y = H x (linearised at the origin, or a linear model for the sanity checks)."""

    def __init__(self, F, B, H):
        self.F, self.B, self.H = F, B, H

    def f(self, x, u):
        return x @ self.F.T + self.B * u

    def h(self, x):
        return x @ self.H.T

    def Fjac(self, x, u=0.0):
        return self.F

    def Hjac(self, x):
        return self.H


def linearize_at_origin(a, b, c):
    A = np.array([[0.0, 1.0], [a, -c]])
    F = I2 + DT * A + 0.5 * DT ** 2 * A @ A
    Bd = (DT * I2 + 0.5 * DT ** 2 * A + DT ** 3 / 6 * A @ A) @ np.array([0.0, b])
    return LinearModel(F, Bd, I2.copy())


# ----------------------------------------------------------------------------
# The filters
# ----------------------------------------------------------------------------
class KF:
    """Linear Kalman filter, Joseph form. Use with LinearModel."""
    name = "KF"

    def __init__(self, m, Q, R, x0, P0):
        self.m, self.Q, self.R, self.x, self.P = m, Q, R, x0.copy(), P0.copy()

    def step(self, u, y):
        m = self.m
        x = m.F @ self.x + m.B * u
        P = m.F @ self.P @ m.F.T + self.Q
        H = m.H
        S = H @ P @ H.T + self.R
        K = P @ H.T @ np.linalg.inv(S)
        J = I2 - K @ H
        self.x = x + K @ (y - H @ x)
        self.P = J @ P @ J.T + K @ self.R @ K.T
        return self.x


class EKF:
    """Extended Kalman filter: Jacobians at the current estimate."""
    name = "EKF"

    def __init__(self, m, Q, R, x0, P0):
        self.m, self.Q, self.R, self.x, self.P = m, Q, R, x0.copy(), P0.copy()

    def step(self, u, y):
        m = self.m
        F = m.Fjac(self.x, u)
        x = m.f(self.x, u)
        P = F @ self.P @ F.T + self.Q
        H = m.Hjac(x)
        S = H @ P @ H.T + self.R
        K = P @ H.T @ np.linalg.inv(S)
        J = I2 - K @ H
        self.x = x + K @ (y - m.h(x))
        self.P = J @ P @ J.T + K @ self.R @ K.T
        return self.x


class UKF:
    """Unscented Kalman filter (Merwe scaled sigma points), additive noise."""
    name = "UKF"

    def __init__(self, m, Q, R, x0, P0, alpha=1.0, beta=2.0, kappa=None):
        n = 2
        kappa = 3 - n if kappa is None else kappa
        self.n, self.lam = n, alpha ** 2 * (n + kappa) - n
        self.Wm = np.full(2 * n + 1, 0.5 / (n + self.lam))
        self.Wc = self.Wm.copy()
        self.Wm[0] = self.lam / (n + self.lam)
        self.Wc[0] = self.Wm[0] + 1 - alpha ** 2 + beta
        self.m, self.Q, self.R, self.x, self.P = m, Q, R, x0.copy(), P0.copy()

    def _sigma(self, x, P):
        S = np.linalg.cholesky((self.n + self.lam) * P)
        return np.vstack([x, x + S.T, x - S.T])          # (2n+1, n)

    def step(self, u, y):
        m, Wm, Wc = self.m, self.Wm, self.Wc
        X = m.f(self._sigma(self.x, self.P), u)
        x = Wm @ X
        dX = X - x
        P = (dX.T * Wc) @ dX + self.Q
        X2 = self._sigma(x, P)
        Z = m.h(X2)
        z = Wm @ Z
        dX2, dZ = X2 - x, Z - z
        S = (dZ.T * Wc) @ dZ + self.R
        C = (dX2.T * Wc) @ dZ
        K = C @ np.linalg.inv(S)
        self.x = x + K @ (y - z)
        self.P = P - K @ S @ K.T
        self.P = 0.5 * (self.P + self.P.T)
        return self.x


class HInf:
    """H-vo-cung (Simon, game-theoretic), L = S = I, dang mo rong (Jacobian tai uoc luong).
       P_tilde = (P^-1 - gamma^-2 I + H^T R^-1 H)^-1,  K = P_tilde H^T R^-1.
       Dieu kien ton tai: P^-1 - gamma^-2 I + H^T R^-1 H > 0 (kiem tra moi buoc)."""
    name = "H∞"

    def __init__(self, m, Q, R, x0, P0, gamma):
        self.m, self.Q, self.R, self.x, self.P = m, Q, R, x0.copy(), P0.copy()
        self.theta = 1.0 / gamma ** 2
        self.Ri = np.linalg.inv(R)
        self.min_eig = np.inf

    def step(self, u, y):
        m = self.m
        F = m.Fjac(self.x, u)
        x = m.f(self.x, u)
        P = F @ self.P @ F.T + self.Q                        # P- (prior)
        H = m.Hjac(x)
        M = np.linalg.inv(P) - self.theta * I2 + H.T @ self.Ri @ H
        lam_min = np.linalg.eigvalsh(0.5 * (M + M.T))[0]
        self.min_eig = min(self.min_eig, lam_min)
        if lam_min <= 0:
            raise RuntimeError("Dieu kien ton tai H-inf bi vi pham: gamma qua nho")
        Pt = np.linalg.inv(M)
        K = Pt @ H.T @ self.Ri
        self.x = x + K @ (y - m.h(x))
        self.P = 0.5 * (Pt + Pt.T)
        return self.x


# ----------------------------------------------------------------------------
# Scenarios
# ----------------------------------------------------------------------------
SCENARIOS = {
    "A": dict(title="A: nominal, small angle", push=12.0, theta0=0.05,
              filt=(A_TRUE, B_TRUE, C_TRUE), bias=0.0, eps=0.0),
    "B": dict(title="B: large angle, no push (pure nonlinearity)", push=0.0, theta0=0.8,
              filt=(A_TRUE, B_TRUE, C_TRUE), bias=0.0, eps=0.0),
    "C": dict(title="C: model mismatch + gyro bias", push=12.0, theta0=0.05,
              filt=(1.3 * A_TRUE, 0.7 * B_TRUE, C_TRUE), bias=0.05, eps=0.0),
    "D": dict(title="D: heavy-tailed measurement noise", push=12.0, theta0=0.05,
              filt=(A_TRUE, B_TRUE, C_TRUE), bias=0.0, eps=0.05),
    "E": dict(title="E: large angle + strong unmodelled push", push=180.0, theta0=0.6,
              filt=(A_TRUE, B_TRUE, C_TRUE), bias=0.0, eps=0.0),
}
OUTLIER_SCALE = 15.0


def disturbance(k):
    """External push (unknown to the filters) at t = 1, 3, 5, 7 s, alternating sign, 0.1 s long."""
    t = k * DT
    for i, t0 in enumerate((1.0, 3.0, 5.0, 7.0)):
        if t0 <= t < t0 + 0.1:
            return (1 if i % 2 == 0 else -1)
    return 0.0


def generate_run(scn, rng):
    p = SCENARIOS[scn]
    truth = Pendulum(A_TRUE, B_TRUE, C_TRUE)
    Lq = np.linalg.cholesky(Q_MAT)
    x = np.array([p["theta0"], 0.0])
    X = np.empty((N_STEPS + 1, 2))
    U = np.empty(N_STEPS)
    Y = np.empty((N_STEPS, 2))
    X[0] = x
    for k in range(N_STEPS):
        u = -K_FB @ x
        U[k] = u
        # the push acts as an angular acceleration d*push [rad/s^2], integrated over one step
        xn = truth.f(x, u) + np.array([0.0, p["push"] * disturbance(k) * DT]) + Lq @ rng.standard_normal(2)
        x = xn
        X[k + 1] = x
        s = np.array([SIG_ACC, SIG_GYRO])
        v = rng.standard_normal(2) * s
        if p["eps"] > 0 and rng.random() < p["eps"]:
            v[0] = rng.standard_normal() * SIG_ACC * OUTLIER_SCALE
        Y[k] = truth.h(x) + v + np.array([0.0, p["bias"]])
    x0hat = X[0] + np.linalg.cholesky(P0_MAT) @ rng.standard_normal(2)
    return dict(X=X, U=U, Y=Y, x0hat=x0hat)


def build_filters(scn, run, gamma):
    a, b, c = SCENARIOS[scn]["filt"]
    nl = Pendulum(a, b, c)
    lin = linearize_at_origin(a, b, c)
    x0, P0 = run["x0hat"], P0_MAT
    return [KF(lin, Q_MAT, R_MAT, x0, P0),
            EKF(nl, Q_MAT, R_MAT, x0, P0),
            UKF(nl, Q_MAT, R_MAT, x0, P0),
            HInf(nl, Q_MAT, R_MAT, x0, P0, gamma)]


def run_filter(flt, run):
    """Return (xhat, nees, run time per step)."""
    X, U, Y = run["X"], run["U"], run["Y"]
    xh = np.empty((N_STEPS, 2))
    nees = np.full(N_STEPS, np.nan)
    dt_total = 0.0
    for k in range(N_STEPS):
        t0 = time.perf_counter()
        xh[k] = flt.step(U[k], Y[k])
        dt_total += time.perf_counter() - t0          # only step() is timed
        if not isinstance(flt, HInf):
            e = X[k + 1] - xh[k]
            nees[k] = e @ np.linalg.solve(flt.P, e)
    return xh, nees, dt_total / N_STEPS


# ----------------------------------------------------------------------------
# gamma_min search (H-inf existence condition)
# ----------------------------------------------------------------------------
def hinf_feasible(gamma, scn, points, steps=1500):
    a, b, c = SCENARIOS[scn]["filt"]
    m = Pendulum(a, b, c)
    th, Ri = 1.0 / gamma ** 2, np.linalg.inv(R_MAT)
    for th0 in points:
        xl = np.array([th0, 0.0])
        F, H = m.Fjac(xl), m.Hjac(xl)
        P = P0_MAT.copy()
        for _ in range(steps):
            M = np.linalg.inv(P) - th * I2 + H.T @ Ri @ H
            if np.linalg.eigvalsh(0.5 * (M + M.T))[0] <= 1e-9:
                return False
            P = F @ np.linalg.inv(M) @ F.T + Q_MAT
    return True


def gamma_min(scn, points=(0.0, 0.4, 0.8, 1.2)):
    lo, hi = 1e-3, 1e3
    assert hinf_feasible(hi, scn, points) and not hinf_feasible(lo, scn, points)
    for _ in range(50):
        mid = np.sqrt(lo * hi)
        if hinf_feasible(mid, scn, points):
            hi = mid
        else:
            lo = mid
    return hi


# ----------------------------------------------------------------------------
# Correctness checks
# ----------------------------------------------------------------------------
def correctness_checks():
    print("=== CORRECTNESS CHECKS ===")
    rng = np.random.default_rng(1)
    a, b, c = A_TRUE, B_TRUE, C_TRUE
    lin = linearize_at_origin(a, b, c)
    H2 = np.array([[1.0, 0.0], [0.0, 1.0]])
    n = 400
    x = np.array([0.1, 0.0])
    U = rng.standard_normal(n)
    Ys = []
    for k in range(n):
        x = lin.F @ x + lin.B * U[k] + np.linalg.cholesky(Q_MAT) @ rng.standard_normal(2)
        Ys.append(H2 @ x + np.linalg.cholesky(R_MAT) @ rng.standard_normal(2))
    x0 = np.array([0.0, 0.0])
    kf, ekf, ukf = (KF(lin, Q_MAT, R_MAT, x0, P0_MAT), EKF(lin, Q_MAT, R_MAT, x0, P0_MAT),
                    UKF(lin, Q_MAT, R_MAT, x0, P0_MAT))
    hinf = HInf(lin, Q_MAT, R_MAT, x0, P0_MAT, gamma=1e6)
    d_ekf = d_ukf = d_hinf = dP_ekf = dP_ukf = 0.0
    for k in range(n):
        xk = kf.step(U[k], Ys[k])
        d_ekf = max(d_ekf, np.abs(ekf.step(U[k], Ys[k]) - xk).max())
        d_ukf = max(d_ukf, np.abs(ukf.step(U[k], Ys[k]) - xk).max())
        d_hinf = max(d_hinf, np.abs(hinf.step(U[k], Ys[k]) - xk).max())
        dP_ekf = max(dP_ekf, np.abs(ekf.P - kf.P).max())
        dP_ukf = max(dP_ukf, np.abs(ukf.P - kf.P).max())
    print(f"  Linear model: max|EKF-KF|  x = {d_ekf:.2e}, P = {dP_ekf:.2e}")
    print(f"  Linear model: max|UKF-KF|  x = {d_ukf:.2e}, P = {dP_ukf:.2e}")
    print(f"  Linear model: max|HInf(gamma=1e6)-KF| x = {d_hinf:.2e}")
    assert d_ekf < 1e-12 and dP_ekf < 1e-12, "EKF khong trung KF"
    assert d_ukf < 1e-6 and dP_ukf < 1e-7, "UKF khong trung KF"
    assert d_hinf < 1e-6, "H-inf voi gamma lon khong ve KF"
    print("  -> PASS: EKF == KF, UKF == KF, H-inf(large gamma) == KF")
    return dict(ekf_x=d_ekf, ekf_P=dP_ekf, ukf_x=d_ukf, ukf_P=dP_ukf, hinf_x=d_hinf)


# ----------------------------------------------------------------------------
# Statistics
# ----------------------------------------------------------------------------
NAMES = ["KF", "EKF", "UKF", "H∞"]
RAD2DEG = 180.0 / np.pi


def simulate_scenario(scn, gamma, n_runs, seed_offset, keep_first=False):
    rng = np.random.default_rng(SEED + seed_offset)
    runs = [generate_run(scn, rng) for _ in range(n_runs)]
    k0 = int(T_SKIP / DT)
    res = {n: dict(rmse_t=[], rmse_w=[], emax=[], nees=[], tstep=[], mean_e=[]) for n in NAMES}
    first = None
    for ri, run in enumerate(runs):
        flts = build_filters(scn, run, gamma)
        hist = {}
        for f in flts:
            xh, nees, ts = run_filter(f, run)
            e = run["X"][1:] - xh
            r = res[f.name]
            r["rmse_t"].append(np.sqrt(np.mean(e[k0:, 0] ** 2)) * RAD2DEG)
            r["rmse_w"].append(np.sqrt(np.mean(e[k0:, 1] ** 2)) * RAD2DEG)
            r["emax"].append(np.abs(e[k0:, 0]).max() * RAD2DEG)
            r["mean_e"].append(np.mean(e[k0:, 0]) * RAD2DEG)
            r["nees"].append(np.nanmean(nees[k0:]) if not np.all(np.isnan(nees)) else np.nan)
            r["tstep"].append(ts * 1e6)
            hist[f.name] = xh
        if ri == 0:
            first = dict(run=run, hist=hist)
    return res, first, runs


def summarize(res):
    out = {}
    for n, r in res.items():
        out[n] = {k: (float(np.mean(v)), float(np.std(v))) for k, v in r.items()}
    return out


# ----------------------------------------------------------------------------
# Figures
# ----------------------------------------------------------------------------
COL = {"KF": "#7f7f7f", "EKF": "#0072B2", "UKF": "#009E73", "H∞": "#D55E00"}
STY = {"KF": "--", "EKF": "-", "UKF": "-", "H∞": "-"}


def fig_trajectories(firsts, path):
    scns = ["B", "E", "C"]
    fig, axes = plt.subplots(3, 3, figsize=(14, 7.5), sharex=True)
    t = np.arange(1, N_STEPS + 1) * DT
    for j, scn in enumerate(scns):
        run, hist = firsts[scn]["run"], firsts[scn]["hist"]
        ax = axes[0, j]
        ax.plot(t, run["X"][1:, 0] * RAD2DEG, "k", lw=1.6, label="Truth")
        for n in NAMES:
            ax.plot(t, hist[n][:, 0] * RAD2DEG, STY[n], color=COL[n], lw=1.0, label=n)
        ax.set_title("Scenario " + {"B": "B: large angle, no push", "E": "E: large angle + strong push", "C": "C: model mismatch + gyro bias"}[scn])
        ax.set_ylabel("pitch θ [deg]")
        for i, n in enumerate(NAMES):
            e = (run["X"][1:] - hist[n]) * RAD2DEG
            axes[1, j].plot(t, e[:, 0], STY[n], color=COL[n], lw=1.0)
            axes[2, j].plot(t, e[:, 1], STY[n], color=COL[n], lw=1.0)
        axes[1, j].set_ylabel("error e_θ [deg]")
        axes[2, j].set_ylabel("error e_ω [deg/s]")
        axes[2, j].set_xlabel("time [s]")
        for a_ in axes[:, j]:
            a_.grid(alpha=0.3)
    axes[0, 0].legend(ncol=5, fontsize=8, loc="upper right")
    fig.tight_layout()
    fig.savefig(path, dpi=170)
    plt.close(fig)


def fig_bars(summ, path):
    fig, axes = plt.subplots(1, 2, figsize=(11, 3.8))
    scns = list(SCENARIOS)
    w = 0.2
    for ax, key, lab in zip(axes, ["rmse_t", "rmse_w"], ["RMSE pitch θ [deg]", "RMSE pitch rate ω [deg/s]"]):
        for i, n in enumerate(NAMES):
            m = [summ[s][n][key][0] for s in scns]
            sd = [summ[s][n][key][1] for s in scns]
            ax.bar(np.arange(len(scns)) + (i - 1.5) * w, m, w, yerr=sd, capsize=2, color=COL[n], label=n)
        ax.set_xticks(range(len(scns)))
        ax.set_xticklabels(scns)
        ax.set_xlabel("scenario")
        ax.set_ylabel(lab)
        ax.grid(alpha=0.3, axis="y")
    axes[0].legend(ncol=2, fontsize=8, loc="upper left")
    fig.tight_layout()
    fig.savefig(path, dpi=170)
    plt.close(fig)


def fig_gamma(sweep, base, path):
    fig, axes = plt.subplots(1, 3, figsize=(11, 3.4), sharey=False)
    for ax, scn in zip(axes, ["A", "C", "D"]):
        fac = sweep[scn]["factors"]
        ax.plot(fac, sweep[scn]["rmse_t"], "o-", color=COL["H∞"], label="H∞")
        ax.axhline(base[scn]["KF"], color=COL["KF"], ls="--", label="KF")
        ax.axhline(base[scn]["EKF"], color=COL["EKF"], ls="-", lw=1, label="EKF")
        ax.set_xscale("log")
        ax.set_xlabel("γ / γ_min")
        ax.set_title("Scenario " + scn)
        ax.grid(alpha=0.3, which="both")
    axes[0].set_ylabel("RMSE θ [deg]")
    axes[0].legend(fontsize=8)
    fig.tight_layout()
    fig.savefig(path, dpi=170)
    plt.close(fig)


# ----------------------------------------------------------------------------
# LaTeX tables
# ----------------------------------------------------------------------------
def tex_name(n):
    return r"H$_\infty$" if n.startswith("H") else n


def write_tables(summ, gam, path):
    desc = {"A": "A -- danh định, góc nhỏ", "B": "B -- góc lớn, không xung đẩy",
            "C": "C -- sai số mô hình + lệch gyro", "D": "D -- nhiễu đo đuôi nặng",
            "E": "E -- góc lớn + xung đẩy mạnh"}
    L = [r"\begin{tabular}{l l c c c c}", r"\toprule",
         r"\textbf{Kịch bản} & \textbf{Bộ lọc} & \textbf{RMSE $\theta$ [$^\circ$]} & \textbf{RMSE $\omega$ [$^\circ$/s]} "
         r"& \textbf{$\max|e_\theta|$ [$^\circ$]} & \textbf{ANEES} \\", r"\midrule"]
    for si, s in enumerate(SCENARIOS):
        best = {k: min(summ[s][n][k][0] for n in NAMES) for k in ("rmse_t", "rmse_w", "emax")}
        for i, n in enumerate(NAMES):
            cells = []
            for k in ("rmse_t", "rmse_w", "emax"):
                m, sd = summ[s][n][k]
                txt = f"{m:.3f} $\\pm$ {sd:.3f}"
                cells.append(r"\textbf{" + txt + "}" if abs(m - best[k]) < 1e-12 else txt)
            ne = summ[s][n]["nees"][0]
            cells.append("--" if np.isnan(ne) else f"{ne:.2f}")
            head = r"\multirow{4}{*}{" + desc[s] + "}" if i == 0 else ""
            L.append(" & ".join([head, tex_name(n)] + cells) + r" \\")
        if si < len(SCENARIOS) - 1:
            L.append(r"\midrule")
    L += [r"\bottomrule", r"\end{tabular}"]
    with open(os.path.join(path, "filter_results_table.tex"), "w", encoding="utf-8") as f:
        f.write("\n".join(L) + "\n")

    # run-time table (mean over all scenarios)
    ts = {n: float(np.mean([summ[s][n]["tstep"][0] for s in SCENARIOS])) for n in NAMES}
    L = [r"\begin{tabular}{l c c}", r"\toprule",
         r"\textbf{Bộ lọc} & \textbf{Thời gian/bước [$\mu$s]} & \textbf{Tỉ lệ so với KF} \\", r"\midrule"]
    for n in NAMES:
        L.append(f"{tex_name(n)} & {ts[n]:.1f} & {ts[n] / ts['KF']:.1f}$\\times$ \\\\")
    L += [r"\bottomrule", r"\end{tabular}"]
    with open(os.path.join(path, "filter_runtime_table.tex"), "w", encoding="utf-8") as f:
        f.write("\n".join(L) + "\n")
    return ts


def write_qinfl_table(sweep, path):
    scn = ["A", "C", "D"]
    L = [r"\begin{tabular}{l c c c}", r"\toprule",
         r"\textbf{Cấu hình (RMSE $\theta$ [$^\circ$])} & \textbf{A} & \textbf{C} & \textbf{D} \\", r"\midrule"]
    for qi, qs in enumerate(sweep["A"]["qscales"]):
        L.append(f"KF, $Q \\times {qs:g}$ & " + " & ".join(f"{sweep[s]['kf_rmse_t'][qi]:.3f}" for s in scn) + r" \\")
    L.append(r"\midrule")
    for fi, fac in enumerate(sweep["A"]["factors"]):
        L.append(f"H$_\infty$, $\gamma = {fac:g}\,\gamma_{{\min}}$ & " +
                 " & ".join(f"{sweep[s]['rmse_t'][fi]:.3f}" for s in scn) + r" \\")
    L += [r"\bottomrule", r"\end{tabular}"]
    with open(os.path.join(path, "filter_qinfl_table.tex"), "w", encoding="utf-8") as f:
        f.write("\n".join(L) + "\n")


def main():
    os.makedirs(OUT, exist_ok=True)
    checks = correctness_checks()

    print("\n=== gamma_min (H-inf existence condition) ===")
    gmin = {s: gamma_min(s) for s in SCENARIOS}
    gam = {s: GAMMA_FACTOR * gmin[s] for s in SCENARIOS}
    for s in SCENARIOS:
        print(f"  Scenario {s}: gamma_min = {gmin[s]:.4f}, using gamma = {GAMMA_FACTOR}*gamma_min = {gam[s]:.4f}")

    summ, firsts, runs_cache = {}, {}, {}
    for i, s in enumerate(SCENARIOS):
        print(f"\n=== Scenario {SCENARIOS[s]['title']} ({N_RUNS} MC runs) ===")
        res, first, runs = simulate_scenario(s, gam[s], N_RUNS, i)
        summ[s], firsts[s] = summarize(res), first
        th = np.array([np.abs(r["X"][:, 0]).max() for r in runs]) * RAD2DEG
        print(f"  true max|theta|: mean {th.mean():.1f} deg, largest {th.max():.1f} deg")
        print(f"  {'filter':5s} {'RMSE_th[deg]':>14s} {'RMSE_w[deg/s]':>15s} {'max|e_th|':>10s} {'mean e_th':>10s} {'ANEES':>7s} {'us/step':>8s}")
        for n in NAMES:
            r = summ[s][n]
            print(f"  {n:5s} {r['rmse_t'][0]:8.3f}+-{r['rmse_t'][1]:5.3f} {r['rmse_w'][0]:9.3f}+-{r['rmse_w'][1]:5.3f}"
                  f" {r['emax'][0]:10.3f} {r['mean_e'][0]:10.3f} {r['nees'][0]:7.2f} {r['tstep'][0]:8.1f}")

    # gamma sweep on A, C, D
    print("\n=== gamma/gamma_min sweep (H-inf, RMSE theta) ===")
    factors = [1.05, 1.2, 2.0, 5.0, 20.0, 200.0]
    sweep, base = {}, {}
    for i, s in enumerate(["A", "C", "D"]):
        rng_off = list(SCENARIOS).index(s)
        rng = np.random.default_rng(SEED + 100 + rng_off)
        runs = [generate_run(s, rng) for _ in range(N_RUNS_SWEEP)]
        k0 = int(T_SKIP / DT)
        base[s] = {}
        for nm, cls in (("KF", 0), ("EKF", 1)):
            vals = []
            for run in runs:
                f = build_filters(s, run, gam[s])[cls]
                xh, _, _ = run_filter(f, run)
                vals.append(np.sqrt(np.mean((run["X"][1:, 0][k0:] - xh[k0:, 0]) ** 2)) * RAD2DEG)
            base[s][nm] = float(np.mean(vals))
        vals_f = []
        for fac in factors:
            vals = []
            for run in runs:
                f = build_filters(s, run, fac * gmin[s])[3]
                xh, _, _ = run_filter(f, run)
                vals.append(np.sqrt(np.mean((run["X"][1:, 0][k0:] - xh[k0:, 0]) ** 2)) * RAD2DEG)
            vals_f.append(float(np.mean(vals)))
        qscales = [1.0, 3.0, 10.0, 30.0, 100.0, 300.0]
        vals_q = []
        a_, b_, c_ = SCENARIOS[s]["filt"]
        lin = linearize_at_origin(a_, b_, c_)
        for qs in qscales:
            vals = []
            for run in runs:
                f = KF(lin, Q_MAT * qs, R_MAT, run["x0hat"], P0_MAT)
                xh, _, _ = run_filter(f, run)
                vals.append(np.sqrt(np.mean((run["X"][1:, 0][k0:] - xh[k0:, 0]) ** 2)) * RAD2DEG)
            vals_q.append(float(np.mean(vals)))
        sweep[s] = dict(factors=factors, rmse_t=vals_f, qscales=qscales, kf_rmse_t=vals_q)
        print(f"     KF with Q*k: " + " ".join(f"{q:g}x:{v:.3f}" for q, v in zip(qscales, vals_q)))
        print(f"  {s}: KF={base[s]['KF']:.3f} EKF={base[s]['EKF']:.3f} | " +
              " ".join(f"{fac:g}x:{v:.3f}" for fac, v in zip(factors, vals_f)))

    ts = write_tables(summ, gam, OUT)
    write_qinfl_table(sweep, OUT)
    fig_trajectories(firsts, os.path.join(OUT, "filter_fig_trajectories.png"))
    fig_bars(summ, os.path.join(OUT, "filter_fig_rmse.png"))
    fig_gamma(sweep, base, os.path.join(OUT, "filter_fig_gamma.png"))
    with open(os.path.join(OUT, "filter_results.json"), "w", encoding="utf-8") as f:
        json.dump(dict(checks=checks, gamma_min=gmin, gamma_used=gam, summary=summ,
                       sweep=sweep, sweep_base=base, runtime_us=ts,
                       setup=dict(dt=DT, t_end=T_END, runs=N_RUNS, seed=SEED)), f, indent=1, ensure_ascii=False)
    print(f"\nSaved figures/tables to {OUT}")


if __name__ == "__main__":
    main()
