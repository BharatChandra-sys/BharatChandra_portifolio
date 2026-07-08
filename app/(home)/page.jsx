"use client"
import React from 'react'
import Image from 'next/image'
import HeroSection from './components/HeroSection'
import GithubProjects from './components/GithubProjects'
import SkillsSection from './components/Skills'
import ExperienceSection from './components/Experience'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

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
        "text": "Bodapati Bharat Chandra (also known as Bharat Chandra) is an AI/ML engineer and final-year Computer Science & Engineering student at GITAM University Hyderabad. He is currently interning at BHEL building production AI systems, leads the backend and ML stack at GARI (GITAM Aerospace Rocketry Initiative), and is the co-founder of Easify, a smart pooling service platform in Hyderabad.",
      },
    },
    {
      "@type": "Question",
      "name": "What projects has Bodapati Bharat Chandra built?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra has built: CAN-7USAT rocket telemetry backend (sub-5ms latency, IN-SPACe competition 2026), AUVBrain autonomous underwater vehicle control stack (0.84ms agent loop), MedVision AI for diabetic ulcer detection with Grad-CAM and SHAP, FactCheck AI fake news analyzer (90% accuracy, HackXplore winner), Hospital Management Platform, and Vijetha Digital e-commerce backend in production.",
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
        "text": "Bodapati Bharat Chandra is currently an AI/ML Engineering Intern at BHEL (Bharat Heavy Electricals Limited) in Hyderabad, building an on-premise AI vendor compliance portal. He is also the Backend and ML Lead at GARI (GITAM Aerospace Rocketry Initiative) and co-founder of Easify.",
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
        "text": "Bodapati Bharat Chandra's GitHub username is BharatChandra-sys. His profile is at github.com/BharatChandra-sys and includes projects like CAN-7USAT, AUVBrain, MedVision AI, FactCheckAI, rocket-simulator, and Email-Automation-for-Form.",
      },
    },
    // Trend 2: Branded search — these questions mirror real "Bharat Chandra + keyword"
    // searches. FAQ schema gives them a chance to appear as rich results.
    {
      "@type": "Question",
      "name": "Does Bharat Chandra have a blog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Bodapati Bharat Chandra writes at bharatchandra.me/blog. He publishes technical posts from direct lived experience — not theory. Current articles cover building a sub-5ms rocket telemetry system for IN-SPACe 2026, deploying an on-premise LLM at BHEL with no external APIs, and co-founding Easify, a ride-pooling startup in Hyderabad.",
      },
    },
    {
      "@type": "Question",
      "name": "What has Bharat Chandra won?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra has won two hackathons in 2026: the AI Day Hackathon organised by GITAM University and Kodryx AI (March 2026) for MedVision AI, an explainable AI system for diabetic ulcer detection; and HackXplore organised by IEEE-SSIT VJIT (April 2026) for FactCheck AI, a fake news analyser with 90% accuracy.",
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
  "dateModified": "2026-07-08T00:00:00Z",
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
        "width": 1200,
        "height": 630,
      },
      {
        "@type": "ImageObject",
        "url": `${BASE}/bodapati-bharat-chandra-2.jpg`,
        "caption": "Bodapati Bharat Chandra — Co-founder of Easify, Hyderabad",
        "width": 1200,
        "height": 630,
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
        "@id": "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
        "name": "MedVision AI — Diabetic Ulcer Detection",
        "description": "Explainable AI system for diabetic ulcer risk detection. Grad-CAM heatmaps, SHAP values, MLflow tracking. Won AI Day Hackathon GITAM × Kodryx AI 2026.",
        "codeRepository": "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
        "url": "https://diabetic-ulcer-ai-system.vercel.app",
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
      "position": 4,
      "item": {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/BharatChandra-sys/FactCheckAI",
        "name": "FactCheck AI — Fake News Analyzer",
        "description": "Browser extension that scores news credibility. 90% accuracy. Won HackXplore IEEE-SSIT VJIT April 2026.",
        "codeRepository": "https://github.com/BharatChandra-sys/FactCheckAI",
        "url": "https://github.com/BharatChandra-sys/FactCheckAI",
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
      "position": 5,
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
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/BharatChandra-sys/Email-Automation-for-Form",
        "name": "Email Automation for Forms",
        "description": "Automated email pipeline triggered by form submissions. FastAPI, SMTP, Jinja2, queue-based delivery.",
        "codeRepository": "https://github.com/BharatChandra-sys/Email-Automation-for-Form",
        "url": "https://github.com/BharatChandra-sys/Email-Automation-for-Form",
        "programmingLanguage": ["Python"],
        "author": {
          "@type": "Person",
          "name": "Bodapati Bharat Chandra",
          "@id": `${BASE}/#person`
        },
        "dateCreated": "2025-04-01",
        "dateModified": "2025-12-15",
        "datePublished": "2025-05-01",
        "license": "https://opensource.org/licenses/MIT",
        "runtimePlatform": "Python 3.9+",
        "keywords": "email automation, FastAPI, SMTP, Jinja2, queue systems"
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
      "position": 2,
      "item": {
        "@type": "EmployeeRole",
        "roleName": "Backend & ML Lead",
        "startDate": "2026-02-01",
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Backend & ML Lead"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "GARI — GITAM Aerospace Rocketry Initiative",
          "memberOf": {
            "@type": "CollegeOrUniversity",
            "name": "GITAM University Hyderabad",
            "url": "https://gitam.edu"
          }
        },
        "description": "Built CAN-7USAT rocket telemetry backend achieving sub-5ms end-to-end latency for IN-SPACe Model Rocketry Competition 2026."
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
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

const Home = () => {
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

      {/* Hidden SEO text — crawlable, not visible */}
      <span className="sr-only">
        Bodapati Bharat Chandra is an AI/ML engineer and final-year CSE student at GITAM University Hyderabad.
        Also known as Bharat Chandra and BharatChandra-sys on GitHub.
        Bodapati Bharat Chandra is interning at BHEL Hyderabad, leading the backend stack at GARI rocketry initiative, and co-founding Easify, a pooling platform in Hyderabad, India.
        Contact: bc833498@gmail.com — bharatchandra.me
      </span>

      <HeroSection />
      <ExperienceSection />
      <GithubProjects />
      <SkillsSection />

      {/* ── Second photo — visible in DOM for Google Image indexing ── */}
      {/* Placed between sections so it's rendered in HTML source, not just JSON-LD */}
      <section className="py-8" aria-label="About Bodapati Bharat Chandra">
        <div className="container mx-auto px-6 flex justify-center">
          <div
            className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 max-w-sm"
            itemScope
            itemType="https://schema.org/Person"
          >
            <Image
              src="/bodapati-bharat-chandra-2.jpg"
              alt="Bodapati Bharat Chandra — Co-founder of Easify and AI/ML Engineer, Hyderabad"
              width={48}
              height={48}
              className="rounded-full object-cover border border-white/15 flex-shrink-0"
              itemProp="image"
            />
            <div>
              <p className="text-sm font-semibold text-white/80" itemProp="name">
                Bodapati Bharat Chandra
              </p>
              <p className="text-xs text-white/40" itemProp="jobTitle">
                AI/ML Engineer · Hyderabad, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <span>Get In Touch</span>
                <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
