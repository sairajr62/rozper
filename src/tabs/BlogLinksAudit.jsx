import { useState } from 'react'
import Badge, { HealthBadge } from '../components/Badge'
import LoadingState, { EmptyState } from '../components/LoadingState'
import DetailPanel, { DetailSection, DetailRow, IssuesList } from '../components/DetailPanel'

export default function BlogLinksAudit({ results, loading, onRun }) {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const selectedPost = selected ? results.find(r => r.file === selected) : null

  const totalInternal  = results.reduce((s, r) => s + r.internalCount, 0)
  const totalExternal  = results.reduce((s, r) => s + r.externalCount, 0)
  const failInternal   = results.filter(r => r.internalCount < 2).length
  const failExternal   = results.filter(r => r.externalCount < 1).length
  const passing        = results.filter(r => r.issues.length === 0 && r.warnings.length === 0).length

  const filtered = results.filter(r => {
    if (filter === 'issues')    return r.issues.length > 0
    if (filter === 'warnings')  return r.warnings.length > 0
    if (filter === 'passing')   return r.issues.length === 0 && r.warnings.length === 0
    return true
  })

  return (
    <div>
      {results.length > 0 && (
        <>
          <div className="stats-grid" style={{ marginBottom: 20 }}>
            <div className="stat-card">
              <div className="stat-label">Posts Audited</div>
              <div className="stat-value c-text">{results.length}</div>
              <div className="stat-sub">{passing} fully passing</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Internal Links</div>
              <div className={`stat-value ${failInternal === 0 ? 'c-green' : 'c-red'}`}>{totalInternal}</div>
              <div className="stat-sub">{failInternal > 0 ? <span style={{ color: 'var(--red)' }}>{failInternal} posts below minimum (2)</span> : 'All posts meet minimum'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">External Links</div>
              <div className={`stat-value ${failExternal === 0 ? 'c-green' : 'c-yellow'}`}>{totalExternal}</div>
              <div className="stat-sub">{failExternal > 0 ? <span style={{ color: 'var(--yellow)' }}>{failExternal} posts missing external link</span> : 'All posts have outbound link'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Issues</div>
              <div className={`stat-value ${failInternal === 0 ? 'c-green' : 'c-red'}`}>{failInternal}</div>
              <div className="stat-sub">posts with &lt;2 internal links</div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><h2>🔗 Link Rules</h2></div>
            <div className="card-body" style={{ display: 'flex', gap: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: failInternal === 0 ? 'var(--green)' : 'var(--red)', fontSize: 16 }}>{failInternal === 0 ? '✓' : '✕'}</span>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>Internal links ≥ 2 per post</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Links to rozper.com or relative paths</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: failExternal === 0 ? 'var(--green)' : 'var(--yellow)', fontSize: 16 }}>{failExternal === 0 ? '✓' : '⚠'}</span>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>External links ≥ 1 per post</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Links to external domains</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="toolbar">
        <div className="filters">
          <button className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All ({results.length})</button>
          <button className={`filter-pill ${filter === 'issues' ? 'active' : ''}`} onClick={() => setFilter('issues')}>Issues ({results.filter(r => r.issues.length > 0).length})</button>
          <button className={`filter-pill ${filter === 'warnings' ? 'active' : ''}`} onClick={() => setFilter('warnings')}>Warnings ({results.filter(r => r.warnings.length > 0).length})</button>
          <button className={`filter-pill ${filter === 'passing' ? 'active' : ''}`} onClick={() => setFilter('passing')}>Passing ({passing})</button>
        </div>
        <span className="toolbar-right">{filtered.length} posts</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Blog Internal &amp; External Links</h2>
          <button className="btn btn-primary btn-sm" onClick={onRun} disabled={loading}>
            {loading ? '⏳ Scanning…' : '▶ Run Audit'}
          </button>
        </div>
        <div className="table-wrap">
          {loading ? (
            <LoadingState message="Scanning blog posts for links…" sub="Checking internal and external link counts…" />
          ) : !results.length ? (
            <EmptyState icon="🔗" message="Click Run Audit to check blog post links" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Internal Links</th>
                  <th>External Links</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.file} className="clickable" onClick={() => setSelected(p.file)}>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--text)' }}>{p.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'var(--mono)' }}>{p.file}</div>
                    </td>
                    <td>
                      {p.internalCount >= 2
                        ? <Badge type="ok">✓ {p.internalCount}</Badge>
                        : <Badge type="error">✕ {p.internalCount} / min 2</Badge>}
                    </td>
                    <td>
                      {p.externalCount >= 1
                        ? <Badge type="ok">✓ {p.externalCount}</Badge>
                        : <Badge type="warn">⚠ 0 / min 1</Badge>}
                    </td>
                    <td><HealthBadge issues={p.issues.length} warnings={p.warnings.length} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <DetailPanel open={!!selectedPost} onClose={() => setSelected(null)} title={`Links — ${selectedPost?.title || ''}`}>
        {selectedPost && (
          <>
            <DetailSection title="Link Summary">
              <DetailRow
                label="Internal links"
                value={`${selectedPost.internalCount} (min 2)`}
                color={selectedPost.internalCount >= 2 ? 'var(--green)' : 'var(--red)'}
              />
              <DetailRow
                label="External links"
                value={`${selectedPost.externalCount} (min 1)`}
                color={selectedPost.externalCount >= 1 ? 'var(--green)' : 'var(--yellow)'}
              />
            </DetailSection>

            {selectedPost.internalLinks.length > 0 && (
              <DetailSection title={`Internal Links (${selectedPost.internalLinks.length})`}>
                {selectedPost.internalLinks.map((l, i) => (
                  <div key={i} style={{ padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                    <div style={{ color: 'var(--cyan)', marginBottom: 2 }}>{l.text || '(no text)'}</div>
                    <div style={{ color: 'var(--dim)', fontFamily: 'var(--mono)', fontSize: 11 }}>{l.href}</div>
                  </div>
                ))}
              </DetailSection>
            )}

            {selectedPost.externalLinks.length > 0 && (
              <DetailSection title={`External Links (${selectedPost.externalLinks.length})`}>
                {selectedPost.externalLinks.map((l, i) => (
                  <div key={i} style={{ padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                    <div style={{ color: 'var(--cyan)', marginBottom: 2 }}>{l.text || '(no text)'}</div>
                    <div style={{ color: 'var(--dim)', fontFamily: 'var(--mono)', fontSize: 11 }}>{l.href}</div>
                  </div>
                ))}
              </DetailSection>
            )}

            <IssuesList issues={selectedPost.issues} warnings={selectedPost.warnings} />
          </>
        )}
      </DetailPanel>
    </div>
  )
}
