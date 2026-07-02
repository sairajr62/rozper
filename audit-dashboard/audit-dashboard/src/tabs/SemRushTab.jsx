import { useState, useEffect, useCallback } from 'react'

const BASE = '/api/semrush'

const SEVERITY_CONFIG = {
  errors:   { label: 'Errors',   color: 'var(--red)',    bg: 'rgba(239,68,68,0.08)',    border: 'rgba(239,68,68,0.25)'    },
  warnings: { label: 'Warnings', color: '#f59e0b',       bg: 'rgba(245,158,11,0.08)',   border: 'rgba(245,158,11,0.25)'   },
  notices:  { label: 'Notices',  color: 'var(--dim)',    bg: 'rgba(255,255,255,0.03)',  border: 'rgba(255,255,255,0.08)'  },
}

async function srFetch(type, params, apiKey) {
  const qs = new URLSearchParams({ type, ...params }).toString()
  const r = await fetch(`${BASE}?${qs}`, {
    headers: { 'x-semrush-key': apiKey },
  })
  const data = await r.json()
  if (!r.ok || data.error) throw new Error(data.error || `HTTP ${r.status}`)
  return data
}

function SeveritySection({ severity, issues, expanded, onToggle }) {
  const cfg = SEVERITY_CONFIG[severity]
  const [openIssue, setOpenIssue] = useState(null)

  if (!issues?.length) return null

  return (
    <div style={{ marginBottom: 16 }}>
      <button
        onClick={() => onToggle(severity)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', background: cfg.bg, border: `1px solid ${cfg.border}`,
          borderRadius: expanded ? '8px 8px 0 0' : 8, cursor: 'pointer',
          color: cfg.color, fontWeight: 600, fontSize: 13,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>
            {severity === 'errors' ? '✕' : severity === 'warnings' ? '⚠' : 'ℹ'}
          </span>
          {cfg.label}
          <span style={{
            background: cfg.color, color: '#fff', fontSize: 10, fontWeight: 700,
            padding: '2px 7px', borderRadius: 10,
          }}>{issues.length}</span>
        </span>
        <span style={{ fontSize: 12, opacity: 0.7 }}>{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div style={{ border: `1px solid ${cfg.border}`, borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
          {issues.map((issue, idx) => (
            <div key={issue.id || idx} style={{ borderBottom: idx < issues.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <button
                onClick={() => setOpenIssue(openIssue === idx ? null : idx)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  padding: '11px 16px', background: 'var(--surface)', border: 'none',
                  cursor: 'pointer', textAlign: 'left', gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{issue.name}</div>
                  {issue.description && (
                    <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 3 }}>{issue.description}</div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  {issue.count != null && (
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: cfg.color,
                      background: cfg.bg, border: `1px solid ${cfg.border}`,
                      padding: '2px 8px', borderRadius: 6, fontFamily: 'var(--mono)',
                    }}>{issue.count} pages</span>
                  )}
                  <span style={{ fontSize: 11, color: 'var(--dim)' }}>{openIssue === idx ? '▲' : '▼'}</span>
                </div>
              </button>

              {openIssue === idx && issue.urls?.length > 0 && (
                <div style={{ padding: '0 16px 12px', background: 'rgba(0,0,0,0.15)' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Affected Pages
                  </div>
                  {issue.urls.slice(0, 10).map((url, i) => (
                    <div key={i} style={{
                      fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--cyan)',
                      padding: '3px 0', borderBottom: i < Math.min(issue.urls.length, 10) - 1 ? '1px solid var(--border)' : 'none',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{url}</div>
                  ))}
                  {issue.urls.length > 10 && (
                    <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 4 }}>…and {issue.urls.length - 10} more</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SemRushTab() {
  const [apiKey, setApiKey]         = useState(() => localStorage.getItem('sr_api_key') || '')
  const [keyInput, setKeyInput]     = useState('')
  const [projects, setProjects]     = useState([])
  const [projectId, setProjectId]   = useState(() => localStorage.getItem('sr_project_id') || '')
  const [snapshots, setSnapshots]   = useState([])
  const [snapshotId, setSnapshotId] = useState('')
  const [issues, setIssues]         = useState(null)
  const [loading, setLoading]       = useState('')
  const [error, setError]           = useState('')
  const [expanded, setExpanded]     = useState({ errors: true, warnings: false, notices: false })

  const saveKey = () => {
    const k = keyInput.trim()
    if (!k) return
    localStorage.setItem('sr_api_key', k)
    setApiKey(k)
    setKeyInput('')
    setError('')
  }

  const clearKey = () => {
    localStorage.removeItem('sr_api_key')
    localStorage.removeItem('sr_project_id')
    setApiKey('')
    setProjectId('')
    setProjects([])
    setSnapshots([])
    setIssues(null)
  }

  const fetchProjects = useCallback(async (key) => {
    setLoading('projects')
    setError('')
    try {
      const data = await srFetch('projects', {}, key)
      setProjects(data.projects || data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading('')
    }
  }, [])

  const fetchSnapshots = useCallback(async (pid) => {
    setLoading('snapshots')
    setError('')
    setIssues(null)
    setSnapshotId('')
    try {
      const data = await srFetch('snapshots', { project_id: pid }, apiKey)
      const list = data.snapshots || data || []
      setSnapshots(list)
      if (list.length) {
        const latest = list[0].snapshot_id || list[0].id
        setSnapshotId(latest)
        fetchIssues(pid, latest)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading('')
    }
  }, [apiKey])

  const fetchIssues = useCallback(async (pid, sid) => {
    setLoading('issues')
    setError('')
    try {
      const data = await srFetch('issues', { project_id: pid, snapshot_id: sid }, apiKey)
      setIssues(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading('')
    }
  }, [apiKey])

  useEffect(() => {
    if (apiKey) fetchProjects(apiKey)
  }, [apiKey, fetchProjects])

  useEffect(() => {
    if (projectId && apiKey) {
      localStorage.setItem('sr_project_id', projectId)
      fetchSnapshots(projectId)
    }
  }, [projectId])

  function toggleSection(s) {
    setExpanded(prev => ({ ...prev, [s]: !prev[s] }))
  }

  const totalErrors   = issues?.errors?.length   || 0
  const totalWarnings = issues?.warnings?.length  || 0
  const totalNotices  = issues?.notices?.length   || 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header card */}
      <div className="card" style={{ padding: '18px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
          SemRush Site Audit
        </div>

        {/* API key section */}
        {!apiKey ? (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontSize: 11, color: 'var(--dim)', marginBottom: 6 }}>
                Enter your SemRush API key — found in SemRush → Account → API
              </div>
              <input
                type="password"
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveKey()}
                placeholder="Your SemRush API key…"
                style={{
                  width: '100%', padding: '9px 13px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 8, color: 'var(--text)', fontSize: 13,
                  fontFamily: 'var(--mono)', outline: 'none',
                }}
              />
            </div>
            <button
              onClick={saveKey}
              disabled={!keyInput.trim()}
              style={{
                padding: '9px 20px', background: 'linear-gradient(135deg,#046BD2,#0086F9)',
                border: 'none', borderRadius: 8, color: '#fff', fontWeight: 600,
                fontSize: 13, cursor: keyInput.trim() ? 'pointer' : 'not-allowed', opacity: keyInput.trim() ? 1 : 0.5,
              }}
            >
              Connect
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {/* Project selector */}
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontSize: 11, color: 'var(--dim)', marginBottom: 6 }}>Project</div>
              <select
                value={projectId}
                onChange={e => setProjectId(e.target.value)}
                disabled={loading === 'projects' || !projects.length}
                style={{
                  width: '100%', padding: '9px 13px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none', cursor: 'pointer',
                }}
              >
                <option value="">
                  {loading === 'projects' ? 'Loading projects…' : projects.length ? 'Select a project…' : 'No projects found'}
                </option>
                {projects.map(p => (
                  <option key={p.project_id || p.id} value={p.project_id || p.id}>
                    {p.project_name || p.name || p.project_id || p.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Snapshot selector */}
            {snapshots.length > 1 && (
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 11, color: 'var(--dim)', marginBottom: 6 }}>Audit Snapshot</div>
                <select
                  value={snapshotId}
                  onChange={e => { setSnapshotId(e.target.value); fetchIssues(projectId, e.target.value) }}
                  style={{
                    width: '100%', padding: '9px 13px',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none', cursor: 'pointer',
                  }}
                >
                  {snapshots.map(s => (
                    <option key={s.snapshot_id || s.id} value={s.snapshot_id || s.id}>
                      {s.finish_date ? new Date(s.finish_date * 1000).toLocaleDateString() : s.snapshot_id || s.id}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Refresh + disconnect */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => projectId && fetchSnapshots(projectId)}
                disabled={!projectId || !!loading}
                style={{
                  padding: '9px 16px', background: 'linear-gradient(135deg,#046BD2,#0086F9)',
                  border: 'none', borderRadius: 8, color: '#fff', fontWeight: 600,
                  fontSize: 13, cursor: !projectId || loading ? 'not-allowed' : 'pointer',
                  opacity: !projectId || loading ? 0.5 : 1,
                }}
              >
                {loading ? '…' : '↺ Refresh'}
              </button>
              <button
                onClick={clearKey}
                style={{
                  padding: '9px 14px', background: 'transparent',
                  border: '1px solid var(--border)', borderRadius: 8,
                  color: 'var(--dim)', fontSize: 13, cursor: 'pointer',
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          padding: '10px 14px', background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8,
          fontSize: 13, color: 'var(--red)',
        }}>
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading === 'issues' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{
              height: 44, borderRadius: 8,
              background: 'var(--surface)', border: '1px solid var(--border)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          ))}
        </div>
      )}

      {/* Summary + results */}
      {issues && !loading && (
        <>
          {/* Score summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { key: 'errors',   count: totalErrors,   ...SEVERITY_CONFIG.errors   },
              { key: 'warnings', count: totalWarnings, ...SEVERITY_CONFIG.warnings },
              { key: 'notices',  count: totalNotices,  ...SEVERITY_CONFIG.notices  },
            ].map(({ key, count, label, color, bg, border }) => (
              <div key={key} className="card" style={{ padding: '16px 18px', background: bg, border: `1px solid ${border}` }}>
                <div style={{ fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{count}</div>
                <div style={{ fontSize: 12, color, fontWeight: 600, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Issue sections */}
          {totalErrors + totalWarnings + totalNotices === 0 ? (
            <div style={{
              padding: '32px', textAlign: 'center',
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
              <div style={{ fontSize: 14, color: 'var(--green)', fontWeight: 600 }}>No issues found</div>
              <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 4 }}>This snapshot is clean.</div>
            </div>
          ) : (
            ['errors', 'warnings', 'notices'].map(s => (
              <SeveritySection
                key={s}
                severity={s}
                issues={issues[s]}
                expanded={expanded[s]}
                onToggle={toggleSection}
              />
            ))
          )}
        </>
      )}

      {/* Empty state when connected but no project selected */}
      {apiKey && !projectId && !loading && !error && (
        <div style={{
          padding: '40px', textAlign: 'center',
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
        }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📊</div>
          <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 600 }}>Select a project above</div>
          <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 4 }}>
            SemRush will pull the latest site audit snapshot for that project.
          </div>
        </div>
      )}

    </div>
  )
}
