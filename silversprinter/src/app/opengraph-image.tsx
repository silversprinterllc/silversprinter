import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = "Sterling Route — South Florida's Premier Luxury Van"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        {/* Gold top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#c9a96e' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <span style={{ color: '#f0e6d0', fontSize: 28, letterSpacing: 8, textTransform: 'uppercase', fontFamily: 'serif' }}>
            Sterling
          </span>
          <span style={{ color: '#c9a96e', fontSize: 28, letterSpacing: 8, textTransform: 'uppercase', marginLeft: 8, fontFamily: 'serif' }}>
            Route
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 60, height: 1, background: '#c9a96e', marginBottom: 40 }} />

        {/* Headline */}
        <div style={{ color: '#f0e6d0', fontSize: 64, fontFamily: 'serif', textAlign: 'center', lineHeight: 1.1, marginBottom: 24, maxWidth: 900 }}>
          South Florida&apos;s Premier<br />Self-Drive Luxury Van
        </div>

        {/* Sub */}
        <div style={{ color: '#a09890', fontSize: 24, textAlign: 'center', maxWidth: 700, lineHeight: 1.4 }}>
          10 passengers · Palm Beach County · From $795/day
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 60, marginTop: 48 }}>
          {[
            { value: '10', label: 'Passengers' },
            { value: 'MAD', label: 'Daycruiser D6' },
            { value: '$795', label: 'From/Day' },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#c9a96e', fontSize: 36, fontFamily: 'serif' }}>{value}</span>
              <span style={{ color: '#5f5850', fontSize: 14, letterSpacing: 4, textTransform: 'uppercase', marginTop: 4 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 32, color: '#433d38', fontSize: 18, letterSpacing: 4 }}>
          STERLINGROUTE.COM
        </div>

        {/* Gold bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#c9a96e' }} />
      </div>
    ),
    { ...size }
  )
}
