import { useState, useEffect, useRef } from 'react'
import * as XLSX from 'xlsx'
import { fetchLeads } from '../api'
import LoadingState, { EmptyState } from '../components/LoadingState'

const POLL_INTERVAL = 15000

function fmt(date) {
  if (!date) return '—'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function exportExcel(leads) {
  const rows = leads.map(l => ({
    Date: fmt(l.submittedAt),
    Name: l.name || '—',
    Email: l.email || '—',
    Company: l.company || '—',
    'Company Size': l.companySize || '—',
    Interests: Array.isArray(l.interests) ? l.interests.join(', ') : (l.interests || '—'),
    Message: l.message || '—',
  }))
  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Leads')
  XLSX.writeFile(wb, 'rozper-leads.xlsx')
}

export default function LeadsAudit() {
  const [leads, setLeads] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [auto, setAuto] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const fetchingRef = useRef(false)

  async function load({ silent = false } = {}) {
    if (fetchingRef.current) return
    fetchingRef.current = true
    if (!silent) setLoading(true)
    setError(null)
    try {
      const data = await fetchLeads()
      if (data.error) throw new Error(data.error)
      setLeads(data)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }

  // Initial load on mount
  useEffect(() => {
    load({ silent: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Background polling — refreshes silently so new submissions appear without a manual refresh
  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => {
      if (!document.hidden) load({ silent: true })
    }, POLL_INTERVAL)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto])

  return (
    <div>
      <div className="toolbar" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {leads !== null && (
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>{leads.length}</span> lead{leads.length !== 1 ? 's' : ''} total
            </span>
          )}
          {auto && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--green)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px var(--green)', animation: 'pulse 1.6s infinite' }} />
              Live
            </span>
          )}
          {lastUpdated && (
            <span style={{ fontSize: 11, color: 'var(--dim)' }}>
              Updated {lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)', cursor: 'pointer' }}>
            <input type="checkbox" checked={auto} onChange={e => setAuto(e.target.checked)} />
            Auto-refresh
          </label>
          {leads?.length > 0 && (
            <button className="btn btn-sm" onClick={() => exportExcel(leads)}>
              ↓ Export Excel
            </button>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => load()} disabled={loading}>
            {loading ? '⏳ Loading…' : leads !== null ? '↻ Refresh' : '▶ Load Leads'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid var(--red)', borderRadius: 6, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: 'var(--red)' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {(loading || (leads === null && !error)) && (
        <LoadingState message="Fetching leads…" sub="Reading contact form submissions from storage" />
      )}

      {!loading && leads !== null && leads.length === 0 && (
        <EmptyState icon="📭" message="No leads yet — submissions will appear here after the first contact form entry" />
      )}

      {!loading && leads !== null && leads.length > 0 && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Size</th>
                  <th>Interests</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr
                    key={lead.id || i}
                    style={{ cursor: 'pointer', background: expanded === i ? 'rgba(34,211,238,0.04)' : '' }}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <td style={{ whiteSpace: 'nowrap', fontSize: 11, color: 'var(--muted)' }}>{fmt(lead.submittedAt)}</td>
                    <td style={{ fontWeight: 500, color: 'var(--text)' }}>{lead.name || '—'}</td>
                    <td>
                      <a href={`mailto:${lead.email}`} style={{ color: 'var(--cyan)', fontSize: 12 }} onClick={e => e.stopPropagation()}>
                        {lead.email || '—'}
                      </a>
                    </td>
                    <td style={{ color: 'var(--muted)', fontSize: 12 }}>{lead.company || '—'}</td>
                    <td style={{ color: 'var(--dim)', fontSize: 11 }}>{lead.companySize || '—'}</td>
                    <td style={{ fontSize: 11, color: 'var(--muted)' }}>
                      {Array.isArray(lead.interests) ? lead.interests.join(', ') : (lead.interests || '—')}
                    </td>
                    <td style={{ maxWidth: 200 }}>
                      {expanded === i ? (
                        <div style={{ fontSize: 12, color: 'var(--text)', whiteSpace: 'pre-wrap', padding: '4px 0' }}>
                          {lead.message || '—'}
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: 'var(--dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                          {lead.message || '—'}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
