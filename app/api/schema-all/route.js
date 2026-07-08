// Consolidated Schema Endpoint for SEO Tools
// Provides all structured data in one place for validation

import { NextResponse } from 'next/server';

const BASE_URL = 'https://bharatchandra.me';

export async function GET() {
  const allSchemas = {
    "@context": "https://schema.org",
    "@graph": [
      // Person Schema
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        "name": "Bodapati Bharat Chandra",
        "alternateName": ["Bharat Chandra", "BharatChandra-sys"],
        "url": BASE_URL,
        "email": "bc833498@gmail.com",
        "jobTitle": "AI/ML Engineer",
        "description": "AI/ML engineer and final-year CSE student at GITAM University Hyderabad",
        "sameAs": [
          "https://github.com/BharatChandra-sys",
          "https://www.linkedin.com/in/bharat-chandra-bodapati/",
          "https://orcid.org/0009-0004-4734-1635"
        ]
      },
      // Website Schema
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "Bodapati Bharat Chandra",
        "description": "Personal portfolio of Bodapati Bharat Chandra — AI/ML Engineer",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      // Organization - Easify
      {
        "@type": "Organization",
        "name": "Easify",
        "foundingDate": "2023",
        "founder": { "@id": `${BASE_URL}/#person` },
        "description": "Smart pooling service platform in Hyderabad"
      },
      // Organization - GARI
      {
        "@type": "Organization",
        "name": "GARI — GITAM Aerospace Rocketry Initiative",
        "member": { "@id": `${BASE_URL}/#person` }
      },
      // ContactPoint
      {
        "@type": "ContactPoint",
        "contactType": "Professional Inquiries",
        "email": "bc833498@gmail.com",
        "availableLanguage": ["English", "Hindi", "Telugu"]
      }
    ]
  };

  return NextResponse.json(allSchemas, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
