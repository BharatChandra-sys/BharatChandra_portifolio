"use client"
import React from 'react'
import HeroSection from './components/HeroSection'
import GithubProjects from './components/GithubProjects'
import SkillsSection from './components/Skills'
import ExperienceSection from './components/Experience'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

// FAQ schema — renders as rich result in Google
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Bodapati Bharat Chandra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra (also known as Bharat Chandra) is an AI/ML engineer and final-year Computer Science & Engineering student at GITAM University Hyderabad. He is currently interning at BHEL building production AI systems, leads the backend and ML stack at GARI (GITAM Aerospace Rocketry Initiative), and is the co-founder of Easify, a smart pooling service platform.",
      },
    },
    {
      "@type": "Question",
      "name": "What projects has Bodapati Bharat Chandra built?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra has built CAN-7USAT rocket telemetry backend (sub-5ms latency for IN-SPACe competition), AUVBrain autonomous underwater vehicle control stack (0.84ms agent loop), MedVision AI for diabetic ulcer detection with Grad-CAM and SHAP explainability, FactCheck AI fake news analyzer (90% accuracy), and Vijetha Digital e-commerce backend currently in production.",
      },
    },
    {
      "@type": "Question",
      "name": "Where is Bharat Chandra from?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bodapati Bharat Chandra is from Hyderabad / Vijayawada, Telangana, India. He studies at GITAM University Hyderabad.",
      },
    },
    {
      "@type": "Question",
      "name": "How to contact Bharat Chandra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact Bodapati Bharat Chandra at bc833498@gmail.com or through the contact form at bharatchandra.me/contact. He is open to AI/ML internships and full-time roles starting 2027.",
      },
    },
  ],
};

const Home = () => {
  return (
    <div>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hidden SEO text — for search engines, not visible to users */}
      <span className="sr-only">
        Bodapati Bharat Chandra — AI/ML Engineer, final-year CSE student at GITAM University Hyderabad.
        Also known as Bharat Chandra and BharatChandra-sys on GitHub.
        Bodapati Bharat Chandra is currently interning at BHEL and leading the backend stack at GARI rocketry initiative.
        Co-founder of Easify, a pooling service platform based in Hyderabad, India.
      </span>
      <HeroSection />
      <ExperienceSection />
      <GithubProjects />
      <SkillsSection />

      {/* Contact Button Section */}
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
  )
}

export default Home
