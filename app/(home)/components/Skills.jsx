"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiChip } from 'react-icons/hi';
import { cn } from '@/lib/utils';
import { config } from '@/config';
import SkillsShowcase from './SkillsShowcase';

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const categoryAnimation = itemAnimation;

const SkillCard = ({ name }) => (
    <div className="md:h-full px-2 py-1 md:p-3 rounded-md md:rounded-xl border border-zinc-800/50 hover:border-zinc-700/50 transition-colors duration-300">
        <h4 className="text-xs md:text-sm font-medium text-primary/90">{name}</h4>
    </div>
);

const CategorySection = ({ category }) => (
    <motion.div
        variants={categoryAnimation}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        className="space-y-1.5 md:space-y-4"
    >
        <div className="flex items-center md:gap-3">
            <div className={cn("hidden md:block p-2.5 rounded-xl", category.bgClass)}>
                <div className={cn("w-5 h-5", category.iconClass)}>
                    {category.icon}
                </div>
            </div>
            <div>
                <h3 className="text-sm md:text-xl font-semibold text-primary">{category.title}</h3>
                <p className="hidden md:block text-sm text-muted-foreground">{category.description}</p>
            </div>
        </div>

        <div className="flex flex-wrap gap-1.5 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-3">
            {category.skills.map((name) => (
                <SkillCard key={name} name={name} />
            ))}
        </div>
    </motion.div>
);

const SkillsSection = () => {
    const skills = config.skills;

    return (
        <section className="py-4 md:py-24" id="skills">
            <div className="container mx-auto px-4 md:px-6">
                <div className="space-y-3 md:space-y-16">
                    <motion.div
                        variants={containerAnimation}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                        className="max-w-2xl mx-auto md:text-center space-y-6"
                    >
                        <motion.div
                            variants={itemAnimation}
                            className="hidden md:inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 rounded-full text-primary backdrop-blur-sm"
                        >
                            <HiChip className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-primary">
                                Skills & Technologies
                            </span>
                        </motion.div>

                        <motion.div variants={itemAnimation} className="space-y-2">
                            <h2 className="text-xl md:text-4xl font-bold text-primary">
                                Technical Proficiency
                            </h2>
                            <p className="hidden md:block text-lg text-muted-foreground">
                                The languages, frameworks and tools I work with.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Hidden on phones: the list below already covers these */}
                    <div className="hidden md:block">
                        <SkillsShowcase />
                    </div>

                    <div className="space-y-3 md:space-y-10">
                        {skills.map((category) => (
                            <CategorySection key={category.title} category={category} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
