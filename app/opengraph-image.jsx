import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Bodapati Bharat Chandra — AI/ML Engineer, GITAM University Hyderabad';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BASE = 'https://bharatchandra.me';

export default async function Image() {
  // Fetch the real headshot so it renders in the OG card
  // Google uses the OG image heavily for Knowledge Panel candidate photos
  const photoRes = await fetch(`${BASE}/bodapati-bharat-chandra.jpg`);
  const photoData = await photoRes.arrayBuffer();
  const photoSrc = `data:image/jpeg;base64,${Buffer.from(photoData).toString('base64')}`;

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
        {/* ── Photo — the single most important Knowledge Panel signal ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt="Bodapati Bharat Chandra"
          width={280}
          height={280}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            border: '3px solid rgba(255,255,255,0.15)',
          }}
        />

        {/* ── Text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Accent */}
          <div style={{ width: 48, height: 3, background: '#ffffff', marginBottom: 28, borderRadius: 2 }} />

          {/* Name — exact match to Schema.org Person.name */}
          <div style={{ fontSize: 52, fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: 12 }}>
            Bodapati Bharat Chandra
          </div>

          {/* Role + affiliation — disambiguation context */}
          <div style={{ fontSize: 22, color: '#94a3b8', marginBottom: 28, fontWeight: 400, lineHeight: 1.4 }}>
            AI/ML Engineer · GITAM University Hyderabad
          </div>

          {/* Current roles row — reinforces entity uniqueness */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 32 }}>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>
              🏭 AI/ML Intern @ BHEL, Hyderabad
            </div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>
              🚀 Backend & ML Lead @ GARI Rocketry
            </div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>
              🤝 Co-founder, Easify
            </div>
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['FastAPI', 'PyTorch', 'ROS2', 'Rocketry', 'LLMs'].map((tag) => (
              <div
                key={tag}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 6,
                  padding: '5px 14px',
                  color: '#e2e8f0',
                  fontSize: 15,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Domain */}
          <div style={{ marginTop: 24, color: '#475569', fontSize: 17 }}>
            bharatchandra.me
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
