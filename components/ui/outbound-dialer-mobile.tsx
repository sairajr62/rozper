'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const AGENTS = [
  { name: 'Priya N.',  initials: 'PN', color: '#2563EB', status: 'On Call',   calls: 16, target: 42 },
  { name: 'Marcus L.', initials: 'ML', color: '#7C3AED', status: 'Dialing',   calls: 11, target: 38 },
  { name: 'Layla H.',  initials: 'LH', color: '#059669', status: 'On Call',   calls: 19, target: 51 },
  { name: 'Jordan K.', initials: 'JK', color: '#0891B2', status: 'Available', calls:  8, target: 29 },
]

const STATUS_COLOR: Record<string, string> = {
  'On Call':   '#34D399',
  'Dialing':   '#FBBF24',
  'Available': '#60A5FA',
}

const STATS = [
  { label: 'CONTACTS TODAY', value: (c: number) => c.toLocaleString(), base: 1842, delta: '+14%', pos: true,  live: true  },
  { label: 'CONNECT RATE',   value: () => '34.2%',                     base: 0,    delta: '+2.1%', pos: true,  live: false },
  { label: 'AVG TALK TIME',  value: () => '3:48',                      base: 0,    delta: '-0:12', pos: false, live: false },
  { label: 'CONVERSIONS',    value: (c: number) => String(c),          base: 127,  delta: '+18%', pos: true,  live: true  },
]

export function OutboundDialerMobile() {
  const [contacts,    setContacts]    = useState(1842)
  const [conversions, setConversions] = useState(127)

  useEffect(() => {
    const iv = setInterval(() => {
      if (Math.random() > 0.55) setContacts(c => c + 1)
      if (Math.random() > 0.82) setConversions(c => c + 1)
    }, 2200)
    return () => clearInterval(iv)
  }, [])

  const liveValues = [contacts, 0, 0, conversions]

  return (
    <div className="flex justify-center items-center w-full py-6">
      {/* ── Phone outer bezel ── */}
      <div style={{
        width: 268,
        height: 536,
        background: 'linear-gradient(160deg, #222228 0%, #18181e 100%)',
        borderRadius: 46,
        border: '2px solid rgba(255,255,255,0.12)',
        boxShadow: [
          '0 0 0 1px rgba(0,0,0,0.6)',
          '0 40px 90px rgba(0,0,0,0.65)',
          '0 8px 20px rgba(0,0,0,0.5)',
          '0 0 60px rgba(4,107,210,0.25)',
          'inset 0 1px 0 rgba(255,255,255,0.10)',
        ].join(', '),
        position: 'relative',
        flexShrink: 0,
      }}>

        {/* Left — volume up */}
        <div style={{ position: 'absolute', left: -3.5, top: 98, width: 3, height: 26, background: '#2C2C34', borderRadius: '2px 0 0 2px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }} />
        {/* Left — volume down */}
        <div style={{ position: 'absolute', left: -3.5, top: 132, width: 3, height: 26, background: '#2C2C34', borderRadius: '2px 0 0 2px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }} />
        {/* Right — power */}
        <div style={{ position: 'absolute', right: -3.5, top: 116, width: 3, height: 46, background: '#2C2C34', borderRadius: '0 2px 2px 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }} />

        {/* ── Screen ── */}
        <div style={{
          position: 'absolute',
          top: 10, left: 10, right: 10, bottom: 10,
          background: '#080E1C',
          borderRadius: 38,
          overflow: 'hidden',
        }}>

          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 13, left: '50%', transform: 'translateX(-50%)',
            width: 92, height: 26, background: '#000',
            borderRadius: 14, zIndex: 10,
          }} />

          {/* Status bar */}
          <div style={{ position: 'absolute', top: 18, left: 18, fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>9:41</div>
          <div style={{ position: 'absolute', top: 18, right: 18, display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 12, height: 8, border: '1px solid rgba(255,255,255,0.5)', borderRadius: 2, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 1.5, right: 2, background: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />
            </div>
          </div>

          {/* Content area */}
          <div style={{ position: 'absolute', top: 52, left: 0, right: 0, bottom: 22, padding: '0 14px', overflowY: 'hidden' }}>

            {/* ── App header ── */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                  Outbound Dialer
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <motion.div
                    style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399' }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#34D399', fontWeight: 700 }}>Active</span>
                </div>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(4,107,210,0.14)',
                border: '1px solid rgba(4,107,210,0.28)',
                borderRadius: 5, padding: '2.5px 7px',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: 7.5, color: '#60A5FA', letterSpacing: '0.04em' }}>
                  Q2 Campaign · Predictive
                </span>
              </div>
            </div>

            {/* ── Stats 2×2 ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginBottom: 10 }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 9,
                  padding: '8px 9px',
                }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 6, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', marginBottom: 4 }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 3 }}>
                    {s.live ? s.value(liveValues[i]!) : s.value(0)}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 7.5, color: s.pos ? '#34D399' : '#EF4444', fontWeight: 600 }}>
                    {s.delta}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Divider ── */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 9 }} />

            {/* ── Agent leaderboard ── */}
            <div style={{ fontFamily: 'monospace', fontSize: 6.5, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.15em', marginBottom: 8 }}>
              AGENT LEADERBOARD · TODAY
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {AGENTS.map((a, i) => (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: a.color + '20',
                        border: `1.5px solid ${a.color}50`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'monospace', fontSize: 6.5, fontWeight: 700, color: a.color,
                        flexShrink: 0,
                      }}>
                        {a.initials}
                      </div>
                      <span style={{ fontFamily: 'monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.82)' }}>
                        {a.name}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'monospace', fontSize: 7.5, color: STATUS_COLOR[a.status], fontWeight: 700 }}>
                        {a.status}
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.28)' }}>
                        {a.calls}/{a.target}
                      </div>
                    </div>
                  </div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${Math.round((a.calls / a.target) * 100)}%` }}
                      transition={{ duration: 1.4, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
                      style={{ height: '100%', background: STATUS_COLOR[a.status], borderRadius: 2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Compliance footer ── */}
            <div style={{
              marginTop: 11,
              paddingTop: 9,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap',
            }}>
              {['TCPA compliant', 'DNC scrubbed', 'Call hours enforced'].map(tag => (
                <span key={tag} style={{
                  fontFamily: 'monospace', fontSize: 6.5,
                  color: '#34D399',
                  background: 'rgba(52,211,153,0.08)',
                  border: '1px solid rgba(52,211,153,0.2)',
                  borderRadius: 3, padding: '2px 5px',
                  whiteSpace: 'nowrap',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div style={{
            position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)',
            width: 84, height: 3, background: 'rgba(255,255,255,0.28)', borderRadius: 2,
          }} />
        </div>
      </div>
    </div>
  )
}
