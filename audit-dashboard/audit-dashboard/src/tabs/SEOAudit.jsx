import { useState } from 'react'
import Badge, { HealthBadge, StatusCode } from '../components/Badge'
import LoadingState, { EmptyState } from '../components/LoadingState'
import DetailPanel, { DetailSection, DetailRow, IssuesList } from '../components/DetailPanel'

function ScoreRing({ score, size = 48 }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const fill = (score / 100) * circ
  const color = score >= 80 ? 'var(--green)' : score >= 50 ? 'var(--yellow)' : 'var(--red)'
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        style={{ transform: 'rotate(90deg)', transformOrigin: `${size/2}px ${size/2}px`, fill: color, fontSize: size < 48 ? 10 : 12, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
        {score}
      </text>
    </svg>
  )
}

function seoScore(p) {
  let score = 100
  if (!p.title) score -= 20
  else if (p.titleLen < 30 || p.titleLen > 65) score -= 8
  if (!p.description) score -= 20
  else if (p.descLen < 50 || p.descLen > 160) score -= 8
  if (p.h1.length !== 1) score -= 15
  if (!p.canonical) score -= 10
  if (!p.hasJsonLd) score -= 10
  if (p.ogScore < 80) score -= 8
  if (!p.twitterCard) score -= 5
  const altMissing = p.imagesTotal - p.imagesWithAlt
  if (altMissing > 0) score -= Math.min(10, altMissing * 2)
  if (p.robotsMeta && p.robotsMeta.includes('noindex')) score -= 30
  return Math.max(0, score)
}

export default function SEOAudit({ results, loading, onRun }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [singleRoute, setSingleRoute] = useState('')
  const [singleLoading, setSingleLoading] = useState(false)

  const scored = results.map(p => ({ ...p, score: seoScore(p) }))

  const filtered = scored
    .filter(p => !search || p.route.toLowerCase().includes(search.toLowerCase()))
    .filter(p => {
      if (filter === 'critical') return p.issues.length > 0
      if (filter === 'warnings') return p.warnings.length > 0 && p.issues.length === 0
      if (filter === 'good') return p.score >= 80
      return true
    })
    .sort((a, b) => a.score - b.score)

  const selectedPage = selected ? scored.find(r => r.route === selected) : null

  // Summary stats
  const avgScore = scored.length ? Math.round(scored.reduce((s, p) => s + p.score, 0) / scored.length) : 0
  const critical = scored.filter(p => p.issues.length > 0).length
  const noJsonLd = scored.filter(p => !p.hasJsonLd).length
  const noCanonical = scored.filter(p => !p.canonical).length

  return (
    <div>
      {/* Stats */}
      {results.length > 0 && (
        <div className="stats-grid" style={{ marginBottom: 20 }}>
          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <ScoreRing score={avgScore} size={52} />
            <div>
              <div className="stat-label">Avg SEO Score</div>
              <div className="stat-sub">{scored.length} pages</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Critical Issues</div>
            <div className={`stat-value ${critical > 0 ? 'c-red' : 'c-green'}`}>{critical}</div>
            <div className="stat-sub">Pages with errors</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">No Structured Data</div>
            <div className={`stat-value ${noJsonLd > 0 ? 'c-yellow' : 'c-green'}`}>{noJsonLd}</div>
            <div className="stat-sub">Missing JSON-LD</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">No Canonical</div>
            <div className={`stat-value ${noCanonical > 0 ? 'c-yellow' : 'c-green'}`}>{noCanonical}</div>
            <div className="stat-sub">Missing canonical URL</div>
          </div>
        </div>
      )}

      <div className="toolbar">
        <input className="search" placeholder="Filter routes…" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="filters">
          {[['all','All'],['critical','Critical'],['warnings','Warnings'],['good','Good (80+)']].map(([f,l]) => (
            <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{l}</button>
          ))}
        </div>
        <span className="toolbar-right">{filtered.length} pages</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>SEO Analysis — {results.length} pages</h2>
          <button className="btn btn-primary btn-sm" onClick={onRun} disabled={loading}>
            {loading ? '⏳ Analysing…' : '▶ Run SEO Audit'}
          </button>
        </div>
        <div className="table-wrap">
          {loading ? (
            <LoadingState message="Running deep SEO analysis on all pages…" sub="Checking titles, headings, schema, OG tags, canonical…" />
          ) : !results.length ? (
            <EmptyState icon="🔍" message="Click Run SEO Audit to analyse all pages" />
          ) : !filtered.length ? (
            <EmptyState icon="✓" message="No pages match this filter" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Score</th>
                  <th>Title</th>
                  <th>Desc</th>
                  <th>H1</th>
                  <th>Schema</th>
                  <th>OG%</th>
                  <th>Issues</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.route} className="clickable" onClick={() => setSelected(p.route)}>
                    <td><span className="route"><a href={`https://rozper.vercel.app${p.route}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>{p.route}</a></span></td>
                    <td><ScoreRing score={p.score} size={36} /></td>
                    <td>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: !p.title ? 'var(--red)' : p.titleLen > 65 || p.titleLen < 30 ? 'var(--yellow)' : 'var(--green)' }}>
                        {p.titleLen || '—'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: !p.description ? 'var(--red)' : p.descLen > 160 || p.descLen < 50 ? 'var(--yellow)' : 'var(--green)' }}>
                        {p.descLen || '—'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: p.h1.length === 1 ? 'var(--green)' : p.h1.length === 0 ? 'var(--red)' : 'var(--yellow)' }}>
                        {p.h1.length}
                      </span>
                    </td>
                    <td>
                      {p.hasJsonLd
                        ? <Badge type="ok">✓ {p.jsonLdTypes[0] || 'JSON-LD'}</Badge>
                        : <Badge type="warn">None</Badge>}
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: p.ogScore >= 80 ? 'var(--green)' : p.ogScore >= 60 ? 'var(--yellow)' : 'var(--red)' }}>
                        {p.ogScore}%
                      </span>
                    </td>
                    <td><HealthBadge issues={p.issues.length} warnings={p.warnings.length} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail panel */}
      <DetailPanel open={!!selectedPage} onClose={() => setSelected(null)} title={`SEO — ${selectedPage?.route || ''}`}>
        {selectedPage && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <ScoreRing score={selectedPage.score} size={56} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>SEO Score: {selectedPage.score}/100</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{selectedPage.issues.length} issues · {selectedPage.warnings.length} warnings</div>
              </div>
            </div>
            <DetailSection title="Content">
              <DetailRow label="Title" value={selectedPage.title || '❌ MISSING'} color={!selectedPage.title ? 'var(--red)' : undefined} />
              <DetailRow label="Title length" value={`${selectedPage.titleLen} chars`} color={selectedPage.titleLen >= 30 && selectedPage.titleLen <= 65 ? 'var(--green)' : 'var(--yellow)'} />
              <DetailRow label="Meta description" value={selectedPage.description ? selectedPage.description.slice(0,80)+'…' : '❌ MISSING'} color={!selectedPage.description ? 'var(--red)' : undefined} />
              <DetailRow label="Desc length" value={`${selectedPage.descLen} chars`} color={selectedPage.descLen >= 50 && selectedPage.descLen <= 160 ? 'var(--green)' : 'var(--yellow)'} />
              <DetailRow label="Word count" value={selectedPage.wordCount} color={selectedPage.wordCount < 100 ? 'var(--yellow)' : 'var(--green)'} />
            </DetailSection>
            <DetailSection title="Headings">
              <DetailRow label="H1 count" value={selectedPage.h1.length} color={selectedPage.h1.length === 1 ? 'var(--green)' : 'var(--red)'} />
              {selectedPage.h1.map((h, i) => <DetailRow key={i} label={`H1[${i}]`} value={h} />)}
              <DetailRow label="H2 count" value={selectedPage.h2.length} color={selectedPage.h2.length > 0 ? 'var(--green)' : 'var(--yellow)'} />
              <DetailRow label="H3 count" value={selectedPage.h3.length} />
            </DetailSection>
            <DetailSection title="Technical SEO">
              <DetailRow label="Canonical" value={selectedPage.canonical || '⚠ Missing'} color={!selectedPage.canonical ? 'var(--yellow)' : 'var(--green)'} />
              <DetailRow label="Robots meta" value={selectedPage.robotsMeta || 'Not set'} color={selectedPage.robotsMeta?.includes('noindex') ? 'var(--red)' : 'var(--green)'} />
              <DetailRow label="JSON-LD" value={selectedPage.hasJsonLd ? `✓ (${selectedPage.jsonLdTypes.join(', ') || 'present'})` : '⚠ Missing'} color={selectedPage.hasJsonLd ? 'var(--green)' : 'var(--yellow)'} />
            </DetailSection>
            <DetailSection title="Social & OG">
              <DetailRow label="OG completeness" value={`${selectedPage.ogScore}%`} color={selectedPage.ogScore >= 80 ? 'var(--green)' : selectedPage.ogScore >= 60 ? 'var(--yellow)' : 'var(--red)'} />
              <DetailRow label="Twitter card" value={selectedPage.twitterCard ? '✓ Present' : '⚠ Missing'} color={selectedPage.twitterCard ? 'var(--green)' : 'var(--yellow)'} />
            </DetailSection>
            <DetailSection title="Images & Links">
              <DetailRow label="Total images" value={selectedPage.imagesTotal} />
              <DetailRow label="Images with alt" value={`${selectedPage.imagesWithAlt} / ${selectedPage.imagesTotal}`} color={selectedPage.imagesWithAlt === selectedPage.imagesTotal ? 'var(--green)' : 'var(--yellow)'} />
              <DetailRow label="Internal links" value={selectedPage.internalLinks} />
              <DetailRow label="External links" value={selectedPage.externalLinks} />
            </DetailSection>
            <IssuesList issues={selectedPage.issues} warnings={selectedPage.warnings} />
          </>
        )}
      </DetailPanel>
    </div>
  )
}
