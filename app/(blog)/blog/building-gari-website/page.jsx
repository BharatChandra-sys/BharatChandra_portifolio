import { BlogPost } from '../components/BlogPost';

export const metadata = {
  title: "I Built the GARI Website From Zero to gari.live — Bharat Chandra",
  description: "How I designed and shipped the GARI website for GITAM's aerospace team — React, custom visuals, SEO, and a polished story for the CanSat and rocketry programs.",
  keywords: "Bharat Chandra, GARI website, gari.live, aerospace website, React portfolio, GITAM rocketry",
  alternates: {
    canonical: "https://bharatchandra.me/blog/building-gari-website",
  },
  openGraph: {
    title: "Building the GARI Website — Bharat Chandra",
    description: "How I built the GARI website from scratch and launched it at gari.live.",
    url: "https://bharatchandra.me/blog/building-gari-website",
    type: "article",
    publishedTime: "2026-07-15T00:00:00Z",
    authors: ["Bharat Chandra"],
    tags: ["React", "Next.js", "Aerospace", "GARI", "Web Dev"],
    images: [
      {
        url: "https://bharatchandra.me/bodapati-bharat-chandra.jpg",
        width: 1200,
        height: 630,
        alt: "Bodapati Bharat Chandra — GARI website build",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Built the GARI Website From Zero to gari.live — Bharat Chandra",
    description: "A story of designing and launching the GARI website for the team’s CanSat and rocketry programs.",
    images: ["https://bharatchandra.me/bodapati-bharat-chandra.jpg"],
    creator: "@BharatChandra",
  },
};

const BASE = 'https://bharatchandra.me';

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "I Built the GARI Website From Zero to gari.live",
  "description": "How Bodapati Bharat Chandra designed and launched the official GARI website for GITAM's aerospace team, with a strong visual identity and SEO-ready structure.",
  "image": {
    "@type": "ImageObject",
    "url": `${BASE}/bodapati-bharat-chandra.jpg`,
    "width": 1200,
    "height": 630
  },
  "datePublished": "2026-07-15T00:00:00Z",
  "dateModified": "2026-07-15T00:00:00Z",
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
  "keywords": ["React", "Next.js", "Aerospace", "GARI", "Web Dev", "Bodapati Bharat Chandra"],
  "articleSection": "Engineering",
  "wordCount": 650,
  "timeRequired": "PT4M",
  "inLanguage": "en-IN",
  "isAccessibleForFree": true,
  "about": {
    "@type": "Thing",
    "name": "Aerospace team websites"
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
      "name": "Building the GARI Website",
      "item": "https://bharatchandra.me/blog/building-gari-website"
    }
  ]
};

const content = `
I'm Bharat Chandra, and this is the story of building the GARI website from scratch and launching it at gari.live.

## Why the site mattered

The GARI team needed more than a simple landing page. It needed a credible online presence for a nationally selected aerospace team — something that could tell the story of the work, present the team clearly, and make the project feel serious to visitors, sponsors, and collaborators.

## The goal

I wanted the site to feel fast, polished, and technical without being overly complicated. The design needed to reflect the energy of aerospace work while staying usable on mobile and easy to maintain.

## What I built

- A modern React-based landing experience with custom visuals and smooth motion
- A clear section for the CanSat and rocketry programs
- Structured content for the team's mission, work, and public-facing story
- SEO-ready metadata and content structure so the site could be discovered online

## Why this mattered

A good website does more than look nice. For a team like GARI, it acts as a public interface for the work being done. It helps people understand what the team is building and gives the project a stronger professional identity.

## What I learned

The biggest lesson was that product clarity matters more than flashy effects. The strongest version of the site was the one that made the mission feel immediate, credible, and easy to understand.

— Bharat Chandra, GITAM University Hyderabad
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
        tags={["React", "Next.js", "Aerospace", "GARI", "Web Dev"]}
        content={content}
      />
    </>
  );
}
