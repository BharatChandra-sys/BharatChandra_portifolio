import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Bodapati Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BASE = 'https://bharatchandra.me';

export default async function Image() {
  // Edge runtime: fetch the image as a URL directly (no Buffer.from — that's Node-only).
  // next/og's ImageResponse accepts a URL string in the src of <img>.
  const photoUrl = `${BASE}/bodapati-bharat-chandra.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 80px',
          gap: 64,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* ── Real photo — strongest Knowledge Panel image signal ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl}
          alt="Bodapati Bharat Chandra"
          width={260}
          height={260}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            border: '3px solid rgba(255,255,255,0.15)',
          }}
        />

        {/* ── Text block ── */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Accent bar */}
          <div style={{ width: 48, height: 3, background: '#ffffff', marginBottom: 28, borderRadius: 2 }} />

          {/* Full legal name — exact match to Person schema */}
          <div style={{ fontSize: 50, fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: 12 }}>
            Bodapati Bharat Chandra
          </div>

          {/* Role + institution — disambiguation context */}
          <div style={{ fontSize: 22, color: '#94a3b8', marginBottom: 24, fontWeight: 400, lineHeight: 1.4 }}>
            AI/ML Engineer · GITAM University Hyderabad
          </div>

          {/* Current roles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 28 }}>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>🏭 AI/ML Intern @ BHEL, Hyderabad</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>🚀 Backend & ML Lead @ GARI Rocketry</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>🤝 Co-founder, Easify</div>
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', gap: 10 }}>
            {['FastAPI', 'PyTorch', 'ROS2', 'Rocketry', 'LLMs'].map((tag) => (
              <div
                key={tag}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 6,
                  padding: '5px 14px',
                  color: '#e2e8f0',
                  fontSize: 14,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 22, color: '#475569', fontSize: 16 }}>
            bharatchandra.me
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
