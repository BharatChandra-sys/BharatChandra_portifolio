'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Real-user Core Web Vitals go to Google Analytics when it's configured.
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', metric.name, {
        // GA event values must be integers, so CLS is scaled up.
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        metric_rating: metric.rating,
        non_interaction: true,
      });
    }

    // Also log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }
  });

  return null;
}
