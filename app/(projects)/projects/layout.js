const BASE = 'https://bharatchandra.me';

export const metadata = {
  title: "Projects — Bodapati Bharat Chandra | Production AI & Rocketry Systems",
  description:
    "Projects by Bodapati Bharat Chandra: CAN-7USAT rocket telemetry (sub-5ms), AUVBrain autonomous underwater vehicle, MedVision AI (hackathon winner), FactCheck AI. Real production systems, not demos.",
  keywords: [
    "Bodapati Bharat Chandra projects",
    "Bharat Chandra AI projects",
    "CAN-7USAT rocket telemetry",
    "AUVBrain autonomous vehicle",
    "MedVision AI diabetic ulcer",
    "FactCheck AI fake news",
    "Bharat Chandra GITAM projects",
    "Bodapati Bharat Chandra GitHub",
  ],
  alternates: {
    canonical: `${BASE}/projects`,
    languages: {
      'en-IN': `${BASE}/projects`,
      'en': `${BASE}/projects`,
    },
  },
  openGraph: {
    title: "Projects — Bodapati Bharat Chandra",
    description: "Production AI systems, rocket telemetry, and autonomous vehicle stacks by Bodapati Bharat Chandra.",
    url: `${BASE}/projects`,
    type: "website",
    siteName: "Bodapati Bharat Chandra",
    images: [
      {
        url: `${BASE}/bodapati-bharat-chandra.jpg`,
        width: 1200,
        height: 630,
        alt: "Bodapati Bharat Chandra — AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Bodapati Bharat Chandra",
    description: "Production AI systems, rocket telemetry, and AUV stacks.",
    images: [`${BASE}/bodapati-bharat-chandra.jpg`],
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}
