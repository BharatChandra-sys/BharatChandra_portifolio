/* eslint-disable react/no-unescaped-entities */
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { HiCode, HiArrowRight, HiDownload } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { config } from '@/config';
import Link from 'next/link';
import { BackgroundPresets } from '@/components/ui/background-effects';
import { motion } from 'framer-motion';
import SkillsShowcase from './SkillsShowcase';

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
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

const textAnimation = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-140px)] flex items-center justify-center relative">
      <BackgroundPresets.Minimal />

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto text-center space-y-8 relative"
        >
          {/* Badge — same style as original */}
          <motion.div
            variants={itemAnimation}
            className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 rounded-full text-primary backdrop-blur-sm"
          >
            <HiCode className="w-5 h-5" />
            <span className="text-sm font-medium">AI/ML Intern @ BHEL · GARI Rocketry Lead</span>
          </motion.div>

          {/* H1 — exact same structure */}
          <div className="space-y-4">
            <motion.h1
              variants={itemAnimation}
              className="text-4xl md:text-7xl font-bold tracking-tight"
            >
              <motion.span
                variants={textAnimation}
                className="block text-primary mb-2"
              >
                Hi, I'm {config.developer.name}
              </motion.span>
              <motion.span
                variants={textAnimation}
                className="block text-white/60 text-2xl md:text-4xl"
              >
                Building AI systems that actually ship.
              </motion.span>
            </motion.h1>
          </div>

          {/* Sub-text — exact same style */}
          <motion.p
            variants={itemAnimation}
            className="text-base sm:text-md text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Final-year CSE student at GITAM University Hyderabad. I build production-grade
            ML pipelines, rocket telemetry backends, and autonomous vehicle control stacks —
            not just notebooks.
          </motion.p>

          {/* CTAs — same button style, added CV + GitHub */}
          <motion.div
            variants={itemAnimation}
            className="flex flex-wrap gap-4 justify-center pt-6"
          >
            <Link href="/projects">
              <Button
                variant="expandIcon"
                Icon={HiArrowRight}
                iconPlacement="right"
                className="rounded-full px-6 py-6 text-base transition-all duration-300 hover:scale-105 font-semibold"
              >
                View Projects
              </Button>
            </Link>

            <a href="/bharat-resume.pdf" download>
              <Button
                variant="outline"
                className="rounded-full px-6 py-6 text-base font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <HiDownload className="w-4 h-4" />
                Download CV
              </Button>
            </a>

            <a
              href={`https://github.com/${config.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                className="rounded-full px-6 py-6 text-base font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <FaGithub className="w-4 h-4" />
                GitHub ↗
              </Button>
            </a>
          </motion.div>

          {/* Background glow — exact original */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -z-10 inset-0 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>

        {/* SkillsShowcase bento grid — exact same as original */}
        <SkillsShowcase />
      </div>
    </section>
  );
};

export default HeroSection;
