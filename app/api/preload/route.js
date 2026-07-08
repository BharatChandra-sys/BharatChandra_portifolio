import { NextResponse } from 'next/server';

/**
 * Dynamic Resource Hints API
 * Returns critical resources to preload based on the current page
 */

const RESOURCE_HINTS = {
  '/': {
    preload: [
      { href: '/logo.png', as: 'image', type: 'image/png' },
      { href: '/bodapati-bharat-chandra.jpg', as: 'image', type: 'image/jpeg' }
    ],
    prefetch: [
      { href: '/projects', as: 'document' },
      { href: '/blog', as: 'document' }
    ],
    preconnect: [
      { href: 'https://api.github.com', crossOrigin: 'anonymous' },
      { href: 'https://www.google-analytics.com' }
    ]
  },
  '/projects': {
    preload: [],
    prefetch: [
      { href: '/contact', as: 'document' }
    ],
    preconnect: [
      { href: 'https://api.github.com', crossOrigin: 'anonymous' }
    ]
  },
  '/blog': {
    preload: [],
    prefetch: [],
    preconnect: []
  }
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '/';
  
  const hints = RESOURCE_HINTS[page] || RESOURCE_HINTS['/'];
  
  return NextResponse.json(hints, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  });
}
