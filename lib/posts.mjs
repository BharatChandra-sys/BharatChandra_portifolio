// Single source of truth for blog post metadata.
// The blog index, related posts, RSS, Atom, sitemap and IndexNow all read this,
// so a new post only has to be added here (plus its own page.jsx).
// Newest first.

export const BASE_URL = 'https://bharatchandra.me';

export const posts = [
  {
    slug: 'building-likhitex-latex-editor',
    title: 'Building Likhitex: A Private LaTeX Editor That Treats Compilation as Code Execution',
    date: 'July 2026',
    published: '2026-07-25T00:00:00Z',
    description: 'How I built a real-time collaborative LaTeX editor with sandboxed Docker + gVisor compilation, Yjs CRDT synchronization, and zero vendor lock-in. Deployed entirely on free-tier infrastructure.',
    tags: ['LaTeX', 'Docker', 'Security', 'FastAPI', 'CRDT'],
    categories: ['LaTeX', 'Docker', 'Security', 'FastAPI', 'CRDT'],
    priority: 0.85,
  },
  {
    slug: 'building-gari-website',
    title: 'Building the GARI Website: From Zero to gari.live',
    date: 'July 2026',
    published: '2026-07-10T00:00:00Z',
    description: "How I designed and shipped the full website for GITAM's nationally-selected aerospace team — React, canvas starfield animations, full SEO, and a ground station software section for IN-SPACe CAN-7USAT 2026.",
    tags: ['React', 'Next.js', 'Aerospace', 'GARI', 'Web Dev'],
    categories: ['React', 'Next.js', 'GARI', 'Aerospace', 'Web Dev'],
    priority: 0.85,
  },
  {
    slug: 'can-7usat-rocket-telemetry',
    title: 'How I built CAN-7USAT rocket telemetry with sub-5ms latency',
    date: 'June 2026',
    published: '2026-06-10T00:00:00Z',
    description: "A technical breakdown of the real-time ground control station I built for GARI's IN-SPACe national rocketry competition entry — 46-byte binary packets, Kalman filtering, and a 6-state flight state machine.",
    tags: ['Rocketry', 'FastAPI', 'WebSockets', 'Kalman Filter'],
    categories: ['Rocketry', 'FastAPI', 'WebSockets', 'Kalman Filter', 'Python'],
    priority: 0.85,
  },
  {
    slug: 'on-premise-llm-bhel',
    title: 'Building a fully on-premise LLM pipeline at BHEL',
    date: 'May 2026',
    published: '2026-05-15T00:00:00Z',
    description: 'How I built a production AI vendor compliance portal for BHEL that runs entirely on local infrastructure — no external APIs, no data leaving the network. FastAPI + Ollama + PyMuPDF.',
    tags: ['LLM', 'FastAPI', 'Ollama', 'Production AI'],
    categories: ['LLM', 'FastAPI', 'Ollama', 'Production AI', 'BHEL'],
    priority: 0.85,
  },
  {
    slug: 'co-founding-easify',
    title: 'Co-founding Easify: Smart pooling in Hyderabad',
    date: 'April 2026',
    published: '2026-04-20T00:00:00Z',
    description: 'What I learned building a ride-pooling platform from scratch — architecture decisions, real-time matching, and the hardest part: getting people to actually use it.',
    tags: ['Startup', 'FastAPI', 'PostgreSQL', 'Product'],
    categories: ['Startup', 'FastAPI', 'PostgreSQL', 'Product', 'Easify'],
    priority: 0.8,
  },
];

export const postUrl = (slug) => `${BASE_URL}/blog/${slug}`;

export const getPost = (slug) => posts.find((post) => post.slug === slug);

// The two most tag-similar posts, excluding the current one.
export function getRelatedPosts(slug, limit = 2) {
  const current = getPost(slug);
  const tags = current ? current.tags : [];
  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({ ...post, score: post.tags.filter((tag) => tags.includes(tag)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Real 1200×630 social card, rendered by /api/og-dynamic.
export const ogImageUrl = (title, type = 'blog') =>
  `${BASE_URL}/api/og-dynamic?title=${encodeURIComponent(title)}&type=${type}`;
