// Dynamic OpenGraph Image Generator
// Generates custom OG images for each page

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Bodapati Bharat Chandra';
    const subtitle = searchParams.get('subtitle') || 'AI/ML Engineer';
    const type = searchParams.get('type') || 'default';

    // Different templates based on type
    const getBackground = () => {
      switch(type) {
        case 'blog':
          return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        case 'project':
          return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        default:
          return 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)';
      }
    };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: getBackground(),
            padding: '80px',
          }}
        >
          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: 20,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 36,
                color: 'rgba(255,255,255,0.8)',
                marginTop: 10,
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  marginRight: 20,
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 28, color: 'white', fontWeight: 600 }}>
                  Bodapati Bharat Chandra
                </div>
                <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)' }}>
                  bharatchandra.me
                </div>
              </div>
            </div>
            
            {type === 'blog' && (
              <div
                style={{
                  fontSize: 24,
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '12px 24px',
                  borderRadius: 8,
                }}
              >
                📝 Blog Post
              </div>
            )}
            
            {type === 'project' && (
              <div
                style={{
                  fontSize: 24,
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '12px 24px',
                  borderRadius: 8,
                }}
              >
                🚀 Project
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
