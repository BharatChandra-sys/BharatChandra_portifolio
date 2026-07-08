// JSON Resume - Standard resume format consumable by job platforms
// Spec: https://jsonresume.org/schema/

const BASE_URL = 'https://bharatchandra.me';

const resume = {
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "basics": {
    "name": "Bodapati Bharat Chandra",
    "label": "AI/ML Engineer",
    "image": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
    "email": "bc833498@gmail.com",
    "url": BASE_URL,
    "summary": "AI/ML Engineer and final-year CSE student at GITAM University Hyderabad. Building production AI systems at BHEL, leading backend & ML at GARI rocketry team, and co-founding Easify. Specialized in FastAPI, PyTorch, real-time systems, and explainable AI.",
    "location": {
      "city": "Hyderabad",
      "countryCode": "IN",
      "region": "Telangana"
    },
    "profiles": [
      {
        "network": "GitHub",
        "username": "BharatChandra-sys",
        "url": "https://github.com/BharatChandra-sys"
      },
      {
        "network": "LinkedIn",
        "username": "bharat-chandra-6b29283b1",
        "url": "https://www.linkedin.com/in/bharat-chandra-6b29283b1/"
      },
      {
        "network": "ORCID",
        "username": "0009-0004-4734-1635",
        "url": "https://orcid.org/0009-0004-4734-1635"
      }
    ]
  },
  "work": [
    {
      "name": "BHEL — Bharat Heavy Electricals Limited",
      "position": "AI/ML Engineering Intern",
      "url": "https://bhel.com",
      "startDate": "2026-05",
      "summary": "Building production AI systems at one of India's largest public sector enterprises. Fully on-premise LLM deployment with zero external API dependency.",
      "highlights": [
        "Built production-grade AI vendor compliance portal using FastAPI, Ollama, and PyMuPDF — runs fully on-premise",
        "Designed LLM-powered document extraction pipeline for tender analysis with no external API dependency",
        "Proposed turbine lifecycle optimisation system using LSTM autoencoders and physics-informed digital twin modelling for GM-level stakeholder review"
      ],
      "location": "Hyderabad, India"
    },
    {
      "name": "Easify — Pooling Service Platform",
      "position": "Co-Founder",
      "url": BASE_URL,
      "startDate": "2023",
      "summary": "Co-founded Easify, a smart pooling service platform connecting commuters for shared rides in Hyderabad.",
      "highlights": [
        "Architecting and building the full-stack pooling platform with real-time ride matching",
        "Designed backend API, database schema, and payment integration with Razorpay",
        "Leading product strategy, user onboarding, and go-to-market for Hyderabad launch"
      ],
      "location": "Hyderabad, India"
    },
    {
      "name": "GARI — GITAM Aerospace Rocketry Initiative",
      "position": "Backend & ML Lead",
      "url": BASE_URL,
      "startDate": "2026-02",
      "summary": "Leading the backend and ML stack for GITAM's rocketry team competing in the IN-SPACe national competition.",
      "highlights": [
        "Built CAN-7USAT rocket telemetry backend achieving sub-5ms end-to-end latency (target was 15ms)",
        "Engineered real-time WebSocket streaming pipeline for live ground station dashboards",
        "Developed GARI team website with React, canvas starfield, and SVG animations"
      ],
      "location": "GITAM University Hyderabad"
    },
    {
      "name": "Elevate Labs",
      "position": "AI/ML Intern",
      "url": "",
      "startDate": "2026-04",
      "endDate": "2026-05",
      "summary": "Applied ML internship focused on preprocessing, model training, evaluation, and deployment-oriented backend integrations.",
      "highlights": [
        "Applied ML: preprocessing, model training, evaluation and deployment-oriented backend integrations"
      ],
      "location": "Remote"
    }
  ],
  "education": [
    {
      "institution": "GITAM University Hyderabad",
      "url": "https://gitam.edu",
      "area": "Computer Science & Engineering",
      "studyType": "Bachelor of Technology",
      "startDate": "2023",
      "endDate": "2027",
      "score": "",
      "courses": []
    }
  ],
  "awards": [
    {
      "title": "Winner - AI Day Hackathon",
      "date": "2026-03",
      "awarder": "GITAM University × Kodryx AI",
      "summary": "Won for MedVision AI — Explainable diabetic ulcer detection system with Grad-CAM and SHAP"
    },
    {
      "title": "Winner - HackXplore",
      "date": "2026-04",
      "awarder": "IEEE-SSIT VJIT",
      "summary": "Won for FactCheck AI — Browser-based fake news analyzer with 90% accuracy"
    }
  ],
  "skills": [
    {
      "name": "Languages & Frameworks",
      "level": "Expert",
      "keywords": ["Python", "FastAPI", "PyTorch", "SQLAlchemy", "React", "TypeScript", "JavaScript"]
    },
    {
      "name": "ML & AI",
      "level": "Advanced",
      "keywords": ["MLflow", "SHAP", "Grad-CAM", "Scikit-learn", "DVC", "Ollama", "LM Studio"]
    },
    {
      "name": "Infrastructure & DevOps",
      "level": "Advanced",
      "keywords": ["Docker", "PostgreSQL", "WebSockets", "Prometheus", "Grafana", "Git"]
    },
    {
      "name": "Autonomous Systems",
      "level": "Advanced",
      "keywords": ["ROS2", "Kalman Filtering", "Sensor Fusion", "Real-time Telemetry", "RBAC", "JWT Auth"]
    }
  ],
  "languages": [
    {
      "language": "English",
      "fluency": "Native speaker"
    },
    {
      "language": "Hindi",
      "fluency": "Native speaker"
    },
    {
      "language": "Telugu",
      "fluency": "Native speaker"
    }
  ],
  "interests": [
    {
      "name": "Rocketry & Aerospace",
      "keywords": ["Telemetry Systems", "Flight Control", "Sensor Fusion"]
    },
    {
      "name": "Explainable AI",
      "keywords": ["Grad-CAM", "SHAP", "Model Interpretability"]
    },
    {
      "name": "Production Systems",
      "keywords": ["FastAPI", "WebSockets", "Real-time Systems"]
    }
  ],
  "projects": [
    {
      "name": "CAN-7USAT Ground Control Station",
      "description": "Real-time ground control station for IN-SPACe Model Rocketry Competition 2026. Sub-5ms end-to-end latency, Kalman filter sensor fusion, 6-state flight state machine.",
      "highlights": [
        "Achieved sub-5ms latency (target was 15ms)",
        "0% packet loss with 23/23 tests passing",
        "Real-time WebSocket broadcasting to React dashboard"
      ],
      "keywords": ["Python", "FastAPI", "WebSockets", "Kalman Filter", "PostgreSQL"],
      "startDate": "2026-02",
      "url": "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend",
      "roles": ["Backend Lead", "ML Engineer"],
      "type": "application"
    },
    {
      "name": "AUVBrain — Autonomous Underwater Vehicle",
      "description": "Full autonomous control stack for an underwater vehicle. Deterministic observe→decide→act agent loop with 4-DOF thruster control, offline LLM decision engine.",
      "highlights": [
        "Agent loop p95 latency: 0.84ms",
        "Offline LLM with rules-based fallback",
        "ROS2 integration for sensor fusion"
      ],
      "keywords": ["Python", "ROS2", "FastAPI", "Docker", "llama.cpp"],
      "startDate": "2026-01",
      "url": "https://github.com/BharatChandra-sys/AUVBrain",
      "type": "application"
    },
    {
      "name": "MedVision AI — Diabetic Ulcer Detection",
      "description": "Explainable AI system for diabetic ulcer risk detection. Grad-CAM heatmaps, SHAP values, MLflow tracking. Won AI Day Hackathon.",
      "highlights": [
        "Won GITAM × Kodryx AI Hackathon (March 2026)",
        "Explainable with Grad-CAM and SHAP",
        "MLflow + DVC for experiment tracking"
      ],
      "keywords": ["PyTorch", "Grad-CAM", "SHAP", "MLflow", "DVC", "FastAPI"],
      "startDate": "2026-03",
      "url": "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
      "type": "application"
    }
  ],
  "meta": {
    "canonical": `${BASE_URL}/resume.json`,
    "version": "v1.0.0",
    "lastModified": new Date().toISOString()
  }
};

export async function GET() {
  return new Response(JSON.stringify(resume, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
}
