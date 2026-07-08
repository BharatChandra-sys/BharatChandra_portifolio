export const metadata = {
  title: "Writing — Bodapati Bharat Chandra",
  description:
    "Technical writing by Bodapati Bharat Chandra on building production AI systems, rocket telemetry pipelines, on-premise LLMs, and co-founding a startup in Hyderabad.",
  keywords: [
    "Bodapati Bharat Chandra blog",
    "Bharat Chandra blog",
    "Bharat Chandra writing",
    "AI/ML engineering blog",
    "rocket telemetry tutorial",
    "on-premise LLM Ollama",
    "Easify startup Hyderabad",
    "GITAM student blog",
  ],
  alternates: { 
    canonical: "https://bharatchandra.me/blog",
    languages: {
      'en-IN': 'https://bharatchandra.me/blog',
      'en': 'https://bharatchandra.me/blog',
    },
  },
  openGraph: {
    title: "Writing — Bodapati Bharat Chandra",
    description:
      "Technical posts on AI systems, rocketry, and startup building by Bodapati Bharat Chandra.",
    url: "https://bharatchandra.me/blog",
    type: "website",
    siteName: "Bodapati Bharat Chandra",
    images: [
      {
        url: "/bodapati-bharat-chandra.jpg",
        width: 400,
        height: 400,
        alt: "Bodapati Bharat Chandra Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Bodapati Bharat Chandra",
    description: "Technical writing on AI systems, rocketry, and startups.",
    images: ["/bodapati-bharat-chandra.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({ children }) {
  return children;
}
