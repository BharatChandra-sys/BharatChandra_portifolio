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

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
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
        {/* Geo tags */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad, Telangana, India" />
        <meta name="geo.position" content="17.3850;78.4867" />
        <meta name="ICBM" content="17.3850, 78.4867" />
        {/* Language */}
        <meta httpEquiv="content-language" content="en-IN" />
        {/* Google Search Console verification — set env var to activate */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          <Header />
          {children}
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
