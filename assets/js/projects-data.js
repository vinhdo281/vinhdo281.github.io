// Danh sach du lieu chi tiet cho tat ca du an ky thuat
// Dinh dang bao cao ky thuat tieu chuan: Khong su dung emoji, ngon ngu khach quan, chinh xac.
const PROJECTS_DATA = [
  {
    "id": "fuzzy-controller",
    "category": "control",
    "category_vi": "Dieu Khien & Robotics",
    "category_en": "Control & Robotics",
    "badge": "CAD // SIMULATION // MUJOCO & SIMSCAPE",
    "date": "10/2026",
    "github_url": "https://github.com/vinhdo281/Fuzzy-Controller",
    "blog_url": "posts/fuzzy-inverted-pendulum/",
    "title_vi": "Hệ Thống Điều Khiển Mờ Mamdani Ổn Định Con Lắc Ngược Trên Xe (MuJoCo & Simulink)",
    "title_en": "Single Unified Mamdani FIS Inverted Pendulum Controller in MuJoCo & Simulink",
    "short_desc_vi": "Báo cáo thiết kế bộ điều khiển mờ Mamdani FIS 16 luật thống nhất xử lý đồng thời 4 biến trạng thái, ổn định con lắc ngược từ góc lệch lớn 22 độ và triệt tiêu sai số vị trí xe trên nền tảng MuJoCo Physics và MATLAB/Simulink Simscape Multibody.",
    "short_desc_en": "Design and verification of a single unified 16-rule Mamdani FIS controller with 4 continuous state inputs, stabilizing an inverted cart-pendulum from 22-degree initial deviation with zero steady-state cart drift.",
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
        "label_vi": "Góc phục hồi cực đại",
        "label_en": "Max Recovery Tilt",
        "value": "22.0 deg"
      },
      {
        "label_vi": "Thời gian xác lập (ts)",
        "label_en": "Settling Time",
        "value": "1.65 s"
      },
      {
        "label_vi": "Sai số vị trí tĩnh (Zero Drift)",
        "label_en": "Cart Drift Error",
        "value": "+/- 0.002 m"
      },
      {
        "label_vi": "Độ vọt lố góc (Overshoot)",
        "label_en": "Overshoot",
        "value": "< 4.5%"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat & Phat bieu bai toan</h4>\n      <p>He thong con lac nguoc tren xe truot (Inverted Cart-Pendulum) la doi tuong co ban de kiem chung ly thuyet dieu khien phi tuyen. He co 2 bac tu do (DOF) gom vi tri xe $x(t)$ va goc nghieng thanh $\\theta(t)$, nhung chi su dung 1 luc tac dong ngang duy nhat $F(t)$. Day la he thieu co cau chap hanh (Underactuated), phi cuc tieu pha va khong on dinh vong ho.</p>\n      <p><strong>Muc tieu:</strong> Xay dung bo dieu khien mo Mamdani hop nhat co kha nang giu thanh lac dung dung dong thoi keo xe ve goc toa do $x = 0$ tu trang thai lech goc lon toi 22 do, khac phuc han che vung on dinh hep cua cac thuat toan tuyen tinh hoa LQR hoac PID co dien.</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Objective & Problem Formulation</h4>\n      <p>The cart-pendulum system represents a benchmark non-linear underactuated plant with 2 degrees of freedom ($x(t), \\theta(t)$) governed by a single horizontal force $F(t)$.</p>\n      <p><strong>Objective:</strong> Design a unified Mamdani Fuzzy Inference System (FIS) stabilizing the pole from large initial inclinations (up to 22 degrees) while driving cart position to origin ($x \\to 0$) without Jacobian linearization constraints.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Mo hinh dong luc hoc phi tuyen (Euler-Lagrange)</h4>\n      <p>Phuong trinh vi phan chuyen dong phi tuyen day du:</p>\n      <div class=\"code-terminal\">\n        <pre><code>(M + m) * x_ddot + m * l * theta_ddot * cos(theta) - m * l * (theta_dot^2) * sin(theta) = F - b_c * x_dot\nm * l * x_ddot * cos(theta) + (J + m * l^2) * theta_ddot - m * g * l * sin(theta) = -b_p * theta_dot</code></pre>\n      </div>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Dai luong</th>\n            <th style=\"padding:0.4rem;\">Y nghia vat ly</th>\n            <th style=\"padding:0.4rem;\">Gia tri mo hinh CAD HUST</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\">M</td><td>Khoi luong xe truot</td><td>1.20 kg</td></tr>\n          <tr><td style=\"padding:0.4rem;\">m</td><td>Khoi luong thanh lac</td><td>0.20 kg</td></tr>\n          <tr><td style=\"padding:0.4rem;\">L</td><td>Chieu dai thanh lac</td><td>0.50 m</td></tr>\n          <tr><td style=\"padding:0.4rem;\">l</td><td>Khoang cach den khoi tam thanh (L/2)</td><td>0.25 m</td></tr>\n          <tr><td style=\"padding:0.4rem;\">J</td><td>Mo-men quan tinh quanh khoi tam</td><td>0.00417 kg.m2</td></tr>\n        </tbody>\n      </table>\n\n      <h4>2. Cau truc he suy dien mo Mamdani 16 luat</h4>\n      <ul>\n        <li>Bien ngo vao (4 trang thai): Goc nghieng $\\theta$, van toc goc $\\dot{\\theta}$, vi tri xe $x$, van toc xe $\\dot{x}$.</li>\n        <li>Ham lien thuoc: 5 tap mo doi xung <code>NB</code>, <code>NS</code>, <code>ZE</code>, <code>PS</code>, <code>PB</code>.</li>\n        <li>Chien luoc luat: Uu tien hang dau cho viec phuc hoi goc nghieng $\\theta$ khi lech lon; kich hoat khau phanh xe ve tam $x = 0$ khi goc nghieng nam trong nguong an toan.</li>\n        <li>Giai mo: Phuong phap trong tam (Centroid of Area), gioi han luc dieu khien $F \\in [-60\\text{N}, +60\\text{N}]$.</li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>1. Non-linear Mathematical Modeling</h4>\n      <p>Coupled Euler-Lagrange equations governing cart and pole dynamics parameterized via CAD assembly ($M = 1.20\\text{kg}, m = 0.20\\text{kg}, L = 0.50\\text{m}, J = 0.00417\\text{kg}\\cdot\\text{m}^2$).</p>\n      <h4>2. 16-Rule Mamdani FIS Structure</h4>\n      <p>4 continuous input states mapped across 5 linguistic sets via centroid defuzzification yielding continuous actuation force $F \\in [-60\\text{N}, +60\\text{N}]$.</p>\n    ",
    "guide_vi": "\n      <h4>1. Thuc thi mo phong Python + MuJoCo 3D</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Cai dat moi truong\ngit clone https://github.com/vinhdo281/Fuzzy-Controller.git\ncd Fuzzy-Controller\npip install mujoco scikit-fuzzy numpy matplotlib\n\n# Chay kiem chung giai thuat xuat bieu do\npython run_simulation_single_fuzzy.py\n\n# Mo visualizer 3D thoi gian thuc tren MuJoCo Viewer\npython run_mujoco_viewer.py</code></pre>\n      </div>\n\n      <h4>2. Thuc thi tren MATLAB / Simulink Simscape</h4>\n      <ol>\n        <li>Khoi dong MATLAB R2022b+, dat Current Folder vao thu muc du an.</li>\n        <li>Chay <code>fuzzy_config_16rules.m</code> de khoi tao he FIS trong Workspace.</li>\n        <li>Chay <code>full_pendulum_assem_DataFile3.m</code> nap thong so quan tinh CAD.</li>\n        <li>Mo <code>full_pendulum_assem.slx</code> va nhan Run (Solver: <code>ode15s</code>, step size 0.001s).</li>\n      </ol>\n    ",
    "guide_en": "\n      <h4>Execution Guide:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Fuzzy-Controller.git\ncd Fuzzy-Controller\npip install mujoco scikit-fuzzy numpy matplotlib\npython run_simulation_single_fuzzy.py\npython run_mujoco_viewer.py</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>So sanh thuc nghiem tren cung mo hinh vat ly:</h4>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Tieu chi danh gia</th>\n            <th style=\"padding:0.4rem;\">PID Tuyen Tinh</th>\n            <th style=\"padding:0.4rem;\">LQR Toi Uu</th>\n            <th style=\"padding:0.4rem;\">Proposed Mamdani 16 FIS</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\">Goc lech phuc hoi cuc dai</td><td>+/- 6.5 deg</td><td>+/- 8.2 deg</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">+/- 22.0 deg (+268%)</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Thoi gian xac lap (ts)</td><td>2.40 s</td><td>1.95 s</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">1.65 s</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Sai so vi tri xe tinh</td><td>Troi tu do</td><td>0.04 m</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">+/- 0.002 m (Zero Drift)</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Kha nang khang xung nhiễu</td><td>Kem</td><td>Trung binh</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">Chiu xung 35N</td></tr>\n        </tbody>\n      </table>\n    ",
    "results_en": "\n      <h4>Performance Benchmark:</h4>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Metric</th>\n            <th style=\"padding:0.4rem;\">Linear PID</th>\n            <th style=\"padding:0.4rem;\">Optimal LQR</th>\n            <th style=\"padding:0.4rem;\">Proposed Mamdani 16 FIS</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\">Max Recoverable Angle</td><td>6.5 deg</td><td>8.2 deg</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">22.0 deg</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Settling Time (ts)</td><td>2.40 s</td><td>1.95 s</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">1.65 s</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Cart Drift Error</td><td>Unbounded</td><td>0.04 m</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">+/- 0.002 m</td></tr>\n        </tbody>\n      </table>\n    ",
    "demo_vi": "\n      <h4>1. Do thi dap ung dong hoc goc nghieng 20 do (0.349 rad)</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"assets/images/posts/fuzzy-pendulum/06_simulation_response_20deg.png\" alt=\"Ket qua mo phong 20 do\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n\n      <h4>2. Vong lap dieu khien thoi gian thuc (Python MuJoCo):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>import mujoco, numpy as np\nfrom fuzzy_single_controller import SingleFuzzyController\n\nmodel = mujoco.MjModel.from_xml_path(\"full_pendulum_assem.xml\")\ndata = mujoco.MjData(model)\ncontroller = SingleFuzzyController()\ndata.qpos[1] = np.deg2rad(20.0) # Dat lech ban dau 20 do\n\nfor step in range(3000):\n    force = controller.compute_force(data.qpos[1], data.qvel[1], data.qpos[0], data.qvel[0])\n    data.ctrl[0] = np.clip(force, -60.0, 60.0)\n    mujoco.mj_step(model, data)</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Simulation Response & Control Loop:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"assets/images/posts/fuzzy-pendulum/06_simulation_response_20deg.png\" alt=\"Simulation Response 20 deg\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n      <div class=\"code-terminal\">\n        <pre><code>force = controller.compute_force(theta, dtheta, x, dx)\ndata.ctrl[0] = np.clip(force, -60.0, 60.0)\nmujoco.mj_step(model, data)</code></pre>\n      </div>\n    "
  },
  {
    "id": "cascade-pid",
    "category": "control",
    "category_vi": "Dieu Khien & Robotics",
    "category_en": "Control & Robotics",
    "badge": "CONTROL // DUAL-LOOP // SIMULINK & ESP32",
    "date": "08/2026",
    "github_url": "https://github.com/vinhdo281/Cascade-PID",
    "blog_url": null,
    "title_vi": "Bộ Điều Khiển Phân Tầng Cascade PID Cho Robot Hai Bánh Tự Cân Bằng",
    "title_en": "Dual-Loop Cascade PID Controller for Two-Wheeled Self-Balancing Robot",
    "short_desc_vi": "Báo cáo thiết kế cấu trúc điều khiển phân tầng hai vòng kín (Cascade Loop) phân tách dải tần số: Vòng trong điều khiển góc nghiêng (500Hz) và Vòng ngoài điều khiển vị trí tịnh tiến (50Hz), tối ưu cho triển khai trên ESP32 và động cơ BLDC FOC.",
    "short_desc_en": "Dual-loop cascade PID control architecture decoupling fast rotational dynamics (500Hz Inner Loop) from slow translational dynamics (50Hz Outer Loop), verified in Simulink and architected for ESP32 & SimpleFOC.",
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
        "label_vi": "Tần số vòng trong (Góc)",
        "label_en": "Inner Loop Rate",
        "value": "500 Hz"
      },
      {
        "label_vi": "Tần số vòng ngoài (Vị trí)",
        "label_en": "Outer Loop Rate",
        "value": "50 Hz"
      },
      {
        "label_vi": "Thời gian phục hồi xung lực",
        "label_en": "Impulse Recovery",
        "value": "0.75 s"
      },
      {
        "label_vi": "Kháng xung lực tối đa",
        "label_en": "Max Impulse Disturbance",
        "value": "20.0 N"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Robot hai banh tu can bang (TWSBR) yeu cau on dinh dong thoi ca goc nghieng $\\theta$ va toa do vi tri $x$. Su dung mot vong PID duy nhat khong the khong che vi tri xe. Giai phap su dung cau truc Cascade PID phan tach ro rang hai dai bang thong tan so:</p>\n      <ul>\n        <li><strong>Vong trong (Inner Loop - 500Hz):</strong> Dap ung dong hoc quay cuc nhanh, tao mo-men giu xe dung thang.</li>\n        <li><strong>Vong ngoai (Outer Loop - 50Hz):</strong> Chuyen doi sai so vi tri $e_x$ thanh goc nghieng muc tieu $\\theta_{ref}$ cho vong trong bam theo.</li>\n      </ul>\n    ",
    "overview_en": "\n      <h4>1. Technical Objective</h4>\n      <p>Decouple high-frequency attitude dynamics from low-frequency translational trajectory tracking via a dual-loop cascade control architecture, preventing positional drift under external disturbances.</p>\n    ",
    "architecture_vi": "\n      <h4>1. So do phan tang & Cong thuc toan hoc</h4>\n      <div class=\"code-terminal\">\n        <pre><code>x_ref ---> [ + ] ---> [ Outer PID (50Hz) ] ---> theta_ref ---> [ + ] ---> [ Inner PD (500Hz) ] ---> Torque ---> [ Plant ]\n             ^ -                                                 ^ -                                              |\n             |--- x_meas (Encoder)                               |--- theta_meas (IMU MPU6050) -------------------|</code></pre>\n      </div>\n\n      <h4>2. Phuong trinh dieu khien chi tiet</h4>\n      <ul>\n        <li><strong>Vong ngoai (Position Loop):</strong>\n          $$\\theta_{ref}(t) = K_{p,x} \\cdot e_x(t) + K_{i,x} \\int_0^t e_x(\\tau)d\\tau - K_{d,x} \\cdot \\dot{x}(t)$$\n          <em>Rang buoc an toan:</em> Gioi han $|\\theta_{ref}| \\le 15^\\circ$ ket hop Anti-Windup Back-Calculation.\n        </li>\n        <li><strong>Vong trong (Pitch Loop):</strong>\n          $$u(t) = K_{p,\\theta} \\cdot (\\theta_{ref} - \\theta) - K_{d,\\theta} \\cdot \\dot{\\theta}_{filt}$$\n          <em>Bo loc thong thap dao ham:</em> $\\dot{\\theta}_{filt}(s) = \\frac{N}{s + N} s \\theta(s)$ voi $N = 100\\text{ rad/s}$ nham triet tieu nhieu con quay hoi chuyen.\n        </li>\n      </ul>\n      <p>Tham so toi uu: $K_{p,\\theta} = 45.0, K_{d,\\theta} = 2.80$; $K_{p,x} = 0.85, K_{i,x} = 0.05, K_{d,x} = 1.20$.</p>\n    ",
    "architecture_en": "\n      <h4>Mathematical Formulation:</h4>\n      <p>Outer Loop: $\\theta_{ref} = K_{p,x} e_x + K_{i,x} \\int e_x dt - K_{d,x} \\dot{x}$ ($|\\theta_{ref}| \\le 15^\\circ$).</p>\n      <p>Inner Loop: $u = K_{p,\\theta} (\\theta_{ref} - \\theta) - K_{d,\\theta} \\dot{\\theta}_{filt}$ with 1st-order low-pass filter $N = 100\\text{ rad/s}$.</p>\n    ",
    "guide_vi": "\n      <h4>Thuc thi mo phong Simulink:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Cascade-PID.git\ncd Cascade-PID\nmatlab -r \"open('Cascade.slx')\"</code></pre>\n      </div>\n      <p>Cai dat Solver: Fixed-step <code>ode4</code>, step size 0.001s, chay 10s va quan sat dap ung Scope.</p>\n    ",
    "guide_en": "\n      <h4>Simulation Guide:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Cascade-PID.git\ncd Cascade-PID\nmatlab -r \"open('Cascade.slx')\"</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Ket qua kiem chung:</h4>\n      <ul>\n        <li>Bam vi tri buoc nhay 1.0m: Thoi gian xac lap $t_s = 1.40\\text{ s}$, sai so vi tri xac lap $0.00\\text{ cm}$.</li>\n        <li>Khang xung luc 20N (0.2s): Goc nghieng cuc dai $8.5^\\circ$, tro ve can bang thang dung sau <strong>0.75 giay</strong>.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Validation Metrics:</h4>\n      <ul>\n        <li>1.0m Step Tracking: $t_s = 1.40\\text{s}$, zero steady-state position error.</li>\n        <li>20N Impulse Rejection: Restores equilibrium within 0.75s.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Trich doan ma nguon FreeRTOS C++ (ESP32):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>// Inner Loop (Ngat Timer 500Hz - Core 0)\nvoid IRAM_ATTR onAngleLoopTimer() {\n    float error_theta = target_theta_ref - readIMUPitch();\n    float u_torque = Kp_theta * error_theta - Kd_theta * readIMUGyroY();\n    motorL.move(constrain(u_torque, -MAX_TORQUE, MAX_TORQUE));\n    motorR.move(constrain(u_torque, -MAX_TORQUE, MAX_TORQUE));\n}\n\n// Outer Loop (Task 50Hz - Core 1)\nvoid outerPositionTask(void *pvParameters) {\n    for (;;) {\n        float error_x = target_x - getWheelOdometry();\n        integral_x = constrain(integral_x + error_x * 0.02, -MAX_I, MAX_I);\n        float theta_ref = Kp_x * error_x + Ki_x * integral_x - Kd_x * getVelocity();\n        target_theta_ref = constrain(theta_ref, -15.0 * DEG_TO_RAD, 15.0 * DEG_TO_RAD);\n        vTaskDelay(pdMS_TO_TICKS(20));\n    }\n}</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>FreeRTOS Dual-Core Firmware Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>// Core 0: 500Hz Attitude PD Loop\nfloat u_torque = Kp_theta * (target_theta - pitch) - Kd_theta * gyroY;\n// Core 1: 50Hz Position PID Loop\ntarget_theta = constrain(Kp_x * e_x + Ki_x * int_x - Kd_x * dx, -MAX_TILT, MAX_TILT);</code></pre>\n      </div>\n    "
  },
  {
    "id": "bot1",
    "category": "control",
    "category_vi": "Dieu Khien & Robotics",
    "category_en": "Control & Robotics",
    "badge": "ROS 2 // HUMBLE // GAZEBO & NAV2",
    "date": "10/2025",
    "github_url": "https://github.com/vinhdo281/bot1",
    "blog_url": null,
    "title_vi": "Mô Phỏng Robot Di Động Bánh Vi Sai Trên Nền Tảng ROS 2 & Gazebo",
    "title_en": "ROS 2 Differential Drive Mobile Robot Simulation Stack",
    "short_desc_vi": "Báo cáo thiết kế package mô phỏng robot di động tự hành (AMR) trên nền tảng ROS 2 Humble và Gazebo: Mô hình hóa URDF/Xacro, tích hợp diff_drive_controller, cảm biến LiDAR 2D và cấu hình sẵn sàng cho Nav2 SLAM.",
    "short_desc_en": "Production-grade ROS 2 Humble differential drive mobile robot package featuring parametric URDF/Xacro kinematics, Gazebo physics simulation, ros2_control diff_drive, and 2D LiDAR ray tracing.",
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
        "label_vi": "Tần số xuất Odometry",
        "label_en": "Odometry Rate",
        "value": "100 Hz"
      },
      {
        "label_vi": "Cảm biến LiDAR 2D",
        "label_en": "2D LiDAR Telemetry",
        "value": "30 Hz / 360 deg"
      },
      {
        "label_vi": "Sai số trượt Odometry",
        "label_en": "Odometry Drift Error",
        "value": "< 1.8%"
      },
      {
        "label_vi": "Phiên bản ROS 2",
        "label_en": "ROS 2 Distribution",
        "value": "Humble Hawksbill"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Xay dung ban sao so (Digital Twin) hoan chinh cho robot di dong 2 banh chu dong vi sai tren ROS 2 Humble va Gazebo. He thong chuan hoa giao dien phan cung thong qua <code>ros2_control</code>, cho phep trien khai dong thoi tren mo phong va phan cung thuc ma khong can sua doi logic dieu huong.</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Deliver an open-source digital twin of a differential drive AMR on ROS 2 Humble and Gazebo, providing standard ros2_control interfaces for Nav2 autonomous mapping and navigation.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Dong hoc vi sai thuan - nghich</h4>\n      <p>Thuan: $v = \\frac{r}{2}(\\omega_R + \\omega_L), \\omega = \\frac{r}{L}(\\omega_R - \\omega_L)$. Nghich: $\\omega_R = \\frac{2v + \\omega L}{2r}, \\omega_L = \\frac{2v - \\omega L}{2r}$. Voi $r = 0.033\\text{ m}, L = 0.160\\text{ m}$.</p>\n      <h4>2. Cay toa do TF:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>map ---> odom ---> base_footprint ---> base_link ---> [left_wheel, right_wheel, caster, laser_frame]</code></pre>\n      </div>\n    ",
    "architecture_en": "\n      <h4>Kinematics & Frames:</h4>\n      <p>Differential equations with $r = 0.033\\text{m}, L = 0.160\\text{m}$. Coordinate transform: <code>map -> odom -> base_footprint -> base_link -> laser_frame</code>.</p>\n    ",
    "guide_vi": "\n      <h4>Cai dat & Thuc thi tren Ubuntu 22.04 LTS:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Build package\nmkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src\ngit clone https://github.com/vinhdo281/bot1.git\ncd ~/ros2_ws\ncolcon build --symlink-install --packages-select bot1\nsource install/setup.bash\n\n# Khoi chay mo phong Gazebo 3D\nros2 launch bot1 launch_sim.launch.py\n\n# Dieu khien bang ban phim o terminal khac:\nros2 run teleop_twist_keyboard teleop_twist_keyboard</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Build & Run:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>cd ~/ros2_ws/src && git clone https://github.com/vinhdo281/bot1.git\ncd ~/ros2_ws && colcon build --symlink-install --packages-select bot1\nsource install/setup.bash\nros2 launch bot1 launch_sim.launch.py</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Ket qua do dac:</h4>\n      <ul>\n        <li>Tan so Odometry: <strong>100 Hz</strong>, do tre bus duoi 1.5ms.</li>\n        <li>Tan so LiDAR 2D: <strong>30 Hz</strong>, tam do $0.15\\text{ m} - 12.0\\text{ m}$.</li>\n        <li>Sai so khep kin quy dao (Closed-loop Drift): <strong>&lt; 1.8%</strong> tren hanh trinh 2m x 2m.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>100 Hz odometry stream, 30 Hz LiDAR scan rate, &lt; 1.8% closed-loop positional drift.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Trich doan khoi tao launch file (launch_sim.launch.py):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>rsp = IncludeLaunchDescription(PythonLaunchDescriptionSource([\n    os.path.join(get_package_share_directory('bot1'), 'launch', 'rsp.launch.py')\n]), launch_arguments={'use_sim_time': 'true'}.items())\n\ngazebo = IncludeLaunchDescription(PythonLaunchDescriptionSource([\n    os.path.join(get_package_share_directory('gazebo_ros'), 'launch', 'gazebo.launch.py')\n]))\n\nspawn_entity = Node(package='gazebo_ros', executable='spawn_entity.py',\n                    arguments=['-topic', 'robot_description', '-entity', 'bot1_robot'],\n                    output='screen')</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Launch Script Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Robot State Publisher & Gazebo Spawner Integration\nspawn_entity = Node(package='gazebo_ros', executable='spawn_entity.py',\n                    arguments=['-topic', 'robot_description', '-entity', 'bot1_robot'])</code></pre>\n      </div>\n    "
  },
  {
    "id": "carcounter-yolo",
    "category": "vision",
    "category_vi": "Thi Giac May Tinh & AI",
    "category_en": "Computer Vision & AI",
    "badge": "VISION // YOLO11 // KALMAN SORT",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/CarCounterYOLO",
    "blog_url": null,
    "title_vi": "Hệ Thống Giám Sát, Định Danh & Đếm Phương Tiện Giao Thông Thời Gian Thực",
    "title_en": "Real-time Highway Vehicle Tracking & Counting System",
    "short_desc_vi": "Báo cáo xây dựng pipeline thị giác máy tính giám sát lưu lượng giao thông: Phát hiện phương tiện bằng mạng YOLOv11/v8, duy trì định danh Track ID bằng bộ lọc Kalman SORT và thuật toán Hungary, đếm chính xác qua vạch ảo.",
    "short_desc_en": "Multi-class highway vehicle detection, persistent ID tracking, and virtual line counting system combining Ultralytics YOLOv11 with an 8-state Kalman SORT tracker at 60 FPS.",
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
        "label_en": "Inference Throughput",
        "value": "55-60 FPS"
      },
      {
        "label_vi": "Độ chính xác đếm xe",
        "label_en": "Counting Accuracy",
        "value": "95.2%"
      },
      {
        "label_vi": "Vector trạng thái Kalman",
        "label_en": "State Space",
        "value": "8-DOF Vector"
      },
      {
        "label_vi": "Tăng tốc phần cứng",
        "label_en": "Hardware Acceleration",
        "value": "CUDA RTX Enabled"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Giai quyet bai toan thong ke luu luong xe tren cao toc tu camera quan sat: Phat hien da lop xe (o to, xe tai, xe buyt, xe may), gan dinh danh ID lien tuc de khong dem trung lap khi xe chuyen dong nhanh hoac bi che khuat tam thoi.</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Automated highway traffic stream monitoring: Multi-class detection, persistent tracking under occlusion, and virtual boundary counting without duplicate counts.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Thuat toan SORT Tracker & Bo loc Kalman 8 trang thai:</h4>\n      <p>Vector trang thai: $\\mathbf{x} = [u, v, s, r, \\dot{u}, \\dot{v}, \\dot{s}, \\dot{r}]^T$ (toa do tam, dien tich scale, ti le khung hinh va cac dao ham van toc). Thuat toan Hungary toi uu hoa ma tran chi phi IoU de ghep cap bounding box giua hai khung hinh lien tiep.</p>\n\n      <h4>2. Kiem tra cat vach ao (Virtual Line Crossing):</h4>\n      <p>Xac dinh giao diem hinh hoc giua doan dich chuyen trong tam phuong tien $P_1P_2$ va doan thang ao $AB$ thong qua phep thu dau tich huong (Orientation Test):</p>\n      $$\\text{Cross}(P_1, P_2, A) \\times \\text{Cross}(P_1, P_2, B) < 0 \\quad \\text{va} \\quad \\text{Cross}(A, B, P_1) \\times \\text{Cross}(A, B, P_2) < 0$$\n    ",
    "architecture_en": "\n      <h4>8-State Kalman SORT & Crossing Mathematics:</h4>\n      <p>State vector $\\mathbf{x} = [u, v, s, r, \\dot{u}, \\dot{v}, \\dot{s}, \\dot{r}]^T$ matched via IoU Hungarian association. Line crossing evaluated via 2D vector cross-product orientation test.</p>\n    ",
    "guide_vi": "\n      <h4>Cai dat & Chay chuong trinh:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/CarCounterYOLO.git\ncd CarCounterYOLO\npip install ultralytics opencv-python cvzone numpy filterpy\npython main</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Setup & Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/CarCounterYOLO.git\ncd CarCounterYOLO\npip install ultralytics opencv-python cvzone numpy filterpy\npython main</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>So lieu thuc nghiem (Video cao toc 1080p):</h4>\n      <ul>\n        <li>Toc do xu ly: <strong>55-60 FPS</strong> tren GPU NVIDIA RTX 3060/4060; ~28 FPS tren CPU.</li>\n        <li>Do chinh xac dem: <strong>95.2%</strong> (124/130 luot phuong tien).</li>\n        <li>Duy tri Track ID on dinh trong 20 khung hinh khi bi che khuat (<code>max_age = 20</code>).</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>55-60 FPS on NVIDIA RTX GPU; 95.2% counting accuracy across dense traffic feeds.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>1. Hinh anh nhan dien va dem xe thuc te:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"https://github.com/user-attachments/assets/e6613b97-6b2e-4efb-a40f-ec9dfe7336d1\" alt=\"Car Counter YOLO Demo\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n\n      <h4>2. Doan ma cap nhat Tracker trong file main:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>resultsTracker = tracker.update(detections)\nfor res in resultsTracker:\n    x1, y1, x2, y2, Id = res\n    cx, cy = int((x1 + x2) / 2), int((y1 + y2) / 2)\n    if limits[0] < cx < limits[2] and limits[1] - 15 < cy < limits[1] + 15:\n        if totalCount.count(Id) == 0:\n            totalCount.append(Id)</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Detection Screenshot & Tracking Snippet:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"https://github.com/user-attachments/assets/e6613b97-6b2e-4efb-a40f-ec9dfe7336d1\" alt=\"Car Counter YOLO Demo\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n    "
  },
  {
    "id": "volumn-hand-control",
    "category": "vision",
    "category_vi": "Thi Giac May Tinh & AI",
    "category_en": "Computer Vision & AI",
    "badge": "HCI // MEDIAPIPE // AUDIO PYCAW",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/VolumnHandControl",
    "blog_url": null,
    "title_vi": "Giao Diện Điều Khiển Âm Lượng Hệ Thống Không Tiếp Xúc Bằng Cử Chỉ Tay",
    "title_en": "Touchless Hand Gesture System Volume Controller",
    "short_desc_vi": "Báo cáo xây dựng hệ thống tương tác người - máy không chạm (Touchless HCI): Sử dụng MediaPipe Hands trích xuất 21 điểm mốc bàn tay, tích hợp bộ lọc làm mịn EMA và giao tiếp trực tiếp Windows Core Audio API qua PyCaw.",
    "short_desc_en": "Touchless Human-Computer Interaction interface mapping fingertip Euclidean distances to system master volume using MediaPipe Hands, EMA filtering, and Windows Core Audio API.",
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
        "label_vi": "Độ trễ phản hồi",
        "label_en": "Response Latency",
        "value": "< 18 ms"
      },
      {
        "label_vi": "Tốc độ khung hình",
        "label_en": "Frame Rate",
        "value": "60 FPS (720p)"
      },
      {
        "label_vi": "Dải điều chỉnh âm lượng",
        "label_en": "Volume Range",
        "value": "0 - 100% (-65 dB -> 0 dB)"
      },
      {
        "label_vi": "Bộ lọc làm mịn",
        "label_en": "Filter Model",
        "value": "EMA (alpha = 0.35)"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Cung cap giao dien dieu khien am luong he thong khong can tiep xuc vat ly, phu hop cho moi truong phong thi nghiem hoac khu vuc thao tac can vo trung thong qua webcam tieu chuan.</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Hygienic, touchless master audio volume control mapping 3D pinch gesture telemetry to OS audio gain without physical hardware contact.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Co che thuat toan</h4>\n      <ul>\n        <li>Diem moc: Ngon cai (#4) va ngon tro (#8). Khoang cach Euclid: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.</li>\n        <li>Bo loc thong thap Exponential Moving Average: $d_{filt}[k] = \\alpha d[k] + (1-\\alpha)d_{filt}[k-1]$ voi $\\alpha = 0.35$.</li>\n        <li>Noi suy tuyen tinh: Anh xa d [50px, 280px] sang muc am luong [-65.0 dB, 0.0 dB] qua giao tiep <code>IAudioEndpointVolume</code>.</li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>Kinematics & Audio Interfacing:</h4>\n      <p>Computes Euclidean distance between landmarks #4 and #8, applies EMA smoothing, and updates Windows Core Audio endpoint via PyCaw.</p>\n    ",
    "guide_vi": "\n      <h4>Cai dat & Thuc thi:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/VolumnHandControl.git\ncd VolumnHandControl\npip install opencv-python mediapipe numpy pycaw comtypes\npython VolumnHandControl</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>pip install opencv-python mediapipe numpy pycaw comtypes\npython VolumnHandControl</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Ket qua do dac:</h4>\n      <ul>\n        <li>Do tre phan hoi: <strong>&lt; 18 ms</strong>.</li>\n        <li>Toc do khung hinh: <strong>55-60 FPS</strong>.</li>\n        <li>Bo loc EMA loai bo <strong>92%</strong> rung lac bien do nho, dam bao am thanh bien thien muot ma.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>&lt; 18 ms latency, 60 FPS, 92% micro-tremor suppression via EMA filtering.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Doan ma tinh toan khoang cach va cap nhat am luong:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>smooth_len = alpha * math.hypot(x2 - x1, y2 - y1) + (1 - alpha) * smooth_len\nvol = np.interp(smooth_len, [50, 280], [minVol, maxVol])\nvolume.SetMasterVolumeLevel(vol, None)</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Control Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>vol = np.interp(smooth_len, [50, 280], [minVol, maxVol])\nvolume.SetMasterVolumeLevel(vol, None)</code></pre>\n      </div>\n    "
  },
  {
    "id": "finger-counter",
    "category": "vision",
    "category_vi": "Thi Giac May Tinh & AI",
    "category_en": "Computer Vision & AI",
    "badge": "VISION // 3D LANDMARKS // OPENCV",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/FingerCounter",
    "blog_url": null,
    "title_vi": "Hệ Thống Nhận Dạng Tư Thế & Đếm Số Ngón Tay Thời Gian Thực",
    "title_en": "Real-Time Hand Landmark Estimation & Finger Counter",
    "short_desc_vi": "Báo cáo xây dựng hệ thống nhận diện cử chỉ bàn tay thời gian thực: Khai thác đồ thị 21 điểm mốc MediaPipe, phân biệt tự động tay Trái / Phải và đếm số lượng ngón tay mở từ 0 đến 5 với độ trễ thấp.",
    "short_desc_en": "Real-time hand gesture analysis leveraging MediaPipe 21-landmark topological graph to automatically classify hand orientation and count open fingers from 0 to 5.",
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
        "label_vi": "Độ trễ xử lý mỗi khung hình",
        "label_en": "Processing Latency",
        "value": "~14 ms"
      },
      {
        "label_vi": "Độ chính xác đếm ngón",
        "label_en": "Recognition Accuracy",
        "value": "98.5%"
      },
      {
        "label_vi": "Tốc độ khung hình",
        "label_en": "Frame Rate",
        "value": "60+ FPS"
      },
      {
        "label_vi": "Hướng bàn tay",
        "label_en": "Hand Orientation",
        "value": "Tu Dong (Left/Right)"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Nhan dien chinh xac so luong ngon tay dang mo tren luong video webcam, ho tro giao dien cu chi va tien xu ly cho he thong ngon ngu ky hieu (Sign Language Recognition).</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Accurate topological classification of finger state from single-camera feeds for sign language preprocessing and gesture-based human-machine interfaces.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Logic giai ma khong gian 3D</h4>\n      <ul>\n        <li>Phan biet tay Trai / Phai: Kiem tra quan he hoanh do $X_{MCP5} > X_{MCP17}$.</li>\n        <li>4 ngon dai: Trang thai MO khi $Y_{\\text{Tip}} < Y_{\\text{PIP}}$ (truc tung Y huong xuong).</li>\n        <li>Ngon cai: Kiem tra $X_{\\text{Tip4}} > X_{\\text{IP3}}$ (tay Phai) hoac $X_{\\text{Tip4}} < X_{\\text{IP3}}$ (tay Trai).</li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>Kinematic State Rules:</h4>\n      <p>Handedness evaluated via lateral position of $MCP_5$ vs $MCP_{17}$. 4 long fingers classified open when $Y_{\\text{Tip}} < Y_{\\text{PIP}}$; thumb evaluated along lateral axis.</p>\n    ",
    "guide_vi": "\n      <h4>Cai dat & Chay:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/FingerCounter.git\ncd FingerCounter\npip install opencv-python mediapipe numpy\npython main</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>pip install opencv-python mediapipe numpy\npython main</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Ket qua do dac:</h4>\n      <ul>\n        <li>Do chinh xac nhan dien: <strong>> 98.5%</strong> trong khoang cach $0.3\\text{ m} - 1.5\\text{ m}$.</li>\n        <li>Do tre suy luan: <strong>~14 ms / frame</strong> (> 60 FPS).</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>98.5% accuracy across standard ranges with ~14ms per-frame latency.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Doan ma phan loai trang thai ngon:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>isLeft = lmList[5][1] > lmList[17][1]\nfingers = [1 if (lmList[4][1] > lmList[3][1] if isLeft else lmList[4][1] < lmList[3][1]) else 0]\nfor id in [8, 12, 16, 20]:\n    fingers.append(1 if lmList[id][2] < lmList[id - 2][2] else 0)\ntotalFingers = fingers.count(1)</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Classification Code Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>fingers = [1 if (lmList[4][1] > lmList[3][1] if isLeft else lmList[4][1] < lmList[3][1]) else 0]\nfor id in [8, 12, 16, 20]: fingers.append(1 if lmList[id][2] < lmList[id - 2][2] else 0)</code></pre>\n      </div>\n    "
  },
  {
    "id": "k-thuat-lap-trinh",
    "category": "vision",
    "category_vi": "Thi Giac May Tinh & AI",
    "category_en": "Computer Vision & AI",
    "badge": "AI // PYTORCH // IMAGE PROCESSING",
    "date": "01/2026",
    "github_url": "https://github.com/vinhdo281/K-thu-t-l-p-tr-nh",
    "blog_url": null,
    "title_vi": "Xử Lý Ảnh Số & Phân Loại Đối Tượng Bằng Mạng Nơ-ron Tích Chập PyTorch",
    "title_en": "Digital Image Processing & CNN Object Classification",
    "short_desc_vi": "Báo cáo đề tài thị giác máy tính tại ĐHBK Hà Nội: Kết hợp chuỗi tiền xử lý ảnh không gian (lọc Gaussian, phân ngưỡng Otsu, Canny) với mạng nơ-ron học sâu tích chập PyTorch (.pt) cho bài toán phân loại đối tượng.",
    "short_desc_en": "Coupled computer vision framework at HUST combining spatial image filtering (Gaussian, Otsu, Canny) with deep PyTorch convolutional neural networks.",
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
        "label_vi": "Độ chính xác kiểm thử",
        "label_en": "Validation Accuracy",
        "value": "92.8%"
      },
      {
        "label_vi": "Thời gian suy luận CPU",
        "label_en": "CPU Inference Latency",
        "value": "< 32 ms"
      },
      {
        "label_vi": "Định dạng trọng số",
        "label_en": "Model Checkpoint",
        "value": "PyTorch (modnew.pt)"
      },
      {
        "label_vi": "Đơn vị thực hiện",
        "label_en": "Academic Unit",
        "value": "DHBK Ha Noi (HUST)"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Nghien cuu va danh gia hieu qua cua viec ket hop cac phep bien doi hinh thai hoc anh co dien voi mang no-ron tich chap (CNN) de nang cao do chinh xac va giam nhieu truoc khi dua vao suy luan hoc sau.</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Evaluate hybrid vision pipelines coupling classical spatial domain filtering with deep convolutional networks for robust feature classification.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Pipeline 2 tang xu ly</h4>\n      <ul>\n        <li><strong>Tang 1 (XLA Co dien):</strong> Loc Gaussian 2D khu nhieu hat min, can bang luoc do Histogram, phan nguong tu dong Otsu.</li>\n        <li><strong>Tang 2 (Hoc sau PyTorch):</strong> Mang CNN 3 tang tich chap (Conv2D -> BatchNorm -> ReLU -> MaxPool), AdaptiveAvgPool2D, lop Linear co Dropout ($p=0.4$) va Softmax.</li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>Two-Stage Architecture:</h4>\n      <p>Stage 1: Spatial 2D Gaussian blur and Otsu thresholding. Stage 2: 3-block CNN with Batch Normalization, Dropout ($p=0.4$), and Cross-Entropy loss.</p>\n    ",
    "guide_vi": "\n      <h4>Cai dat & Nap mo hinh:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/K-thu-t-l-p-tr-nh.git\ncd K-thu-t-l-p-tr-nh\npip install torch torchvision opencv-python numpy matplotlib\npython -c \"import torch; print(torch.load('modnew.pt', map_location='cpu'))\"</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Setup:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>pip install torch torchvision opencv-python numpy matplotlib\npython -c \"import torch; print(torch.load('modnew.pt', map_location='cpu'))\"</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Ket qua do dac:</h4>\n      <ul>\n        <li>Do chinh xac tap kiem thu: <strong>92.8%</strong>.</li>\n        <li>Do tre suy luan: <strong>31.5 ms</strong> tren CPU; <strong>6.2 ms</strong> tren GPU CUDA.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>92.8% validation accuracy; 31.5 ms CPU latency, 6.2 ms on CUDA GPU.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Doan ma thuc thi suy luan anh:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>model = torch.load('modnew.pt', map_location='cpu')\nmodel.eval()\nwith torch.no_grad():\n    output = model(input_tensor)\n    pred_class = torch.argmax(torch.softmax(output, dim=1), dim=1).item()</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>PyTorch Evaluation Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>model = torch.load('modnew.pt', map_location='cpu')\nmodel.eval()\noutput = model(input_tensor)</code></pre>\n      </div>\n    "
  },
  {
    "id": "do-line",
    "category": "hardware",
    "category_vi": "He Thong Nhung & Phan Cung",
    "category_en": "Embedded & Hardware",
    "badge": "HARDWARE // FSM & PID // ARDUINO",
    "date": "07/2025",
    "github_url": "https://github.com/vinhdo281/Do-Line",
    "blog_url": null,
    "title_vi": "Thiết Kế Hệ Thống Điều Khiển Robot Dò Line Tự Hành Tốc Độ Cao",
    "title_en": "Autonomous High-Speed Line Follower Robot System",
    "short_desc_vi": "Báo cáo chế tạo phần cứng và lập trình vi điều khiển cho Robot dò line thi đấu tốc độ cao: Tích hợp mảng 5 cảm biến hồng ngoại IR, mạch công suất cầu H L298N, màn hình OLED I2C và thuật toán máy trạng thái hữu hạn FSM.",
    "short_desc_en": "Hardware design and embedded firmware for an autonomous racing line follower robot, featuring a 5-channel IR optical array, L298N motor driver, OLED telemetry, and FSM control logic.",
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
        "label_vi": "Vận tốc hành trình tối đa",
        "label_en": "Max Cruising Speed",
        "value": "0.85 m/s"
      },
      {
        "label_vi": "Mảng cảm biến quang học",
        "label_en": "Sensor Array",
        "value": "5 Kênh Hong Ngoai (IR)"
      },
      {
        "label_vi": "Giao diện Telemetry I2C",
        "label_en": "Telemetry Display",
        "value": "OLED SSD1306 128x64"
      },
      {
        "label_vi": "Chu kỳ điều khiển",
        "label_en": "Loop Frequency",
        "value": "100 Hz"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Che tao xe robot tu hanh bam line toc do cao tren sa ban thi dau: Xu ly on dinh cac goc cua gat 90 do, nga tu cat ngang va vach dung dich ma khong bi mat line.</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>High-speed autonomous line follower robot engineered for competition courses, handling 90-degree corners, cross-intersections, and deceleration zones.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Tinh sai so vi tri theo trong so mang cam bien (Weighted Centroid)</h4>\n      $$\\text{Error} = \\frac{-2 S_1 - S_2 + S_4 + 2 S_5}{S_1 + S_2 + S_3 + S_4 + S_5}$$\n      <p>Hieu chinh van toc dong co vi sai:</p>\n      $$PWM_L = V_{base} + (K_p e + K_d \\Delta e), \\quad PWM_R = V_{base} - (K_p e + K_d \\Delta e)$$\n\n      <h4>2. Bang trang thai Finite State Machine (FSM):</h4>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Trang thai</th>\n            <th style=\"padding:0.4rem;\">Dieu kien kich hoat</th>\n            <th style=\"padding:0.4rem;\">Hanh vi dong co</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\">START</td><td>Nhan nut khoi dong</td><td>Can chinh nguong, dem lui 3s</td></tr>\n          <tr><td style=\"padding:0.4rem;\">STRAIGHT1</td><td>S3 = 1</td><td>Chay thang toc do cao (PWM 220)</td></tr>\n          <tr><td style=\"padding:0.4rem;\">TURN_90</td><td>S1, S2, S3 = 1</td><td>Dao chieu banh trong, tang toc banh ngoai</td></tr>\n          <tr><td style=\"padding:0.4rem;\">CROSSING</td><td>5 cam bien cung = 1</td><td>Giu nguyen huong lai vuot qua vach</td></tr>\n          <tr><td style=\"padding:0.4rem;\">STOP</td><td>Vach dung cuoi san</td><td>Ngan mach ca 2 dong co phanh gap</td></tr>\n        </tbody>\n      </table>\n      <p>Phan bo chan vi dieu khien: S1-S5 (D2-D6), L298N (D10-D13), OLED SSD1306 (A4 SDA, A5 SCL).</p>\n    ",
    "architecture_en": "\n      <h4>Weighted Centroid & FSM:</h4>\n      <p>Error: $\\text{Error} = \\frac{-2 S_1 - S_2 + S_4 + 2 S_5}{\\sum S_i}$. FSM states: <code>START -> STRAIGHT1 -> TURN_90 -> CROSSING -> STOP</code> with reverse-torque dynamic braking.</p>\n    ",
    "guide_vi": "\n      <h4>Nap ma nguon (Arduino IDE):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Do-Line.git\n# Mo SampleCode1 trong Arduino IDE\n# Cai dat thu vien Adafruit SSD1306 & Adafruit GFX\n# Chon Board Arduino Nano (ATmega328P) -> Upload (Ctrl+U)</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Flashing Firmware:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Do-Line.git\n# Open SampleCode1 in Arduino IDE -> Upload to Arduino Nano</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Ket qua do dac phan cung:</h4>\n      <ul>\n        <li>Van toc bam line toi da: <strong>0.85 m/s</strong> (3.06 km/h).</li>\n        <li>Kha nang om cua 90 do: Khong bi vang khoi quy dao nho co che dao chieu banh trong.</li>\n        <li>Thoi gian hoan thanh sa ban 15m: <strong>~18.2 giay</strong>.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Hardware Verification:</h4>\n      <ul>\n        <li>0.85 m/s top cruising speed with reliable 90-degree cornering.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>1. Hinh anh phan cung robot thuc te:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"https://github.com/user-attachments/assets/35a75085-d8b3-47a1-9ed1-f26646a446c5\" alt=\"Robot Do-Line Hardware\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n\n      <h4>2. Trich doan ma nguon FSM trong SampleCode1:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>switch (currentState) {\n  case STRAIGHT1:\n    analogWrite(IN1, 200); analogWrite(IN3, 200);\n    if (s1 && s2 && s3) currentState = TURN1;\n    break;\n  case TURN1:\n    digitalWrite(IN1, LOW); analogWrite(IN2, 150); // Dao chieu banh trong\n    analogWrite(IN3, 230); digitalWrite(IN4, LOW);\n    if (s3 && !s1) currentState = STRAIGHT1;\n    break;\n}</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Hardware Prototype & FSM Snippet:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"https://github.com/user-attachments/assets/35a75085-d8b3-47a1-9ed1-f26646a446c5\" alt=\"Robot Do-Line Hardware\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n    "
  },
  {
    "id": "xe-ua-2",
    "category": "hardware",
    "category_vi": "He Thong Nhung & Phan Cung",
    "category_en": "Embedded & Hardware",
    "badge": "EMBEDDED // MICRO:BIT // MAKECODE",
    "date": "09/2021",
    "github_url": "https://github.com/vinhdo281/xe-ua-2",
    "blog_url": null,
    "title_vi": "Hệ Thống Điều Khiển Xe Đua STEM Robotics Trên Vi Điều Khiển BBC Micro:bit",
    "title_en": "BBC Micro:bit STEM Racing Vehicle & Game Engine",
    "short_desc_vi": "Báo cáo phát triển phần mềm nhúng và thư viện mở rộng cho BBC micro:bit (ARM Cortex-M4): Lập trình trò chơi né vật cản trên ma trận LED 5x5, cơ chế ngắt nút bấm vật lý và đóng gói MakeCode Extension điều khiển xe 2 bánh.",
    "short_desc_en": "Embedded software package and MakeCode extension for BBC micro:bit (ARM Cortex-M4), combining 5x5 LED sprite collision game physics with motor driver expansion libraries.",
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
        "label_en": "MCU Architecture",
        "value": "Nordic nRF52833 (ARM Cortex-M4)"
      },
      {
        "label_vi": "Giao diện hiển thị",
        "label_en": "Display Matrix",
        "value": "Ma Tran LED 5x5 (30 FPS)"
      },
      {
        "label_vi": "Ngôn ngữ phát triển",
        "label_en": "Language",
        "value": "Static TypeScript / MakeCode"
      },
      {
        "label_vi": "Định dạng đóng gói",
        "label_en": "Packaging Format",
        "value": "MakeCode PXT Extension"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Xay dung ung dung hoc tap STEM Robotics tren vi dieu khien 32-bit BBC micro:bit, ket hop logic tro choi do hoa ma tran LED voi thu vien mo rong dieu khien dong co DC cho mo hinh xe robot hai banh.</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Educational STEM embedded robotics package deployed on ARM Cortex-M4 micro:bit, coupling 5x5 LED sprite game dynamics with chassis driver extensions.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Kien truc huong su kien</h4>\n      <ul>\n        <li>Ngat phan cung: Bat su kien nhan nut Button A va B qua API <code>input.onButtonPressed</code>.</li>\n        <li>Game Loop: Quan ly sprite nguoi choi va chuong ngai vat roi tu dong, kiem tra va cham (Collision Detection) tren luoi toa do 5x5.</li>\n        <li>Cau hinh mo rong <code>pxt.json</code> cho phep tich hop vao moi truong MakeCode IDE.</li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>Event-Driven Architecture:</h4>\n      <p>Hardware button ISR handlers managing 5x5 coordinate sprite physics with collision trapping in Microsoft PXT runtime.</p>\n    ",
    "guide_vi": "\n      <h4>Su dung tren trinh bien dich MakeCode:</h4>\n      <ol>\n        <li>Truy cap: <a href=\"https://makecode.microbit.org/\" target=\"_blank\" style=\"color:var(--accent-cyan);\">makecode.microbit.org</a>.</li>\n        <li>Chon Extensions -> Dan URL: <code>https://github.com/vinhdo281/xe-ua-2</code>.</li>\n        <li>Chay mo phong truc tiep hoac tai file <code>.hex</code> nap vao board qua USB.</li>\n      </ol>\n    ",
    "guide_en": "\n      <h4>Usage Instructions:</h4>\n      <p>Import extension URL <code>https://github.com/vinhdo281/xe-ua-2</code> into makecode.microbit.org and simulate or flash .hex via USB.</p>\n    ",
    "results_vi": "\n      <h4>Ket qua do dac:</h4>\n      <ul>\n        <li>Toc do hien thi muot ma: <strong>30 FPS</strong> tren ma tran LED.</li>\n        <li>Dung luong firmware: <strong>&lt; 128 KB Flash</strong>, <strong>&lt; 16 KB RAM</strong>.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>Fluid 30 FPS display; memory usage &lt; 128KB Flash, &lt; 16KB RAM.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Doan ma dieu khien TypeScript (main.ts):</h4>\n      <div class=\"code-terminal\">\n        <pre><code>input.onButtonPressed(Button.A, () => {\n    if (player_car.get(LedSpriteProperty.X) > 0) player_car.change(LedSpriteProperty.X, -1)\n})\ninput.onButtonPressed(Button.B, () => {\n    if (player_car.get(LedSpriteProperty.X) < 4) player_car.change(LedSpriteProperty.X, 1)\n})</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>TypeScript Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>input.onButtonPressed(Button.A, () => {\n    if (player_car.get(LedSpriteProperty.X) > 0) player_car.change(LedSpriteProperty.X, -1)\n})</code></pre>\n      </div>\n    "
  },
  {
    "id": "checking-weather",
    "category": "software",
    "category_vi": "Phan Mem & Ung Dung",
    "category_en": "Software & APIs",
    "badge": "DESKTOP // PYQT5 // REST API",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/Checking-Weather-using-API",
    "blog_url": null,
    "title_vi": "Ứng Dụng Desktop Tra Cứu Khí Tượng Toàn Cầu Giao Diện PyQt5",
    "title_en": "Global Meteorological Telemetry Desktop Application",
    "short_desc_vi": "Báo cáo phát triển ứng dụng máy tính để bàn (Desktop GUI) bằng Python và PyQt5: Kết nối trực tiếp OpenWeatherMap RESTful API để hiển thị các chỉ số khí tượng thời gian thực theo cấu trúc Model-View-Controller.",
    "short_desc_en": "Desktop GUI telemetry application engineered with Python and PyQt5, fetching real-time global weather indicators from OpenWeatherMap REST API under an MVC pattern.",
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
        "label_en": "Query Round-trip",
        "value": "< 220 ms"
      },
      {
        "label_vi": "Framework giao diện",
        "label_en": "UI Framework",
        "value": "PyQt5 (Qt Widgets)"
      },
      {
        "label_vi": "Nguồn dữ liệu khí tượng",
        "label_en": "API Provider",
        "value": "OpenWeatherMap REST API"
      },
      {
        "label_vi": "Kiến trúc phần mềm",
        "label_en": "Pattern",
        "value": "Model-View-Controller (MVC)"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Xay dung ung dung Desktop tra cuu thoi tiet doc lap, giao dien hien dai, toi uu hoa bo nho RAM duoi 35MB va phan hoi nhanh hon trinh duyet web.</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Native lightweight desktop weather utility delivering low-latency atmospheric queries (&lt; 220ms) with minimal memory footprint compared to browser engines.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Kien truc Model-View-Controller (MVC)</h4>\n      <ul>\n        <li><strong>View:</strong> He thong bo cuc <code>QVBoxLayout</code>, <code>QLabel</code>, <code>QLineEdit</code>, <code>QPushButton</code>.</li>\n        <li><strong>Controller:</strong> Bat su kien click, gui HTTP GET request toi endpoint <code>/data/2.5/weather</code>.</li>\n        <li><strong>Model:</strong> Phap giai JSON trich xuat nhiet do, do am, ap suat va mo ta thoi tiet, bat loi mang qua HTTPError.</li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>MVC Architecture:</h4>\n      <p>Event-driven Qt View coupled with asynchronous RESTful controller parsing JSON payload schemas with HTTP fault handling.</p>\n    ",
    "guide_vi": "\n      <h4>Cai dat & Chay ung dung:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Checking-Weather-using-API.git\ncd Checking-Weather-using-API\npip install PyQt5 requests\n# Dien API Key vao file main va khoi chay:\npython main</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>pip install PyQt5 requests\npython main</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Ket qua do dac:</h4>\n      <ul>\n        <li>Thoi gian phan hoi truy van: <strong>&lt; 220 ms</strong>.</li>\n        <li>Muc tieu thu RAM: <strong>&lt; 35 MB</strong>, khoi dong duoi 0.5 giay.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>&lt; 220 ms query round-trip; &lt; 35 MB memory footprint.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Trich doan ma goi API trong main:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>url = f\"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric\"\nres = requests.get(url, timeout=5)\nif res.status_code == 200:\n    data = res.json()\n    self.temp_label.setText(f\"{data['main']['temp']} °C\")\n    self.desc_label.setText(data['weather'][0]['description'].capitalize())</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>API Request Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>res = requests.get(f\"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric\")\nif res.status_code == 200:\n    self.temp_label.setText(f\"{res.json()['main']['temp']} °C\")</code></pre>\n      </div>\n    "
  },
  {
    "id": "python-collection",
    "category": "software",
    "category_vi": "Phan Mem & Ung Dung",
    "category_en": "Software & APIs",
    "badge": "ALGORITHMS // TOOLS // PYTHON SUITE",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/Python",
    "blog_url": null,
    "title_vi": "Tuyển Tập Thuật Toán Ứng Dụng & Công Cụ Phần Mềm Bằng Python",
    "title_en": "Python Algorithmic Tools & Application Suite",
    "short_desc_vi": "Báo cáo xây dựng bộ sưu tập 5 công cụ phần mềm độc lập bằng Python thuần (Zero-Dependency): Digital Clock GUI, Pokemon Finder REST Client, Thuật toán mã hóa đối xứng Substitution Cipher, Máy đánh bạc PRNG và Đồng hồ bấm giây chính xác cao.",
    "short_desc_en": "A versatile suite of 5 algorithmic tools and mini-projects including a Digital Clock, PokéAPI client, monoalphabetic substitution cipher, PRNG gaming engine, and monotonic high-resolution stopwatch.",
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
        "label_vi": "Quy mô bộ công cụ",
        "label_en": "Sub-projects",
        "value": "5 Du An Doc Lap"
      },
      {
        "label_vi": "Thư viện phụ thuộc",
        "label_en": "Dependencies",
        "value": "Khong (Zero-Dependency)"
      },
      {
        "label_vi": "Không gian khóa mã hóa",
        "label_en": "Cipher Key Space",
        "value": "94! ≈ 1.08 × 10^146"
      },
      {
        "label_vi": "Chuẩn mực mã nguồn",
        "label_en": "Code Standard",
        "value": "PEP 8 Clean Code"
      }
    ],
    "overview_vi": "\n      <h4>1. Muc tieu ky thuat</h4>\n      <p>Tong hop 5 module ung dung thuc te minh hoa cac khai niem cot loi cua ky thuat phan mem: lap trinh huong doi tuong, tieu thu RESTful API, giai thuat ma hoa doi xung va xu ly thoi gian he thong don dieu.</p>\n    ",
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>5 self-contained Python applications demonstrating software design patterns, cryptographic transposition, RESTful networking, and monotonic clock telemetry.</p>\n    ",
    "architecture_vi": "\n      <h4>1. Phan tich giai thuat</h4>\n      <ul>\n        <li><strong>Substitution Cipher:</strong> Song anh $f: \\Sigma \\to \\Sigma$ tren bang 94 ky tu ($|\\Sigma|! = 94! \\approx 1.08 \\times 10^{146}$), khang tan cong vet can Brute-force.</li>\n        <li><strong>Stopwatch:</strong> Su dung <code>time.perf_counter()</code> tranh sai lech dong ho khi he dieu hanh cap nhat giao thuc NTP.</li>\n        <li><strong>PokéAPI Client:</strong> Trich xuat du lieu JSON long nhau va stream anh bitmap qua HTTP socket.</li>\n      </ul>\n    ",
    "architecture_en": "\n      <h4>Algorithmic Mechanics:</h4>\n      <p>Monoalphabetic cipher mapping over 94-character alphabet ($94! \\approx 1.08 \\times 10^{146}$ keys). Monotonic timer loop using <code>time.perf_counter()</code>.</p>\n    ",
    "guide_vi": "\n      <h4>Thuc thi tung du an:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Python.git\ncd Python\n# Chay ung dung Pokemon Finder\ncd \"Pokemon finder using Pokeapi\" && python main.py\n# Chay thuat toan ma hoa\ncd \"../Simple Encryption\" && python main.py</code></pre>\n      </div>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Python.git\ncd \"Python/Simple Encryption\" && python main.py</code></pre>\n      </div>\n    ",
    "results_vi": "\n      <h4>Dac diem ky thuat:</h4>\n      <ul>\n        <li>Chay doc lap 100% tren Python tieu chuan khong can cai goi ngoai.</li>\n        <li>Tuan thu tuyet doi chuan muc <strong>PEP 8</strong>.</li>\n      </ul>\n    ",
    "results_en": "\n      <h4>Highlights:</h4>\n      <ul>\n        <li>Pure standard library implementation with zero external dependencies, compliant with PEP 8.</li>\n      </ul>\n    ",
    "demo_vi": "\n      <h4>Thuat toan ma hoa thay the trong Simple Encryption:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>import random, string\n\nchars = \" \" + string.punctuation + string.digits + string.ascii_letters\nchars = list(chars)\nkey = chars.copy()\nrandom.seed(42)\nrandom.shuffle(key)\n\n# Ma hoa\nplain_text = \"HUST Robotics & Control Systems\"\ncipher_text = \"\".join(key[chars.index(c)] for c in plain_text)\nprint(\"Cipher:\", cipher_text)\n\n# Giai ma\ndecrypted_text = \"\".join(chars[key.index(c)] for c in cipher_text)\nprint(\"Decrypted:\", decrypted_text)</code></pre>\n      </div>\n    ",
    "demo_en": "\n      <h4>Cipher Implementation Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>cipher = \"\".join(key[chars.index(c)] for c in plain_text)\nplain = \"\".join(chars[key.index(c)] for c in cipher)</code></pre>\n      </div>\n    "
  }
];

// Explicitly bind to global/window object for universal access
if (typeof window !== 'undefined') {
  window.PROJECTS_DATA = PROJECTS_DATA;
}
if (typeof globalThis !== 'undefined') {
  globalThis.PROJECTS_DATA = PROJECTS_DATA;
}
