export const profile = {
  name: "Aman Sood",
  email: "amansood2005@gmail.com",
  phone: "+91 62802 73367",
  roles: ["Software Engineer", "AI Builder", "Edge Systems"],
  location: "Chandigarh, India",
  headline:
    "I'm a B.E. student at Punjab Engineering College building AI systems, data pipelines, and full-stack apps — from multi-agent copilots to edge telemetry. Open to roles where I can ship measurable outcomes.",
  resumePath: "/docs/resume.pdf",
  photo: "/images/aman.jpg",
  links: {
    email: "mailto:amansood2005@gmail.com",
    github: "https://github.com/amansood2005",
    linkedin: "https://www.linkedin.com/in/amansood2005/",
  },
};

export const about = [
  {
    title: "Past",
    body: "I got hooked on building things that move data and make decisions — first through coursework in DSA and OOP, then by wiring sensors, models, and interfaces into small end-to-end systems. That curiosity turned into projects spanning embedded telemetry, computer vision, and web apps.",
  },
  {
    title: "Present",
    body: "I'm studying Electrical Engineering at PEC Chandigarh (graduating 2027) and recently interned at Bharat Electronics Limited, where I analyzed operational energy datasets and supported ISO 50001 readiness. Alongside, I build AI-native prototypes — RAG pipelines, multi-agent workflows, and edge vision systems.",
  },
  {
    title: "Future",
    body: "I want to keep shipping AI-enabled products with strong engineering fundamentals — clear APIs, grounded evaluation, and systems that hold up beyond demos. I'm looking for opportunities where curiosity, ownership, and measurable impact matter.",
  },
];

export const skillGroups = [
  {
    title: "Languages & Frameworks",
    skills: [
      "Python",
      "C++",
      "Java",
      "JavaScript",
      "TypeScript",
      "FastAPI",
      "Node.js",
      "React",
      "REST APIs",
      "SQL",
    ],
  },
  {
    title: "AI, ML & Data",
    skills: [
      "RAG Pipelines",
      "LangChain",
      "LangGraph",
      "Prompt Engineering",
      "Pandas",
      "Scikit-learn",
      "OpenCV",
      "YOLOv8",
      "ChromaDB",
      "Statistical Analysis",
    ],
  },
  {
    title: "Systems & Tools",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Git",
      "Linux",
      "ESP32 / IoT",
      "DSA",
      "OOP",
      "CI/CD basics",
      "AWS fundamentals",
    ],
  },
];

export const projects = [
  {
    name: "CareCost Insights",
    subtitle: "Hospital Cost, Quality & Utilization Analytics",
    tech: ["Python", "Pandas", "Excel", "Streamlit", "SQL-ready"],
    description:
      "Analytics workflow over 2,400 synthetic hospital encounters across 4 facilities — peer cost benchmarks, LOS/readmission/quality KPIs, opportunity sizing, Excel workbook outputs, and an interactive Streamlit dashboard for stakeholder walkthroughs.",
    live: null,
    code: "https://github.com/amansood2005/CareCost-Insights",
    accent: "violet",
  },
  {
    name: "E32Log",
    subtitle: "Real-Time Vehicle Telemetry & OBD-II Logger",
    tech: ["C++", "Python", "ESP32", "OBD-II", "Embedded"],
    description:
      "Real-time telemetry pipeline ingesting 10+ vehicle parameters over OBD-II on ESP32 — RPM, speed, coolant temperature, fuel efficiency — with sub-second polling, wireless/local logging of 1000+ live records, and modular OOP design for low-latency acquisition.",
    live: null,
    code: "https://github.com/amansood2005/E32Log",
    accent: "amber",
  },
  {
    name: "Traffic Surveillance",
    subtitle: "Intelligent Traffic Monitoring System",
    tech: ["Python", "YOLOv8", "DeepSORT", "OpenCV", "Edge AI"],
    description:
      "Real-time traffic monitoring with YOLOv8 and DeepSORT for multi-vehicle detection/tracking, ROI-based counting, red-light violation logic, and ambulance-aware exceptions to cut false positives at the edge.",
    live: null,
    code: null,
    accent: "rose",
  },
  {
    name: "E-Commerce App",
    subtitle: "Full-Stack Storefront",
    tech: ["JavaScript", "HTML/CSS", "Node.js", "REST APIs", "Express"],
    description:
      "Responsive storefront with catalog, cart, and checkout flows — REST API integration, clean request/response handling, and performance-minded DOM updates.",
    live: "https://ecommerce-web-app-ebon.vercel.app",
    code: "https://github.com/amansood2005/ecommerce-web-app",
    accent: "mint",
  },
];

export const contactCards = [
  {
    title: "offer a role?",
    body: "I'm open to internships and early-career opportunities in software engineering, AI/ML, and data systems. If you have a challenging problem to solve, let's talk.",
  },
  {
    title: "connect?",
    body: "Always happy to meet fellow builders, researchers, and founders. Whether it's a quick chat about AI systems or swapping project ideas — reach out.",
  },
  {
    title: "build something?",
    body: "I like taking ideas from sketch to shipped prototype — agents, RAG, edge sensing, or full-stack apps. Let's make something useful together.",
  },
];

export const experience = {
  role: "Engineering Intern",
  company: "Bharat Electronics Limited (BEL)",
  dates: "Jan 2026 – May 2026",
  points: [
    "Analyzed operational datasets from substations, DG sets, and solar systems to surface anomalies and actionable insights.",
    "Built energy-data tracking workflows supporting ISO 50001 compliance readiness.",
    "Contributed to sustainability work recognized at the GreenTech Energy Awards.",
  ],
};

export const education = {
  school: "Punjab Engineering College (PEC), Chandigarh",
  degree: "B.E. in Electrical Engineering",
  dates: "Aug 2023 – Jun 2027",
  notes: "Focus: DSA, OOP, AI-enabled systems · Class 12: 85% · Class 10: 95%",
};
