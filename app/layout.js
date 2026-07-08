import localFont from "next/font/local";
import "./globals.css";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Providers/Theme";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const BASE_URL = "https://bharatchandra.me";

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Bodapati Bharat Chandra | AI/ML Engineer & Aerospace Systems Builder",
    template: "%s | Bodapati Bharat Chandra",
  },

  description:
    "Bodapati Bharat Chandra (Bharat Chandra) is an AI/ML engineer and final-year CSE student at GITAM University Hyderabad. Building production AI systems, rocket telemetry backends, autonomous underwater vehicle stacks, and co-founder of Easify.",

  keywords: [
    "Bodapati Bharat Chandra",
    "Bharat Chandra",
    "Bharat Chandra GITAM",
    "Bodapati Bharat Chandra GITAM",
    "Bharat Chandra AI engineer",
    "Bodapati Bharat Chandra AI engineer",
    "BharatChandra-sys",
    "Bharat Chandra Hyderabad",
    "Bodapati Bharat Chandra Hyderabad",
    "Bharat Chandra BHEL",
    "Bodapati Bharat Chandra BHEL",
    "Bharat Chandra GARI rocketry",
    "Bodapati Bharat Chandra Easify",
    "GITAM University Hyderabad CSE",
    "CAN-7USAT rocket telemetry",
    "AUVBrain autonomous underwater vehicle",
    "MedVision AI diabetic ulcer",
    "FactCheck AI fake news",
    "Bharat Chandra portfolio",
    "Bodapati Bharat Chandra portfolio",
  ],

  authors: [{ name: "Bodapati Bharat Chandra", url: BASE_URL }],

  creator: "Bodapati Bharat Chandra",
  publisher: "Bodapati Bharat Chandra",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-IN': BASE_URL,
      'en': BASE_URL,
      'x-default': BASE_URL,
    },
  },

  openGraph: {
    type: "profile",
    firstName: "Bharat Chandra",
    lastName: "Bodapati",
    url: BASE_URL,
    title: "Bodapati Bharat Chandra | AI/ML Engineer",
    description:
      "Bodapati Bharat Chandra — production AI systems, rocketry telemetry, AUV stacks, and co-founder of Easify. Final-year CSE @ GITAM Hyderabad.",
    siteName: "Bodapati Bharat Chandra",
    locale: "en_IN",
    images: [
      {
        // Primary headshot — submitted to Google for Knowledge Panel
        url: "/bodapati-bharat-chandra.jpg",
        width: 1200,
        height: 630,
        alt: "Bodapati Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad",
        type: "image/jpeg",
      },
      {
        // Second photo — more image entity signals = stronger disambiguation
        url: "/bodapati-bharat-chandra-2.jpg",
        width: 1200,
        height: 630,
        alt: "Bodapati Bharat Chandra — Co-founder of Easify, Hyderabad",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bodapati Bharat Chandra | AI/ML Engineer",
    description:
      "Bodapati Bharat Chandra — production AI systems, rocketry backends, AUV stacks. Final-year CSE @ GITAM Hyderabad.",
    images: [
      `${BASE_URL}/bodapati-bharat-chandra.jpg`,
      `${BASE_URL}/bodapati-bharat-chandra-2.jpg`,
    ],
    creator: "@BharatChandra",
    site: "@BharatChandra",
  },

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
  },

  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileImage": "/logo.png",
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },

  category: "technology",
};

// ── JSON-LD Structured Data ────────────────────────────────────────────────────
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  "name": "Bodapati Bharat Chandra",
  "alternateName": ["Bharat Chandra", "BharatChandra-sys"],
  "givenName": "Bharat Chandra",
  "familyName": "Bodapati",
  "url": BASE_URL,
  // Multiple images = stronger visual entity signal for Google Knowledge Panel.
  // Both photos are of the same person with matching name/caption.
  "image": [
    {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#photo-primary`,
      "url": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
      "contentUrl": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
      "width": 400,
      "height": 400,
      "caption": "Bodapati Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad",
      "name": "Bodapati Bharat Chandra headshot",
      "description": "Professional photo of Bodapati Bharat Chandra, AI/ML Engineering Intern at BHEL and Backend & ML Lead at GARI rocketry team, GITAM University Hyderabad.",
      "inLanguage": "en-IN",
      "license": `${BASE_URL}`,
      "acquireLicensePage": `${BASE_URL}`,
      "creditText": "Bodapati Bharat Chandra",
      "creator": { "@type": "Person", "name": "Bodapati Bharat Chandra", "@id": `${BASE_URL}/#person` },
      "copyrightNotice": "© 2026 Bodapati Bharat Chandra",
    },
    {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#photo-secondary`,
      "url": `${BASE_URL}/bodapati-bharat-chandra-2.jpg`,
      "contentUrl": `${BASE_URL}/bodapati-bharat-chandra-2.jpg`,
      "width": 400,
      "height": 400,
      "caption": "Bodapati Bharat Chandra — AI/ML Engineer and Co-founder of Easify, Hyderabad",
      "name": "Bodapati Bharat Chandra photo",
      "description": "Bodapati Bharat Chandra, final-year CSE student at GITAM University Hyderabad, AI/ML engineer and co-founder of Easify.",
      "inLanguage": "en-IN",
      "license": `${BASE_URL}`,
      "acquireLicensePage": `${BASE_URL}`,
      "creditText": "Bodapati Bharat Chandra",
      "creator": { "@type": "Person", "name": "Bodapati Bharat Chandra", "@id": `${BASE_URL}/#person` },
      "copyrightNotice": "© 2026 Bodapati Bharat Chandra",
    },
  ],
  "email": "bc833498@gmail.com",
  "jobTitle": "AI/ML Engineer",
  // Disambiguation: these specifics separate this entity from other people
  // named "Bharat Chandra" or "Bodapati Bharat Chandra"
  "description":
    "Bodapati Bharat Chandra is an AI/ML engineer and final-year CSE student at GITAM University Hyderabad building production AI systems, rocketry telemetry backends, and autonomous underwater vehicle control stacks.",
  "disambiguatingDescription":
    "Bodapati Bharat Chandra (born ~2005, Hyderabad, India) is a Computer Science & Engineering student at GITAM University Hyderabad (2023–2027), AI/ML Engineering Intern at BHEL (Bharat Heavy Electricals Limited), Backend & ML Lead at GARI (GITAM Aerospace Rocketry Initiative), and co-founder of Easify. Not to be confused with other individuals sharing similar names.",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "GITAM University Hyderabad",
    "url": "https://gitam.edu",
    "sameAs": "https://en.wikipedia.org/wiki/GITAM_University",
  },
  "worksFor": {
    "@type": "Organization",
    "name": "BHEL — Bharat Heavy Electricals Limited",
    "url": "https://bhel.com",
    "sameAs": "https://en.wikipedia.org/wiki/Bharat_Heavy_Electricals",
  },
  "memberOf": [
    {
      "@type": "Organization",
      "name": "GARI — GITAM Aerospace Rocketry Initiative",
    },
  ],
  "founder": {
    "@type": "Organization",
    "name": "Easify",
    "foundingDate": "2023",
    "description": "Smart pooling service platform in Hyderabad",
  },
  "knowsAbout": [
    "Machine Learning",
    "PyTorch",
    "FastAPI",
    "MLflow",
    "Rocket Telemetry Systems",
    "Autonomous Underwater Vehicles",
    "Explainable AI",
    "PostgreSQL",
    "Docker",
    "WebSockets",
    "ROS2",
    "Kalman Filtering",
    "Sensor Fusion",
    "LLM Deployment",
  ],
  "award": [
    {
      "@type": "Award",
      "name": "Winner - AI Day Hackathon",
      "description": "Won AI Day Hackathon organized by GITAM University and Kodryx AI for MedVision AI diabetic ulcer detection system",
      "dateAwarded": "2026-03",
    },
    {
      "@type": "Award",
      "name": "Winner - HackXplore",
      "description": "Won HackXplore organized by IEEE-SSIT VJIT for FactCheck AI fake news analyzer",
      "dateAwarded": "2026-04",
    },
  ],
  "workExample": [
    {
      "@type": "CreativeWork",
      "name": "CAN-7USAT Ground Control Station",
      "url": "https://github.com/BharatChandra-sys/CAN-7USAT-Ground-Control-Backend",
      "description": "Real-time rocket telemetry system with sub-5ms latency",
    },
    {
      "@type": "CreativeWork",
      "name": "AUVBrain Autonomous Control Stack",
      "url": "https://github.com/BharatChandra-sys/AUVBrain",
      "description": "Autonomous underwater vehicle control with 0.84ms agent loop latency",
    },
    {
      "@type": "CreativeWork",
      "name": "MedVision AI",
      "url": "https://github.com/BharatChandra-sys/diabetic-ulcer-ai-system",
      "description": "Explainable AI system for diabetic ulcer detection with Grad-CAM and SHAP",
    },
  ],
  "knowsLanguage": [
    {
      "@type": "Language",
      "name": "English",
    },
    {
      "@type": "Language",
      "name": "Hindi",
    },
    {
      "@type": "Language",
      "name": "Telugu",
    },
  ],
  "sameAs": [
    "https://github.com/BharatChandra-sys",
    "https://www.linkedin.com/in/bharat-chandra-bodapati/",
    "https://orcid.org/0009-0004-4734-1635",
  ],
  // mainEntityOfPage tells Google that bharatchandra.me is the PRIMARY web
  // presence for this Person entity — outranking LinkedIn as the canonical source.
  "mainEntityOfPage": {
    "@type": "ProfilePage",
    "@id": `${BASE_URL}/#profilepage`,
    "url": BASE_URL,
    "name": "Bodapati Bharat Chandra — Official Portfolio",
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "Bodapati Bharat Chandra",
    },
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "addressCountry": "IN",
    "postalCode": "500019",
  },
  "nationality": {
    "@type": "Country",
    "name": "India",
  },
  // hasOccupation — Google uses this for "People also search for" occupation cards
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Machine Learning Engineer",
    "occupationLocation": {
      "@type": "City",
      "name": "Hyderabad"
    },
    "occupationalCategory": "15-1212.00",  // O*NET: Software Quality Assurance Analysts / nearest ML
    "skills": "Python, PyTorch, FastAPI, MLflow, Kalman Filtering, Sensor Fusion, LLM Deployment, Docker, PostgreSQL, WebSockets",
    "responsibilities": "Building production AI systems, rocket telemetry backends, autonomous vehicle control stacks, and on-premise LLM pipelines",
    "estimatedSalary": {
      "@type": "MonetaryAmountDistribution",
      "name": "AI/ML Engineer salary range India",
      "currency": "INR",
      "duration": "P1Y",
      "percentile10": 600000,
      "percentile25": 900000,
      "median": 1200000,
      "percentile75": 1800000,
      "percentile90": 2500000
    }
  },
  // seeks — signals to Google and recruiters that this person is open to work
  "seeks": {
    "@type": "Demand",
    "name": "AI/ML Engineering roles and research collaborations",
    "description": "Bodapati Bharat Chandra is open to AI/ML internships, full-time engineering roles starting 2027, research collaborations in autonomous systems and LLM deployment, and startup partnerships.",
    "availabilityStarts": "2027-05-01",
    "areaServed": {
      "@type": "Place",
      "name": "India"
    }
  },
  // hasCredential — hackathon wins as formal credentials
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Winner — AI Day Hackathon 2026",
      "description": "First place at AI Day Hackathon organized by GITAM University and Kodryx AI for MedVision AI — explainable diabetic ulcer detection system",
      "credentialCategory": "Award",
      "recognizedBy": {
        "@type": "Organization",
        "name": "GITAM University Hyderabad"
      },
      "dateCreated": "2026-03-01"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Winner — HackXplore 2026",
      "description": "First place at HackXplore organized by IEEE-SSIT VJIT for FactCheck AI — browser-based fake news analyzer with 90% accuracy",
      "credentialCategory": "Award",
      "recognizedBy": {
        "@type": "Organization",
        "name": "IEEE-SSIT VJIT"
      },
      "dateCreated": "2026-04-01"
    }
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": "Bodapati Bharat Chandra",
  "alternateName": "Bharat Chandra Portfolio",
  "description": "Official portfolio and primary web presence of Bodapati Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad",
  "inLanguage": "en-IN",
  // mainEntity: this site IS about this Person — strongest possible ownership claim
  "mainEntity": {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    "name": "Bodapati Bharat Chandra",
  },
  "author": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "@id": `${BASE_URL}/#person`
  },
  "publisher": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "@id": `${BASE_URL}/#person`
  },
  "copyrightYear": 2026,
  "copyrightHolder": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "@id": `${BASE_URL}/#person`
  },
  // SiteLinksSearchBox — tells Google to show a search box in results for your site
  // Also signals to Google that this domain is an authoritative entity destination
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        "valueRequired": true,
        "valueName": "search_term_string"
      }
    },
    {
      // ReadAction signals this is a content-first destination — not a utility/tool
      "@type": "ReadAction",
      "target": BASE_URL,
    }
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Bodapati Bharat Chandra",
      "item": BASE_URL,
    },
  ],
};

// ── Organization Schemas ─────────────────────────────────────────────────────
const easifyOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#easify-organization`,
  "name": "Easify",
  "description": "Smart pooling service platform for shared rides in Hyderabad, India",
  "foundingDate": "2023-09-01",
  "founder": [
    {
      "@type": "Person",
      "name": "Bodapati Bharat Chandra",
      "@id": `${BASE_URL}/#person`
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "addressCountry": "IN"
  },
  "url": BASE_URL,
  "email": "bc833498@gmail.com",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Founder",
    "email": "bc833498@gmail.com",
    "availableLanguage": ["English", "Hindi", "Telugu"]
  }
};

const gariOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#gari-organization`,
  "name": "GARI — GITAM Aerospace Rocketry Initiative",
  "description": "GITAM University's rocketry team competing in IN-SPACe national competitions",
  "parentOrganization": {
    "@type": "CollegeOrUniversity",
    "name": "GITAM University Hyderabad",
    "url": "https://gitam.edu",
    "sameAs": "https://en.wikipedia.org/wiki/GITAM_University"
  },
  "member": [
    {
      "@type": "Person",
      "name": "Bodapati Bharat Chandra",
      "@id": `${BASE_URL}/#person`
    }
  ],
  "url": BASE_URL,
  "foundingDate": "2024",
  "areaServed": "India",
  "knowsAbout": ["Rocketry", "Aerospace Engineering", "Telemetry Systems", "IN-SPACe Competitions"]
};

// ── ContactPoint Schema ────────────────────────────────────────────────────────
const contactPointSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "contactType": "Professional Inquiries",
  "email": "bc833498@gmail.com",
  "availableLanguage": ["English", "Hindi", "Telugu"],
  "areaServed": "IN",
  "name": "Bodapati Bharat Chandra"
};

// ── Publisher Organization (required for Article Rich Results) ─────────────────
// Google requires publisher to be Organization, not Person, for article rich cards
const publisherSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#website-publisher`,
  "name": "Bodapati Bharat Chandra",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/logo.png`,
    "width": 60,
    "height": 60,
    "caption": "Bodapati Bharat Chandra logo"
  },
  "image": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
  "founder": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "@id": `${BASE_URL}/#person`
  },
  "sameAs": [
    "https://github.com/BharatChandra-sys",
    "https://www.linkedin.com/in/bharat-chandra-bodapati/"
  ]
};

// ── SiteNavigationElement — enables Google Sitelinks in search results ────────
const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteLinksSearchBox",
  "url": BASE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Site Navigation",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Home",
      "description": "Bodapati Bharat Chandra — AI/ML Engineer portfolio homepage",
      "url": BASE_URL
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Projects",
      "description": "Production AI systems, rocket telemetry, and autonomous vehicle projects",
      "url": `${BASE_URL}/projects`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Blog",
      "description": "Technical writing on AI systems, rocketry, and startup building",
      "url": `${BASE_URL}/blog`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Contact",
      "description": "Get in touch with Bodapati Bharat Chandra",
      "url": `${BASE_URL}/contact`
    }
  ]
};

import { WebVitals } from "@/components/WebVitals";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* rel=me — identity verification links for Google entity confirmation */}
        {/* These tell Google that this person owns/controls these external profiles */}
        <link rel="me" href="https://github.com/BharatChandra-sys" />
        <link rel="me" href="https://www.linkedin.com/in/bharat-chandra-bodapati/" />
        <link rel="me" href="https://orcid.org/0009-0004-4734-1635" />
        <link rel="me" href="mailto:bc833498@gmail.com" />

        {/* ── Bing / Edge entity signals ──────────────────────────────── */}
        {/* msvalidate.01 handled via metadata.verification.other — no duplicate here */}
        {/* IndexNow key for Bing/Yandex instant indexing */}
        <link rel="indexnow-key" href={`${BASE_URL}/bharatchandra-indexnow.txt`} />
        {/* Bing person entity meta — mirrors OG but Bing reads these directly */}
        <meta name="person:first_name" content="Bharat Chandra" />
        <meta name="person:last_name" content="Bodapati" />
        <meta name="person:username" content="BharatChandra-sys" />
        <meta name="profile:first_name" content="Bharat Chandra" />
        <meta name="profile:last_name" content="Bodapati" />
        <meta name="profile:username" content="BharatChandra-sys" />
        {/* ────────────────────────────────────────────────────────────── */}

        {/* Preconnect hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Hreflang for multilingual/regional SEO */}
        <link rel="alternate" hrefLang="en-IN" href={BASE_URL} />
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="Bodapati Bharat Chandra Blog" href={`${BASE_URL}/rss.xml`} />
        
        {/* Atom Feed */}
        <link rel="alternate" type="application/atom+xml" title="Bodapati Bharat Chandra Blog (Atom)" href={`${BASE_URL}/atom.xml`} />
        
        {/* JSON Resume */}
        <link rel="alternate" type="application/json" title="Bodapati Bharat Chandra Resume (JSON)" href={`${BASE_URL}/resume.json`} />
        
        {/* OpenSearch */}
        <link rel="search" type="application/opensearchdescription+xml" title="Bharat Chandra Search" href={`${BASE_URL}/search.xml`} />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* JSON-LD — Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* JSON-LD — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* JSON-LD — BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {/* JSON-LD — Easify Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(easifyOrganizationSchema) }}
        />
        {/* JSON-LD — GARI Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gariOrganizationSchema) }}
        />
        {/* JSON-LD — ContactPoint */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }}
        />
        {/* JSON-LD — Publisher Organization (required for Article Rich Results) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(publisherSchema) }}
        />
        {/* JSON-LD — SiteNavigationElement (Sitelinks signal) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
        />
        {/* Geo tags */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad, Telangana, India" />
        <meta name="geo.position" content="17.3850;78.4867" />
        <meta name="ICBM" content="17.3850, 78.4867" />
        {/* Language */}
        <meta httpEquiv="content-language" content="en-IN" />
        {/* Mobile optimization */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Bharat Chandra" />
        <meta name="application-name" content="Bodapati Bharat Chandra Portfolio" />
        <meta name="format-detection" content="telephone=no" />
        {/* Author */}
        <link rel="author" href={`${BASE_URL}/humans.txt`} />
        <meta name="author" content="Bodapati Bharat Chandra" />
        <meta name="publisher" content="Bodapati Bharat Chandra" />
        {/* Google Search Console verification — handled by metadata.verification.google above */}
        {/* No manual meta tag needed — Next.js renders it from metadata export */}
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <WebVitals />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to main content for accessibility */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded">
            Skip to main content
          </a>
          
          <NextTopLoader />
          <Header />
          
          <main id="main-content" role="main">
            {children}
          </main>
          
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "font-semibold backdrop-blur-md text-black rounded-3xl",
            }}
          />
          <GridPattern
            width={200}
            height={200}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom,white,transparent)]"
            )}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
