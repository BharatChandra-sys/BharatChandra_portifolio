"use client"
import React from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { config } from '@/config';
import { Reveal } from '@/components/ui/reveal';
import { ProjectCard } from '@/app/(projects)/projects/components/ProjectCard';

// Flagship work, shown straight after the hero so visitors see it first.
const FEATURED_IDS = [6, 7, 1, 2, 3, 4, 5];

const FeaturedProjects = () => {
    const featured = FEATURED_IDS
        .map((id) => config.projects.find((project) => project.id === id))
        .filter(Boolean);

    return (
        <section className="py-4 md:py-16" id="featured-projects" aria-labelledby="featured-projects-heading">
            <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
                <Reveal className="flex items-end justify-between gap-4 mb-3 md:mb-8">
                    <h2 id="featured-projects-heading" className="text-xl md:text-4xl font-bold text-primary">
                        Featured Projects
                    </h2>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        All projects
                        <HiArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </Reveal>
                <div className="space-y-2 md:space-y-4">
                    {featured.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} compact />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
