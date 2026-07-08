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
        width: 400,
        height: 400,
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
  return children;
}
