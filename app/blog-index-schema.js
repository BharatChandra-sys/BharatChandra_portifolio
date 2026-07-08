// Blog Index Page Schema
// Used by app/(blog)/blog/page.jsx — was previously defined but never rendered.
// Now correctly injected into the blog index page.

const BASE_URL = 'https://bharatchandra.me';

// Shared publisher object — matches layout.js publisherSchema @id
const publisher = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#website-publisher`,
  "name": "Bodapati Bharat Chandra",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/logo.png`,
    "width": 60,
    "height": 60
  }
};

export const blogIndexSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${BASE_URL}/blog`,
  "name": "Bodapati Bharat Chandra — Technical Writing",
  "description": "Technical writing on production AI systems, rocket telemetry, on-premise LLMs, and startup architecture. Written by Bodapati Bharat Chandra from direct experience.",
  "url": `${BASE_URL}/blog`,
  "inLanguage": "en-IN",
  "author": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "url": BASE_URL,
    "@id": `${BASE_URL}/#person`,
    "image": `${BASE_URL}/bodapati-bharat-chandra.jpg`
  },
  "publisher": publisher,
  "blogPost": [
    {
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/blog/can-7usat-rocket-telemetry`,
      "headline": "I Built a Sub-5ms Rocket Telemetry System for IN-SPACe 2026",
      "description": "How Bodapati Bharat Chandra engineered the CAN-7USAT ground control station — 46-byte binary packets, Kalman filter sensor fusion, and WebSocket broadcasting that hit under 5ms end-to-end.",
      "datePublished": "2026-06-10T00:00:00Z",
      "dateModified": "2026-06-10T00:00:00Z",
      "author": {
        "@type": "Person",
        "name": "Bodapati Bharat Chandra",
        "@id": `${BASE_URL}/#person`,
        "image": `${BASE_URL}/bodapati-bharat-chandra.jpg`
      },
      "publisher": publisher,
      "image": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
        "width": 1200,
        "height": 630
      },
      "url": `${BASE_URL}/blog/can-7usat-rocket-telemetry`,
      "keywords": ["Rocketry", "FastAPI", "WebSockets", "Kalman Filter", "Python", "Bodapati Bharat Chandra"],
      "articleSection": "Engineering",
      "wordCount": 800,
      "timeRequired": "PT4M",
      "inLanguage": "en-IN",
      "isAccessibleForFree": true,
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/can-7usat-rocket-telemetry` }
    },
    {
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/blog/on-premise-llm-bhel`,
      "headline": "I Built an On-Premise LLM at BHEL — No Cloud, No External APIs",
      "description": "Bodapati Bharat Chandra's account of building a production AI vendor compliance portal at BHEL — Ollama (Mistral 7B), FastAPI, PyMuPDF, zero external API dependency.",
      "datePublished": "2026-05-15T00:00:00Z",
      "dateModified": "2026-05-15T00:00:00Z",
      "author": {
        "@type": "Person",
        "name": "Bodapati Bharat Chandra",
        "@id": `${BASE_URL}/#person`,
        "image": `${BASE_URL}/bodapati-bharat-chandra.jpg`
      },
      "publisher": publisher,
      "image": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
        "width": 1200,
        "height": 630
      },
      "url": `${BASE_URL}/blog/on-premise-llm-bhel`,
      "keywords": ["LLM", "FastAPI", "Ollama", "Production AI", "BHEL", "Bodapati Bharat Chandra"],
      "articleSection": "AI/ML",
      "wordCount": 750,
      "timeRequired": "PT4M",
      "inLanguage": "en-IN",
      "isAccessibleForFree": true,
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/on-premise-llm-bhel` }
    },
    {
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/blog/co-founding-easify`,
      "headline": "What I Learned Co-founding Easify: My Honest Take After Building a Pooling Startup",
      "description": "Bodapati Bharat Chandra's honest account of co-founding Easify — real-time matching, FastAPI + PostgreSQL backend, and why the hardest part had nothing to do with code.",
      "datePublished": "2026-04-20T00:00:00Z",
      "dateModified": "2026-04-20T00:00:00Z",
      "author": {
        "@type": "Person",
        "name": "Bodapati Bharat Chandra",
        "@id": `${BASE_URL}/#person`,
        "image": `${BASE_URL}/bodapati-bharat-chandra.jpg`
      },
      "publisher": publisher,
      "image": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
        "width": 1200,
        "height": 630
      },
      "url": `${BASE_URL}/blog/co-founding-easify`,
      "keywords": ["Startup", "FastAPI", "PostgreSQL", "Product", "Easify", "Bodapati Bharat Chandra"],
      "articleSection": "Startup",
      "wordCount": 650,
      "timeRequired": "PT3M",
      "inLanguage": "en-IN",
      "isAccessibleForFree": true,
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/co-founding-easify` }
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
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` }
  ]
};
