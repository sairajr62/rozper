import { ImageResponse } from 'next/og'
import { slugToState, getCodesByStateSlug } from '@/lib/area-code-data'

export const alt = 'Area Code Virtual Phone Numbers | Rozper'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ state: string }> }

export default async function Image({ params }: Props) {
  const { state: stateParam } = await params
  const stateName = slugToState(stateParam) ?? 'U.S.'
  const codes = getCodesByStateSlug(stateParam)
  const codeCount = codes.length

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
            top: '-200px',
            right: '-200px',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(4,107,210,0.35) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
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
            {codeCount} Area Code{codeCount !== 1 ? 's' : ''} Available
          </div>
        </div>
        {/* Title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '56px',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span style={{ display: 'flex', color: '#22D3EE' }}>{stateName}</span>
          <span style={{ display: 'flex' }}>Virtual Phone Numbers</span>
        </div>
        {/* Subtitle */}
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '22px', display: 'flex' }}>
          Get a local {stateName} phone number — instant setup, no hardware required
        </div>
      </div>
    ),
    { ...size }
  )
}
