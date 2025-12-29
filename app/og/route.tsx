import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)

  const title = searchParams.get('title') || 'Cluttered'
  const description = searchParams.get('description') || 'The satisfying disk cleaner for developers'
  const type = searchParams.get('type') || 'default'

  // Fetch the logo image
  const logoUrl = `${origin}/icons/logo.png`

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#0a0a0f',
        padding: '80px',
        position: 'relative',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%)',
        }}
      />

      {/* Accent glow */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Logo and brand */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', zIndex: 10 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt="Cluttered"
          width={64}
          height={64}
          style={{
            width: '64px',
            height: '64px',
            marginRight: '20px',
          }}
        />
        <span style={{ fontSize: '32px', color: '#9ca3af', fontWeight: 500 }}>Cluttered</span>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: type === 'blog' ? '56px' : '64px',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: '24px',
          maxWidth: '900px',
          zIndex: 10,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: '28px',
          color: '#9ca3af',
          maxWidth: '800px',
          lineHeight: 1.4,
          zIndex: 10,
        }}
      >
        {description}
      </div>

      {/* Type badge for blog posts */}
      {type === 'blog' && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '80px',
            padding: '8px 20px',
            borderRadius: '9999px',
            background: 'rgba(168, 85, 247, 0.2)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#a855f7',
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          Blog
        </div>
      )}

      {type === 'docs' && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '80px',
            padding: '8px 20px',
            borderRadius: '9999px',
            background: 'rgba(59, 130, 246, 0.2)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#3b82f6',
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          Docs
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: '24px', color: '#a855f7' }}>cluttered.dev</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
