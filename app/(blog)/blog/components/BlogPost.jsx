"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi';

export function BlogPost({ title, date, tags, github, content }) {
    const paragraphs = content.trim().split('\n\n');

    return (
        <section className="py-24">
            <div className="container mx-auto px-6 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-10"
                >
                    {/* Back link */}
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                        <HiArrowLeft className="w-4 h-4" />
                        All posts
                    </Link>

                    {/* Header */}
                    <div className="space-y-4">
                        <p className="text-xs text-white/40">{date}</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug">{title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <span key={tag} className="text-xs bg-white/10 text-white/60 px-2.5 py-0.5 rounded-full border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/10" />

                    {/* Content */}
                    <div className="space-y-6 text-white/75 leading-relaxed text-[15px]">
                        {paragraphs.map((block, i) => {
                            if (block.startsWith('## ')) {
                                return (
                                    <h2 key={i} className="text-lg font-semibold text-white mt-8 mb-2">
                                        {block.replace('## ', '')}
                                    </h2>
                                );
                            }
                            if (block.startsWith('**') && block.endsWith('**')) {
                                return (
                                    <p key={i} className="font-semibold text-white/90">
                                        {block.replace(/\*\*/g, '')}
                                    </p>
                                );
                            }
                            // Handle bullet lists
                            if (block.includes('\n- ')) {
                                const lines = block.split('\n');
                                return (
                                    <ul key={i} className="space-y-2 list-none">
                                        {lines.map((line, j) => (
                                            line.startsWith('- ') ? (
                                                <li key={j} className="flex items-start gap-2">
                                                    <span className="text-white/30 mt-1">▸</span>
                                                    <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>') }} />
                                                </li>
                                            ) : (
                                                <p key={j} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>') }} />
                                            )
                                        ))}
                                    </ul>
                                );
                            }
                            return (
                                <p key={i} dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>') }} />
                            );
                        })}
                    </div>

                    {/* GitHub link */}
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-200"
                        >
                            <HiExternalLink className="w-4 h-4" />
                            View on GitHub
                        </a>
                    )}

                    {/* Divider + back */}
                    <div className="h-px bg-white/10" />
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                        <HiArrowLeft className="w-4 h-4" />
                        Back to all posts
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
