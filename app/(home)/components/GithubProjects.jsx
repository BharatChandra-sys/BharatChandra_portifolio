"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { config } from '@/config';
import useSWR from 'swr';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const containerAnimation = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
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

// Pinned repos — shown in this exact order
const PINNED_REPOS = [
    'FactCheckAI',
    'diabetic-ulcer-ai-system',
    'rocket-simulator',
    'Email-Automation-for-Form',
    'CAN-7USAT-Ground-Control-Backend',
    'AUVBrain',
];

// Fallback descriptions for repos with no GitHub description
const REPO_DESCRIPTIONS = {
    'FactCheckAI': 'Browser-based fake news analyzer — Logistic Regression on 10,000+ labeled samples, sub-second response, LLM reasoning layer for verdict explanations. 90% validation accuracy. Won HackXplore — IEEE-SSIT VJIT, April 2026.',
    'rocket-simulator': 'Physics-based rocket flight simulator modelling thrust, drag, gravity and multi-stage separation. Outputs altitude, velocity and acceleration curves. Built for GARI rocketry trajectory analysis.',
    'Email-Automation-for-Form': 'Automated email pipeline triggered by form submissions. FastAPI backend, SMTP integration, Jinja2 template engine, and queue-based delivery with retry logic.',
    'diabetic-ulcer-ai-system': 'Explainable AI for diabetic ulcer risk — Custom CNN + Grad-CAM heatmaps + SHAP values + MLflow tracking. Won AI Day Hackathon — GITAM × Kodryx AI, March 2026.',
    'CAN-7USAT-Ground-Control-Backend': 'Real-time ground control for IN-SPACe Rocketry Competition 2026. 46-byte telemetry decode, Kalman filter fusion, 6-state FSM, WebSocket broadcast. <5ms end-to-end latency.',
    'AUVBrain': 'Full autonomous control stack for an underwater vehicle. observe→decide→act agent loop, 4-DOF thruster control, offline LLM + rules-based fallback. p95 agent loop: 0.84ms.',
};

const ITEMS_PER_PAGE = 6;
const GITHUB_API_URL = `https://api.github.com/users/${config.social.github}/repos`;

const getProjectSize = (index) => {
    const sizes = [
        "col-span-2 sm:col-span-1 md:col-span-2 row-span-1",
        "col-span-1 sm:row-span-2 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
    ];
    return sizes[index % sizes.length];
};

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        const errorData = await res.json();
        const error = new Error('Failed to fetch GitHub projects');
        error.info = errorData.message;
        error.status = res.status;
        throw error;
    }
    return res.json();
};

const ProjectSkeleton = () => (
    <div className="rounded-xl sm:rounded-2xl bg-black border-white/30 border p-3 sm:p-4 md:p-5 min-h-[120px] sm:min-h-[140px] h-full w-full">
        <div className="flex flex-col gap-2 sm:gap-3 h-full justify-between">
            <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <Skeleton className="h-3 sm:h-4 w-24 sm:w-32 bg-white/10" />
                    <Skeleton className="h-3 w-3 rounded-full bg-white/10" />
                </div>
                <Skeleton className="h-8 sm:h-12 w-full bg-white/10" />
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
                <Skeleton className="h-2 sm:h-2.5 w-10 sm:w-12 bg-white/10" />
                <Skeleton className="h-2 sm:h-2.5 w-8 sm:w-10 bg-white/10" />
                <Skeleton className="h-2 sm:h-2.5 w-8 sm:w-10 bg-white/10" />
            </div>
        </div>
    </div>
);

const ErrorAlert = ({ onRetry }) => (
    <Alert variant="destructive" className="col-span-full">
        <FaExclamationCircle className="w-4 h-4" />
        <AlertDescription className="flex items-center justify-between">
            <span>Failed to load projects. Rate limit may be exceeded.</span>
            <Button variant="outline" size="sm" onClick={onRetry} className="ml-4">
                Try Again
            </Button>
        </AlertDescription>
    </Alert>
);

const ProjectCard = ({ project, size }) => {
    const topics = project.topics || [];
    return (
        <motion.a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemAnimation}
            className={`relative group ${size}`}
        >
            <div className="bg-black border-white/30 border p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl backdrop-blur-md cursor-pointer relative overflow-hidden h-full w-full min-h-[120px] sm:min-h-[140px] flex flex-col shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
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
                                            <h3 className="font-bold text-white text-[10px] sm:text-xs md:text-sm truncate">
                                                {project.name}
                                            </h3>
                                        </TooltipTrigger>
                                        <TooltipContent><p>{project.name}</p></TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <HiExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
                        </div>

                        <p className="text-[10px] sm:text-xs text-white/70 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                            {REPO_DESCRIPTIONS[project.name] || project.description || "No description provided"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-1.5 sm:gap-2 mt-auto">
                        {topics.length > 0 && (
                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                {topics.slice(0, size.includes('row-span-2') ? 3 : 2).map((topic) => (
                                    <span key={topic} className="text-[9px] sm:text-[10px] md:text-xs bg-white/10 text-white px-1 sm:px-1.5 md:px-2 py-0.5 rounded-full border border-white/20">
                                        {topic}
                                    </span>
                                ))}
                                {topics.length > (size.includes('row-span-2') ? 3 : 2) && (
                                    <span className="text-[9px] sm:text-[10px] text-white/50">
                                        +{topics.length - (size.includes('row-span-2') ? 3 : 2)}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 flex-wrap">
                            {project.language && (
                                <div className="flex items-center space-x-0.5 sm:space-x-1">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full" style={{ backgroundColor: languageColors[project.language] || '#ccc' }} />
                                    <span className="text-[9px] sm:text-[10px] md:text-xs text-white/70">{project.language}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-0.5 sm:space-x-1">
                                <FaStar className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white/70" />
                                <span className="text-[9px] sm:text-[10px] md:text-xs text-white/70">{project.stargazers_count}</span>
                            </div>
                            <div className="flex items-center space-x-0.5 sm:space-x-1">
                                <FaCodeBranch className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white/70" />
                                <span className="text-[9px] sm:text-[10px] md:text-xs text-white/70">{project.forks_count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

const GithubProjects = () => {
    const [page, setPage] = React.useState(1);
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);

    const { data, error, isLoading, mutate: revalidateData } = useSWR(
        `${GITHUB_API_URL}?sort=updated&per_page=100`,
        fetcher,
        { revalidateOnFocus: false, refreshInterval: 300000, shouldRetryOnError: false }
    );

    const projects = React.useMemo(() => {
        if (!data) return [];
        return data
            .filter(p => !p.fork && !p.private && PINNED_REPOS.includes(p.name))
            .sort((a, b) => PINNED_REPOS.indexOf(a.name) - PINNED_REPOS.indexOf(b.name))
            .slice(0, ITEMS_PER_PAGE * page)
            .map((p, i) => ({ ...p, size: getProjectSize(i) }));
    }, [data, page]);

    const handleRetry = async () => {
        try { setIsLoadingMore(true); await revalidateData(); }
        catch (err) { console.error(err); }
        finally { setIsLoadingMore(false); }
    };

    return (
        <section className="py-20 relative">
            <div className="w-full">
                <div className="container mx-auto px-4 sm:px-6 md:px-8">
                    <div className="space-y-8 sm:space-y-12">
                        <div className="space-y-3 sm:space-y-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-primary backdrop-blur-sm shadow-lg"
                            >
                                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm font-semibold">Latest Github Projects</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary px-4"
                            >
                                Open Source Projects
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-base sm:text-lg text-muted-foreground px-4"
                            >
                                Production systems, competition entries, and research tools
                            </motion.p>
                        </div>

                        <motion.div
                            variants={containerAnimation}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 auto-rows-fr gap-3 sm:gap-4 w-full max-w-6xl mx-auto"
                        >
                            {isLoading ? (
                                Array(ITEMS_PER_PAGE).fill(0).map((_, i) => (
                                    <div key={i} className={getProjectSize(i)}>
                                        <ProjectSkeleton />
                                    </div>
                                ))
                            ) : error ? (
                                <ErrorAlert onRetry={handleRetry} />
                            ) : (
                                projects.map((project) => (
                                    <ProjectCard key={project.id} project={project} size={project.size} />
                                ))
                            )}
                        </motion.div>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-0">
                            {!error && data && data.filter(p => !p.fork && !p.private && PINNED_REPOS.includes(p.name)).length > projects.length && (
                                <Button
                                    variant="outline"
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={isLoadingMore}
                                    className="rounded-full px-5 py-5 sm:px-6 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
                                >
                                    {isLoadingMore ? (
                                        <><FaSpinner className="w-4 h-4 mr-2 animate-spin" />Loading...</>
                                    ) : 'Load More Projects'}
                                </Button>
                            )}
                            <Button
                                variant="expandIcon"
                                Icon={FaGithub}
                                iconPlacement="right"
                                className="rounded-full px-5 py-5 sm:px-6 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
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
