import { useState } from 'react'
import { HealthBadge, StatusCode } from '../components/Badge'
import LoadingState, { EmptyState } from '../components/LoadingState'
import DetailPanel, { DetailSection, DetailRow, IssuesList } from '../components/DetailPanel'

export default function PagesAudit({ results, loading, onRun }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = results
    .filter(p => !search || p.route.includes(search))
    .filter(p => {
      if (filter === 'issues') return p.issues.length > 0
      if (filter === 'warnings') return p.warnings.length > 0 && p.issues.length === 0
      if (filter === 'ok') return p.issues.length === 0 && p.warnings.length === 0
      return true
    })

  const selectedPage = selected ? results.find(r => r.route === selected) : null

  return (
    <div>
      <div className="toolbar">
        <input
          className="search"
          placeholder="Filter routes…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filters">
          {['all', 'issues', 'warnings', 'ok'].map(f => (
            <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <span className="toolbar-right">{filtered.length} routes</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>All Pages — {results.length} routes</h2>
          <button className="btn btn-primary btn-sm" onClick={onRun} disabled={loading}>
            {loading ? '⏳ Scanning…' : '▶ Audit Pages'}
          </button>
        </div>
        <div className="table-wrap">
          {loading ? (
            <LoadingState message="Crawling all pages…" sub="Checking SEO, status codes, and content…" />
          ) : !results.length ? (
            <EmptyState icon="📄" message="Click Audit Pages to start crawling" />
          ) : !filtered.length ? (
            <EmptyState icon="🔍" message="No pages match this filter" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>H1</th>
                  <th>OG</th>
                  <th>Health</th>
                  <th>Issues</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.route} className="clickable" onClick={() => setSelected(p.route)}>
                    <td>
                      <span className="route">
                        <a href={`https://rozper.vercel.app${p.route}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                          {p.route}
                        </a>
                      </span>
                    </td>
                    <td><StatusCode code={p.status} /></td>
                    <td>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: p.responseMs > 2000 ? 'var(--orange)' : 'var(--dim)' }}>
                        {p.responseMs ? `${p.responseMs}ms` : '—'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: p.h1Count === 1 ? 'var(--green)' : p.h1Count === 0 ? 'var(--red)' : 'var(--yellow)' }}>
                        {p.h1Count}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: (p.hasOgTitle && p.hasOgDesc && p.hasOgImage) ? 'var(--green)' : 'var(--yellow)' }}>
                        {[p.hasOgTitle, p.hasOgDesc, p.hasOgImage].filter(Boolean).length}/3
                      </span>
                    </td>
                    <td><HealthBadge issues={p.issues.length} warnings={p.warnings.length} /></td>
                    <td>
                      <div className="issues">
                        {p.issues.slice(0, 2).map((i, idx) => <div key={idx} className="issue-row err">{i}</div>)}
                        {p.warnings.slice(0, p.issues.length ? 0 : 2).map((w, idx) => <div key={idx} className="issue-row warn">{w}</div>)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail panel */}
      <DetailPanel open={!!selectedPage} onClose={() => setSelected(null)} title={selectedPage?.route || ''}>
        {selectedPage && (
          <>
            <DetailSection title="Request">
              <DetailRow label="URL" value={selectedPage.url} />
              <DetailRow label="Status" value={selectedPage.status} color={selectedPage.status === 200 ? 'var(--green)' : 'var(--red)'} />
              <DetailRow label="Response time" value={`${selectedPage.responseMs}ms`} />
              <DetailRow label="Word count" value={selectedPage.wordCount} />
            </DetailSection>
            <DetailSection title="SEO">
              <DetailRow label="Title" value={selectedPage.title || '❌ MISSING'} color={!selectedPage.title ? 'var(--red)' : undefined} />
              <DetailRow label="Description" value={selectedPage.description ? selectedPage.description.slice(0, 80) + '…' : '❌ MISSING'} color={!selectedPage.description ? 'var(--red)' : undefined} />
              <DetailRow label="H1 count" value={selectedPage.h1Count} color={selectedPage.h1Count === 1 ? 'var(--green)' : selectedPage.h1Count === 0 ? 'var(--red)' : 'var(--yellow)'} />
              <DetailRow label="Canonical" value={selectedPage.hasCanonical ? '✓ Present' : '✗ Missing'} color={selectedPage.hasCanonical ? 'var(--green)' : 'var(--yellow)'} />
              <DetailRow label="og:title" value={selectedPage.hasOgTitle ? '✓' : '✗'} color={selectedPage.hasOgTitle ? 'var(--green)' : 'var(--yellow)'} />
              <DetailRow label="og:description" value={selectedPage.hasOgDesc ? '✓' : '✗'} color={selectedPage.hasOgDesc ? 'var(--green)' : 'var(--yellow)'} />
              <DetailRow label="og:image" value={selectedPage.hasOgImage ? '✓' : '✗'} color={selectedPage.hasOgImage ? 'var(--green)' : 'var(--yellow)'} />
              <DetailRow label="Images w/o alt" value={selectedPage.imagesWithoutAlt} color={selectedPage.imagesWithoutAlt > 0 ? 'var(--yellow)' : 'var(--green)'} />
            </DetailSection>
            <IssuesList issues={selectedPage.issues} warnings={selectedPage.warnings} />
          </>
        )}
      </DetailPanel>
    </div>
  )
}
