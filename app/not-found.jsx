// Server component — no 'use client' so JSON-LD is in static HTML for crawlers.
// The "Go Back" button is extracted into a separate client component.
import Link from 'next/link';
import { HiHome, HiArrowLeft } from 'react-icons/hi';
import GoBackButton from '@/components/ui/GoBackButton';

const notFoundSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "404 — Page Not Found",
  "description": "The requested page could not be found on bharatchandra.me",
  "url": "https://bharatchandra.me/404",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Bodapati Bharat Chandra",
    "url": "https://bharatchandra.me"
  }
};

export default function NotFound() {
  return (
    <>
      {/* Server-rendered schema — in static HTML for Googlebot and Bing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(notFoundSchema) }}
      />

      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-2xl">
          {/* 404 Number */}
          <div className="space-y-4">
            <h1 className="text-8xl sm:text-9xl font-bold text-white/10 select-none">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Page Not Found
            </h2>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/">
              <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 font-medium transition-all duration-300">
                <HiHome className="w-5 h-5" />
                <span>Go Home</span>
              </button>
            </Link>

            {/* Client component — needs window.history */}
            <GoBackButton />
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/projects" className="text-sm text-primary hover:underline">
                Projects
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/blog" className="text-sm text-primary hover:underline">
                Blog
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/contact" className="text-sm text-primary hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
