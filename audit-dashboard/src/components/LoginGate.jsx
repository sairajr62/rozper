import { useState } from 'react'
import React from 'react'

function hasCookie() {
  return document.cookie.split(';').some(c => c.trim() === 'rozper_audit=1')
}
function clearCookie() {
  document.cookie = 'rozper_audit=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
}

const SHARDS = [
  { clip: 'polygon(0% 0%, 48% 0%, 30% 28%, 0% 20%)',          tx: -200, ty: -210, rot: -44, delay: 0   },
  { clip: 'polygon(48% 0%, 100% 0%, 100% 20%, 64% 28%)',       tx:  210, ty: -200, rot:  40, delay: 25  },
  { clip: 'polygon(0% 20%, 30% 28%, 26% 54%, 0% 46%)',         tx: -230, ty:  -55, rot: -32, delay: 55  },
  { clip: 'polygon(30% 28%, 64% 28%, 56% 54%, 26% 54%)',       tx:   10, ty: -185, rot:   9, delay: 35  },
  { clip: 'polygon(64% 28%, 100% 20%, 100% 46%, 70% 54%)',     tx:  230, ty:  -55, rot:  38, delay: 45  },
  { clip: 'polygon(0% 46%, 26% 54%, 22% 77%, 0% 72%)',         tx: -215, ty:   45, rot: -24, delay: 75  },
  { clip: 'polygon(26% 54%, 56% 54%, 48% 77%, 22% 77%)',       tx:  -35, ty:  175, rot:  -6, delay: 60  },
  { clip: 'polygon(56% 54%, 70% 54%, 76% 77%, 48% 77%)',       tx:  135, ty:  165, rot:  19, delay: 85  },
  { clip: 'polygon(70% 54%, 100% 46%, 100% 72%, 76% 77%)',     tx:  220, ty:   45, rot:  33, delay: 50  },
  { clip: 'polygon(0% 72%, 22% 77%, 18% 100%, 0% 100%)',       tx: -175, ty:  200, rot: -42, delay: 95  },
  { clip: 'polygon(22% 77%, 48% 77%, 44% 100%, 18% 100%)',     tx:  -50, ty:  220, rot: -13, delay: 80  },
  { clip: 'polygon(48% 77%, 76% 77%, 78% 100%, 44% 100%)',     tx:   70, ty:  220, rot:  15, delay: 90  },
  { clip: 'polygon(76% 77%, 100% 72%, 100% 100%, 78% 100%)',   tx:  185, ty:  195, rot:  44, delay: 70  },
]

export default function LoginGate({ children }) {
  const [authState, setAuthState] = useState(() => hasCookie() ? 'unlocked' : 'locked')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
        setTimeout(() => setAuthState('unlocked'), 1100)
      } else {
        setError('Incorrect username or password.')
        setPass('')
      }
    } catch {
      setError('Connection error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    clearCookie()
    setAuthState('locked')
    setUser('')
    setPass('')
    setError('')
  }

  const locked = authState === 'locked' || authState === 'shattering'

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>

      {/* Dashboard — always rendered, blurred when not unlocked */}
      <div
        style={{
          filter: locked ? 'blur(10px) brightness(0.55) saturate(0.6)' : 'none',
          transition: authState === 'shattering' ? 'filter 1s ease 0.15s' : 'none',
          pointerEvents: locked ? 'none' : 'auto',
          userSelect: locked ? 'none' : 'auto',
        }}
      >
        {React.cloneElement(children, { onLogout: logout })}
      </div>

      {/* Overlay */}
      {locked && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            background: authState === 'shattering'
              ? 'rgba(7,11,20,0)'
              : 'rgba(7,11,20,0.6)',
            transition: authState === 'shattering' ? 'background 0.9s ease 0.1s' : 'none',
          }}
        >
          <div style={{ position: 'relative', width: 360 }}>

            {/* Login card */}
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border2)',
                borderRadius: 12,
                padding: '40px 36px',
                opacity: authState === 'shattering' ? 0 : 1,
                transition: authState === 'shattering' ? 'opacity 0.12s ease' : 'none',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(34,211,238,0.12)',
                  border: '1px solid rgba(34,211,238,0.25)',
                  marginBottom: 14,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
                  Rozper Audit
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 5 }}>
                  Sign in to access the dashboard
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                    Username
                  </label>
                  <input
                    type="text"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    autoComplete="username"
                    required
                    placeholder="admin"
                    style={{
                      width: '100%',
                      background: 'var(--surface2)',
                      border: '1px solid var(--border2)',
                      borderRadius: 6,
                      color: 'var(--text)',
                      padding: '10px 12px',
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(34,211,238,0.45)'}
                    onBlur={e => e.target.style.borderColor = ''}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    autoComplete="current-password"
                    required
                    style={{
                      width: '100%',
                      background: 'var(--surface2)',
                      border: '1px solid var(--border2)',
                      borderRadius: 6,
                      color: 'var(--text)',
                      padding: '10px 12px',
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(34,211,238,0.45)'}
                    onBlur={e => e.target.style.borderColor = ''}
                  />
                </div>

                {error && (
                  <div style={{
                    fontSize: 12,
                    color: 'var(--red)',
                    textAlign: 'center',
                    padding: '6px 10px',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 6,
                  }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 6,
                    background: loading ? 'rgba(34,211,238,0.6)' : 'var(--cyan)',
                    color: '#070B14',
                    border: 'none',
                    borderRadius: 6,
                    padding: '11px',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    width: '100%',
                    letterSpacing: '0.02em',
                    transition: 'background 0.15s',
                  }}
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>
            </div>

            {/* Glass shards — visible only when shattering */}
            {authState === 'shattering' && SHARDS.map((shard, i) => (
              <div
                key={i}
                className="glass-shard"
                style={{
                  '--tx': `${shard.tx}px`,
                  '--ty': `${shard.ty}px`,
                  '--rot': `${shard.rot}deg`,
                  animationDelay: `${shard.delay}ms`,
                  clipPath: shard.clip,
                }}
              />
            ))}

            {/* Flash overlay — fires at start of shatter */}
            {authState === 'shattering' && (
              <div className="shatter-flash" style={{ borderRadius: 12 }} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
