import { ImageResponse } from 'next/og'
import { getCountryBySlug, formatDialCode } from '@/lib/country-code-data'

export const alt = 'Country Code Virtual Phone Numbers | Rozper'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ country: string }> }

export default async function Image({ params }: Props) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)

  const name = country?.name ?? 'Country'
  const dial = country ? formatDialCode(country.dialCode) : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: '#0B1220',
          padding: '64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient blob */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-150px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(4,107,210,0.3) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        {/* Large dial code watermark */}
        <div
          style={{
            position: 'absolute',
            right: '48px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '200px',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.04)',
            letterSpacing: '-8px',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          {dial}
        </div>
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #046BD2, #22D3EE)',
            display: 'flex',
          }}
        />
        {/* Logo */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '64px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #046BD2, #22D3EE)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ color: '#fff', fontSize: '18px', fontWeight: 700, display: 'flex' }}>R</div>
          </div>
          <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px', display: 'flex' }}>
            Rozper
          </div>
        </div>
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(4,107,210,0.15)',
            border: '1px solid rgba(4,107,210,0.4)',
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ color: '#22D3EE', fontSize: '14px', fontWeight: 600, display: 'flex' }}>
            Virtual Phone Number
          </div>
        </div>
        {/* Dial code */}
        <div
          style={{
            color: '#046BD2',
            fontSize: '80px',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-3px',
            marginBottom: '12px',
            display: 'flex',
          }}
        >
          {dial}
        </div>
        {/* Title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '42px',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            marginBottom: '20px',
            display: 'flex',
          }}
        >
          {name} Country Code
        </div>
        {/* Subtitle */}
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px', display: 'flex' }}>
          Get a virtual {name} phone number — instant setup, no hardware needed
        </div>
      </div>
    ),
    { ...size }
  )
}
