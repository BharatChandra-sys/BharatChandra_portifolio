"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { config } from '@/config';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const containerAnimation = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
};

const getProjectSize = (index) => {
    const sizes = [
        "sm:col-span-1 md:col-span-2 row-span-1",
        "col-span-1 sm:row-span-2 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
    ];
    return sizes[index % sizes.length];
};

const ProjectCard = ({ project, size }) => {
    const topics = project.topics || [];
    const hasStats = project.stargazers_count !== null && project.stargazers_count !== undefined;
    return (
        <motion.a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemAnimation}
            className={`relative group ${size}`}
        >
            <div className="bg-black border-white/30 border p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl backdrop-blur-md cursor-pointer relative overflow-hidden h-full w-full sm:min-h-[140px] flex flex-col shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                {/* Shiny sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
                </div>
                {/* Glossy */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                </div>

                <div className="relative flex flex-col gap-2 sm:gap-3 w-full z-10 h-full justify-between">
                    <div className="flex flex-col gap-2 sm:gap-3">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center space-x-1.5 sm:space-x-2 flex-1 min-w-0">
                                <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <h3 className="font-bold text-white text-sm truncate">
                                                {project.name}
                                            </h3>
                                        </TooltipTrigger>
                                        <TooltipContent><p>{project.name}</p></TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <HiExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
                        </div>

                        <p className="text-sm sm:text-xs text-white/70 line-clamp-2 sm:line-clamp-3 leading-snug sm:leading-relaxed">
                            {project.description || "No description provided"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-1.5 sm:gap-2 mt-auto">
                        {topics.length > 0 && (
                            <div className="hidden sm:flex flex-wrap gap-1 sm:gap-1.5">
                                {topics.slice(0, size.includes('row-span-2') ? 3 : 2).map((topic) => (
                                    <span key={topic} className="text-xs bg-white/10 text-white px-1.5 md:px-2 py-0.5 rounded-full border border-white/20">
                                        {topic}
                                    </span>
                                ))}
                                {topics.length > (size.includes('row-span-2') ? 3 : 2) && (
                                    <span className="text-xs text-white/50">
                                        +{topics.length - (size.includes('row-span-2') ? 3 : 2)}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 flex-wrap">
                            {project.language && (
                                <div className="flex items-center space-x-0.5 sm:space-x-1">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full" style={{ backgroundColor: languageColors[project.language] || '#ccc' }} />
                                    <span className="text-xs text-white/70">{project.language}</span>
                                </div>
                            )}
                            {hasStats && (
                                <>
                                    <div className="flex items-center space-x-0.5 sm:space-x-1">
                                        <FaStar className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white/70" aria-hidden="true" />
                                        <span className="text-xs text-white/70">
                                            <span className="sr-only">Stars: </span>{project.stargazers_count}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-0.5 sm:space-x-1">
                                        <FaCodeBranch className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white/70" aria-hidden="true" />
                                        <span className="text-xs text-white/70">
                                            <span className="sr-only">Forks: </span>{project.forks_count}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

// `repos` is fetched on the server (lib/github.js), so the cards are in the
// initial HTML and visitors never call the GitHub API themselves.
const GithubProjects = ({ repos = [] }) => {
    return (
        <section className="py-6 md:py-20 relative">
            <div className="w-full">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="space-y-3 md:space-y-12">
                        <div className="md:space-y-4 md:text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                                className="hidden md:inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-primary backdrop-blur-sm shadow-lg"
                            >
                                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm font-semibold">Latest Github Projects</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                                transition={{ delay: 0.1 }}
                                className="text-2xl md:text-4xl font-bold text-primary md:px-4"
                            >
                                Open Source Projects
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                                transition={{ delay: 0.2 }}
                                className="hidden md:block text-lg text-muted-foreground px-4"
                            >
                                Production systems, competition entries, and research tools
                            </motion.p>
                        </div>

                        <motion.div
                            variants={containerAnimation}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:auto-rows-fr gap-3 sm:gap-4 w-full max-w-6xl mx-auto"
                        >
                            {repos.map((project, index) => (
                                <ProjectCard key={project.id} project={project} size={getProjectSize(index)} />
                            ))}
                        </motion.div>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-3 sm:mt-0">
                            <Button
                                variant="expandIcon"
                                Icon={FaGithub}
                                iconPlacement="right"
                                className="rounded-full h-11 px-4 text-sm sm:px-6 sm:text-base w-full sm:w-auto"
                                asChild
                            >
                                <a href={`https://github.com/${config.social.github}`} target="_blank" rel="noopener noreferrer">
                                    View More on Github
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubProjects;
