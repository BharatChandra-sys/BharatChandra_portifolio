// Image entity endpoint
// Declares both Bharat Chandra photos as fully attributed ImageObjects.
// Helps Google Images and Knowledge Panel associate photos with the correct entity.

import { NextResponse } from 'next/server';

const BASE = 'https://bharatchandra.me';

const imageSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ImageObject",
      "@id": `${BASE}/#photo-primary`,
      "url": `${BASE}/bodapati-bharat-chandra.jpg`,
      "contentUrl": `${BASE}/bodapati-bharat-chandra.jpg`,
      "name": "Bodapati Bharat Chandra — primary headshot",
      "caption": "Bodapati Bharat Chandra, AI/ML Engineer and final-year CSE student at GITAM University Hyderabad",
      "description": "Professional photo of Bodapati Bharat Chandra, AI/ML Engineering Intern at BHEL, Backend & ML Lead at GARI rocketry team, and co-founder of Easify.",
      "width": 400,
      "height": 400,
      "encodingFormat": "image/jpeg",
      "inLanguage": "en-IN",
      "license": BASE,
      "acquireLicensePage": BASE,
      "creditText": "Bodapati Bharat Chandra",
      "copyrightNotice": "© 2026 Bodapati Bharat Chandra. All rights reserved.",
      "creator": {
        "@type": "Person",
        "name": "Bodapati Bharat Chandra",
        "@id": `${BASE}/#person`
      },
      "copyrightHolder": {
        "@type": "Person",
        "name": "Bodapati Bharat Chandra",
        "@id": `${BASE}/#person`
      },
      "datePublished": "2026-06-01",
      "representativeOfPage": true,
      "about": {
        "@type": "Person",
        "name": "Bodapati Bharat Chandra",
        "@id": `${BASE}/#person`
      }
    },
    {
      "@type": "ImageObject",
      "@id": `${BASE}/#photo-secondary`,
      "url": `${BASE}/bodapati-bharat-chandra-2.jpg`,
      "contentUrl": `${BASE}/bodapati-bharat-chandra-2.jpg`,
      "name": "Bodapati Bharat Chandra — secondary photo",
      "caption": "Bodapati Bharat Chandra, Co-founder of Easify and AI/ML Engineer, Hyderabad",
      "description": "Bodapati Bharat Chandra, final-year B.Tech Computer Science student at GITAM University Hyderabad and co-founder of Easify, a smart pooling platform.",
      "width": 400,
      "height": 400,
      "encodingFormat": "image/jpeg",
      "inLanguage": "en-IN",
      "license": BASE,
      "acquireLicensePage": BASE,
      "creditText": "Bodapati Bharat Chandra",
      "copyrightNotice": "© 2026 Bodapati Bharat Chandra. All rights reserved.",
      "creator": {
        "@type": "Person",
        "name": "Bodapati Bharat Chandra",
        "@id": `${BASE}/#person`
      },
      "copyrightHolder": {
        "@type": "Person",
        "name": "Bodapati Bharat Chandra",
        "@id": `${BASE}/#person`
      },
      "datePublished": "2026-07-01",
      "representativeOfPage": false,
      "about": {
        "@type": "Person",
        "name": "Bodapati Bharat Chandra",
        "@id": `${BASE}/#person`
      }
    }
  ]
};

export async function GET() {
  return NextResponse.json(imageSchemas, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800'
    }
  });
}
