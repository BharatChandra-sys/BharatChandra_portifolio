export const metadata = {
  title: "Projects — Bodapati Bharat Chandra",
  description:
    "Production projects by Bodapati Bharat Chandra: CAN-7USAT rocket telemetry (sub-5ms latency), AUVBrain autonomous underwater vehicle, MedVision explainable AI, FactCheck AI fake news analyzer, and more.",
  keywords: [
    "Bodapati Bharat Chandra projects",
    "Bharat Chandra projects",
    "CAN-7USAT telemetry",
    "AUVBrain autonomous vehicle",
    "MedVision AI",
    "FactCheck AI",
    "Easify pooling platform",
    "Bharat Chandra GitHub",
    "BharatChandra-sys projects",
  ],
  alternates: { 
    canonical: "https://bharatchandra.me/projects",
    languages: {
      'en-IN': 'https://bharatchandra.me/projects',
      'en': 'https://bharatchandra.me/projects',
    },
  },
  openGraph: {
    title: "Projects — Bodapati Bharat Chandra",
    description:
      "Rocket telemetry systems, autonomous vehicles, explainable AI, and production backends built by Bodapati Bharat Chandra.",
    url: "https://bharatchandra.me/projects",
    type: "website",
    siteName: "Bodapati Bharat Chandra",
    images: [
      {
        url: "/bodapati-bharat-chandra.jpg",
        width: 400,
        height: 400,
        alt: "Bodapati Bharat Chandra Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Bodapati Bharat Chandra",
    description: "Production software projects: rocket telemetry, autonomous vehicles, and explainable AI systems.",
    images: ["/bodapati-bharat-chandra.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}
