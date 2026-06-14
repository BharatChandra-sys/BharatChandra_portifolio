import { FaDiscord, FaGithub, FaLinkedin, FaMapPin } from "react-icons/fa";
import { HiCode, HiCube, HiDatabase, HiMail, HiBriefcase, HiChip } from "react-icons/hi";
import { SiPytorch, SiFastapi, SiDocker, SiPostgresql } from "react-icons/si";

export const config = {
    developer: {
        name: "Bharat Chandra",
    },
    social: {
        github: "BharatChandra-sys",
        discord: "#"
    },
    NAV_ITEMS: [
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ],
    recentTracks: false,
    projects: [
        {
            id: 1,
            title: "CAN-7USAT Ground Control Station",
            description: "Real-time ground control station for the IN-SPACe Model Rocketry Competition 2026. Decodes 46-byte binary telemetry from a Teensy 4.1 flight computer over 900 MHz XBee, Kalman filter sensor fusion, 6-state flight state machine, WebSocket broadcast to React dashboard. End-to-end latency under 5ms — target was 15ms.",
            image: "/projects/project-1.webp",
            technologies: ["Python", "FastAPI", "WebSockets", "Kalman Filter", "PostgreSQL", "React", "TypeScript"],
            github: "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend",
            demo: "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend"
        },
        {
            id: 2,
            title: "AUVBrain — Autonomous Underwater Vehicle",
            description: "Full autonomous control stack for an underwater vehicle. Deterministic observe → decide → act agent loop with 4-DOF thruster control, safety monitor, offline LLM decision engine with rules-based fallback. Agent loop p95 latency: 0.84ms.",
            image: "/projects/project-2.webp",
            technologies: ["Python", "FastAPI", "ROS2", "Docker", "asyncio", "llama.cpp"],
            github: "https://github.com/BharatChandra-sys/AUVBrain",
            demo: "https://github.com/BharatChandra-sys/AUVBrain"
        },
        {
            id: 3,
            title: "MedVision AI — Diabetic Ulcer XAI",
            description: "Medical image classification + clinical data to estimate ulcer risk with full explainability. Grad-CAM heatmaps + SHAP values + MLflow experiment tracking + DVC versioning. Won AI Day Hackathon — GITAM × Kodryx AI, March 2026.",
            image: "/projects/project-3.webp",
            technologies: ["PyTorch", "Grad-CAM", "SHAP", "MLflow", "DVC", "FastAPI", "Docker"],
            github: "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
            demo: "https://diabetic-ulcer-ai-system.vercel.app"
        },
        {
            id: 4,
            title: "FactCheck AI — Fake News Analyzer",
            description: "Browser-based fake news analyzer. Scores news credibility in one click — Logistic Regression on 10,000+ labeled samples, sub-second response, LLM reasoning layer for verdict explanations. 90% validation accuracy. Won HackXplore — IEEE-SSIT VJIT, April 2026.",
            image: "/projects/project-4.webp",
            technologies: ["FastAPI", "Chrome Extension API", "TF-IDF", "Logistic Regression", "LLM"],
            github: "https://github.com/BharatChandra-sys/FactCheckAI",
            demo: "https://github.com/BharatChandra-sys/FactCheckAI"
        },
        {
            id: 5,
            title: "Rocket Simulator",
            description: "Physics-based rocket flight simulator modelling thrust, drag, gravity and multi-stage separation. Outputs altitude, velocity and acceleration curves. Built for GARI rocketry trajectory analysis and pre-launch verification.",
            image: "/projects/project-5.webp",
            technologies: ["Python", "NumPy", "SciPy", "Matplotlib", "Physics Simulation"],
            github: "https://github.com/BharatChandra-sys/rocket-simulator",
            demo: "https://github.com/BharatChandra-sys/rocket-simulator"
        },
        {
            id: 6,
            title: "Email Automation for Forms",
            description: "Automated email pipeline triggered by form submissions. FastAPI backend, SMTP integration, Jinja2 template engine, and queue-based delivery with retry logic. Handles bulk personalised emails reliably.",
            image: "/projects/project-5.webp",
            technologies: ["FastAPI", "SMTP", "Jinja2", "Queue", "Python"],
            github: "https://github.com/BharatChandra-sys/Email-Automation-for-Form",
            demo: "https://github.com/BharatChandra-sys/Email-Automation-for-Form"
        }
    ],
    skills: [
        {
            title: "Languages & Frameworks",
            icon: <HiCode />,
            description: "Core programming & backend",
            bgClass: "bg-blue-500/10",
            iconClass: "text-blue-500",
            skills: [
                { name: "Python", level: "Expert", hot: true },
                { name: "FastAPI", level: "Expert", hot: true },
                { name: "PyTorch", level: "Advanced", hot: true },
                { name: "SQLAlchemy", level: "Advanced" },
                { name: "React", level: "Advanced" },
                { name: "TypeScript", level: "Intermediate" },
                { name: "JavaScript", level: "Advanced" },
            ]
        },
        {
            title: "ML & AI",
            icon: <HiChip />,
            description: "Machine learning & explainability",
            bgClass: "bg-purple-500/10",
            iconClass: "text-purple-500",
            skills: [
                { name: "MLflow", level: "Advanced", hot: true },
                { name: "SHAP", level: "Advanced" },
                { name: "Grad-CAM", level: "Advanced" },
                { name: "Scikit-learn", level: "Advanced" },
                { name: "DVC", level: "Intermediate" },
                { name: "Ollama / LM Studio", level: "Advanced", hot: true },
            ]
        },
        {
            title: "Infrastructure & DevOps",
            icon: <HiDatabase />,
            description: "Databases, containers & monitoring",
            bgClass: "bg-emerald-500/10",
            iconClass: "text-emerald-500",
            skills: [
                { name: "Docker", level: "Advanced", hot: true },
                { name: "PostgreSQL", level: "Advanced" },
                { name: "WebSockets", level: "Expert" },
                { name: "Prometheus", level: "Intermediate" },
                { name: "Grafana", level: "Intermediate" },
                { name: "Git / GitHub", level: "Expert" },
            ]
        },
        {
            title: "Autonomous Systems",
            icon: <HiCube />,
            description: "Rocketry, AUV & real-time control",
            bgClass: "bg-orange-500/10",
            iconClass: "text-orange-500",
            skills: [
                { name: "ROS2", level: "Intermediate", hot: true },
                { name: "Kalman Filtering", level: "Advanced" },
                { name: "Sensor Fusion", level: "Advanced" },
                { name: "Real-time Telemetry", level: "Expert", hot: true },
                { name: "RBAC / JWT Auth", level: "Advanced" },
            ]
        }
    ],
    experiences: [
        {
            position: "AI/ML Engineering Intern",
            company: "BHEL — Bharat Heavy Electricals Limited",
            period: "June 2025 – Present",
            location: "Hyderabad, India",
            description: "Building production AI systems at one of India's largest public sector enterprises. Fully on-premise LLM deployment with zero external API dependency.",
            responsibilities: [
                "Built production-grade AI vendor compliance portal using FastAPI, Ollama, and PyMuPDF — runs fully on-premise",
                "Designed LLM-powered document extraction pipeline for tender analysis with no external API dependency",
                "Proposed turbine lifecycle optimisation system using LSTM autoencoders and physics-informed digital twin modelling for GM-level stakeholder review"
            ],
            technologies: ["FastAPI", "Ollama", "PyMuPDF", "Streamlit", "SQLite", "LSTM", "Python"]
        },
        {
            position: "Co-Founder",
            company: "Easify — Pooling Service Platform",
            period: "2025 – Present",
            location: "Hyderabad, India",
            description: "Co-founded Easify, a smart pooling service platform connecting commuters for shared rides. Building the full-stack platform from the ground up.",
            responsibilities: [
                "Architecting and building the full-stack pooling platform with real-time ride matching",
                "Designing the backend API, database schema, and payment integration",
                "Leading product strategy, user onboarding, and go-to-market for Hyderabad launch"
            ],
            technologies: ["FastAPI", "PostgreSQL", "React", "WebSockets", "JWT", "Razorpay"]
        },
        {
            position: "Backend & ML Lead",
            company: "GARI — GITAM Aerospace Rocketry Initiative",
            period: "2023 – Present",
            location: "GITAM University Hyderabad",
            description: "Leading the backend and ML stack for GITAM's rocketry team competing in the IN-SPACe national competition. Built the entire telemetry pipeline from scratch.",
            responsibilities: [
                "Built CAN-7USAT rocket telemetry backend achieving sub-5ms end-to-end latency (target was 15ms)",
                "Engineered real-time WebSocket streaming pipeline for live ground station dashboards",
                "Developed the GARI team website with React, canvas starfield, and SVG animations"
            ],
            technologies: ["FastAPI", "WebSockets", "React", "PostgreSQL", "Kalman Filter", "TypeScript"]
        },
        {
            position: "AI/ML Intern",
            company: "Elevate Labs",
            period: "Apr 2026 – May 2026",
            location: "Remote",
            description: "Applied ML internship focused on preprocessing, model training, evaluation, and deployment-oriented backend integrations.",
            responsibilities: [
                "Applied ML: preprocessing, model training, evaluation and deployment-oriented backend integrations"
            ],
            technologies: ["Python", "ML", "FastAPI", "Data Preprocessing"]
        }
    ],
    contactInfo: [
        {
            icon: <FaGithub className="w-5 h-5" />,
            label: "GitHub",
            value: "@BharatChandra-sys",
            link: "https://github.com/BharatChandra-sys"
        },
        {
            icon: <FaLinkedin className="w-5 h-5" />,
            label: "LinkedIn",
            value: "bharat-chandra-6b29283b1",
            link: "https://www.linkedin.com/in/bharat-chandra-6b29283b1/"
        },
        {
            icon: <HiMail className="w-5 h-5" />,
            label: "Email",
            value: "bc833498@gmail.com",
            link: "mailto:bc833498@gmail.com"
        },
        {
            icon: <FaMapPin className="w-5 h-5" />,
            label: "Location",
            value: "Hyderabad / Vijayawada, India",
            link: null
        }
    ]
}
