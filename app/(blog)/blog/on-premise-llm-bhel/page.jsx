import { BlogPost } from '../components/BlogPost';

// Trend 3: First-person title — "I built" signals human authorship and lived experience.
// Trend 1: Specific context (no external APIs, BHEL) builds authority.
export const metadata = {
  title: "I Built an On-Premise LLM at BHEL — No Cloud, No External APIs — Bharat Chandra",
  description: "My approach to building a production AI vendor compliance portal at BHEL that runs entirely on local hardware. FastAPI + Ollama + PyMuPDF, zero data leaving the network.",
  keywords: "Bharat Chandra, BHEL AI, on-premise LLM, Ollama, FastAPI, vendor compliance, Bodapati Bharat Chandra, Bharat Chandra BHEL intern",
  alternates: {
    canonical: "https://bharatchandra.me/blog/on-premise-llm-bhel",
  },
  openGraph: {
    title: "On-premise LLM at BHEL — Bharat Chandra",
    description: "Building production AI that runs entirely on local infrastructure.",
    url: "https://bharatchandra.me/blog/on-premise-llm-bhel",
    type: "article",
    publishedTime: "2026-05-15T00:00:00Z",
    authors: ["Bharat Chandra"],
    tags: ["LLM", "Ollama", "FastAPI", "PyMuPDF", "Production AI"],
    images: [
      {
        url: "https://bharatchandra.me/bodapati-bharat-chandra.jpg",
        width: 1200,
        height: 630,
        alt: "Bodapati Bharat Chandra — On-Premise LLM at BHEL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Built an On-Premise LLM at BHEL — No Cloud, No External APIs — Bharat Chandra",
    description: "Production AI vendor compliance portal at BHEL. FastAPI + Ollama + PyMuPDF, zero data leaving the network.",
    images: ["https://bharatchandra.me/bodapati-bharat-chandra.jpg"],
    creator: "@BharatChandra",
  },
};

const BASE = 'https://bharatchandra.me';

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "I Built an On-Premise LLM at BHEL — No Cloud, No External APIs",
  "description": "Bodapati Bharat Chandra's account of building a production AI vendor compliance portal at BHEL — Ollama (Mistral 7B), FastAPI, PyMuPDF, zero external API dependency.",
  "image": {
    "@type": "ImageObject",
    "url": `${BASE}/bodapati-bharat-chandra.jpg`,
    "width": 1200,
    "height": 630
  },
  "datePublished": "2026-05-15T00:00:00Z",
  "dateModified": "2026-05-15T00:00:00Z",
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
    "@id": `${BASE}/blog/on-premise-llm-bhel`
  },
  "keywords": ["LLM", "Ollama", "FastAPI", "PyMuPDF", "Production AI", "BHEL", "on-premise AI", "Bodapati Bharat Chandra"],
  "articleSection": "AI/ML",
  "wordCount": 750,
  "timeRequired": "PT4M",
  "inLanguage": "en-IN",
  "isAccessibleForFree": true,
  "about": {
    "@type": "Thing",
    "name": "On-Premise Large Language Models"
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
      "name": "On-premise LLM at BHEL",
      "item": "https://bharatchandra.me/blog/on-premise-llm-bhel"
    }
  ]
};

const content = `
I'm Bharat Chandra, currently interning at BHEL (Bharat Heavy Electricals Limited) in Hyderabad. This is about the AI vendor compliance portal I built — a system that processes tender documents using a large language model, with zero data leaving the building.

## Why on-premise?

BHEL handles government contracts and sensitive procurement data. No data could touch external APIs. No OpenAI, no cloud LLMs. The system had to run entirely on local hardware.

That constraint turned out to be the most interesting part of the project.

## The stack

- **Ollama** running a quantized Mistral 7B model on local hardware
- **FastAPI** as the backend API layer
- **PyMuPDF** for PDF text extraction
- **SQLite** for persistence
- **Streamlit** for the internal UI

The whole thing runs on a single machine. No Docker orchestration, no Kubernetes — just a straightforward Python application that BHEL's IT team can maintain.

## The document pipeline

The core flow:

1. Upload a tender PDF via the Streamlit interface
2. PyMuPDF extracts text, tables, and metadata
3. Text gets chunked and sent to the local LLM via Ollama's OpenAI-compatible API
4. The LLM extracts key compliance fields: vendor name, contract value, deadline, eligibility criteria
5. Results are stored in SQLite and displayed in a structured view

The LLM doesn't just extract — it reasons. If a clause is ambiguous, it flags it. If two sections contradict each other, it notes that too.

## The hardest part: prompt engineering for structured output

Getting a 7B model to return consistent JSON was the real challenge. I ended up using a two-pass approach:

**Pass 1:** Ask the model to summarize the relevant section in plain text.
**Pass 2:** Ask it to convert that summary into a specific JSON schema.

Two calls instead of one, but the output quality went from ~60% valid JSON to ~95%.

## What I proposed next

After the portal shipped, I proposed a turbine lifecycle optimisation system using LSTM autoencoders to detect anomalies in turbine sensor data — a digital twin approach. The proposal went to GM-level review. Whether it gets built is above my pay grade, but the exercise of framing a physics-informed ML system for non-technical stakeholders was valuable on its own.

— Bharat Chandra, AI/ML Engineering Intern @ BHEL, Hyderabad
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
        title="Building a fully on-premise LLM pipeline at BHEL"
        date="May 2026"
        tags={["LLM", "Ollama", "FastAPI", "PyMuPDF", "Production AI"]}
        content={content}
      />
    </>
  );
}
