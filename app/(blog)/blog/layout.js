// Trend 2: Branded search — page title includes personal name + niche phrase so
// searches for "Bharat Chandra writing" or "Bharat Chandra blog" find this page.
// Trend 3: "Notes on what I've built" is a personal hook that beats "Technical Blog".
export const metadata = {
  title: "Writing — Bharat Chandra | Notes on AI Systems, Rocketry & Startups I've Built",
  description:
    "Technical writing by Bodapati Bharat Chandra. I write about production AI systems, rocket telemetry backends, on-premise LLMs, and co-founding a startup in Hyderabad — from real experience, not theory.",
  keywords: [
    "Bodapati Bharat Chandra blog",
    "Bharat Chandra writing",
    "Bharat Chandra AI blog",
    "Bharat Chandra BHEL blog",
    "Bharat Chandra rocketry blog",
    "AI/ML engineering blog India",
    "on-premise LLM Ollama tutorial",
    "rocket telemetry FastAPI",
    "Easify startup Hyderabad",
    "GITAM student engineering blog",
    "Bodapati Bharat Chandra GITAM",
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
