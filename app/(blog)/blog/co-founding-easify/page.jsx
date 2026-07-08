import { BlogPost } from '../components/BlogPost';

// Trend 3: Honest, personal title — "What I learned" is a proven CTR pattern.
// Trend 7: Human-written, lived-experience framing in the description.
export const metadata = {
  title: "What I Learned Co-founding Easify: My Honest Take After Building a Pooling Startup — Bharat Chandra",
  description: "I co-founded Easify, a ride-pooling platform in Hyderabad. Here's my honest breakdown: the architecture decisions, real-time matching trade-offs, and why the hardest part had nothing to do with code.",
  keywords: "Bharat Chandra, Easify, pooling startup Hyderabad, co-founder, FastAPI startup, ride pooling India, Bodapati Bharat Chandra",
  alternates: {
    canonical: "https://bharatchandra.me/blog/co-founding-easify",
  },
  openGraph: {
    title: "Co-founding Easify — Bharat Chandra",
    description: "Building a ride-pooling platform from scratch in Hyderabad.",
    url: "https://bharatchandra.me/blog/co-founding-easify",
    type: "article",
    publishedTime: "2026-04-20T00:00:00Z",
    authors: ["Bharat Chandra"],
    tags: ["Startup", "FastAPI", "PostgreSQL", "Product", "Hyderabad"],
    images: [
      {
        url: "https://bharatchandra.me/bodapati-bharat-chandra.jpg",
        width: 1200,
        height: 630,
        alt: "Bodapati Bharat Chandra — Co-founding Easify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What I Learned Co-founding Easify — Bharat Chandra",
    description: "My honest take after building a ride-pooling startup in Hyderabad. Architecture, matching, and why trust beats code.",
    images: ["https://bharatchandra.me/bodapati-bharat-chandra.jpg"],
    creator: "@BharatChandra",
  },
};

const BASE = 'https://bharatchandra.me';

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "What I Learned Co-founding Easify: My Honest Take After Building a Pooling Startup",
  "description": "Bodapati Bharat Chandra's honest account of co-founding Easify in Hyderabad — real-time matching, FastAPI + PostgreSQL backend, and why trust matters more than code.",
  "image": {
    "@type": "ImageObject",
    "url": `${BASE}/bodapati-bharat-chandra.jpg`,
    "width": 1200,
    "height": 630
  },
  "datePublished": "2026-04-20T00:00:00Z",
  "dateModified": "2026-04-20T00:00:00Z",
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
    "@id": `${BASE}/blog/co-founding-easify`
  },
  "keywords": ["Startup", "FastAPI", "PostgreSQL", "Product", "Hyderabad", "Easify", "Ride Pooling", "Bodapati Bharat Chandra"],
  "articleSection": "Startup",
  "wordCount": 650,
  "timeRequired": "PT3M",
  "inLanguage": "en-IN",
  "isAccessibleForFree": true,
  "about": {
    "@type": "Thing",
    "name": "Startup Co-founding"
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
      "name": "Co-founding Easify",
      "item": "https://bharatchandra.me/blog/co-founding-easify"
    }
  ]
};

const content = `
I'm Bharat Chandra, and alongside my work at BHEL and GARI, I co-founded Easify — a smart pooling service platform for Hyderabad.

## The problem we're solving

Hyderabad has a commute problem. A lot of people travel similar routes at similar times, and there's no lightweight way to coordinate sharing those trips. Existing solutions are either too expensive, too complex to use, or just not trusted.

Easify is the direct answer: connect people going the same way, make the economics work for everyone, keep the interface dead simple.

## What I built

I own the backend and the system architecture. The stack:

- **FastAPI** — async API server
- **PostgreSQL** — relational data model for users, routes, rides, payments
- **WebSockets** — real-time ride matching and status updates
- **JWT auth** — role-based access (rider, driver, admin)
- **Razorpay** — payment integration

The hardest architectural decision was the matching algorithm. Real-time matching with reasonable latency requires thinking carefully about data structures. We use a spatial index on pickup points and filter by time window first, then route similarity.

## What I learned about building products

The technical stuff is the easy part. The hard part is:

**Trust.** People don't get into a car with a stranger based on a well-designed app. They do it because someone they know already did it. The first 50 users determine everything.

**Simplicity.** Every feature I wanted to add, I cut. The MVP is embarrassingly minimal. That's correct.

**Feedback loops.** The only way to know if the matching algorithm is good enough is to watch real people use it and ask them immediately after.

## Where we are

We're in early launch phase in Hyderabad. The platform is live. The real work now is not technical — it's getting those first 50 users who actually commit to using it regularly.

If you're in Hyderabad and interested, reach out.

— Bharat Chandra, Co-founder, Easify
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
        title="Co-founding Easify: Smart pooling in Hyderabad"
        date="April 2026"
        tags={["Startup", "FastAPI", "PostgreSQL", "Product", "Hyderabad"]}
        content={content}
      />
    </>
  );
}
