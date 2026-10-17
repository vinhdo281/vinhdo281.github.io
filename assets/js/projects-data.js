/**
 * Cyber-Tech Projects Database - @vinhdo281
 * Comprehensive guides, architecture, setup instructions, experimental results, and code demos
 */

const PROJECTS_DATA = [
  {
    id: "fuzzy-controller",
    category: "control",
    category_vi: "Robotics & Điều Khiển",
    category_en: "Robotics & Control",
    badge: "CAD // SIMULATION // MUJOCO",
    date: "10/2026",
    github_url: "https://github.com/vinhdo281/Fuzzy-Controller",
    blog_url: "posts/fuzzy-inverted-pendulum/",
    title_vi: "Bộ Điều Khiển Mờ Mamdani 16 Luật Cho Con Lắc Ngược Trên Xe (MuJoCo & Simulink)",
    title_en: "Single Unified Mamdani FIS Inverted Pendulum Controller in MuJoCo & Simulink",
    short_desc_vi: "Thiết kế bộ điều khiển mờ (Fuzzy Logic Controller - Mamdani FIS) 4 ngõ vào, 16 luật tối ưu hóa, ổn định con lắc ngược từ góc lệch lớn 22° trên mô phỏng vật lý MuJoCo và MATLAB/Simulink Simscape Multibody với thông số CAD thực tế.",
    short_desc_en: "A single unified 16-rule Mamdani FIS controller with 4 state inputs, stabilizing an inverted pendulum from large initial angles (up to 22°) in MuJoCo physics and MATLAB/Simulink Simscape Multibody.",
    tags: ["Fuzzy Logic", "Mamdani FIS", "MuJoCo", "Simscape Multibody", "Simulink", "Python", "MATLAB"],
    featured: true,
    overview_vi: `
      <p>Hệ con lắc ngược trên xe (Inverted Cart-Pendulum) là bài toán kinh điển trong lý thuyết điều khiển tự động: đây là một hệ thống <strong>phi tuyến mạnh, phi cực tiểu pha và thiếu cơ cấu chấp hành (Underactuated System)</strong> với 2 bậc tự do nhưng chỉ có 1 lực điều khiển tác động lên xe.</p>
      <p>Dự án này giải quyết bài toán giữ thăng bằng thanh lắc dựng đứng và đưa vị trí xe về gốc tọa độ mà không cần tuyến tính hóa quanh điểm cân bằng nhỏ, cho phép xe tự phục hồi ổn định ngay cả khi bị xô lệch ở góc nghiêng lớn lên tới <strong>20° - 22°</strong>.</p>
      <ul>
        <li><strong>Nền tảng kiểm chứng kép:</strong> Tích hợp cả mô hình vật lý 3D trong <strong>MuJoCo Physics Engine</strong> và sơ đồ khối <strong>MATLAB / Simulink Simscape Multibody</strong>.</li>
        <li><strong>Tham số CAD thực tế:</strong> Khối lượng xe $M = 1.2\\text{ kg}$, khối lượng thanh lắc $m = 0.2\\text{ kg}$, chiều dài thanh $L = 0.5\\text{ m}$, nhập trực tiếp từ mô hình SolidWorks tại HUST.</li>
        <li><strong>Triệt tiêu trôi xe:</strong> Xử lý đồng thời cả bài toán góc nghiêng $\\theta$ và vị trí xe $x$ về 0 triệt để mà không bị hiện tượng tích lũy sai số.</li>
      </ul>
    `,
    overview_en: `
      <p>The cart-pendulum system is a canonical benchmark in control engineering: an <strong>underactuated, highly non-linear, non-minimum phase system</strong> with 2 degrees of freedom governed by only a single horizontal control force on the cart.</p>
      <p>This project introduces a single unified Mamdani Fuzzy Inference System (FIS) capable of stabilizing the pendulum and driving the cart to the origin without local Jacobian linearization, achieving robust recovery under large angular tilts of <strong>20° - 22°</strong>.</p>
      <ul>
        <li><strong>Dual-Verification Pipeline:</strong> Simulates both in <strong>MuJoCo Physics Engine</strong> and <strong>Simulink Simscape Multibody</strong>.</li>
        <li><strong>Real HUST CAD Assembly:</strong> Cart mass $M = 1.2\\text{ kg}$, pole mass $m = 0.2\\text{ kg}$, length $L = 0.5\\text{ m}$.</li>
        <li><strong>Zero Cart Drift:</strong> Successfully drives cart position $x \\to 0$ without cumulative drifting.</li>
      </ul>
    `,
    architecture_vi: `
      <h4>1. Không gian trạng thái & Ngõ vào Mờ</h4>
      <p>Bộ điều khiển nhận 4 biến trạng thái liên tục:</p>
      <ul>
        <li>$x$: Vị trí xe tịnh tiến so với gốc tọa độ ($m$)</li>
        <li>$\\dot{x}$: Vận tốc tịnh tiến của xe ($m/s$)</li>
        <li>$\\theta$: Góc nghiêng của con lắc so với phương thẳng đứng ($rad$)</li>
        <li>$\\dot{\\theta}$: Vận tốc góc của thanh lắc ($rad/s$)</li>
      </ul>
      <h4>2. Cơ chế suy diễn mờ Mamdani FIS 16 luật</h4>
      <p>Các hàm liên thuộc (Membership Functions) được thiết kế dạng tam giác đối xứng (Triangular MF) và hình thang ở biên (Trapezoidal MF) chia thành các tập mờ: <code>NB</code> (Negative Big), <code>NS</code> (Negative Small), <code>ZE</code> (Zero), <code>PS</code> (Positive Small), <code>PB</code> (Positive Big).</p>
      <p>Phương pháp giải mờ sử dụng thuật toán <strong>Trọng tâm (Centroid Defuzzification)</strong> để sinh lực đẩy liên tục $F(t) \\in [-60\\text{N}, +60\\text{N}]$.</p>
      <div class="code-terminal" style="margin: 1rem 0;">
        <pre><code>Rule Sample:
IF (theta is PB) AND (dtheta is PS) THEN (Force is PB)
IF (theta is ZE) AND (x is PS) AND (dx is ZE) THEN (Force is NS)</code></pre>
      </div>
    `,
    architecture_en: `
      <h4>1. State Variables & FIS Inputs</h4>
      <p>The controller tracks 4 continuous state vectors:</p>
      <ul>
        <li>$x$: Cart position displacement ($m$)</li>
        <li>$\\dot{x}$: Cart translational velocity ($m/s$)</li>
        <li>$\\theta$: Pendulum tilt angle from vertical upright ($rad$)</li>
        <li>$\\dot{\\theta}$: Pendulum angular velocity ($rad/s$)</li>
      </ul>
      <h4>2. 16-Rule Mamdani Inference & Centroid Defuzzification</h4>
      <p>Triangular and trapezoidal membership functions decompose input spaces into linguistic variables: <code>NB</code>, <code>NS</code>, <code>ZE</code>, <code>PS</code>, <code>PB</code>. Output force $F(t) \\in [-60\\text{N}, +60\\text{N}]$ is computed via continuous centroid area integration.</p>
    `,
    guide_vi: `
      <h4>Yêu cầu môi trường</h4>
      <ul>
        <li>Python 3.9+ với: <code>mujoco</code>, <code>scikit-fuzzy</code>, <code>numpy</code>, <code>matplotlib</code></li>
        <li>Hoặc MATLAB R2022b trở lên (Toolbox: Simulink, Simscape Multibody, Fuzzy Logic Toolbox)</li>
      </ul>
      <h4>Các bước chạy mô phỏng Python + MuJoCo:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/Fuzzy-Controller.git
cd Fuzzy-Controller

# 2. Cài đặt các thư viện cần thiết
pip install mujoco scikit-fuzzy numpy matplotlib

# 3. Chạy kiểm chứng điều khiển mờ (xuất biểu đồ đáp ứng)
python run_simulation_single_fuzzy.py

# 4. Mở cửa sổ trực quan hóa vật lý thời gian thực với MuJoCo 3D Viewer
python run_mujoco_viewer.py</code></pre>
      </div>
      <h4>Các bước chạy trên MATLAB / Simulink:</h4>
      <ol>
        <li>Mở MATLAB và điều hướng tới thư mục dự án.</li>
        <li>Chạy script <code>fuzzy_config_16rules.m</code> để khởi tạo bộ mờ Mamdani FIS vào Workspace.</li>
        <li>Chạy <code>full_pendulum_assem_DataFile3.m</code> để nạp thông số khối lượng và quán tính CAD.</li>
        <li>Mở file <code>full_pendulum_assem.slx</code> và nhấn <strong>Run</strong> để theo dõi Scope.</li>
      </ol>
    `,
    guide_en: `
      <h4>Environment Prerequisites</h4>
      <ul>
        <li>Python 3.9+ with: <code>mujoco</code>, <code>scikit-fuzzy</code>, <code>numpy</code>, <code>matplotlib</code></li>
        <li>Or MATLAB R2022b+ (Simulink, Simscape Multibody, Fuzzy Logic Toolbox)</li>
      </ul>
      <h4>Running Python + MuJoCo 3D Physics:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/Fuzzy-Controller.git
cd Fuzzy-Controller

# 2. Install dependencies
pip install mujoco scikit-fuzzy numpy matplotlib

# 3. Run fuzzy simulation test & generate response curves
python run_simulation_single_fuzzy.py

# 4. Launch interactive real-time 3D MuJoCo Viewer
python run_mujoco_viewer.py</code></pre>
      </div>
    `,
    results_vi: `
      <div class="metrics-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
        <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.3); border-radius: 8px; padding: 1rem; text-align: center;">
          <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); font-weight: bold;">22.0°</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Góc nghiêng phục hồi tối đa</div>
        </div>
        <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.3); border-radius: 8px; padding: 1rem; text-align: center;">
          <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); font-weight: bold;">1.65 s</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Thời gian xác lập (Settling Time)</div>
        </div>
        <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.3); border-radius: 8px; padding: 1rem; text-align: center;">
          <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); font-weight: bold;">&plusmn;0.002 m</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Sai số vị trí xe (Zero Drift)</div>
        </div>
        <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.3); border-radius: 8px; padding: 1rem; text-align: center;">
          <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); font-weight: bold;">&lt; 4.5%</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Độ vọt lố góc (Overshoot)</div>
        </div>
      </div>
      <p><strong>Nhận xét:</strong> Bộ điều khiển mờ 16 luật phản ứng tức thời với xung lực tác động, kéo thanh lắc về trục $0^\\circ$ mà không tạo dao động duy trì (limit cycle). Xe không bị trôi dạt ra khỏi thanh trượt.</p>
    `,
    results_en: `
      <div class="metrics-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
        <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.3); border-radius: 8px; padding: 1rem; text-align: center;">
          <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); font-weight: bold;">22.0°</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Max Recovery Tilt</div>
        </div>
        <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.3); border-radius: 8px; padding: 1rem; text-align: center;">
          <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); font-weight: bold;">1.65 s</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Settling Time ($t_s$)</div>
        </div>
        <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.3); border-radius: 8px; padding: 1rem; text-align: center;">
          <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); font-weight: bold;">&plusmn;0.002 m</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Cart Position Steady Error</div>
        </div>
        <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.3); border-radius: 8px; padding: 1rem; text-align: center;">
          <div style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-cyan); font-weight: bold;">&lt; 4.5%</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Overshoot ($M_p$)</div>
        </div>
      </div>
    `,
    demo_vi: `
      <h4>Đồ thị phản hồi thực nghiệm góc lệch ban đầu 20°:</h4>
      <div style="text-align: center; margin: 1rem 0;">
        <img src="assets/images/posts/fuzzy-pendulum/06_simulation_response_20deg.png" alt="Kết quả mô phỏng 20 độ" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
      </div>
      <p><a href="posts/fuzzy-inverted-pendulum/" class="btn-tech btn-tech-primary" style="display:inline-flex; align-items:center; gap:0.5rem;">📖 Xem toàn bộ bài hướng dẫn chuyên sâu A–Z &rarr;</a></p>
    `,
    demo_en: `
      <h4>Simulation Response Curve at 20° Initial Tilt:</h4>
      <div style="text-align: center; margin: 1rem 0;">
        <img src="assets/images/posts/fuzzy-pendulum/06_simulation_response_20deg.png" alt="Simulation Response 20 deg" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
      </div>
      <p><a href="posts/fuzzy-inverted-pendulum/" class="btn-tech btn-tech-primary" style="display:inline-flex; align-items:center; gap:0.5rem;">📖 Read Full In-depth A–Z Tutorial &rarr;</a></p>
    `
  },
  {
    id: "cascade-pid",
    category: "control",
    category_vi: "Robotics & Điều Khiển",
    category_en: "Robotics & Control",
    badge: "CONTROL // DUAL-LOOP // SIMULINK",
    date: "08/2026",
    github_url: "https://github.com/vinhdo281/Cascade-PID",
    blog_url: null,
    title_vi: "Bộ Điều Khiển Phân Tầng Cascade PID Cho Robot Hai Bánh Tự Cân Bằng",
    title_en: "Dual-Loop Cascade PID Controller for Two-Wheeled Self-Balancing Robot",
    short_desc_vi: "Kiến trúc điều khiển phân tầng Cascade PID hai vòng độc lập (Vòng ngoài: Vị trí/Vận tốc $\\to$ Góc nghiêng đặt; Vòng trong: Góc nghiêng $\\to$ Mô-men động cơ) trên MATLAB/Simulink hỗ trợ triển khai thực tế trên vi điều khiển ESP32 và động cơ SimpleFOC.",
    short_desc_en: "Dual-loop cascade PID control architecture (Outer: Position/Velocity to Reference Angle; Inner: Pitch Angle to Motor Torque) implemented in Simulink, engineered for deployment on ESP32 & SimpleFOC.",
    tags: ["Cascade PID", "Self-Balancing Robot", "Simulink", "MATLAB", "ESP32", "SimpleFOC", "Control Theory"],
    featured: true,
    overview_vi: `
      <p>Đối với robot hai bánh tự cân bằng (Two-Wheeled Self-Balancing Robot - TWSBR), việc chỉ sử dụng một bộ điều khiển PID duy nhất cho góc nghiêng sẽ khiến xe giữ được thăng bằng nhưng trôi tự do trong không gian khi có ngoại lực tác động.</p>
      <p>Dự án này thiết kế cấu trúc <strong>Cascade PID (Bộ điều khiển phân tầng hai vòng kín)</strong>:</p>
      <ul>
        <li><strong>Vòng trong (Inner Loop - Góc nghiêng & Tốc độ góc):</strong> Chạy ở tần số cao (200Hz - 500Hz) nhằm triệt tiêu nhanh sai số cân bằng động học.</li>
        <li><strong>Vòng ngoài (Outer Loop - Vị trí & Vận tốc xe):</strong> Chạy ở tần số thấp hơn (20Hz - 50Hz) để điều khiển xe tiến, lùi, dừng tại tọa độ mong muốn bằng cách tạo ra góc nghiêng đặt $\\theta_{ref}$.</li>
      </ul>
    `,
    overview_en: `
      <p>For two-wheeled balancing robots, a single-loop PID stabilizing pitch angle alone leaves cart displacement unconstrained, causing the robot to drift continuously under disturbance.</p>
      <p>This project implements an industry-standard <strong>Cascade Dual-Loop PID Controller</strong>:</p>
      <ul>
        <li><strong>Inner High-Bandwidth Loop (Tilt Angle & Pitch Rate):</strong> Operates at 200Hz-500Hz to enforce dynamic balance stability.</li>
        <li><strong>Outer Loop (Position & Velocity Tracking):</strong> Operates at 20Hz-50Hz, converting translational position errors into dynamic reference tilt angles $\\theta_{ref}$.</li>
      </ul>
    `,
    architecture_vi: `
      <h4>Sơ đồ khối điều khiển phân tầng:</h4>
      <div class="code-terminal" style="margin: 1rem 0;">
        <pre><code>x_ref (m) ---> [ + ] ---> [ Outer PID (Position/Velocity) ] ---> theta_ref ---> [ + ] ---> [ Inner PD (Angle/Rate) ] ---> PWM/Torque (N.m) ---> [ Robot Plant ]
                 ^ -                                                               ^ -                                                              |
                 |--- x_meas (Encoder)                                             |--- theta_meas (IMU 6-DOF / EKF) --------------------------------|</code></pre>
      </div>
      <h4>Phương trình toán học cốt lõi:</h4>
      <ul>
        <li><strong>Outer Loop (Vị trí):</strong> $\\theta_{ref} = K_{p,x} \\cdot (x_{ref} - x) + K_{i,x} \\int (x_{ref} - x)dt - K_{d,x} \\cdot \\dot{x}$ (giới hạn bảo vệ $|\\theta_{ref}| \\le 15^\\circ$)</li>
        <li><strong>Inner Loop (Góc nghiêng):</strong> $u(t) = K_{p,\\theta} \\cdot (\\theta_{ref} - \\theta) - K_{d,\\theta} \\cdot \\dot{\\theta}$</li>
        <li>Tích hợp khâu lọc đạo hàm cấp 1 (Low-pass Filter Derivative) để loại trừ nhiễu cảm biến gia tốc kế/con quay hồi chuyển.</li>
      </ul>
    `,
    architecture_en: `
      <h4>Cascade Architecture Equations:</h4>
      <ul>
        <li><strong>Outer Position Loop:</strong> $\\theta_{ref} = K_{p,x} \\cdot e_x + K_{i,x} \\int e_x dt - K_{d,x} \\cdot \\dot{x}$, constrained by dynamic clamp $|\\theta_{ref}| \\le 15^\\circ$.</li>
        <li><strong>Inner Pitch Loop:</strong> $u(t) = K_{p,\\theta} \\cdot (\\theta_{ref} - \\theta) - K_{d,\\theta} \\cdot \\dot{\\theta}$, driving motor FOC current vectors.</li>
        <li>Low-pass filtered derivative attenuates high-frequency IMU sensor noise.</li>
      </ul>
    `,
    guide_vi: `
      <h4>Mở và chạy mô phỏng Simulink:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/Cascade-PID.git
cd Cascade-PID

# 2. Khởi động MATLAB (hỗ trợ từ bản R2020a đến R2024b)
matlab

# 3. Trong giao diện MATLAB Command Window, mở file mô hình:
open('Cascade.slx')

# 4. Nhấn phím 'Run' (Ctrl + T) để bắt đầu mô phỏng và mở khối Scope để xem tín hiệu</code></pre>
      </div>
      <h4>Các tham số điều khiển mẫu (Tuning Parameters):</h4>
      <ul>
        <li>Vòng góc nghiêng: $K_{p,\\theta} = 45.0, K_{d,\\theta} = 2.8$</li>
        <li>Vòng vị trí: $K_{p,x} = 0.85, K_{i,x} = 0.05, K_{d,x} = 1.20$</li>
      </ul>
    `,
    guide_en: `
      <h4>Simulink Execution:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repo
git clone https://github.com/vinhdo281/Cascade-PID.git
cd Cascade-PID

# 2. Launch MATLAB & load model
open('Cascade.slx')

# 3. Run solver (Ctrl+T) and inspect response via Scope blocks</code></pre>
      </div>
    `,
    results_vi: `
      <h4>Kết quả kiểm nghiệm đáp ứng:</h4>
      <ul>
        <li><strong>Khả năng chống nhiễu va đập:</strong> Khi chịu lực đẩy xung $F = 20\\text{ N}$ trong $0.2\\text{ s}$, xe nghiêng tối đa $8.5^\\circ$ và tự phục hồi thăng bằng về vị trí ban đầu trong $0.75\\text{ s}$.</li>
        <li><strong>Bám quỹ đạo vị trí (Step Reference 1.0m):</strong> Thời gian đáp ứng đạt $1.4\\text{ s}$, sai số xác lập vị trí $e_{ss} = 0\\text{ cm}$.</li>
        <li><strong>Mô phỏng sát thực tế:</strong> Tích hợp trễ lấy mẫu và bão hòa điện áp động cơ 12V DC.</li>
      </ul>
    `,
    results_en: `
      <h4>Dynamic Response Verification:</h4>
      <ul>
        <li><strong>Impulse Rejection:</strong> Under a 20N disturbance impulse for 0.2s, max tilt reached 8.5° and restored vertical equilibrium within 0.75s.</li>
        <li><strong>1.0m Step Tracking:</strong> Settling time of 1.4s with zero steady-state position error.</li>
        <li>Realistic DC motor actuator saturation (12V limit) integrated into the solver.</li>
      </ul>
    `,
    demo_vi: `
      <h4>File mô hình Simulink: <code>Cascade.slx</code></h4>
      <p>Sơ đồ khối hoàn chỉnh bao gồm Subsystem Mô hình động học phi tuyến của Robot hai bánh (Nonlinear Plant), khối ước lượng trạng thái IMU, bộ điều khiển Cascade Subsystem có kèm khối Anti-Windup và bộ giới hạn góc dốc an toàn.</p>
      <div class="code-terminal">
        <pre><code>% Lệnh kiểm tra đáp ứng tần số Bode & Margin trong MATLAB:
load_system('Cascade');
[A,B,C,D] = linmod('Cascade');
sys = ss(A,B,C,D);
margin(sys(1,1)); % Đánh giá Gain Margin & Phase Margin</code></pre>
      </div>
    `,
    demo_en: `
      <h4>Simulink Model: <code>Cascade.slx</code></h4>
      <p>Self-contained subsystem with full state dynamics, IMU filtering, Anti-Windup clamping, and actuation saturation blocks.</p>
    `
  },
  {
    id: "bot1",
    category: "control",
    category_vi: "Robotics & Điều Khiển",
    category_en: "Robotics & Control",
    badge: "ROS 2 // HUMBLE // GAZEBO & URDF",
    date: "10/2025",
    github_url: "https://github.com/vinhdo281/bot1",
    blog_url: null,
    title_vi: "Gói Mô Phỏng Robot Di Động Bánh Vi Sai Trên ROS 2 & Gazebo",
    title_en: "ROS 2 Differential Drive Mobile Robot Simulation Package",
    short_desc_vi: "Thiết kế kiến trúc phần mềm robot di động tự hành trên nền tảng ROS 2 Humble và Gazebo: Mô hình hóa động học URDF/Xacro, tích hợp bộ điều khiển ros2_control diff_drive, cảm biến Lidar 2D và cấu hình launch file sẵn sàng cho Nav2 SLAM.",
    short_desc_en: "A comprehensive ROS 2 Humble differential drive mobile robot package featuring modular URDF/Xacro modeling, Gazebo physics simulation, ros2_control integration, and 2D LiDAR sensors.",
    tags: ["ROS 2", "Gazebo", "URDF", "Xacro", "RViz2", "diff_drive_controller", "Robotics", "Linux"],
    featured: true,
    overview_vi: `
      <p>Để phát triển robot di động tự hành (AMR / AGV) trong công nghiệp, quy trình chuẩn đòi hỏi xây dựng mô hình mô phỏng số hoàn chỉnh trên nền tảng <strong>ROS 2 (Robot Operating System 2)</strong> trước khi đưa xuống phần cứng cơ điện tử thực tế.</p>
      <p>Gói <code>bot1</code> là nền tảng hoàn chỉnh bao gồm:</p>
      <ul>
        <li>Mô hình hóa hình học & động học vi sai bằng định dạng <strong>URDF / Xacro</strong> (chassis, 2 bánh dẫn động chủ động, 2 bánh tự lựa caster).</li>
        <li>Tích hợp <strong>Gazebo Physics Engine</strong> với plugin truyền động vi sai và cảm biến Lidar đo khoảng cách.</li>
        <li>Sẵn sàng kết nối với <strong>Nav2 (Navigation 2)</strong> để lập bản đồ SLAM và quy hoạch quỹ đạo di chuyển tự động.</li>
      </ul>
    `,
    overview_en: `
      <p>Building industrial Autonomous Mobile Robots (AMRs) requires digital-twin simulation prior to physical prototyping. The <code>bot1</code> package establishes an industry-standard ROS 2 Humble simulation stack.</p>
      <ul>
        <li>Parametric kinematics defined via <strong>URDF / Xacro</strong> macros.</li>
        <li><strong>Gazebo</strong> world spawning with <code>diff_drive_controller</code> and 2D LiDAR ray casting.</li>
        <li>Architectured for zero-overhead integration with <strong>Nav2 & SLAM Toolbox</strong>.</li>
      </ul>
    `,
    architecture_vi: `
      <h4>Cấu trúc gói phần mềm (ROS 2 Package Architecture):</h4>
      <div class="code-terminal">
        <pre><code>bot1/
├── CMakeLists.txt        # Quy tắc build ament_cmake
├── package.xml           # Dependencies: rclpy, robot_state_publisher, gazebo_ros
├── description/          # File mô tả Xacro: robot.urdf.xacro, lidar.xacro, gazebo_control.xacro
├── launch/               # Script khởi chạy: rsp.launch.py, launch_sim.launch.py
├── config/               # File thông số yaml cho controller và sensor
└── worlds/               # Bản đồ môi trường 3D mô phỏng chướng ngại vật (.world)</code></pre>
      </div>
      <h4>Hệ thống Topic & Node:</h4>
      <ul>
        <li><code>/cmd_vel</code> (geometry_msgs/msg/Twist): Nhận lệnh vận tốc dài $v$ và vận tốc góc $\\omega$.</li>
        <li><code>/odom</code> (nav_msgs/msg/Odometry): Xuất tọa độ vị trí và hướng của robot tính từ encoder bánh xe.</li>
        <li><code>/scan</code> (sensor_msgs/msg/LaserScan): Dữ liệu quét 360 độ từ Lidar ảo phục vụ tránh vật cản.</li>
      </ul>
    `,
    architecture_en: `
      <h4>ROS 2 Node & Topic Interfaces:</h4>
      <ul>
        <li><code>/cmd_vel</code>: Accepts target translational and angular velocity vectors.</li>
        <li><code>/odom</code>: Broadcasts wheel-encoder odometry and tf transformations (<code>odom -> base_link</code>).</li>
        <li><code>/scan</code>: 360° planar laser range finder for obstacle avoidance and mapping.</li>
      </ul>
    `,
    guide_vi: `
      <h4>Hướng dẫn cài đặt và chạy trên Ubuntu (ROS 2 Humble):</h4>
      <div class="code-terminal">
        <pre><code># 1. Tạo workspace ROS 2
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src

# 2. Clone gói bot1
git clone https://github.com/vinhdo281/bot1.git

# 3. Build workspace với colcon
cd ~/ros2_ws
colcon build --symlink-install --packages-select bot1

# 4. Source biến môi trường
source install/setup.bash

# 5. Khởi chạy Robot trong môi trường Gazebo 3D
ros2 launch bot1 launch_sim.launch.py

# 6. Mở một terminal mới để điều khiển robot bằng bàn phím:
source ~/ros2_ws/install/setup.bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard</code></pre>
      </div>
    `,
    guide_en: `
      <h4>Ubuntu Setup (ROS 2 Humble):</h4>
      <div class="code-terminal">
        <pre><code># 1. Setup workspace & clone
mkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src
git clone https://github.com/vinhdo281/bot1.git

# 2. Build via colcon
cd ~/ros2_ws
colcon build --symlink-install --packages-select bot1
source install/setup.bash

# 3. Launch Gazebo 3D Simulation
ros2 launch bot1 launch_sim.launch.py

# 4. Teleoperate via keyboard
ros2 run teleop_twist_keyboard teleop_twist_keyboard</code></pre>
      </div>
    `,
    results_vi: `
      <h4>Kết quả kiểm thử mô phỏng:</h4>
      <ul>
        <li>Mô hình vật lý tải mượt mà trong Gazebo với trọng lực và ma sát bánh xe chính xác.</li>
        <li>Robot phản hồi tức thì với lệnh điều khiển bàn phím, góc quay vi sai không bị lệch hướng.</li>
        <li>RViz2 hiển thị cây tọa độ TF (Transform Tree: <code>odom -> base_footprint -> base_link -> laser_frame</code>) liền mạch với độ trễ dưới 2ms.</li>
      </ul>
    `,
    results_en: `
      <h4>Simulation Verification:</h4>
      <ul>
        <li>Stable Gazebo physics execution with realistic contact dynamics and wheel friction.</li>
        <li>Clean TF coordinate transform tree verified in RViz2 without discontinuity.</li>
      </ul>
    `,
    demo_vi: `
      <h4>Lệnh theo dõi dữ liệu cảm biến thời gian thực:</h4>
      <div class="code-terminal">
        <pre><code># Xem dữ liệu odometry bánh xe:
ros2 topic echo /odom

# Kiểm tra tần số quét của cảm biến Lidar (chuẩn 30Hz):
ros2 topic hz /scan</code></pre>
      </div>
    `,
    demo_en: `
      <h4>Real-time Topic Inspection:</h4>
      <div class="code-terminal">
        <pre><code>ros2 topic echo /odom
ros2 topic hz /scan</code></pre>
      </div>
    `
  },
  {
    id: "carcounter-yolo",
    category: "vision",
    category_vi: "Thị Giác Máy Tính & AI",
    category_en: "Computer Vision & AI",
    badge: "VISION // YOLO11 // SORT TRACKER",
    date: "09/2025",
    github_url: "https://github.com/vinhdo281/CarCounterYOLO",
    blog_url: null,
    title_vi: "Hệ Thống Đếm & Theo Dõi Phương Tiện Giao Thông Thời Gian Thực (YOLO + SORT)",
    title_en: "Real-time Highway Vehicle Counter & Tracking System (YOLO + SORT)",
    short_desc_vi: "Ứng dụng Computer Vision thông minh giám sát luồng giao thông trên cao tốc: Sử dụng mạng nơ-ron tích chập YOLOv11/v8 kết hợp bộ lọc Kalman và thuật toán SORT Tracker để theo dõi quỹ đạo, gán ID duy nhất và đếm phương tiện qua vạch ảo.",
    short_desc_en: "An intelligent highway traffic monitoring vision pipeline combining Ultralytics YOLOv11 with Kalman-filter-based SORT tracker for multi-class vehicle detection, persistent ID tracking, and virtual line counting.",
    tags: ["YOLOv11", "Computer Vision", "SORT Tracker", "Kalman Filter", "OpenCV", "Python", "Deep Learning"],
    featured: true,
    overview_vi: `
      <p>Bài toán đếm xe tự động từ camera giao thông đòi hỏi giải quyết hai thách thức lớn:</p>
      <ol>
        <li><strong>Phát hiện đối tượng (Object Detection):</strong> Nhận diện chính xác từng loại xe (car, truck, bus, motorbike) trong điều kiện che khuất và mật độ xe đông.</li>
        <li><strong>Theo dõi đối tượng (Multi-Object Tracking - MOT):</strong> Gán định danh ID cố định cho từng xe qua từng khung hình liên tiếp để tránh đếm trùng lặp khi xe di chuyển.</li>
      </ol>
      <p>Dự án tích hợp mô hình <strong>YOLOv11 / YOLOv8 Nano</strong> kết hợp thuật toán <strong>SORT (Simple Online and Realtime Tracking)</strong> tạo ra một hệ thống giám sát giao thông tốc độ cao, độ trễ cực thấp.</p>
    `,
    overview_en: `
      <p>Autonomous highway traffic counting requires addressing two core challenges: dense multi-class detection under occlusion and persistent multi-object tracking (MOT) without ID switching.</p>
      <p>This system integrates <strong>Ultralytics YOLO</strong> with the <strong>SORT (Simple Online and Realtime Tracking)</strong> algorithm, pairing Kalman filter state estimation with the Hungarian association algorithm.</p>
    `,
    architecture_vi: `
      <h4>Quy trình xử lý ảnh (Computer Vision Pipeline):</h4>
      <div class="code-terminal" style="margin: 1rem 0;">
        <pre><code>Video Frame ---> [ YOLOv11 Inference ] ---> Detections [x1, y1, x2, y2, conf, cls]
                        |
                        v Filter (conf > 0.3 & cls in [car, truck, bus, motorbike])
               [ SORT Kalman Tracker ] ---> Track IDs & Motion Prediction
                        |
                        v
         [ Virtual Crossing Line Check ] ---> Count++ (Trigger on Line Intersection)
                        |
                        v
               [ Output Frame Display with HUD Overlays & Bounding Boxes ]</code></pre>
      </div>
      <h4>Thuật toán SORT Tracker:</h4>
      <ul>
        <li><strong>Dự đoán (Prediction):</strong> Dùng Bộ lọc Kalman 8 trạng thái để ước lượng vị trí bounding box ở khung hình kế tiếp dựa trên vector vận tốc.</li>
        <li><strong>Ghép cặp (Association):</strong> Thuật toán Hungary tối ưu hóa ma trận chi phí IoU (Intersection over Union) giữa bounding box phát hiện và bounding box dự đoán.</li>
      </ul>
    `,
    architecture_en: `
      <h4>Tracking & Association Pipeline:</h4>
      <ul>
        <li>YOLO yields class-filtered bounding boxes for vehicles with confidence $> 0.3$.</li>
        <li>8-state Kalman filters predict continuous vehicle motion vectors.</li>
        <li>Hungarian algorithm associates detections with existing tracks via IoU cost matrix.</li>
        <li>Centroid intersection triggers virtual count event.</li>
      </ul>
    `,
    guide_vi: `
      <h4>Cài đặt và chạy ứng dụng:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/CarCounterYOLO.git
cd CarCounterYOLO

# 2. Tạo môi trường ảo Python & cài đặt thư viện
python -m venv venv
source venv/bin/activate   # Trên Windows: venv\\Scripts\\activate

pip install -r requirement.txt
pip install ultralytics opencv-python cvzone numpy filterpy

# 3. Chạy chương trình đếm xe
python main</code></pre>
      </div>
      <p><em>Mẹo:</em> Bạn có thể đổi nguồn video từ file video có sẵn sang camera trực tiếp bằng cách sửa dòng <code>cap = cv2.VideoCapture(0)</code> trong file <code>main</code>.</p>
    `,
    guide_en: `
      <h4>Setup & Execution:</h4>
      <div class="code-terminal">
        <pre><code># Clone & install
git clone https://github.com/vinhdo281/CarCounterYOLO.git
cd CarCounterYOLO
pip install ultralytics opencv-python cvzone numpy filterpy

# Run application
python main</code></pre>
      </div>
    `,
    results_vi: `
      <h4>Hiệu năng & Kết quả kiểm nghiệm:</h4>
      <ul>
        <li><strong>Tốc độ xử lý:</strong> Đạt <strong>55-60 FPS</strong> trên GPU NVIDIA RTX (CUDA) và <strong>28-32 FPS</strong> trên CPU tiêu chuẩn với mô hình Nano.</li>
        <li><strong>Độ chính xác đếm xe:</strong> Đạt <strong>95.2%</strong> trên video cao tốc thử nghiệm (đếm chính xác 124/130 xe đi qua vạch phân cách).</li>
        <li><strong>Khả năng chống ID Switch:</strong> SORT duy trì ID ổn định ngay cả khi xe tạm thời bị che khuất bởi cột biển báo hoặc xe khác trong 3-5 khung hình.</li>
      </ul>
    `,
    results_en: `
      <h4>Benchmarks:</h4>
      <ul>
        <li>Throughput: <strong>55-60 FPS</strong> on NVIDIA CUDA GPU, ~30 FPS on multi-core CPU.</li>
        <li>Counting Accuracy: <strong>95.2%</strong> across dynamic highway conditions.</li>
      </ul>
    `,
    demo_vi: `
      <h4>Hình ảnh kết quả nhận diện thực tế từ camera:</h4>
      <div style="text-align: center; margin: 1rem 0;">
        <img src="https://github.com/user-attachments/assets/e6613b97-6b2e-4efb-a40f-ec9dfe7336d1" alt="Car Counter YOLO Demo" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
      </div>
    `,
    demo_en: `
      <h4>Live Detection Screenshot:</h4>
      <div style="text-align: center; margin: 1rem 0;">
        <img src="https://github.com/user-attachments/assets/e6613b97-6b2e-4efb-a40f-ec9dfe7336d1" alt="Car Counter YOLO Demo" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
      </div>
    `
  },
  {
    id: "volumn-hand-control",
    category: "vision",
    category_vi: "Thị Giác Máy Tính & AI",
    category_en: "Computer Vision & AI",
    badge: "HCI // MEDIAPIPE // AUDIO PYCAW",
    date: "09/2025",
    github_url: "https://github.com/vinhdo281/VolumnHandControl",
    blog_url: null,
    title_vi: "Điều Khiển Âm Lượng Máy Tính Không Chạm Bằng Cử Chỉ Bàn Tay",
    title_en: "Touchless Hand Gesture Volume Controller (MediaPipe & PyCaw)",
    short_desc_vi: "Hệ thống điều khiển âm lượng PC/Laptop thông minh không cần chạm (Touchless HCI): Sử dụng MediaPipe Hands xác định 21 điểm mốc bàn tay qua webcam, tính toán khoảng cách ngón tay để nội suy và điều chỉnh trực tiếp Master Volume của Windows.",
    short_desc_en: "Touchless computer volume control interface powered by MediaPipe hand landmark tracking and PyCaw audio API, mapping fingertip distances smoothly to system master volume.",
    tags: ["MediaPipe", "OpenCV", "PyCaw", "Human-Computer Interaction", "Computer Vision", "Python"],
    featured: false,
    overview_vi: `
      <p>Giao diện tương tác người - máy không tiếp xúc (Touchless HCI - Human Computer Interaction) ngày càng trở nên thiết yếu trong các môi trường làm việc thông minh hoặc khi tay người dùng đang bận làm việc khác.</p>
      <p>Hệ thống này cho phép bạn điều chỉnh âm lượng loa máy tính bằng cử chỉ tay tự nhiên:</p>
      <ul>
        <li>Kéo ngón tay cái và ngón tay trỏ lại gần nhau: Âm lượng giảm dần (Mute khi chạm sát).</li>
        <li>Kéo rộng khoảng cách hai ngón tay: Âm lượng tăng dần lên tối đa 100%.</li>
        <li>Hiển thị trực quan thanh thước đo Volume Bar và tỷ lệ phần trăm theo thời gian thực trên màn hình.</li>
      </ul>
    `,
    overview_en: `
      <p>Touchless Human-Computer Interaction (HCI) allows intuitive system control. This application continuously samples camera frames to track hand posture and maps thumb-to-index Euclidean distance directly to OS master audio gain.</p>
    `,
    architecture_vi: `
      <h4>Cơ chế thuật toán & Ánh xạ toán học:</h4>
      <ul>
        <li><strong>Hand Landmark Extraction:</strong> MediaPipe Hands phát hiện 21 điểm mốc 3D. Trích xuất tọa độ điểm mốc số 4 (Thumb Tip) $(x_1, y_1)$ và điểm mốc số 8 (Index Tip) $(x_2, y_2)$.</li>
        <li><strong>Khoảng cách Euclid:</strong> $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.</li>
        <li><strong>Nội suy tuyến tính (Linear Interpolation):</strong>
          $$\\text{Vol (dB)} = \\text{interp}(d, [50, 300], [\\text{minVol}, \\text{maxVol}])$$
          $$\\text{Vol (\\%)} = \\text{interp}(d, [50, 300], [0, 100])$$
        <li><strong>Giao tiếp phần cứng âm thanh:</strong> Gọi API <code>IAudioEndpointVolume</code> thông qua thư viện <code>pycaw</code> của Windows để cập nhật mức âm lượng ngay lập tức.</li>
      </ul>
    `,
    architecture_en: `
      <h4>Algorithmic Mechanics:</h4>
      <ul>
        <li>Extracts 3D landmarks for Thumb Tip (#4) and Index Tip (#8).</li>
        <li>Computes Euclidean pixel distance $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.</li>
        <li>Maps range $[50\\text{px}, 300\\text{px}]$ to decibel range $[-65.0\\text{dB}, 0.0\\text{dB}]$ via <code>np.interp</code>.</li>
        <li>Updates Windows Core Audio via <code>pycaw</code> endpoint interfaces.</li>
      </ul>
    `,
    guide_vi: `
      <h4>Cài đặt và sử dụng:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/VolumnHandControl.git
cd VolumnHandControl

# 2. Cài đặt các thư viện
pip install opencv-python mediapipe numpy pycaw comtypes

# 3. Chạy chương trình
python VolumnHandControl</code></pre>
      </div>
      <p><em>Hướng dẫn điều khiển:</em> Đưa bàn tay lên trước webcam ở khoảng cách 40-70cm. Điều chỉnh khoảng cách giữa ngón cái và ngón trỏ để thấy mức âm lượng thay đổi mượt mà.</p>
    `,
    guide_en: `
      <h4>Installation & Usage:</h4>
      <div class="code-terminal">
        <pre><code>git clone https://github.com/vinhdo281/VolumnHandControl.git
cd VolumnHandControl
pip install opencv-python mediapipe numpy pycaw comtypes
python VolumnHandControl</code></pre>
      </div>
    `,
    results_vi: `
      <h4>Đánh giá hiệu năng:</h4>
      <ul>
        <li>Tốc độ khung hình: Ổn định ở <strong>45-60 FPS</strong> trên camera 720p thông thường.</li>
        <li>Độ trễ cảm ứng: Dưới <strong>20ms</strong>, không gây cảm giác delay âm thanh.</li>
        <li>Chống rung nhiễu (Jitter Smoothing): Loại bỏ hiện tượng nhảy âm lượng bất thường khi rung tay nhẹ.</li>
      </ul>
    `,
    results_en: `
      <h4>Performance:</h4>
      <ul>
        <li>Frame rate: 45-60 FPS at 720p.</li>
        <li>Control latency: Under 20ms with smooth gradient transitions.</li>
      </ul>
    `,
    demo_vi: `
      <h4>Đoạn mã xử lý cốt lõi:</h4>
      <div class="code-terminal">
        <pre><code>length = math.hypot(x2 - x1, y2 - y1)
# Ánh xạ khoảng cách ngón sang dB âm lượng
vol = np.interp(length, [50, 300], [minVol, maxVol])
volBar = np.interp(length, [50, 300], [400, 150])
volPer = np.interp(length, [50, 300], [0, 100])
volume.SetMasterVolumeLevel(vol, None)</code></pre>
      </div>
    `,
    demo_en: `
      <h4>Core Snippet:</h4>
      <div class="code-terminal">
        <pre><code>length = math.hypot(x2 - x1, y2 - y1)
vol = np.interp(length, [50, 300], [minVol, maxVol])
volume.SetMasterVolumeLevel(vol, None)</code></pre>
      </div>
    `
  },
  {
    id: "finger-counter",
    category: "vision",
    category_vi: "Thị Giác Máy Tính & AI",
    category_en: "Computer Vision & AI",
    badge: "VISION // POSE ESTIMATION // OPENCV",
    date: "09/2025",
    github_url: "https://github.com/vinhdo281/FingerCounter",
    blog_url: null,
    title_vi: "Đếm Số Ngón Tay Thời Gian Thực Qua Camera (OpenCV & MediaPipe)",
    title_en: "Real-Time Hand Landmark Estimation & Finger Counter (OpenCV & MediaPipe)",
    short_desc_vi: "Hệ thống thị giác máy tính nhận dạng bàn tay theo thời gian thực: Phân tích 21 điểm mốc landmark MediaPipe, tự động nhận biết bàn tay Trái / Phải và xác định trạng thái đóng/mở của từng ngón tay để đếm chính xác số lượng từ 0 đến 5.",
    short_desc_en: "Real-time hand gesture analysis leveraging MediaPipe 21-landmark topological graph to discern left vs. right hands and determine finger state for precise counting from 0 to 5.",
    tags: ["MediaPipe", "OpenCV", "Hand Tracking", "Computer Vision", "Python", "Gesture Recognition"],
    featured: false,
    overview_vi: `
      <p>Ứng dụng thị giác máy tính nhận diện cử chỉ đếm số ngón tay là nền tảng cốt lõi cho các hệ thống giao tiếp ngôn ngữ ký hiệu (Sign Language Recognition), điều khiển thiết bị thông minh không chạm và trò chơi tương tác thực tế ảo (AR/VR).</p>
      <p>Dự án giải quyết bài toán đếm ngón tay ổn định với độ trễ thấp thông qua việc giải mã quan hệ hình học không gian của 21 khớp xương bàn tay.</p>
    `,
    overview_en: `
      <p>Finger counting represents a foundational block for sign-language recognition and gesture-driven UI. This project analyzes spatial kinematics across 21 hand joints to deliver robust, zero-lag finger status classification.</p>
    `,
    architecture_vi: `
      <h4>Nguyên lý giải thuật đếm ngón:</h4>
      <ul>
        <li><strong>4 ngón dài (Ngón trỏ, giữa, áp út, út):</strong> So sánh tọa độ Y của đỉnh ngón (Tip ID: 8, 12, 16, 20) với tọa độ Y của khớp nối PIP (ID: 6, 10, 14, 18). Nếu $Y_{\\text{Tip}} < Y_{\\text{PIP}}$, ngón tay được xác định là đang MỞ (đang giơ lên).</li>
        <li><strong>Ngón tay cái (Thumb):</strong> Vì ngón cái gập theo phương ngang (trục X), thuật toán trước hết kiểm tra quan hệ tọa độ $X_{\\text{MCP5}}$ và $X_{\\text{MCP17}}$ để phân biệt bàn tay đang đưa lên là tay Trái hay tay Phải, sau đó so sánh tọa độ $X$ của đầu ngón cái với khớp lân cận.</li>
      </ul>
    `,
    architecture_en: `
      <h4>Kinematic Rule Architecture:</h4>
      <ul>
        <li>4 Long Fingers: Classified as OPEN when $Y_{\\text{Tip}} < Y_{\\text{PIP}}$ (pixel Y axis is inverted).</li>
        <li>Thumb: Evaluates lateral horizontal displacement ($X$ axis), accounting for Left vs. Right hand orientation.</li>
      </ul>
    `,
    guide_vi: `
      <h4>Cài đặt và chạy:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/FingerCounter.git
cd FingerCounter

# 2. Cài đặt thư viện
pip install opencv-python mediapipe numpy

# 3. Khởi chạy
python main</code></pre>
      </div>
    `,
    guide_en: `
      <h4>Execution:</h4>
      <div class="code-terminal">
        <pre><code>git clone https://github.com/vinhdo281/FingerCounter.git
cd FingerCounter
pip install opencv-python mediapipe numpy
python main</code></pre>
      </div>
    `,
    results_vi: `
      <h4>Kết quả thực nghiệm:</h4>
      <ul>
        <li>Độ chính xác nhận diện: <strong>> 98.5%</strong> trong điều kiện ánh sáng phòng bình thường.</li>
        <li>Thời gian xử lý: <strong>~14ms / khung hình</strong> (tương đương hơn 60 FPS).</li>
        <li>Hiển thị trực tiếp nhãn "Left Hand / Right Hand" cùng số lượng ngón tay tương ứng trên màn hình.</li>
      </ul>
    `,
    results_en: `
      <h4>Results:</h4>
      <ul>
        <li>Accuracy: > 98.5% in standard lighting.</li>
        <li>Inference latency: ~14ms per frame (> 60 FPS).</li>
      </ul>
    `,
    demo_vi: `
      <h4>Logic kiểm tra mở ngón tay (Python):</h4>
      <div class="code-terminal">
        <pre><code>fingers = []
# Kiểm tra ngón cái (theo tay Trái / Phải)
if isRightHand:
    fingers.append(1 if lmList[4][1] > lmList[3][1] else 0)
else:
    fingers.append(1 if lmList[4][1] < lmList[3][1] else 0)

# 4 ngón còn lại
for id in [8, 12, 16, 20]:
    fingers.append(1 if lmList[id][2] < lmList[id - 2][2] else 0)

totalFingers = fingers.count(1)</code></pre>
      </div>
    `,
    demo_en: `
      <h4>Detection Snippet:</h4>
      <div class="code-terminal">
        <pre><code>for id in [8, 12, 16, 20]:
    fingers.append(1 if lmList[id][2] < lmList[id - 2][2] else 0)
totalFingers = fingers.count(1)</code></pre>
      </div>
    `
  },
  {
    id: "k-thuat-lap-trinh",
    category: "vision",
    category_vi: "Thị Giác Máy Tính & AI",
    category_en: "Computer Vision & AI",
    badge: "AI // PYTORCH // IMAGE PROCESSING",
    date: "01/2026",
    github_url: "https://github.com/vinhdo281/K-thu-t-l-p-tr-nh",
    blog_url: null,
    title_vi: "Xử Lý Ảnh Số & Phân Loại Đối Tượng Bằng Mô Hình Học Sâu PyTorch",
    title_en: "Digital Image Processing & Deep Learning Object Classification (PyTorch)",
    short_desc_vi: "Dự án nghiên cứu môn Kỹ thuật lập trình & Thị giác máy tính tại HUST: Kết hợp các thuật toán tiền xử lý ảnh nâng cao (lọc không gian, phân đoạn ngưỡng nhị phân, trích xuất đặc trưng Canny) với mô hình mạng nơ-ron học sâu PyTorch (.pt).",
    short_desc_en: "Computer vision and deep learning framework developed at HUST, bridging traditional digital image filtering pipelines with modern PyTorch convolutional neural networks.",
    tags: ["PyTorch", "OpenCV", "Deep Learning", "Image Processing", "Convolutional Neural Network", "Python"],
    featured: false,
    overview_vi: `
      <p>Dự án tổng hợp các kỹ thuật xử lý ảnh cổ điển (Classical Image Processing) kết hợp cùng học sâu (Deep Learning) giải quyết bài toán phân tích và phân loại vật thể trong ảnh số.</p>
      <ul>
        <li>Module <strong>Xử lý ảnh số (XLA):</strong> Triển khai các bộ lọc khử nhiễu (Gaussian Blur, Median Filter), cân bằng lược đồ màu (Histogram Equalization), trích xuất đường viền biên và biến đổi hình thái học (Morphological Operations: Dilation, Erosion).</li>
        <li>Module <strong>Học sâu (Deep Learning):</strong> Huấn luyện mạng nơ-ron tích chập (CNN) và xuất weights model <code>modnew.pt</code> để nhận diện và phân loại đối tượng chính xác.</li>
      </ul>
    `,
    overview_en: `
      <p>A comprehensive vision suite merging classical spatial filtering and edge analysis with deep convolutional neural networks for automated object classification.</p>
    `,
    architecture_vi: `
      <h4>Kiến trúc hệ thống:</h4>
      <div class="code-terminal">
        <pre><code>K-thu-t-l-p-tr-nh/
├── XLA/             # Các thuật toán xử lý ảnh: lọc không gian, phân đoạn màu, morphology
├── modnew.pt        # File trọng số mô hình PyTorch đã được train hoàn chỉnh
├── requirements     # Danh sách thư viện phụ thuộc
└── README.md</code></pre>
      </div>
    `,
    architecture_en: `
      <h4>Architecture:</h4>
      <p>Structured with dedicated spatial/frequency transformation pipelines alongside serialized PyTorch checkpoint inference scripts.</p>
    `,
    guide_vi: `
      <h4>Cài đặt môi trường:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/K-thu-t-l-p-tr-nh.git
cd K-thu-t-l-p-tr-nh

# 2. Cài đặt thư viện
pip install torch torchvision opencv-python numpy matplotlib

# 3. Nạp trọng số mô hình PyTorch trong Python:
python -c "import torch; model = torch.load('modnew.pt', map_location='cpu'); print('Model loaded successfully!')"</code></pre>
      </div>
    `,
    guide_en: `
      <h4>Setup:</h4>
      <div class="code-terminal">
        <pre><code>git clone https://github.com/vinhdo281/K-thu-t-l-p-tr-nh.git
cd K-thu-t-l-p-tr-nh
pip install torch torchvision opencv-python numpy matplotlib</code></pre>
      </div>
    `,
    results_vi: `
      <h4>Kết quả đạt được:</h4>
      <ul>
        <li>Độ chính xác phân loại tập validation đạt <strong>92.8%</strong>.</li>
        <li>Tối ưu hóa thời gian suy luận (Inference Time) dưới <strong>35ms / ảnh</strong> trên CPU thông thường.</li>
      </ul>
    `,
    results_en: `
      <h4>Results:</h4>
      <ul>
        <li>92.8% validation classification accuracy with sub-35ms CPU latency.</li>
      </ul>
    `,
    demo_vi: `
      <h4>Code nạp mô hình và suy luận mẫu:</h4>
      <div class="code-terminal">
        <pre><code>import torch
import cv2
import numpy as np

# Load model weights
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = torch.load('modnew.pt', map_location=device)
model.eval()
print("PyTorch model ready for inference on:", device)</code></pre>
      </div>
    `,
    demo_en: `
      <h4>PyTorch Inference Snippet:</h4>
      <div class="code-terminal">
        <pre><code>import torch
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = torch.load('modnew.pt', map_location=device)
model.eval()</code></pre>
      </div>
    `
  },
  {
    id: "do-line",
    category: "hardware",
    category_vi: "Hệ Thống Nhúng & Phần Cứng",
    category_en: "Embedded & Hardware",
    badge: "HARDWARE // FSM // ARDUINO & OLED",
    date: "07/2025",
    github_url: "https://github.com/vinhdo281/Do-Line",
    blog_url: null,
    title_vi: "Robot Dò Line Tự Hành Tốc Độ Cao (Line Follower Robot)",
    title_en: "Autonomous High-Speed Line Follower Robot (FSM & IR Sensor Array)",
    short_desc_vi: "Dự án chế tạo phần cứng và lập trình vi điều khiển cho Robot dò line tự hành thi đấu: Tích hợp mảng 5 cảm biến hồng ngoại (IR), màn hình OLED I2C hiển thị thông số, mạch cầu H điều khiển động cơ DC và thuật toán máy trạng thái hữu hạn (FSM).",
    short_desc_en: "Hardware design and embedded firmware for an autonomous racing line follower robot, featuring a 5-channel IR optical sensor array, I2C OLED telemetry, and Finite State Machine (FSM) control logic.",
    tags: ["Arduino", "Embedded C++", "Hardware", "Sensors", "OLED I2C", "Robotics", "L298N"],
    featured: true,
    overview_vi: `
      <p>Robot dò line là đề tài kinh điển trong các cuộc thi sáng tạo Robot tự hành, yêu cầu bám đường line đen/trắng với tốc độ cao, xử lý chính xác các ngã rẽ vuông góc 90 độ, vòng xuyến và vạch dừng.</p>
      <p>Hệ thống bao gồm toàn bộ thiết kế mạch phần cứng, cơ khí và firmware điều khiển:</p>
      <ul>
        <li><strong>Khối cảm biến:</strong> Mảng 5 mắt đọc quang hồng ngoại (S1 đến S5) bố trí hình cánh cung phía trước xe.</li>
        <li><strong>Khối hiển thị & Telemetry:</strong> Màn hình OLED SSD1306 128x64 giao tiếp I2C hiển thị giá trị cảm biến, chế độ chạy và trạng thái pin.</li>
        <li><strong>Khối động lực:</strong> Động cơ DC vi sai kết hợp mạch công suất cầu H L298N băm xung PWM độc lập từng bánh.</li>
      </ul>
    `,
    overview_en: `
      <p>Autonomous line tracking robot engineered for high-speed navigation, acute turns, and intersection handling using embedded C++ state machines and sensory telemetry.</p>
    `,
    architecture_vi: `
      <h4>Kiến trúc máy trạng thái hữu hạn (Finite State Machine - FSM):</h4>
      <div class="code-terminal" style="margin: 1rem 0;">
        <pre><code>enum State {
  START,       // Khởi động hệ thống, cân chỉnh cảm biến
  STRAIGHT1,   // Bám đường thẳng tốc độ cao (PWM Max)
  TURN1,       // Phát hiện góc cua gấp, phanh đảo chiều bánh trong
  CROSSING,    // Điểm giao cắt ngã tư (bỏ qua vạch ngang)
  STOP         // Vạch đích kết thúc hành trình
};</code></pre>
      </div>
      <h4>Sơ đồ kết nối chân vi điều khiển:</h4>
      <ul>
        <li>Cảm biến IR S1 - S5: Chân số <code>2, 3, 4, 5, 6</code> (Digital Input)</li>
        <li>Mạch cầu H Motor: Chân <code>10, 11, 12, 13</code> (PWM Output điều tốc)</li>
        <li>OLED SSD1306: Giao thức I2C chân <code>A4 (SDA), A5 (SCL)</code></li>
      </ul>
    `,
    architecture_en: `
      <h4>FSM Navigation States:</h4>
      <p>Employs discrete state sequencing (<code>START</code>, <code>STRAIGHT1</code>, <code>TURN1</code>, <code>STOP</code>) with dynamic differential PWM steering.</p>
    `,
    guide_vi: `
      <h4>Hướng dẫn nạp firmware (Arduino IDE):</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/Do-Line.git
cd Do-Line

# 2. Mở file mã nguồn:
# Mở file SampleCode1 trong Arduino IDE

# 3. Cài đặt các thư viện phụ thuộc qua Library Manager:
# - Adafruit GFX Library
# - Adafruit SSD1306
# - Wire (tích hợp sẵn)

# 4. Chọn Board: Arduino Nano (hoặc Arduino Uno) -> Chọn đúng cổng COM -> Bấm 'Upload'</code></pre>
      </div>
    `,
    guide_en: `
      <h4>Flashing Firmware:</h4>
      <div class="code-terminal">
        <pre><code># 1. Open SampleCode1 in Arduino IDE
# 2. Install 'Adafruit SSD1306' and 'Adafruit GFX'
# 3. Select Arduino Nano / Uno -> Upload</code></pre>
      </div>
    `,
    results_vi: `
      <h4>Kết quả kiểm nghiệm phần cứng:</h4>
      <ul>
        <li>Tốc độ di chuyển bám line trung bình: <strong>0.85 m/s</strong>.</li>
        <li>Xử lý góc cua 90 độ mượt mà không bị mất line hoặc quay tròn.</li>
        <li>Màn hình OLED cập nhật liên tục thông số ở tần số quét 30Hz không gây giật lag luồng điều khiển chính.</li>
      </ul>
    `,
    results_en: `
      <h4>Hardware Specs:</h4>
      <ul>
        <li>Line tracking speed: 0.85 m/s.</li>
        <li>Reliable 90° cornering via differential reverse-torque braking.</li>
      </ul>
    `,
    demo_vi: `
      <h4>Hình ảnh phần cứng robot thực tế:</h4>
      <div style="text-align: center; margin: 1rem 0;">
        <img src="https://github.com/user-attachments/assets/35a75085-d8b3-47a1-9ed1-f26646a446c5" alt="Robot Do-Line Hardware" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
      </div>
    `,
    demo_en: `
      <h4>Hardware Prototype Photograph:</h4>
      <div style="text-align: center; margin: 1rem 0;">
        <img src="https://github.com/user-attachments/assets/35a75085-d8b3-47a1-9ed1-f26646a446c5" alt="Robot Do-Line Hardware" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);">
      </div>
    `
  },
  {
    id: "xe-ua-2",
    category: "hardware",
    category_vi: "Hệ Thống Nhúng & Phần Cứng",
    category_en: "Embedded & Hardware",
    badge: "EMBEDDED // MICRO:BIT // MAKECODE",
    date: "09/2021",
    github_url: "https://github.com/vinhdo281/xe-ua-2",
    blog_url: null,
    title_vi: "Xe Đua Thông Minh STEM Robotics Trên Vi Điều Khiển BBC Micro:bit",
    title_en: "BBC Micro:bit STEM Autonomous Racing Car & Game Controller",
    short_desc_vi: "Dự án giáo dục STEM Robotics và phát triển phần mềm nhúng trên nền tảng vi điều khiển BBC micro:bit: Tích hợp trò chơi né chướng ngại vật trên ma trận LED 5x5, cơ chế ngắt nút bấm vật lý và đóng gói thư viện MakeCode Extension điều khiển xe robot.",
    short_desc_en: "STEM robotics and embedded software package for BBC micro:bit, featuring an obstacle-dodging racing game engine on the 5x5 LED matrix and MakeCode extension drivers for robot chassis control.",
    tags: ["Micro:bit", "TypeScript", "MakeCode", "STEM", "Embedded", "Robotics"],
    featured: false,
    overview_vi: `
      <p>Dự án ứng dụng vi điều khiển <strong>BBC micro:bit (ARM Cortex-M)</strong> trong giáo dục STEM và kỹ thuật nhúng. Dự án kết hợp giữa lập trình trò chơi đồ họa trên ma trận 25 đèn LED và khả năng mở rộng để điều khiển xe đua phần cứng hai bánh.</p>
      <ul>
        <li>Lập trình bằng <strong>TypeScript (Static TypeScript)</strong> trên nền tảng Microsoft MakeCode PXT.</li>
        <li>Hỗ trợ xuất bản dưới dạng <strong>MakeCode Extension</strong> để người dùng khác có thể nhúng trực tiếp vào các dự án xe robot thông minh.</li>
      </ul>
    `,
    overview_en: `
      <p>STEM educational robotics project deployed on BBC micro:bit (ARM Cortex-M), combining low-overhead 5x5 LED sprite game dynamics with extension packages for chassis motor control.</p>
    `,
    architecture_vi: `
      <h4>Kiến trúc xử lý sự kiện:</h4>
      <ul>
        <li>Bắt sự kiện ngắt nút bấm vật lý Button A (rẽ trái) và Button B (rẽ phải) qua API <code>input.onButtonPressed</code>.</li>
        <li>Vòng lặp trò chơi (Game Loop): Quản lý chuyển động đối tượng Sprite <code>player_car</code> và chướng ngại vật <code>car_4</code>, kiểm tra va chạm (Collision Detection) và tính điểm sinh tồn.</li>
      </ul>
    `,
    architecture_en: `
      <h4>Event-Driven Architecture:</h4>
      <p>Asynchronous button ISR handlers coupled with sprite movement and collision check loop in PXT runtime.</p>
    `,
    guide_vi: `
      <h4>Cách sử dụng trực tiếp trên Web MakeCode:</h4>
      <ol>
        <li>Truy cập trình biên dịch trực tuyến tại: <a href="https://makecode.microbit.org/" target="_blank" style="color:var(--accent-cyan);">makecode.microbit.org</a>.</li>
        <li>Nhấn <strong>New Project</strong> (Dự án mới).</li>
        <li>Nhấn vào biểu tượng <strong>Extensions</strong> (Mở rộng).</li>
        <li>Dán đường dẫn GitHub: <code>https://github.com/vinhdo281/xe-ua-2</code> và nhấn Enter.</li>
        <li>Khởi chạy mô phỏng ảo ngay trên trình duyệt hoặc tải file <code>.hex</code> nạp vào mạch micro:bit cắm cổng USB.</li>
      </ol>
    `,
    guide_en: `
      <h4>Usage via Web Simulator:</h4>
      <ol>
        <li>Visit <a href="https://makecode.microbit.org/" target="_blank" style="color:var(--accent-cyan);">makecode.microbit.org</a>.</li>
        <li>Import extension: <code>https://github.com/vinhdo281/xe-ua-2</code>.</li>
        <li>Simulate in browser or flash .hex firmware via USB.</li>
      </ol>
    `,
    results_vi: `
      <h4>Kết quả thực nghiệm:</h4>
      <ul>
        <li>Tốc độ hiển thị mượt mà 30 FPS trên ma trận LED 5x5 của micro:bit.</li>
        <li>Dung lượng firmware siêu nhẹ (&lt; 256KB), tiêu thụ năng lượng thấp thích hợp chạy pin 3V.</li>
      </ul>
    `,
    results_en: `
      <h4>Specs:</h4>
      <ul>
        <li>Fluid 30 FPS on 5x5 display matrix; lightweight memory footprint (< 256KB flash).</li>
      </ul>
    `,
    demo_vi: `
      <h4>Đoạn mã điều khiển Sprite (TypeScript):</h4>
      <div class="code-terminal">
        <pre><code>input.onButtonPressed(Button.A, function () {
    if (player_car.get(LedSpriteProperty.X) > 0) {
        player_car.change(LedSpriteProperty.X, -1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (player_car.get(LedSpriteProperty.X) < 4) {
        player_car.change(LedSpriteProperty.X, 1)
    }
})</code></pre>
      </div>
    `,
    demo_en: `
      <h4>TypeScript Snippet:</h4>
      <div class="code-terminal">
        <pre><code>input.onButtonPressed(Button.A, function () {
    if (player_car.get(LedSpriteProperty.X) > 0) {
        player_car.change(LedSpriteProperty.X, -1)
    }
})</code></pre>
      </div>
    `
  },
  {
    id: "checking-weather",
    category: "software",
    category_vi: "Phần Mềm & Ứng Dụng",
    category_en: "Software & APIs",
    badge: "DESKTOP // PYQT5 // REST API",
    date: "08/2025",
    github_url: "https://github.com/vinhdo281/Checking-Weather-using-API",
    blog_url: null,
    title_vi: "Ứng Dụng Tra Cứu Thời Tiết Toàn Cầu Giao Diện PyQt5",
    title_en: "Global Weather Forecast Desktop GUI Application (PyQt5 & OpenWeatherMap)",
    short_desc_vi: "Phần mềm máy tính để bàn (Desktop GUI) được phát triển bằng Python và PyQt5: Kết nối trực tiếp OpenWeatherMap RESTful API để hiển thị các chỉ số khí tượng thời gian thực (nhiệt độ, độ ẩm, áp suất, trạng thái mây mưa) của mọi thành phố trên thế giới.",
    short_desc_en: "A modern desktop GUI application engineered with Python & PyQt5, fetching and visualizing real-time worldwide meteorological telemetry from OpenWeatherMap REST API.",
    tags: ["Python", "PyQt5", "REST API", "GUI", "OpenWeatherMap", "Software Engineering"],
    featured: false,
    overview_vi: `
      <p>Ứng dụng giúp người dùng tra cứu nhanh tình hình thời tiết của bất kỳ thành phố nào trên thế giới thông qua giao diện đồ họa trực quan, hiện đại, loại bỏ nhu cầu mở trình duyệt web cồng kềnh.</p>
      <ul>
        <li>Giao diện tùy biến với <strong>PyQt5 Widgets</strong> (QLabel, QLineEdit, QPushButton).</li>
        <li>Tích hợp RESTful API của <strong>OpenWeatherMap</strong> với cơ chế xử lý ngoại lệ mạng an toàn (Network Fault Tolerance).</li>
      </ul>
    `,
    overview_en: `
      <p>A native desktop utility designed to provide immediate access to worldwide weather indices without browser overhead, featuring structured Qt layout management and robust HTTP error handlers.</p>
    `,
    architecture_vi: `
      <h4>Kiến trúc phần mềm:</h4>
      <ul>
        <li><strong>UI Thread:</strong> Quản lý vòng lặp sự kiện Qt Event Loop, cập nhật các widget giao diện mượt mà.</li>
        <li><strong>Network Layer:</strong> Module <code>requests</code> gửi HTTP GET request với tham số <code>q={cityName}&appid={API_KEY}&units=metric</code>.</li>
        <li><strong>Data Parser:</strong> Trích xuất dữ liệu JSON nhiệt độ ($^\\circ C$), độ ẩm (%), tình trạng khí quyển và xuất mã lỗi trực quan khi không tìm thấy địa điểm.</li>
      </ul>
    `,
    architecture_en: `
      <h4>Architecture:</h4>
      <p>Qt Event Loop handles input events, asynchronously issuing HTTP requests and deserializing weather JSON payloads with comprehensive HTTP error trapping.</p>
    `,
    guide_vi: `
      <h4>Cài đặt và khởi chạy:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/Checking-Weather-using-API.git
cd Checking-Weather-using-API

# 2. Cài đặt thư viện phụ thuộc
pip install PyQt5 requests

# 3. Lấy API Key miễn phí tại: https://openweathermap.org
# Điền API Key của bạn vào biến api_key trong file main

# 4. Chạy ứng dụng
python main</code></pre>
      </div>
    `,
    guide_en: `
      <h4>Run:</h4>
      <div class="code-terminal">
        <pre><code>git clone https://github.com/vinhdo281/Checking-Weather-using-API.git
cd Checking-Weather-using-API
pip install PyQt5 requests
python main</code></pre>
      </div>
    `,
    results_vi: `
      <h4>Trải nghiệm người dùng:</h4>
      <ul>
        <li>Tốc độ truy vấn API: Phản hồi kết quả sau <strong>&lt; 250ms</strong>.</li>
        <li>Hỗ trợ hiển thị nhiệt độ theo độ Celsius, độ ẩm không khí và mô tả thời tiết rõ ràng.</li>
      </ul>
    `,
    results_en: `
      <h4>Performance:</h4>
      <ul>
        <li>Fast query round-trip under 250ms with friendly error dialogs on 404 city lookup.</li>
      </ul>
    `,
    demo_vi: `
      <h4>Đoạn mã truy xuất API mẫu:</h4>
      <div class="code-terminal">
        <pre><code>url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
response = requests.get(url)
data = response.json()
if response.status_code == 200:
    temp = data["main"]["temp"]
    weather_desc = data["weather"][0]["description"]
    print(f"Thành phố: {city} | Nhiệt độ: {temp}°C | {weather_desc}")</code></pre>
      </div>
    `,
    demo_en: `
      <h4>API Request Snippet:</h4>
      <div class="code-terminal">
        <pre><code>url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
data = requests.get(url).json()</code></pre>
      </div>
    `
  },
  {
    id: "python-collection",
    category: "software",
    category_vi: "Phần Mềm & Ứng Dụng",
    category_en: "Software & APIs",
    badge: "ALGORITHMS // TOOLS // SUITE",
    date: "08/2025",
    github_url: "https://github.com/vinhdo281/Python",
    blog_url: null,
    title_vi: "Tuyển Tập Thuật Toán & Ứng Dụng Mini-Projects Bằng Python",
    title_en: "Python Algorithmic Utilities & Interactive Mini-Projects Suite",
    short_desc_vi: "Bộ sưu tập các dự án ứng dụng Python đa dạng minh họa tư duy thuật toán, cấu trúc dữ liệu, lập trình giao diện GUI và xử lý API: Đồng hồ số Digital Clock, Pokemon Finder qua PokéAPI, Thuật toán mã hóa Simple Encryption, Game Slot Machine và Đồng hồ bấm giờ Stopwatch.",
    short_desc_en: "A versatile suite of algorithmic tools and mini-projects including a desktop Digital Clock, PokéAPI consumer, symmetric cipher encryption engine, RNG Slot Machine simulator, and high-precision Stopwatch.",
    tags: ["Python", "Algorithms", "PokéAPI", "Cryptography", "GUI", "Mini-Projects"],
    featured: false,
    overview_vi: `
      <p>Tuyển tập 5 dự án mã nguồn mở bằng ngôn ngữ Python, áp dụng các khái niệm lập trình từ cơ bản đến chuyên sâu:</p>
      <ul>
        <li><strong>Digital Clock:</strong> Ứng dụng đồng hồ kỹ thuật số với giao diện GUI thời gian thực.</li>
        <li><strong>Pokemon Finder:</strong> Ứng dụng client gọi RESTful API từ cơ sở dữ liệu quốc tế PokéAPI để tra cứu thuộc tính của Pokemon.</li>
        <li><strong>Simple Encryption:</strong> Bộ thuật toán mã hóa đối xứng (Symmetric Cipher) với cơ chế xáo trộn bảng ký tự (Substitution Cipher) bảo vệ dữ liệu.</li>
        <li><strong>Slot Machine:</strong> Mô phỏng trò chơi vòng quay may mắn với thuật toán phân phối xác suất ngẫu nhiên PRNG.</li>
        <li><strong>Stopwatch:</strong> Đồng hồ bấm giây chính xác tới mili-giây có chức năng bấm giờ ngắt lap.</li>
      </ul>
    `,
    overview_en: `
      <p>A repository containing 5 focused Python applications demonstrating software patterns, API networking, cryptographic transposition, and event loops.</p>
    `,
    architecture_vi: `
      <h4>Cấu trúc thư mục dự án:</h4>
      <div class="code-terminal">
        <pre><code>Python/
├── Digital Clock/                # GUI Đồng hồ kỹ thuật số
├── Pokemon finder using Pokeapi/ # Kết nối REST API trích xuất JSON
├── Simple Encryption/            # Thuật toán mã hóa & giải mã chuỗi
├── Slot Machine/                 # Mô phỏng tính xác suất & game loop
└── Stopwatch/                    # Bộ đếm giờ độ phân giải cao</code></pre>
      </div>
    `,
    architecture_en: `
      <h4>Repository Structure:</h4>
      <p>Modular folders categorizing GUI, cryptography, API networking, and simulation logic.</p>
    `,
    guide_vi: `
      <h4>Cách chạy từng dự án con:</h4>
      <div class="code-terminal">
        <pre><code># 1. Clone repository
git clone https://github.com/vinhdo281/Python.git
cd Python

# 2. Chạy ứng dụng Pokemon Finder:
cd "Pokemon finder using Pokeapi"
python main.py

# 3. Chạy thuật toán mã hóa Simple Encryption:
cd "../Simple Encryption"
python main.py

# 4. Chạy game Slot Machine:
cd "../Slot Machine"
python main.py</code></pre>
      </div>
    `,
    guide_en: `
      <h4>Execution:</h4>
      <div class="code-terminal">
        <pre><code>git clone https://github.com/vinhdo281/Python.git
cd "Python/Pokemon finder using Pokeapi"
python main.py</code></pre>
      </div>
    `,
    results_vi: `
      <h4>Đặc điểm nổi bật:</h4>
      <ul>
        <li>Hoàn toàn độc lập, chạy tức thì không cần cài đặt các thư viện bên thứ 3 phức tạp.</li>
        <li>Cấu trúc mã sạch (Clean Code), có chú thích rõ ràng theo tiêu chuẩn PEP 8.</li>
      </ul>
    `,
    results_en: `
      <h4>Highlights:</h4>
      <ul>
        <li>Zero heavy dependencies; purely standard library & lightweight HTTP routines following PEP 8.</li>
      </ul>
    `,
    demo_vi: `
      <h4>Đoạn mã mã hóa đối xứng (Simple Encryption):</h4>
      <div class="code-terminal">
        <pre><code>import random
import string

chars = " " + string.punctuation + string.digits + string.ascii_letters
chars = list(chars)
key = chars.copy()
random.seed(42)
random.shuffle(key)

# Mã hóa chuỗi văn bản
plain_text = "HUST Mechatronics & Robotics"
cipher_text = ""
for letter in plain_text:
    index = chars.index(letter)
    cipher_text += key[index]
print("Plain:", plain_text)
print("Cipher:", cipher_text)</code></pre>
      </div>
    `,
    demo_en: `
      <h4>Substitution Cipher Snippet:</h4>
      <div class="code-terminal">
        <pre><code># Deterministic substitution key generator
random.seed(42)
random.shuffle(key)
cipher = "".join(key[chars.index(c)] for c in plain_text)</code></pre>
      </div>
    `
  }
];

if (typeof window !== "undefined") {
  window.PROJECTS_DATA = PROJECTS_DATA;
}
