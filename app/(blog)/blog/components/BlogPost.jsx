"use client"
import React, { useEffect, useState } from 'react';
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

// ── ISO date map — dateTime attr must be machine-readable ISO 8601 ────────────
// Human display string → ISO date for the dateTime attribute
const DATE_ISO_MAP = {
  'June 2026': '2026-06-10',
  'May 2026':  '2026-05-15',
  'April 2026': '2026-04-20',
};

function toISODate(humanDate) {
  return DATE_ISO_MAP[humanDate] || humanDate;
}
function renderBlock(block, i) {
  if (block.startsWith('## ')) {
    const id = block.replace('## ', '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return (
      <h2 key={i} id={id} className="text-xl font-bold text-white mt-10 mb-3 scroll-mt-20">
        {block.replace('## ', '')}
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
  if (block.includes('\n- ')) {
    const lines = block.split('\n');
    return (
      <ul key={i} className="space-y-2 list-none">
        {lines.map((line, j) =>
          line.startsWith('- ') ? (
            <li key={j} className="flex items-start gap-2">
              <span className="text-white/30 mt-1">▸</span>
              <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 rounded text-white/80 text-sm font-mono">$1</code>') }} />
            </li>
          ) : line.trim() ? (
            <p key={j} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>') }} />
          ) : null
        )}
      </ul>
    );
  }
  // numbered lists
  if (/^\d+\.\s/.test(block.split('\n')[0])) {
    const lines = block.split('\n').filter(Boolean);
    return (
      <ol key={i} className="space-y-2 list-none counter-reset-item">
        {lines.map((line, j) => {
          const match = line.match(/^(\d+)\.\s(.+)/);
          if (!match) return null;
          return (
            <li key={j} className="flex items-start gap-3">
              <span className="text-white/30 font-mono text-sm mt-0.5 min-w-[1.2rem]">{match[1]}.</span>
              <span dangerouslySetInnerHTML={{ __html: match[2].replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>') }} />
            </li>
          );
        })}
      </ol>
    );
  }
  // code block
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
  return (
    <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 rounded text-white/80 text-sm font-mono">$1</code>') }} />
  );
}

// ── Table of Contents ──────────────────────────────────────────────────────────
// Trend 1: EEAT signal — well-structured content shows depth and expertise.
function TableOfContents({ content }) {
  const headings = [...content.matchAll(/^## (.+)$/gm)].map(m => ({
    text: m[1],
    id: m[1].toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
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
const ALL_POSTS = [
  {
    slug: 'can-7usat-rocket-telemetry',
    title: 'How I built CAN-7USAT rocket telemetry with sub-5ms latency',
    date: 'June 2026',
    tags: ['Rocketry', 'FastAPI', 'WebSockets', 'Kalman Filter'],
  },
  {
    slug: 'on-premise-llm-bhel',
    title: 'Building a fully on-premise LLM pipeline at BHEL',
    date: 'May 2026',
    tags: ['LLM', 'FastAPI', 'Ollama', 'Production AI'],
  },
  {
    slug: 'co-founding-easify',
    title: 'Co-founding Easify: Smart pooling in Hyderabad',
    date: 'April 2026',
    tags: ['Startup', 'FastAPI', 'PostgreSQL', 'Product'],
  },
];

function RelatedPosts({ currentSlug, currentTags }) {
  const related = ALL_POSTS
    .filter(p => p.slug !== currentSlug)
    .map(p => ({
      ...p,
      score: p.tags.filter(t => currentTags.includes(t)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

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
  const paragraphs = content.trim().split(/\n\n+/);
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

  // Derive slug from current path (client only)
  const [currentSlug, setCurrentSlug] = useState('');
  useEffect(() => {
    const parts = window.location.pathname.split('/');
    setCurrentSlug(parts[parts.length - 1]);
  }, []);

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

      <section className="py-24" aria-label="Blog post">
        <div className="container mx-auto px-6 max-w-2xl">
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
                <time dateTime={toISODate(date)}>{date}</time>
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
              className="space-y-5 text-white/75 leading-relaxed text-[15px]"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* Required itemProps for BlogPosting rich result eligibility */}
              <meta itemProp="headline" content={title} />
              <meta itemProp="author" content="Bodapati Bharat Chandra" />
              <meta itemProp="datePublished" content={toISODate(date)} />
              <meta itemProp="dateModified" content={toISODate(date)} />
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
            <RelatedPosts currentSlug={currentSlug} currentTags={tags} />

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
