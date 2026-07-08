// Consolidated Schema Endpoint — all structured data in one graph
// Used by SEO tools, validators, and the llms.txt schema reference

import { NextResponse } from 'next/server';

const BASE_URL = 'https://bharatchandra.me';

export async function GET() {
  const allSchemas = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Person ────────────────────────────────────────────────────────────
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        "name": "Bodapati Bharat Chandra",
        "alternateName": ["Bharat Chandra", "BharatChandra-sys"],
        "givenName": "Bharat Chandra",
        "familyName": "Bodapati",
        "url": BASE_URL,
        "email": "bc833498@gmail.com",
        "jobTitle": "AI/ML Engineer",
        "description": "AI/ML engineer and final-year CSE student at GITAM University Hyderabad building production AI systems, rocketry telemetry backends, and autonomous vehicle control stacks.",
        "disambiguatingDescription": "AI/ML Engineering Intern at BHEL, Backend & ML Lead at GARI, co-founder of Easify. Not the cricketer or JEE student sharing similar names.",
        "image": [
          {
            "@type": "ImageObject",
            "url": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
            "width": 1200,
            "height": 630,
            "caption": "Bodapati Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad"
          },
          {
            "@type": "ImageObject",
            "url": `${BASE_URL}/bodapati-bharat-chandra-2.jpg`,
            "width": 1200,
            "height": 630,
            "caption": "Bodapati Bharat Chandra — Co-founder of Easify, Hyderabad"
          }
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Machine Learning Engineer",
          "occupationLocation": { "@type": "City", "name": "Hyderabad" },
          "skills": "Python, PyTorch, FastAPI, MLflow, Kalman Filtering, LLM Deployment, Docker, PostgreSQL"
        },
        "seeks": {
          "@type": "Demand",
          "name": "AI/ML Engineering roles and research collaborations",
          "description": "Open to AI/ML internships now, full-time roles from 2027.",
          "availabilityStarts": "2027-05-01"
        },
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Winner — AI Day Hackathon 2026",
            "credentialCategory": "Award",
            "recognizedBy": { "@type": "Organization", "name": "GITAM University × Kodryx AI" },
            "dateCreated": "2026-03-01"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Winner — HackXplore 2026",
            "credentialCategory": "Award",
            "recognizedBy": { "@type": "Organization", "name": "IEEE-SSIT VJIT" },
            "dateCreated": "2026-04-01"
          }
        ],
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "GITAM University Hyderabad",
          "url": "https://gitam.edu",
          "sameAs": "https://en.wikipedia.org/wiki/GITAM_University"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "BHEL — Bharat Heavy Electricals Limited",
          "url": "https://bhel.com",
          "sameAs": "https://en.wikipedia.org/wiki/Bharat_Heavy_Electricals"
        },
        "sameAs": [
          "https://github.com/BharatChandra-sys",
          "https://www.linkedin.com/in/bharat-chandra-bodapati/",
          "https://orcid.org/0009-0004-4734-1635"
        ],
        "mainEntityOfPage": {
          "@type": "ProfilePage",
          "@id": `${BASE_URL}/#profilepage`,
          "url": BASE_URL
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "IN"
        }
      },

      // ── WebSite ───────────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "Bodapati Bharat Chandra",
        "alternateName": "Bharat Chandra Portfolio",
        "description": "Official portfolio and primary web presence of Bodapati Bharat Chandra — AI/ML Engineer",
        "mainEntity": { "@type": "Person", "@id": `${BASE_URL}/#person` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },

      // ── ProfilePage ───────────────────────────────────────────────────────
      {
        "@type": "ProfilePage",
        "@id": `${BASE_URL}/#profilepage`,
        "url": BASE_URL,
        "name": "Bodapati Bharat Chandra — Official Portfolio",
        "dateCreated": "2026-06-01T00:00:00Z",
        "dateModified": "2026-07-08T00:00:00Z",
        "isPartOf": { "@type": "WebSite", "@id": `${BASE_URL}/#website` },
        "mainEntity": { "@type": "Person", "@id": `${BASE_URL}/#person` }
      },

      // ── SiteNavigationElement ─────────────────────────────────────────────
      {
        "@type": "ItemList",
        "name": "Site Navigation",
        "itemListElement": [
          { "@type": "SiteNavigationElement", "position": 1, "name": "Home", "url": BASE_URL },
          { "@type": "SiteNavigationElement", "position": 2, "name": "Projects", "url": `${BASE_URL}/projects` },
          { "@type": "SiteNavigationElement", "position": 3, "name": "Blog", "url": `${BASE_URL}/blog` },
          { "@type": "SiteNavigationElement", "position": 4, "name": "Contact", "url": `${BASE_URL}/contact` }
        ]
      },

      // ── Publisher Organization ────────────────────────────────────────────
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#website-publisher`,
        "name": "Bodapati Bharat Chandra",
        "url": BASE_URL,
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 60, "height": 60 },
        "founder": { "@type": "Person", "@id": `${BASE_URL}/#person` },
        "sameAs": [
          "https://github.com/BharatChandra-sys",
          "https://www.linkedin.com/in/bharat-chandra-bodapati/"
        ]
      },

      // ── Easify Organization ───────────────────────────────────────────────
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#easify-organization`,
        "name": "Easify",
        "description": "Smart pooling service platform for shared rides in Hyderabad, India",
        "foundingDate": "2023-09-01",
        "founder": [{ "@type": "Person", "@id": `${BASE_URL}/#person` }],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "IN"
        }
      },

      // ── GARI Organization ─────────────────────────────────────────────────
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#gari-organization`,
        "name": "GARI — GITAM Aerospace Rocketry Initiative",
        "description": "GITAM University's rocketry team competing in IN-SPACe national competitions",
        "parentOrganization": {
          "@type": "CollegeOrUniversity",
          "name": "GITAM University Hyderabad",
          "url": "https://gitam.edu"
        },
        "member": [{ "@type": "Person", "@id": `${BASE_URL}/#person` }]
      },

      // ── ContactPoint ──────────────────────────────────────────────────────
      {
        "@type": "ContactPoint",
        "contactType": "Professional Inquiries",
        "email": "bc833498@gmail.com",
        "availableLanguage": ["English", "Hindi", "Telugu"],
        "areaServed": "Worldwide"
      },

      // ── Blog posts ────────────────────────────────────────────────────────
      {
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/blog/can-7usat-rocket-telemetry`,
        "headline": "I Built a Sub-5ms Rocket Telemetry System for IN-SPACe 2026",
        "url": `${BASE_URL}/blog/can-7usat-rocket-telemetry`,
        "datePublished": "2026-06-10T00:00:00Z",
        "dateModified": "2026-06-10T00:00:00Z",
        "author": { "@type": "Person", "@id": `${BASE_URL}/#person` },
        "publisher": { "@type": "Organization", "@id": `${BASE_URL}/#website-publisher` },
        "inLanguage": "en-IN",
        "isAccessibleForFree": true
      },
      {
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/blog/on-premise-llm-bhel`,
        "headline": "I Built an On-Premise LLM at BHEL — No Cloud, No External APIs",
        "url": `${BASE_URL}/blog/on-premise-llm-bhel`,
        "datePublished": "2026-05-15T00:00:00Z",
        "dateModified": "2026-05-15T00:00:00Z",
        "author": { "@type": "Person", "@id": `${BASE_URL}/#person` },
        "publisher": { "@type": "Organization", "@id": `${BASE_URL}/#website-publisher` },
        "inLanguage": "en-IN",
        "isAccessibleForFree": true
      },
      {
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/blog/co-founding-easify`,
        "headline": "What I Learned Co-founding Easify: My Honest Take After Building a Pooling Startup",
        "url": `${BASE_URL}/blog/co-founding-easify`,
        "datePublished": "2026-04-20T00:00:00Z",
        "dateModified": "2026-04-20T00:00:00Z",
        "author": { "@type": "Person", "@id": `${BASE_URL}/#person` },
        "publisher": { "@type": "Organization", "@id": `${BASE_URL}/#website-publisher` },
        "inLanguage": "en-IN",
        "isAccessibleForFree": true
      }
    ]
  };

  return NextResponse.json(allSchemas, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}
