import { useState } from 'react'
import Badge, { HealthBadge } from '../components/Badge'
import LoadingState, { EmptyState } from '../components/LoadingState'
import DetailPanel, { DetailSection, DetailRow, IssuesList } from '../components/DetailPanel'

function Check({ ok, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
      <span style={{ color: ok ? 'var(--green)' : 'var(--red)', fontSize: 14, flexShrink: 0 }}>{ok ? '✓' : '✕'}</span>
      <span style={{ color: ok ? 'var(--text)' : 'var(--muted)' }}>{label}</span>
    </div>
  )
}

export default function AnalyticsAudit({ results, loading, onRun, onRunAll }) {
  const [selected, setSelected] = useState(null)
  const [fullMode, setFullMode] = useState(false)

  const selectedPage = selected ? results.find(r => r.route === selected) : null

  const hasGA4 = results.filter(r => r.hasGA4).length
  const hasGTM = results.filter(r => r.hasGTM).length
  const missingTracking = results.filter(r => !r.hasGA4 && !r.hasGTM).length
  const hasConsent = results.filter(r => r.hasConsentMode).length
  const legacyUA = results.filter(r => r.hasOldUA).length

  // Find GA4 ID and GTM ID from any page
  const ga4Id = results.find(r => r.ga4Id)?.ga4Id || null
  const gtmId = results.find(r => r.gtmId)?.gtmId || null

  return (
    <div>
      {/* GA Config summary */}
      {results.length > 0 && (
        <>
          <div className="stats-grid" style={{ marginBottom: 20 }}>
            <div className="stat-card">
              <div className="stat-label">GA4 Tracking</div>
              <div className={`stat-value ${hasGA4 === results.length ? 'c-green' : hasGA4 > 0 ? 'c-yellow' : 'c-red'}`}>{hasGA4}/{results.length}</div>
              <div className="stat-sub">{ga4Id ? <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--cyan)' }}>{ga4Id}</span> : 'No GA4 ID found'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Google Tag Manager</div>
              <div className={`stat-value ${hasGTM > 0 ? 'c-green' : 'c-dim'}`}>{hasGTM > 0 ? hasGTM : '—'}</div>
              <div className="stat-sub">{gtmId ? <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--cyan)' }}>{gtmId}</span> : 'No GTM ID found'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Missing Analytics</div>
              <div className={`stat-value ${missingTracking > 0 ? 'c-red' : 'c-green'}`}>{missingTracking}</div>
              <div className="stat-sub">Pages with no tracking</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Consent Mode</div>
              <div className={`stat-value ${hasConsent === results.length ? 'c-green' : hasConsent > 0 ? 'c-yellow' : 'c-red'}`}>{hasConsent}/{results.length}</div>
              <div className="stat-sub">{legacyUA > 0 ? <span style={{ color: 'var(--orange)' }}>⚠ {legacyUA} legacy UA found</span> : 'No legacy UA tags'}</div>
            </div>
          </div>

          {/* Checklist overview */}
          <div className="two-col" style={{ marginBottom: 20 }}>
            <div className="card">
              <div className="card-header"><h2>🔍 Analytics Checklist</h2></div>
              <div className="card-body">
                <Check ok={hasGA4 > 0} label={`GA4 tag present (${ga4Id || 'G-XXXXXXXXX'})`} />
                <Check ok={hasGTM > 0} label={`Google Tag Manager (${gtmId || 'GTM-XXXXXXX'})`} />
                <Check ok={hasConsent > 0} label="Consent mode signals detected" />
                <Check ok={legacyUA === 0} label="No legacy Universal Analytics (UA) tags" />
                <Check ok={results.every(r => r.hasDataLayer)} label="dataLayer initialised on all pages" />
                <Check ok={missingTracking === 0} label="All checked pages have analytics" />
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h2>ℹ️ Configuration Details</h2></div>
              <div className="card-body">
                <div className="detail-row"><span className="detail-key">GA4 Measurement ID</span><span className="detail-val" style={{ color: ga4Id ? 'var(--cyan)' : 'var(--red)' }}>{ga4Id || 'Not found'}</span></div>
                <div className="detail-row"><span className="detail-key">GTM Container ID</span><span className="detail-val" style={{ color: gtmId ? 'var(--cyan)' : 'var(--dim)' }}>{gtmId || 'Not found'}</span></div>
                <div className="detail-row"><span className="detail-key">Pages checked</span><span className="detail-val" style={{ color: 'var(--text)' }}>{results.length}</span></div>
                <div className="detail-row"><span className="detail-key">Pages with GA4</span><span className="detail-val" style={{ color: hasGA4 === results.length ? 'var(--green)' : 'var(--yellow)' }}>{hasGA4}</span></div>
                <div className="detail-row"><span className="detail-key">Pages with consent</span><span className="detail-val" style={{ color: hasConsent === results.length ? 'var(--green)' : 'var(--yellow)' }}>{hasConsent}</span></div>
                <div className="detail-row"><span className="detail-key">Legacy UA tags</span><span className="detail-val" style={{ color: legacyUA > 0 ? 'var(--orange)' : 'var(--green)' }}>{legacyUA > 0 ? `${legacyUA} found — migrate!` : 'None'}</span></div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="toolbar">
        <div className="filters">
          <button className={`filter-pill ${!fullMode ? 'active' : ''}`} onClick={() => setFullMode(false)}>Key Pages (10)</button>
          <button className={`filter-pill ${fullMode ? 'active' : ''}`} onClick={() => setFullMode(true)}>All Pages</button>
        </div>
        <span className="toolbar-right">{results.length} pages checked</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Analytics Tracking Check</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost btn-sm" onClick={onRun} disabled={loading}>
              {loading ? '⏳' : '▶ Key Pages'}
            </button>
            <button className="btn btn-primary btn-sm" onClick={onRunAll} disabled={loading}>
              {loading ? '⏳ Scanning…' : '▶ All Pages'}
            </button>
          </div>
        </div>
        <div className="table-wrap">
          {loading ? (
            <LoadingState message="Scanning pages for analytics tags…" sub="Checking for GA4, GTM, dataLayer, consent mode…" />
          ) : !results.length ? (
            <EmptyState icon="📊" message="Click Run to check analytics on pages" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>GA4</th>
                  <th>GTM</th>
                  <th>dataLayer</th>
                  <th>Consent</th>
                  <th>Legacy UA</th>
                  <th>Issues</th>
                </tr>
              </thead>
              <tbody>
                {results.map(p => (
                  <tr key={p.route} className="clickable" onClick={() => setSelected(p.route)}>
                    <td><span className="route"><a href={`https://rozper.vercel.app${p.route}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>{p.route}</a></span></td>
                    <td>
                      {p.hasGA4
                        ? <Badge type="ok">✓ {p.ga4Id || 'GA4'}</Badge>
                        : <Badge type="error">✕ None</Badge>}
                    </td>
                    <td>
                      {p.hasGTM
                        ? <Badge type="ok">✓ {p.gtmId || 'GTM'}</Badge>
                        : <Badge type="gray">—</Badge>}
                    </td>
                    <td>
                      {p.hasDataLayer
                        ? <Badge type="ok">✓</Badge>
                        : <Badge type="warn">Missing</Badge>}
                    </td>
                    <td>
                      {p.hasConsentMode
                        ? <Badge type="ok">✓</Badge>
                        : <Badge type="warn">None</Badge>}
                    </td>
                    <td>
                      {p.hasOldUA
                        ? <Badge type="error">⚠ {p.uaId}</Badge>
                        : <Badge type="gray">—</Badge>}
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
      <DetailPanel open={!!selectedPage} onClose={() => setSelected(null)} title={`Analytics — ${selectedPage?.route || ''}`}>
        {selectedPage && (
          <>
            <DetailSection title="Tracking Tags">
              <DetailRow label="GA4 present" value={selectedPage.hasGA4 ? '✓ Yes' : '✕ No'} color={selectedPage.hasGA4 ? 'var(--green)' : 'var(--red)'} />
              <DetailRow label="GA4 ID" value={selectedPage.ga4Id || 'Not found'} color={selectedPage.ga4Id ? 'var(--cyan)' : 'var(--dim)'} />
              <DetailRow label="GTM present" value={selectedPage.hasGTM ? '✓ Yes' : '—'} color={selectedPage.hasGTM ? 'var(--green)' : 'var(--dim)'} />
              <DetailRow label="GTM ID" value={selectedPage.gtmId || 'Not found'} color={selectedPage.gtmId ? 'var(--cyan)' : 'var(--dim)'} />
            </DetailSection>
            <DetailSection title="Data Layer & Consent">
              <DetailRow label="dataLayer" value={selectedPage.hasDataLayer ? '✓ Initialised' : '✕ Not found'} color={selectedPage.hasDataLayer ? 'var(--green)' : 'var(--yellow)'} />
              <DetailRow label="Consent mode" value={selectedPage.hasConsentMode ? '✓ Detected' : '⚠ Not detected'} color={selectedPage.hasConsentMode ? 'var(--green)' : 'var(--yellow)'} />
            </DetailSection>
            <DetailSection title="Legacy Tags">
              <DetailRow label="Universal Analytics (UA)" value={selectedPage.hasOldUA ? `⚠ Found: ${selectedPage.uaId}` : '✓ None'} color={selectedPage.hasOldUA ? 'var(--orange)' : 'var(--green)'} />
            </DetailSection>
            <IssuesList issues={selectedPage.issues} warnings={selectedPage.warnings} />
          </>
        )}
      </DetailPanel>
    </div>
  )
}
