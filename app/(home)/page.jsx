"use client"
import React from 'react'
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
  ],
};

// ── Schema: ProfilePage ────────────────────────────────────────────────────────
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "dateCreated": "2026-06-01T00:00:00+05:30",
  "dateModified": "2026-07-08T00:00:00+05:30",
  "mainEntity": {
    "@type": "Person",
    "@id": `${BASE}/#person`,
    "name": "Bodapati Bharat Chandra",
    "alternateName": "Bharat Chandra",
    "identifier": "BharatChandra-sys",
    "description": "AI/ML Engineer and final-year CSE student at GITAM University Hyderabad.",
    "image": `${BASE}/bodapati-bharat-chandra.jpg`,
    "sameAs": [
      "https://github.com/BharatChandra-sys",
      "https://www.linkedin.com/in/bharat-chandra-6b29283b1/",
      "https://orcid.org/0009-0004-4734-1635",
    ],
  },
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
        "name": "CAN-7USAT Ground Control Station",
        "description": "Real-time rocket telemetry backend for IN-SPACe Model Rocketry Competition 2026. Sub-5ms end-to-end latency, Kalman filter sensor fusion, 6-state flight state machine.",
        "codeRepository": "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend",
        "programmingLanguage": ["Python", "TypeScript"],
        "author": { "@id": `${BASE}/#person` },
      },
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "SoftwareSourceCode",
        "name": "AUVBrain — Autonomous Underwater Vehicle Control Stack",
        "description": "Full autonomous control stack for an underwater vehicle. 0.84ms p95 agent loop latency. Offline LLM decision engine with rules-based fallback.",
        "codeRepository": "https://github.com/BharatChandra-sys/AUVBrain",
        "programmingLanguage": ["Python"],
        "author": { "@id": `${BASE}/#person` },
      },
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "SoftwareSourceCode",
        "name": "MedVision AI — Diabetic Ulcer Detection",
        "description": "Explainable AI system for diabetic ulcer risk detection. Grad-CAM heatmaps, SHAP values, MLflow tracking. Won AI Day Hackathon GITAM × Kodryx AI 2026.",
        "codeRepository": "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
        "programmingLanguage": ["Python"],
        "author": { "@id": `${BASE}/#person` },
        "url": "https://diabetic-ulcer-ai-system.vercel.app",
      },
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "SoftwareSourceCode",
        "name": "FactCheck AI — Fake News Analyzer",
        "description": "Browser extension that scores news credibility. 90% accuracy. Won HackXplore IEEE-SSIT VJIT April 2026.",
        "codeRepository": "https://github.com/BharatChandra-sys/FactCheckAI",
        "programmingLanguage": ["Python"],
        "author": { "@id": `${BASE}/#person` },
      },
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "SoftwareSourceCode",
        "name": "Rocket Simulator",
        "description": "Physics-based rocket flight simulator for GARI rocketry trajectory analysis.",
        "codeRepository": "https://github.com/BharatChandra-sys/rocket-simulator",
        "programmingLanguage": ["Python"],
        "author": { "@id": `${BASE}/#person` },
      },
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "SoftwareSourceCode",
        "name": "Email Automation for Forms",
        "description": "Automated email pipeline triggered by form submissions. FastAPI, SMTP, Jinja2, queue-based delivery.",
        "codeRepository": "https://github.com/BharatChandra-sys/Email-Automation-for-Form",
        "programmingLanguage": ["Python"],
        "author": { "@id": `${BASE}/#person` },
      },
    },
  ],
};

// ── Schema: EducationalOccupationalCredential (degree) ────────────────────────
const educationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalCredential",
  "name": "B.Tech Computer Science & Engineering",
  "credentialCategory": "degree",
  "recognizedBy": {
    "@type": "CollegeOrUniversity",
    "name": "GITAM University Hyderabad",
    "url": "https://gitam.edu",
  },
  "about": { "@id": `${BASE}/#person` },
  "validFrom": "2023",
  "validUntil": "2027",
};

const Home = () => {
  return (
    <div>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationSchema) }} />

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
