import { ImageResponse } from 'next/og'

export const alt = 'Pricing · $9.99/user Business Phone & Contact Center | Rozper'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', background: '#0B1220', padding: '64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(4,107,210,0.35) 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #046BD2, #22D3EE)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: '48px', left: '64px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #046BD2, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#fff', fontSize: '18px', fontWeight: 700, display: 'flex' }}>R</div>
          </div>
          <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px', display: 'flex' }}>Rozper</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(4,107,210,0.15)', border: '1px solid rgba(4,107,210,0.4)', borderRadius: '999px', padding: '6px 16px', marginBottom: '24px' }}>
          <div style={{ color: '#22D3EE', fontSize: '14px', fontWeight: 600, display: 'flex' }}>Pricing · From $9.99/user · 14-Day Free Trial</div>
        </div>
        <div style={{ color: '#ffffff', fontSize: '48px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ display: 'flex' }}>Simple Pricing</span>
          <span style={{ display: 'flex', color: '#22D3EE' }}>From $9.99 / User / Month</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px', display: 'flex' }}>UCaaS · Contact Center · AI tools — all included, no surprises</div>
      </div>
    ),
    { ...size }
  )
}
