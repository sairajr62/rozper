import StatCard from '../components/StatCard'
import { HealthBadge, StatusCode } from '../components/Badge'

export default function Overview({ summary, pageResults, blogResults, onGoToPages, onGoToBlogs }) {
  const pageIssues = pageResults.filter(p => p.issues.length > 0)
  const blogIssues = blogResults.filter(b => b.issues.length > 0)
  const blogWarnings = blogResults.filter(b => b.warnings.length > 0)
  const missingImgs = blogResults.filter(b => b.issues.some(i => i.includes('image'))).length
  const thinContent = blogResults.filter(b => b.issues.some(i => i.includes('Thin'))).length

  const topPages = [...pageResults]
    .sort((a, b) => (b.issues.length + b.warnings.length) - (a.issues.length + a.warnings.length))
    .slice(0, 10)

  return (
    <div>
      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          label="Total Pages"
          value={pageResults.length || summary?.pages?.total || '—'}
          sub="Static routes"
          color="c-blue"
        />
        <StatCard
          label="Pages with Issues"
          value={pageResults.length ? pageIssues.length : '—'}
          sub="Need attention"
          color={pageIssues.length > 0 ? 'c-red' : 'c-green'}
        />
        <StatCard
          label="Blog Posts"
          value={blogResults.length || summary?.blogs?.total || '—'}
          sub="Markdown files"
          color="c-blue"
        />
        <StatCard
          label="Blog Issues"
          value={blogResults.length ? blogIssues.length + blogWarnings.length : '—'}
          sub="Issues + warnings"
          color={blogIssues.length > 0 ? 'c-yellow' : 'c-green'}
        />
      </div>

      {/* Two columns */}
      <div className="two-col">
        {/* Critical page issues */}
        <div className="card">
          <div className="card-header">
            <h2>🔴 Critical Page Issues</h2>
            <button className="btn btn-ghost btn-sm" onClick={onGoToPages}>View all →</button>
          </div>
          <div className="card-body" style={{ padding: '0 18px' }}>
            {!pageResults.length ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 12 }}>
                Run Pages Audit to see issues
              </div>
            ) : pageIssues.length === 0 ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--green)', fontSize: 13 }}>
                ✓ No critical page issues
              </div>
            ) : (
              pageIssues.slice(0, 7).map(p => (
                <div key={p.route} className="health-row" style={{ cursor: 'pointer' }} onClick={onGoToPages}>
                  <span className="route" style={{ minWidth: 130, flexShrink: 0 }}>{p.route}</span>
                  <div className="issues">
                    {p.issues.slice(0, 2).map((i, idx) => <div key={idx} className="issue-row err">{i}</div>)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Blog health */}
        <div className="card">
          <div className="card-header">
            <h2>📝 Blog Health</h2>
            <button className="btn btn-ghost btn-sm" onClick={onGoToBlogs}>View all →</button>
          </div>
          <div className="card-body" style={{ padding: '0 18px' }}>
            {!blogResults.length ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 12 }}>
                Run Blog Audit to see data
              </div>
            ) : (
              <>
                <div className="health-row"><span style={{ color: 'var(--muted)' }}>Total posts</span><span style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)', fontSize: 12 }}>{blogResults.length}</span></div>
                <div className="health-row"><span style={{ color: 'var(--muted)' }}>Posts with issues</span><span style={{ color: blogIssues.length > 0 ? 'var(--red)' : 'var(--green)', fontFamily: 'var(--mono)', fontSize: 12 }}>{blogIssues.length}</span></div>
                <div className="health-row"><span style={{ color: 'var(--muted)' }}>Posts with warnings</span><span style={{ color: blogWarnings.length > 0 ? 'var(--yellow)' : 'var(--green)', fontFamily: 'var(--mono)', fontSize: 12 }}>{blogWarnings.length}</span></div>
                <div className="health-row"><span style={{ color: 'var(--muted)' }}>Missing images</span><span style={{ color: missingImgs > 0 ? 'var(--red)' : 'var(--green)', fontFamily: 'var(--mono)', fontSize: 12 }}>{missingImgs}</span></div>
                <div className="health-row"><span style={{ color: 'var(--muted)' }}>Thin content</span><span style={{ color: thinContent > 0 ? 'var(--orange)' : 'var(--green)', fontFamily: 'var(--mono)', fontSize: 12 }}>{thinContent}</span></div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Top issues table */}
      <div className="card">
        <div className="card-header">
          <h2>Top 10 Pages by Issue Count</h2>
        </div>
        <div className="table-wrap">
          {!pageResults.length ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              Click <strong>Run Audit</strong> to start scanning all pages
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Response</th>
                  <th>Health</th>
                  <th>Top issues</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map(p => (
                  <tr key={p.route}>
                    <td><span className="route"><a href={`http://localhost:3000${p.route}`} target="_blank" rel="noreferrer">{p.route}</a></span></td>
                    <td><StatusCode code={p.status} /></td>
                    <td><span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: p.responseMs > 2000 ? 'var(--orange)' : 'var(--dim)' }}>{p.responseMs ? `${p.responseMs}ms` : '—'}</span></td>
                    <td><HealthBadge issues={p.issues.length} warnings={p.warnings.length} /></td>
                    <td>
                      <div className="issues">
                        {p.issues.slice(0, 1).map((i, idx) => <div key={idx} className="issue-row err">{i}</div>)}
                        {p.warnings.slice(0, 1).map((w, idx) => <div key={idx} className="issue-row warn">{w}</div>)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
