import { useState } from 'react'
import Badge from '../components/Badge'
import LoadingState, { EmptyState } from '../components/LoadingState'

export default function LinkChecker({ onCheck }) {
  const [route, setRoute] = useState('/')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [checked, setChecked] = useState(false)

  async function run() {
    setLoading(true)
    setChecked(false)
    const data = await onCheck(route)
    setResults(data)
    setLoading(false)
    setChecked(true)
  }

  const filtered = filter === 'broken' ? results.filter(l => l.broken) : results
  const brokenCount = results.filter(l => l.broken).length

  return (
    <div>
      <div className="toolbar">
        <input
          className="search"
          style={{ width: 260 }}
          placeholder="Enter route e.g. /area-codes"
          value={route}
          onChange={e => setRoute(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && run()}
        />
        <button className="btn btn-primary btn-sm" onClick={run} disabled={loading}>
          {loading ? '⏳ Checking…' : '▶ Check Links'}
        </button>
        {checked && (
          <div className="filters">
            <button className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All ({results.length})</button>
            <button className={`filter-pill ${filter === 'broken' ? 'active' : ''}`} onClick={() => setFilter('broken')}>
              Broken ({brokenCount})
            </button>
          </div>
        )}
        {checked && (
          <span className="toolbar-right">
            {brokenCount > 0
              ? <span style={{ color: 'var(--red)' }}>{brokenCount} broken</span>
              : <span style={{ color: 'var(--green)' }}>All links OK</span>}
          </span>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Links on <span style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)' }}>{route}</span></h2>
          {checked && <span style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'var(--mono)' }}>{results.length} links found</span>}
        </div>
        <div className="table-wrap">
          {loading ? (
            <LoadingState message={`Checking links on ${route}…`} sub="Testing each internal link for 404s" />
          ) : !checked ? (
            <EmptyState icon="🔗" message="Enter a route and click Check Links" />
          ) : !filtered.length ? (
            <EmptyState icon="✓" message={filter === 'broken' ? 'No broken links found!' : 'No links found on this page'} />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Status</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={i}>
                    <td>
                      <span className="route">
                        <a href={`http://localhost:3000${l.href}`} target="_blank" rel="noreferrer">{l.href}</a>
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: l.broken ? 'var(--red)' : 'var(--green)' }}>
                        {l.status || 'ERR'}
                      </span>
                    </td>
                    <td>
                      {l.broken
                        ? <Badge type="error">✕ Broken</Badge>
                        : <Badge type="ok">✓ OK</Badge>}
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
