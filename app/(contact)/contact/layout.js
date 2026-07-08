const BASE = 'https://bharatchandra.me';

// ── Structured Data ────────────────────────────────────────────────────────────
// Gap 4 fixed: contact page had zero schema

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${BASE}/contact`,
  "url": `${BASE}/contact`,
  "name": "Contact Bodapati Bharat Chandra",
  "description": "Get in touch with Bodapati Bharat Chandra — open to AI/ML internships, full-time roles from 2027, and project collaborations.",
  "inLanguage": "en-IN",
  "about": {
    "@type": "Person",
    "name": "Bodapati Bharat Chandra",
    "@id": `${BASE}/#person`
  },
  "mainEntity": {
    "@type": "ContactPoint",
    "contactType": "Professional Inquiries",
    "email": "bc833498@gmail.com",
    "url": `${BASE}/contact`,
    "availableLanguage": ["English", "Hindi", "Telugu"],
    "areaServed": "Worldwide",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "09:00",
      "closes": "23:00"
    }
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
    { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${BASE}/contact` }
  ]
};

export const metadata = {
  title: "Contact — Bodapati Bharat Chandra",
  description:
    "Get in touch with Bodapati Bharat Chandra — open to AI/ML internships, full-time roles starting 2027, and project collaborations. Based in Hyderabad, India.",
  keywords: [
    "contact Bodapati Bharat Chandra",
    "contact Bharat Chandra",
    "hire Bharat Chandra AI engineer",
    "Bodapati Bharat Chandra email",
    "Bharat Chandra Hyderabad contact",
    "AI/ML engineer India",
    "hire AI engineer Hyderabad",
  ],
  alternates: { 
    canonical: "https://bharatchandra.me/contact",
    languages: {
      'en-IN': 'https://bharatchandra.me/contact',
      'en': 'https://bharatchandra.me/contact',
    },
  },
  openGraph: {
    title: "Contact — Bodapati Bharat Chandra",
    description:
      "Reach out to Bodapati Bharat Chandra for AI/ML roles, internships, or project collaborations.",
    url: "https://bharatchandra.me/contact",
    type: "website",
    siteName: "Bodapati Bharat Chandra",
    images: [
      {
        url: "/bodapati-bharat-chandra.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Bodapati Bharat Chandra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Bodapati Bharat Chandra",
    description: "Open to AI/ML roles and collaborations.",
    images: ["/bodapati-bharat-chandra.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
