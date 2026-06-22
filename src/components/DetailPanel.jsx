export default function DetailPanel({ open, onClose, title, children }) {
  return (
    <div className={`overlay ${open ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="drawer">
        <div className="drawer-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">{children}</div>
      </div>
    </div>
  )
}

export function DetailSection({ title, children }) {
  return (
    <div className="detail-section">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export function DetailRow({ label, value, color }) {
  return (
    <div className="detail-row">
      <span className="detail-key">{label}</span>
      <span className="detail-val" style={color ? { color } : undefined}>{value}</span>
    </div>
  )
}

export function IssuesList({ issues = [], warnings = [] }) {
  if (!issues.length && !warnings.length) return null
  return (
    <>
      {issues.length > 0 && (
        <div className="detail-section">
          <h3>Issues ({issues.length})</h3>
          {issues.map((i, idx) => (
            <div key={idx} className="detail-row">
              <span className="issue-row err">{i}</span>
            </div>
          ))}
        </div>
      )}
      {warnings.length > 0 && (
        <div className="detail-section">
          <h3>Warnings ({warnings.length})</h3>
          {warnings.map((w, idx) => (
            <div key={idx} className="detail-row">
              <span className="issue-row warn">{w}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
