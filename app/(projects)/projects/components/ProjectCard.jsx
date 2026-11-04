"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { itemAnimation } from './Animations';

// A GitHub URL is source code, so it must never be labelled as a live demo.
const isLiveUrl = (url) => Boolean(url) && !url.includes('github.com');

// Logos are shown whole on a background they stay readable on. Photos fill the frame.
const LOGO_BACKGROUNDS = {
    light: "bg-white",
    dark: "bg-black border border-white/10",
};

// Phones: small thumbnail beside the title, with the details below.
// Larger screens: image on the left, everything else on the right.
// `compact` (homepage) also shortens the description and hides tags on phones;
// the /projects page always shows them in full.
export const ProjectCard = ({ project, index, compact = false }) => (
    <motion.div
        variants={itemAnimation}
        className="group grid grid-cols-[56px_minmax(0,1fr)] gap-x-3 gap-y-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:grid-rows-[auto_1fr] sm:gap-x-6 sm:gap-y-3 bg-secondary/5 hover:bg-secondary/10 p-3 sm:p-4 rounded-xl transition-colors duration-300"
    >
        <div className="sm:row-span-2">
            <div className={`relative aspect-square sm:aspect-[4/3] rounded-lg overflow-hidden ${LOGO_BACKGROUNDS[project.logoBackground] || ""}`}>
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 112px, 320px"
                    className={`${project.logoBackground ? "object-contain p-1 sm:p-4" : "object-cover"} transform group-hover:scale-105 transition-transform duration-300`}
                />
                {!project.logoBackground && (
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                )}
            </div>
        </div>

        <div className="flex items-start justify-between gap-3 self-center sm:self-start sm:pt-2">
            <h3 className="text-sm sm:text-lg font-semibold text-primary leading-snug">
                {project.title}
            </h3>
            <span className="hidden sm:inline text-xs text-muted-foreground pt-1.5">
                #{String(index + 1).padStart(2, '0')}
            </span>
        </div>

        <div className="col-span-2 sm:col-span-1 sm:col-start-2 flex flex-col justify-between sm:pb-2">
            <div className="space-y-2 sm:space-y-3">
                <p className={`text-xs sm:text-sm text-muted-foreground leading-relaxed ${compact ? "line-clamp-2 sm:line-clamp-none" : ""}`}>
                    {project.description}
                </p>

                <div className={`${compact ? "hidden sm:flex" : "flex"} flex-wrap gap-1.5`}>
                    {project.technologies.map((tech, idx) => (
                        <span
                            key={idx}
                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
                {isLiveUrl(project.demo) && (
                    <Button size="sm" className="rounded-full h-7 sm:h-8 px-3 sm:px-4 text-xs" asChild>
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                            aria-label={`Live site: ${project.title}`}
                        >
                            Live Site
                            <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" />
                        </a>
                    </Button>
                )}
                {project.github && (
                    <Button variant="outline" size="sm" className="rounded-full h-7 sm:h-8 px-3 sm:px-4 text-xs" asChild>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                            aria-label={`Source code: ${project.title}`}
                        >
                            <FaGithub className="w-3 h-3" aria-hidden="true" />
                            Source
                        </a>
                    </Button>
                )}
            </div>
        </div>
    </motion.div>
);
