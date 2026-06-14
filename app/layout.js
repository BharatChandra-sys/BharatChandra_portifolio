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

export const metadata = {
  metadataBase: new URL("https://bharatchandra.me"),
  title: "Bharat Chandra | AI/ML Engineer & Aerospace Systems Builder",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  description: "Bharat Chandra is an AI/ML engineer and final-year CSE student at GITAM University Hyderabad building production AI systems, rocketry telemetry backends, and autonomous underwater vehicle control stacks.",
  keywords: "Bharat Chandra, Bharat Chandra GITAM, Bharat Chandra AI engineer, BharatChandra-sys, GITAM Hyderabad CSE, GARI rocketry, CAN-7USAT, AUVBrain, MedVision AI, BHEL AI portal, Bharat Chandra Hyderabad, Bharat Chandra BHEL",
  authors: [{ name: "Bharat Chandra", url: "https://bharatchandra.me" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://bharatchandra.me",
  },
  openGraph: {
    type: "website",
    url: "https://bharatchandra.me",
    title: "Bharat Chandra | AI/ML Engineer",
    description: "Building production AI systems, rocketry telemetry backends, and AUV stacks. Final-year CSE @ GITAM Hyderabad.",
    siteName: "Bharat Chandra",
    images: [
      {
        url: "/bharat.jpg",
        width: 400,
        height: 400,
        alt: "Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Chandra | AI/ML Engineer",
    description: "Building production AI systems, rocketry backends, and AUV control stacks. Final-year CSE @ GITAM Hyderabad.",
    images: ["/bharat.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bharat Chandra",
  "alternateName": "BharatChandra-sys",
  "url": "https://bharatchandra.me",
  "image": "https://bharatchandra.me/bharat.jpg",
  "email": "bc833498@gmail.com",
  "jobTitle": "AI/ML Engineer",
  "description": "AI/ML Engineer and final-year CSE student at GITAM University Hyderabad. Building production AI systems, rocketry telemetry backends, and AUV control stacks.",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "GITAM University Hyderabad",
    "url": "https://gitam.edu"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "BHEL — Bharat Heavy Electricals Limited",
    "url": "https://bhel.com"
  },
  "memberOf": {
    "@type": "Organization",
    "name": "GARI — GITAM Aerospace Rocketry Initiative"
  },
  "founder": {
    "@type": "Organization",
    "name": "Easify",
    "description": "Smart pooling service platform"
  },
  "knowsAbout": [
    "Machine Learning", "PyTorch", "FastAPI", "MLflow",
    "Rocket Telemetry Systems", "Autonomous Underwater Vehicles",
    "Explainable AI", "PostgreSQL", "Docker", "WebSockets", "ROS2"
  ],
  "sameAs": [
    "https://github.com/BharatChandra-sys",
    "https://www.linkedin.com/in/bharat-chandra-6b29283b1/",
    "https://orcid.org/0009-0004-4734-1635"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "addressCountry": "IN"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
              className: 'font-semibold backdrop-blur-md text-black rounded-3xl',
            }}
          />

          <GridPattern
            width={200}
            height={200}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom,white,transparent)]",
            )}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
