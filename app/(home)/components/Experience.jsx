"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase, HiCalendar } from 'react-icons/hi';
import { config } from '@/config';

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
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
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const ExperienceSection = () => {
    const experiences = config.experiences || [];

    if (!experiences || experiences.length === 0) {
        return null;
    }

    return (
        <section className="py-24" id="experience">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-16"
                >
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <motion.div
                            variants={itemAnimation}
                            className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 rounded-full text-primary backdrop-blur-sm"
                        >
                            <HiBriefcase className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-primary">
                                Professional Experience
                            </span>
                        </motion.div>

                        <motion.div variants={itemAnimation} className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                Work Experience
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                A journey through my professional career and key achievements
                            </p>
                        </motion.div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            variants={containerAnimation}
                            className="space-y-8"
                        >
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemAnimation}
                                    className="relative"
                                >
                                    <div className="flex gap-6">
                                        {/* Timeline line */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-xl bg-black border border-white/30 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                                                <HiBriefcase className="w-6 h-6 text-white" />
                                            </div>
                                            {index !== experiences.length - 1 && (
                                                <div className="w-0.5 h-full bg-gradient-to-b from-white/20 to-transparent mt-4" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <div className="bg-black border border-white/30 rounded-2xl p-6 backdrop-blur-md shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)] hover:border-white/60 transition-all duration-300 group relative overflow-hidden hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                                                {/* Shiny overlay effect */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
                                                </div>
                                                
                                                {/* Glossy shine effect */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                                                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                                                </div>
                                                
                                                <div className="relative z-10">
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white mb-1">
                                                            {exp.position}
                                                        </h3>
                                                        <p className="text-primary/80 font-medium">
                                                            {exp.company}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-white/70">
                                                        <HiCalendar className="w-4 h-4" />
                                                        <span>{exp.period}</span>
                                                    </div>
                                                </div>

                                                {exp.location && (
                                                    <p className="text-sm text-white/60 mb-4">
                                                         {exp.location}
                                                    </p>
                                                )}

                                                {exp.description && (
                                                    <p className="text-sm text-white/70 leading-relaxed mb-4">
                                                        {exp.description}
                                                    </p>
                                                )}

                                                {exp.responsibilities && exp.responsibilities.length > 0 && (
                                                    <ul className="space-y-2">
                                                        {exp.responsibilities.map((responsibility, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                                                                <span className="text-white/40 mt-1.5">▸</span>
                                                                <span>{responsibility}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {exp.technologies && exp.technologies.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                                                        {exp.technologies.map((tech, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-xs bg-white/10 text-white px-3 py-1 rounded-full border border-white/20"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ExperienceSection;

