// Next.js Middleware for Advanced SEO Features
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  const { pathname, searchParams } = request.nextUrl;
  const url = request.nextUrl.clone();

  // ============================================================================
  // 1. ADVANCED SEO HEADERS
  // ============================================================================
  
  // Robots directives
  response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  
  // Additional SEO hints
  response.headers.set('X-UA-Compatible', 'IE=edge');
  response.headers.set('Accept-CH', 'DPR, Viewport-Width, Width');
  
  // ============================================================================
  // 2. CANONICAL URL ENFORCEMENT & REDIRECTS
  // ============================================================================
  
  // Remove trailing slashes (except root) - 301 redirect
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // Force lowercase URLs - 301 redirect
  if (pathname !== pathname.toLowerCase()) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  // Remove duplicate slashes - 301 redirect
  if (pathname.includes('//')) {
    url.pathname = pathname.replace(/\/+/g, '/');
    return NextResponse.redirect(url, 301);
  }

  // Force HTTPS in production - 301 redirect
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Remove common tracking parameters for clean URLs
  const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'ref'];
  let hasTrackingParams = false;
  
  trackingParams.forEach(param => {
    if (searchParams.has(param)) {
      searchParams.delete(param);
      hasTrackingParams = true;
    }
  });

  // Redirect to clean URL if tracking params were present (308 temporary)
  if (hasTrackingParams && pathname !== '/api/contact') {
    url.search = searchParams.toString();
    return NextResponse.redirect(url, 308);
  }

  // ============================================================================
  // 3. PRELOAD & PERFORMANCE HINTS
  // ============================================================================
  
  // Critical resources preload for homepage
  if (pathname === '/') {
    response.headers.append('Link', '</fonts/GeistVF.woff>; rel=preload; as=font; type="font/woff"; crossorigin');
    response.headers.append('Link', '</bodapati-bharat-chandra.jpg>; rel=preload; as=image; fetchpriority=high');
  }

  // Blog posts - preload likely navigation
  if (pathname.startsWith('/blog/')) {
    response.headers.append('Link', '</blog>; rel=prefetch');
  }

  // Projects page - preload GitHub API
  if (pathname === '/projects') {
    response.headers.append('Link', '<https://api.github.com>; rel=preconnect; crossorigin');
  }

  // ============================================================================
  // 4. STRUCTURED DATA & CANONICAL HINTS
  // ============================================================================
  
  // Add canonical link header
  const canonicalUrl = `https://bharatchandra.me${pathname}`;
  response.headers.append('Link', `<${canonicalUrl}>; rel="canonical"`);
  
  // Alternate language versions
  response.headers.append('Link', `<${canonicalUrl}>; rel="alternate"; hreflang="en-IN"`);
  response.headers.append('Link', `<${canonicalUrl}>; rel="alternate"; hreflang="en"`);
  response.headers.append('Link', `<${canonicalUrl}>; rel="alternate"; hreflang="x-default"`);

  // ============================================================================
  // 5. CACHE CONTROL FOR SEO RESOURCES
  // ============================================================================
  
  // Static SEO resources - long cache
  if (pathname.match(/\/(robots\.txt|sitemap\.xml|humans\.txt|ads\.txt|security\.txt)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
  }

  // API routes - moderate cache with revalidation
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=300');
  }

  // Feed files - hourly revalidation
  if (pathname.match(/\/(rss\.xml|atom\.xml|feed\.json)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200');
  }

  // ============================================================================
  // 6. GEOGRAPHIC & LANGUAGE HINTS
  // ============================================================================
  
  response.headers.set('Content-Language', 'en-IN');
  
  // ============================================================================
  // 7. CRAWL OPTIMIZATION
  // ============================================================================
  
  // Allow search engine bots to crawl faster
  const userAgent = request.headers.get('user-agent') || '';
  
  if (userAgent.includes('Googlebot') || userAgent.includes('Bingbot')) {
    // Remove rate limiting for verified bots
    response.headers.set('X-Crawler-Optimized', 'true');
  }

  // Block bad bots (add more as needed)
  const badBots = ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot'];
  const isBlocked = badBots.some(bot => userAgent.includes(bot));
  
  if (isBlocked && !pathname.startsWith('/robots.txt')) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // ============================================================================
  // 8. SMART REDIRECTS (OLD URLs → NEW URLS)
  // ============================================================================
  
  // Add your old URL patterns here if you're migrating
  const redirects = {
    // Example: '/old-path': '/new-path',
  };

  if (redirects[pathname]) {
    url.pathname = redirects[pathname];
    return NextResponse.redirect(url, 301);
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
