"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getPost, getRelatedPosts } from '@/lib/posts.mjs';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi';

// ── Trend 1 & 7: EEAT + Human Content Signal ──────────────────────────────────
// Reading time and word count are visible trust signals.
// They tell Google (and humans) this is a real piece of writing with substance.
function calcReadingStats(text) {
  const stripped = text.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '').replace(/`/g, '');
  const words = stripped.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return { words, minutes };
}

// ── Inline Markdown ───────────────────────────────────────────────────────────
// Builds React elements rather than an HTML string, so nothing needs
// dangerouslySetInnerHTML. Supports **bold**, `code` and [text](url).
const INLINE_TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

function renderInline(text) {
  return text.split(INLINE_TOKEN).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i} className="text-white/90">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={i} className="bg-white/10 px-1 rounded text-white/80 text-sm font-mono">{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith('/') || href.startsWith('#')) {
        return <Link key={i} href={href} className="text-white underline underline-offset-2 hover:text-white/70">{label}</Link>;
      }
      if (/^(https?:|mailto:)/.test(href)) {
        return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2 hover:text-white/70">{label}</a>;
      }
      return label;
    }
    return part;
  });
}

const headingId = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// Splits on blank lines, but keeps fenced code blocks whole.
function splitBlocks(content) {
  const blocks = [];
  let current = [];
  let inFence = false;
  const flush = () => {
    if (current.length) blocks.push(current.join('\n'));
    current = [];
  };
  for (const line of content.trim().split('\n')) {
    if (line.trim().startsWith('```')) inFence = !inFence;
    if (!inFence && line.trim() === '') flush();
    else current.push(line);
  }
  flush();
  return blocks;
}

const isTableRow = (line) => /^\s*\|.*\|\s*$/.test(line);
const isTableDivider = (line) => /^\s*\|[\s:|-]+\|\s*$/.test(line);
const tableCells = (line) => line.trim().slice(1, -1).split('|').map((cell) => cell.trim());

function renderBlock(block, i) {
  // Code first, so its contents are never mistaken for lists or headings
  if (block.startsWith('```')) {
    const lines = block.split('\n');
    const lang = lines[0].replace('```', '').trim();
    const code = lines.slice(1, lines.findLastIndex(l => l.trim() === '```')).join('\n');
    return (
      <div key={i} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 my-4">
        {lang && <div className="px-4 py-1.5 text-xs text-white/40 border-b border-white/10 font-mono">{lang}</div>}
        <pre className="p-4 overflow-x-auto text-sm text-white/75 font-mono leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    );
  }
  if (block.startsWith('## ')) {
    const text = block.replace('## ', '');
    return (
      <h2 key={i} id={headingId(text)} className="text-xl font-bold text-white mt-10 mb-3 scroll-mt-20">
        {text}
      </h2>
    );
  }
  if (block.startsWith('### ')) {
    return (
      <h3 key={i} className="text-base font-semibold text-white/90 mt-6 mb-2">
        {block.replace('### ', '')}
      </h3>
    );
  }
  // Tables
  const rows = block.split('\n');
  if (rows.length >= 2 && isTableRow(rows[0]) && isTableDivider(rows[1])) {
    return (
      <div key={i} className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {tableCells(rows[0]).map((cell, j) => (
                <th key={j} scope="col" className="text-left font-semibold text-white/90 border-b border-white/20 px-3 py-2">{renderInline(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(2).filter(isTableRow).map((row, r) => (
              <tr key={r}>
                {tableCells(row).map((cell, j) => (
                  <td key={j} className="align-top border-b border-white/10 px-3 py-2">{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (block.startsWith('- ') || block.includes('\n- ')) {
    const lines = block.split('\n');
    const intro = lines.filter((line) => !line.startsWith('- ') && line.trim());
    return (
      <React.Fragment key={i}>
        {intro.map((line, j) => <p key={j} className="leading-relaxed">{renderInline(line)}</p>)}
        <ul className="space-y-2 list-none">
          {lines.filter((line) => line.startsWith('- ')).map((line, j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="text-white/30 mt-1" aria-hidden="true">▸</span>
              <span>{renderInline(line.slice(2))}</span>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
  // numbered lists
  if (/^\d+\.\s/.test(block.split('\n')[0])) {
    const lines = block.split('\n').filter(Boolean);
    return (
      <ol key={i} className="space-y-2 list-none">
        {lines.map((line, j) => {
          const match = line.match(/^(\d+)\.\s(.+)/);
          if (!match) return null;
          return (
            <li key={j} className="flex items-start gap-3">
              <span className="text-white/30 font-mono text-sm mt-0.5 min-w-[1.2rem]">{match[1]}.</span>
              <span>{renderInline(match[2])}</span>
            </li>
          );
        })}
      </ol>
    );
  }
  return <p key={i} className="leading-relaxed">{renderInline(block)}</p>;
}

// ── Table of Contents ──────────────────────────────────────────────────────────
// Trend 1: EEAT signal — well-structured content shows depth and expertise.
function TableOfContents({ content }) {
  const headings = [...content.matchAll(/^## (.+)$/gm)].map(m => ({
    text: m[1],
    id: headingId(m[1])
  }));

  if (headings.length < 3) return null;

  return (
    <nav className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8" aria-label="Table of contents">
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">In this post</p>
      <ol className="space-y-2">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="text-sm text-white/60 hover:text-white transition-colors flex items-start gap-2"
            >
              <span className="text-white/25 font-mono mt-0.5 min-w-[1.2rem]">{i + 1}.</span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ── Author Card (EEAT signal) ──────────────────────────────────────────────────
// Trend 1: Visible author identity = trust signal for Google + readers.
function AuthorCard() {
  return (
    <div
      className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5 mt-12"
      itemScope
      itemType="https://schema.org/Person"
    >
      <Image
        src="/bodapati-bharat-chandra.jpg"
        alt="Bodapati Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad"
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        itemProp="image"
        width={48}
        height={48}
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white" itemProp="name">
          <a
            href="https://bharatchandra.me"
            className="hover:underline"
            itemProp="url"
          >
            Bodapati Bharat Chandra
          </a>
        </p>
        <p className="text-xs text-white/50 mt-0.5" itemProp="jobTitle">
          AI/ML Engineering Intern @ BHEL · Backend & ML Lead @ GARI · Co-founder, Easify
        </p>
        <p className="text-xs text-white/40 mt-1.5 leading-relaxed">
          Final-year CSE student at GITAM University Hyderabad. I write from what I actually build —
          telemetry systems, LLM pipelines, and startup backends.
        </p>
        <div className="flex gap-4 mt-2.5">
          <a
            href="https://github.com/BharatChandra-sys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-white transition-colors"
            itemProp="sameAs"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/bharat-chandra-bodapati/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-white transition-colors"
            itemProp="sameAs"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Related Posts ──────────────────────────────────────────────────────────────
// Trend 2: Branded search — internal links keep readers on your domain longer,
// which improves branded engagement signals.
function RelatedPosts({ currentSlug }) {
  const related = getRelatedPosts(currentSlug);

  if (!related.length) return null;

  return (
    <div className="mt-12">
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">More from Bharat Chandra</p>
      <div className="grid gap-3">
        {related.map(p => (
          <Link key={p.slug} href={`/blog/${p.slug}`}>
            <div className="group bg-white/5 border border-white/10 hover:border-white/25 rounded-xl p-4 transition-all duration-200">
              <p className="text-xs text-white/30 mb-1">{p.date}</p>
              <p className="text-sm text-white/70 group-hover:text-white transition-colors leading-snug">
                {p.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Main BlogPost Component ────────────────────────────────────────────────────
export function BlogPost({ title, date, tags, github, content }) {
  const paragraphs = splitBlocks(content);
  const { words, minutes } = calcReadingStats(content);

  // Scroll progress bar — engagement signal
  const [readPct, setReadPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setReadPct(Math.min(100, Math.round(pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Known during server rendering too, so related posts are in the initial HTML
  const currentSlug = usePathname().split('/').pop();
  const isoDate = getPost(currentSlug)?.published.slice(0, 10) || date;

  return (
    <>
      {/* ── Trend 1: Reading-progress bar — visible engagement signal ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-white/5">
        <div
          className="h-full bg-white/60 transition-all duration-150 ease-out"
          style={{ width: `${readPct}%` }}
          role="progressbar"
          aria-valuenow={readPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
        />
      </div>

      <section className="py-4 md:py-24" aria-label="Blog post">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <HiArrowLeft className="w-4 h-4" />
              All posts
            </Link>

            {/* ── Header ── */}
            <header className="space-y-4">
              {/* Trend 3: first-person, human title is rendered verbatim — set in metadata */}
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug">{title}</h1>

              {/* ── Trend 1 & 7: Author + reading stats — EEAT signals ── */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40">
                <span
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  By{' '}
                  <a
                    href="https://bharatchandra.me"
                    className="text-white/60 hover:text-white transition-colors"
                    itemProp="url"
                  >
                    <span itemProp="name">Bodapati Bharat Chandra</span>
                  </a>
                </span>
                <span className="hidden sm:inline text-white/20">·</span>
                <time dateTime={isoDate}>{date}</time>
                <span className="text-white/20">·</span>
                <span>{minutes} min read</span>
                <span className="text-white/20">·</span>
                <span>{words.toLocaleString()} words</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-white/10 text-white/60 px-2.5 py-0.5 rounded-full border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="h-px bg-white/10" />

            {/* ── Table of Contents (EEAT / depth signal) ── */}
            <TableOfContents content={content} />

            {/* ── Content ── */}
            <article
              className="space-y-5 text-white/75 leading-relaxed text-sm md:text-[15px]"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* Required itemProps for BlogPosting rich result eligibility */}
              <meta itemProp="headline" content={title} />
              <meta itemProp="author" content="Bodapati Bharat Chandra" />
              <meta itemProp="datePublished" content={isoDate} />
              <meta itemProp="dateModified" content={isoDate} />
              <meta itemProp="image" content="https://bharatchandra.me/bodapati-bharat-chandra.jpg" />
              <meta itemProp="publisher" content="Bodapati Bharat Chandra" />
              <meta itemProp="inLanguage" content="en-IN" />
              {paragraphs.map((block, i) => renderBlock(block, i))}
            </article>

            {/* GitHub link */}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2.5 rounded-lg transition-all duration-200"
              >
                <HiExternalLink className="w-4 h-4" />
                View source on GitHub
              </a>
            )}

            {/* ── Trend 1 & 7: Author card with credentials ── */}
            <AuthorCard />

            {/* ── Trend 2: Related posts (branded internal linking) ── */}
            <RelatedPosts currentSlug={currentSlug} />

            <div className="h-px bg-white/10" />
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
