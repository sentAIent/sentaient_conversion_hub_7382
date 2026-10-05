import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'Sentaient Fantasy Sports Analytics'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right bottom, #111827, #000000)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #374151',
            borderRadius: '24px',
            padding: '60px',
            background: 'rgba(17, 24, 39, 0.8)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Sentaient Analytics
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#9ca3af',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            State-of-the-Art Quantitative Fantasy Sports Intelligence powered by J.A.R.V.I.S.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
