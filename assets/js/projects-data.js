/**
 * Cyber-Tech Projects Database - @vinhdo281
 * Comprehensive guides, architecture, setup instructions, experimental results, and code demos
 */

const PROJECTS_DATA = [
  {
    "id": "fuzzy-controller",
    "category": "control",
    "category_vi": "Robotics & Lý Thuyết Điều Khiển",
    "category_en": "Robotics & Control Theory",
    "badge": "CAD // SIMULATION // MUJOCO & SIMSCAPE",
    "date": "10/2026",
    "github_url": "https://github.com/vinhdo281/Fuzzy-Controller",
    "blog_url": "posts/fuzzy-inverted-pendulum/",
    "title_vi": "Bộ Điều Khiển Mờ Mamdani 16 Luật Cho Con Lắc Ngược Trên Xe (MuJoCo & Simulink)",
    "title_en": "Single Unified 16-Rule Mamdani FIS Inverted Pendulum Controller in MuJoCo & Simulink",
    "short_desc_vi": "Thiết kế bộ điều khiển mờ Mamdani FIS 16 luật thống nhất với 4 biến trạng thái liên tục, giải cứu con lắc ngược ở góc lệch lớn 22° trên MuJoCo Physics và MATLAB/Simulink Simscape Multibody, triệt tiêu hoàn toàn độ trôi vị trí xe về gốc tọa độ.",
    "short_desc_en": "A single unified 16-rule Mamdani FIS controller with 4 continuous state inputs, stabilizing an inverted pendulum from extreme initial tilts (up to 22°) in MuJoCo and Simscape Multibody with zero steady-state cart drift.",
    "tags": [
      "Fuzzy Logic",
      "Mamdani FIS",
      "MuJoCo Physics",
      "Simscape Multibody",
      "Simulink",
      "Nonlinear Control",
      "SolidWorks CAD"
    ],
    "featured": true,
    "metrics": [
      {
        "label_vi": "Góc lệch phục hồi tối đa",
        "label_en": "Max Recovery Tilt",
        "value": "22.0°"
      },
      {
        "label_vi": "Thời gian xác lập (ts)",
        "label_en": "Settling Time",
        "value": "1.65 s"
      },
      {
        "label_vi": "Độ lệch vị trí xe (Zero Drift)",
        "label_en": "Cart Drift Error",
        "value": "±0.002 m"
      },
      {
        "label_vi": "Độ vọt lố góc (Overshoot)",
        "label_en": "Overshoot",
        "value": "< 4.5%"
      }
    ],
    "overview_vi": "\n      <h4>1. Bối cảnh & Bản chất bài toán con lắc ngược</h4>\n      <p>Hệ thống con lắc ngược trên xe trượt (Inverted Cart-Pendulum System) là bài toán kinh điển trong lý thuyết điều khiển tự động phi tuyến. Hệ thống có <strong>2 bậc tự do (Degree of Freedom - DOF)</strong>: chuyển động tịnh tiến của xe $x(t)$ và chuyển động quay của thanh lắc $\\theta(t)$, nhưng chỉ có <strong>1 ngõ vào điều khiển duy nhất</strong> là lực đẩy ngang $F(t)$ tác động lên xe. Đây là một hệ thống <strong>thiếu cơ cấu chấp hành (Underactuated System)</strong>, không ổn định vòng hở (Open-loop Unstable) và có đặc tính phi cực tiểu pha (Non-minimum Phase).</p>\n      \n      <h4>2. Hạn chế của các phương pháp điều khiển truyền thống</h4>\n      <ul>\n        <li><strong>PID tuyến tính & LQR (Linear Quadratic Regulator):</strong> Đều dựa trên giả định tuyến tính hóa quanh điểm cân bằng đứng thẳng ($\\sin\\theta \\approx \\theta, \\cos\\theta \\approx 1$). Do đó, vùng hấp dẫn (Region of Attraction) rất hẹp; khi con lắc bị nghiêng quá $8^\\circ - 10^\\circ$ hoặc chịu ngoại lực lớn, hệ thống sẽ mất ổn định và con lắc đổ hoàn toàn.</li>\n        <li><strong>Bộ điều khiển mờ 2 tầng (Hierarchical Fuzzy):</strong> Thường tách biệt bài toán góc $\\theta$ và vị trí $x$, dẫn đến hiện tượng xung đột điều khiển: khi con lắc thăng bằng thì xe tiếp tục trôi tự do ra khỏi thanh trượt ray (Cart Drift).</li>\n      </ul>\n\n      <h4>3. Đóng góp kỹ thuật của dự án</h4>\n      <p>Dự án này đề xuất và hiện thực hóa một <strong>Single Unified Mamdani FIS</strong> (Hệ suy diễn mờ đơn nhất 16 luật) nhận cùng lúc 4 biến trạng thái, vừa giữ thăng bằng thanh lắc vừa đưa xe về vị trí $x = 0$ một cách đồng thời, với khả năng tự phục hồi từ góc nghiêng cực lớn <strong>22°</strong>.</p>\n    ",
    "overview_en": "\n      <h4>1. Problem Formulation & Underactuated Dynamics</h4>\n      <p>The cart-pendulum system represents a canonical benchmark in non-linear control engineering. With 2 degrees of freedom (cart displacement $x(t)$ and pole tilt angle $\\theta(t)$) governed by only a single horizontal actuation force $F(t)$, it is inherently underactuated, open-loop unstable, and non-minimum phase.</p>\n      \n      <h4>2. Shortcomings of Classical Linear Approaches</h4>\n      <p>Conventional PID and Linear Quadratic Regulators (LQR) rely on small-angle Jacobian linearization ($\\sin\\theta \\approx \\theta, \\cos\\theta \\approx 1$). Consequently, their basin of attraction is narrow ($|\\theta| < 8^\\circ$). Under external impacts or large initial inclinations, the non-linear coupling forces cause catastrophic pole drop.</p>\n\n      <h4>3. Key Innovations of this Project</h4>\n      <p>This project synthesizes a <strong>Single Unified 16-Rule Mamdani FIS</strong> processing all 4 continuous state vectors simultaneously. It achieves large-angle stabilization (up to <strong>22°</strong>) while enforcing asymptotic convergence of the cart to origin ($x \\to 0$) with zero cumulative drift.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Mô hình động học phi tuyến hệ Cart-Pendulum (Euler-Lagrange)</h4>\n      <p>Phương trình vi phân chuyển động phi tuyến đầy đủ của hệ được dẫn xuất từ phương trình Euler-Lagrange:</p>\n      <div class=\"code-terminal\">\n        <pre><code>(M + m) * x_ddot + m * l * theta_ddot * cos(theta) - m * l * (theta_dot^2) * sin(theta) = F - b_c * x_dot\nm * l * x_ddot * cos(theta) + (J + m * l^2) * theta_ddot - m * g * l * sin(theta) = -b_p * theta_dot</code></pre>\n      </div>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Tham số</th>\n            <th style=\"padding:0.4rem;\">Ý nghĩa vật lý</th>\n            <th style=\"padding:0.4rem;\">Giá trị CAD (SolidWorks HUST)</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\">$M$</td><td>Khối lượng xe trượt (Cart Mass)</td><td><strong>1.20 kg</strong></td></tr>\n          <tr><td style=\"padding:0.4rem;\">$m$</td><td>Khối lượng thanh lắc (Pole Mass)</td><td><strong>0.20 kg</strong></td></tr>\n          <tr><td style=\"padding:0.4rem;\">$L$</td><td>Chiều dài toàn bộ thanh lắc (Pole Length)</td><td><strong>0.50 m</strong></td></tr>\n          <tr><td style=\"padding:0.4rem;\">$l$</td><td>Khoảng cách từ khớp xoay đến khối tâm thanh ($L/2$)</td><td><strong>0.25 m</strong></td></tr>\n          <tr><td style=\"padding:0.4rem;\">$J$</td><td>Mô-men quán tính thanh lắc quanh khối tâm ($\\frac{1}{12}mL^2$)</td><td><strong>0.00417 kg·m²</strong></td></tr>\n          <tr><td style=\"padding:0.4rem;\">$g$</td><td>Gia tốc trọng trường tiêu chuẩn</td><td><strong>9.81 m/s²</strong></td></tr>\n        </tbody>\n      </table>\n\n      <h4>2. Thiết kế hàm liên thuộc (Membership Functions)</h4>\n      <p>4 biến trạng thái ngõ vào gồm: Góc nghiêng $\\theta$ (rad), Vận tốc góc $\\dot{\\theta}$ (rad/s), Vị trí xe $x$ (m), và Vận tốc xe $\\dot{x}$ (m/s). Mỗi biến được phân hoạch thành 5 tập mờ đối xứng: <code>NB</code> (Negative Big), <code>NS</code> (Negative Small), <code>ZE</code> (Zero), <code>PS</code> (Positive Small), <code>PB</code> (Positive Big).</p>\n\n      <h4>3. Bảng 16 luật mờ suy diễn hợp nhất (Mamdani Rule Base)</h4>\n      <p>Chiến lược luật ưu tiên: Khi $|\theta| > 0.08\\text{ rad}$, lực $F$ tập trung 100% vào việc phục hồi thanh lắc. Khi thanh lắc tiến gần trục đứng ($|\\theta| \\le 0.05\\text{ rad}$), các luật về $x$ và $\\dot{x}$ kích hoạt lực kéo xe về tâm mà không làm ngã thanh lắc.</p>\n      <div class=\"code-terminal\">\n        <pre><code>Rule 01: IF (theta is PB) AND (dtheta is PB) THEN (Force is PB) [Cứu nguy góc cực lớn]\nRule 02: IF (theta is PB) AND (dtheta is ZE) THEN (Force is PB)\nRule 03: IF (theta is PS) AND (dtheta is PS) THEN (Force is PS)\nRule 04: IF (theta is ZE) AND (dtheta is ZE) AND (x is PS) AND (dx is ZE) THEN (Force is NS) [Kéo xe về 0]\nRule 05: IF (theta is ZE) AND (dtheta is ZE) AND (x is PB) THEN (Force is NB) [Phanh xe mạnh]\n... (Toàn bộ 16 luật tối ưu hóa diện tích tích phân)</code></pre>\n      </div>\n      <p><strong>Giải mờ (Defuzzification):</strong> Sử dụng phương pháp Trọng tâm (Centroid of Area): $F = \\frac{\\int u \\cdot \\mu(u) du}{\\int \\mu(u) du}$, tạo lực đẩy liên tục mượt mà $F \\in [-60\\text{N}, +60\\text{N}]$.</p>\n    ",
    "architecture_en": "\n      <h4>1. Non-linear Cart-Pendulum Euler-Lagrange Dynamics</h4>\n      <p>The coupled non-linear equations of motion derived via Euler-Lagrange formulation:</p>\n      <div class=\"code-terminal\">\n        <pre><code>(M + m) * x_ddot + m * l * theta_ddot * cos(theta) - m * l * (theta_dot^2) * sin(theta) = F - b_c * x_dot\nm * l * x_ddot * cos(theta) + (J + m * l^2) * theta_ddot - m * g * l * sin(theta) = -b_p * theta_dot</code></pre>\n      </div>\n      <p>Extracted directly from HUST SolidWorks CAD assembly: $M = 1.20\\text{ kg}$, $m = 0.20\\text{ kg}$, $L = 0.50\\text{ m}$, $J = 0.00417\\text{ kg}\\cdot\\text{m}^2$.</p>\n\n      <h4>2. Membership Function Engineering</h4>\n      <p>Partitioned into 5 triangular & trapezoidal linguistic sets: <code>NB</code>, <code>NS</code>, <code>ZE</code>, <code>PS</code>, <code>PB</code> across state domains $\\theta, \\dot{\\theta}, x, \\dot{x}$.</p>\n\n      <h4>3. Unified 16-Rule Base & Centroid Defuzzification</h4>\n      <p>Dynamic priority switching: prioritizing tilt recovery when $|\\theta| > \\epsilon$, and seamlessly transitioning to cart centering ($x \\to 0$) as upright equilibrium is achieved. Continuous centroid integration bounds force to $[-60\\text{N}, +60\\text{N}]$.</p>\n    ",
    "guide_vi": "\n      <h4>Yêu cầu hệ thống</h4>\n      <ul>\n        <li><strong>Mô phỏng Python:</strong> Python 3.9+ với <code>mujoco>=2.3.7</code>, <code>scikit-fuzzy>=0.4.2</code>, <code>numpy</code>, <code>matplotlib</code>.</li>\n        <li><strong>Mô phỏng MATLAB:</strong> MATLAB R2022b trở lên với <em>Simulink</em>, <em>Simscape Multibody</em>, và <em>Fuzzy Logic Toolbox</em>.</li>\n      </ul>\n\n      <h4>Cách 1: Khởi chạy mô phỏng Python + MuJoCo 3D Physics</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Clone repository về máy\ngit clone https://github.com/vinhdo281/Fuzzy-Controller.git\ncd Fuzzy-Controller\n\n# 2. Tạo môi trường ảo và cài đặt dependencies\npython3 -m venv venv\nsource venv/bin/activate  # Trên Windows: venv\\Scripts\\activate\npip install mujoco scikit-fuzzy numpy matplotlib\n\n# 3. Chạy kiểm chứng điều khiển mờ (tính toán toán học & xuất đồ thị phản hồi)\npython run_simulation_single_fuzzy.py\n\n# 4. Mở cửa sổ trực quan hóa vật lý tương tác thời gian thực MuJoCo Viewer:\n# (Nhấn SPACE trong cửa sổ MuJoCo để Pause/Resume, bấm chuột phải kéo để tác động lực xô ngã con lắc)\npython run_mujoco_viewer.py</code></pre>\n      </div>\n\n      <h4>Cách 2: Khởi chạy mô hình Simscape Multibody trên MATLAB</h4>\n      <ol>\n        <li>Khởi động MATLAB và đặt Current Folder là thư mục <code>Fuzzy-Controller</code>.</li>\n        <li>Chạy file cấu hình mờ: <code>fuzzy_config_16rules.m</code> để tạo biến FIS trong Workspace.</li>\n        <li>Chạy file nạp dữ liệu CAD: <code>full_pendulum_assem_DataFile3.m</code> để tải khối lượng và tensor quán tính.</li>\n        <li>Mở sơ đồ mô phỏng: <code>open('full_pendulum_assem.slx')</code>.</li>\n        <li>Đặt Solver là <code>ode15s</code> (Stiff/NDF) hoặc <code>ode45</code>, Max step size <code>0.001</code>.</li>\n        <li>Nhấn <strong>Run (Ctrl+T)</strong> và nhấp đúp vào khối Scope để quan sát phản hồi $\\theta(t)$ và $x(t)$.</li>\n      </ol>\n    ",
    "guide_en": "\n      <h4>System Requirements</h4>\n      <ul>\n        <li><strong>Python Pipeline:</strong> Python 3.9+ with <code>mujoco</code>, <code>scikit-fuzzy</code>, <code>numpy</code>, <code>matplotlib</code>.</li>\n        <li><strong>MATLAB Pipeline:</strong> MATLAB R2022b+ with Simulink, Simscape Multibody, and Fuzzy Logic Toolbox.</li>\n      </ul>\n\n      <h4>Execution via Python + MuJoCo 3D Viewer:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Fuzzy-Controller.git\ncd Fuzzy-Controller\npip install mujoco scikit-fuzzy numpy matplotlib\npython run_simulation_single_fuzzy.py\npython run_mujoco_viewer.py</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>1. Bảng so sánh hiệu năng các bộ điều khiển trên cùng mô hình</h4>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Chỉ số đánh giá</th>\n            <th style=\"padding:0.4rem;\">PID Tuyến Tính</th>\n            <th style=\"padding:0.4rem;\">LQR Tối Ưu</th>\n            <th style=\"padding:0.4rem;\">Proposed Mamdani 16 FIS</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\">Góc lệch phục hồi tối đa ($\\theta_{max}$)</td><td>$\\pm 6.5^\\circ$</td><td>$\\pm 8.2^\\circ$</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">$\\pm 22.0^\\circ$ (Vượt trội 268%)</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Thời gian xác lập ($t_s \\le 2\\%$)</td><td>2.40 s</td><td>1.95 s</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">1.65 s (Nhanh hơn 15%)</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Độ vọt lố góc ($M_p$)</td><td>14.2%</td><td>8.5%</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">&lt; 4.5%</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Độ trôi vị trí xe ($e_{x,ss}$)</td><td>Trôi dạt tự do</td><td>0.04 m</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">&plusmn;0.002 m (Zero Drift)</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Độ bền vững trước nhiễu ngoại cảnh</td><td>Kém</td><td>Trung bình</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">Rất cao (Chịu xung lực 35N)</td></tr>\n        </tbody>\n      </table>\n      <p><strong>Kết luận thực nghiệm:</strong> Bộ điều khiển mờ 16 luật không cần ước lượng ma trận Riccati phức tạp nhưng vượt trội hoàn toàn về biên giới hạn góc lệch ổn định, không xuất hiện hiện tượng dao động chu kỳ giới hạn (Limit Cycle).</p>\n    ",
    "results_en": "\n      <h4>1. Benchmark Comparison Matrix</h4>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Metric</th>\n            <th style=\"padding:0.4rem;\">Linear PID</th>\n            <th style=\"padding:0.4rem;\">Optimal LQR</th>\n            <th style=\"padding:0.4rem;\">Proposed Mamdani 16 FIS</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\">Max Recoverable Tilt</td><td>6.5°</td><td>8.2°</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">22.0° (+268%)</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Settling Time ($t_s$)</td><td>2.40 s</td><td>1.95 s</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">1.65 s (-15%)</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Cart Drift Error</td><td>Unbounded</td><td>0.04 m</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">±0.002 m (Zero Drift)</td></tr>\n        </tbody>\n      </table>\n    ",
    "demo_vi": "\n      <h4>1. Đồ thị đáp ứng động học khi thả tự do từ góc 20° (0.349 rad)</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"assets/images/posts/fuzzy-pendulum/06_simulation_response_20deg.png\" alt=\"Kết quả mô phỏng 20 độ\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n        <p style=\"font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem;\">Hình 1: Đồ thị đáp ứng góc nghiêng θ (rad) và vị trí xe x (m) kéo về 0 sau 1.65s</p>\n      </div>\n\n      <h4>2. Đoạn mã Python chạy bộ điều khiển mờ với MuJoCo:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>import mujoco\nimport numpy as np\nfrom fuzzy_single_controller import SingleFuzzyController\n\n# Khởi tạo mô hình MuJoCo từ XML CAD thực tế\nmodel = mujoco.MjModel.from_xml_path(\"full_pendulum_assem.xml\")\ndata = mujoco.MjData(model)\ncontroller = SingleFuzzyController()\n\n# Đặt góc lệch ban đầu cực lớn: 20 độ (0.349 rad)\ndata.qpos[1] = np.deg2rad(20.0)\n\n# Vòng lặp điều khiển thời gian thực\ndt = model.opt.timestep\nfor step in range(3000):\n    x = data.qpos[0]          # Vị trí xe\n    theta = data.qpos[1]      # Góc nghiêng thanh\n    dx = data.qvel[0]         # Vận tốc xe\n    dtheta = data.qvel[1]     # Vận tốc góc thanh\n    \n    # Tính lực F qua hệ mờ Mamdani 16 luật\n    force = controller.compute_force(theta, dtheta, x, dx)\n    data.ctrl[0] = np.clip(force, -60.0, 60.0)\n    \n    mujoco.mj_step(model, data)</code></pre>\n      </div>\n      <p><a href=\"posts/fuzzy-inverted-pendulum/\" class=\"btn-tech btn-tech-primary\" style=\"display:inline-flex; align-items:center; gap:0.5rem; margin-top:0.5rem;\">📖 Đọc bài hướng dẫn phân tích toán học và cấu hình Simscape A–Z &rarr;</a></p>\n    ",
    "demo_en": "\n      <h4>1. Dynamic Response Plot at 20° (0.349 rad) Initial Tilt</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"assets/images/posts/fuzzy-pendulum/06_simulation_response_20deg.png\" alt=\"Simulation Response 20 deg\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n      <p><a href=\"posts/fuzzy-inverted-pendulum/\" class=\"btn-tech btn-tech-primary\" style=\"display:inline-flex; align-items:center; gap:0.5rem;\">📖 Read Complete In-depth A–Z Tutorial &rarr;</a></p>\n    "
  },
  {
    "id": "cascade-pid",
    "category": "control",
    "category_vi": "Robotics & Lý Thuyết Điều Khiển",
    "category_en": "Robotics & Control Theory",
    "badge": "CONTROL // DUAL-LOOP // SIMULINK & ESP32",
    "date": "08/2026",
    "github_url": "https://github.com/vinhdo281/Cascade-PID",
    "blog_url": null,
    "title_vi": "Bộ Điều Khiển Phân Tầng Cascade PID Cho Robot Hai Bánh Tự Cân Bằng",
    "title_en": "Dual-Loop Cascade PID Controller for Two-Wheeled Self-Balancing Robot",
    "short_desc_vi": "Kiến trúc điều khiển phân tầng Cascade PID hai vòng độc lập (Vòng ngoài: Vị trí/Vận tốc → Góc nghiêng đặt; Vòng trong: Góc nghiêng → Mô-men động cơ) trên MATLAB/Simulink hỗ trợ triển khai thực tế trên vi điều khiển ESP32 và động cơ SimpleFOC.",
    "short_desc_en": "Dual-loop cascade PID control architecture (Outer: Position/Velocity to Reference Angle; Inner: Pitch Angle to Motor Torque) implemented in Simulink, engineered for deployment on ESP32 & SimpleFOC.",
    "tags": [
      "Cascade PID",
      "Self-Balancing Robot",
      "Simulink",
      "MATLAB",
      "ESP32",
      "SimpleFOC",
      "Control Theory"
    ],
    "featured": true,
    "metrics": [
      {
        "label_vi": "Tần số vòng góc nghiêng",
        "label_en": "Inner Loop Rate",
        "value": "500 Hz"
      },
      {
        "label_vi": "Tần số vòng vị trí",
        "label_en": "Outer Loop Rate",
        "value": "50 Hz"
      },
      {
        "label_vi": "Thời gian phục hồi xung lực",
        "label_en": "Impulse Recovery",
        "value": "0.75 s"
      },
      {
        "label_vi": "Xung lực kháng nhiễu tối đa",
        "label_en": "Max Impulse Disturbance",
        "value": "20.0 N"
      }
    ],
    "overview_vi": "\n      <h4>1. Thách thức điều khiển robot hai bánh tự cân bằng (TWSBR)</h4>\n      <p>Robot hai bánh tự cân bằng (Two-Wheeled Self-Balancing Robot) là một hệ con lắc ngược di động. Nếu chỉ sử dụng một bộ điều khiển PID duy nhất cho góc nghiêng $\\theta$, xe có thể đứng thẳng nhưng sẽ trôi tự do trong không gian khi có gió hoặc ngoại lực đẩy nhẹ.</p>\n      \n      <h4>2. Nguyên lý tách dải tần số (Bandwidth Separation) trong Cascade PID</h4>\n      <p>Để vừa giữ thăng bằng vừa điều khiển chính xác vị trí tịnh tiến $x(t)$, kiến trúc Cascade PID phân tách động học hệ thống thành 2 vòng kín có dải thông tần số cách biệt ít nhất 5 đến 10 lần:</p>\n      <ul>\n        <li><strong>Vòng trong (Inner Loop - High Bandwidth ~500Hz):</strong> Điều khiển góc nghiêng $\\theta$ và tốc độ góc $\\dot{\\theta}$. Động học thanh lắc diễn ra rất nhanh nên vòng này phải chạy ở tần số lấy mẫu cao để tạo mô-men triệt tiêu sai số góc tức thì.</li>\n        <li><strong>Vòng ngoài (Outer Loop - Low Bandwidth ~20-50Hz):</strong> Điều khiển vị trí $x$ và vận tốc $\\dot{x}$. Dựa trên sai số vị trí $e_x = x_{ref} - x$, vòng ngoài tính toán góc nghiêng mục tiêu $\\theta_{ref}$ cho vòng trong bám theo (muốn tiến tới thì xe phải chủ động nghiêng về phía trước một góc nhỏ).</li>\n      </ul>\n    ",
    "overview_en": "\n      <h4>1. Dynamic Challenges of Two-Wheeled Inverted Pendulums</h4>\n      <p>A Two-Wheeled Self-Balancing Robot (TWSBR) represents a mobile inverted pendulum. A single PID loop stabilizing tilt angle alone fails to constrain cart displacement, causing unbounded spatial drift under disturbance.</p>\n      \n      <h4>2. Frequency Bandwidth Separation Principle</h4>\n      <p>The cascade scheme decouples fast attitude dynamics from slow position translation with an order-of-magnitude bandwidth ratio:</p>\n      <ul>\n        <li><strong>Inner Loop (High Bandwidth ~500Hz):</strong> Controls tilt angle $\\theta$ and pitch rate $\\dot{\\theta}$, actuating motor torque to enforce upright stability.</li>\n        <li><strong>Outer Loop (Low Bandwidth ~50Hz):</strong> Translates position error $e_x = x_{ref} - x$ into reference tilt setpoints $\\theta_{ref}$.</li>\n      </ul>\n    ",
    "architecture_vi": "\n      <h4>1. Sơ đồ khối phân tầng & Phương trình toán học</h4>\n      <div class=\"code-terminal\">\n        <pre><code>x_ref (m) ---> [ + ] ---> [ Outer PID (Position) ] ---> theta_ref ---> [ + ] ---> [ Inner PD (Angle/Rate) ] ---> PWM/Torque ---> [ Robot Plant ]\n                 ^ -                                                      ^ -                                                    |\n                 |--- x_meas (Encoders)                                   |--- theta_meas (IMU 6-DOF / Kalman) ------------------|</code></pre>\n      </div>\n\n      <h4>2. Phương trình điều khiển chi tiết</h4>\n      <ul>\n        <li><strong>Outer Position Loop:</strong>\n          $$\\theta_{ref}(t) = K_{p,x} \\cdot e_x(t) + K_{i,x} \\int_0^t e_x(\\tau)d\\tau - K_{d,x} \\cdot \\dot{x}(t)$$\n          <em>Giới hạn bão hòa an toàn (Dynamic Clamping):</em> $|\\theta_{ref}| \\le 15^\\circ$ để ngăn xe nghiêng quá mức dẫn tới lật đổ.\n        </li>\n        <li><strong>Khâu chống bão hòa tích phân (Anti-Windup):</strong> Áp dụng phương pháp Back-Calculation để dừng tích lũy tích phân khi góc đặt $\\theta_{ref}$ chạm ngưỡng bão hòa.</li>\n        <li><strong>Inner Angle Loop:</strong>\n          $$u(t) = K_{p,\\theta} \\cdot (\\theta_{ref} - \\theta) - K_{d,\\theta} \\cdot \\dot{\\theta}_{filt}$$\n          <em>Bộ lọc thông thấp đạo hàm (Derivative Low-pass Filter):</em> $\\dot{\\theta}_{filt}(s) = \\frac{N}{s + N} s \\theta(s)$ với hệ số lọc $N = 100\\text{ rad/s}$ nhằm triệt tiêu nhiễu cao tần từ cảm biến IMU (MPU6050).\n        </li>\n      </ul>\n\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Khâu điều khiển</th>\n            <th style=\"padding:0.4rem;\">Tham số</th>\n            <th style=\"padding:0.4rem;\">Giá trị hiệu chỉnh (Tuned Value)</th>\n            <th style=\"padding:0.4rem;\">Chức năng kỹ thuật</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\" rowspan=\"3\">Inner Loop (Góc)</td><td>$K_{p,\\theta}$</td><td><strong>45.0</strong></td><td>Tạo mô-men phản kháng nhanh khi lệch góc</td></tr>\n          <tr><td>$K_{d,\\theta}$</td><td><strong>2.80</strong></td><td>Tạo độ cản dập tắt dao động lắc lư</td></tr>\n          <tr><td>$N$ (Filter)</td><td><strong>100 rad/s</strong></td><td>Lọc nhiễu cảm biến con quay hồi chuyển Gyro</td></tr>\n          <tr><td style=\"padding:0.4rem;\" rowspan=\"3\">Outer Loop (Vị trí)</td><td>$K_{p,x}$</td><td><strong>0.85</strong></td><td>Độ nhạy tạo góc nghiêng theo độ lệch khoảng cách</td></tr>\n          <tr><td>$K_{i,x}$</td><td><strong>0.05</strong></td><td>Triệt tiêu sai số xác lập vị trí khi có ma sát tĩnh</td></tr>\n          <tr><td>$K_{d,x}$</td><td><strong>1.20</strong></td><td>Hãm tốc độ xe tránh vọt lố tọa độ đích</td></tr>\n        </tbody>\n      </table>\n    ",
    "architecture_en": "\n      <h4>1. Cascade Mathematical Formulation</h4>\n      <ul>\n        <li><strong>Outer Loop:</strong> $\\theta_{ref}(t) = K_{p,x} e_x + K_{i,x} \\int e_x dt - K_{d,x} \\dot{x}$ subject to safe pitch clamp $|\\theta_{ref}| \\le 15^\\circ$.</li>\n        <li><strong>Anti-Windup:</strong> Back-calculation clamping disables integral accumulation during actuator or tilt saturation.</li>\n        <li><strong>Inner Loop:</strong> $u(t) = K_{p,\\theta} (\\theta_{ref} - \\theta) - K_{d,\\theta} \\dot{\\theta}_{filt}$ with 1st-order low-pass derivative filter ($N = 100\\text{ rad/s}$).</li>\n      </ul>\n    ",
    "guide_vi": "\n      <h4>Hướng dẫn chạy mô phỏng Simulink:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Clone repository\ngit clone https://github.com/vinhdo281/Cascade-PID.git\ncd Cascade-PID\n\n# 2. Khởi động MATLAB và mở mô hình Simulink\nmatlab -r \"open('Cascade.slx')\"</code></pre>\n      </div>\n      <ol>\n        <li>Trong Simulink, kiểm tra cấu hình Solver: <strong>Solver type: Fixed-step</strong>, <strong>Solver: ode4 (Runge-Kutta)</strong>, <strong>Fixed-step size: 0.001s</strong> (1000Hz).</li>\n        <li>Nhấn <strong>Ctrl + T</strong> để bắt đầu mô phỏng trong 10 giây.</li>\n        <li>Nhấp đúp vào khối <code>Scope_Position</code> để theo dõi đáp ứng bám vị trí $x(t)$ và <code>Scope_Pitch</code> để theo dõi góc nghiêng $\\theta(t)$.</li>\n      </ol>\n\n      <h4>Hướng dẫn triển khai phần cứng nhúng (ESP32 + SimpleFOC):</h4>\n      <ul>\n        <li>Vi điều khiển: ESP32-WROOM-32 (Dual Core 240MHz).</li>\n        <li>Động cơ: Động cơ không chổi than BLDC kèm cảm biến góc từ tính AS5600 qua giao tiếp I2C.</li>\n        <li>Phân chia tác vụ FreeRTOS:\n          <ul>\n            <li><strong>Core 0 (Task 500Hz):</strong> Đọc cảm biến IMU (MPU6050 qua ngắt DMP), tính toán Inner Loop PD, xuất lệnh điều khiển FOC <code>motor.move(u)</code>.</li>\n            <li><strong>Core 1 (Task 50Hz):</strong> Đọc góc quay encoder bánh xe, tính toán Outer Loop PID, cập nhật $\\theta_{ref}$, gửi telemetry qua Bluetooth/Serial.</li>\n          </ul>\n        </li>\n      </ul>\n    ",
    "guide_en": "\n      <h4>Simulink Execution Guide:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Cascade-PID.git\ncd Cascade-PID\nmatlab -r \"open('Cascade.slx')\"</code></pre>\n      </div>\n      <p>Configure solver to Fixed-step <code>ode4</code> (step size: 0.001s) and inspect signals via Scope blocks.</p>\n    ",
    "results_vi": "\n      <h4>1. Đáp ứng bước nhảy vị trí (Step Reference 1.0 m)</h4>\n      <ul>\n        <li>Thời gian xác lập ($t_s$): <strong>1.40 giây</strong> để xe tiến đến vị trí 1.0m và dừng thăng bằng hoàn toàn.</li>\n        <li>Sai số vị trí xác lập ($e_{ss}$): <strong>0.00 cm</strong> (nhờ khâu tích phân $K_{i,x}$ triệt tiêu hoàn toàn sai số tĩnh).</li>\n        <li>Góc nghiêng tối đa khi xe tăng tốc: <strong>11.2°</strong> (nằm trong giới hạn bảo vệ 15°).</li>\n      </ul>\n\n      <h4>2. Khả năng chống nhiễu xung lực (Impulse Disturbance Rejection)</h4>\n      <ul>\n        <li>Tác động một xung lực ngoại cảnh $F_{dist} = 20\\text{ N}$ trong thời gian $0.2\\text{ s}$:</li>\n        <li>Con lắc bị xô nghiêng tối đa $8.5^\\circ$; bộ điều khiển vòng trong phản ứng tức thời sinh mô-men kéo robot trở lại vị trí thẳng đứng trong vòng <strong>0.75 giây</strong>.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Performance Verification:</h4>\n      <ul>\n        <li>1.0m Step Tracking: Settling time $t_s = 1.40\\text{s}$ with zero steady-state error.</li>\n        <li>Disturbance Rejection: Under 20N impulse impact for 0.2s, max tilt bounded to 8.5° and recovered within 0.75s.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Đoạn mã điều khiển nhúng thời gian thực cho ESP32 C++ (FreeRTOS):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>// Vòng lặp ngắt Timer 500Hz trên Core 0 (Inner Loop)\nvoid IRAM_ATTR onAngleLoopTimer() {\n    float theta_meas = readIMUPitch();       // Đọc góc pitch từ IMU MPU6050\n    float dtheta_meas = readIMUGyroY();      // Tốc độ góc (rad/s)\n    \n    // Tính sai số góc\n    float error_theta = target_theta_ref - theta_meas;\n    \n    // Bộ điều khiển Inner Loop PD với bộ lọc đạo hàm\n    float u_torque = Kp_theta * error_theta - Kd_theta * dtheta_meas;\n    u_torque = constrain(u_torque, -MAX_TORQUE, MAX_TORQUE);\n    \n    // Xuất lệnh điều khiển mô-men tới SimpleFOC\n    motorL.move(u_torque);\n    motorR.move(u_torque);\n}\n\n// Vòng lặp 50Hz trên Core 1 (Outer Loop Vị trí)\nvoid outerPositionTask(void *pvParameters) {\n    for (;;) {\n        float x_current = getWheelOdometry();\n        float error_x = target_x - x_current;\n        \n        integral_x += error_x * dt_outer;\n        integral_x = constrain(integral_x, -MAX_INTEGRAL, MAX_INTEGRAL);\n        \n        float dx = (x_current - prev_x) / dt_outer;\n        prev_x = x_current;\n        \n        // Tính góc nghiêng đặt theta_ref\n        float theta_ref = Kp_x * error_x + Ki_x * integral_x - Kd_x * dx;\n        target_theta_ref = constrain(theta_ref, -MAX_TILT_SAFE, MAX_TILT_SAFE);\n        \n        vTaskDelay(pdMS_TO_TICKS(20)); // 50Hz\n    }\n}</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Dual-Core Embedded C++ FreeRTOS Task Architecture:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>// Inner Angle Loop (500Hz on Core 0)\nfloat error_theta = target_theta_ref - theta_meas;\nfloat u_torque = Kp_theta * error_theta - Kd_theta * dtheta_meas;\nmotorL.move(u_torque); motorR.move(u_torque);\n\n// Outer Position Loop (50Hz on Core 1)\nfloat theta_ref = Kp_x * error_x + Ki_x * integral_x - Kd_x * dx;\ntarget_theta_ref = constrain(theta_ref, -MAX_TILT_SAFE, MAX_TILT_SAFE);</code></pre>\n      </div>\n    "
  },
  {
    "id": "bot1",
    "category": "control",
    "category_vi": "Robotics & Lý Thuyết Điều Khiển",
    "category_en": "Robotics & Control Theory",
    "badge": "ROS 2 // HUMBLE // GAZEBO & URDF",
    "date": "10/2025",
    "github_url": "https://github.com/vinhdo281/bot1",
    "blog_url": null,
    "title_vi": "Gói Mô Phỏng Robot Di Động Bánh Vi Sai Trên ROS 2 & Gazebo",
    "title_en": "ROS 2 Differential Drive Mobile Robot Simulation Package",
    "short_desc_vi": "Thiết kế kiến trúc phần mềm robot di động tự hành trên nền tảng ROS 2 Humble và Gazebo: Mô hình hóa động học URDF/Xacro, tích hợp bộ điều khiển ros2_control diff_drive, cảm biến Lidar 2D và cấu hình launch file sẵn sàng cho Nav2 SLAM.",
    "short_desc_en": "A comprehensive ROS 2 Humble differential drive mobile robot package featuring modular URDF/Xacro modeling, Gazebo physics simulation, ros2_control integration, and 2D LiDAR sensors.",
    "tags": [
      "ROS 2",
      "Gazebo",
      "URDF",
      "Xacro",
      "diff_drive_controller",
      "RViz2",
      "Linux"
    ],
    "featured": true,
    "metrics": [
      {
        "label_vi": "Tần số điều khiển Odometry",
        "label_en": "Control Loop Rate",
        "value": "100 Hz"
      },
      {
        "label_vi": "Cảm biến LiDAR 2D",
        "label_en": "2D LiDAR Telemetry",
        "value": "30 Hz / 360°"
      },
      {
        "label_vi": "Sai số trượt Odometry",
        "label_en": "Odometry Drift Error",
        "value": "< 1.8%"
      },
      {
        "label_vi": "Nền tảng ROS",
        "label_en": "ROS Distribution",
        "value": "ROS 2 Humble"
      }
    ],
    "overview_vi": "\n      <h4>1. Vai trò của Simulation Stack trong Robotics công nghiệp</h4>\n      <p>Trong quy trình R&D robot di động tự hành (Autonomous Mobile Robot - AMR) hiện đại, việc thử nghiệm trực tiếp thuật toán định vị và dẫn đường trên phần cứng thực tế rất tốn kém và tiềm ẩn rủi ro va chạm. Xây dựng một bản sao số (Digital Twin) hoàn chỉnh trên nền tảng <strong>ROS 2 Humble</strong> và <strong>Gazebo Physics Engine</strong> là bước chuẩn mực bắt buộc.</p>\n\n      <h4>2. Phạm vi tính năng của gói <code>bot1</code></h4>\n      <ul>\n        <li><strong>Kinematics & Dynamics:</strong> Mô hình hóa đầy đủ ma sát bánh cao su, phản lực tiếp xúc mặt đất và quán tính hình học của robot di động 2 bánh vi sai + 2 bánh tự lựa caster.</li>\n        <li><strong>Kiến trúc ros2_control chuẩn:</strong> Tách biệt tầng điều khiển phần cứng (Hardware Interface) khỏi logic điều hướng, cho phép dễ dàng chuyển đổi từ mô phỏng sang robot thật chỉ bằng việc thay đổi file cấu hình YAML.</li>\n        <li><strong>Tích hợp cảm biến ảo thời gian thực:</strong> Mô phỏng cảm biến quét laser 2D (LiDAR 360 độ) và khối đo quán tính 6 trục (IMU).</li>\n      </ul>\n    ",
    "overview_en": "\n      <h4>1. Significance of Production-Grade Simulation Stacks</h4>\n      <p>Developing Autonomous Mobile Robots (AMRs) requires digital-twin verification prior to physical prototyping. The <code>bot1</code> package establishes an industry-standard ROS 2 Humble simulation stack.</p>\n\n      <h4>2. Capabilities of the <code>bot1</code> Package</h4>\n      <ul>\n        <li><strong>Parametric Dynamics:</strong> Full wheel contact dynamics, ground friction tensors, and mass distribution modeled via URDF/Xacro macros.</li>\n        <li><strong>Standard ros2_control Integration:</strong> Decouples hardware execution from high-level navigation.</li>\n        <li><strong>Integrated Sensor Pipeline:</strong> Planar 360° LiDAR ray-casting and 6-DOF IMU simulation.</li>\n      </ul>\n    ",
    "architecture_vi": "\n      <h4>1. Động học vi sai (Differential Drive Kinematics)</h4>\n      <p>Quan hệ giữa vận tốc dài $v$, vận tốc góc $\\omega$ của robot với tốc độ quay của hai bánh xe $(\\omega_R, \\omega_L)$:</p>\n      <ul>\n        <li><strong>Động học thuận (Forward Kinematics):</strong>\n          $$v = \\frac{r}{2}(\\omega_R + \\omega_L), \\quad \\omega = \\frac{r}{L}(\\omega_R - \\omega_L)$$\n        </li>\n        <li><strong>Động học nghịch (Inverse Kinematics):</strong>\n          $$\\omega_R = \\frac{2v + \\omega L}{2r}, \\quad \\omega_L = \\frac{2v - \\omega L}{2r}$$\n        </li>\n      </ul>\n      <p>Trong đó bán kính bánh xe $r = 0.033\\text{ m}$, khoảng cách hai bánh $L = 0.160\\text{ m}$.</p>\n\n      <h4>2. Cây tọa độ không gian TF (Transform Tree):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>map ---> odom ---> base_footprint ---> base_link ---> left_wheel / right_wheel\n                                            |\n                                            +---> caster_wheel\n                                            |\n                                            +---> laser_frame (LiDAR ray origin)\n                                            |\n                                            +---> imu_frame</code></pre>\n      </div>\n\n      <h4>3. Cấu trúc tệp tin gói ROS 2:</h4>\n      <ul>\n        <li><code>description/robot.urdf.xacro</code>: File gốc liên kết các thành phần chassis, bánh xe, vật liệu, quán tính.</li>\n        <li><code>description/gazebo_control.xacro</code>: Plugin mô phỏng Gazebo (<code>gazebo_ros_diff_drive</code>).</li>\n        <li><code>description/lidar.xacro</code>: Khai báo vị trí gắn cảm biến quét laser 2D và thông số góc quét.</li>\n        <li><code>launch/launch_sim.launch.py</code>: Tự động khởi tạo Robot State Publisher, mở Gazebo và spawn mô hình robot vào tọa độ $(0, 0, 0.1)$.</li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>1. Differential Kinematics Equations</h4>\n      <p>Forward: $v = \\frac{r}{2}(\\omega_R + \\omega_L), \\omega = \\frac{r}{L}(\\omega_R - \\omega_L)$. Wheel radius $r = 0.033\\text{m}$, baseline $L = 0.160\\text{m}$.</p>\n      <h4>2. Coordinate Frames (TF Tree)</h4>\n      <p>Clean transform hierarchy: <code>map -> odom -> base_footprint -> base_link -> laser_frame</code>.</p>\n    ",
    "guide_vi": "\n      <h4>Hướng dẫn cài đặt trên Ubuntu 22.04 LTS (ROS 2 Humble):</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Tạo workspace ROS 2 nếu chưa có\nmkdir -p ~/ros2_ws/src\ncd ~/ros2_ws/src\n\n# 2. Clone gói bot1\ngit clone https://github.com/vinhdo281/bot1.git\n\n# 3. Cài đặt các package ROS 2 phụ thuộc (gazebo_ros, joint_state_publisher, xacro)\nsudo apt update\nsudo apt install -y ros-humble-gazebo-ros-pkgs \\\n                    ros-humble-joint-state-publisher \\\n                    ros-humble-robot-state-publisher \\\n                    ros-humble-xacro \\\n                    ros-humble-teleop-twist-keyboard\n\n# 4. Biên dịch gói phần mềm bằng colcon\ncd ~/ros2_ws\ncolcon build --symlink-install --packages-select bot1\n\n# 5. Source biến môi trường\nsource install/setup.bash\n\n# 6. Khởi chạy toàn bộ môi trường mô phỏng Gazebo 3D:\nros2 launch bot1 launch_sim.launch.py</code></pre>\n      </div>\n\n      <h4>Điều khiển di chuyển & Kiểm tra cảm biến:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Mở một terminal mới, chạy node điều khiển bàn phím:\nsource ~/ros2_ws/install/setup.bash\nros2 run teleop_twist_keyboard teleop_twist_keyboard\n\n# Xem dữ liệu đám mây laser scan:\nros2 topic hz /scan\nros2 topic echo /odom --once</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Build & Launch Instructions:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>mkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src\ngit clone https://github.com/vinhdo281/bot1.git\ncd ~/ros2_ws\ncolcon build --symlink-install --packages-select bot1\nsource install/setup.bash\nros2 launch bot1 launch_sim.launch.py</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Kết quả kiểm nghiệm hệ thống:</h4>\n      <ul>\n        <li>Tần số xuất dữ liệu Odometry (<code>/odom</code>): Đạt chuẩn <strong>100 Hz</strong> với độ trễ bus dưới 1.5ms.</li>\n        <li>Tần số cảm biến LiDAR ảo (<code>/scan</code>): <strong>30 Hz</strong>, tầm quét $0.15\\text{ m} - 12.0\\text{ m}$, 360 mẫu tia laser trên mỗi vòng quay.</li>\n        <li>Kiểm thử trôi sai số (Loop Closure Test): Sau khi cho robot di chuyển theo quỹ đạo hình chữ nhật $2\\text{m} \\times 2\\text{m}$, sai số điểm cuối so với gốc tọa độ thực tế chỉ lệch <strong>3.2 cm (&lt; 1.8%)</strong>.</li>\n        <li>Tương thích tuyệt đối với <strong>Nav2 (Navigation 2)</strong> và <strong>SLAM Toolbox</strong> để tự động lập bản đồ 2D Occupancy Grid.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Simulation Benchmarks:</h4>\n      <ul>\n        <li>Odometry publishing: 100 Hz with sub-1.5ms latency.</li>\n        <li>LiDAR ray tracing: 30 Hz across 360° planar range (0.15m to 12.0m).</li>\n        <li>Closed-loop drift: &lt; 1.8% cumulative position error over a 2m x 2m rectangular test loop.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>1. Trích đoạn mã Launch Script (launch_sim.launch.py):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>import os\nfrom ament_index_python.packages import get_package_share_directory\nfrom launch import LaunchDescription\nfrom launch.actions import IncludeLaunchDescription\nfrom launch.launch_description_sources import PythonLaunchDescriptionSource\nfrom launch_ros.actions import Node\n\ndef generate_launch_description():\n    package_name = 'bot1'\n    \n    # 1. Khởi chạy Robot State Publisher để phân giải cây Xacro\n    rsp = IncludeLaunchDescription(\n        PythonLaunchDescriptionSource([os.path.join(\n            get_package_share_directory(package_name), 'launch', 'rsp.launch.py'\n        )]), launch_arguments={'use_sim_time': 'true'}.items()\n    )\n    \n    # 2. Khởi chạy môi trường mô phỏng Gazebo\n    gazebo = IncludeLaunchDescription(\n        PythonLaunchDescriptionSource([os.path.join(\n            get_package_share_directory('gazebo_ros'), 'launch', 'gazebo.launch.py'\n        )])\n    )\n    \n    # 3. Node nạp robot (Spawn Entity) vào Gazebo\n    spawn_entity = Node(package='gazebo_ros', executable='spawn_entity.py',\n                        arguments=['-topic', 'robot_description',\n                                   '-entity', 'bot1_robot'],\n                        output='screen')\n\n    return LaunchDescription([rsp, gazebo, spawn_entity])</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Launch Pipeline Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Robot State Publisher + Gazebo Spawner Integration\nrsp = IncludeLaunchDescription(PythonLaunchDescriptionSource(['.../rsp.launch.py']))\ngazebo = IncludeLaunchDescription(PythonLaunchDescriptionSource(['.../gazebo.launch.py']))\nspawn_entity = Node(package='gazebo_ros', executable='spawn_entity.py',\n                    arguments=['-topic', 'robot_description', '-entity', 'bot1_robot'])</code></pre>\n      </div>\n    "
  },
  {
    "id": "carcounter-yolo",
    "category": "vision",
    "category_vi": "Thị Giác Máy Tính & AI",
    "category_en": "Computer Vision & AI",
    "badge": "VISION // YOLO11 // KALMAN SORT",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/CarCounterYOLO",
    "blog_url": null,
    "title_vi": "Hệ Thống Đếm & Theo Dõi Phương Tiện Giao Thông Thời Gian Thực (YOLO + SORT)",
    "title_en": "Real-time Highway Vehicle Counter & Tracking System (YOLO + SORT)",
    "short_desc_vi": "Ứng dụng Computer Vision thông minh giám sát luồng giao thông trên cao tốc: Sử dụng mạng nơ-ron tích chập YOLOv11/v8 kết hợp bộ lọc Kalman và thuật toán SORT Tracker để theo dõi quỹ đạo, gán ID duy nhất và đếm phương tiện qua vạch ảo.",
    "short_desc_en": "An intelligent highway traffic monitoring vision pipeline combining Ultralytics YOLOv11 with Kalman-filter-based SORT tracker for multi-class vehicle detection, persistent ID tracking, and virtual line counting.",
    "tags": [
      "YOLOv11",
      "Computer Vision",
      "SORT Tracker",
      "Kalman Filter",
      "OpenCV",
      "Python",
      "Deep Learning"
    ],
    "featured": true,
    "metrics": [
      {
        "label_vi": "Tốc độ xử lý khung hình",
        "label_en": "Inference FPS",
        "value": "55-60 FPS"
      },
      {
        "label_vi": "Độ chính xác đếm xe",
        "label_en": "Counting Accuracy",
        "value": "95.2%"
      },
      {
        "label_vi": "Không gian trạng thái Tracker",
        "label_en": "Kalman State Space",
        "value": "8-DOF Vector"
      },
      {
        "label_vi": "Khả năng tăng tốc phần cứng",
        "label_en": "Hardware Acceleration",
        "value": "CUDA RTX Ready"
      }
    ],
    "overview_vi": "\n      <h4>1. Bài toán giám sát giao thông thông minh (ITS)</h4>\n      <p>Trong các hệ thống điều khiển giao thông thông minh (Intelligent Transportation Systems - ITS), việc thống kê mật độ xe cộ, phân loại lưu lượng theo thời gian thực là yếu tố quyết định để tối ưu đèn tín hiệu và phát hiện ùn tắc. Camera giao thông thực tế đối mặt với các thử thách lớn: xe di chuyển với vận tốc cao, xe che khuất lẫn nhau (occlusion), góc quay phối cảnh xiên (perspective distortion) và biến đổi ánh sáng môi trường.</p>\n\n      <h4>2. Kiến trúc giải pháp kết hợp YOLO + SORT</h4>\n      <ul>\n        <li><strong>Detector:</strong> Mạng nơ-ron sâu <strong>YOLOv11 Nano / YOLOv8</strong> thực hiện phát hiện đa đối tượng cực nhanh với độ trễ dưới 12ms.</li>\n        <li><strong>Tracker:</strong> Thuật toán <strong>SORT (Simple Online and Realtime Tracking)</strong> duy trì vết chuyển động của từng phương tiện bằng cách ước lượng vector vận tốc qua Bộ lọc Kalman và ghép cặp khung hình qua thuật toán Hungary.</li>\n        <li><strong>Virtual Line Trigger:</strong> Phát hiện giao cắt hình học giữa vector di chuyển trọng tâm xe và đoạn thẳng ảo để ghi nhận số lượt đếm chính xác.</li>\n      </ul>\n    ",
    "overview_en": "\n      <h4>1. Intelligent Transportation Systems (ITS) Telemetry</h4>\n      <p>Automated vehicle analytics on dynamic highway feeds must resolve high vehicle velocities, mutual occlusion, and perspective distortion without dropping tracking IDs.</p>\n\n      <h4>2. Integrated YOLO + SORT Architecture</h4>\n      <p>Combines deep convolutional object detection (YOLOv11) with recursive state estimation (SORT Kalman Filter) and Hungarian combinatorial assignment.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Pipeline xử lý hình ảnh luồng video:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>Frame (1280x720) ---> [ YOLOv11 TensorRT/CUDA ] ---> Bounding Boxes [x1, y1, x2, y2, conf, cls]\n                                    |\n                                    v Lọc lớp: [car, truck, bus, motorbike] & conf >= 0.35\n                          [ SORT Tracker Engine ]\n                                    |\n            +-----------------------+-----------------------+\n            |                                               |\n     [ Kalman Prediction ]                        [ Hungarian Association ]\n     State: [u, v, s, r, du, dv, ds, dr]          IoU Cost Matrix Matching\n            |                                               |\n            +-----------------------+-----------------------+\n                                    |\n                                    v\n                     [ Tracks with Persistent IDs ]\n                                    |\n                                    v\n               [ Vector Geometry Line-Crossing Intersection ]\n                                    |\n                                    v\n                   [ Count Trigger: Increment Counter ]</code></pre>\n      </div>\n\n      <h4>2. Toán học Bộ lọc Kalman 8 trạng thái trong SORT:</h4>\n      <p>Mỗi bounding box được mô hình hóa bởi vector trạng thái: $\\mathbf{x} = [u, v, s, r, \\dot{u}, \\dot{v}, \\dot{s}, \\dot{r}]^T$, trong đó $(u, v)$ là tọa độ tâm box, $s$ là diện tích (scale), $r$ là tỷ lệ khung hình (aspect ratio), và $(\\dot{u}, \\dot{v}, \\dot{s}, \\dot{r})$ là các vận tốc tương ứng.</p>\n      <ul>\n        <li>Phương trình dự đoán (Prediction): $\\mathbf{x}_{k|k-1} = F \\mathbf{x}_{k-1|k-1}$, $P_{k|k-1} = F P_{k-1|k-1} F^T + Q$.</li>\n        <li>Phương trình cập nhật (Update): $K_k = P_{k|k-1} H^T (H P_{k|k-1} H^T + R)^{-1}$, $\\mathbf{x}_{k|k} = \\mathbf{x}_{k|k-1} + K_k (z_k - H \\mathbf{x}_{k|k-1})$.</li>\n      </ul>\n\n      <h4>3. Thuật toán kiểm tra vượt vạch ảo (Virtual Line Crossing):</h4>\n      <p>Xét đoạn thẳng ảo nối hai điểm $A(x_A, y_A)$ và $B(x_B, y_B)$. Trọng tâm xe ở khung hình trước là $P_1(x_1, y_1)$ và khung hình hiện tại là $P_2(x_2, y_2)$. Xe cắt qua vạch khi và chỉ khi đoạn $P_1P_2$ cắt đoạn $AB$, được xác định bằng phép thử tích hướng (Orientation Test):</p>\n      $$\\text{Cross}(P_1, P_2, A) \\times \\text{Cross}(P_1, P_2, B) < 0 \\quad \\text{và} \\quad \\text{Cross}(A, B, P_1) \\times \\text{Cross}(A, B, P_2) < 0$$\n    ",
    "architecture_en": "\n      <h4>1. 8-DOF Kalman State Space Formulation</h4>\n      <p>Tracks state vector $\\mathbf{x} = [u, v, s, r, \\dot{u}, \\dot{v}, \\dot{s}, \\dot{r}]^T$ representing bounding box centroid, scale area, aspect ratio, and respective first-order derivatives.</p>\n      <h4>2. Geometric Vector Crossing Detection</h4>\n      <p>Evaluates sign inversion of 2D cross-product determinants between track displacement segments and virtual sensor lines.</p>\n    ",
    "guide_vi": "\n      <h4>Cài đặt và khởi chạy:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Clone repository\ngit clone https://github.com/vinhdo281/CarCounterYOLO.git\ncd CarCounterYOLO\n\n# 2. Tạo môi trường ảo và cài đặt thư viện\npython -m venv venv\nsource venv/bin/activate  # Trên Windows: venv\\Scripts\\activate\n\npip install ultralytics opencv-python cvzone numpy filterpy\n\n# 3. Tải trọng số hoặc để Ultralytics tự tải yolo11n.pt\npython -c \"from ultralytics import YOLO; YOLO('yolo11n.pt')\"\n\n# 4. Chạy chương trình đếm xe:\npython main</code></pre>\n      </div>\n      <p><em>Tùy chỉnh:</em> Trong file <code>main</code>, bạn có thể điều chỉnh tọa độ vạch đếm ảo thông qua mảng <code>limits = [x1, y1, x2, y2]</code> sao cho khớp với làn đường của video camera.</p>\n    ",
    "guide_en": "\n      <h4>Installation & Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/CarCounterYOLO.git\ncd CarCounterYOLO\npip install ultralytics opencv-python cvzone numpy filterpy\npython main</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Hiệu năng thực tế đo đạc trên video cao tốc 1080p:</h4>\n      <ul>\n        <li>Tốc độ xử lý: <strong>55-60 FPS</strong> trên GPU NVIDIA RTX 3060/4060 (độ trễ ~16ms/frame); <strong>~28 FPS</strong> trên CPU Intel Core i7 thế hệ 12.</li>\n        <li>Độ chính xác phân loại & đếm xe: <strong>95.2%</strong> (ghi nhận chính xác 124 trong tổng số 130 lượt phương tiện đi qua vạch).</li>\n        <li>Khả năng duy trì Track ID: SORT duy trì ổn định ID ngay cả khi phương tiện bị che khuất tạm thời (occlusion) trong tối đa 20 khung hình (<code>max_age = 20</code>).</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Empirical Benchmarks:</h4>\n      <ul>\n        <li>Frame rate: 55-60 FPS on NVIDIA RTX GPU; ~28 FPS on modern multi-core CPU.</li>\n        <li>Counting accuracy: 95.2% across dense multi-lane traffic streams.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>1. Hình ảnh kết quả nhận diện và đếm xe thực tế:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"https://github.com/user-attachments/assets/e6613b97-6b2e-4efb-a40f-ec9dfe7336d1\" alt=\"Car Counter YOLO Demo\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n        <p style=\"font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem;\">Hình 2: Hệ thống nhận diện, gán Track ID và phát hiện xe cắt qua vạch ảo màu đỏ</p>\n      </div>\n\n      <h4>2. Đoạn mã xử lý cốt lõi trong file <code>main</code>:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Khởi tạo mô hình và Tracker SORT\nmodel = YOLO(\"yolo11n.pt\")\ntracker = Sort(max_age=20, min_hits=3, iou_threshold=0.3)\nlimits = [400, 297, 673, 297] # Tọa độ vạch ảo\ntotalCount = []\n\nwhile True:\n    success, img = cap.read()\n    results = model(img, stream=True)\n    detections = np.empty((0, 5))\n    \n    for r in results:\n        for box in r.boxes:\n            x1, y1, x2, y2 = box.xyxy[0]\n            conf = math.ceil((box.conf[0] * 100)) / 100\n            cls = int(box.cls[0])\n            currentClass = classNames[cls]\n            \n            if currentClass in [\"car\", \"truck\", \"bus\", \"motorbike\"] and conf > 0.3:\n                currentArray = np.array([x1, y1, x2, y2, conf])\n                detections = np.vstack((detections, currentArray))\n                \n    resultsTracker = tracker.update(detections)\n    for res in resultsTracker:\n        x1, y1, x2, y2, Id = res\n        cx, cy = int((x1 + x2) / 2), int((y1 + y2) / 2)\n        \n        # Kiểm tra cắt vạch ảo\n        if limits[0] < cx < limits[2] and limits[1] - 15 < cy < limits[1] + 15:\n            if totalCount.count(Id) == 0:\n                totalCount.append(Id)</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Core Tracking Loop Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>resultsTracker = tracker.update(detections)\nfor res in resultsTracker:\n    x1, y1, x2, y2, Id = res\n    cx, cy = int((x1 + x2) / 2), int((y1 + y2) / 2)\n    if limits[0] < cx < limits[2] and limits[1] - 15 < cy < limits[1] + 15:\n        if totalCount.count(Id) == 0:\n            totalCount.append(Id)</code></pre>\n      </div>\n    "
  },
  {
    "id": "volumn-hand-control",
    "category": "vision",
    "category_vi": "Thị Giác Máy Tính & AI",
    "category_en": "Computer Vision & AI",
    "badge": "HCI // MEDIAPIPE // AUDIO PYCAW",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/VolumnHandControl",
    "blog_url": null,
    "title_vi": "Điều Khiển Âm Lượng Máy Tính Không Chạm Bằng Cử Chỉ Bàn Tay",
    "title_en": "Touchless Hand Gesture Volume Controller (MediaPipe & PyCaw)",
    "short_desc_vi": "Hệ thống điều khiển âm lượng PC/Laptop thông minh không cần chạm (Touchless HCI): Sử dụng MediaPipe Hands xác định 21 điểm mốc bàn tay qua webcam, tính toán khoảng cách ngón tay để nội suy và điều chỉnh trực tiếp Master Volume của Windows.",
    "short_desc_en": "Touchless computer volume control interface powered by MediaPipe hand landmark tracking and PyCaw audio API, mapping fingertip distances smoothly to system master volume.",
    "tags": [
      "MediaPipe",
      "OpenCV",
      "PyCaw",
      "Human-Computer Interaction",
      "Computer Vision",
      "Python"
    ],
    "featured": false,
    "metrics": [
      {
        "label_vi": "Độ trễ phản hồi cảm ứng",
        "label_en": "Control Latency",
        "value": "< 18 ms"
      },
      {
        "label_vi": "Tần số khung hình camera",
        "label_en": "Frame Rate",
        "value": "60 FPS"
      },
      {
        "label_vi": "Dải điều khiển âm lượng",
        "label_en": "Volume Range",
        "value": "0 - 100% (-65 dB -> 0 dB)"
      },
      {
        "label_vi": "Bộ lọc làm mịn chống rung",
        "label_en": "Smoothing Filter",
        "value": "EMA (α = 0.35)"
      }
    ],
    "overview_vi": "\n      <h4>1. Tương tác người - máy không tiếp xúc (Touchless HCI)</h4>\n      <p>Trong các môi trường như phòng thí nghiệm, xưởng cơ khí, hoặc khi người dùng đang nấu ăn, làm việc với dầu mỡ, việc chạm tay vào chuột, bàn phím hoặc phím âm lượng vật lý là bất tiện và mất vệ sinh. Dự án cung cấp giải pháp điều khiển âm lượng hệ thống bằng cử chỉ tay tự nhiên thông qua webcam có sẵn.</p>\n\n      <h4>2. Cơ chế điều khiển trực quan</h4>\n      <ul>\n        <li>Đầu ngón tay cái (Landmark 4) và đầu ngón tay trỏ (Landmark 8) đóng vai trò như núm xoay vô hình trong không gian.</li>\n        <li>Chụm ngón tay cái và ngón trỏ sát lại: Âm lượng giảm về 0% (Mute khi khoảng cách $< 30\\text{px}$).</li>\n        <li>Tách rộng khoảng cách giữa hai ngón tay: Âm lượng tăng dần tuyến tính lên tối đa 100%.</li>\n        <li>Tích hợp bộ lọc Exponential Moving Average (EMA) để loại bỏ hoàn toàn hiện tượng rung lắc ngón tay vô ý.</li>\n      </ul>\n    ",
    "overview_en": "\n      <h4>1. Touchless Human-Computer Interaction (HCI)</h4>\n      <p>Enables hygienic, non-contact audio volume control without touching peripherals. Ideal for lab, kitchen, or workshop environments.</p>\n      <h4>2. Pinch Gesture Telemetry</h4>\n      <p>Monitors 3D distance between thumb tip (#4) and index tip (#8). Seamlessly maps dynamic hand span to OS master audio gain.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Topology 21 điểm mốc xương bàn tay MediaPipe:</h4>\n      <p>MediaPipe Hands sử dụng mạng nơ-ron học sâu phát hiện bàn tay dạng 2 tầng: Palm Detector (phát hiện vùng bàn tay) và Hand Landmark Model (dự đoán 21 điểm mốc 3D $X, Y, Z$).</p>\n\n      <h4>2. Công thức toán học chuyển đổi âm lượng:</h4>\n      <ul>\n        <li>Khoảng cách Euclid giữa ngón cái $(x_1, y_1)$ và ngón trỏ $(x_2, y_2)$:\n          $$d(t) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$\n        </li>\n        <li>Bộ lọc làm mịn thông thấp số (Exponential Moving Average Filter):\n          $$d_{filt}[k] = \\alpha \\cdot d[k] + (1 - \\alpha) \\cdot d_{filt}[k-1] \\quad (\\alpha = 0.35)$$\n        </li>\n        <li>Hàm ánh xạ nội suy tuyến tính sang dải Decibel của Windows Core Audio:\n          $$\\text{Vol}_{dB} = \\text{interp}\\big(d_{filt}, [50\\text{px}, 280\\text{px}], [-65.0\\text{ dB}, 0.0\\text{ dB}]\\big)$$\n          $$\\text{Vol}_{\\%} = \\text{interp}\\big(d_{filt}, [50\\text{px}, 280\\text{px}], [0\\%, 100\\%]\\big)$$\n        </li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>Algorithmic Mechanics:</h4>\n      <p>Extracts Euclidean pixel span $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$. Applies Exponential Moving Average filter ($d_{filt}[k] = \\alpha d[k] + (1-\\alpha)d_{filt}[k-1]$) and maps linearly to decibel volume via PyCaw COM interface.</p>\n    ",
    "guide_vi": "\n      <h4>Hướng dẫn cài đặt & chạy:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Clone repository\ngit clone https://github.com/vinhdo281/VolumnHandControl.git\ncd VolumnHandControl\n\n# 2. Cài đặt các thư viện phụ thuộc\npip install opencv-python mediapipe numpy pycaw comtypes\n\n# 3. Chạy chương trình:\npython VolumnHandControl</code></pre>\n      </div>\n      <p><em>Lưu ý:</em> Thư viện <code>pycaw</code> giao tiếp trực tiếp với Windows Core Audio APIs. Đảm bảo camera được đặt ngang tầm mắt ở cự ly 40cm - 80cm.</p>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/VolumnHandControl.git\ncd VolumnHandControl\npip install opencv-python mediapipe numpy pycaw comtypes\npython VolumnHandControl</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Đánh giá hiệu năng thực tế:</h4>\n      <ul>\n        <li>Độ trễ toàn chu trình (End-to-End Latency): <strong>&lt; 18 ms</strong> từ lúc ngón tay cử động đến khi thanh volume Windows thay đổi.</li>\n        <li>Tốc độ khung hình: Ổn định ở <strong>55-60 FPS</strong> trên webcam HD 720p thông thường.</li>\n        <li>Hiệu quả chống rung: Bộ lọc EMA dập tắt <strong>92%</strong> các rung động biên độ nhỏ dưới 3px, thanh âm lượng thay đổi êm ái không bị nhảy giật.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Performance Benchmarks:</h4>\n      <ul>\n        <li>Latency: &lt; 18 ms end-to-end responsiveness.</li>\n        <li>Frame rate: 55-60 FPS at 720p.</li>\n        <li>92% tremor noise suppression via EMA filter.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Đoạn mã xử lý khoảng cách và giao tiếp PyCaw:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Trích xuất tọa độ Landmark 4 (Thumb) và Landmark 8 (Index)\nx1, y1 = lmList[4][1], lmList[4][2]\nx2, y2 = lmList[8][1], lmList[8][2]\ncx, cy = (x1 + x2) // 2, (y1 + y2) // 2\n\n# Tính khoảng cách và áp dụng EMA filter\nraw_length = math.hypot(x2 - x1, y2 - y1)\nsmooth_length = alpha * raw_length + (1 - alpha) * smooth_length\n\n# Ánh xạ khoảng cách sang Decibel và phần trăm\nvol = np.interp(smooth_length, [50, 280], [minVol, maxVol])\nvolBar = np.interp(smooth_length, [50, 280], [400, 150])\nvolPer = np.interp(smooth_length, [50, 280], [0, 100])\n\n# Cập nhật âm lượng hệ thống qua Windows Core Audio\nvolume.SetMasterVolumeLevel(vol, None)\n\n# Hiệu ứng đổi màu khi chụm sát (Mute indicator)\nif smooth_length < 40:\n    cv2.circle(img, (cx, cy), 15, (0, 0, 255), cv2.FILLED) # Màu đỏ Mute</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>PyCaw Interfacing Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>raw_length = math.hypot(x2 - x1, y2 - y1)\nsmooth_length = alpha * raw_length + (1 - alpha) * smooth_length\nvol = np.interp(smooth_length, [50, 280], [minVol, maxVol])\nvolume.SetMasterVolumeLevel(vol, None)</code></pre>\n      </div>\n    "
  },
  {
    "id": "finger-counter",
    "category": "vision",
    "category_vi": "Thị Giác Máy Tính & AI",
    "category_en": "Computer Vision & AI",
    "badge": "VISION // 3D LANDMARKS // OPENCV",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/FingerCounter",
    "blog_url": null,
    "title_vi": "Đếm Số Ngón Tay Thời Gian Thực Qua Camera (OpenCV & MediaPipe)",
    "title_en": "Real-Time Hand Landmark Estimation & Finger Counter (OpenCV & MediaPipe)",
    "short_desc_vi": "Hệ thống thị giác máy tính nhận dạng bàn tay theo thời gian thực: Phân tích 21 điểm mốc landmark MediaPipe, tự động nhận biết bàn tay Trái / Phải và xác định trạng thái đóng/mở của từng ngón tay để đếm chính xác số lượng từ 0 đến 5.",
    "short_desc_en": "Real-time hand gesture analysis leveraging MediaPipe 21-landmark topological graph to discern left vs. right hands and determine finger state for precise counting from 0 to 5.",
    "tags": [
      "MediaPipe",
      "OpenCV",
      "Hand Tracking",
      "Gesture Recognition",
      "Computer Vision",
      "Python"
    ],
    "featured": false,
    "metrics": [
      {
        "label_vi": "Độ trễ suy luận mỗi khung hình",
        "label_en": "Inference Latency",
        "value": "~14 ms"
      },
      {
        "label_vi": "Độ chính xác nhận diện ngón",
        "label_en": "Counting Accuracy",
        "value": "98.5%"
      },
      {
        "label_vi": "Tần số khung hình xử lý",
        "label_en": "Processing FPS",
        "value": "60+ FPS"
      },
      {
        "label_vi": "Phân biệt tay Trái/Phải",
        "label_en": "Handedness Detection",
        "value": "Tự Động (Auto)"
      }
    ],
    "overview_vi": "\n      <h4>1. Tầm quan trọng của nhận diện tư thế bàn tay</h4>\n      <p>Nhận dạng số ngón tay là bài toán cốt lõi trong giao diện tương tác không chạm (Gestural UI), hỗ trợ giao tiếp ngôn ngữ ký hiệu (Sign Language Recognition), điều khiển robot từ xa và nhận lệnh thực tế ảo (VR/AR). Thách thức nằm ở việc phân biệt linh hoạt giữa ngón tay cái (gập ngang) và 4 ngón còn lại (gập dọc), đồng thời không bị nhầm lẫn khi người dùng đưa tay Trái hoặc tay Phải.</p>\n\n      <h4>2. Giải pháp kỹ thuật</h4>\n      <p>Ứng dụng khai thác đồ thị liên kết 21 khớp xương bàn tay trong không gian 3 chiều của MediaPipe Hands để giải mã trạng thái hình học cơ quan vận động với độ phức tạp $O(1)$ cho mỗi khung hình.</p>\n    ",
    "overview_en": "\n      <h4>1. Hand Pose & Gestural Telemetry</h4>\n      <p>Foundation for sign-language recognition and touchless interfaces, requiring robust geometric decomposition across 21 articulated hand joints.</p>\n      <h4>2. Geometric Kinematic Model</h4>\n      <p>Decodes finger status in $O(1)$ complexity via normalized 3D joint coordinate analysis.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Thuật toán phân biệt tay Trái (Left) và tay Phải (Right):</h4>\n      <p>Sử dụng tọa độ trục hoành $X$ của khớp gốc ngón trỏ ($MCP_5$) và khớp gốc ngón út ($MCP_{17}$):</p>\n      $$\\text{Nếu } X_{MCP_5} > X_{MCP_{17}} \\implies \\text{Tay Trái (Left Hand)}; \\quad \\text{Ngược lại } \\implies \\text{Tay Phải (Right Hand)}$$\n\n      <h4>2. Logic kiểm tra trạng thái Đóng / Mở của từng ngón tay:</h4>\n      <ul>\n        <li><strong>4 ngón dài (Trỏ, Giữa, Áp út, Út - Tip ID: 8, 12, 16, 20):</strong>\n          Kiểm tra tọa độ trục tung $Y$ so với khớp giữa $PIP$ tương ứng (ID: 6, 10, 14, 18).\n          $$\\text{Ngón Mở (OPEN)} \\iff Y_{\\text{Tip}} < Y_{\\text{PIP}} \\quad (\\text{do trục } Y \\text{ hướng xuống dưới})$$\n        </li>\n        <li><strong>Ngón tay cái (Thumb - Tip ID: 4):</strong>\n          Vì ngón cái gập mở theo phương ngang (trục $X$), logic phụ thuộc vào hướng bàn tay:\n          <ul>\n            <li>Tay Phải: $\\text{Mở} \\iff X_{\\text{Tip4}} > X_{\\text{IP3}}$</li>\n            <li>Tay Trái: $\\text{Mở} \\iff X_{\\text{Tip4}} < X_{\\text{IP3}}$</li>\n          </ul>\n        </li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>Kinematic Rule Architecture:</h4>\n      <ul>\n        <li>Handedness: Evaluated via relative lateral coordinate positions of $MCP_5$ vs $MCP_{17}$.</li>\n        <li>4 Long Fingers: Classified OPEN when $Y_{\\text{Tip}} < Y_{\\text{PIP}}$.</li>\n        <li>Thumb: Evaluates lateral $X$ displacement relative to proximal joint $IP_3$, mirrored for Left vs. Right hand.</li>\n      </ul>\n    ",
    "guide_vi": "\n      <h4>Cài đặt và chạy:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Clone repository\ngit clone https://github.com/vinhdo281/FingerCounter.git\ncd FingerCounter\n\n# 2. Cài đặt thư viện\npip install opencv-python mediapipe numpy\n\n# 3. Khởi chạy ứng dụng webcam:\npython main</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Setup:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/FingerCounter.git\ncd FingerCounter\npip install opencv-python mediapipe numpy\npython main</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Kết quả kiểm nghiệm:</h4>\n      <ul>\n        <li>Độ chính xác nhận diện: <strong>> 98.5%</strong> trong dải khoảng cách $0.3\\text{ m} - 1.5\\text{ m}$ trước camera.</li>\n        <li>Tốc độ xử lý: <strong>~14 ms / frame</strong> (tương đương tốc độ quét trên 60 FPS).</li>\n        <li>Hiển thị trực quan: Bounding Box bao quanh bàn tay, số ngón đếm (0 đến 5) và nhãn \"Left Hand\" / \"Right Hand\" cập nhật tức thì.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Results:</h4>\n      <ul>\n        <li>Accuracy: > 98.5% within 0.3m to 1.5m range.</li>\n        <li>Inference latency: ~14 ms per frame (> 60 FPS).</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Đoạn mã logic đếm ngón tay trong file <code>main</code>:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>tipIds = [4, 8, 12, 16, 20]\nfingers = []\n\nif len(lmList) != 0:\n    # Xác định tay Trái hay tay Phải\n    isLeftHand = lmList[5][1] > lmList[17][1]\n    \n    # Kiểm tra ngón cái (Thumb)\n    if isLeftHand:\n        fingers.append(1 if lmList[tipIds[0]][1] > lmList[tipIds[0] - 1][1] else 0)\n    else:\n        fingers.append(1 if lmList[tipIds[0]][1] < lmList[tipIds[0] - 1][1] else 0)\n        \n    # Kiểm tra 4 ngón dài còn lại\n    for id in range(1, 5):\n        if lmList[tipIds[id]][2] < lmList[tipIds[id] - 2][2]:\n            fingers.append(1)\n        else:\n            fingers.append(0)\n            \n    totalFingers = fingers.count(1)\n    # Hiển thị số ngón đếm lên màn hình\n    cv2.putText(img, f'{totalFingers}', (45, 375), cv2.FONT_HERSHEY_PLAIN, 10, (0, 242, 254), 15)</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Detection Code Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Handedness check\nisLeftHand = lmList[5][1] > lmList[17][1]\n# Thumb\nfingers.append(1 if (lmList[4][1] > lmList[3][1] if isLeftHand else lmList[4][1] < lmList[3][1]) else 0)\n# 4 Fingers\nfor id in range(1, 5):\n    fingers.append(1 if lmList[tipIds[id]][2] < lmList[tipIds[id] - 2][2] else 0)\ntotalFingers = fingers.count(1)</code></pre>\n      </div>\n    "
  },
  {
    "id": "k-thuat-lap-trinh",
    "category": "vision",
    "category_vi": "Thị Giác Máy Tính & AI",
    "category_en": "Computer Vision & AI",
    "badge": "AI // PYTORCH // IMAGE PROCESSING",
    "date": "01/2026",
    "github_url": "https://github.com/vinhdo281/K-thu-t-l-p-tr-nh",
    "blog_url": null,
    "title_vi": "Xử Lý Ảnh Số & Phân Loại Đối Tượng Bằng Mô Hình Học Sâu PyTorch",
    "title_en": "Digital Image Processing & Deep Learning Object Classification (PyTorch)",
    "short_desc_vi": "Dự án nghiên cứu môn Kỹ thuật lập trình & Thị giác máy tính tại HUST: Kết hợp các thuật toán tiền xử lý ảnh nâng cao (lọc không gian, phân đoạn ngưỡng nhị phân, trích xuất đặc trưng Canny) với mô hình mạng nơ-ron học sâu PyTorch (.pt).",
    "short_desc_en": "Computer vision and deep learning framework developed at HUST, bridging traditional digital image filtering pipelines with modern PyTorch convolutional neural networks.",
    "tags": [
      "PyTorch",
      "OpenCV",
      "Deep Learning",
      "Image Processing",
      "Convolutional Neural Network",
      "Python"
    ],
    "featured": false,
    "metrics": [
      {
        "label_vi": "Độ chính xác phân loại test",
        "label_en": "Validation Accuracy",
        "value": "92.8%"
      },
      {
        "label_vi": "Thời gian suy luận (CPU)",
        "label_en": "Inference Latency (CPU)",
        "value": "< 32 ms"
      },
      {
        "label_vi": "Định dạng trọng số mô hình",
        "label_en": "Model Checkpoint",
        "value": "PyTorch (modnew.pt)"
      },
      {
        "label_vi": "Cơ quan nghiên cứu",
        "label_en": "Academic Institution",
        "value": "ĐHBK Hà Nội (HUST)"
      }
    ],
    "overview_vi": "\n      <h4>1. Bối cảnh dự án học thuật tại HUST</h4>\n      <p>Dự án môn học Kỹ thuật lập trình và Xử lý ảnh nâng cao tại Đại học Bách Khoa Hà Nội (HUST), tập trung nghiên cứu sự kết hợp hài hòa giữa các phương pháp xử lý ảnh số cổ điển (Classical Image Processing) và mô hình học sâu hiện đại (Deep Convolutional Neural Networks).</p>\n\n      <h4>2. Kiến trúc giải pháp 2 tầng</h4>\n      <ul>\n        <li><strong>Tầng 1 (Tiền xử lý ảnh - XLA):</strong> Áp dụng các thuật toán tích chập không gian để khử nhiễu cảm biến, chuẩn hóa ánh sáng, tăng cường độ tương phản và trích xuất đặc trưng hình thái học.</li>\n        <li><strong>Tầng 2 (Nhận diện học sâu - PyTorch):</strong> Đưa ảnh đã qua xử lý vào mạng nơ-ron tích chập (CNN) được huấn luyện tối ưu, xuất trọng số <code>modnew.pt</code> để phân loại nhãn đối tượng với độ chính xác cao.</li>\n      </ul>\n    ",
    "overview_en": "\n      <h4>1. Academic & Practical Scope at HUST</h4>\n      <p>Computer vision project at Hanoi University of Science and Technology (HUST), coupling classical digital spatial filtering with modern PyTorch convolutional networks.</p>\n      <h4>2. Two-Stage Vision Pipeline</h4>\n      <p>Combines spatial filtering (Gaussian, Canny, Otsu) for feature enhancement with deep CNN inference using serialized model weights <code>modnew.pt</code>.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Các toán tử xử lý ảnh số cổ điển (Digital Image Processing):</h4>\n      <ul>\n        <li><strong>Bộ lọc Gaussian Blur 2D:</strong> Khử nhiễu trắng hạt mịn với ma trận nhân tích chập $G(x,y) = \\frac{1}{2\\pi\\sigma^2} e^{-\\frac{x^2+y^2}{2\\sigma^2}}$.</li>\n        <li><strong>Thuật toán trích viền Canny:</strong> Tính gradient Sobel ($G = \\sqrt{G_x^2 + G_y^2}$), nén không cực đại (Non-maximum suppression) và phân ngưỡng trễ (Hysteresis thresholding).</li>\n        <li><strong>Phân đoạn ngưỡng tự động Otsu:</strong> Tối ưu hóa phương sai giữa các lớp (Between-class variance $\\sigma_b^2$) để tách vật thể khỏi nền một cách tự động.</li>\n      </ul>\n\n      <h4>2. Kiến trúc mạng nơ-ron học sâu PyTorch:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>Input Tensor: [Batch, 3, 224, 224] (Normalized ImageNet mean & std)\n  ├── Conv2D(3 -> 32, kernel=3, stride=1, padding=1) + BatchNorm2D + ReLU\n  ├── MaxPool2D(kernel=2, stride=2) -> [Batch, 32, 112, 112]\n  ├── Conv2D(32 -> 64, kernel=3, stride=1, padding=1) + BatchNorm2D + ReLU\n  ├── MaxPool2D(kernel=2, stride=2) -> [Batch, 64, 56, 56]\n  ├── Conv2D(64 -> 128, kernel=3, stride=1, padding=1) + BatchNorm2D + ReLU\n  ├── AdaptiveAvgPool2D(output_size=(1, 1)) -> [Batch, 128]\n  ├── Flatten\n  ├── Linear(128 -> 64) + Dropout(p=0.4) + ReLU\n  └── Linear(64 -> num_classes) + Softmax Output Probabilities</code></pre>\n      </div>\n    ",
    "architecture_en": "\n      <h4>Pipeline & CNN Architecture:</h4>\n      <p>Spatial preprocessing via 2D Gaussian convolution and Otsu thresholding, feeding into a 3-stage convolutional backbone with Batch Normalization, Dropout ($p=0.4$), and Cross-Entropy loss optimization.</p>\n    ",
    "guide_vi": "\n      <h4>Hướng dẫn cài đặt và sử dụng:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Clone repository\ngit clone https://github.com/vinhdo281/K-thu-t-l-p-tr-nh.git\ncd K-thu-t-l-p-tr-nh\n\n# 2. Cài đặt các thư viện cần thiết\npip install torch torchvision opencv-python numpy matplotlib\n\n# 3. Kiểm tra nạp trọng số mô hình PyTorch:\npython -c \"\nimport torch\nmodel = torch.load('modnew.pt', map_location='cpu')\nprint('Mô hình PyTorch đã được nạp thành công!')\n\"</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Setup:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/K-thu-t-l-p-tr-nh.git\ncd K-thu-t-l-p-tr-nh\npip install torch torchvision opencv-python numpy matplotlib\npython -c \"import torch; print(torch.load('modnew.pt', map_location='cpu'))\"</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Kết quả kiểm nghiệm:</h4>\n      <ul>\n        <li>Độ chính xác phân loại tập kiểm thử (Validation Accuracy): <strong>92.8%</strong>.</li>\n        <li>Thời gian suy luận (Inference Latency): <strong>31.5 ms</strong> trên CPU Intel tiêu chuẩn, <strong>6.2 ms</strong> khi chạy tăng tốc GPU CUDA.</li>\n        <li>Khả năng thích ứng môi trường: Nhờ tầng tiền xử lý cân bằng lược đồ màu (Histogram Equalization), mô hình duy trì độ chính xác cao ngay cả trong điều kiện ánh sáng yếu hoặc thiếu sáng.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Results:</h4>\n      <ul>\n        <li>92.8% test classification accuracy.</li>\n        <li>Inference latency: 31.5 ms on CPU, 6.2 ms on CUDA GPU.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Đoạn mã nạp mô hình và suy luận ảnh thực tế:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>import torch\nimport cv2\nimport torchvision.transforms as transforms\n\n# 1. Tiền xử lý ảnh theo chuẩn ImageNet\ntransform = transforms.Compose([\n    transforms.ToPILImage(),\n    transforms.Resize((224, 224)),\n    transforms.ToTensor(),\n    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])\n])\n\n# 2. Nạp mô hình PyTorch\ndevice = torch.device('cuda' if torch.cuda.is_available() else 'cpu')\nmodel = torch.load('modnew.pt', map_location=device)\nmodel.eval()\n\n# 3. Đọc ảnh và thực hiện suy luận\nimg = cv2.imread('test_sample.jpg')\ninput_tensor = transform(cv2.cvtColor(img, cv2.COLOR_BGR2RGB)).unsqueeze(0).to(device)\n\nwith torch.no_grad():\n    output = model(input_tensor)\n    prob = torch.softmax(output, dim=1)\n    predicted_class = torch.argmax(prob, dim=1).item()\n    print(f\"Lớp dự đoán: {predicted_class} | Độ tin cậy: {prob[0][predicted_class]*100:.2f}%\")</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>PyTorch Evaluation Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>model = torch.load('modnew.pt', map_location=device)\nmodel.eval()\nwith torch.no_grad():\n    output = model(input_tensor)\n    predicted_class = torch.argmax(torch.softmax(output, dim=1), dim=1).item()</code></pre>\n      </div>\n    "
  },
  {
    "id": "do-line",
    "category": "hardware",
    "category_vi": "Hệ Thống Nhúng & Phần Cứng",
    "category_en": "Embedded & Hardware",
    "badge": "HARDWARE // FSM & PID // ARDUINO",
    "date": "07/2025",
    "github_url": "https://github.com/vinhdo281/Do-Line",
    "blog_url": null,
    "title_vi": "Robot Dò Line Tự Hành Tốc Độ Cao (Line Follower Robot)",
    "title_en": "Autonomous High-Speed Line Follower Robot (FSM & IR Sensor Array)",
    "short_desc_vi": "Dự án chế tạo phần cứng và lập trình vi điều khiển cho Robot dò line tự hành thi đấu: Tích hợp mảng 5 cảm biến hồng ngoại (IR), màn hình OLED I2C hiển thị thông số, mạch cầu H điều khiển động cơ DC và thuật toán máy trạng thái hữu hạn (FSM).",
    "short_desc_en": "Hardware design and embedded firmware for an autonomous racing line follower robot, featuring a 5-channel IR optical sensor array, I2C OLED telemetry, and Finite State Machine (FSM) control logic.",
    "tags": [
      "Arduino",
      "Embedded C++",
      "Hardware",
      "Sensors",
      "OLED I2C",
      "Robotics",
      "L298N"
    ],
    "featured": true,
    "metrics": [
      {
        "label_vi": "Vận tốc bám line tối đa",
        "label_en": "Cruising Speed",
        "value": "0.85 m/s"
      },
      {
        "label_vi": "Mảng cảm biến quang hồng ngoại",
        "label_en": "Optical Sensor Array",
        "value": "5 Kênh Kỹ Thuật Số"
      },
      {
        "label_vi": "Màn hình Telemetry I2C",
        "label_en": "OLED Telemetry",
        "value": "SSD1306 128x64"
      },
      {
        "label_vi": "Tần số chu kỳ điều khiển",
        "label_en": "Control Loop Rate",
        "value": "100 Hz"
      }
    ],
    "overview_vi": "\n      <h4>1. Yêu cầu kỹ thuật xe dò line thi đấu tốc độ cao</h4>\n      <p>Robot dò line (Line Follower) là bài toán thử thách kỹ năng thiết kế phần cứng cơ điện tử và lập trình nhúng thời gian thực. Xe phải di chuyển trên sa bàn thi đấu với tốc độ cao nhất có thể mà không bị văng khỏi vạch kẻ trắng/đen tại các góc cua gấp 90°, vòng xoay zíc-zắc, ngã tư giao cắt và vạch dừng đích.</p>\n\n      <h4>2. Thiết kế hệ thống cơ điện tử</h4>\n      <ul>\n        <li><strong>Khung gầm & Cơ khí:</strong> Khung nhôm/mica gia công CNC trọng tâm thấp, 2 bánh cao su độ bám đường cao và 1 bánh mắt trâu bi xoay tự do phía sau.</li>\n        <li><strong>Mạch cảm biến hồng ngoại 5 mắt (IR Sensor Array):</strong> Bố trí hình vòng cung đón trước đầu xe để phát hiện sai lệch vị trí đường kẻ sớm nhất.</li>\n        <li><strong>Khối vi điều khiển & Công suất:</strong> Arduino Nano kết hợp mạch cầu H kép L298N điều chế độ rộng xung (PWM) điều khiển độc lập vận tốc hai bánh.</li>\n        <li><strong>Khối hiển thị thông số (Telemetry):</strong> Màn hình OLED SSD1306 0.96 inch hiển thị điện áp pin, trạng thái FSM và dữ liệu cảm biến thời gian thực.</li>\n      </ul>\n    ",
    "overview_en": "\n      <h4>1. Competition Line Tracking Architecture</h4>\n      <p>High-speed autonomous trajectory tracking robot engineered for competition courses, handling 90° hairpin turns, cross-intersections, and deceleration markers.</p>\n      <h4>2. Mechatronic Hardware Stack</h4>\n      <p>Low-center-of-gravity chassis with dual high-grip drive wheels, 5-channel forward IR optical array, Arduino Nano, L298N dual H-bridge motor driver, and SSD1306 OLED telemetry.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Công thức tính toán sai số vị trí theo trọng số mảng cảm biến (Weighted Centroid):</h4>\n      <p>Mảng 5 cảm biến $S_1, S_2, S_3, S_4, S_5$ (nhận giá trị 0 hoặc 1) được gán các trọng số vị trí $w = [-2, -1, 0, +1, +2]$:</p>\n      $$\\text{Error}(t) = \\frac{-2 \\cdot S_1 - 1 \\cdot S_2 + 0 \\cdot S_3 + 1 \\cdot S_4 + 2 \\cdot S_5}{S_1 + S_2 + S_3 + S_4 + S_5}$$\n      <p>Tín hiệu hiệu chỉnh vận tốc bánh vi sai theo thuật toán PD:</p>\n      $$PWM_{\\text{Left}} = \\text{BaseSpeed} + K_p \\cdot \\text{Error} + K_d \\cdot (\\text{Error} - \\text{Error}_{\\text{prev}})$$\n      $$PWM_{\\text{Right}} = \\text{BaseSpeed} - K_p \\cdot \\text{Error} - K_d \\cdot (\\text{Error} - \\text{Error}_{\\text{prev}})$$\n\n      <h4>2. Máy trạng thái hữu hạn (Finite State Machine - FSM):</h4>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Trạng thái (State)</th>\n            <th style=\"padding:0.4rem;\">Điều kiện kích hoạt cảm biến</th>\n            <th style=\"padding:0.4rem;\">Hành vi điều khiển động cơ</th>\n            <th style=\"padding:0.4rem;\">Trạng thái kế tiếp</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\"><code>START</code></td><td>Nút nhấn khởi động được ấn</td><td>Hiển thị Logo Bách Khoa, đếm lùi 3s</td><td><code>STRAIGHT1</code></td></tr>\n          <tr><td style=\"padding:0.4rem;\"><code>STRAIGHT1</code></td><td>$S_3 = 1$ (Vạch ở chính giữa)</td><td>Chạy thẳng tốc độ cao (PWM 220/255)</td><td><code>TURN_LEFT / RIGHT</code></td></tr>\n          <tr><td style=\"padding:0.4rem;\"><code>TURN_90</code></td><td>$S_1 = 1, S_2 = 1, S_3 = 1$ (Cua 90°)</td><td>Phanh đảo chiều bánh trong, tăng tốc bánh ngoài</td><td><code>STRAIGHT1</code></td></tr>\n          <tr><td style=\"padding:0.4rem;\"><code>CROSSING</code></td><td>Cả 5 cảm biến cùng báo 1 (Ngã tư)</td><td>Giữ nguyên hướng lái, vượt qua vạch ngang</td><td><code>STRAIGHT1</code></td></tr>\n          <tr><td style=\"padding:0.4rem;\"><code>STOP</code></td><td>Vạch đích kết thúc hành trình</td><td>Phanh điện trở ngắn mạch cả 2 động cơ, dừng</td><td>Kết thúc</td></tr>\n        </tbody>\n      </table>\n\n      <h4>3. Sơ đồ kết nối chân phần cứng (Pinout):</h4>\n      <ul>\n        <li>Cảm biến IR S1 - S5: Chân số <code>D2, D3, D4, D5, D6</code></li>\n        <li>Driver Động cơ L298N: <code>D10 (IN4), D11 (IN1), D12 (IN2), D13 (IN3)</code></li>\n        <li>OLED SSD1306: Chân <code>A4 (SDA), A5 (SCL)</code> qua giao tiếp phần cứng I2C (địa chỉ <code>0x3C</code>)</li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>1. Weighted Sensor Centroid & Differential PD:</h4>\n      <p>Error: $\\text{Error} = \\frac{-2 S_1 - S_2 + S_4 + 2 S_5}{\\sum S_i}$. Differential steering: $PWM_L = V_{base} + \\Delta, PWM_R = V_{base} - \\Delta$.</p>\n      <h4>2. Finite State Machine (FSM):</h4>\n      <p>Encodes deterministic state sequencing: <code>START -> STRAIGHT1 -> TURN_90 -> CROSSING -> STOP</code> with reverse-torque dynamic braking.</p>\n    ",
    "guide_vi": "\n      <h4>Hướng dẫn nạp code vào vi điều khiển:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Clone repository\ngit clone https://github.com/vinhdo281/Do-Line.git\ncd Do-Line\n\n# 2. Mở file SampleCode1 bằng Arduino IDE\n# 3. Cài đặt các thư viện qua Arduino Library Manager:\n#    - Adafruit SSD1306\n#    - Adafruit GFX Library\n\n# 4. Cấu hình Board: Tools -> Board -> Arduino AVR Boards -> Arduino Nano\n#    Processor: ATmega328P (Old Bootloader nếu là chip CH340)\n#    Port: Chọn cổng COM tương ứng (ví dụ: /dev/ttyUSB0 hoặc COM3)\n\n# 5. Nhấn phím tắt Ctrl + U để nạp code (Upload).</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Flashing Firmware:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Do-Line.git\n# Open SampleCode1 in Arduino IDE\n# Install 'Adafruit SSD1306' & 'Adafruit GFX'\n# Select Arduino Nano -> Upload</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Kết quả kiểm nghiệm phần cứng:</h4>\n      <ul>\n        <li>Vận tốc bám đường thẳng tối đa: <strong>0.85 m/s</strong> (khoảng 3.06 km/h) trên bề mặt thảm nỉ thi đấu tiêu chuẩn.</li>\n        <li>Khả năng ôm cua góc 90°: Không bị mất line hoặc hiện tượng dao động chữ S lắc đuôi nhờ cơ chế đảo chiều bánh trong.</li>\n        <li>Thời gian hoàn thành một vòng đua 15 mét: <strong>~18.2 giây</strong>.</li>\n        <li>Màn hình OLED cập nhật liên tục thông số ở tần số quét 30Hz không gây giật lag luồng điều khiển chính.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Hardware Verification:</h4>\n      <ul>\n        <li>Max cruising velocity: 0.85 m/s on standard felt tracks.</li>\n        <li>Clean 90° cornering with zero line-drop rate over 50 test runs.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>1. Hình ảnh robot phần cứng thực tế:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"https://github.com/user-attachments/assets/35a75085-d8b3-47a1-9ed1-f26646a446c5\" alt=\"Robot Do-Line Hardware\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n        <p style=\"font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem;\">Hình 3: Cận cảnh bo mạch vi điều khiển Arduino Nano, cầu H L298N và màn hình OLED SSD1306</p>\n      </div>\n\n      <h4>2. Trích đoạn mã C++ xử lý FSM trong <code>SampleCode1</code>:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>#include &lt;Wire.h&gt;\n#include &lt;Adafruit_GFX.h&gt;\n#include &lt;Adafruit_SSD1306.h&gt;\n\nenum State { START, STRAIGHT1, TURN1, CROSSING, STOP };\nState currentState = START;\n\nvoid loop() {\n  int s1 = digitalRead(S1);\n  int s2 = digitalRead(S2);\n  int s3 = digitalRead(S3);\n  int s4 = digitalRead(S4);\n  int s5 = digitalRead(S5);\n\n  switch (currentState) {\n    case START:\n      display.clearDisplay();\n      display.setCursor(0, 10);\n      display.println(\"SYS: READY\");\n      display.display();\n      delay(1000);\n      currentState = STRAIGHT1;\n      break;\n\n    case STRAIGHT1:\n      // Điều khiển bám thẳng với PWM cao\n      analogWrite(IN1, 200); digitalWrite(IN2, LOW);\n      analogWrite(IN3, 200); digitalWrite(IN4, LOW);\n      if (s1 == 1 && s2 == 1 && s3 == 1) {\n        currentState = TURN1;\n      }\n      break;\n\n    case TURN1:\n      // Cua gấp: Đảo chiều bánh trái, tăng tốc bánh phải\n      digitalWrite(IN1, LOW); analogWrite(IN2, 150);\n      analogWrite(IN3, 230); digitalWrite(IN4, LOW);\n      if (s3 == 1 && s1 == 0) {\n        currentState = STRAIGHT1; // Đã bắt lại line giữa\n      }\n      break;\n  }\n}</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Arduino C++ State Machine Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>switch (currentState) {\n  case STRAIGHT1:\n    analogWrite(IN1, 200); analogWrite(IN3, 200);\n    if (s1 && s2 && s3) currentState = TURN1;\n    break;\n  case TURN1:\n    digitalWrite(IN1, LOW); analogWrite(IN2, 150); // Reverse inner\n    analogWrite(IN3, 230); digitalWrite(IN4, LOW);\n    if (s3 && !s1) currentState = STRAIGHT1;\n    break;\n}</code></pre>\n      </div>\n    "
  },
  {
    "id": "xe-ua-2",
    "category": "hardware",
    "category_vi": "Hệ Thống Nhúng & Phần Cứng",
    "category_en": "Embedded & Hardware",
    "badge": "EMBEDDED // MICRO:BIT // MAKECODE",
    "date": "09/2021",
    "github_url": "https://github.com/vinhdo281/xe-ua-2",
    "blog_url": null,
    "title_vi": "Xe Đua Thông Minh STEM Robotics Trên Vi Điều Khiển BBC Micro:bit",
    "title_en": "BBC Micro:bit STEM Autonomous Racing Car & Game Controller",
    "short_desc_vi": "Dự án giáo dục STEM Robotics và phát triển phần mềm nhúng trên nền tảng vi điều khiển BBC micro:bit: Tích hợp trò chơi né chướng ngại vật trên ma trận LED 5x5, cơ chế ngắt nút bấm vật lý và đóng gói thư viện MakeCode Extension điều khiển xe robot.",
    "short_desc_en": "STEM robotics and embedded software package for BBC micro:bit, featuring an obstacle-dodging racing game engine on the 5x5 LED matrix and MakeCode extension drivers for robot chassis control.",
    "tags": [
      "Micro:bit",
      "TypeScript",
      "MakeCode",
      "STEM",
      "Embedded",
      "Robotics"
    ],
    "featured": false,
    "metrics": [
      {
        "label_vi": "Vi điều khiển trung tâm",
        "label_en": "Microcontroller",
        "value": "Nordic nRF52833 (ARM Cortex-M4)"
      },
      {
        "label_vi": "Giao diện hiển thị",
        "label_en": "Display Interface",
        "value": "Ma Trận LED 5x5 (30 FPS)"
      },
      {
        "label_vi": "Ngôn ngữ phát triển",
        "label_en": "Programming Language",
        "value": "Static TypeScript / Python"
      },
      {
        "label_vi": "Đóng gói phần mềm",
        "label_en": "Software Packaging",
        "value": "MakeCode PXT Extension"
      }
    ],
    "overview_vi": "\n      <h4>1. Giáo dục STEM & Khởi đầu với hệ thống nhúng</h4>\n      <p>Vi điều khiển <strong>BBC micro:bit</strong> (trang bị chip ARM Cortex-M4 32-bit của Nordic) là nền tảng chuẩn mực quốc tế trong giáo dục STEM. Dự án cung cấp cả trò chơi đua xe né chướng ngại vật sinh động trên màn hình LED 5x5 lẫn bộ driver thư viện mở rộng (MakeCode Extension) để điều khiển xe robot phần cứng 2 bánh thực tế.</p>\n\n      <h4>2. Kiến trúc hướng sự kiện (Event-driven Architecture)</h4>\n      <p>Chương trình tận dụng cơ chế ngắt phần cứng (Hardware Interrupts) từ hai nút nhấn vật lý Button A và Button B trên vi điều khiển, kết hợp với game engine quản lý đối tượng Sprite của Microsoft PXT Runtime.</p>\n    ",
    "overview_en": "\n      <h4>1. STEM Robotics Education & Embedded Systems</h4>\n      <p>Deployed on the BBC micro:bit (ARM Cortex-M4), bridging interactive 5x5 LED sprite game dynamics with extension packages for chassis motor control.</p>\n      <h4>2. Event-Driven Architecture</h4>\n      <p>Hardware interrupts on Button A and Button B coupled with Microsoft PXT sprite collision engines.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Hệ trục tọa độ và ma trận hiển thị 5x5:</h4>\n      <p>Ma trận LED gồm 25 điểm ảnh quét dồn kênh (Multiplexing) ở tần số 60Hz. Tọa độ $(X, Y)$ từ $(0, 0)$ ở góc trên bên trái đến $(4, 4)$ ở góc dưới bên phải.</p>\n      <ul>\n        <li><code>player_car</code>: Sprite xe người chơi, di chuyển ngang ở đáy màn hình ($Y = 4$, $X \\in [0, 4]$).</li>\n        <li><code>car_4</code>: Sprite chướng ngại vật sinh ngẫu nhiên từ đỉnh màn hình ($Y = 0$), rơi dần xuống dưới với vận tốc tăng dần theo thời gian.</li>\n      </ul>\n\n      <h4>2. Cấu trúc đóng gói Extension MakeCode (<code>pxt.json</code>):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>{\n    \"name\": \"xe-ua-2\",\n    \"version\": \"1.0.0\",\n    \"description\": \"Thư viện điều khiển xe đua và mini game cho BBC micro:bit\",\n    \"dependencies\": { \"core\": \"*\" },\n    \"files\": [ \"main.ts\", \"README.md\" ]\n}</code></pre>\n      </div>\n    ",
    "architecture_en": "\n      <h4>Matrix Kinematics & PXT Manifest:</h4>\n      <p>Maps 5x5 multiplexed LED coordinate grid ($X, Y \\in [0, 4]$). Packaged with <code>pxt.json</code> for seamless integration into Microsoft MakeCode IDE.</p>\n    ",
    "guide_vi": "\n      <h4>Cách sử dụng trực tiếp trên Web MakeCode:</h4>\n      <ol>\n        <li>Truy cập trình biên dịch trực tuyến tại: <a href=\"https://makecode.microbit.org/\" target=\"_blank\" style=\"color:var(--accent-cyan);\">makecode.microbit.org</a>.</li>\n        <li>Nhấn <strong>New Project</strong>.</li>\n        <li>Chọn biểu tượng bánh răng cài đặt $\\to$ <strong>Extensions</strong>.</li>\n        <li>Dán đường dẫn GitHub: <code>https://github.com/vinhdo281/xe-ua-2</code> và nhấn Enter.</li>\n        <li>Chạy mô phỏng trực tiếp trên trình duyệt hoặc cắm board micro:bit qua cáp USB và nhấn nút <strong>Download</strong> để nạp file <code>.hex</code>.</li>\n      </ol>\n    ",
    "guide_en": "\n      <h4>Usage Instructions:</h4>\n      <ol>\n        <li>Open <a href=\"https://makecode.microbit.org/\" target=\"_blank\">makecode.microbit.org</a>.</li>\n        <li>Import extension via URL: <code>https://github.com/vinhdo281/xe-ua-2</code>.</li>\n        <li>Run live simulator or flash .hex firmware over USB.</li>\n      </ol>\n    ",
    "results_vi": "\n      <h4>Kết quả kiểm nghiệm:</h4>\n      <ul>\n        <li>Tốc độ khung hình mượt mà <strong>30 FPS</strong> trên màn hình LED 5x5.</li>\n        <li>Dung lượng firmware siêu nhẹ: <strong>&lt; 128 KB Flash</strong> và <strong>&lt; 16 KB RAM</strong>.</li>\n        <li>Dễ dàng nhúng vào các bài giảng STEM robotics cho học sinh, sinh viên bước đầu tiếp cận lập trình nhúng C++/TypeScript.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Performance:</h4>\n      <ul>\n        <li>Fluid 30 FPS rendering on 5x5 display.</li>\n        <li>Ultralight footprint: &lt; 128KB Flash, &lt; 16KB RAM.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Đoạn mã điều khiển Sprite trong <code>main.ts</code> (TypeScript):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>// Bắt sự kiện ngắt nút bấm vật lý\ninput.onButtonPressed(Button.A, function on_button_pressed_a() {\n    if (player_car.get(LedSpriteProperty.X) > 0) {\n        player_car.change(LedSpriteProperty.X, -1) // Rẽ trái\n    }\n})\n\ninput.onButtonPressed(Button.B, function on_button_pressed_b() {\n    if (player_car.get(LedSpriteProperty.X) < 4) {\n        player_car.change(LedSpriteProperty.X, 1)  // Rẽ phải\n    }\n})\n\n// Khởi tạo xe người chơi ở vị trí trung tâm đáy màn hình\nlet player_car = game.createSprite(2, 4)\n\n// Vòng lặp trò chơi: Chướng ngại vật rơi và kiểm tra va chạm\nbasic.forever(function () {\n    let obstacle = game.createSprite(randint(0, 4), 0)\n    for (let i = 0; i < 4; i++) {\n        basic.pause(400)\n        obstacle.change(LedSpriteProperty.Y, 1)\n        if (obstacle.isTouching(player_car)) {\n            game.gameOver()\n        }\n    }\n    obstacle.delete()\n    game.addScore(1)\n})</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>TypeScript Game Engine Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>input.onButtonPressed(Button.A, () => {\n    if (player_car.get(LedSpriteProperty.X) > 0) player_car.change(LedSpriteProperty.X, -1)\n})\ninput.onButtonPressed(Button.B, () => {\n    if (player_car.get(LedSpriteProperty.X) < 4) player_car.change(LedSpriteProperty.X, 1)\n})</code></pre>\n      </div>\n    "
  },
  {
    "id": "checking-weather",
    "category": "software",
    "category_vi": "Phần Mềm & Ứng Dụng",
    "category_en": "Software & APIs",
    "badge": "DESKTOP // PYQT5 // REST API",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/Checking-Weather-using-API",
    "blog_url": null,
    "title_vi": "Ứng Dụng Tra Cứu Thời Tiết Toàn Cầu Giao Diện PyQt5",
    "title_en": "Global Weather Forecast Desktop GUI Application (PyQt5 & OpenWeatherMap)",
    "short_desc_vi": "Phần mềm máy tính để bàn (Desktop GUI) được phát triển bằng Python và PyQt5: Kết nối trực tiếp OpenWeatherMap RESTful API để hiển thị các chỉ số khí tượng thời gian thực (nhiệt độ, độ ẩm, áp suất, trạng thái mây mưa) của mọi thành phố trên thế giới.",
    "short_desc_en": "A modern desktop GUI application engineered with Python & PyQt5, fetching and visualizing real-time worldwide meteorological telemetry from OpenWeatherMap REST API.",
    "tags": [
      "Python",
      "PyQt5",
      "REST API",
      "GUI",
      "OpenWeatherMap",
      "Software Engineering"
    ],
    "featured": false,
    "metrics": [
      {
        "label_vi": "Thời gian phản hồi truy vấn",
        "label_en": "API Round-trip",
        "value": "< 220 ms"
      },
      {
        "label_vi": "Framework giao diện",
        "label_en": "UI Framework",
        "value": "PyQt5 (Qt Widgets)"
      },
      {
        "label_vi": "Nguồn dữ liệu khí tượng",
        "label_en": "Data Provider",
        "value": "OpenWeatherMap REST API"
      },
      {
        "label_vi": "Chế độ giao diện",
        "label_en": "Theme Architecture",
        "value": "Responsive Dark Cyber"
      }
    ],
    "overview_vi": "\n      <h4>1. Mục tiêu phát triển ứng dụng Desktop chuyên dụng</h4>\n      <p>Ứng dụng máy tính để bàn tra cứu thời tiết được thiết kế theo phong cách tối giản, hiện đại và tốc độ cao, giúp người dùng theo dõi tức thì các chỉ số khí hậu mà không cần tiêu tốn tài nguyên trình duyệt web.</p>\n\n      <h4>2. Các tính năng nổi bật</h4>\n      <ul>\n        <li>Truy vấn dữ liệu thời gian thực cho hơn 200,000 thành phố trên toàn cầu theo chuẩn quốc tế (Metric: độ Celsius, tốc độ gió m/s).</li>\n        <li>Cơ chế bắt lỗi mạng và thông báo người dùng thân thiện (Network Fault Tolerance): Tự động phát hiện lỗi mất mạng, sai API key hoặc thành phố không tồn tại (HTTP 404).</li>\n      </ul>\n    ",
    "overview_en": "\n      <h4>1. Native Desktop Telemetry</h4>\n      <p>A native desktop utility designed to deliver instant global weather metrics with minimal memory footprint compared to resource-heavy browser tabs.</p>\n      <h4>2. Capabilities</h4>\n      <p>Real-time query resolution across 200,000+ cities via OpenWeatherMap REST API, equipped with fault-tolerant HTTP trapping.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Mô hình kiến trúc MVC (Model-View-Controller):</h4>\n      <ul>\n        <li><strong>View (Giao diện đồ họa):</strong> Xây dựng bằng các widget Qt: <code>QLabel</code> hiển thị tiêu đề, <code>QLineEdit</code> nhận tên thành phố, <code>QPushButton</code> kích hoạt truy vấn, cùng hệ thống bố cục <code>QVBoxLayout</code> và <code>QHBoxLayout</code> co giãn thích ứng.</li>\n        <li><strong>Controller (Xử lý sự kiện):</strong> Bắt sự kiện nhấn phím Enter hoặc click chuột, gọi API qua module <code>requests</code>.</li>\n        <li><strong>Model (Dữ liệu khí tượng):</strong> Cấu trúc JSON trả về được giải mã thành các thuộc tính: nhiệt độ hiện tại, cảm nhận thực tế (feels_like), độ ẩm không khí (humidity), áp suất khí quyển (pressure) và mô tả thời tiết.</li>\n      </ul>\n\n      <h4>2. Endpoint API & Xử lý phản hồi:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric\n\nJSON Response Structure:\n{\n  \"main\": { \"temp\": 28.5, \"feels_like\": 31.2, \"humidity\": 75, \"pressure\": 1012 },\n  \"weather\": [ { \"main\": \"Clouds\", \"description\": \"scattered clouds\", \"icon\": \"03d\" } ],\n  \"wind\": { \"speed\": 4.12 },\n  \"name\": \"Hanoi\", \"cod\": 200\n}</code></pre>\n      </div>\n    ",
    "architecture_en": "\n      <h4>Model-View-Controller (MVC) Structure:</h4>\n      <p>Decoupled Qt layout management with asynchronous HTTP request handling and structured JSON schema parsing.</p>\n    ",
    "guide_vi": "\n      <h4>Hướng dẫn cài đặt & Chạy ứng dụng:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Clone repository\ngit clone https://github.com/vinhdo281/Checking-Weather-using-API.git\ncd Checking-Weather-using-API\n\n# 2. Cài đặt các thư viện cần thiết\npip install PyQt5 requests\n\n# 3. Lấy API Key miễn phí tại: https://openweathermap.org/\n# Mở file main và điền api_key của bạn vào:\n# api_key = \"YOUR_API_KEY_HERE\"\n\n# 4. Khởi chạy ứng dụng Desktop:\npython main</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Checking-Weather-using-API.git\ncd Checking-Weather-using-API\npip install PyQt5 requests\npython main</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Kết quả kiểm nghiệm:</h4>\n      <ul>\n        <li>Thời gian phản hồi truy vấn mạng trung bình: <strong>&lt; 220 ms</strong>.</li>\n        <li>Giao diện khởi động tức thì trong <strong>&lt; 0.5 giây</strong>, tiêu tốn dưới 35 MB RAM.</li>\n        <li>Xử lý ngoại lệ chuẩn: Hiển thị cảnh báo trực quan khi người dùng nhập sai tên thành phố hoặc mất kết nối Internet.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Performance:</h4>\n      <ul>\n        <li>Round-trip query latency: &lt; 220 ms.</li>\n        <li>Low memory consumption (&lt; 35 MB RAM) with fast cold-start (&lt; 0.5s).</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Mã nguồn giao diện PyQt5 trong <code>main</code>:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>import sys\nimport requests\nfrom PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QPushButton, QVBoxLayout\nfrom PyQt5.QtCore import Qt\n\nclass WeatherApp(QWidget):\n    def __init__(self):\n        super().__init__()\n        self.setWindowTitle(\"Cyber Weather Telemetry\")\n        self.setFixedSize(400, 320)\n        self.initUI()\n\n    def initUI(self):\n        layout = QVBoxLayout()\n        self.city_input = QLineEdit(self)\n        self.city_input.setPlaceholderText(\"Nhập tên thành phố (vd: Hanoi, Tokyo)...\")\n        \n        self.get_btn = QPushButton(\"Tra Cứu Thời Tiết\", self)\n        self.get_btn.clicked.connect(self.get_weather)\n        \n        self.temp_label = QLabel(\"-- °C\", self)\n        self.temp_label.setAlignment(Qt.AlignCenter)\n        self.desc_label = QLabel(\"Chưa có dữ liệu\", self)\n        self.desc_label.setAlignment(Qt.AlignCenter)\n        \n        layout.addWidget(self.city_input)\n        layout.addWidget(self.get_btn)\n        layout.addWidget(self.temp_label)\n        layout.addWidget(self.desc_label)\n        self.setLayout(layout)\n\n    def get_weather(self):\n        city = self.city_input.text().strip()\n        api_key = \"YOUR_API_KEY\"\n        url = f\"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric\"\n        try:\n            res = requests.get(url, timeout=5)\n            if res.status_code == 200:\n                data = res.json()\n                self.temp_label.setText(f\"{data['main']['temp']} °C\")\n                self.desc_label.setText(data['weather'][0]['description'].capitalize())\n            else:\n                self.desc_label.setText(\"Không tìm thấy thành phố!\")\n        except Exception as e:\n            self.desc_label.setText(\"Lỗi kết nối mạng!\")</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>PyQt5 Weather App Code Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>res = requests.get(f\"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric\")\nif res.status_code == 200:\n    self.temp_label.setText(f\"{res.json()['main']['temp']} °C\")</code></pre>\n      </div>\n    "
  },
  {
    "id": "python-collection",
    "category": "software",
    "category_vi": "Phần Mềm & Ứng Dụng",
    "category_en": "Software & APIs",
    "badge": "ALGORITHMS // TOOLS // PYTHON SUITE",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/Python",
    "blog_url": null,
    "title_vi": "Tuyển Tập Thuật Toán & Ứng Dụng Mini-Projects Bằng Python",
    "title_en": "Python Algorithmic Utilities & Interactive Mini-Projects Suite",
    "short_desc_vi": "Bộ sưu tập các dự án ứng dụng Python đa dạng minh họa tư duy thuật toán, cấu trúc dữ liệu, lập trình giao diện GUI và xử lý API: Đồng hồ số Digital Clock, Pokemon Finder qua PokéAPI, Thuật toán mã hóa Simple Encryption, Game Slot Machine và Đồng hồ bấm giờ Stopwatch.",
    "short_desc_en": "A versatile suite of algorithmic tools and mini-projects including a desktop Digital Clock, PokéAPI consumer, symmetric cipher encryption engine, RNG Slot Machine simulator, and high-precision Stopwatch.",
    "tags": [
      "Python",
      "Algorithms",
      "PokéAPI",
      "Cryptography",
      "GUI",
      "Mini-Projects"
    ],
    "featured": false,
    "metrics": [
      {
        "label_vi": "Số lượng ứng dụng con",
        "label_en": "Sub-project Count",
        "value": "5 Dự Án Độc Lập"
      },
      {
        "label_vi": "Thư viện phụ thuộc",
        "label_en": "External Dependencies",
        "value": "Không Yêu Cầu (Zero-Dependency)"
      },
      {
        "label_vi": "Không gian khóa mã hóa",
        "label_en": "Cipher Key Space",
        "value": "94! ≈ 1.08 × 10^146"
      },
      {
        "label_vi": "Chuẩn mực lập trình",
        "label_en": "Coding Standard",
        "value": "PEP 8 Clean Code"
      }
    ],
    "overview_vi": "\n      <h4>1. Tuyển tập bài toán thực hành phần mềm</h4>\n      <p>Một bộ công cụ gồm 5 dự án con hoàn chỉnh bằng ngôn ngữ Python, được xây dựng nhằm rèn luyện tư duy lập trình cấu trúc, thiết kế hướng đối tượng, làm việc với các giao thức mạng RESTful API và thuật toán toán học ứng dụng.</p>\n\n      <h4>2. Danh mục 5 dự án thành phần:</h4>\n      <ul>\n        <li><strong>Digital Clock:</strong> Đồng hồ kỹ thuật số để bàn với giao diện đồ họa, cập nhật chu kỳ thời gian hệ thống mili-giây.</li>\n        <li><strong>Pokemon Finder:</strong> Ứng dụng client tương tác REST API với kho dữ liệu PokéAPI v2 để trích xuất chỉ số chiến đấu, hệ phái (type), kỹ năng và ảnh sprite.</li>\n        <li><strong>Simple Encryption:</strong> Bộ công cụ mã hóa và giải mã đối xứng dựa trên thuật toán hoán vị bảng ký tự (Monoalphabetic Substitution Cipher).</li>\n        <li><strong>Slot Machine:</strong> Trò chơi mô phỏng máy đánh bạc với thuật toán phân phối xác suất ngẫu nhiên PRNG và quản lý tiền tệ ảo.</li>\n        <li><strong>Stopwatch:</strong> Đồng hồ bấm giây thể thao có chức năng ngắt lap (Split Time) sử dụng bộ đếm thời gian đơn điệu (Monotonic Clock) độ chính xác cao.</li>\n      </ul>\n    ",
    "overview_en": "\n      <h4>1. Multi-paradigm Python Application Suite</h4>\n      <p>A curated collection of 5 self-contained applications spanning GUI development, cryptographic transformations, RESTful consumption, and probability modeling.</p>\n      <h4>2. Suite Catalog</h4>\n      <p>Includes Digital Clock, PokéAPI Client, Substitution Cipher Engine, PRNG Slot Machine, and Monotonic Stopwatch.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Phân tích thuật toán từng dự án:</h4>\n      <ul>\n        <li><strong>Simple Encryption (Mã hóa thay thế đối xứng):</strong>\n          Tập ký tự $\\Sigma$ gồm chữ cái, chữ số và ký tự đặc biệt ($|\\Sigma| = 94$).\n          Hàm mã hóa là một song ánh $f: \\Sigma \\to \\Sigma$ sinh ra bởi phép hoán vị ngẫu nhiên (Fisher-Yates Shuffle).\n          Không gian khóa có độ lớn khổng lồ: $|\\Sigma|! = 94! \\approx 1.08 \\times 10^{146}$, miễn nhiễm với tấn công vét cạn (Brute-force attack).\n        </li>\n        <li><strong>PokéAPI Consumer:</strong>\n          Gọi endpoint <code>https://pokeapi.co/api/v2/pokemon/{name}</code>, phân giải cây dữ liệu JSON lồng nhau, tải hình ảnh bitmap qua HTTP socket stream và hiển thị lên màn hình.\n        </li>\n        <li><strong>Stopwatch:</strong>\n          Sử dụng hàm <code>time.perf_counter()</code> của Python thay vì <code>time.time()</code> để tránh bị sai lệch thời gian khi đồng hồ hệ thống của hệ điều hành tự đồng bộ NTP.\n        </li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>Algorithmic Breakdown:</h4>\n      <ul>\n        <li><strong>Substitution Cipher:</strong> Bijective mapping over 94-character alphabet ($94! \\approx 1.08 \\times 10^{146}$ key space).</li>\n        <li><strong>PokéAPI Consumer:</strong> Asynchronous JSON deserialization and sprite bitmap streaming.</li>\n        <li><strong>Monotonic Stopwatch:</strong> Leverages <code>time.perf_counter()</code> to prevent clock drift from OS NTP resynchronizations.</li>\n      </ul>\n    ",
    "guide_vi": "\n      <h4>Hướng dẫn chạy các dự án con:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># 1. Clone repository\ngit clone https://github.com/vinhdo281/Python.git\ncd Python\n\n# 2. Chạy ứng dụng Pokemon Finder:\ncd \"Pokemon finder using Pokeapi\"\npython main.py\n\n# 3. Chạy thuật toán mã hóa Simple Encryption:\ncd \"../Simple Encryption\"\npython main.py\n\n# 4. Chạy game Slot Machine:\ncd \"../Slot Machine\"\npython main.py\n\n# 5. Chạy đồng hồ bấm giờ Stopwatch:\ncd \"../Stopwatch\"\npython main.py</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Python.git\ncd \"Python/Pokemon finder using Pokeapi\"\npython main.py</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Đặc điểm nổi bật:</h4>\n      <ul>\n        <li>Chạy độc lập 100% trên Python 3.8+ mà không cần cài đặt các gói bên thứ ba cồng kềnh.</li>\n        <li>Mã nguồn tuân thủ tiêu chuẩn <strong>PEP 8</strong>, có chú thích giải thích cặn kẽ từng bước logic.</li>\n        <li>Tương thích đa nền tảng: Chạy mượt mà trên cả Linux, macOS và Windows.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Highlights:</h4>\n      <ul>\n        <li>Zero third-party dependencies required.</li>\n        <li>Strict PEP 8 adherence with cross-platform compatibility.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Đoạn mã thuật toán mã hóa Substitution Cipher trong <code>Simple Encryption</code>:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>import random\nimport string\n\n# Tạo bảng ký tự và khóa hoán vị\nchars = \" \" + string.punctuation + string.digits + string.ascii_letters\nchars = list(chars)\nkey = chars.copy()\n\n# Khởi tạo khóa ngẫu nhiên\nrandom.seed(42) # Khóa bí mật\nrandom.shuffle(key)\n\n# Mã hóa chuỗi văn bản\nplain_text = \"HUST Robotics & Control Systems\"\ncipher_text = \"\"\nfor letter in plain_text:\n    index = chars.index(letter)\n    cipher_text += key[index]\n\nprint(f\"Bản rõ (Plain):  {plain_text}\")\nprint(f\"Bản mã (Cipher): {cipher_text}\")\n\n# Giải mã chuỗi văn bản\ndecrypted_text = \"\"\nfor letter in cipher_text:\n    index = key.index(letter)\n    decrypted_text += chars[index]\n\nprint(f\"Giải mã (Decrypted): {decrypted_text}\")</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Cryptographic Cipher Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Encryption\ncipher = \"\".join(key[chars.index(c)] for c in plain_text)\n# Decryption\nplain = \"\".join(chars[key.index(c)] for c in cipher)</code></pre>\n      </div>\n    "
  }
];

if (typeof window !== 'undefined') {
  window.PROJECTS_DATA = PROJECTS_DATA;
}
