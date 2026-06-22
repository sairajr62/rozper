import { useState } from 'react'
import Badge, { HealthBadge } from '../components/Badge'
import LoadingState, { EmptyState } from '../components/LoadingState'
import DetailPanel, { DetailSection, DetailRow, IssuesList } from '../components/DetailPanel'

export default function BlogAudit({ results, loading, onRun }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = results
    .filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.file.toLowerCase().includes(search.toLowerCase()))
    .filter(b => {
      if (filter === 'issues') return b.issues.length > 0
      if (filter === 'warnings') return b.warnings.length > 0 && b.issues.length === 0
      if (filter === 'ok') return b.issues.length === 0 && b.warnings.length === 0
      return true
    })

  const selectedPost = selected ? results.find(r => r.slug === selected) : null

  return (
    <div>
      <div className="toolbar">
        <input
          className="search"
          placeholder="Filter posts…"
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
        <span className="toolbar-right">{filtered.length} posts</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Blog Posts — {results.length} files</h2>
          <button className="btn btn-primary btn-sm" onClick={onRun} disabled={loading}>
            {loading ? '⏳ Reading…' : '▶ Audit Blogs'}
          </button>
        </div>
        <div className="table-wrap">
          {loading ? (
            <LoadingState message="Reading blog markdown files…" sub="Checking frontmatter, images, word count…" />
          ) : !results.length ? (
            <EmptyState icon="📝" message="Click Audit Blogs to start" />
          ) : !filtered.length ? (
            <EmptyState icon="🔍" message="No posts match this filter" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Words</th>
                  <th>Author</th>
                  <th>Health</th>
                  <th>Issues</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => {
                  const imgOk = b.featuredImage && !b.issues.some(i => i.toLowerCase().includes('image'))
                  const wc = b.wordCount
                  const wcColor = wc < 300 ? 'var(--red)' : wc < 600 ? 'var(--yellow)' : 'var(--green)'

                  return (
                    <tr key={b.slug} className="clickable" onClick={() => setSelected(b.slug)}>
                      <td style={{ maxWidth: 260 }}>
                        <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                        <div style={{ fontSize: 10, color: 'var(--dim)', fontFamily: 'var(--mono)', marginTop: 2 }}>{b.file}</div>
                      </td>
                      <td>
                        {b.category
                          ? <Badge type="info">{b.category}</Badge>
                          : <Badge type="gray">None</Badge>}
                      </td>
                      <td>
                        {!b.featuredImage
                          ? <Badge type="error">Missing</Badge>
                          : !imgOk
                          ? <Badge type="error">Broken</Badge>
                          : <Badge type="ok">✓</Badge>}
                      </td>
                      <td><span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: wcColor }}>{wc}</span></td>
                      <td><span style={{ fontSize: 11, color: b.author ? 'var(--muted)' : 'var(--yellow)' }}>{b.author || '—'}</span></td>
                      <td><HealthBadge issues={b.issues.length} warnings={b.warnings.length} /></td>
                      <td>
                        <div className="issues">
                          {b.issues.slice(0, 2).map((i, idx) => <div key={idx} className="issue-row err">{i}</div>)}
                          {b.warnings.slice(0, b.issues.length ? 0 : 2).map((w, idx) => <div key={idx} className="issue-row warn">{w}</div>)}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail panel */}
      <DetailPanel open={!!selectedPost} onClose={() => setSelected(null)} title={selectedPost?.title || ''}>
        {selectedPost && (
          <>
            <DetailSection title="Metadata">
              <DetailRow label="File" value={selectedPost.file} />
              <DetailRow label="Slug" value={selectedPost.slug} />
              <DetailRow label="Category" value={selectedPost.category || '⚠ Missing'} color={!selectedPost.category ? 'var(--yellow)' : 'var(--cyan)'} />
              <DetailRow label="Author" value={selectedPost.author || '⚠ Missing'} color={!selectedPost.author ? 'var(--yellow)' : undefined} />
              <DetailRow label="Publish date" value={selectedPost.publishDate || '⚠ Missing'} color={!selectedPost.publishDate ? 'var(--yellow)' : undefined} />
              <DetailRow label="Word count" value={`${selectedPost.wordCount} words`} color={selectedPost.wordCount < 300 ? 'var(--red)' : selectedPost.wordCount < 600 ? 'var(--yellow)' : 'var(--green)'} />
            </DetailSection>
            <DetailSection title="Assets">
              <DetailRow
                label="Featured image"
                value={selectedPost.featuredImage || '❌ MISSING'}
                color={!selectedPost.featuredImage ? 'var(--red)' : undefined}
              />
            </DetailSection>
            <IssuesList issues={selectedPost.issues} warnings={selectedPost.warnings} />
          </>
        )}
      </DetailPanel>
    </div>
  )
}
