"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogIndexSchema, blogBreadcrumbSchema } from '@/app/blog-index-schema';
import { posts } from '@/lib/posts.mjs';

const containerAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } }
};

export default function BlogPage() {
  return (
    <section className="py-6 md:py-24" id="blog">
      {/* Gap 2 fixed: Blog/ItemList schemas now actually rendered */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumbSchema) }} />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate="show"
          className="space-y-4 md:space-y-16"
        >
          <div className="space-y-3">
            <motion.h1 variants={itemAnimation} className="text-2xl md:text-4xl font-bold text-primary">
              Writing
            </motion.h1>
            {/* Trend 1 & 7: EEAT — author attribution + human framing on the index page */}
            <motion.p variants={itemAnimation} className="text-muted-foreground">
              Notes on things I&apos;ve built — mostly systems that had to work under real constraints.
              Written by{' '}
              <a
                href="https://bharatchandra.me"
                className="text-white/70 hover:text-white underline underline-offset-2 transition-colors"
              >
                Bodapati Bharat Chandra
              </a>
              , from lived experience.
            </motion.p>
            {/* Trend 2: Branded search signal — makes "Bharat Chandra blog" a recognisable phrase */}
            <motion.p variants={itemAnimation} className="text-xs text-white/30">
              {posts.length} posts · AI systems · Rocketry · Startups · Hyderabad, India
            </motion.p>
          </div>

          <motion.div variants={containerAnimation} className="space-y-3 md:space-y-6">
            {posts.map((post) => (
              <motion.div key={post.slug} variants={itemAnimation}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="group bg-black border border-white/30 rounded-xl md:rounded-2xl p-4 md:p-6
                    hover:border-white/60 transition-all duration-300 cursor-pointer
                    shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)]
                    hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]
                    relative overflow-hidden">
                    {/* Shiny sweep */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
                    </div>
                    <div className="relative z-10 space-y-1.5 md:space-y-3">
                      <p className="text-xs text-white/40">{post.date}</p>
                      <h2 className="text-base md:text-lg font-semibold text-white leading-snug group-hover:text-white/90">
                        {post.title}
                      </h2>
                      <p className="text-sm text-white/60 leading-relaxed">{post.description}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs bg-white/10 text-white/60 px-2.5 py-0.5 rounded-full border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
