import React from 'react'
import Image from 'next/image'
import HeroSection from './components/HeroSection'
import GithubProjects from './components/GithubProjects'
import SkillsSection from './components/Skills'
import ExperienceSection from './components/Experience'
import FeaturedProjects from './components/FeaturedProjects'
import Results from './components/Results'
import Certifications from './components/Certifications'
import LatestWriting from './components/LatestWriting'
import { getPinnedRepos } from '@/lib/github'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import ScrollProgress from '@/components/ui/scroll-progress'
import Link from 'next/link'
import { HiArrowRight, HiDownload, HiMail } from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'

const BASE = 'https://bharatchandra.me';

// ── Schema: FAQPage ────────────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Bodapati Bharat Chandra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra (also known as Bharat Chandra) is an AI/ML engineer, full-stack developer, and final-year Computer Science & Engineering student at GITAM University Hyderabad. He is currently a Full-Stack Engineering Intern at CardioPulmo AI, an AI/ML Engineering Intern at BHEL, Ground Station & Software Lead at GARI (gari.live) — GITAM's nationally-selected aerospace team competing in IN-SPACe CAN-7USAT 2026, and co-founder of Easify. He has shipped production systems for clients including Vijetha Digital (vijethadigital.com) and Deepthi Hospitals (deepthihospitals.vercel.app).",
      },
    },
    {
      "@type": "Question",
      "name": "What projects has Bodapati Bharat Chandra built?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra has built: CAN-7USAT rocket telemetry backend (sub-5ms latency, IN-SPACe 2026), AUVBrain autonomous underwater vehicle control stack (0.84ms agent loop), Vijetha Digital full-stack e-commerce platform live at vijethadigital.com (for a printing business whose customers include Samsung, Microsoft, Jio and Airtel), Deepthi Hospitals management system (live, three-portal RBAC at deepthihospitals.vercel.app), MedVision AI for diabetic ulcer detection with Grad-CAM and SHAP, Truvanta AI misinformation detection system (90% accuracy, HackXplore winner), Likhitex, a private collaborative LaTeX editor, and the GARI website at gari.live.",
      },
    },
    {
      "@type": "Question",
      "name": "What is Bharat Chandra studying?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra is a final-year B.Tech Computer Science & Engineering student at GITAM University Hyderabad, graduating in 2027.",
      },
    },
    {
      "@type": "Question",
      "name": "Where does Bharat Chandra work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra is a Full-Stack Engineering Intern at CardioPulmo AI (remote) and an AI/ML Engineering Intern at BHEL (Bharat Heavy Electricals Limited) in Hyderabad, building an on-premise AI vendor compliance portal. He is also the Ground Station & Software Lead for GARI's CanSat team and co-founder of Easify.",
      },
    },
    {
      "@type": "Question",
      "name": "How to contact Bodapati Bharat Chandra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact Bodapati Bharat Chandra at bc833498@gmail.com or through the contact form at bharatchandra.me/contact. He is open to AI/ML internships, full-time roles starting 2027, and project collaborations.",
      },
    },
    {
      "@type": "Question",
      "name": "What is Bharat Chandra's GitHub?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra's GitHub username is BharatChandra-sys. Profile: github.com/BharatChandra-sys — includes CAN-7USAT, AUVBrain, Vijetha Digital, hospital-management-platform, MedVision AI, TruvantaAI, and more. Also on Medium: medium.com/@bodapatibharatchandra and Wellfound: wellfound.com/u/bodapati-bharat-chandra.",
      },
    },
    // Trend 2: Branded search — these questions mirror real "Bharat Chandra + keyword"
    // searches. FAQ schema gives them a chance to appear as rich results.
    {
      "@type": "Question",
      "name": "Does Bharat Chandra have a blog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Bodapati Bharat Chandra writes at bharatchandra.me/blog. He publishes technical posts from direct lived experience — not theory. Current articles cover building a sub-5ms rocket telemetry system for IN-SPACe 2026, deploying an on-premise LLM at BHEL with no external APIs, building the Likhitex LaTeX editor and the GARI website, and co-founding Easify, a ride-pooling startup in Hyderabad.",
      },
    },
    {
      "@type": "Question",
      "name": "What has Bharat Chandra won?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra has won two hackathons in 2026: the AI Day Hackathon organised by GITAM University and Kodryx AI (March 2026) for MedVision AI, an explainable AI system for diabetic ulcer detection; and HackXplore organised by IEEE-SSIT VJIT (April 2026) for Truvanta AI, a misinformation detection system with 90% accuracy.",
      },
    },
    {
      "@type": "Question",
      "name": "What is Bharat Chandra's LinkedIn?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra's LinkedIn profile is at linkedin.com/in/bharat-chandra-bodapati/. He is open to AI/ML internships, full-time engineering roles starting 2027, and project collaborations.",
      },
    },
  ],
};

// ── Schema: ProfilePage ────────────────────────────────────────────────────────
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${BASE}/#profilepage`,
  "url": BASE,
  "name": "Bodapati Bharat Chandra — Official Portfolio & Primary Web Presence",
  "dateCreated": "2026-06-01T00:00:00Z",
  "inLanguage": "en-IN",
  // isPartOf connects this ProfilePage to the WebSite entity — reinforces domain ownership
  "isPartOf": {
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    "url": BASE,
    "name": "Bodapati Bharat Chandra",
  },
  "mainEntity": {
    "@type": "Person",
    "@id": `${BASE}/#person`,
    "name": "Bodapati Bharat Chandra",
    "alternateName": "Bharat Chandra",
    "identifier": "BharatChandra-sys",
    "description": "AI/ML Engineer and final-year CSE student at GITAM University Hyderabad.",
    "disambiguatingDescription": "AI/ML Engineering Intern at BHEL, Backend & ML Lead at GARI rocketry initiative, co-founder of Easify. Not the cricketer or the JEE student sharing the name.",
    "image": [
      {
        "@type": "ImageObject",
        "url": `${BASE}/bodapati-bharat-chandra.jpg`,
        "caption": "Bodapati Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad",
        "width": 896,
        "height": 1195,
      },
      {
        "@type": "ImageObject",
        "url": `${BASE}/bodapati-bharat-chandra-2.jpg`,
        "caption": "Bodapati Bharat Chandra — Co-founder of Easify, Hyderabad",
        "width": 562,
        "height": 1000,
      },
    ],
    // sameAs lists LinkedIn/GitHub as affiliated profiles, but mainEntityOfPage
    // on the Person schema (in layout.js) declares bharatchandra.me as PRIMARY
    "sameAs": [
      "https://github.com/BharatChandra-sys",
      "https://www.linkedin.com/in/bharat-chandra-bodapati/",
      "https://orcid.org/0009-0004-4734-1635",
    ],
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE
      }
    ]
  }
};

// ── Schema: ItemList of Projects ───────────────────────────────────────────────
const projectsListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Projects by Bodapati Bharat Chandra",
  "description": "Production software projects built by Bodapati Bharat Chandra (Bharat Chandra)",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend",
        "name": "CAN-7USAT Ground Control Station",
        "description": "Real-time rocket telemetry backend for IN-SPACe Model Rocketry Competition 2026. Sub-5ms end-to-end latency, Kalman filter sensor fusion, 6-state flight state machine.",
        "codeRepository": "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend",
        "url": "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend",
        "programmingLanguage": ["Python", "TypeScript"],
        "author": {
          "@type": "Person",
          "name": "Bodapati Bharat Chandra",
          "@id": `${BASE}/#person`
        },
        "dateCreated": "2025-10-15",
        "dateModified": "2026-05-20",
        "datePublished": "2025-11-01",
        "license": "https://opensource.org/licenses/MIT",
        "runtimePlatform": "Python 3.11+",
        "keywords": "rocketry, telemetry, FastAPI, websockets, Kalman filter"
      },
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/BharatChandra-sys/AUVBrain",
        "name": "AUVBrain — Autonomous Underwater Vehicle Control Stack",
        "description": "Full autonomous control stack for an underwater vehicle. 0.84ms p95 agent loop latency. Offline LLM decision engine with rules-based fallback.",
        "codeRepository": "https://github.com/BharatChandra-sys/AUVBrain",
        "url": "https://github.com/BharatChandra-sys/AUVBrain",
        "programmingLanguage": ["Python"],
        "author": {
          "@type": "Person",
          "name": "Bodapati Bharat Chandra",
          "@id": `${BASE}/#person`
        },
        "dateCreated": "2025-08-10",
        "dateModified": "2026-04-15",
        "datePublished": "2025-09-01",
        "license": "https://opensource.org/licenses/MIT",
        "runtimePlatform": "Python 3.10+, ROS2",
        "keywords": "autonomous underwater vehicle, AUV, control systems, LLM, robotics"
      },
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "SoftwareSourceCode",
        "@id": "https://deepthihospitals.vercel.app",
        "name": "Deepthi Hospitals — Hospital Management System",
        "description": "Full-stack hospital management platform live in production. Appointment booking, doctor management, department routing, patient records, emergency triage, and staff portal.",
        "codeRepository": "https://github.com/BharatChandra-sys",
        "url": "https://deepthihospitals.vercel.app",
        "programmingLanguage": ["TypeScript", "JavaScript"],
        "author": {
          "@type": "Person",
          "name": "Bodapati Bharat Chandra",
          "@id": `${BASE}/#person`
        },
        "dateCreated": "2026-06-01",
        "dateModified": "2026-07-01",
        "datePublished": "2026-07-01",
        "license": "https://opensource.org/licenses/MIT",
        "runtimePlatform": "Next.js, Vercel",
        "keywords": "hospital management system, Next.js, React, healthcare, appointment booking"
      },
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
        "name": "MedVision AI — Diabetic Ulcer Detection",
        "description": "Explainable AI system for diabetic ulcer risk detection. Grad-CAM heatmaps, SHAP values, MLflow tracking. Won AI Day Hackathon GITAM × Kodryx AI 2026.",
        "codeRepository": "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
        "url": "https://dfuai.vercel.app",
        "programmingLanguage": ["Python"],
        "author": {
          "@type": "Person",
          "name": "Bodapati Bharat Chandra",
          "@id": `${BASE}/#person`
        },
        "dateCreated": "2026-02-10",
        "dateModified": "2026-03-25",
        "datePublished": "2026-03-15",
        "license": "https://opensource.org/licenses/MIT",
        "runtimePlatform": "Python 3.10+",
        "keywords": "AI, machine learning, medical imaging, explainable AI, Grad-CAM, SHAP"
      },
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/BharatChandra-sys/TruvantaAI",
        "name": "Truvanta AI — Real-Time Misinformation Detection",
        "description": "Browser extension for real-time news credibility scoring. 90% accuracy. Won HackXplore IEEE-SSIT VJIT April 2026.",
        "codeRepository": "https://github.com/BharatChandra-sys/TruvantaAI",
        "url": "https://github.com/BharatChandra-sys/TruvantaAI",
        "programmingLanguage": ["Python"],
        "author": {
          "@type": "Person",
          "name": "Bodapati Bharat Chandra",
          "@id": `${BASE}/#person`
        },
        "dateCreated": "2026-03-20",
        "dateModified": "2026-04-30",
        "datePublished": "2026-04-15",
        "license": "https://opensource.org/licenses/MIT",
        "runtimePlatform": "Python 3.10+",
        "keywords": "AI, NLP, fake news detection, fact checking, machine learning"
      },
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/BharatChandra-sys/rocket-simulator",
        "name": "Rocket Simulator",
        "description": "Physics-based rocket flight simulator for GARI rocketry trajectory analysis.",
        "codeRepository": "https://github.com/BharatChandra-sys/rocket-simulator",
        "url": "https://github.com/BharatChandra-sys/rocket-simulator",
        "programmingLanguage": ["Python"],
        "author": {
          "@type": "Person",
          "name": "Bodapati Bharat Chandra",
          "@id": `${BASE}/#person`
        },
        "dateCreated": "2025-06-01",
        "dateModified": "2026-01-10",
        "datePublished": "2025-07-15",
        "license": "https://opensource.org/licenses/MIT",
        "runtimePlatform": "Python 3.9+",
        "keywords": "rocketry, simulation, physics, trajectory analysis, aerospace"
      },
    },
  ],
};

// ── Schema: EducationalOccupationalCredential (degree) ────────────────────────
const educationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalCredential",
  "@id": `${BASE}/#education-credential`,
  "name": "B.Tech Computer Science & Engineering",
  "description": "Bachelor of Technology in Computer Science & Engineering from GITAM University Hyderabad",
  "credentialCategory": {
    "@type": "DefinedTerm",
    "name": "Bachelor's Degree"
  },
  "educationalLevel": "Undergraduate",
  "recognizedBy": {
    "@type": "CollegeOrUniversity",
    "name": "GITAM University Hyderabad",
    "url": "https://gitam.edu",
    "sameAs": "https://en.wikipedia.org/wiki/GITAM_University"
  },
  "validFrom": "2023-08-01",
  "validUntil": "2027-05-31",
  "competencyRequired": "Computer Science, Machine Learning, Software Engineering"
};

// ── Schema: WorkExperience — structured employment history ────────────────────
const workExperienceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Work Experience of Bodapati Bharat Chandra",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "EmployeeRole",
        "roleName": "Full-Stack Engineering Intern",
        "startDate": "2026-10-01",
        "endDate": "2026-12-31",
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Full-Stack Engineering Intern"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "CardioPulmo AI Private Limited"
        },
        "description": "Developing a clinical screening and case-management platform covering patient records, ECG review, vitals, investigations, risk scoring and clinician triage."
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "EmployeeRole",
        "roleName": "AI/ML Engineering Intern",
        "startDate": "2026-05-01",
        "hasOccupation": {
          "@type": "Occupation",
          "name": "AI/ML Engineering Intern"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "BHEL — Bharat Heavy Electricals Limited",
          "url": "https://bhel.com",
          "sameAs": "https://en.wikipedia.org/wiki/Bharat_Heavy_Electricals"
        },
        "description": "Building on-premise AI vendor compliance portal using FastAPI, Ollama, and PyMuPDF. Fully local LLM deployment with zero external API dependency."
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "EmployeeRole",
        "roleName": "Ground Station & Software Lead, GARI CanSat Team",
        "startDate": "2026-02-01",
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Ground Station & Software Lead"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "GARI — GITAM Aerospace Rocketry Initiative",
          "url": "https://gari.live",
          "memberOf": {
            "@type": "CollegeOrUniversity",
            "name": "GITAM University Hyderabad",
            "url": "https://gitam.edu"
          }
        },
        "description": "Built CAN-7USAT rocket telemetry pipelines with sub-5ms latency, custom GCS software with NavIC integration, and the GARI website (gari.live) for IN-SPACe competition 2026."
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "EmployeeRole",
        "roleName": "Co-Founder",
        "startDate": "2023-09-01",
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Co-Founder"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "Easify",
          "description": "Smart pooling service platform for commuters in Hyderabad, India"
        },
        "description": "Co-founded and built the full-stack ride-pooling platform with real-time matching, FastAPI backend, and Razorpay payment integration."
      }
    }
  ]
};

// ── Schema: HowTo — voice search + featured snippet eligibility ───────────────
// "How to build a rocket telemetry system" type queries
const howToDeployLLMSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Deploy an On-Premise LLM Without External APIs",
  "description": "Step-by-step guide to deploying a production LLM on local hardware using Ollama and FastAPI — no cloud, no data leaving your network.",
  "author": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "@id": `${BASE}/#person`
  },
  "url": `${BASE}/blog/on-premise-llm-bhel`,
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": 0 },
  "totalTime": "PT4H",
  "tool": [
    { "@type": "HowToTool", "name": "Ollama" },
    { "@type": "HowToTool", "name": "FastAPI" },
    { "@type": "HowToTool", "name": "PyMuPDF" },
    { "@type": "HowToTool", "name": "Python 3.10+" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Install Ollama on local hardware",
      "url": `${BASE}/blog/on-premise-llm-bhel#the-stack`,
      "text": "Download and install Ollama on your server. Pull a quantized model: ollama pull mistral:7b-instruct-q4_K_M"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Set up FastAPI backend",
      "url": `${BASE}/blog/on-premise-llm-bhel#the-stack`,
      "text": "Create a FastAPI application that connects to Ollama's OpenAI-compatible API endpoint at http://localhost:11434"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Build a two-pass prompt strategy",
      "url": `${BASE}/blog/on-premise-llm-bhel#the-hardest-part-prompt-engineering-for-structured-output`,
      "text": "Use two LLM calls: first to summarize the document section, then to convert the summary to structured JSON. This improves output quality from ~60% to ~95% valid JSON."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Extract documents with PyMuPDF",
      "url": `${BASE}/blog/on-premise-llm-bhel#the-document-pipeline`,
      "text": "Use PyMuPDF (fitz) to extract text and tables from PDFs before passing to the LLM pipeline."
    }
  ]
};

const howToRocketTelemetrySchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Build a Real-Time Rocket Telemetry Backend Under 5ms Latency",
  "description": "Technical guide to building a sub-5ms end-to-end telemetry backend for competition rocketry using FastAPI, WebSockets, and Kalman filtering.",
  "author": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "@id": `${BASE}/#person`
  },
  "url": `${BASE}/blog/can-7usat-rocket-telemetry`,
  "totalTime": "PT6H",
  "tool": [
    { "@type": "HowToTool", "name": "Python" },
    { "@type": "HowToTool", "name": "FastAPI" },
    { "@type": "HowToTool", "name": "WebSockets" },
    { "@type": "HowToTool", "name": "Teensy 4.1" },
    { "@type": "HowToTool", "name": "XBee 900MHz" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Define binary packet structure",
      "url": `${BASE}/blog/can-7usat-rocket-telemetry#the-packet-structure`,
      "text": "Design a compact binary packet format. CAN-7USAT used 46 bytes: sync marker, timestamp, flight state, altitude, velocity, quaternion, GPS, XOR checksum."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Implement 6-state flight state machine",
      "url": `${BASE}/blog/can-7usat-rocket-telemetry#the-state-machine`,
      "text": "Define states: PRE-FLIGHT, BOOST, COAST, APOGEE, DESCENT, LANDED. Each transition changes data visualization priority."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Apply Kalman filter for sensor fusion",
      "url": `${BASE}/blog/can-7usat-rocket-telemetry#kalman-filter-for-sensor-fusion`,
      "text": "Fuse accelerometer and barometer altitude readings with a 1D Kalman filter. Execution: under 0.2ms per packet."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Broadcast via FastAPI WebSocket",
      "url": `${BASE}/blog/can-7usat-rocket-telemetry#websocket-broadcasting`,
      "text": "Use asyncio + Uvicorn to read serial port and broadcast WebSocket updates concurrently. Target: under 1ms broadcast latency."
    }
  ]
};

// ── Schema: Speakable — voice search / Google Assistant eligibility ────────────
const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE}/#webpage-home`,
  "url": BASE,
  "name": "Bodapati Bharat Chandra — AI/ML Engineer Portfolio",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": "h1, .speakable-summary"
  },
  "about": {
    "@type": "Person",
    "@id": `${BASE}/#person`,
    "name": "Bodapati Bharat Chandra"
  }
};

const ABOUT_FACTS = [
  { label: 'Education', value: 'B.Tech CSE, GITAM University Hyderabad (2023–2027)' },
  { label: 'Currently', value: 'Interning at CardioPulmo AI and BHEL' },
  { label: 'Leading', value: 'Ground station and software, GARI rocketry' },
  { label: 'Co-founder', value: 'Easify, a pooling platform in Hyderabad' },
];

const Home = async () => {
  const repos = await getPinnedRepos();

  return (
    <div>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workExperienceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToDeployLLMSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToRocketTelemetrySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <ScrollProgress />
      <HeroSection />
      <Results />
      <FeaturedProjects />
      <ExperienceSection />
      <GithubProjects repos={repos} />
      <SkillsSection />
      <Certifications />
      <LatestWriting />

      {/* About — visible, so the identity details are for readers as well as crawlers */}
      <section className="py-4 md:py-16" id="about" aria-labelledby="about-heading">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
          <Reveal
            className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-3 gap-y-3 md:gap-12 md:grid-cols-[minmax(0,320px)_1fr] items-start md:items-center rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] p-3 md:p-10"
            itemScope
            itemType="https://schema.org/Person"
          >
            <Reveal x={-24} y={0} delay={0.1} className="relative aspect-[4/5] w-full md:max-w-[320px] mx-auto overflow-hidden rounded-lg md:rounded-2xl border border-white/15">
              <Image
                src="/bodapati-bharat-chandra-2.jpg"
                alt="Bodapati Bharat Chandra — Co-founder of Easify and AI/ML Engineer, Hyderabad"
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover object-[50%_10%] scale-[1.35] origin-[50%_20%]"
                itemProp="image"
              />
            </Reveal>

            <div className="contents md:block md:space-y-6">
              <div className="md:space-y-2">
                <h2 id="about-heading" className="text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  About
                </h2>
                <p className="text-base md:text-4xl font-bold text-primary leading-snug" itemProp="name">
                  Bodapati Bharat Chandra
                </p>
                <p className="text-xs md:text-base text-muted-foreground">
                  <span itemProp="jobTitle">AI/ML Engineer</span> · Hyderabad, India<span className="hidden md:inline"> · BharatChandra-sys on GitHub</span>
                </p>
              </div>

              <div className="col-span-2 space-y-2 md:space-y-4 text-xs md:text-base text-muted-foreground leading-relaxed">
                <p>
                  I&apos;m a final-year CSE student at GITAM University Hyderabad who likes the part after the notebook:
                  getting software running for real users, under real constraints.
                </p>
                <p>
                  I build production AI systems, on-premise LLM platforms, rocket telemetry backends, autonomous vehicle
                  software, and hospital management systems.
                </p>
              </div>

              <dl className="col-span-2 grid grid-cols-2 gap-2 md:gap-4 border-t border-white/10 pt-3 md:pt-6">
                {ABOUT_FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs font-semibold md:uppercase md:tracking-wider text-muted-foreground">{fact.label}</dt>
                    <dd className="md:mt-1 text-xs md:text-sm text-primary leading-snug">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="col-span-2 flex flex-wrap gap-2 md:gap-3">
                <a
                  href="mailto:bc833498@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-black hover:bg-white/90 transition-colors"
                >
                  <HiMail className="w-4 h-4" aria-hidden="true" />
                  Email me
                </a>
                <a
                  href="https://www.linkedin.com/in/bharat-chandra-bodapati/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <FaLinkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href="/bodapati-bharat-chandra-resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <HiDownload className="w-4 h-4" aria-hidden="true" />
                  Download CV
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ — rendered from the same data as the FAQPage schema, so the markup matches what readers see */}
      <section className="py-4 md:py-16" id="faq" aria-labelledby="faq-heading">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6 space-y-3 md:space-y-6">
          <Reveal as="h2" id="faq-heading" className="text-xl md:text-4xl font-bold text-primary">
            Frequently asked questions
          </Reveal>
          <RevealGroup stagger={0.05} className="space-y-2 md:space-y-3">
            {faqSchema.mainEntity.map((item) => (
              <RevealItem as="details" key={item.name} className="group rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 md:px-5 md:py-4">
                <summary className="cursor-pointer text-xs md:text-base font-medium text-primary">{item.name}</summary>
                <p className="mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">{item.acceptedAnswer.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-4 pb-8 md:py-16 md:pb-24">
        <Reveal className="container mx-auto px-6 flex justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white text-xs md:text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95"
          >
            <span>Get In Touch</span>
            <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
