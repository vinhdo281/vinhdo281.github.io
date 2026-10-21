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
    "blog_url": "posts/fuzzy-inverted-pendulum/",
    "title_en": "Single Unified Mamdani FIS Inverted Pendulum Controller in MuJoCo & Simulink",
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
        "label_en": "Max Recovery Tilt",
        "value": "22.0 deg"
      },
      {
        "label_en": "Settling Time",
        "value": "1.65 s"
      },
      {
        "label_en": "Cart Drift Error",
        "value": "+/- 0.002 m"
      },
      {
        "label_en": "Overshoot",
        "value": "< 4.5%"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Objective & Problem Formulation</h4>\n      <p>The cart-pendulum system represents a benchmark non-linear underactuated plant with 2 degrees of freedom ($x(t), \\theta(t)$) governed by a single horizontal force $F(t)$.</p>\n      <p><strong>Objective:</strong> Design a unified Mamdani Fuzzy Inference System (FIS) stabilizing the pole from large initial inclinations (up to 22 degrees) while driving cart position to origin ($x \\to 0$) without Jacobian linearization constraints.</p>\n    ",
    "architecture_en": "\n      <h4>1. Non-linear Mathematical Modeling</h4>\n      <p>Coupled Euler-Lagrange equations governing cart and pole dynamics parameterized via CAD assembly ($M = 1.20\\text{kg}, m = 0.20\\text{kg}, L = 0.50\\text{m}, J = 0.00417\\text{kg}\\cdot\\text{m}^2$).</p>\n      <h4>2. 16-Rule Mamdani FIS Structure</h4>\n      <p>4 continuous input states mapped across 5 linguistic sets via centroid defuzzification yielding continuous actuation force $F \\in [-60\\text{N}, +60\\text{N}]$.</p>\n    ",
    "guide_en": "\n      <h4>Execution Guide:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Fuzzy-Controller.git\ncd Fuzzy-Controller\npip install mujoco scikit-fuzzy numpy matplotlib\npython run_simulation_single_fuzzy.py\npython run_mujoco_viewer.py</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Performance Benchmark:</h4>\n      <table style=\"width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;\">\n        <thead>\n          <tr style=\"border-bottom:1px solid var(--border-color); text-align:left; color:var(--accent-cyan);\">\n            <th style=\"padding:0.4rem;\">Metric</th>\n            <th style=\"padding:0.4rem;\">Linear PID</th>\n            <th style=\"padding:0.4rem;\">Optimal LQR</th>\n            <th style=\"padding:0.4rem;\">Proposed Mamdani 16 FIS</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr><td style=\"padding:0.4rem;\">Max Recoverable Angle</td><td>6.5 deg</td><td>8.2 deg</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">22.0 deg</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Settling Time (ts)</td><td>2.40 s</td><td>1.95 s</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">1.65 s</td></tr>\n          <tr><td style=\"padding:0.4rem;\">Cart Drift Error</td><td>Unbounded</td><td>0.04 m</td><td style=\"color:var(--accent-cyan); font-weight:bold;\">+/- 0.002 m</td></tr>\n        </tbody>\n      </table>\n    ",
    "demo_en": "\n      <h4>Simulation Response & Control Loop:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"assets/images/posts/fuzzy-pendulum/06_simulation_response_20deg.png\" alt=\"Simulation Response 20 deg\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n      <div class=\"code-terminal\">\n        <pre><code>force = controller.compute_force(theta, dtheta, x, dx)\ndata.ctrl[0] = np.clip(force, -60.0, 60.0)\nmujoco.mj_step(model, data)</code></pre>\n      </div>\n    "
  },
  {
    "id": "cascade-pid",
    "category": "control",
    "category_en": "Control & Robotics",
    "badge": "CONTROL // DUAL-LOOP // SIMULINK & ESP32",
    "date": "08/2026",
    "github_url": "https://github.com/vinhdo281/Cascade-PID",
    "blog_url": null,
    "title_en": "Dual-Loop Cascade PID Controller for Two-Wheeled Self-Balancing Robot",
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
        "label_en": "Inner Loop Rate",
        "value": "500 Hz"
      },
      {
        "label_en": "Outer Loop Rate",
        "value": "50 Hz"
      },
      {
        "label_en": "Impulse Recovery",
        "value": "0.75 s"
      },
      {
        "label_en": "Max Impulse Disturbance",
        "value": "20.0 N"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Objective</h4>\n      <p>Decouple high-frequency attitude dynamics from low-frequency translational trajectory tracking via a dual-loop cascade control architecture, preventing positional drift under external disturbances.</p>\n    ",
    "architecture_en": "\n      <h4>Mathematical Formulation:</h4>\n      <p>Outer Loop: $\\theta_{ref} = K_{p,x} e_x + K_{i,x} \\int e_x dt - K_{d,x} \\dot{x}$ ($|\\theta_{ref}| \\le 15^\\circ$).</p>\n      <p>Inner Loop: $u = K_{p,\\theta} (\\theta_{ref} - \\theta) - K_{d,\\theta} \\dot{\\theta}_{filt}$ with 1st-order low-pass filter $N = 100\\text{ rad/s}$.</p>\n    ",
    "guide_en": "\n      <h4>Simulation Guide:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Cascade-PID.git\ncd Cascade-PID\nmatlab -r \"open('Cascade.slx')\"</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Validation Metrics:</h4>\n      <ul>\n        <li>1.0m Step Tracking: $t_s = 1.40\\text{s}$, zero steady-state position error.</li>\n        <li>20N Impulse Rejection: Restores equilibrium within 0.75s.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>FreeRTOS Dual-Core Firmware Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>// Core 0: 500Hz Attitude PD Loop\nfloat u_torque = Kp_theta * (target_theta - pitch) - Kd_theta * gyroY;\n// Core 1: 50Hz Position PID Loop\ntarget_theta = constrain(Kp_x * e_x + Ki_x * int_x - Kd_x * dx, -MAX_TILT, MAX_TILT);</code></pre>\n      </div>\n    "
  },
  {
    "id": "bot1",
    "category": "control",
    "category_en": "Control & Robotics",
    "badge": "ROS 2 // HUMBLE // GAZEBO & NAV2",
    "date": "10/2025",
    "github_url": "https://github.com/vinhdo281/bot1",
    "blog_url": null,
    "title_en": "ROS 2 Differential Drive Mobile Robot Simulation Stack",
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
        "label_en": "Odometry Rate",
        "value": "100 Hz"
      },
      {
        "label_en": "2D LiDAR Telemetry",
        "value": "30 Hz / 360 deg"
      },
      {
        "label_en": "Odometry Drift Error",
        "value": "< 1.8%"
      },
      {
        "label_en": "ROS 2 Distribution",
        "value": "Humble Hawksbill"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Deliver an open-source digital twin of a differential drive AMR on ROS 2 Humble and Gazebo, providing standard ros2_control interfaces for Nav2 autonomous mapping and navigation.</p>\n    ",
    "architecture_en": "\n      <h4>Kinematics & Frames:</h4>\n      <p>Differential equations with $r = 0.033\\text{m}, L = 0.160\\text{m}$. Coordinate transform: <code>map -> odom -> base_footprint -> base_link -> laser_frame</code>.</p>\n    ",
    "guide_en": "\n      <h4>Build & Run:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>cd ~/ros2_ws/src && git clone https://github.com/vinhdo281/bot1.git\ncd ~/ros2_ws && colcon build --symlink-install --packages-select bot1\nsource install/setup.bash\nros2 launch bot1 launch_sim.launch.py</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>100 Hz odometry stream, 30 Hz LiDAR scan rate, &lt; 1.8% closed-loop positional drift.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>Launch Script Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code># Robot State Publisher & Gazebo Spawner Integration\nspawn_entity = Node(package='gazebo_ros', executable='spawn_entity.py',\n                    arguments=['-topic', 'robot_description', '-entity', 'bot1_robot'])</code></pre>\n      </div>\n    "
  },
  {
    "id": "carcounter-yolo",
    "category": "vision",
    "category_en": "Computer Vision & AI",
    "badge": "VISION // YOLO11 // KALMAN SORT",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/CarCounterYOLO",
    "blog_url": null,
    "title_en": "Real-time Highway Vehicle Tracking & Counting System",
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
        "label_en": "Inference Throughput",
        "value": "55-60 FPS"
      },
      {
        "label_en": "Counting Accuracy",
        "value": "95.2%"
      },
      {
        "label_en": "State Space",
        "value": "8-DOF Vector"
      },
      {
        "label_en": "Hardware Acceleration",
        "value": "CUDA RTX Enabled"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Automated highway traffic stream monitoring: Multi-class detection, persistent tracking under occlusion, and virtual boundary counting without duplicate counts.</p>\n    ",
    "architecture_en": "\n      <h4>8-State Kalman SORT & Crossing Mathematics:</h4>\n      <p>State vector $\\mathbf{x} = [u, v, s, r, \\dot{u}, \\dot{v}, \\dot{s}, \\dot{r}]^T$ matched via IoU Hungarian association. Line crossing evaluated via 2D vector cross-product orientation test.</p>\n    ",
    "guide_en": "\n      <h4>Setup & Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/CarCounterYOLO.git\ncd CarCounterYOLO\npip install ultralytics opencv-python cvzone numpy filterpy\npython main</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>55-60 FPS on NVIDIA RTX GPU; 95.2% counting accuracy across dense traffic feeds.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>Detection Screenshot & Tracking Snippet:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"https://github.com/user-attachments/assets/e6613b97-6b2e-4efb-a40f-ec9dfe7336d1\" alt=\"Car Counter YOLO Demo\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n    "
  },
  {
    "id": "volumn-hand-control",
    "category": "vision",
    "category_en": "Computer Vision & AI",
    "badge": "HCI // MEDIAPIPE // AUDIO PYCAW",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/VolumnHandControl",
    "blog_url": null,
    "title_en": "Touchless Hand Gesture System Volume Controller",
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
        "label_en": "Response Latency",
        "value": "< 18 ms"
      },
      {
        "label_en": "Frame Rate",
        "value": "60 FPS (720p)"
      },
      {
        "label_en": "Volume Range",
        "value": "0 - 100% (-65 dB -> 0 dB)"
      },
      {
        "label_en": "Filter Model",
        "value": "EMA (alpha = 0.35)"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Hygienic, touchless master audio volume control mapping 3D pinch gesture telemetry to OS audio gain without physical hardware contact.</p>\n    ",
    "architecture_en": "\n      <h4>Kinematics & Audio Interfacing:</h4>\n      <p>Computes Euclidean distance between landmarks #4 and #8, applies EMA smoothing, and updates Windows Core Audio endpoint via PyCaw.</p>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>pip install opencv-python mediapipe numpy pycaw comtypes\npython VolumnHandControl</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>&lt; 18 ms latency, 60 FPS, 92% micro-tremor suppression via EMA filtering.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>Control Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>vol = np.interp(smooth_len, [50, 280], [minVol, maxVol])\nvolume.SetMasterVolumeLevel(vol, None)</code></pre>\n      </div>\n    "
  },
  {
    "id": "finger-counter",
    "category": "vision",
    "category_en": "Computer Vision & AI",
    "badge": "VISION // 3D LANDMARKS // OPENCV",
    "date": "09/2025",
    "github_url": "https://github.com/vinhdo281/FingerCounter",
    "blog_url": null,
    "title_en": "Real-Time Hand Landmark Estimation & Finger Counter",
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
        "label_en": "Processing Latency",
        "value": "~14 ms"
      },
      {
        "label_en": "Recognition Accuracy",
        "value": "98.5%"
      },
      {
        "label_en": "Frame Rate",
        "value": "60+ FPS"
      },
      {
        "label_en": "Hand Orientation",
        "value": "Tu Dong (Left/Right)"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Accurate topological classification of finger state from single-camera feeds for sign language preprocessing and gesture-based human-machine interfaces.</p>\n    ",
    "architecture_en": "\n      <h4>Kinematic State Rules:</h4>\n      <p>Handedness evaluated via lateral position of $MCP_5$ vs $MCP_{17}$. 4 long fingers classified open when $Y_{\\text{Tip}} < Y_{\\text{PIP}}$; thumb evaluated along lateral axis.</p>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>pip install opencv-python mediapipe numpy\npython main</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>98.5% accuracy across standard ranges with ~14ms per-frame latency.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>Classification Code Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>fingers = [1 if (lmList[4][1] > lmList[3][1] if isLeft else lmList[4][1] < lmList[3][1]) else 0]\nfor id in [8, 12, 16, 20]: fingers.append(1 if lmList[id][2] < lmList[id - 2][2] else 0)</code></pre>\n      </div>\n    "
  },
  {
    "id": "k-thuat-lap-trinh",
    "category": "vision",
    "category_en": "Computer Vision & AI",
    "badge": "AI // PYTORCH // IMAGE PROCESSING",
    "date": "01/2026",
    "github_url": "https://github.com/vinhdo281/K-thu-t-l-p-tr-nh",
    "blog_url": null,
    "title_en": "Digital Image Processing & CNN Object Classification",
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
        "label_en": "Validation Accuracy",
        "value": "92.8%"
      },
      {
        "label_en": "CPU Inference Latency",
        "value": "< 32 ms"
      },
      {
        "label_en": "Model Checkpoint",
        "value": "PyTorch (modnew.pt)"
      },
      {
        "label_en": "Academic Unit",
        "value": "DHBK Ha Noi (HUST)"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Evaluate hybrid vision pipelines coupling classical spatial domain filtering with deep convolutional networks for robust feature classification.</p>\n    ",
    "architecture_en": "\n      <h4>Two-Stage Architecture:</h4>\n      <p>Stage 1: Spatial 2D Gaussian blur and Otsu thresholding. Stage 2: 3-block CNN with Batch Normalization, Dropout ($p=0.4$), and Cross-Entropy loss.</p>\n    ",
    "guide_en": "\n      <h4>Setup:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>pip install torch torchvision opencv-python numpy matplotlib\npython -c \"import torch; print(torch.load('modnew.pt', map_location='cpu'))\"</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>92.8% validation accuracy; 31.5 ms CPU latency, 6.2 ms on CUDA GPU.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>PyTorch Evaluation Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>model = torch.load('modnew.pt', map_location='cpu')\nmodel.eval()\noutput = model(input_tensor)</code></pre>\n      </div>\n    "
  },
  {
    "id": "do-line",
    "category": "hardware",
    "category_en": "Embedded & Hardware",
    "badge": "HARDWARE // FSM & PID // ARDUINO",
    "date": "07/2025",
    "github_url": "https://github.com/vinhdo281/Do-Line",
    "blog_url": null,
    "title_en": "Autonomous High-Speed Line Follower Robot System",
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
        "label_en": "Max Cruising Speed",
        "value": "0.85 m/s"
      },
      {
        "label_en": "Sensor Array",
        "value": "5 Kênh Hong Ngoai (IR)"
      },
      {
        "label_en": "Telemetry Display",
        "value": "OLED SSD1306 128x64"
      },
      {
        "label_en": "Loop Frequency",
        "value": "100 Hz"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>High-speed autonomous line follower robot engineered for competition courses, handling 90-degree corners, cross-intersections, and deceleration zones.</p>\n    ",
    "architecture_en": "\n      <h4>Weighted Centroid & FSM:</h4>\n      <p>Error: $\\text{Error} = \\frac{-2 S_1 - S_2 + S_4 + 2 S_5}{\\sum S_i}$. FSM states: <code>START -> STRAIGHT1 -> TURN_90 -> CROSSING -> STOP</code> with reverse-torque dynamic braking.</p>\n    ",
    "guide_en": "\n      <h4>Flashing Firmware:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Do-Line.git\n# Open SampleCode1 in Arduino IDE -> Upload to Arduino Nano</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Hardware Verification:</h4>\n      <ul>\n        <li>0.85 m/s top cruising speed with reliable 90-degree cornering.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>Hardware Prototype & FSM Snippet:</h4>\n      <div style=\"text-align: center; margin: 1rem 0;\">\n        <img src=\"https://github.com/user-attachments/assets/35a75085-d8b3-47a1-9ed1-f26646a446c5\" alt=\"Robot Do-Line Hardware\" style=\"max-width: 100%; border-radius: 8px; border: 1px solid var(--border-color);\">\n      </div>\n    "
  },
  {
    "id": "xe-ua-2",
    "category": "hardware",
    "category_en": "Embedded & Hardware",
    "badge": "EMBEDDED // MICRO:BIT // MAKECODE",
    "date": "09/2021",
    "github_url": "https://github.com/vinhdo281/xe-ua-2",
    "blog_url": null,
    "title_en": "BBC Micro:bit STEM Racing Vehicle & Game Engine",
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
        "label_en": "MCU Architecture",
        "value": "Nordic nRF52833 (ARM Cortex-M4)"
      },
      {
        "label_en": "Display Matrix",
        "value": "Ma Tran LED 5x5 (30 FPS)"
      },
      {
        "label_en": "Language",
        "value": "Static TypeScript / MakeCode"
      },
      {
        "label_en": "Packaging Format",
        "value": "MakeCode PXT Extension"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Educational STEM embedded robotics package deployed on ARM Cortex-M4 micro:bit, coupling 5x5 LED sprite game dynamics with chassis driver extensions.</p>\n    ",
    "architecture_en": "\n      <h4>Event-Driven Architecture:</h4>\n      <p>Hardware button ISR handlers managing 5x5 coordinate sprite physics with collision trapping in Microsoft PXT runtime.</p>\n    ",
    "guide_en": "\n      <h4>Usage Instructions:</h4>\n      <p>Import extension URL <code>https://github.com/vinhdo281/xe-ua-2</code> into makecode.microbit.org and simulate or flash .hex via USB.</p>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>Fluid 30 FPS display; memory usage &lt; 128KB Flash, &lt; 16KB RAM.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>TypeScript Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>input.onButtonPressed(Button.A, () => {\n    if (player_car.get(LedSpriteProperty.X) > 0) player_car.change(LedSpriteProperty.X, -1)\n})</code></pre>\n      </div>\n    "
  },
  {
    "id": "checking-weather",
    "category": "software",
    "category_en": "Software & APIs",
    "badge": "DESKTOP // PYQT5 // REST API",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/Checking-Weather-using-API",
    "blog_url": null,
    "title_en": "Global Meteorological Telemetry Desktop Application",
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
        "label_en": "Query Round-trip",
        "value": "< 220 ms"
      },
      {
        "label_en": "UI Framework",
        "value": "PyQt5 (Qt Widgets)"
      },
      {
        "label_en": "API Provider",
        "value": "OpenWeatherMap REST API"
      },
      {
        "label_en": "Pattern",
        "value": "Model-View-Controller (MVC)"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>Native lightweight desktop weather utility delivering low-latency atmospheric queries (&lt; 220ms) with minimal memory footprint compared to browser engines.</p>\n    ",
    "architecture_en": "\n      <h4>MVC Architecture:</h4>\n      <p>Event-driven Qt View coupled with asynchronous RESTful controller parsing JSON payload schemas with HTTP fault handling.</p>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>pip install PyQt5 requests\npython main</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Benchmarks:</h4>\n      <ul>\n        <li>&lt; 220 ms query round-trip; &lt; 35 MB memory footprint.</li>\n      </ul>\n    ",
    "demo_en": "\n      <h4>API Request Snippet:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>res = requests.get(f\"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric\")\nif res.status_code == 200:\n    self.temp_label.setText(f\"{res.json()['main']['temp']} °C\")</code></pre>\n      </div>\n    "
  },
  {
    "id": "python-collection",
    "category": "software",
    "category_en": "Software & APIs",
    "badge": "ALGORITHMS // TOOLS // PYTHON SUITE",
    "date": "08/2025",
    "github_url": "https://github.com/vinhdo281/Python",
    "blog_url": null,
    "title_en": "Python Algorithmic Tools & Application Suite",
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
        "label_en": "Sub-projects",
        "value": "5 Du An Doc Lap"
      },
      {
        "label_en": "Dependencies",
        "value": "Khong (Zero-Dependency)"
      },
      {
        "label_en": "Cipher Key Space",
        "value": "94! ≈ 1.08 × 10^146"
      },
      {
        "label_en": "Code Standard",
        "value": "PEP 8 Clean Code"
      }
    ],
    "overview_en": "\n      <h4>1. Technical Scope</h4>\n      <p>5 self-contained Python applications demonstrating software design patterns, cryptographic transposition, RESTful networking, and monotonic clock telemetry.</p>\n    ",
    "architecture_en": "\n      <h4>Algorithmic Mechanics:</h4>\n      <p>Monoalphabetic cipher mapping over 94-character alphabet ($94! \\approx 1.08 \\times 10^{146}$ keys). Monotonic timer loop using <code>time.perf_counter()</code>.</p>\n    ",
    "guide_en": "\n      <h4>Execution:</h4>\n      <div class=\"code-terminal\">\n        <pre><code>git clone https://github.com/vinhdo281/Python.git\ncd \"Python/Simple Encryption\" && python main.py</code></pre>\n      </div>\n    ",
    "results_en": "\n      <h4>Highlights:</h4>\n      <ul>\n        <li>Pure standard library implementation with zero external dependencies, compliant with PEP 8.</li>\n      </ul>\n    ",
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
