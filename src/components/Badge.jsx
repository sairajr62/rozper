export default function Badge({ type = 'gray', children }) {
  return <span className={`badge badge-${type}`}>{children}</span>
}

export function HealthBadge({ issues = 0, warnings = 0 }) {
  if (issues > 0) return <Badge type="error">✕ {issues} issue{issues > 1 ? 's' : ''}</Badge>
  if (warnings > 0) return <Badge type="warn">⚠ {warnings} warn{warnings > 1 ? 's' : ''}</Badge>
  return <Badge type="ok">✓ Clean</Badge>
}

export function StatusCode({ code }) {
  const cls = code === 200 ? 's200' : code === 404 ? 's404' : code >= 500 ? 's500' : 's0'
  return <span className={cls}>{code || '—'}</span>
}
