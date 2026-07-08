import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Bodapati Bharat Chandra — AI/ML Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top accent line */}
        <div style={{ width: 60, height: 4, background: '#ffffff', marginBottom: 40, borderRadius: 2 }} />

        {/* Name */}
        <div style={{ fontSize: 64, fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: 16 }}>
          Bodapati Bharat Chandra
        </div>

        {/* Title */}
        <div style={{ fontSize: 28, color: '#94a3b8', marginBottom: 40, fontWeight: 400 }}>
          AI/ML Engineer · GITAM University Hyderabad
        </div>

        {/* Tags row */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['FastAPI', 'PyTorch', 'Rocketry', 'AUV', 'BHEL'].map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 6,
                padding: '6px 14px',
                color: '#e2e8f0',
                fontSize: 18,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: 'absolute', bottom: 60, right: 80, color: '#475569', fontSize: 20 }}>
          bharatchandra.me
        </div>
      </div>
    ),
    { ...size }
  );
}
