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
        url: "/bodapati-bharat-chandra.jpg",
        width: 400,
        height: 400,
        alt: "Bodapati Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bodapati Bharat Chandra | AI/ML Engineer",
    description:
      "Bodapati Bharat Chandra — production AI systems, rocketry backends, AUV stacks. Final-year CSE @ GITAM Hyderabad.",
    images: ["/bodapati-bharat-chandra.jpg"],
    creator: "@BharatChandra",
    site: "@BharatChandra",
  },

  manifest: "/manifest.json",

  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
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
  "image": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
    "contentUrl": `${BASE_URL}/bodapati-bharat-chandra.jpg`,
    "width": 400,
    "height": 400,
    "caption": "Bodapati Bharat Chandra — AI/ML Engineer",
  },
  "email": "bc833498@gmail.com",
  "jobTitle": "AI/ML Engineer",
  "description":
    "Bodapati Bharat Chandra is an AI/ML engineer and final-year CSE student at GITAM University Hyderabad building production AI systems, rocketry telemetry backends, and autonomous underwater vehicle control stacks.",
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
    "https://www.linkedin.com/in/bharat-chandra-6b29283b1/",
    "https://orcid.org/0009-0004-4734-1635",
  ],
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
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": "Bodapati Bharat Chandra",
  "description": "Personal portfolio of Bodapati Bharat Chandra — AI/ML Engineer",
  "author": { "@id": `${BASE_URL}/#person` },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
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
  "name": "Easify",
  "description": "Smart pooling service platform for shared rides in Hyderabad, India",
  "foundingDate": "2023",
  "founder": {
    "@id": `${BASE_URL}/#person`
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "addressCountry": "IN"
  },
  "url": "https://bharatchandra.me",
  "sameAs": []
};

const gariOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GARI — GITAM Aerospace Rocketry Initiative",
  "description": "GITAM University's rocketry team competing in IN-SPACe national competitions",
  "parentOrganization": {
    "@type": "CollegeOrUniversity",
    "name": "GITAM University Hyderabad",
    "url": "https://gitam.edu"
  },
  "member": {
    "@id": `${BASE_URL}/#person`
  },
  "url": "https://bharatchandra.me"
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

import { WebVitals } from "@/components/WebVitals";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
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
        {/* Google Search Console verification — set env var to activate */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
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
