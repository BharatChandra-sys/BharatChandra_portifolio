// Dynamic OpenGraph Image Generator
// Each blog post / project gets a custom OG card with your real photo.
// Photo URL is passed directly — no Buffer.from (Node-only, breaks Edge Runtime).

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const BASE = 'https://bharatchandra.me';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const title    = searchParams.get('title')    || 'Bodapati Bharat Chandra';
    const subtitle = searchParams.get('subtitle') || 'AI/ML Engineer · bharatchandra.me';
    const type     = searchParams.get('type')     || 'default'; // 'blog' | 'project' | 'default'

    // Alternate between the two photos so both appear in Google Images
    const photoFile = searchParams.get('photo') === '2'
      ? 'bodapati-bharat-chandra-2.jpg'
      : 'bodapati-bharat-chandra.jpg';

    // Edge runtime: use URL directly, not base64 (Buffer is Node-only)
    const photoUrl = `${BASE}/${photoFile}`;

    const bgColor     = type === 'blog' ? '#0d0d1a' : type === 'project' ? '#0d1a0d' : '#0a0a0a';
    const accentColor = type === 'blog' ? '#6366f1' : type === 'project' ? '#22c55e' : '#ffffff';
    const badge       = type === 'blog' ? '✍️ Blog post' : type === 'project' ? '🚀 Project' : null;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            background: bgColor,
            padding: '0 72px',
            gap: 56,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* ── Author photo ── */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrl}
            alt="Bodapati Bharat Chandra"
            width={200}
            height={200}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
              border: `3px solid ${accentColor}40`,
            }}
          />

          {/* ── Content ── */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Type badge */}
            {badge && (
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'flex-start',
                  background: `${accentColor}20`,
                  border: `1px solid ${accentColor}40`,
                  borderRadius: 6,
                  padding: '4px 14px',
                  color: accentColor,
                  fontSize: 15,
                  marginBottom: 20,
                }}
              >
                {badge}
              </div>
            )}

            {/* Accent bar */}
            <div style={{ width: 40, height: 3, background: accentColor, marginBottom: 20, borderRadius: 2 }} />

            {/* Title */}
            <div
              style={{
                fontSize: title.length > 50 ? 36 : 44,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: 18,
                maxWidth: 820,
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.4 }}>
              {subtitle}
            </div>

            {/* Author row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: `${accentColor}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  color: accentColor,
                  fontWeight: 700,
                }}
              >
                BC
              </div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>
                Bodapati Bharat Chandra · bharatchandra.me
              </div>
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
