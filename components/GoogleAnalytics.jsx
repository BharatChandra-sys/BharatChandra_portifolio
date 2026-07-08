'use client';

import Script from 'next/script';

export function GoogleAnalytics({ gaId }) {
  // Only load in production
  if (process.env.NODE_ENV !== 'production' || !gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
          
          // Track Web Vitals
          gtag('event', 'web_vitals_ready');
        `}
      </Script>
    </>
  );
}

// Usage in layout.js:
// import { GoogleAnalytics } from '@/components/GoogleAnalytics';
// Add before </body>: <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
