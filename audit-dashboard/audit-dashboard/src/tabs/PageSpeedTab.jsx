import { useState } from 'react'

const BASE = '/api'
const QUICK_PAGES = ['/', '/pricing', '/about', '/contact', '/blog', '/products/ucaas']

async function fetchStrategy(url, strategy, force = false) {
  const qs = `url=${encodeURIComponent(url)}&strategy=${strategy}${force ? '&force=1' : ''}`
  const r = await fetch(`${BASE}/pagespeed?${qs}`)
  const data = await r.json()
  if (data.error) {
    const err = new Error(data.error)
    err.status = r.status
    throw err
  }
  return data.result
}

function scoreColor(s) {
  if (s >= 90) return 'var(--green)'
  if (s >= 50) return '#f59e0b'
  return 'var(--red)'
}

function scoreLabel(s) {
  if (s >= 90) return 'Good'
  if (s >= 50) return 'Needs Work'
  return 'Poor'
}

function metricColor(sc) {
  if (sc >= 90) return 'var(--green)'
  if (sc >= 50) return '#f59e0b'
  return 'var(--red)'
}

function ScoreCircle({ score, label, loading }) {
  const color = score != null ? scoreColor(score) : 'var(--dim)'
  const r = 44
  const circ = 2 * Math.PI * r
  const dash = score != null ? (score / 100) * circ : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 110, height: 110 }}>
        <svg width="110" height="110" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="55" cy="55" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {loading ? (
            <span style={{ fontSize: 11, color: 'var(--dim)' }}>Testing…</span>
          ) : score != null ? (
            <>
              <span style={{ fontSize: 26, fontWeight: 700, color, lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: 10, color: 'var(--dim)', marginTop: 2 }}>{scoreLabel(score)}</span>
            </>
          ) : (
            <span style={{ fontSize: 11, color: 'var(--dim)' }}>–</span>
          )}
        </div>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.05em' }}>{label}</span>
    </div>
  )
}

function MetricRow({ name, description, mobileVal, desktopVal, mobileScore, desktopScore, mobileLoading, desktopLoading }) {
  const cell = (val, sc, loading) => (
    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
      {loading
        ? <span style={{ fontSize: 11, color: 'var(--dim)' }}>…</span>
        : val
          ? <><span style={{ color: metricColor(sc ?? 0), marginRight: 5, fontSize: 10 }}>●</span>
              <span style={{ fontSize: 13, color: 'var(--text)', fontFamily: 'monospace' }}>{val}</span></>
          : <span style={{ color: 'var(--dim)' }}>–</span>
      }
    </td>
  )
  return (
    <tr style={{ borderBottom: '1px solid var(--border)' }}>
      <td style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 13, color: 'var(--text)' }}>{name}</div>
        {description && <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 2 }}>{description}</div>}
      </td>
      {cell(mobileVal, mobileScore, mobileLoading)}
      {cell(desktopVal, desktopScore, desktopLoading)}
    </tr>
  )
}

export default function PageSpeedTab() {
  const [url, setUrl] = useState('https://rozper.vercel.app/')
  const [mobileResult, setMobileResult] = useState(null)
  const [desktopResult, setDesktopResult] = useState(null)
  const [mobileLoading, setMobileLoading] = useState(false)
  const [desktopLoading, setDesktopLoading] = useState(false)
  const [mobileError, setMobileError] = useState('')
  const [desktopError, setDesktopError] = useState('')
  const [testedUrl, setTestedUrl] = useState('')
  const [history, setHistory] = useState([])
  const [fromCache, setFromCache] = useState(false)

  async function runTest(testUrl, force = false) {
    const target = testUrl || url
    setTestedUrl(target)
    setMobileResult(null)
    setDesktopResult(null)
    setMobileError('')
    setDesktopError('')
    setMobileLoading(true)
    setDesktopLoading(true)
    setFromCache(false)

    // Run both independently — results appear as each finishes
    fetchStrategy(target, 'mobile', force)
      .then(r => { setMobileResult(r); setMobileLoading(false); if (r.cachedAt) setFromCache(true) })
      .catch(e => { setMobileError(e.message); setMobileLoading(false) })

    fetchStrategy(target, 'desktop', force)
      .then(r => {
        setDesktopResult(r)
        setDesktopLoading(false)
        if (r.cachedAt) setFromCache(true)
        setHistory(prev => [
          { url: target, mobile: null, desktop: r.score, ts: new Date().toLocaleTimeString() },
          ...prev,
        ].slice(0, 8))
      })
      .catch(e => { setDesktopError(e.message); setDesktopLoading(false) })
  }

  function handleQuick(page) {
    const full = `https://rozper.vercel.app${page}`
    setUrl(full)
    runTest(full)
  }

  const anyLoading = mobileLoading || desktopLoading
  const anyResult  = mobileResult || desktopResult
  const anyError   = mobileError || desktopError

  const METRICS = [
    { key: 'fcp', scoreKey: 'fcpScore', name: 'First Contentful Paint', description: 'FCP · Time until first content appears' },
    { key: 'lcp', scoreKey: 'lcpScore', name: 'Largest Contentful Paint', description: 'LCP · Core Web Vital — load performance' },
    { key: 'tbt', scoreKey: 'tbtScore', name: 'Total Blocking Time', description: 'TBT · Proxy for First Input Delay' },
    { key: 'cls', scoreKey: 'clsScore', name: 'Cumulative Layout Shift', description: 'CLS · Core Web Vital — visual stability' },
    { key: 'si',  scoreKey: 'siScore',  name: 'Speed Index', description: 'SI · How quickly content is visually populated' },
    { key: 'tti', scoreKey: 'ttiScore', name: 'Time to Interactive', description: 'TTI · Time until page is fully interactive' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* URL input */}
      <div className="card" style={{ padding: '18px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
          Page Speed — Powered by Google Lighthouse
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !anyLoading && runTest()}
            placeholder="https://rozper.vercel.app/"
            style={{
              flex: 1, minWidth: 260, padding: '9px 13px',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 8, color: 'var(--text)', fontSize: 13,
              fontFamily: 'monospace', outline: 'none',
            }}
          />
          <button
            onClick={() => runTest()}
            disabled={anyLoading}
            style={{
              padding: '9px 22px',
              background: anyLoading ? 'var(--surface)' : 'linear-gradient(135deg,#046BD2,#0086F9)',
              border: '1px solid var(--border)', borderRadius: 8,
              color: anyLoading ? 'var(--dim)' : '#fff',
              fontWeight: 600, fontSize: 13, cursor: anyLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {anyLoading ? 'Running…' : 'Run Test'}
          </button>
          <button
            onClick={() => runTest(url, true)}
            disabled={anyLoading}
            title="Bypass cache — uses 2 of your daily API quota"
            style={{
              padding: '9px 14px',
              background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 8,
              color: 'var(--dim)', fontSize: 12,
              cursor: anyLoading ? 'not-allowed' : 'pointer',
            }}
          >
            ↺ Force Refresh
          </button>
        </div>

        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--dim)' }}>Quick test:</span>
          {QUICK_PAGES.map(p => (
            <button key={p} onClick={() => handleQuick(p)} disabled={anyLoading} style={{
              padding: '4px 10px', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 6,
              color: 'var(--dim)', fontSize: 11, fontFamily: 'monospace',
              cursor: anyLoading ? 'not-allowed' : 'pointer',
            }}>{p}</button>
          ))}
        </div>

        {anyLoading && (
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--dim)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span>{mobileLoading  ? '⏳ Mobile testing…'  : '✓ Mobile done'}</span>
            <span>{desktopLoading ? '⏳ Desktop testing…' : '✓ Desktop done'}</span>
            <span style={{ opacity: 0.5 }}>Results appear as each strategy completes (~20s each)</span>
          </div>
        )}
      </div>

      {/* Errors */}
      {(mobileError || desktopError) && (() => {
        const isQuota = [mobileError, desktopError].some(e => e && (e.includes('quota') || e.includes('429')))
        return (
          <div style={{ padding: '14px 16px', background: isQuota ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${isQuota ? 'rgba(245,158,11,0.35)' : 'rgba(239,68,68,0.25)'}`, borderRadius: 8, fontSize: 13 }}>
            {isQuota ? (
              <div style={{ color: '#f59e0b' }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>⚠ Google PageSpeed API quota exceeded</div>
                <div style={{ color: 'var(--dim)', fontSize: 12 }}>The free PSI API allows ~25 requests/day. Quota resets at midnight Pacific time. Add a <code style={{ fontFamily: 'monospace', background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: 4 }}>PSI_API_KEY</code> environment variable with a higher-quota key to remove this limit.</div>
              </div>
            ) : (
              <>
                {mobileError && <div style={{ color: 'var(--red)' }}>Mobile: {mobileError}</div>}
                {desktopError && <div style={{ color: 'var(--red)', marginTop: mobileError ? 4 : 0 }}>Desktop: {desktopError}</div>}
              </>
            )}
          </div>
        )
      })()}

      {/* Score circles — show as soon as either result arrives */}
      {(anyResult || anyLoading) && !anyError && (
        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
            Performance Score
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'monospace' }}>{testedUrl}</span>
            {fromCache && !anyLoading && (
              <span style={{ fontSize: 10, fontWeight: 600, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 4, padding: '2px 7px' }}>
                CACHED · results from today's earlier test
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
            <ScoreCircle score={mobileResult?.score}  label="Mobile"  loading={mobileLoading} />
            <ScoreCircle score={desktopResult?.score} label="Desktop" loading={desktopLoading} />
          </div>
        </div>
      )}

      {/* Core Web Vitals table — renders immediately, cells fill in as each strategy completes */}
      {(anyResult || anyLoading) && !anyError && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Core Web Vitals &amp; Metrics
            </span>
            <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--dim)' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> Good</span>
              <span><span style={{ color: '#f59e0b' }}>●</span> Needs Work</span>
              <span><span style={{ color: 'var(--red)' }}>●</span> Poor</span>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface)' }}>
                <th style={{ padding: '9px 12px', textAlign: 'left', fontSize: 11, color: 'var(--dim)', fontWeight: 600, letterSpacing: '0.06em' }}>METRIC</th>
                <th style={{ padding: '9px 14px', textAlign: 'center', fontSize: 11, color: 'var(--dim)', fontWeight: 600, letterSpacing: '0.06em' }}>MOBILE</th>
                <th style={{ padding: '9px 14px', textAlign: 'center', fontSize: 11, color: 'var(--dim)', fontWeight: 600, letterSpacing: '0.06em' }}>DESKTOP</th>
              </tr>
            </thead>
            <tbody>
              {METRICS.map(m => (
                <MetricRow
                  key={m.key}
                  name={m.name}
                  description={m.description}
                  mobileVal={mobileResult?.[m.key]}
                  desktopVal={desktopResult?.[m.key]}
                  mobileScore={mobileResult?.[m.scoreKey]}
                  desktopScore={desktopResult?.[m.scoreKey]}
                  mobileLoading={mobileLoading}
                  desktopLoading={desktopLoading}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recent tests */}
      {history.length > 0 && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Recent Tests
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, color: 'var(--dim)', fontWeight: 600 }}>URL</th>
                <th style={{ padding: '8px 12px', textAlign: 'center', fontSize: 11, color: 'var(--dim)', fontWeight: 600 }}>Desktop</th>
                <th style={{ padding: '8px 12px', textAlign: 'right', fontSize: 11, color: 'var(--dim)', fontWeight: 600 }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--border)', cursor: 'pointer' }}
                  onClick={() => { setUrl(h.url); runTest(h.url) }}>
                  <td style={{ padding: '8px 12px', fontSize: 12, color: 'var(--dim)', fontFamily: 'monospace' }}>
                    {h.url.replace('https://rozper.vercel.app', '') || '/'}
                  </td>
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                    {h.desktop != null
                      ? <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor(h.desktop) }}>{h.desktop}</span>
                      : <span style={{ color: 'var(--dim)' }}>–</span>}
                  </td>
                  <td style={{ padding: '8px 12px', textAlign: 'right', fontSize: 11, color: 'var(--dim)' }}>{h.ts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {!anyResult && !anyLoading && !anyError && (
        <div className="card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 14 }}>⚡</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Enter a URL and run a speed test</div>
          <div style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.6 }}>
            Tests mobile and desktop using Google Lighthouse<br />
            Results appear as each strategy completes (~20s each)
          </div>
        </div>
      )}
    </div>
  )
}
