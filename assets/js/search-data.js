// Search Index Data (Vietnamese, English & German searchable items)
const SEARCH_DATA = [
  {
    title_vi: "Hồ sơ cá nhân & Kỹ năng kỹ thuật (CV)",
    title_en: "Curriculum Vitae & Technical Skills",
    title_de: "Lebenslauf & Technische Kompetenzen (CV)",
    category: "CV / Hồ sơ",
    url: "cv.html",
    keywords: "cv resume lebenslauf fähigkeiten kompetenzen ausbildung studium hust mechatronics co dien tu kinh nghiem pvgas uavcup pickleball self driving car drone smai esp32 fusion 360 siemens nx autocad kicad altium ielts c1 goethe b1"
  },
  {
    title_vi: "Hệ Thống & Dự Án Kỹ Thuật (Project Matrix)",
    title_en: "Engineering Projects & Systems Portfolio",
    title_de: "Ingenieurprojekte & Systeme Portfolio",
    category: "Dự Án / Projects",
    url: "portfolio.html",
    keywords: "du an projects portfolio robot cascade pid fuzzy yolo sort ros2 mediapipe stm32 arduino makecode python"
  },
  {
    title_vi: "Dự án: Bộ Điều Khiển Mờ Mamdani 16 Luật Cho Con Lắc Ngược Trên Xe (MuJoCo & Simulink)",
    title_en: "Project: Single Unified Mamdani FIS Inverted Pendulum Controller in MuJoCo & Simulink",
    title_de: "Projekt: 16-Regeln Mamdani FIS Regler für Inverses Pendel in MuJoCo & Simulink",
    category: "Dự Án / Projects",
    url: "portfolio.html#fuzzy-controller",
    keywords: "fuzzy logic mamdani fis con lac nguoc inverted pendulum mujoco simscape multibody simulink solidworks cart pole inverses pendel regler"
  },
  {
    title_vi: "Dự án: Bộ Điều Khiển Phân Tầng Cascade PID Cho Robot Hai Bánh Tự Cân Bằng",
    title_en: "Project: Dual-Loop Cascade PID Controller for Two-Wheeled Self-Balancing Robot",
    title_de: "Projekt: Kaskadierter Zweikreis-PID-Regler für Zweirad-Balancierroboter",
    category: "Dự Án / Projects",
    url: "portfolio.html#cascade-pid",
    keywords: "cascade pid self balancing robot twsbr robot hai banh tu can bang simulink matlab esp32 simplefoc kaskadierter pid zweirad"
  },
  {
    title_vi: "Dự án: Gói Mô Phỏng Robot Di Động Bánh Vi Sai Trên ROS 2 & Gazebo (bot1)",
    title_en: "Project: ROS 2 Differential Drive Mobile Robot Simulation Package (bot1)",
    title_de: "Projekt: ROS 2 Differential-Drive Mobiler Roboter Simulationspaket (bot1)",
    category: "Dự Án / Projects",
    url: "portfolio.html#bot1",
    keywords: "ros2 gazebo bot1 differential drive urdf xacro diff_drive_controller rviz2 amr agv mobile robot mobiler roboter simulation"
  },
  {
    title_vi: "Dự án: Hệ Thống Đếm & Theo Dõi Phương Tiện Giao Thông Thời Gian Thực (YOLO + SORT)",
    title_en: "Project: Real-time Highway Vehicle Counter & Tracking System (YOLO + SORT)",
    title_de: "Projekt: Echtzeit-Fahrzeugzähl- und Trackingsystem für Autobahnen (YOLO + SORT)",
    category: "Dự Án / Projects",
    url: "portfolio.html#carcounter-yolo",
    keywords: "yolo car counter sort tracker kalman filter opencv deep learning dem xe highway traffic computer vision fahrzeugzähler echtzeit autobahn"
  },
  {
    title_vi: "Dự án: Điều Khiển Âm Lượng Máy Tính Không Chạm Bằng Cử Chỉ Bàn Tay (VolumnHandControl)",
    title_en: "Project: Touchless Hand Gesture Volume Controller (MediaPipe & PyCaw)",
    title_de: "Projekt: Berührungslose Lautstärkeregelung per Handgesten (MediaPipe & PyCaw)",
    category: "Dự Án / Projects",
    url: "portfolio.html#volumn-hand-control",
    keywords: "volumn hand control mediapipe pycaw touchless hci dieu khien am luong cu chi cu chi ban tay opencv handgesten lautstärke"
  },
  {
    title_vi: "Dự án: Đếm Số Ngón Tay Thời Gian Thực Qua Camera (FingerCounter)",
    title_en: "Project: Real-Time Hand Landmark Estimation & Finger Counter (OpenCV & MediaPipe)",
    title_de: "Projekt: Echtzeit-Handlandmarken-Erkennung & Fingerzähler (OpenCV & MediaPipe)",
    category: "Dự Án / Projects",
    url: "portfolio.html#finger-counter",
    keywords: "finger counter dem ngon tay mediapipe hands opencv gesture recognition hand landmarks fingerzähler echtzeit"
  },
  {
    title_vi: "Dự án: Xử Lý Ảnh Số & Phân Loại Đối Tượng Bằng Mô Hình Học Sâu PyTorch",
    title_en: "Project: Digital Image Processing & Deep Learning Object Classification (PyTorch)",
    title_de: "Projekt: Digitale Bildverarbeitung & Deep-Learning-Objektklassifikation (PyTorch)",
    category: "Dự Án / Projects",
    url: "portfolio.html#k-thuat-lap-trinh",
    keywords: "ky thuat lap trinh xu ly anh xla pytorch cnn modnew deep learning opencv hust bildverarbeitung klassifikation"
  },
  {
    title_vi: "Dự án: Robot Dò Line Tự Hành Tốc Độ Cao (Do-Line)",
    title_en: "Project: Autonomous High-Speed Line Follower Robot (FSM & IR Sensor Array)",
    title_de: "Projekt: Autonomer Hochgeschwindigkeits-Linienfolgeroboter (FSM & IR-Sensor-Array)",
    category: "Dự Án / Projects",
    url: "portfolio.html#do-line",
    keywords: "do line line follower robot do line arduino fsm l298n oled ssd1306 ir sensor linienfolger autonom"
  },
  {
    title_vi: "Dự án: Xe Đua Thông Minh STEM Robotics Trên Vi Điều Khiển BBC Micro:bit (xe-ua-2)",
    title_en: "Project: BBC Micro:bit STEM Autonomous Racing Car & Game Controller (xe-ua-2)",
    title_de: "Projekt: BBC Micro:bit STEM Autonomes Rennauto & Game-Controller (xe-ua-2)",
    category: "Dự Án / Projects",
    url: "portfolio.html#xe-ua-2",
    keywords: "xe ua 2 microbit makecode stem typescript led matrix robot xe dua game rennauto controller"
  },
  {
    title_vi: "Dự án: Ứng Dụng Tra Cứu Thời Tiết Toàn Cầu Giao Diện PyQt5",
    title_en: "Project: Global Weather Forecast Desktop GUI Application (PyQt5 & OpenWeatherMap)",
    title_de: "Projekt: Globale Wettervorhersage Desktop-GUI-Anwendung (PyQt5 & OpenWeatherMap)",
    category: "Dự Án / Projects",
    url: "portfolio.html#checking-weather",
    keywords: "weather app openweathermap pyqt5 thoi tiet api gui python wettervorhersage anwendung"
  },
  {
    title_vi: "Dự án: Tuyển Tập Thuật Toán & Ứng Dụng Mini-Projects Bằng Python",
    title_en: "Project: Python Algorithmic Utilities & Interactive Mini-Projects Suite",
    title_de: "Projekt: Python Algorithmen-Utilities & Interaktive Mini-Projekte Suite",
    category: "Dự Án / Projects",
    url: "portfolio.html#python-collection",
    keywords: "python pokeapi pokemon finder encryption digital clock slot machine stopwatch algorithms algorithmen projekte"
  },
  {
    title_vi: "Hướng Dẫn Toàn Diện Từ A–Z: Học Tăng Cường (Reinforcement Learning) Cho Robot Chân - Bánh Xe Trên MuJoCo Physics & Stable-Baselines3",
    title_en: "Comprehensive A-to-Z Guide: Reinforcement Learning for Wheeled-Bipedal Robot on MuJoCo Physics & Stable-Baselines3",
    title_de: "Umfassender A–Z Leitfaden: Reinforcement Learning für radgetriebene zweibeinige Roboter mit MuJoCo Physics & Stable-Baselines3",
    category: "Bài Viết / Blog",
    url: "posts/reinforcement-learning-wbr/",
    keywords: "reinforcement learning verstärkendes lernen rl ppo wheeled bipedal robot wbr zweibeiniger roboter mujoco physics stable baselines 3 sb3 vmc virtual model control reward shaping windows linux cuda gpu eval models"
  },
  {
    title_vi: "Hướng Dẫn Từ A–Z: Thiết Kế Bộ Điều Khiển Mờ (Fuzzy Logic) Cho Con Lắc Ngược Trên Simscape Multibody & Simulink",
    title_en: "A-to-Z Guide: Design a Fuzzy Logic Controller for Inverted Pendulum on Simscape Multibody & Simulink",
    title_de: "A–Z Leitfaden: Entwurf eines Fuzzy-Logic-Reglers für ein inverses Pendel mit Simscape Multibody & Simulink",
    category: "Bài Viết / Blog",
    url: "posts/fuzzy-inverted-pendulum/",
    keywords: "fuzzy logic fuzzy regler mờ inverses pendel inverted pendulum con lac nguoc simscape multibody smimport mamdani 16 regeln luat xml simulink solidworks cart pole"
  }
];
