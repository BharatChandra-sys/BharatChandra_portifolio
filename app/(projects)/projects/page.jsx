"use client"
import React from 'react';
import BackgroundEffects from '@/components/ui/background-effects';
import { config } from '@/config';
import SectionTitle from './components/SectionTitle';
import { ProjectsList } from './components/ProjectsList';

const BASE = 'https://bharatchandra.me';

// ── Structured Data ────────────────────────────────────────────────────────────
// Gap 3 fixed: projects page had zero schema — now has CollectionPage + BreadcrumbList
const projectsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE}/projects`,
  "url": `${BASE}/projects`,
  "name": "Projects by Bodapati Bharat Chandra",
  "description": "Production software projects built by Bodapati Bharat Chandra — AI/ML engineer at BHEL, rocketry backend lead at GARI, and co-founder of Easify.",
  "inLanguage": "en-IN",
  "author": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "@id": `${BASE}/#person`
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "Projects by Bodapati Bharat Chandra",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "SoftwareSourceCode",
          "@id": "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend",
          "name": "CAN-7USAT Ground Control Station",
          "description": "Real-time rocket telemetry backend for IN-SPACe 2026. Sub-5ms latency, Kalman filter, 6-state flight state machine.",
          "codeRepository": "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend",
          "programmingLanguage": ["Python", "TypeScript"],
          "author": { "@type": "Person", "name": "Bodapati Bharat Chandra", "@id": `${BASE}/#person` },
          "dateCreated": "2025-10-15",
          "dateModified": "2026-05-20",
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "SoftwareSourceCode",
          "@id": "https://github.com/BharatChandra-sys/AUVBrain",
          "name": "AUVBrain — Autonomous Underwater Vehicle",
          "description": "0.84ms p95 agent loop. Offline LLM decision engine. Python, ROS2.",
          "codeRepository": "https://github.com/BharatChandra-sys/AUVBrain",
          "programmingLanguage": ["Python"],
          "author": { "@type": "Person", "name": "Bodapati Bharat Chandra", "@id": `${BASE}/#person` },
          "dateCreated": "2025-08-10",
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "SoftwareSourceCode",
          "@id": "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
          "name": "MedVision AI — Diabetic Ulcer Detection",
          "description": "Explainable AI: Grad-CAM, SHAP, MLflow. Won AI Day Hackathon GITAM × Kodryx AI 2026.",
          "codeRepository": "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
          "url": "https://diabetic-ulcer-ai-system.vercel.app",
          "programmingLanguage": ["Python"],
          "author": { "@type": "Person", "name": "Bodapati Bharat Chandra", "@id": `${BASE}/#person` },
          "dateCreated": "2026-02-10",
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "SoftwareSourceCode",
          "@id": "https://github.com/BharatChandra-sys/FactCheckAI",
          "name": "FactCheck AI — Fake News Analyzer",
          "description": "Browser extension, 90% accuracy. Won HackXplore IEEE-SSIT VJIT April 2026.",
          "codeRepository": "https://github.com/BharatChandra-sys/FactCheckAI",
          "programmingLanguage": ["Python"],
          "author": { "@type": "Person", "name": "Bodapati Bharat Chandra", "@id": `${BASE}/#person` },
          "dateCreated": "2026-03-20",
        }
      },
    ]
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${BASE}/projects` }
  ]
};

const ProjectsPage = () => {
    return (
        <section className="py-16" id="projects">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <div className="container mx-auto px-6 md:px-64">
                <BackgroundEffects
                    variant="diagonal"
                    colors={{ first: "secondary", second: "secondary" }}
                    intensity="10"
                    blurAmount="3xl"
                />

                <div className="relative">
                    <SectionTitle />
                    <ProjectsList projects={config.projects} />
                </div>
            </div>
        </section>
    );
};

export default ProjectsPage;
