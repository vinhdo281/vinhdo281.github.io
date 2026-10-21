// Search Index Data (English & German searchable items)
const SEARCH_DATA = [
  {
    title_en: "Curriculum Vitae & Technical Skills",
    title_de: "Lebenslauf & Technische Kompetenzen (CV)",
    category: "CV / Resume",
    url: "cv.html",
    keywords: "cv resume lebenslauf fähigkeiten kompetenzen ausbildung studium hust mechatronics pvgas uavcup pickleball self driving car drone smai esp32 fusion 360 siemens nx autocad kicad altium ielts c1 goethe b1"
  },
  {
    title_en: "Engineering Projects & Systems Portfolio",
    title_de: "Ingenieurprojekte & Systeme Portfolio",
    category: "Projects",
    url: "portfolio.html",
    keywords: "projects portfolio robot cascade pid fuzzy yolo sort ros2 mediapipe stm32 arduino makecode python"
  },
  {
    title_en: "Project: Single Unified Mamdani FIS Inverted Pendulum Controller in MuJoCo & Simulink",
    title_de: "Projekt: 16-Regeln Mamdani FIS Regler für Inverses Pendel in MuJoCo & Simulink",
    category: "Projects",
    url: "portfolio.html#fuzzy-controller",
    keywords: "fuzzy logic mamdani fis inverted pendulum mujoco simscape multibody simulink solidworks cart pole inverses pendel regler"
  },
  {
    title_en: "Project: Dual-Loop Cascade PID Controller for Two-Wheeled Self-Balancing Robot",
    title_de: "Projekt: Kaskadierter Zweikreis-PID-Regler für Zweirad-Balancierroboter",
    category: "Projects",
    url: "portfolio.html#cascade-pid",
    keywords: "cascade pid self balancing robot twsbr simulink matlab esp32 simplefoc kaskadierter pid zweirad"
  },
  {
    title_en: "Project: ROS 2 Differential Drive Mobile Robot Simulation Package (bot1)",
    title_de: "Projekt: ROS 2 Differential-Drive Mobiler Roboter Simulationspaket (bot1)",
    category: "Projects",
    url: "portfolio.html#bot1",
    keywords: "ros2 gazebo bot1 differential drive urdf xacro diff_drive_controller rviz2 amr agv mobile robot mobiler roboter simulation"
  },
  {
    title_en: "Project: Real-time Highway Vehicle Counter & Tracking System (YOLO + SORT)",
    title_de: "Projekt: Echtzeit-Fahrzeugzähl- und Trackingsystem für Autobahnen (YOLO + SORT)",
    category: "Projects",
    url: "portfolio.html#carcounter-yolo",
    keywords: "yolo car counter sort tracker kalman filter opencv deep learning highway traffic computer vision fahrzeugzähler echtzeit autobahn"
  },
  {
    title_en: "Project: Touchless Hand Gesture Volume Controller (MediaPipe & PyCaw)",
    title_de: "Projekt: Berührungslose Lautstärkeregelung per Handgesten (MediaPipe & PyCaw)",
    category: "Projects",
    url: "portfolio.html#volumn-hand-control",
    keywords: "volumn hand control mediapipe pycaw touchless hci opencv handgesten lautstärke"
  },
  {
    title_en: "Project: Real-Time Hand Landmark Estimation & Finger Counter (OpenCV & MediaPipe)",
    title_de: "Projekt: Echtzeit-Handlandmarken-Erkennung & Fingerzähler (OpenCV & MediaPipe)",
    category: "Projects",
    url: "portfolio.html#finger-counter",
    keywords: "finger counter mediapipe hands opencv gesture recognition hand landmarks fingerzähler echtzeit"
  },
  {
    title_en: "Project: Digital Image Processing & Deep Learning Object Classification (PyTorch)",
    title_de: "Projekt: Digitale Bildverarbeitung & Deep-Learning-Objektklassifikation (PyTorch)",
    category: "Projects",
    url: "portfolio.html#k-thuat-lap-trinh",
    keywords: "pytorch cnn modnew deep learning opencv hust bildverarbeitung klassifikation"
  },
  {
    title_en: "Project: Autonomous High-Speed Line Follower Robot (FSM & IR Sensor Array)",
    title_de: "Projekt: Autonomer Hochgeschwindigkeits-Linienfolgeroboter (FSM & IR-Sensor-Array)",
    category: "Projects",
    url: "portfolio.html#do-line",
    keywords: "do line line follower robot do line arduino fsm l298n oled ssd1306 ir sensor linienfolger autonom"
  },
  {
    title_en: "Project: BBC Micro:bit STEM Autonomous Racing Car & Game Controller (xe-ua-2)",
    title_de: "Projekt: BBC Micro:bit STEM Autonomes Rennauto & Game-Controller (xe-ua-2)",
    category: "Projects",
    url: "portfolio.html#xe-ua-2",
    keywords: "xe ua 2 microbit makecode stem typescript led matrix robot game rennauto controller"
  },
  {
    title_en: "Project: Global Weather Forecast Desktop GUI Application (PyQt5 & OpenWeatherMap)",
    title_de: "Projekt: Globale Wettervorhersage Desktop-GUI-Anwendung (PyQt5 & OpenWeatherMap)",
    category: "Projects",
    url: "portfolio.html#checking-weather",
    keywords: "weather app openweathermap pyqt5 api gui python wettervorhersage anwendung"
  },
  {
    title_en: "Project: Python Algorithmic Utilities & Interactive Mini-Projects Suite",
    title_de: "Projekt: Python Algorithmen-Utilities & Interaktive Mini-Projekte Suite",
    category: "Projects",
    url: "portfolio.html#python-collection",
    keywords: "python pokeapi pokemon finder encryption digital clock slot machine stopwatch algorithms algorithmen projekte"
  },
  {
    title_en: "Comprehensive A-to-Z Guide: Reinforcement Learning for Wheeled-Bipedal Robot on MuJoCo Physics & Stable-Baselines3",
    title_de: "Umfassender A–Z Leitfaden: Reinforcement Learning für radgetriebene zweibeinige Roboter mit MuJoCo Physics & Stable-Baselines3",
    category: "Blog",
    url: "posts/reinforcement-learning-wbr/",
    keywords: "reinforcement learning verstärkendes lernen rl ppo wheeled bipedal robot wbr zweibeiniger roboter mujoco physics stable baselines 3 sb3 vmc virtual model control reward shaping windows linux cuda gpu eval models"
  },
  {
    title_en: "A-to-Z Guide: Design a Fuzzy Logic Controller for Inverted Pendulum on Simscape Multibody & Simulink",
    title_de: "A–Z Leitfaden: Entwurf eines Fuzzy-Logic-Reglers für ein inverses Pendel mit Simscape Multibody & Simulink",
    category: "Blog",
    url: "posts/fuzzy-inverted-pendulum/",
    keywords: "fuzzy logic fuzzy regler inverses pendel inverted pendulum simscape multibody smimport mamdani 16 regeln xml simulink solidworks cart pole"
  }
];
