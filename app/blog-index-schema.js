// Blog Index Page Schema - ItemList of Blog Posts
// Import this in blog/page.jsx to add structured data

const BASE_URL = 'https://bharatchandra.me';

export const blogIndexSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Bodapati Bharat Chandra - Technical Writing",
  "description": "Technical writing on production systems, rocket telemetry, LLMs, and startup architecture",
  "url": `${BASE_URL}/blog`,
  "author": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "url": BASE_URL,
    "@id": `${BASE_URL}/#person`
  },
  "blogPost": [
    {
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/blog/can-7usat-rocket-telemetry`,
      "headline": "How I built CAN-7USAT rocket telemetry with sub-5ms latency",
      "description": "A technical breakdown of the real-time ground control station I built for GARI's IN-SPACe national rocketry competition entry — 46-byte binary packets, Kalman filtering, and a 6-state flight state machine.",
      "datePublished": "2026-06-10T00:00:00Z",
      "dateModified": "2026-06-10T00:00:00Z",
      "author": {
        "@id": `${BASE_URL}/#person`
      },
      "url": `${BASE_URL}/blog/can-7usat-rocket-telemetry`,
      "keywords": ["Rocketry", "FastAPI", "WebSockets", "Kalman Filter", "Python"],
      "articleSection": "Engineering",
      "wordCount": 800,
      "timeRequired": "PT4M"
    },
    {
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/blog/on-premise-llm-bhel`,
      "headline": "Building a fully on-premise LLM pipeline at BHEL",
      "description": "How I built a production AI vendor compliance portal for BHEL that runs entirely on local infrastructure — no external APIs, no data leaving the network. FastAPI + Ollama + PyMuPDF.",
      "datePublished": "2026-05-15T00:00:00Z",
      "dateModified": "2026-05-15T00:00:00Z",
      "author": {
        "@id": `${BASE_URL}/#person`
      },
      "url": `${BASE_URL}/blog/on-premise-llm-bhel`,
      "keywords": ["LLM", "FastAPI", "Ollama", "Production AI", "BHEL"],
      "articleSection": "AI/ML",
      "wordCount": 750,
      "timeRequired": "PT4M"
    },
    {
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/blog/co-founding-easify`,
      "headline": "Co-founding Easify: Smart pooling in Hyderabad",
      "description": "What I learned building a ride-pooling platform from scratch — architecture decisions, real-time matching, and the hardest part: getting people to actually use it.",
      "datePublished": "2026-04-20T00:00:00Z",
      "dateModified": "2026-04-20T00:00:00Z",
      "author": {
        "@id": `${BASE_URL}/#person`
      },
      "url": `${BASE_URL}/blog/co-founding-easify`,
      "keywords": ["Startup", "FastAPI", "PostgreSQL", "Product", "Easify"],
      "articleSection": "Startup",
      "wordCount": 650,
      "timeRequired": "PT3M"
    }
  ],
  "mainEntityOfPage": {
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/blog`
  }
};

export const blogBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": `${BASE_URL}/blog`
    }
  ]
};
