/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { HiArrowRight, HiDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { config } from '@/config';
import Link from 'next/link';
import { BackgroundPresets } from '@/components/ui/background-effects';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// The container only sequences its children. It must not fade itself, because
// that would hide the headline (the page's LCP element) until JS has loaded.
const containerAnimation = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const HeroSection = () => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.2]);

  return (
    <section ref={sectionRef} className="relative pt-2 md:pt-12 pb-2 md:pb-8">
      <BackgroundPresets.Minimal />

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate="show"
          style={{ y, opacity }}
          className="max-w-3xl mx-auto text-center space-y-4 md:space-y-8 relative"
        >
          {/* Hidden microdata — no visible photo, entity signals preserved for SEO */}
          <div
            itemScope
            itemType="https://schema.org/Person"
            className="hidden"
          >
            <meta itemProp="name" content="Bodapati Bharat Chandra" />
            <meta itemProp="url" content="https://bharatchandra.me" />
            <meta itemProp="jobTitle" content="AI/ML Engineer" />
            <meta itemProp="image" content="https://bharatchandra.me/bodapati-bharat-chandra.jpg" />
            <meta itemProp="worksFor" content="BHEL — Bharat Heavy Electricals Limited" />
            <meta itemProp="alumniOf" content="GITAM University Hyderabad" />
            <meta itemProp="sameAs" content="https://github.com/BharatChandra-sys" />
            <meta itemProp="sameAs" content="https://www.linkedin.com/in/bharat-chandra-bodapati/" />
          </div>

          {/* H1 — not animated, so it paints with the first HTML */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-7xl font-bold tracking-tight">
              <span className="block text-primary mb-2">
                Hi, I'm {config.developer.name}
              </span>
              <span className="block text-white/60 text-lg md:text-4xl">
                Building AI systems that actually ship.
              </span>
            </h1>
          </div>

          {/* Sub-text — exact same style */}
          <motion.p
            variants={itemAnimation}
            className="speakable-summary text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Final-year CSE student at GITAM University Hyderabad. I build production-grade ML pipelines, rocket telemetry backends, and full-stack platforms for real clients — not just notebooks.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemAnimation}
            className="flex flex-wrap gap-2 md:gap-4 justify-center pt-0 md:pt-2"
          >
            <Button
              variant="expandIcon"
              Icon={HiArrowRight}
              iconPlacement="right"
              className="rounded-full h-9 px-4 text-xs md:h-11 md:px-6 md:text-base transition-all duration-300 hover:scale-105 font-semibold"
              asChild
            >
              <Link href="/projects">View Projects</Link>
            </Button>

            <Button
              variant="outline"
              className="rounded-full h-9 px-4 text-xs md:h-11 md:px-6 md:text-base font-semibold transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/bodapati-bharat-chandra-resume.pdf" download className="flex items-center gap-2">
                <HiDownload className="w-4 h-4" aria-hidden="true" />
                Download CV
              </a>
            </Button>

            <Button
              variant="ghost"
              className="rounded-full h-9 px-4 text-xs md:h-11 md:px-6 md:text-base font-semibold transition-all duration-300 hover:scale-105"
              asChild
            >
              <a
                href={`https://github.com/${config.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FaGithub className="w-4 h-4" aria-hidden="true" />
                GitHub ↗
              </a>
            </Button>

            <Button
              variant="ghost"
              className="rounded-full h-9 px-4 text-xs md:h-11 md:px-6 md:text-base font-semibold transition-all duration-300 hover:scale-105"
              asChild
            >
              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FaLinkedin className="w-4 h-4" aria-hidden="true" />
                LinkedIn ↗
              </a>
            </Button>
          </motion.div>

          {/* Background glow — exact original */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -z-10 inset-0 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] max-w-[100vw] bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
