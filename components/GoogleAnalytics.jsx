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
          window.gtag = function(){dataLayer.push(arguments);};
          gtag('js', new Date());
          
          gtag('config', '${gaId}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}

// Mounted in app/layout.js. Set NEXT_PUBLIC_GA_MEASUREMENT_ID to turn it on.
