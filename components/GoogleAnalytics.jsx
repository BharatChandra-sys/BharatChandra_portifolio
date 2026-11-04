'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const STORAGE_KEY = 'analytics-consent';
export const OPEN_COOKIE_SETTINGS = 'open-cookie-settings';

const readChoice = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const saveChoice = (choice) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage can be blocked. The choice still applies until the page is closed.
  }
};

// Removes Google Analytics cookies after consent is withdrawn.
const clearAnalyticsCookies = () => {
  const domains = ['', `; domain=${window.location.hostname}`, `; domain=.${window.location.hostname.replace(/^www\./, '')}`];
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid') {
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      });
    }
  });
};

// Analytics stays off until the visitor chooses Accept. Mounted in app/layout.js,
// and does nothing at all unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
export function GoogleAnalytics({ gaId }) {
  const enabled = process.env.NODE_ENV === 'production' && Boolean(gaId);
  const [choice, setChoice] = useState(undefined); // undefined until the browser has been read
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const stored = readChoice();
    setChoice(stored);
    setShowBanner(!stored);

    const open = () => setShowBanner(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, [enabled]);

  if (!enabled) return null;

  const decide = (next) => {
    const withdrew = choice === 'granted' && next === 'denied';
    saveChoice(next);
    setChoice(next);
    setShowBanner(false);
    if (withdrew) {
      // A loaded analytics script can't be unloaded, so reload without it.
      clearAnalyticsCookies();
      window.location.reload();
    }
  };

  return (
    <>
      {choice === 'granted' && (
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
      )}

      {showBanner && (
        <div
          role="region"
          aria-label="Cookie choice"
          className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-xl rounded-xl border border-white/15 bg-black/95 p-3 md:p-4 text-xs md:text-sm text-white/80 shadow-lg"
        >
          <p className="leading-relaxed">
            May I use optional analytics cookies to see how this site is used? The site works the same either way. See the{' '}
            <Link href="/privacy" className="underline underline-offset-2 text-white">Privacy Policy</Link>.
          </p>
          <div className="mt-2 md:mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => decide('granted')}
              className="flex-1 rounded-full border border-white/30 px-3 py-1.5 font-medium text-white hover:bg-white/10 transition-colors"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide('denied')}
              className="flex-1 rounded-full border border-white/30 px-3 py-1.5 font-medium text-white hover:bg-white/10 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
