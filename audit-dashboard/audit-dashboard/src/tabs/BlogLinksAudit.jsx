import { useState } from 'react'
import Badge, { HealthBadge } from '../components/Badge'
import LoadingState, { EmptyState } from '../components/LoadingState'
import DetailPanel, { DetailSection, DetailRow, IssuesList } from '../components/DetailPanel'

function LinkList({ links, label }) {
  if (!links?.length) return null
  return (
    <DetailSection title={`${label} (${links.length})`}>
      {links.map((l, i) => (
        <div key={i} style={{ padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
          <div style={{ color: 'var(--cyan)', marginBottom: 2 }}>{l.text || '(no anchor text)'}</div>
          <div style={{ color: 'var(--dim)', fontFamily: 'var(--mono)', fontSize: 11, wordBreak: 'break-all' }}>{l.href}</div>
        </div>
      ))}
    </DetailSection>
  )
}

export default function BlogLinksAudit({ results, loading, onRun }) {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter]     = useState('all')

  const selectedPost = selected ? results.find(r => r.file === selected) : null

  const totalInternal  = results.reduce((s, r) => s + r.internalCount, 0)
  const totalExternal  = results.reduce((s, r) => s + r.externalCount, 0)
  const failInternal   = results.filter(r => r.internalCount < 2).length
  const failExternal   = results.filter(r => r.externalCount < 1).length
  const stagingIssues  = results.filter(r => r.stagingLinks?.length > 0).length
  const introIssues    = results.filter(r => r.introLinks?.length > 0).length
  const conclusionIssues = results.filter(r => r.conclusionLinks?.length > 0).length
  const passing        = results.filter(r => r.issues.length === 0 && r.warnings.length === 0).length

  const filtered = results.filter(r => {
    if (filter === 'issues')   return r.issues.length > 0
    if (filter === 'warnings') return r.warnings.length > 0
    if (filter === 'passing')  return r.issues.length === 0 && r.warnings.length === 0
    return true
  })

  return (
    <div>
      {results.length > 0 && (
        <>
          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom: 20 }}>
            <div className="stat-card">
              <div className="stat-label">Posts Audited</div>
              <div className="stat-value c-text">{results.length}</div>
              <div className="stat-sub">{passing} fully passing</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Internal Links</div>
              <div className={`stat-value ${failInternal === 0 ? 'c-green' : 'c-red'}`}>{totalInternal}</div>
              <div className="stat-sub">
                {failInternal > 0
                  ? <span style={{ color: 'var(--red)' }}>{failInternal} posts below min (2)</span>
                  : 'All posts meet minimum'}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">External Links</div>
              <div className={`stat-value ${failExternal === 0 ? 'c-green' : 'c-yellow'}`}>{totalExternal}</div>
              <div className="stat-sub">
                {failExternal > 0
                  ? <span style={{ color: 'var(--yellow)' }}>{failExternal} posts missing external link</span>
                  : 'All posts have outbound link'}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Issues</div>
              <div className={`stat-value ${failInternal === 0 ? 'c-green' : 'c-red'}`}>{failInternal}</div>
              <div className="stat-sub">posts with &lt;2 internal links</div>
            </div>
          </div>

          {/* Rules summary */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><h2>🔗 Link Rules</h2></div>
            <div className="card-body" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {[
                { ok: failInternal === 0,   level: 'err',  label: 'Internal links ≥ 2 per post',       sub: 'rozper.com or relative paths only' },
                { ok: failExternal === 0,   level: 'warn', label: 'External links ≥ 1 per post',       sub: 'At least 1 outbound link' },
                { ok: stagingIssues === 0,  level: 'warn', label: 'No rozper.vercel.app links',        sub: `${stagingIssues} post(s) use staging domain` },
                { ok: introIssues === 0,    level: 'warn', label: 'No links in introduction',          sub: `${introIssues} post(s) have intro links` },
                { ok: conclusionIssues === 0, level: 'warn', label: 'No links in conclusion',          sub: `${conclusionIssues} post(s) have conclusion links` },
              ].map(({ ok, level, label, sub }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, minWidth: 200 }}>
                  <span style={{
                    color: ok ? 'var(--green)' : level === 'err' ? 'var(--red)' : '#f59e0b',
                    fontSize: 16, lineHeight: 1, marginTop: 2,
                  }}>
                    {ok ? '✓' : level === 'err' ? '✕' : '⚠'}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{label}</div>
                    <div style={{ fontSize: 11, color: ok ? 'var(--dim)' : level === 'err' ? 'var(--red)' : '#f59e0b', marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
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
            <LoadingState message="Scanning blog posts for links…" sub="Checking counts, domains, intro/conclusion placement…" />
          ) : !results.length ? (
            <EmptyState icon="🔗" message="Click Run Audit to check blog post links" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Internal</th>
                  <th>External</th>
                  <th>Domain</th>
                  <th>Placement</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const hasStaging     = p.stagingLinks?.length > 0
                  const hasIntroLinks  = p.introLinks?.length > 0
                  const hasConcLinks   = p.conclusionLinks?.length > 0
                  const placementOk    = !hasIntroLinks && !hasConcLinks

                  return (
                    <tr key={p.file} className="clickable" onClick={() => setSelected(p.file)}>
                      <td>
                        <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--text)' }}>{p.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'var(--mono)' }}>{p.file}</div>
                      </td>
                      <td>
                        {p.internalCount >= 2
                          ? <Badge type="ok">✓ {p.internalCount}</Badge>
                          : <Badge type="error">✕ {p.internalCount}/2</Badge>}
                      </td>
                      <td>
                        {p.externalCount >= 1
                          ? <Badge type="ok">✓ {p.externalCount}</Badge>
                          : <Badge type="warn">⚠ 0</Badge>}
                      </td>
                      <td>
                        {hasStaging
                          ? <Badge type="warn">⚠ vercel.app ({p.stagingLinks.length})</Badge>
                          : <Badge type="ok">✓ rozper.com</Badge>}
                      </td>
                      <td>
                        {placementOk
                          ? <Badge type="ok">✓ OK</Badge>
                          : <Badge type="warn">
                              ⚠ {[hasIntroLinks && 'intro', hasConcLinks && 'conclusion'].filter(Boolean).join(' + ')}
                            </Badge>}
                      </td>
                      <td><HealthBadge issues={p.issues.length} warnings={p.warnings.length} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <DetailPanel open={!!selectedPost} onClose={() => setSelected(null)} title={`Links — ${selectedPost?.title || ''}`}>
        {selectedPost && (
          <>
            <DetailSection title="Link Summary">
              <DetailRow label="Internal links" value={`${selectedPost.internalCount} (min 2 required)`} color={selectedPost.internalCount >= 2 ? 'var(--green)' : 'var(--red)'} />
              <DetailRow label="External links" value={`${selectedPost.externalCount} (min 1 required)`} color={selectedPost.externalCount >= 1 ? 'var(--green)' : '#f59e0b'} />
              <DetailRow
                label="Domain check"
                value={selectedPost.stagingLinks?.length > 0 ? `⚠ ${selectedPost.stagingLinks.length} link(s) use rozper.vercel.app` : '✓ All internal links use rozper.com'}
                color={selectedPost.stagingLinks?.length > 0 ? '#f59e0b' : 'var(--green)'}
              />
              <DetailRow
                label="Intro links"
                value={selectedPost.introLinks?.length > 0 ? `⚠ ${selectedPost.introLinks.length} link(s) in introduction` : '✓ No links in intro'}
                color={selectedPost.introLinks?.length > 0 ? '#f59e0b' : 'var(--green)'}
              />
              <DetailRow
                label="Conclusion links"
                value={selectedPost.conclusionLinks?.length > 0 ? `⚠ ${selectedPost.conclusionLinks.length} link(s) in conclusion` : '✓ No links in conclusion'}
                color={selectedPost.conclusionLinks?.length > 0 ? '#f59e0b' : 'var(--green)'}
              />
            </DetailSection>

            <LinkList links={selectedPost.internalLinks}   label="Internal Links (rozper.com)" />
            <LinkList links={selectedPost.externalLinks}   label="External Links" />
            <LinkList links={selectedPost.stagingLinks}    label="⚠ Wrong Domain (vercel.app)" />
            <LinkList links={selectedPost.introLinks}      label="⚠ Links in Introduction" />
            <LinkList links={selectedPost.conclusionLinks} label="⚠ Links in Conclusion" />

            <IssuesList issues={selectedPost.issues} warnings={selectedPost.warnings} />
          </>
        )}
      </DetailPanel>
    </div>
  )
}
