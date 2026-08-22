import { BlogPost } from '../components/BlogPost';

export const metadata = {
  title: "Building the GARI Website: From Zero to gari.live — Bharat Chandra",
  description: "How I designed and shipped the full website for GITAM's nationally-selected aerospace team — React, canvas starfield animations, full SEO, and a ground station software section for IN-SPACe CAN-7USAT 2026.",
  keywords: "Bharat Chandra, GARI website, gari.live, GITAM aerospace, Next.js portfolio, Bodapati Bharat Chandra, IN-SPACe",
  alternates: {
    canonical: "https://bharatchandra.me/blog/building-gari-website",
  },
  openGraph: {
    title: "Building the GARI Website: From Zero to gari.live — Bharat Chandra",
    description: "How I built and shipped the website for GITAM's nationally-selected aerospace rocketry team.",
    url: "https://bharatchandra.me/blog/building-gari-website",
    type: "article",
    publishedTime: "2026-07-10T00:00:00Z",
    authors: ["Bharat Chandra"],
    tags: ["React", "Next.js", "GARI", "Aerospace", "Web Dev"],
    images: [
      {
        url: "https://bharatchandra.me/bodapati-bharat-chandra.jpg",
        width: 1200,
        height: 630,
        alt: "Bodapati Bharat Chandra — Building the GARI Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building the GARI Website: From Zero to gari.live — Bharat Chandra",
    description: "How I built and shipped the website for GITAM's nationally-selected aerospace rocketry team.",
    images: ["https://bharatchandra.me/bodapati-bharat-chandra.jpg"],
    creator: "@BharatChandra",
  },
};

const BASE = 'https://bharatchandra.me';

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Building the GARI Website: From Zero to gari.live",
  "description": "How Bodapati Bharat Chandra designed and shipped the full website for GITAM's nationally-selected aerospace team — React, canvas starfield, full SEO, ground station section.",
  "image": {
    "@type": "ImageObject",
    "url": `${BASE}/bodapati-bharat-chandra.jpg`,
    "width": 1200,
    "height": 630
  },
  "datePublished": "2026-07-10T00:00:00Z",
  "dateModified": "2026-07-10T00:00:00Z",
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
    "@id": `${BASE}/blog/building-gari-website`
  },
  "about": {
    "@type": "Organization",
    "@id": "https://gari.live/#organization",
    "name": "GARI — GITAM Aerospace Rocketry Initiative",
    "url": "https://gari.live"
  },
  "keywords": ["GARI", "gari.live", "React", "Next.js", "Aerospace", "Web Development", "IN-SPACe", "Bodapati Bharat Chandra"],
  "articleSection": "Engineering",
  "wordCount": 700,
  "timeRequired": "PT4M",
  "inLanguage": "en-IN",
  "isAccessibleForFree": true,
  "backstory": "Bodapati Bharat Chandra built the GARI website as Ground Station & Software Lead for GITAM's rocketry team, which was nationally selected to compete in IN-SPACe CAN-7USAT 2026.",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".speakable-summary", "article p:first-of-type"]
  },
  "isPartOf": {
    "@type": "Organization",
    "@id": "https://gari.live/#organization",
    "name": "GARI — GITAM Aerospace Rocketry Initiative",
    "url": "https://gari.live"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bharatchandra.me" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://bharatchandra.me/blog" },
    { "@type": "ListItem", "position": 3, "name": "Building the GARI Website", "item": "https://bharatchandra.me/blog/building-gari-website" }
  ]
};

const content = `
I'm Bharat Chandra — Ground Station & Software Lead at GARI (GITAM Aerospace Rocketry Initiative). This is the story of building [gari.live](https://gari.live), the website for GITAM's nationally-selected aerospace team competing in IN-SPACe CAN-7USAT 2026.

## Why GARI needed a real website

GARI had cleared PDR for both the CanSat and Rocket programs — a serious technical milestone. But the website didn't reflect that. We needed something that communicated the team's technical depth, mission status, and sponsor value proposition without looking like a typical student club page.

The brief: build something that looks like a real aerospace team's website, not a university project.

## The tech stack

- **Next.js 14** with App Router — server-rendered pages, clean URLs, full SEO control
- **Tailwind CSS** — fast iteration without fighting a design system
- **Framer Motion** — smooth section reveals and timeline animations
- **Canvas API** — custom starfield background on the homepage, written from scratch
- **Vercel** — zero-config deployment, edge CDN

No template. No theme. Everything from scratch.

## The canvas starfield

The homepage has a live starfield animation — 200 particles drifting across the screen at different depths and speeds to give the illusion of moving through space.

The key was making it feel subtle, not distracting. The stars are small (0.5–2px), slow-moving, and slightly transparent so they don't fight with the content.

The canvas resizes correctly on window resize and cleans up on component unmount — the kind of thing that breaks on template sites but needs to be right on a production site.

## Mission timeline component

The mission status section — PDR Cleared → CDR In Progress → Build & Integration → Launch — is one of the most important parts of the site for sponsors and judges.

I built it as a four-phase vertical timeline with status indicators (CLEARED / IN PROGRESS / UPCOMING) so anyone can see at a glance where the team is in the competition cycle. Each phase links to the relevant mission detail page.

## SEO — treating it like a client site

This was the first time I applied the same SEO discipline I'd used on my own portfolio to someone else's team.

Key decisions:
- **Organization schema** with parentOrganization pointing to GITAM University and member pointing to the team
- **Proper page hierarchy** — /, /about, /mission, /cansat, /team, /achievements, /sponsors, /contact — each with unique metadata
- **Open Graph images** for every page — team photo, rocket image, mission diagrams
- **Canonical URLs** and hreflang tags
- **robots.txt** that allows all crawlers but blocks training scrapers

The result: Google indexed the site within 48 hours and it started appearing for "GARI GITAM aerospace" and "IN-SPACe CAN-7USAT GITAM" queries.

## The team page

30+ members across Aerospace, ECE, CSE, and Mechanical. Each member has a photo, role, department, year — and a LinkedIn link where available.

My card on the team page links back to [bharatchandra.me](https://bharatchandra.me), which closes the loop for Google's entity graph: GARI links to me, I link to GARI, and the schema on both sites confirms the same person.

## What's next

The static site is live. The dynamic layer — live mission telemetry dashboard, competition result tracking, sponsor portal — is next. Same stack, same principles.

— Bharat Chandra, Ground Station & Software Lead, GARI
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
        title="Building the GARI Website: From Zero to gari.live"
        date="July 2026"
        tags={["React", "Next.js", "GARI", "Aerospace", "Web Dev"]}
        github="https://gari.live"
        content={content}
      />
    </>
  );
}
