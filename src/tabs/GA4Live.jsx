import { useState } from 'react'
import { fetchGA4Overview, fetchGA4TopPages, fetchGA4TrafficSources, fetchGA4Devices, fetchGA4Trend } from '../api'
import LoadingState, { EmptyState } from '../components/LoadingState'

function fmt(n) {
  if (n === undefined || n === null) return '—'
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return String(n)
}

function fmtDur(sec) {
  if (!sec) return '—'
  const m = Math.floor(sec / 60)
  const s = Math.round(sec % 60)
  return `${m}m ${s}s`
}

function fmtPct(val) {
  return val ? (val * 100).toFixed(1) + '%' : '—'
}

function StatCard({ label, value, sub, color }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color: color || 'var(--cyan)' }}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  )
}

function MiniBar({ value, max, color }) {
  const pct = max ? Math.round((value / max) * 100) : 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color || 'var(--cyan)', borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--muted)', minWidth: 32, textAlign: 'right' }}>{pct}%</span>
    </div>
  )
}

function TrendChart({ data }) {
  if (!data.length) return null
  const maxSessions = Math.max(...data.map(d => d.sessions), 1)
  const H = 60
  const W = 100

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - (d.sessions / maxSessions) * H
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: 60 }}>
      <polyline
        fill="none"
        stroke="var(--cyan)"
        strokeWidth="1.5"
        points={points}
      />
      <polyline
        fill="var(--cyan)"
        fillOpacity="0.08"
        stroke="none"
        points={`0,${H} ${points} ${W},${H}`}
      />
    </svg>
  )
}

const CHANNEL_COLORS = {
  'Organic Search':  'var(--green)',
  'Direct':          'var(--cyan)',
  'Referral':        'var(--purple, #a78bfa)',
  'Organic Social':  'var(--orange)',
  'Email':           'var(--yellow)',
  'Paid Search':     'var(--red)',
  'Unassigned':      'var(--dim)',
}

const DEVICE_COLORS = {
  desktop: 'var(--cyan)',
  mobile:  'var(--green)',
  tablet:  'var(--yellow)',
}

export default function GA4Live() {
  const [overview, setOverview]       = useState(null)
  const [topPages, setTopPages]       = useState([])
  const [sources, setSources]         = useState([])
  const [devices, setDevices]         = useState([])
  const [trend, setTrend]             = useState([])
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState(null)
  const [lastFetched, setLastFetched] = useState(null)

  async function loadAll() {
    setLoading(true)
    setError(null)
    try {
      const [ov, tp, src, dev, tr] = await Promise.all([
        fetchGA4Overview(),
        fetchGA4TopPages(),
        fetchGA4TrafficSources(),
        fetchGA4Devices(),
        fetchGA4Trend(),
      ])
      if (ov.error) throw new Error(ov.error)
      setOverview(ov)
      setTopPages(tp)
      setSources(src)
      setDevices(dev)
      setTrend(tr)
      setLastFetched(new Date().toLocaleTimeString())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const totalSessions = sources.reduce((s, r) => s + r.sessions, 0)
  const totalDevSessions = devices.reduce((s, d) => s + d.sessions, 0)

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Property ID: <span style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)' }}>373031310</span></span>
          {lastFetched && <span style={{ fontSize: 11, color: 'var(--dim)' }}>· Updated {lastFetched}</span>}
        </div>
        <button className="btn btn-primary btn-sm" onClick={loadAll} disabled={loading}>
          {loading ? '⏳ Fetching…' : overview ? '↻ Refresh' : '▶ Load Data'}
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid var(--red)', borderRadius: 6, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: 'var(--red)' }}>
          <strong>GA4 Error:</strong> {error}
          {error.includes('permission') && <div style={{ marginTop: 6, color: 'var(--muted)', fontSize: 12 }}>Make sure <code>rozper-dashboard@rozper-analytics.iam.gserviceaccount.com</code> has Viewer access in GA4 → Admin → Property access management.</div>}
        </div>
      )}

      {loading && <LoadingState message="Fetching live data from Google Analytics…" sub="Pulling sessions, pageviews, traffic sources, and device stats…" />}

      {!loading && !overview && !error && (
        <EmptyState icon="📊" message="Click Load Data to pull live metrics from GA4" />
      )}

      {!loading && overview && (
        <>
          {/* Overview stats */}
          <div className="stats-grid" style={{ marginBottom: 20 }}>
            <StatCard label="Sessions (30d)"  value={fmt(overview.thirtyDays.sessions)}  sub={`${fmt(overview.sevenDays.sessions)} last 7 days`} />
            <StatCard label="Users (30d)"     value={fmt(overview.thirtyDays.users)}      sub={`${fmt(overview.sevenDays.users)} last 7 days`} color="var(--green)" />
            <StatCard label="Pageviews (30d)" value={fmt(overview.thirtyDays.pageviews)}  sub={`${fmt(overview.sevenDays.pageviews)} last 7 days`} color="var(--yellow)" />
            <StatCard label="New Users (30d)" value={fmt(overview.thirtyDays.newUsers)}   sub={`${fmtPct(overview.thirtyDays.newUsers / overview.thirtyDays.users)} of total`} color="var(--orange)" />
            <StatCard label="Bounce Rate"     value={fmtPct(overview.thirtyDays.bounceRate)} sub="30-day average" color={overview.thirtyDays.bounceRate > 0.6 ? 'var(--red)' : 'var(--green)'} />
            <StatCard label="Avg Session"     value={fmtDur(overview.thirtyDays.avgSessionSec)} sub="30-day average" color="var(--cyan)" />
          </div>

          {/* Trend chart */}
          {trend.length > 0 && (
            <div className="card" style={{ marginBottom: 20 }}>
              <div className="card-header"><h2>Sessions — Last 30 Days</h2></div>
              <div className="card-body" style={{ paddingBottom: 8 }}>
                <TrendChart data={trend} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--dim)', marginTop: 4 }}>
                  <span>{trend[0]?.date.replace(/(\d{4})(\d{2})(\d{2})/, '$2/$3')}</span>
                  <span>{trend[trend.length - 1]?.date.replace(/(\d{4})(\d{2})(\d{2})/, '$2/$3')}</span>
                </div>
              </div>
            </div>
          )}

          <div className="two-col" style={{ marginBottom: 20 }}>
            {/* Traffic sources */}
            <div className="card">
              <div className="card-header"><h2>Traffic Sources</h2></div>
              <div className="card-body">
                {sources.length === 0
                  ? <div style={{ color: 'var(--dim)', fontSize: 12 }}>No data</div>
                  : sources.map(s => (
                    <div key={s.channel} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: CHANNEL_COLORS[s.channel] || 'var(--text)', fontWeight: 500 }}>{s.channel}</span>
                        <span style={{ color: 'var(--muted)' }}>{fmt(s.sessions)} sessions</span>
                      </div>
                      <MiniBar value={s.sessions} max={totalSessions} color={CHANNEL_COLORS[s.channel] || 'var(--cyan)'} />
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Device breakdown */}
            <div className="card">
              <div className="card-header"><h2>Devices</h2></div>
              <div className="card-body">
                {devices.length === 0
                  ? <div style={{ color: 'var(--dim)', fontSize: 12 }}>No data</div>
                  : devices.map(d => (
                    <div key={d.device} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: DEVICE_COLORS[d.device] || 'var(--text)', fontWeight: 500, textTransform: 'capitalize' }}>{d.device}</span>
                        <span style={{ color: 'var(--muted)' }}>{fmt(d.sessions)} sessions</span>
                      </div>
                      <MiniBar value={d.sessions} max={totalDevSessions} color={DEVICE_COLORS[d.device] || 'var(--cyan)'} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          {/* Top pages */}
          <div className="card">
            <div className="card-header"><h2>Top Pages (30 Days)</h2></div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Views</th>
                    <th>Users</th>
                    <th>Avg Time</th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--cyan)' }}>{p.path}</div>
                        {p.title && p.title !== p.path && (
                          <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 2 }}>{p.title}</div>
                        )}
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--text)' }}>{fmt(p.views)}</td>
                      <td style={{ color: 'var(--muted)' }}>{fmt(p.users)}</td>
                      <td style={{ color: 'var(--muted)' }}>{fmtDur(p.avgSec)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
