import { BlogPost } from '../components/BlogPost';

export const metadata = {
  title: "Building Likhitex: A Private LaTeX Editor That Treats Compilation as Code Execution — Bharat Chandra",
  description: "How I built a real-time collaborative LaTeX editor with sandboxed compilation, CRDT synchronization, and zero vendor lock-in. Next.js + FastAPI + Docker + gVisor, deployed entirely on free-tier infrastructure.",
  keywords: "Bharat Chandra, Likhitex, LaTeX editor, Docker security, gVisor, Yjs CRDT, Bodapati Bharat Chandra, collaborative LaTeX",
  alternates: {
    canonical: "https://bharatchandra.me/blog/building-likhitex-latex-editor",
  },
  openGraph: {
    title: "Building Likhitex: A Private LaTeX Editor That Treats Compilation as Code Execution — Bharat Chandra",
    description: "How I built a real-time collaborative LaTeX editor with sandboxed compilation and zero vendor lock-in.",
    url: "https://bharatchandra.me/blog/building-likhitex-latex-editor",
    type: "article",
    publishedTime: "2026-07-25T00:00:00Z",
    authors: ["Bharat Chandra"],
    tags: ["LaTeX", "Docker", "Security", "FastAPI", "Next.js", "CRDT"],
    images: [
      {
        url: "https://bharatchandra.me/bodapati-bharat-chandra.jpg",
        width: 1200,
        height: 630,
        alt: "Bodapati Bharat Chandra — Building Likhitex LaTeX Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Likhitex: A Private LaTeX Editor That Treats Compilation as Code Execution",
    description: "Real-time collaborative LaTeX with sandboxed Docker compilation and zero vendor lock-in.",
    images: ["https://bharatchandra.me/bodapati-bharat-chandra.jpg"],
    creator: "@BharatChandra",
  },
};

const BASE = 'https://bharatchandra.me';

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Building Likhitex: A Private LaTeX Editor That Treats Compilation as Code Execution",
  "description": "How Bodapati Bharat Chandra built a real-time collaborative LaTeX editor with sandboxed Docker + gVisor compilation, Yjs CRDT synchronization, and free-tier deployment.",
  "image": {
    "@type": "ImageObject",
    "url": `${BASE}/bodapati-bharat-chandra.jpg`,
    "width": 1200,
    "height": 630
  },
  "datePublished": "2026-07-25T00:00:00Z",
  "dateModified": "2026-07-25T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "@id": `${BASE}/#person`,
    "url": BASE,
    "image": `${BASE}/bodapati-bharat-chandra.jpg`,
    "sameAs": [
      "https://github.com/BharatChandra-sys",
      "https://www.linkedin.com/in/bharat-chandra-bodapati/",
      "https://orcid.org/0009-0004-4734-1635"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE}/#website-publisher`,
    "name": "Bodapati Bharat Chandra",
    "url": BASE,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE}/logo.png`,
      "width": 60,
      "height": 60
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${BASE}/blog/building-likhitex-latex-editor`
  },
  "keywords": ["LaTeX", "Docker", "Security", "FastAPI", "Next.js", "CRDT", "Yjs", "gVisor", "Bodapati Bharat Chandra"],
  "articleSection": "Engineering",
  "wordCount": 900,
  "timeRequired": "PT5M",
  "inLanguage": "en-IN",
  "isAccessibleForFree": true,
  "about": {
    "@type": "SoftwareApplication",
    "name": "Likhitex",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web"
  },
  "backstory": "Bodapati Bharat Chandra built Likhitex as an alternative to commercial LaTeX editors for trusted research groups. The system runs entirely on free-tier infrastructure (Vercel + Render + Neon) with no vendor dependencies.",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".speakable-summary", "article p:first-of-type"]
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bharatchandra.me"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://bharatchandra.me/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Building Likhitex",
      "item": "https://bharatchandra.me/blog/building-likhitex-latex-editor"
    }
  ]
};

const content = `
I'm Bharat Chandra, and this is the story of building Likhitex — a private, invite-only collaborative LaTeX editor for small research groups. The core idea: treat LaTeX compilation as code execution, sandbox everything, and never depend on a vendor's infrastructure.

## The problem with existing LaTeX editors

Overleaf is great for open collaboration. But for small, trusted research groups — thesis committees, grant teams, confidential paper drafts — the commercial model doesn't fit:

- Compile timeouts on free tiers
- Arbitrary collaborator limits
- Data on someone else's server
- Vendor lock-in

Likhitex solves this by being invite-only, self-hosted, and designed to run on free-tier infrastructure with zero operational cost.

## The security constraint that drove everything

LaTeX compilation is code execution. The \`\\write18\` command (shell-escape) lets you run arbitrary shell commands from inside a \`.tex\` file. If you're running untrusted LaTeX on shared infrastructure, that's a security disaster.

My approach: treat every compilation as hostile. No trust, no exceptions.

## The compilation sandbox

Every LaTeX compile runs in an isolated Docker container with:

- **gVisor runtime** — application kernel sandbox that intercepts syscalls
- **\`--network none\`** — zero external network access
- **\`shell_escape = f\`** enforced in \`texmf.cnf\` — \\write18 disabled at TeX engine level
- **Read-only TeX tree** — immutable TeX Live installation
- **Resource limits** — strict CPU, memory, file size, and process count via \`prlimit\`
- **60-second hard timeout** with process group termination

The container runs with \`env -i\` and has no access to secrets, credentials, or the host filesystem beyond the single \`.tex\` file being compiled.

## Real-time collaboration with Yjs

The editor uses **Yjs** — a CRDT (Conflict-free Replicated Data Type) framework that lets multiple users edit the same document simultaneously without a central lock.

Every keystroke gets converted into a CRDT operation and broadcast over WebSockets. When two users type at the same time, Yjs automatically merges the edits without conflicts. No operational transforms, no manual conflict resolution.

The result: Google Docs-style live cursors, instant synchronization, and zero merge conflicts.

## WebSocket authentication with time-limited tickets

WebSockets don't support headers (annoying), so I couldn't just pass a JWT on connect.

The solution: **one-time tickets** stored in Redis with a 30-second TTL.

1. Client requests a WebSocket ticket from the REST API (JWT-authenticated)
2. Backend generates a random ticket ID and stores it in Redis: \`ticket:{id}\` → \`user_id\`, TTL 30s
3. Client connects to WebSocket with \`?ticket={id}\`
4. Backend validates the ticket, deletes it from Redis, and authenticates the WebSocket

Once the connection is established, subsequent messages are validated against the active session. One ticket = one connection.

## The tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 15 + TypeScript | Server-side rendering, clean routing, full SEO control |
| Backend API | FastAPI + Python 3.12 | Async-first, type-safe, fast iteration |
| Database | Neon Postgres (free tier) | Serverless Postgres, auto-scaling, zero ops |
| File Storage | Cloudflare R2 (S3-compatible) | Free egress, S3 API, no lock-in |
| Cache/Queue | Upstash Redis | Rate limiting, compile queue, WebSocket tickets |
| Authentication | Clerk | JWT tokens, invite-only enforcement via backend allowlist |
| Collaboration | Hocuspocus + Yjs | CRDT synchronization, WebSocket server |
| Compiler | TeX Live + Docker + gVisor | Sandboxed, isolated, secure LaTeX compilation |
| Editor | CodeMirror 6 | Extensible, LaTeX syntax support |
| PDF Viewer | PDF.js | Client-side rendering, no server load |

The entire stack is designed to run on **free-tier infrastructure**: Vercel (frontend), Render (backend + compiler), Neon (database), Cloudflare R2 (storage), Upstash (Redis). Zero monthly cost for small teams.

## Input validation: the boring but critical part

LaTeX lets you write some truly cursed input: path traversal, symlinks, zip bombs, shell-escape attempts. Here's how I handled each:

**ZIP bomb detection**: Size limits + decompression ratio checks. If a 1MB ZIP extracts to 500MB, it gets rejected.

**Path traversal**: Reject \`../\`, absolute paths, and directory escapes. Every file path gets normalized and validated against an allowlist.

**Symlink rejection**: Block all symbolic links in uploaded archives. No exceptions.

**Extension allowlist**: Only \`.tex\`, \`.bib\`, \`.sty\`, \`.png\`, \`.jpg\`, \`.pdf\`, etc. Everything else gets rejected.

**Package blocklist**: Reject packages that require shell-escape (\`minted\`, \`pythontex\`). If your document needs those, it doesn't compile.

## The sub-60s compile target

Original target: 60 seconds per compile. Actual result: most documents compile in under 15 seconds.

The key was keeping the TeX Live image warm and reusing containers across compiles. Cold-start time is still ~5s, but after the first compile, subsequent ones are near-instant.

## Where the project stands

**Phases 1-3 are live** — Likhitex is a fully functional collaborative LaTeX editor with sandboxed compilation, user authentication, and real-time multi-user editing.

### Phase 1: Core + Security ✅
- Sandboxed LaTeX compilation with Docker + gVisor
- Security test suite (path traversal, shell-escape, zip bombs)
- Basic editor with CodeMirror 6 + PDF preview
- Deployed to Vercel (frontend) + Render (backend)

### Phase 2: Accounts & Persistence ✅
- Clerk authentication with JWT verification
- User and project database models (Neon Postgres)
- File upload and ZIP import/export
- Storage quotas and limits (Cloudflare R2)
- Project dashboard with role-based access

### Phase 3: Real-Time Collaboration ✅
- Yjs CRDT document synchronization
- Live cursor tracking and presence awareness
- WebSocket authentication with time-limited tickets
- Share by email with Owner/Editor/Viewer roles
- Multi-user editing with zero merge conflicts

**What's working now**: You can invite collaborators, edit LaTeX documents together in real-time with live cursors, compile in isolated containers, and see instant PDF previews. All on free-tier infrastructure.

### Still to ship

**Phase 4** (Production Readiness): Compile queue with position display, rate limiting on all endpoints, error log parsing, version history with diffs, automated backup verification.

**Phase 5** (Quality of Life): SyncTeX jump-to-source, LaTeX autocomplete, template presets, monthly backup restore tests.

The system is production-ready for small teams. The roadmap is public on GitHub.

## Why open-source if it's invite-only?

The code is MIT-licensed so anyone can fork it and run their own instance. The hosted version at the production URL is invite-only because it's designed for small, trusted groups — not open collaboration.

If you're a research group that needs this, you can self-host. If you want access to the hosted instance, reach out.

— Bharat Chandra, GITAM University Hyderabad  
GitHub: [github.com/BharatChandra-sys/Likhitex](https://github.com/BharatChandra-sys/Likhitex)
`;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPost
        title="Building Likhitex: A Private LaTeX Editor That Treats Compilation as Code Execution"
        date="July 2026"
        tags={["LaTeX", "Docker", "Security", "FastAPI", "Next.js", "CRDT"]}
        github="https://github.com/BharatChandra-sys/Likhitex"
        content={content}
      />
    </>
  );
}
