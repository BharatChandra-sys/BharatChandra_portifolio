import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so stray lockfiles in parent folders can't change it
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  output: undefined,

  // Security headers — Note: X-Frame-Options and CSP are handled in vercel.json
  // to avoid duplicate/conflicting headers at the CDN edge layer.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ];
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Trailing slash consistency
  trailingSlash: false,

  // Compression
  compress: true,

  // Power optimizations
  poweredByHeader: false,
  
  // React strict mode for better debugging
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
