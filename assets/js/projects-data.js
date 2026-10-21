// Detailed data for all engineering projects
// Standard technical report format: no emojis, objective and precise language.
const PROJECTS_DATA = [
  {
    "id": "fuzzy-controller",
    "category": "control",
    "category_en": "Control & Robotics",
    "badge": "CAD // SIMULATION // MUJOCO & SIMSCAPE",
    "date": "10/2026",
    "github_url": "https://github.com/vinhdo281/Fuzzy-Controller",
    "blog_url": "posts/fuzzy-inverted-pendulum/index.html",
    "title_en": "Single Unified Mamdani FIS Inverted Pendulum Controller in MuJoCo & Simulink",
    "title_de": "16-Regeln Mamdani FIS Regler für Inverses Pendel in MuJoCo & Simulink",
    "short_desc_en": "Design, simulation, and verification of a single unified 16-rule Mamdani FIS controller stabilizing an inverted pendulum from 22° tilt with zero cart drift across MuJoCo 3D and Simscape Multibody.",
    "short_desc_de": "Entwurf, Simulation und Verifikation eines einheitlichen 16-Regeln-Mamdani-FIS-Reglers zur Stabilisierung eines inversen Pendels ab 22° Neigung ohne Wagendrift in MuJoCo 3D und Simscape Multibody.",
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
        "label_en": "Max Recovery Tilt",
        "label_de": "Max. Rückstellneigung",
        "value": "22.0 deg"
      },
      {
        "label_en": "Settling Time (ts)",
        "label_de": "Einschwingzeit (ts)",
        "value": "1.65 s"
      },
      {
        "label_en": "Cart Drift Error",
        "label_de": "Wagendrift-Fehler",
        "value": "+/- 0.002 m"
      },
      {
        "label_en": "Overshoot",
        "label_de": "Überschwingen",
        "value": "< 4.5%"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Objective & Scope</h4>\n      <p>The inverted cart-pendulum system is an underactuated non-linear benchmark. When tilt angle deviations exceed 15°–20°, traditional linear controllers (PID / LQR) fail because the small-angle Taylor series approximations (sin θ ≈ θ, cos θ ≈ 1) break down completely.</p>\n      <p>This project synthesizes a <strong>Single Unified 16-Rule Mamdani Fuzzy Inference System (FIS)</strong> that simultaneously processes four dynamic state variables without requiring gain scheduling, model switching, or state linearization.</p>\n    ",
    "overview_de": "\n      <h4>1. Technische Zielsetzung & Problemstellung</h4>\n      <p>Das inverse Wagenpendel ist ein unteraktuiertes, stark nichtlineares Benchmarksystem. Überschreitet die Neigung 15°–20°, versagen klassische lineare Regler (PID / LQR), da die Taylor-Approximationen (sin θ ≈ θ, cos θ ≈ 1) ihre Gültigkeit verlieren.</p>\n      <p>Dieses Projekt realisiert ein <strong>einheitliches 16-Regeln-Mamdani-Fuzzy-Inferenz-System (FIS)</strong>, das simultan vier Zustandsvariablen ohne Umschaltlogik oder Linearisierung regelt.</p>\n    ",
    "architecture_en": "\n      <h4>1. Non-linear Mathematical Model</h4>\n      <p>Equations of motion derived via Euler-Lagrange formulation:</p>\n      <div class=\"code-terminal\"><pre><code>(M + m) * x_ddot - m * l * theta_ddot * cos(theta) + m * l * theta_dot^2 * sin(theta) = F\n-m * l * x_ddot * cos(theta) + (I + m * l^2) * theta_ddot - m * g * l * sin(theta) = 0</code></pre></div>\n      <h4>2. Unified FIS Architecture</h4>\n      <ul>\n        <li><strong>Inputs:</strong> θ (tilt angle), dθ/dt (angular velocity), x (cart position), dx/dt (cart velocity).</li>\n        <li><strong>Output:</strong> F (control force in [-10, +10] N).</li>\n        <li><strong>Membership Functions:</strong> Generalized Bell curves (gbellmf) for smooth continuous control derivatives.</li>\n        <li><strong>Defuzzification:</strong> Center of Gravity (Centroid) method.</li>\n      </ul>\n    ",
    "architecture_de": "\n      <h4>1. Nichtlineare Systemdynamik (Euler-Lagrange)</h4>\n      <p>Vollständige Bewegungsgleichungen des Wagen-Pendel-Systems:</p>\n      <div class=\"code-terminal\"><pre><code>(M + m) * x_ddot - m * l * theta_ddot * cos(theta) + m * l * theta_dot^2 * sin(theta) = F\n-m * l * x_ddot * cos(theta) + (I + m * l^2) * theta_ddot - m * g * l * sin(theta) = 0</code></pre></div>\n      <h4>2. FIS-Architektur</h4>\n      <ul>\n        <li><strong>Eingänge:</strong> θ (Neigungswinkel), dθ/dt (Winkelgeschwindigkeit), x (Wagenposition), dx/dt (Wagengeschwindigkeit).</li>\n        <li><strong>Ausgang:</strong> F (Stellkraft in [-10, +10] N).</li>\n        <li><strong>Zugehörigkeitsfunktionen:</strong> Verallgemeinerte Glockenkurven (gbellmf).</li>\n        <li><strong>Defuzzifizierung:</strong> Schwerpunktmethode (Centroid).</li>\n      </ul>\n    ",
    "guide_en": "\n      <h4>Step-by-Step Implementation & Execution Guide:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Prerequisites:</strong> Python 3.10+, MuJoCo 3.x, NumPy, Matplotlib, MATLAB R2022b+ with Fuzzy Logic & Simscape Multibody toolboxes.</li>\n        <li><strong>Clone Repository:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/Fuzzy-Controller.git\ncd Fuzzy-Controller</code></pre></div>\n        </li>\n        <li><strong>Run MuJoCo 3D Physics Simulation:</strong>\n          <div class=\"code-terminal\"><pre><code>pip install -r requirements.txt\npython simulate_mujoco.py --initial-tilt 0.384 --duration 10.0</code></pre></div>\n          <em>Result:</em> Interactive 3D rendering displays the cart dashing right to catch the 22° falling pole, settling back to center within 1.65 seconds.\n        </li>\n        <li><strong>Run MATLAB / Simscape Multibody Co-Simulation:</strong>\n          <div class=\"code-terminal\"><pre><code>% In MATLAB Command Window:\nrun('full_pendulum_assem_DataFile3.m');  % Load inertia and geometry database\nopen_system('full_pendulum_assem.slx');   % Open Simulink root model\nsim('full_pendulum_assem');               % Execute co-simulation</code></pre></div>\n        </li>\n        <li><strong>Key Wiring Inspection:</strong> Ensure the <code>Norm Theta</code> MATLAB function block is connected before the Mux to normalize raw joint angles into [-π, +π] radians via <code>atan2(sin(theta), cos(theta))</code>.</li>\n      </ol>\n    ",
    "guide_de": "\n      <h4>Schritt-für-Schritt Implementierungs- & Ausführungsleitfaden:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Voraussetzungen:</strong> Python 3.10+, MuJoCo 3.x, NumPy, Matplotlib, MATLAB R2022b+ mit Fuzzy Logic & Simscape Multibody.</li>\n        <li><strong>Repository klonen:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/Fuzzy-Controller.git\ncd Fuzzy-Controller</code></pre></div>\n        </li>\n        <li><strong>MuJoCo 3D-Physiksimulation starten:</strong>\n          <div class=\"code-terminal\"><pre><code>pip install -r requirements.txt\npython simulate_mujoco.py --initial-tilt 0.384 --duration 10.0</code></pre></div>\n          <em>Ergebnis:</em> Interaktives 3D-Fenster visualisiert das Auffangen des um 22° geneigten Pendels und Rückführung zum Nullpunkt in 1.65s.\n        </li>\n        <li><strong>MATLAB / Simscape Multibody Simulation:</strong>\n          <div class=\"code-terminal\"><pre><code>% Im MATLAB Command Window:\nrun('full_pendulum_assem_DataFile3.m');  % Geometriedaten laden\nopen_system('full_pendulum_assem.slx');   % Simulink-Modell öffnen\nsim('full_pendulum_assem');               % Simulation ausführen</code></pre></div>\n        </li>\n        <li><strong>Modellüberprüfung:</strong> Sicherstellen, dass der <code>Norm Theta</code> Block den Winkel auf [-π, +π] via <code>atan2(sin(theta), cos(theta))</code> normiert.</li>\n      </ol>\n    ",
    "results_en": "\n      <h4>Performance Benchmark vs Conventional Controllers:</h4>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"background:rgba(0,242,254,0.1); border-bottom:1px solid var(--border-color);\">\n            <th style=\"padding:0.5rem; text-align:left;\">Initial Tilt (θ₀)</th>\n            <th style=\"padding:0.5rem; text-align:center;\">Classical PID</th>\n            <th style=\"padding:0.5rem; text-align:center;\">LQR Optimal</th>\n            <th style=\"padding:0.5rem; text-align:center; color:var(--accent-cyan);\">Mamdani 16-FIS</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05);\">\n            <td style=\"padding:0.5rem;\">θ₀ = 5.0 deg</td>\n            <td style=\"padding:0.5rem; text-align:center;\">ts = 2.10s</td>\n            <td style=\"padding:0.5rem; text-align:center;\">ts = 1.45s</td>\n            <td style=\"padding:0.5rem; text-align:center; font-weight:bold; color:var(--accent-cyan);\">ts = 1.30s</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05);\">\n            <td style=\"padding:0.5rem;\">θ₀ = 15.0 deg</td>\n            <td style=\"padding:0.5rem; text-align:center; color:#ef4444;\">Unstable (Falls)</td>\n            <td style=\"padding:0.5rem; text-align:center;\">ts = 2.80s</td>\n            <td style=\"padding:0.5rem; text-align:center; font-weight:bold; color:var(--accent-cyan);\">ts = 1.52s</td>\n          </tr>\n          <tr>\n            <td style=\"padding:0.5rem;\">θ₀ = 22.0 deg</td>\n            <td style=\"padding:0.5rem; text-align:center; color:#ef4444;\">Unstable (Falls)</td>\n            <td style=\"padding:0.5rem; text-align:center; color:#ef4444;\">Unstable (Falls)</td>\n            <td style=\"padding:0.5rem; text-align:center; font-weight:bold; color:var(--accent-cyan);\">ts = 1.65s (Stable)</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
    "results_de": "\n      <h4>Leistungsvergleich mit konventionellen Reglern:</h4>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"background:rgba(0,242,254,0.1); border-bottom:1px solid var(--border-color);\">\n            <th style=\"padding:0.5rem; text-align:left;\">Anfangsneigung (θ₀)</th>\n            <th style=\"padding:0.5rem; text-align:center;\">Klassischer PID</th>\n            <th style=\"padding:0.5rem; text-align:center;\">LQR Optimal</th>\n            <th style=\"padding:0.5rem; text-align:center; color:var(--accent-cyan);\">Mamdani 16-FIS</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05);\">\n            <td style=\"padding:0.5rem;\">θ₀ = 5.0 Grad</td>\n            <td style=\"padding:0.5rem; text-align:center;\">ts = 2.10s</td>\n            <td style=\"padding:0.5rem; text-align:center;\">ts = 1.45s</td>\n            <td style=\"padding:0.5rem; text-align:center; font-weight:bold; color:var(--accent-cyan);\">ts = 1.30s</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05);\">\n            <td style=\"padding:0.5rem;\">θ₀ = 15.0 Grad</td>\n            <td style=\"padding:0.5rem; text-align:center; color:#ef4444;\">Instabil (Kippt)</td>\n            <td style=\"padding:0.5rem; text-align:center;\">ts = 2.80s</td>\n            <td style=\"padding:0.5rem; text-align:center; font-weight:bold; color:var(--accent-cyan);\">ts = 1.52s</td>\n          </tr>\n          <tr>\n            <td style=\"padding:0.5rem;\">θ₀ = 22.0 Grad</td>\n            <td style=\"padding:0.5rem; text-align:center; color:#ef4444;\">Instabil (Kippt)</td>\n            <td style=\"padding:0.5rem; text-align:center; color:#ef4444;\">Instabil (Kippt)</td>\n            <td style=\"padding:0.5rem; text-align:center; font-weight:bold; color:var(--accent-cyan);\">ts = 1.65s (Stabil)</td>\n          </tr>\n        </tbody>\n      </table>\n    ",
    "demo_en": "\n      <h4>Simulation Response & Control Loop:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"assets/images/posts/fuzzy-pendulum/06_simulation_response_20deg.png\" alt=\"Simulation Response\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n      <div class=\"code-terminal\"><pre><code>% MATLAB Live Script Extract:\nfis = mamfis('Name', 'cartpole_16rules');\nfis = addInput(fis, [-0.5 0.5], 'Name', 'theta');\nfis = addMF(fis, 'theta', 'gbellmf', [0.15 2 -0.3], 'Name', 'N');\nfis = addMF(fis, 'theta', 'gbellmf', [0.15 2 0.3], 'Name', 'P');\n% Rule evaluation: Max-Min inference with Centroid defuzzification</code></pre></div>\n    ",
    "demo_de": "\n      <h4>Simulationsantwort & Regelkreis:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"assets/images/posts/fuzzy-pendulum/06_simulation_response_20deg.png\" alt=\"Simulationsantwort\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n      <div class=\"code-terminal\"><pre><code>% MATLAB FIS Initialisierung:\nfis = mamfis('Name', 'cartpole_16rules');\nfis = addInput(fis, [-0.5 0.5], 'Name', 'theta');\nfis = addMF(fis, 'theta', 'gbellmf', [0.15 2 -0.3], 'Name', 'N');\nfis = addMF(fis, 'theta', 'gbellmf', [0.15 2 0.3], 'Name', 'P');\n% Regelauswertung: Max-Min Inferenz mit Schwerpunkt-Defuzzifizierung</code></pre></div>\n    "
  },
  {
    "id": "cascade-pid",
    "category": "control",
    "category_en": "Control & Robotics",
    "badge": "CONTROL // DUAL-LOOP // SIMULINK & ESP32",
    "date": "08/2026",
    "github_url": "https://github.com/vinhdo281/Cascade-PID",
    "blog_url": "posts/cascade-pid-twsbr/index.html",
    "title_en": "Dual-Loop Cascade PID Controller for Two-Wheeled Self-Balancing Robot (TWSBR)",
    "title_de": "Kaskadierter Zweikreis-PID-Regler für Zweirad-Balancierroboter",
    "short_desc_en": "Design, frequency separation analysis, and embedded FreeRTOS implementation of a dual-loop cascade PID controller for two-wheeled self-balancing mobile robots.",
    "short_desc_de": "Entwurf, Frequenztrennungsanalyse und eingebettete FreeRTOS-Implementierung eines kaskadierten Zweikreis-PID-Reglers für zweirädrige Balancierroboter.",
    "tags": [
      "Cascade PID",
      "Self-Balancing Robot",
      "Simulink",
      "ESP32",
      "FreeRTOS",
      "SimpleFOC",
      "State Estimation"
    ],
    "featured": true,
    "metrics": [
      {
        "label_en": "Inner Loop Frequency",
        "label_de": "Innenkreis-Frequenz",
        "value": "200 Hz"
      },
      {
        "label_en": "Outer Loop Frequency",
        "label_de": "Außenkreis-Frequenz",
        "value": "20 Hz"
      },
      {
        "label_en": "Impulse Recovery Time",
        "label_de": "Stoßausregelzeit",
        "value": "0.78 s"
      },
      {
        "label_en": "Max Disturbance Force",
        "label_de": "Max. Störkraft",
        "value": "20.0 N"
      }
    ],
    "overview_en": "\n      <h4>1. Engineering Scope</h4>\n      <p>Two-Wheeled Self-Balancing Robots (TWSBR) require simultaneous stabilization of the upright tilt angle θ and translational position navigation x. When using a single PID controller, pitch stabilization dynamics directly fight position tracking.</p>\n      <p>This project implements a <strong>Dual-Loop Cascade PID Architecture</strong> with a 10:1 frequency separation: the ultra-fast inner loop operates at 200 Hz for attitude stabilization, while the outer loop operates at 20 Hz to generate pitch angle references θ_ref from position errors.</p>\n    ",
    "overview_de": "\n      <h4>1. Technische Aufgabenstellung</h4>\n      <p>Zweirädrige selbstbalancierende Roboter (TWSBR) müssen simultan den instabilen Neigungswinkel θ stabilisieren und eine gewünschte Zielposition x anfahren. Ein einzelner PID-Regler führt zu dynamischen Konflikten zwischen Neigung und Position.</p>\n      <p>Dieses Projekt realisiert eine <strong>kaskadierte Zweikreis-PID-Regelarchitektur</strong> mit einer 10:1 Frequenztrennung: Der schnelle Innenkreis läuft mit 200 Hz zur Neigungsstabilisierung, während der Außenkreis mit 20 Hz aus Positionsfehlern Sollwinkel θ_ref generiert.</p>\n    ",
    "architecture_en": "\n      <h4>1. Decoupled Loop Formulation</h4>\n      <div class=\"code-terminal\"><pre><code>x_ref ---> [ + ] ---> [ Outer PID (20 Hz) ] ---> theta_ref (clamped +/- 12 deg)\n            - ^                                          |\n              |                                          v\n              x (Position Feedback)             [ + ] ---> [ Inner PD (200 Hz) ] ---> Motor PWM / Torque\n                                                 - ^\n                                                   |\n                                                   theta (IMU Pitch Feedback via Kalman Filter)</code></pre></div>\n      <h4>2. Hardware Implementation</h4>\n      <ul>\n        <li><strong>MCU:</strong> ESP32 Dual-Core @ 240 MHz running FreeRTOS preemptive kernel.</li>\n        <li><strong>Sensors:</strong> MPU6050 6-DOF IMU polled via I2C DMA with complementary/Kalman filtering.</li>\n        <li><strong>Actuators:</strong> Brushless DC motors commutated via SimpleFOC field-oriented control.</li>\n      </ul>\n    ",
    "architecture_de": "\n      <h4>1. Kaskadierte Regelkreis-Formulierung</h4>\n      <div class=\"code-terminal\"><pre><code>x_ref ---> [ + ] ---> [ Außenkreis PID (20 Hz) ] ---> theta_ref (begrenzt +/- 12 deg)\n            - ^                                                 |\n              |                                                 v\n              x (Positions-Rückführung)                [ + ] ---> [ Innenkreis PD (200 Hz) ] ---> Motor PWM\n                                                        - ^\n                                                          |\n                                                          theta (IMU Neigung via Kalman-Filter)</code></pre></div>\n      <h4>2. Hardware-Architektur</h4>\n      <ul>\n        <li><strong>MCU:</strong> ESP32 Dual-Core @ 240 MHz mit FreeRTOS Echtzeit-Kernel.</li>\n        <li><strong>Sensorik:</strong> MPU6050 6-Achs-IMU über I2C mit Kalman-Filterung.</li>\n        <li><strong>Aktoren:</strong> BLDC-Motoren mit feldorientierter Regelung (SimpleFOC).</li>\n      </ul>\n    ",
    "guide_en": "\n      <h4>Step-by-Step Implementation & Tuning Guide:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Prerequisites:</strong> MATLAB/Simulink R2022b+, VS Code with PlatformIO IDE, ESP32 development board, MPU6050 IMU.</li>\n        <li><strong>Repository Clone:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/Cascade-PID.git\ncd Cascade-PID</code></pre></div>\n        </li>\n        <li><strong>Simulink Dynamics Simulation:</strong>\n          <div class=\"code-terminal\"><pre><code>% Open non-linear plant simulation in MATLAB:\nopen_system('Simulation_TWSBR.slx');\n% Run step response test (1.0m step displacement command):\nsim('Simulation_TWSBR');</code></pre></div>\n        </li>\n        <li><strong>ESP32 FreeRTOS Firmware Build & Flash:</strong>\n          <div class=\"code-terminal\"><pre><code>cd firmware\npio run --target upload --upload-port COM3\npio device monitor --baud 115200</code></pre></div>\n        </li>\n        <li><strong>Tuning Procedure (Crucial Step):</strong>\n          <ul style=\"margin-top:0.35rem;\">\n            <li><em>Step A (Inner Attitude Loop):</em> Disable the outer loop. Gradually raise $K_p^\\theta$ until the robot recovers from manual tilt disturbances, then increase $K_d^\\theta$ to cancel oscillation.</li>\n            <li><em>Step B (Outer Position Loop):</em> Enable outer loop. Tune $K_p^x$ to pull the robot back to origin, and set clamping on $\\theta_{\\text{ref}} \\in [-12^\\circ, +12^\\circ]$ to prevent tip-over.</li>\n          </ul>\n        </li>\n      </ol>\n    ",
    "guide_de": "\n      <h4>Schritt-für-Schritt Implementierungs- & Einstellleitfaden:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Voraussetzungen:</strong> MATLAB/Simulink R2022b+, VS Code mit PlatformIO IDE, ESP32 Board, MPU6050.</li>\n        <li><strong>Repository klonen:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/Cascade-PID.git\ncd Cascade-PID</code></pre></div>\n        </li>\n        <li><strong>Simulink-Simulation:</strong>\n          <div class=\"code-terminal\"><pre><code>open_system('Simulation_TWSBR.slx');\nsim('Simulation_TWSBR');</code></pre></div>\n        </li>\n        <li><strong>ESP32-Firmware kompilieren & flashen via PlatformIO:</strong>\n          <div class=\"code-terminal\"><pre><code>cd firmware\npio run --target upload\npio device monitor</code></pre></div>\n        </li>\n        <li><strong>Einstellreihenfolge:</strong> Zuerst den Innenkreis (Neigung) abstimmen, anschließend den Außenkreis (Position) mit Winkelbegrenzung von +/- 12° aktivieren.</li>\n      </ol>\n    ",
    "results_en": "\n      <h4>Experimental Benchmarks:</h4>\n      <ul>\n        <li><strong>1.0 m Step Position Command:</strong> Settling time $t_s = 1.40\\,\\text{s}$, position overshoot $< 8.5\\%$, steady-state error $< 5\\,\\text{mm}$.</li>\n        <li><strong>20.0 N Horizontal Impact Rejection:</strong> Complete stabilization recovery in $0.78\\,\\text{s}$ with maximum pitch deflection of $8.2^\\circ$.</li>\n      </ul>\n    ",
    "results_de": "\n      <h4>Versuchsergebnisse & Benchmarks:</h4>\n      <ul>\n        <li><strong>1.0 m Positionssprung:</strong> Einschwingzeit $t_s = 1.40\\,\\text{s}$, Positionsüberschwingen $< 8.5\\%$, stationärer Fehler $< 5\\,\\text{mm}$.</li>\n        <li><strong>20.0 N Stoßentstörung:</strong> Vollständige Rückkehr in die Gleichgewichtslage in $0.78\\,\\text{s}$ bei maximaler Auslenkung von $8.2^\\circ$.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>FreeRTOS C++ Control Task Snippet:</h4>\n      <div class=\"code-terminal\"><pre><code>// Inner Loop (Hardware Timer ISR at 200 Hz):\nvoid IRAM_ATTR onInnerTimer() {\n  float theta = mpu.getPitch();\n  float theta_dot = mpu.getGyroY();\n  float error_theta = target_theta - theta;\n  float u_balance = Kp_pitch * error_theta - Kd_pitch * theta_dot;\n  motor.setTorque(u_balance);\n}</code></pre></div>\n    ",
    "demo_de": "\n      <h4>FreeRTOS C++ Regeltask-Auszug:</h4>\n      <div class=\"code-terminal\"><pre><code>// Innenkreis (Hardware Timer ISR bei 200 Hz):\nvoid IRAM_ATTR onInnerTimer() {\n  float theta = mpu.getPitch();\n  float theta_dot = mpu.getGyroY();\n  float error_theta = target_theta - theta;\n  float u_balance = Kp_pitch * error_theta - Kd_pitch * theta_dot;\n  motor.setTorque(u_balance);\n}</code></pre></div>\n    "
  },
  {
    "id": "bot1",
    "category": "robotics",
    "category_en": "Robotics & Simulation",
    "badge": "ROS 2 // GAZEBO // DIFF-DRIVE // URDF",
    "date": "06/2026",
    "github_url": "https://github.com/vinhdo281/bot1",
    "blog_url": "posts/bot1-ros2-mobile-robot/index.html",
    "title_en": "ROS 2 Differential Drive Mobile Robot Simulation Stack",
    "title_de": "ROS 2 Differential-Drive Mobiler Roboter Simulationspaket",
    "short_desc_en": "Complete ROS 2 Humble/Iron simulation stack for a differential-drive mobile robot, integrating modular URDF/Xacro macros, Gazebo physics, ros2_control, and RViz2 telemetry.",
    "short_desc_de": "Vollständiges ROS 2 Humble Simulationspaket für mobile Differential-Drive-Roboter mit modularen URDF/Xacro-Makros, Gazebo-Physik, ros2_control und RViz2-Visualisierung.",
    "tags": [
      "ROS 2 Humble",
      "Gazebo Sim",
      "URDF / Xacro",
      "diff_drive_controller",
      "RViz2",
      "Mobile Robotics"
    ],
    "featured": true,
    "metrics": [
      {
        "label_en": "ROS 2 Distribution",
        "label_de": "ROS 2 Distribution",
        "value": "Humble / Iron"
      },
      {
        "label_en": "Physics Engine",
        "label_de": "Physik-Engine",
        "value": "Gazebo (ODE)"
      },
      {
        "label_en": "Odometry Rate",
        "label_de": "Odometrie-Rate",
        "value": "50 Hz"
      },
      {
        "label_en": "Kinematic Model",
        "label_de": "Kinematik-Modell",
        "value": "Differential Drive"
      }
    ],
    "overview_en": "\n      <h4>1. Engineering Scope</h4>\n      <p>Autonomous Mobile Robots (AMRs) rely on tightly integrated simulation pipelines for testing navigation algorithms before physical hardware deployment. This package provides an end-to-end ROS 2 simulation architecture for a differential-drive ground robot.</p>\n      <p>The package implements parametric Xacro modeling, joint state broadcasting, <code>diff_drive_controller</code> velocity integration, 2D planar LIDAR simulation, and full TF tree publishing compatible with the Nav2 navigation stack.</p>\n    ",
    "overview_de": "\n      <h4>1. Technischer Rahmen</h4>\n      <p>Autonome mobile Roboter (AMR) erfordern nahtlose Simulationsumgebungen zum Testen von Navigationsalgorithmen vor dem Hardware-Einsatz. Dieses Paket bietet eine vollständige ROS 2 Simulationsarchitektur für ein radgetriebenes Differential-Drive-System.</p>\n      <p>Es beinhaltet parametrische Xacro-Modellierung, <code>diff_drive_controller</code> Geschwindigkeitsregelung, 2D-LIDAR-Simulation und vollständige TF-Transformationen für Nav2.</p>\n    ",
    "architecture_en": "\n      <h4>1. Kinematic Formulation</h4>\n      <p>Forward kinematics mapping wheel rotational velocities $(\\omega_L, \\omega_R)$ to robot center linear velocity $v$ and yaw rate $\\omega$:</p>\n      <div class=\"code-terminal\"><pre><code>v = (r / 2) * (omega_R + omega_L)\nomega = (r / L) * (omega_R - omega_L)</code></pre></div>\n      <h4>2. Coordinate Frames (TF Tree)</h4>\n      <p><code>map ---> odom ---> base_footprint ---> base_link ---> [ left_wheel, right_wheel, caster, laser_frame ]</code></p>\n    ",
    "architecture_de": "\n      <h4>1. Kinematische Formulierung</h4>\n      <p>Vorwärtskinematik zur Abbildung der Radwinkelgeschwindigkeiten auf die Roboter-Zentrumsbewegung:</p>\n      <div class=\"code-terminal\"><pre><code>v = (r / 2) * (omega_R + omega_L)\nomega = (r / L) * (omega_R - omega_L)</code></pre></div>\n      <h4>2. Koordinatentransformationen (TF-Tree)</h4>\n      <p><code>map ---> odom ---> base_footprint ---> base_link ---> [ left_wheel, right_wheel, caster, laser_frame ]</code></p>\n    ",
    "guide_en": "\n      <h4>Step-by-Step ROS 2 Simulation Guide:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Prerequisites:</strong> Ubuntu 22.04 LTS (native or WSL2) with ROS 2 Humble Desktop Full installed.</li>\n        <li><strong>Install Dependencies:</strong>\n          <div class=\"code-terminal\"><pre><code>sudo apt update && sudo apt install -y \\\n  ros-humble-gazebo-ros-pkgs \\\n  ros-humble-ros2-control \\\n  ros-humble-ros2-controllers \\\n  ros-humble-xacro \\\n  ros-humble-teleop-twist-keyboard</code></pre></div>\n        </li>\n        <li><strong>Workspace Setup & Build:</strong>\n          <div class=\"code-terminal\"><pre><code>mkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src\ngit clone https://github.com/vinhdo281/bot1.git\ncd ~/ros2_ws\ncolcon build --symlink-install --packages-select bot1\nsource install/setup.bash</code></pre></div>\n        </li>\n        <li><strong>Launch Gazebo Physics Simulation:</strong>\n          <div class=\"code-terminal\"><pre><code>ros2 launch bot1 launch_sim.launch.py</code></pre></div>\n        </li>\n        <li><strong>Launch RViz2 & Teleoperation:</strong>\n          <div class=\"code-terminal\"><pre><code># Terminal 2:\nros2 launch bot1 rviz.launch.py\n\n# Terminal 3 (Keyboard Control):\nros2 run teleop_twist_keyboard teleop_twist_keyboard</code></pre></div>\n        </li>\n      </ol>\n    ",
    "guide_de": "\n      <h4>Schritt-für-Schritt ROS 2 Simulationsleitfaden:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Voraussetzungen:</strong> Ubuntu 22.04 LTS mit ROS 2 Humble Desktop Full.</li>\n        <li><strong>Abhängigkeiten installieren:</strong>\n          <div class=\"code-terminal\"><pre><code>sudo apt update && sudo apt install -y \\\n  ros-humble-gazebo-ros-pkgs \\\n  ros-humble-ros2-control \\\n  ros-humble-ros2-controllers \\\n  ros-humble-xacro \\\n  ros-humble-teleop-twist-keyboard</code></pre></div>\n        </li>\n        <li><strong>Workspace erstellen & kompilieren:</strong>\n          <div class=\"code-terminal\"><pre><code>mkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src\ngit clone https://github.com/vinhdo281/bot1.git\ncd ~/ros2_ws\ncolcon build --symlink-install --packages-select bot1\nsource install/setup.bash</code></pre></div>\n        </li>\n        <li><strong>Gazebo-Simulation starten:</strong>\n          <div class=\"code-terminal\"><pre><code>ros2 launch bot1 launch_sim.launch.py</code></pre></div>\n        </li>\n        <li><strong>RViz2 & Teleoperation via Tastatur:</strong>\n          <div class=\"code-terminal\"><pre><code>ros2 launch bot1 rviz.launch.py\nros2 run teleop_twist_keyboard teleop_twist_keyboard</code></pre></div>\n        </li>\n      </ol>\n    ",
    "results_en": "\n      <h4>Simulation Benchmarks:</h4>\n      <ul>\n        <li>Linear odometry error drift $< 1.2\\%$ over a $10.0\\,\\text{m}$ straight trajectory in Gazebo physics.</li>\n        <li>Continuous 50 Hz `/odom` and `/scan` publishing rate with zero frame dropping on multi-threaded ROS 2 executor.</li>\n      </ul>\n    ",
    "results_de": "\n      <h4>Simulationsergebnisse:</h4>\n      <ul>\n        <li>Linearer Odometrie-Drift $< 1.2\\%$ über $10.0\\,\\text{m}$ Fahrstrecke in Gazebo-Physik.</li>\n        <li>Stabile 50 Hz Veröffentlichungsrate auf `/odom` und `/scan` ohne Datenverlust.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>Launch Pipeline Snippet:</h4>\n      <div class=\"code-terminal\"><pre><code># launch_sim.launch.py extract\nnode_robot_state_publisher = Node(\n    package='robot_state_publisher',\n    executable='robot_state_publisher',\n    output='screen',\n    parameters=[{'robot_description': robot_description_config.toxml(), 'use_sim_time': True}]\n)</code></pre></div>\n    ",
    "demo_de": "\n      <h4>Launch-Pipeline Codeauszug:</h4>\n      <div class=\"code-terminal\"><pre><code># launch_sim.launch.py Auszug\nnode_robot_state_publisher = Node(\n    package='robot_state_publisher',\n    executable='robot_state_publisher',\n    output='screen',\n    parameters=[{'robot_description': robot_description_config.toxml(), 'use_sim_time': True}]\n)</code></pre></div>\n    "
  },
  {
    "id": "carcounter-yolo",
    "category": "vision",
    "category_en": "Computer Vision & AI",
    "badge": "VISION // YOLO11 & SORT // OPENCV",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/CarCounter-YOLO",
    "blog_url": "posts/carcounter-yolo-sort/index.html",
    "title_en": "Real-time Highway Vehicle Tracking & Counting System",
    "title_de": "Echtzeit-Fahrzeugzähl- und Trackingsystem für Autobahnen",
    "short_desc_en": "Real-time multi-lane highway vehicle detection, persistent ID tracking, and directional counting pipeline combining YOLOv8/YOLOv11 with the SORT algorithm.",
    "short_desc_de": "Echtzeit-Fahrzeugerkennung, Track-ID-Verfolgung und Zählpipeline für mehrspurige Autobahnen durch Verknüpfung von YOLOv8/YOLOv11 mit dem SORT-Algorithmus.",
    "tags": [
      "YOLOv11",
      "YOLOv8",
      "SORT Tracker",
      "Kalman Filter",
      "Computer Vision",
      "PyTorch",
      "OpenCV"
    ],
    "featured": false,
    "metrics": [
      {
        "label_en": "Inference Speed",
        "label_de": "Inferenz-Geschwindigkeit",
        "value": "62 FPS (RTX GPU)"
      },
      {
        "label_en": "Counting Accuracy",
        "label_de": "Zählgenauigkeit",
        "value": "95.2%"
      },
      {
        "label_en": "Tracking Algorithm",
        "label_de": "Tracking-Algorithmus",
        "value": "SORT (Kalman + Hungarian)"
      },
      {
        "label_en": "Detector Backbone",
        "label_de": "Detektor-Backbone",
        "value": "YOLOv8 / YOLOv11"
      }
    ],
    "overview_en": "\n      <h4>1. Engineering Scope</h4>\n      <p>Automated traffic surveillance systems require continuous identity assignment for moving vehicles even through mutual occlusions and variable sunlight reflections. Raw object detectors frequently switch IDs or drop detections across adjacent frames.</p>\n      <p>This project pairs deep convolutional feature extractors (YOLO) with an 8-state Kalman Filter motion model and the Hungarian assignment algorithm (SORT) to maintain consistent tracks and calculate directional traffic volume across virtual tripwires.</p>\n    ",
    "overview_de": "\n      <h4>1. Anwendungsbereich</h4>\n      <p>Verkehrsüberwachungssysteme müssen sich bewegenden Fahrzeugen auch bei Verdeckungen und wechselnden Lichtverhältnissen persistente IDs zuweisen. Reine Objekterkenner neigen zu ID-Switches und Detektionsausfällen.</p>\n      <p>Dieses Projekt kombiniert Deep-Learning-Detektoren (YOLO) mit einem 8-Zustands-Kalman-Filter und dem ungarischen Zuweisungsalgorithmus (SORT), um Spuren stabil zu halten und den Verkehrsfluss an virtuellen Zähllinien zu erfassen.</p>\n    ",
    "architecture_en": "\n      <h4>1. State Space & Data Association</h4>\n      <p>State vector for each vehicle bounding box: $\\mathbf{x} = [u, v, s, r, \\dot{u}, \\dot{v}, \\dot{s}, \\dot{r}]^T$, where $(u, v)$ is bbox center, $s$ is scale (pixel area), and $r$ is aspect ratio.</p>\n      <p>Matching cost between predicted states and incoming detections is computed using the Intersection over Union (IoU) distance matrix, solved optimally via Hungarian combinatorial matching.</p>\n    ",
    "architecture_de": "\n      <h4>1. Zustandsraum & Datenassoziation</h4>\n      <p>Zustandsvektor für jede Bounding Box: $\\mathbf{x} = [u, v, s, r, \\dot{u}, \\dot{v}, \\dot{s}, \\dot{r}]^T$ mit Zentrum $(u, v)$, Skalierung $s$ und Seitenverhältnis $r$.</p>\n      <p>Die Kostenmatrix basiert auf dem IoU-Abstand (Intersection over Union) und wird über den Munkres/Ungarischen Algorithmus optimal gelöst.</p>\n    ",
    "guide_en": "\n      <h4>Step-by-Step Execution Guide:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Environment Setup:</strong> Python 3.9 - 3.11 with CUDA-enabled GPU (optional but recommended for 60+ FPS).</li>\n        <li><strong>Clone & Install Dependencies:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/CarCounter-YOLO.git\ncd CarCounter-YOLO\npip install ultralytics opencv-python filterpy numpy</code></pre></div>\n        </li>\n        <li><strong>Run Pipeline on Video File:</strong>\n          <div class=\"code-terminal\"><pre><code>python Car_Counter.py</code></pre></div>\n        </li>\n        <li><strong>Customizing Tripwire & ROI Mask:</strong>\n          <ul style=\"margin-top:0.35rem;\">\n            <li>Edit <code>limits = [x1, y1, x2, y2]</code> inside <code>Car_Counter.py</code> to align the virtual counting line with your camera viewpoint.</li>\n            <li>Modify <code>mask.png</code> using any image editor to block out oncoming traffic lanes or roadside trees.</li>\n            <li>Adjust <code>conf = 0.45</code> to filter out low-confidence distant false positives.</li>\n          </ul>\n        </li>\n      </ol>\n    ",
    "guide_de": "\n      <h4>Schritt-für-Schritt Ausführungsleitfaden:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Voraussetzungen:</strong> Python 3.9 - 3.11 mit optionaler CUDA-GPU.</li>\n        <li><strong>Klonen & Installation:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/CarCounter-YOLO.git\ncd CarCounter-YOLO\npip install ultralytics opencv-python filterpy numpy</code></pre></div>\n        </li>\n        <li><strong>Ausführung starten:</strong>\n          <div class=\"code-terminal\"><pre><code>python Car_Counter.py</code></pre></div>\n        </li>\n        <li><strong>Anpassung von Zähllinie & Maske:</strong> Parameter <code>limits</code> im Skript anpassen und <code>mask.png</code> bearbeiten, um irrelevante Bereiche auszublenden.</li>\n      </ol>\n    ",
    "results_en": "\n      <h4>Performance Benchmarks:</h4>\n      <ul>\n        <li><strong>Counting Accuracy:</strong> 95.2% on standard multi-lane highway surveillance test sequences.</li>\n        <li><strong>Processing Speed:</strong> 62 FPS on NVIDIA RTX 3060; 24 FPS on Intel Core i7 CPU.</li>\n        <li><strong>ID Consistency:</strong> Zero duplicate counts registered per vehicle across virtual tripwire.</li>\n      </ul>\n    ",
    "results_de": "\n      <h4>Ergebnisse & Benchmarks:</h4>\n      <ul>\n        <li><strong>Zählgenauigkeit:</strong> 95.2% auf mehrspurigen Autobahn-Testsequenzen.</li>\n        <li><strong>Verarbeitungsgeschwindigkeit:</strong> 62 FPS auf NVIDIA RTX 3060; 24 FPS auf Intel Core i7 CPU.</li>\n        <li><strong>ID-Konsistenz:</strong> Keine Doppelzählungen pro Fahrzeug an der Zähllinie.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>Tripwire Crossing Detection Snippet:</h4>\n      <div class=\"code-terminal\"><pre><code># Check if bbox center (cx, cy) crossed virtual coordinate line\nif limits[0] < cx < limits[2] and limits[1] - 15 < cy < limits[1] + 15:\n    if totalCount.count(Id) == 0:\n        totalCount.append(Id)\n        cv2.line(img, (limits[0], limits[1]), (limits[2], limits[3]), (0, 255, 0), 5)</code></pre></div>\n    ",
    "demo_de": "\n      <h4>Liniendurchgangs-Erkennung Auszug:</h4>\n      <div class=\"code-terminal\"><pre><code># Prüfen, ob der Bbox-Mittelpunkt (cx, cy) die virtuelle Linie kreuzt\nif limits[0] < cx < limits[2] and limits[1] - 15 < cy < limits[1] + 15:\n    if totalCount.count(Id) == 0:\n        totalCount.append(Id)\n        cv2.line(img, (limits[0], limits[1]), (limits[2], limits[3]), (0, 255, 0), 5)</code></pre></div>\n    "
  },
  {
    "id": "volumn-hand-control",
    "category": "vision",
    "category_en": "Computer Vision & AI",
    "badge": "HCI // MEDIAPIPE // PYCAW // OPENCV",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/VolumnHandControl",
    "blog_url": "posts/touchless-hand-volume-control/index.html",
    "title_en": "Touchless Hand Gesture System Volume Controller",
    "title_de": "Berührungslose Lautstärkeregelung per Handgesten",
    "short_desc_en": "Real-time touchless Human-Computer Interaction (HCI) desktop tool translating hand landmark distance into Windows system audio volume via MediaPipe and PyCaw.",
    "short_desc_de": "Berührungslose Mensch-Maschine-Schnittstelle zur Systemlautstärkeregelung unter Windows über MediaPipe-Handlandmarken und PyCaw.",
    "tags": [
      "MediaPipe",
      "PyCaw",
      "OpenCV",
      "HCI",
      "Gesture Control",
      "Python"
    ],
    "featured": false,
    "metrics": [
      {
        "label_en": "System Latency",
        "label_de": "Systemlatenz",
        "value": "< 18 ms"
      },
      {
        "label_en": "Tracking Topology",
        "label_de": "Tracking-Topologie",
        "value": "MediaPipe 21 Landmarks"
      },
      {
        "label_en": "Jitter Filter",
        "label_de": "Jitter-Filter",
        "value": "EMA (alpha = 0.35)"
      },
      {
        "label_en": "Host Platform",
        "label_de": "Host-Plattform",
        "value": "Windows Core Audio"
      }
    ],
    "overview_en": "\n      <h4>1. Engineering Scope</h4>\n      <p>Touchless gesture interaction provides hygienic, intuitive hardware control without physical input devices. This project maps the continuous 3D Euclidean distance between thumb and index finger directly to Windows Core Audio endpoints.</p>\n      <p>An Exponential Moving Average (EMA) digital filter eliminates hand tremor, and a discrete pinch gesture ($d < 25\\,\\text{px}$) activates mute/unmute toggling.</p>\n    ",
    "overview_de": "\n      <h4>1. Anwendungsbereich</h4>\n      <p>Berührungslose Gestensteuerung ermöglicht hygienische, intuitive Bedienung ohne physische Eingabegeräte. Dieses Projekt bildet den euklidischen Abstand zwischen Daumen- und Zeigefingerspitze auf die Windows-Audiolautstärke ab.</p>\n      <p>Ein exponentieller Glättungsfilter (EMA) unterdrückt Zitterbewegungen, und eine Pinch-Geste ($d < 25\\,\\text{px}$) schaltet stumm.</p>\n    ",
    "architecture_en": "\n      <h4>1. Distance Mapping & Signal Smoothing</h4>\n      <p>Euclidean distance between Landmark 4 (Thumb Tip) and Landmark 8 (Index Tip):</p>\n      <div class=\"code-terminal\"><pre><code>length = sqrt((x2 - x1)^2 + (y2 - y1)^2)\nvol_raw = np.interp(length, [25, 220], [volMin, volMax])\nvol_smooth = 0.35 * vol_raw + 0.65 * vol_prev</code></pre></div>\n    ",
    "architecture_de": "\n      <h4>1. Abstands-Mapping & Signalglättung</h4>\n      <p>Euklidischer Abstand zwischen Daumenspitze (Punkt 4) und Zeigefingerspitze (Punkt 8):</p>\n      <div class=\"code-terminal\"><pre><code>length = sqrt((x2 - x1)^2 + (y2 - y1)^2)\nvol_raw = np.interp(length, [25, 220], [volMin, volMax])\nvol_smooth = 0.35 * vol_raw + 0.65 * vol_prev</code></pre></div>\n    ",
    "guide_en": "\n      <h4>Step-by-Step Execution Guide:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Prerequisites:</strong> Windows 10/11 operating system, Python 3.8 - 3.11, standard webcam.</li>\n        <li><strong>Clone & Install Dependencies:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/VolumnHandControl.git\ncd VolumnHandControl\npip install opencv-python mediapipe pycaw comtypes numpy</code></pre></div>\n        </li>\n        <li><strong>Run Application:</strong>\n          <div class=\"code-terminal\"><pre><code>python VolumeHandControl.py</code></pre></div>\n        </li>\n        <li><strong>Gestures:</strong>\n          <ul style=\"margin-top:0.35rem;\">\n            <li>Vary the distance between thumb and index finger to scale volume from 0% to 100%.</li>\n            <li>Pinch fingers completely together ($d < 25\\,\\text{px}$) to trigger visual lock/mute indicator.</li>\n          </ul>\n        </li>\n      </ol>\n    ",
    "guide_de": "\n      <h4>Schritt-für-Schritt Ausführungsleitfaden:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Voraussetzungen:</strong> Windows 10/11, Python 3.8 - 3.11, Webcam.</li>\n        <li><strong>Klonen & Installation:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/VolumnHandControl.git\ncd VolumnHandControl\npip install opencv-python mediapipe pycaw comtypes numpy</code></pre></div>\n        </li>\n        <li><strong>Anwendung starten:</strong>\n          <div class=\"code-terminal\"><pre><code>python VolumeHandControl.py</code></pre></div>\n        </li>\n        <li><strong>Bedienung:</strong> Daumen- und Zeigefingerabstand steuert die Lautstärke stufenlos; vollständiges Zusammendrücken schaltet stumm.</li>\n      </ol>\n    ",
    "results_en": "\n      <h4>Performance Metrics:</h4>\n      <ul>\n        <li>End-to-end pipeline latency under 18 ms ($> 55\\,\\text{FPS}$ processing speed).</li>\n        <li>Total CPU utilization $< 7\\%$ on single thread with OpenCV hardware acceleration.</li>\n      </ul>\n    ",
    "results_de": "\n      <h4>Leistungsmetriken:</h4>\n      <ul>\n        <li>Gesamtlatenz unter 18 ms ($> 55\\,\\text{FPS}$ Bildverarbeitungsrate).</li>\n        <li>CPU-Auslastung $< 7\\%$ durch optimierte OpenCV-Hardwarebeschleunigung.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>PyCaw Audio Control Loop:</h4>\n      <div class=\"code-terminal\"><pre><code>devices = AudioUtilities.GetSpeakers()\ninterface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)\nvolume = cast(interface, POINTER(IAudioEndpointVolume))\nvolume.SetMasterVolumeLevel(vol_smooth, None)</code></pre></div>\n    ",
    "demo_de": "\n      <h4>PyCaw Audio-Regelschleife:</h4>\n      <div class=\"code-terminal\"><pre><code>devices = AudioUtilities.GetSpeakers()\ninterface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)\nvolume = cast(interface, POINTER(IAudioEndpointVolume))\nvolume.SetMasterVolumeLevel(vol_smooth, None)</code></pre></div>\n    "
  },
  {
    "id": "finger-counter",
    "category": "vision",
    "category_en": "Computer Vision & AI",
    "badge": "VISION // MEDIAPIPE // GEOMETRY // OPENCV",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/FingerCounter",
    "blog_url": "posts/realtime-finger-counter-mediapipe/index.html",
    "title_en": "Real-Time Hand Landmark Estimation & Finger Counter",
    "title_de": "Echtzeit-Handlandmarken-Erkennung & Fingerzähler",
    "short_desc_en": "Real-time hand topology estimation, left/right hand classification, and anatomical joint angle testing to count active extended fingers from 0 to 5.",
    "short_desc_de": "Echtzeit-Erfassung der Handtopologie, Links-/Rechts-Klassifikation und anatomische Gelenkprüfung zur Zählung gestreckter Finger von 0 bis 5.",
    "tags": [
      "MediaPipe Hands",
      "OpenCV",
      "Gesture Recognition",
      "Kinematics",
      "Python"
    ],
    "featured": false,
    "metrics": [
      {
        "label_en": "Inference Latency",
        "label_de": "Inferenzlatenz",
        "value": "~14 ms"
      },
      {
        "label_en": "Detection Accuracy",
        "label_de": "Erkennungsgenauigkeit",
        "value": "98.5%"
      },
      {
        "label_en": "Classification",
        "label_de": "Klassifikation",
        "value": "Left / Right Handedness"
      },
      {
        "label_en": "Counting Range",
        "label_de": "Zählbereich",
        "value": "0 - 5 Fingers (Dual Hand)"
      }
    ],
    "overview_en": "\n      <h4>1. Engineering Scope</h4>\n      <p>Hand gesture classification and finger state decoding are essential components in sign language translation and robotic manipulator teleoperation. This application provides real-time joint angle evaluation and counting with sub-15ms latency.</p>\n    ",
    "overview_de": "\n      <h4>1. Anwendungsbereich</h4>\n      <p>Gestenklassifikation und Fingerzustandsanalyse bilden die Grundlage für Gebärdensprachübersetzung und Teleoperation von Robotergreifern. Diese Anwendung liefert zuverlässige Gelenkwinkelanalysen unter 15 ms Latenz.</p>\n    ",
    "architecture_en": "\n      <h4>1. Anatomical Extension Logic</h4>\n      <p>For fingers 2 through 5 (Index, Middle, Ring, Pinky): extended if $y_{\\text{tip}} < y_{\\text{pip}}$ in inverted vertical screen coordinates.</p>\n      <p>For thumb (finger 1): evaluated along lateral horizontal axis conditioned on handedness: $x_{\\text{tip}} > x_{\\text{ip}}$ for right hand, $x_{\\text{tip}} < x_{\\text{ip}}$ for left hand.</p>\n    ",
    "architecture_de": "\n      <h4>1. Geometrische Prüflogik</h4>\n      <p>Für die Finger 2 bis 5 (Zeige-, Mittel-, Ring-, kleiner Finger): gestreckt, wenn $y_{\\text{tip}} < y_{\\text{pip}}$ im invertierten Bildkoordinatensystem.</p>\n      <p>Für den Daumen: Prüfung entlang der horizontalen Achse abhängig von Links-/Rechtshand-Klassifikation: $x_{\\text{tip}} > x_{\\text{ip}}$ (rechte Hand) bzw. $x_{\\text{tip}} < x_{\\text{ip}}$ (linke Hand).</p>\n    ",
    "guide_en": "\n      <h4>Step-by-Step Execution Guide:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Requirements:</strong> Python 3.8+, webcam.</li>\n        <li><strong>Clone & Install:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/FingerCounter.git\ncd FingerCounter\npip install opencv-python mediapipe numpy</code></pre></div>\n        </li>\n        <li><strong>Run Application:</strong>\n          <div class=\"code-terminal\"><pre><code>python FingerCountingProject.py</code></pre></div>\n        </li>\n        <li><strong>Verification:</strong> Raise fingers in front of camera; real-time HUD overlays bone connection vectors and updates the numeric count from 0 to 5.</li>\n      </ol>\n    ",
    "guide_de": "\n      <h4>Schritt-für-Schritt Ausführungsleitfaden:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Voraussetzungen:</strong> Python 3.8+, Webcam.</li>\n        <li><strong>Klonen & Installation:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/FingerCounter.git\ncd FingerCounter\npip install opencv-python mediapipe numpy</code></pre></div>\n        </li>\n        <li><strong>Anwendung ausführen:</strong>\n          <div class=\"code-terminal\"><pre><code>python FingerCountingProject.py</code></pre></div>\n        </li>\n        <li><strong>Überprüfung:</strong> Finger vor die Kamera halten; das HUD zeigt Knochenverbindungen und die aktuelle Ziffer 0 bis 5 an.</li>\n      </ol>\n    ",
    "results_en": "\n      <h4>Verification Results:</h4>\n      <ul>\n        <li>98.5% classification accuracy across varying camera angles and background clutter.</li>\n        <li>~14 ms mean frame processing latency on standard CPU.</li>\n      </ul>\n    ",
    "results_de": "\n      <h4>Testergebnisse:</h4>\n      <ul>\n        <li>98.5% Klassifikationsgenauigkeit bei wechselnden Kamerawinkeln.</li>\n        <li>~14 ms durchschnittliche Verarbeitungszeit auf Standard-CPUs.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>Finger Extension Detection Logic:</h4>\n      <div class=\"code-terminal\"><pre><code>fingers = []\n# Thumb\nif lmList[tipIds[0]][1] > lmList[tipIds[0] - 1][1]:\n    fingers.append(1)\nelse:\n    fingers.append(0)\n# 4 Fingers\nfor id in range(1, 5):\n    if lmList[tipIds[id]][2] < lmList[tipIds[id] - 2][2]:\n        fingers.append(1)\n    else:\n        fingers.append(0)</code></pre></div>\n    ",
    "demo_de": "\n      <h4>Fingererkennungs-Auszug:</h4>\n      <div class=\"code-terminal\"><pre><code>fingers = []\n# Daumen\nif lmList[tipIds[0]][1] > lmList[tipIds[0] - 1][1]:\n    fingers.append(1)\nelse:\n    fingers.append(0)\n# 4 Finger\nfor id in range(1, 5):\n    if lmList[tipIds[id]][2] < lmList[tipIds[id] - 2][2]:\n        fingers.append(1)\n    else:\n        fingers.append(0)</code></pre></div>\n    "
  },
  {
    "id": "k-thuat-lap-trinh",
    "category": "vision",
    "category_en": "Computer Vision & AI",
    "badge": "AI // PYTORCH // CNN // OPENCV",
    "date": "12/2024",
    "github_url": "https://github.com/vinhdo281/K-thu-t-l-p-tr-nh",
    "blog_url": "posts/dip-cnn-classification/index.html",
    "title_en": "Digital Image Processing & CNN Object Classification",
    "title_de": "Digitale Bildverarbeitung & Deep-Learning-Objektklassifikation",
    "short_desc_en": "End-to-end PyTorch deep learning framework implementing Convolutional Neural Networks (CNN), batch normalization, dropout regularization, and dataset augmentation pipelines.",
    "short_desc_de": "PyTorch Deep-Learning-Framework mit Convolutional Neural Networks (CNN), Batch Normalization, Dropout und Datenaugmentierungs-Pipelines.",
    "tags": [
      "PyTorch",
      "CNN",
      "Deep Learning",
      "Image Processing",
      "OpenCV",
      "Python"
    ],
    "featured": false,
    "metrics": [
      {
        "label_en": "Model Accuracy",
        "label_de": "Modell-Genauigkeit",
        "value": "92.8% Test Acc"
      },
      {
        "label_en": "CPU Inference",
        "label_de": "CPU-Inferenzzeit",
        "value": "< 32 ms"
      },
      {
        "label_en": "Framework",
        "label_de": "Framework",
        "value": "PyTorch & Torchvision"
      },
      {
        "label_en": "Architecture",
        "label_de": "Architektur",
        "value": "Deep CNN + BatchNorm + Dropout"
      }
    ],
    "overview_en": "\n      <h4>1. Engineering Scope</h4>\n      <p>Automated visual inspection requires robust feature extraction resilient to rotation, illumination shifts, and sensor noise. This project implements a modular deep convolutional architecture trained with cross-entropy loss and AdamW optimization.</p>\n    ",
    "overview_de": "\n      <h4>1. Anwendungsbereich</h4>\n      <p>Automatisierte visuelle Qualitätsprüfung erfordert robuste Merkmalsextraktion gegen Rotation und Rauschen. Dieses Projekt realisiert eine modulare CNN-Architektur mit AdamW-Optimierung.</p>\n    ",
    "architecture_en": "\n      <h4>1. Neural Network Architecture</h4>\n      <p>Conv2d(3 -> 32, 3x3) -> BatchNorm -> ReLU -> MaxPool(2x2)</p>\n      <p>Conv2d(32 -> 64, 3x3) -> BatchNorm -> ReLU -> MaxPool(2x2)</p>\n      <p>Conv2d(64 -> 128, 3x3) -> BatchNorm -> ReLU -> MaxPool(2x2)</p>\n      <p>Dense(128*4*4 -> 256) -> Dropout(0.4) -> Linear(256 -> num_classes)</p>\n    ",
    "architecture_de": "\n      <h4>1. Neuronale Netzwerkarchitektur</h4>\n      <p>Conv2d(3 -> 32, 3x3) -> BatchNorm -> ReLU -> MaxPool(2x2)</p>\n      <p>Conv2d(32 -> 64, 3x3) -> BatchNorm -> ReLU -> MaxPool(2x2)</p>\n      <p>Conv2d(64 -> 128, 3x3) -> BatchNorm -> ReLU -> MaxPool(2x2)</p>\n      <p>Dense(128*4*4 -> 256) -> Dropout(0.4) -> Linear(256 -> Klassen)</p>\n    ",
    "guide_en": "\n      <h4>Step-by-Step Training & Inference Guide:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Environment Setup:</strong> Python 3.9+, PyTorch with CUDA support.</li>\n        <li><strong>Clone & Install:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/K-thu-t-l-p-tr-nh.git\ncd K-thu-t-l-p-tr-nh\npip install torch torchvision opencv-python numpy matplotlib</code></pre></div>\n        </li>\n        <li><strong>Train Model:</strong>\n          <div class=\"code-terminal\"><pre><code>python train.py --epochs 30 --batch-size 64 --lr 0.001</code></pre></div>\n        </li>\n        <li><strong>Evaluate Saved Weights (<code>modnew.pt</code>):</strong>\n          <div class=\"code-terminal\"><pre><code>python -c \"import torch; model = torch.load('modnew.pt', map_location='cpu'); print('Model loaded successfully!')\"</code></pre></div>\n        </li>\n      </ol>\n    ",
    "guide_de": "\n      <h4>Schritt-für-Schritt Trainings- & Inferenzleitfaden:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Voraussetzungen:</strong> Python 3.9+, PyTorch mit CUDA.</li>\n        <li><strong>Klonen & Installation:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/K-thu-t-l-p-tr-nh.git\ncd K-thu-t-l-p-tr-nh\npip install torch torchvision opencv-python numpy matplotlib</code></pre></div>\n        </li>\n        <li><strong>Training ausführen:</strong>\n          <div class=\"code-terminal\"><pre><code>python train.py --epochs 30 --batch-size 64 --lr 0.001</code></pre></div>\n        </li>\n        <li><strong>Modell-Inferenz testen:</strong>\n          <div class=\"code-terminal\"><pre><code>python -c \"import torch; model = torch.load('modnew.pt', map_location='cpu'); print('Modell erfolgreich geladen!')\"</code></pre></div>\n        </li>\n      </ol>\n    ",
    "results_en": "\n      <h4>Validation Benchmarks:</h4>\n      <ul>\n        <li>92.8% top-1 validation accuracy; 31.5 ms CPU inference latency, 6.2 ms on NVIDIA CUDA GPU.</li>\n      </ul>\n    ",
    "results_de": "\n      <h4>Validierungs-Benchmarks:</h4>\n      <ul>\n        <li>92.8% Top-1 Testgenauigkeit; 31.5 ms Inferenzzeit auf CPU, 6.2 ms auf NVIDIA CUDA GPU.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>PyTorch Evaluation Snippet:</h4>\n      <div class=\"code-terminal\"><pre><code>model = torch.load('modnew.pt', map_location='cpu')\nmodel.eval()\nwith torch.no_grad():\n    output = model(input_tensor)\n    predicted_class = torch.argmax(output, dim=1).item()</code></pre></div>\n    ",
    "demo_de": "\n      <h4>PyTorch Evaluierungs-Auszug:</h4>\n      <div class=\"code-terminal\"><pre><code>model = torch.load('modnew.pt', map_location='cpu')\nmodel.eval()\nwith torch.no_grad():\n    output = model(input_tensor)\n    predicted_class = torch.argmax(output, dim=1).item()</code></pre></div>\n    "
  },
  {
    "id": "checking-weather",
    "category": "software",
    "category_en": "Software & APIs",
    "badge": "DESKTOP // PYQT5 // REST API",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/Checking-Weather-using-API",
    "blog_url": "posts/weather-telemetry-desktop-app/index.html",
    "title_en": "Global Meteorological Telemetry Desktop Application",
    "title_de": "Globale Wettervorhersage Desktop-App (PyQt5 & REST API)",
    "short_desc_en": "Desktop GUI telemetry application engineered with Python and PyQt5, fetching real-time global weather indicators from OpenWeatherMap REST API under an MVC pattern.",
    "short_desc_de": "Desktop-GUI-Anwendung mit Python und PyQt5: Direkte REST-API-Anbindung an OpenWeatherMap zur Echtzeitanzeige weltweiter meteorologischer Daten im MVC-Muster.",
    "tags": [
      "Python",
      "PyQt5",
      "REST API",
      "GUI",
      "OpenWeatherMap",
      "JSON"
    ],
    "featured": false,
    "metrics": [
      {
        "label_en": "Network Latency",
        "label_de": "Netzwerklatenz",
        "value": "< 220 ms API Response"
      },
      {
        "label_en": "GUI Engine",
        "label_de": "GUI-Framework",
        "value": "PyQt5 Desktop Framework"
      },
      {
        "label_en": "Data Source",
        "label_de": "Datenquelle",
        "value": "OpenWeatherMap REST API"
      },
      {
        "label_en": "Architecture",
        "label_de": "Architektur",
        "value": "Model-View-Controller (MVC)"
      }
    ],
    "overview_en": "\n      <h4>1. Engineering Scope</h4>\n      <p>Desktop weather dashboard integrating asynchronous REST queries with PyQt5 widgets. Features custom QSS stylesheets, input validation, and real-time metric parsing (temperature, pressure, humidity, wind vector).</p>\n    ",
    "overview_de": "\n      <h4>1. Anwendungsbereich</h4>\n      <p>Desktop-Wetter-Dashboard mit asynchronen REST-Abfragen und PyQt5-Widgets. Bietet angepasste QSS-Stylesheets, Eingabevalidierung und Echtzeitdaten (Temperatur, Druck, Luftfeuchtigkeit, Wind).</p>\n    ",
    "architecture_en": "\n      <h4>1. MVC Design Pattern</h4>\n      <p>Model handles HTTP sessions and JSON schema deserialization; View renders responsive PyQt5 layouts; Controller manages signals and error dialogs.</p>\n    ",
    "architecture_de": "\n      <h4>1. MVC-Entwurfsmuster</h4>\n      <p>Das Model verwaltet HTTP-Verbindungen und JSON-Deserialisierung; die View rendert responsive PyQt5-Layouts; der Controller steuert Signal-Slot-Ereignisse.</p>\n    ",
    "guide_en": "\n      <h4>Step-by-Step Execution Guide:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Requirements:</strong> Python 3.8+, OpenWeatherMap API Key.</li>\n        <li><strong>Clone & Install:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/Checking-Weather-using-API.git\ncd Checking-Weather-using-API\npip install PyQt5 requests</code></pre></div>\n        </li>\n        <li><strong>Configure API Key:</strong> Set your free OpenWeatherMap API key in <code>Checking_weather.py</code>.</li>\n        <li><strong>Launch Application:</strong>\n          <div class=\"code-terminal\"><pre><code>python Checking_weather.py</code></pre></div>\n        </li>\n      </ol>\n    ",
    "guide_de": "\n      <h4>Schritt-für-Schritt Ausführungsleitfaden:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Voraussetzungen:</strong> Python 3.8+, OpenWeatherMap API-Schlüssel.</li>\n        <li><strong>Klonen & Installation:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/Checking-Weather-using-API.git\ncd Checking-Weather-using-API\npip install PyQt5 requests</code></pre></div>\n        </li>\n        <li><strong>API-Schlüssel konfigurieren:</strong> Schlüssel in <code>Checking_weather.py</code> eintragen.</li>\n        <li><strong>Anwendung starten:</strong>\n          <div class=\"code-terminal\"><pre><code>python Checking_weather.py</code></pre></div>\n        </li>\n      </ol>\n    ",
    "results_en": "\n      <h4>Performance Benchmarks:</h4>\n      <ul>\n        <li>Average API round-trip latency < 220 ms with zero UI freeze on query execution.</li>\n      </ul>\n    ",
    "results_de": "\n      <h4>Leistungsmetriken:</h4>\n      <ul>\n        <li>Durchschnittliche API-Antwortzeit < 220 ms ohne Blockierung der Benutzeroberfläche.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>API Request & Signal Slot:</h4>\n      <div class=\"code-terminal\"><pre><code>url = f\"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric\"\nresponse = requests.get(url, timeout=5)\ndata = response.json()\ntemp = data['main']['temp']\nweather_desc = data['weather'][0]['description']</code></pre></div>\n    ",
    "demo_de": "\n      <h4>API-Abfrage & Signal-Slot:</h4>\n      <div class=\"code-terminal\"><pre><code>url = f\"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric\"\nresponse = requests.get(url, timeout=5)\ndata = response.json()\ntemp = data['main']['temp']\nweather_desc = data['weather'][0]['description']</code></pre></div>\n    "
  },
  {
    "id": "python-collection",
    "category": "software",
    "category_en": "Software & Algorithms",
    "badge": "PYTHON // CRYPTOGRAPHY // REST // OOP",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/python",
    "blog_url": "posts/python-algorithmic-suite/index.html",
    "title_en": "Python Algorithmic Tools & Application Suite",
    "title_de": "Python Algorithmen-Utilities & Interaktive Mini-Projekte Suite",
    "short_desc_en": "Modular software suite implementing symmetric substitution cryptography engines (94! keyspace), REST API telemetry clients, and event-driven GUI applications.",
    "short_desc_de": "Modulare Softwaresuite mit symmetrischer Substitutions-Kryptographie (94! Schlüsselraum), REST-API-Clients und ereignisgesteuerten GUI-Anwendungen.",
    "tags": [
      "Python 3",
      "Cryptography",
      "Tkinter GUI",
      "Algorithms",
      "REST API",
      "OOP"
    ],
    "featured": false,
    "metrics": [
      {
        "label_en": "Modules Count",
        "label_de": "Anzahl Module",
        "value": "5 Standalone Projects"
      },
      {
        "label_en": "Cipher Keyspace",
        "label_de": "Chiffrierschlüsselraum",
        "value": "94! Permutations"
      },
      {
        "label_en": "Code Standard",
        "label_de": "Codestandard",
        "value": "PEP 8 Compliant"
      },
      {
        "label_en": "Dependencies",
        "label_de": "Abhängigkeiten",
        "value": "Pure Python 3 + Requests"
      }
    ],
    "overview_en": "\n      <h4>1. Engineering Scope</h4>\n      <p>Algorithmic utility collection demonstrating core computer science concepts: symmetric substitution cryptography, REST consumer architectures, Tkinter desktop GUIs, and probabilistic state machine simulators.</p>\n    ",
    "overview_de": "\n      <h4>1. Anwendungsbereich</h4>\n      <p>Algorithmische Sammlung zentraler Informatikkonzepte: Symmetrische Substitutionsverschlüsselung, REST-API-Architekturen, Tkinter Desktop-GUIs und probabilistische Zustandsautomaten.</p>\n    ",
    "architecture_en": "\n      <h4>1. Modules Architecture</h4>\n      <ul>\n        <li><code>encryption_program.py</code>: Permutation substitution cipher across 94 ASCII printable glyphs ($94! \\approx 1.08 \\times 10^{146}$ keyspace).</li>\n        <li><code>pokemon_program.py</code>: PokéAPI REST telemetry client with JSON parsing.</li>\n        <li><code>digital_clock.py</code>: Real-time event-driven GUI clock with Tkinter timer hooks.</li>\n        <li><code>slot_machine.py</code>: Multi-reel probabilistic RNG game simulator.</li>\n      </ul>\n    ",
    "architecture_de": "\n      <h4>1. Modul-Architektur</h4>\n      <ul>\n        <li><code>encryption_program.py</code>: Permutations-Substitutionschiffre über 94 ASCII-Zeichen ($94! \\approx 1.08 \\times 10^{146}$ Schlüsselraum).</li>\n        <li><code>pokemon_program.py</code>: PokéAPI REST-Client mit strukturierter JSON-Verarbeitung.</li>\n        <li><code>digital_clock.py</code>: Ereignisgesteuerte GUI-Uhr mit Tkinter-Timer-Interrupts.</li>\n        <li><code>slot_machine.py</code>: Probabilistischer RNG-Spielautomatensimulator.</li>\n      </ul>\n    ",
    "guide_en": "\n      <h4>Step-by-Step Execution Guide:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Prerequisites:</strong> Python 3.8+ standard library.</li>\n        <li><strong>Clone & Install:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/python.git\ncd python\npip install requests</code></pre></div>\n        </li>\n        <li><strong>Run Symmetric Cryptography Engine:</strong>\n          <div class=\"code-terminal\"><pre><code>python encryption_program.py</code></pre></div>\n        </li>\n        <li><strong>Run PokéAPI REST Telemetry Client:</strong>\n          <div class=\"code-terminal\"><pre><code>python pokemon_program.py</code></pre></div>\n        </li>\n        <li><strong>Run Desktop GUI Clock:</strong>\n          <div class=\"code-terminal\"><pre><code>python digital_clock.py</code></pre></div>\n        </li>\n      </ol>\n    ",
    "guide_de": "\n      <h4>Schritt-für-Schritt Ausführungsleitfaden:</h4>\n      <ol style=\"padding-left:1.25rem; line-height:1.7;\">\n        <li><strong>Voraussetzungen:</strong> Python 3.8+ Standardbibliothek.</li>\n        <li><strong>Klonen & Installation:</strong>\n          <div class=\"code-terminal\"><pre><code>git clone https://github.com/vinhdo281/python.git\ncd python\npip install requests</code></pre></div>\n        </li>\n        <li><strong>Symmetrische Verschlüsselung ausführen:</strong>\n          <div class=\"code-terminal\"><pre><code>python encryption_program.py</code></pre></div>\n        </li>\n        <li><strong>PokéAPI REST-Client starten:</strong>\n          <div class=\"code-terminal\"><pre><code>python pokemon_program.py</code></pre></div>\n        </li>\n        <li><strong>Desktop-GUI-Uhr starten:</strong>\n          <div class=\"code-terminal\"><pre><code>python digital_clock.py</code></pre></div>\n        </li>\n      </ol>\n    ",
    "results_en": "\n      <h4>Verification Benchmarks:</h4>\n      <ul>\n        <li>100% loss-free roundtrip encryption/decryption across arbitrary length UTF-8 strings.</li>\n        <li>Sub-millisecond execution runtime on all mathematical algorithms.</li>\n      </ul>\n    ",
    "results_de": "\n      <h4>Verifikationsergebnisse:</h4>\n      <ul>\n        <li>100% verlustfreie Ver- und Entschlüsselung beliebiger UTF-8 Zeichenketten.</li>\n        <li>Sub-Millisekunden-Laufzeit auf allen mathematischen Algorithmen.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>Symmetric Substitution Cipher Snippet:</h4>\n      <div class=\"code-terminal\"><pre><code>chars = string.punctuation + string.digits + string.ascii_letters\nkey = chars.copy()\nrandom.shuffle(key)\ncipher_text = \"\".join(key[chars.index(letter)] if letter in chars else letter for letter in plain_text)</code></pre></div>\n    ",
    "demo_de": "\n      <h4>Symmetrischer Substitutions-Auszug:</h4>\n      <div class=\"code-terminal\"><pre><code>chars = string.punctuation + string.digits + string.ascii_letters\nkey = chars.copy()\nrandom.shuffle(key)\ncipher_text = \"\".join(key[chars.index(letter)] if letter in chars else letter for letter in plain_text)</code></pre></div>\n    "
  }
];

if (typeof window !== 'undefined') {
  window.PROJECTS_DATA = PROJECTS_DATA;
}
if (typeof globalThis !== 'undefined') {
  globalThis.PROJECTS_DATA = PROJECTS_DATA;
}
