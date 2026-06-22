import { useState, useEffect, useRef } from 'react'
import React from 'react'

const AUTO_LOGOUT_MS = 30 * 60 * 1000 // 30 minutes


// Full-screen shards — polygons tile 0%→100% in both axes so they cover the entire viewport.
// tx/ty are large enough to fly shards completely off screen on any resolution.
const SHARDS = [
  { clip: 'polygon(0% 0%, 48% 0%, 30% 28%, 0% 20%)',         tx: -600, ty: -550, rot: -44, delay: 0   },
  { clip: 'polygon(48% 0%, 100% 0%, 100% 20%, 64% 28%)',      tx:  620, ty: -530, rot:  40, delay: 25  },
  { clip: 'polygon(0% 20%, 30% 28%, 26% 54%, 0% 46%)',        tx: -680, ty: -120, rot: -32, delay: 55  },
  { clip: 'polygon(30% 28%, 64% 28%, 56% 54%, 26% 54%)',      tx:   25, ty: -480, rot:   9, delay: 35  },
  { clip: 'polygon(64% 28%, 100% 20%, 100% 46%, 70% 54%)',    tx:  680, ty: -120, rot:  38, delay: 45  },
  { clip: 'polygon(0% 46%, 26% 54%, 22% 77%, 0% 72%)',        tx: -640, ty:  130, rot: -24, delay: 75  },
  { clip: 'polygon(26% 54%, 56% 54%, 48% 77%, 22% 77%)',      tx: -100, ty:  450, rot:  -6, delay: 60  },
  { clip: 'polygon(56% 54%, 70% 54%, 76% 77%, 48% 77%)',      tx:  380, ty:  430, rot:  19, delay: 85  },
  { clip: 'polygon(70% 54%, 100% 46%, 100% 72%, 76% 77%)',    tx:  650, ty:  130, rot:  33, delay: 50  },
  { clip: 'polygon(0% 72%, 22% 77%, 18% 100%, 0% 100%)',      tx: -520, ty:  530, rot: -42, delay: 95  },
  { clip: 'polygon(22% 77%, 48% 77%, 44% 100%, 18% 100%)',    tx: -140, ty:  570, rot: -13, delay: 80  },
  { clip: 'polygon(48% 77%, 76% 77%, 78% 100%, 44% 100%)',    tx:  200, ty:  570, rot:  15, delay: 90  },
  { clip: 'polygon(76% 77%, 100% 72%, 100% 100%, 78% 100%)',  tx:  550, ty:  510, rot:  44, delay: 70  },
]

const BOKEH_BG = [
  'radial-gradient(ellipse 55% 55% at 15% 25%, rgba(34,211,238,0.45) 0%, transparent 65%)',
  'radial-gradient(ellipse 50% 50% at 85% 75%, rgba(20,184,166,0.35) 0%, transparent 65%)',
  'radial-gradient(ellipse 45% 45% at 75% 15%, rgba(163,230,53,0.25) 0%, transparent 60%)',
  'radial-gradient(ellipse 40% 40% at 25% 80%, rgba(250,204,21,0.25) 0%, transparent 60%)',
  'rgba(0,0,0,0.72)',
].join(', ')

const INPUT_STYLE = {
  width: '100%',
  padding: '11px 14px 11px 40px',
  fontSize: 14,
  border: '1.5px solid #d1d5db',
  borderRadius: 8,
  background: '#fff',
  color: '#1f2937',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

function IconInput({ icon, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <span style={{
        position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
        color: focused ? '#0d9aaa' : '#9ca3af', transition: 'color 0.2s', pointerEvents: 'none',
      }}>
        {icon}
      </span>
      <input
        {...props}
        style={{ ...INPUT_STYLE, borderColor: focused ? '#0d9aaa' : '#d1d5db' }}
        onFocus={e => { setFocused(true); props.onFocus?.(e) }}
        onBlur={e => { setFocused(false); props.onBlur?.(e) }}
      />
    </div>
  )
}

export default function LoginGate({ children }) {
  const [authState, setAuthState] = useState('locked')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const autoLogoutTimer = useRef(null)

  useEffect(() => {
    if (authState === 'unlocked') {
      autoLogoutTimer.current = setTimeout(() => {
        setAuthState('locked')
        setUser('')
        setPass('')
        setError('')
      }, AUTO_LOGOUT_MS)
    }
    return () => clearTimeout(autoLogoutTimer.current)
  }, [authState])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/audit-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass }),
      })
      if (res.ok) {
        setAuthState('shattering')
        setTimeout(() => setAuthState('unlocked'), 1400)
      } else {
        setError('Incorrect username or password.')
        setPass('')
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
    } catch {
      setError('Connection error. Try again.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setAuthState('locked')
    setUser('')
    setPass('')
    setError('')
  }

  const locked = authState === 'locked' || authState === 'shattering'

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: locked ? 'hidden' : 'unset' }}>

      {/* Dashboard — always rendered, unblurs as shards fly off */}
      <div style={{
        filter: locked ? 'blur(10px) brightness(0.55) saturate(0.7)' : 'none',
        transition: authState === 'shattering' ? 'filter 1.1s ease 0.2s' : 'none',
        pointerEvents: locked ? 'none' : 'auto',
        userSelect: locked ? 'none' : 'auto',
      }}>
        {React.cloneElement(children, { onLogout: logout })}
      </div>

      {/* Login overlay — fades out instantly so shards take over visually */}
      {authState === 'locked' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          background: BOKEH_BG,
        }}>
          <div style={{ position: 'relative', width: 340 }}>
            {/* Login card */}
            <div style={{
              background: 'rgba(255,255,255,0.96)',
              borderRadius: 16,
              padding: '44px 32px 32px',
              boxShadow: '0 12px 48px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.12)',
            }}>
              {/* Teal avatar circle */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0d9aaa 0%, #0f766e 100%)',
                  marginBottom: 16,
                  boxShadow: '0 4px 16px rgba(13,154,170,0.4)',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, color: '#1f2937', letterSpacing: '-0.3px' }}>
                  Sign In
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className={shake ? 'shake' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <IconInput
                  type="text"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  autoComplete="username"
                  required
                  placeholder="Username"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  }
                />

                <IconInput
                  type="password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  }
                />
                </div>

                {error && (
                  <div style={{
                    fontSize: 12,
                    color: '#dc2626',
                    textAlign: 'center',
                    padding: '7px 10px',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: 6,
                  }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 4,
                    background: loading ? '#5db8c4' : 'linear-gradient(135deg, #0d9aaa 0%, #0f766e 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '13px',
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    width: '100%',
                    letterSpacing: '0.03em',
                    boxShadow: loading ? 'none' : '0 4px 14px rgba(13,154,170,0.35)',
                    transition: 'all 0.2s',
                  }}
                >
                  {loading ? 'Signing in…' : 'Login'}
                </button>

                <p style={{
                  margin: '8px 0 0',
                  textAlign: 'center',
                  fontSize: 11,
                  color: '#9ca3af',
                  letterSpacing: '0.01em',
                }}>
                  🔒 Only Authorized Persons Can Access
                </p>

              </form>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen glass shatter — rendered above everything, independent of the login overlay */}
      {authState === 'shattering' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          {/* Flash */}
          <div className="shatter-flash shatter-flash--teal" />

          {/* Each shard is position:absolute inset:0 (full viewport), clipped to its polygon.
              Since all shards share the same bokeh background at 100%×100%, each shard shows
              the correct portion of the overlay — the whole screen breaks apart. */}
          {SHARDS.map((shard, i) => (
            <div
              key={i}
              className="glass-shard glass-shard--screen"
              style={{
                '--tx': `${shard.tx}px`,
                '--ty': `${shard.ty}px`,
                '--rot': `${shard.rot}deg`,
                animationDelay: `${shard.delay}ms`,
                animationDuration: '1.05s',
                clipPath: shard.clip,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
