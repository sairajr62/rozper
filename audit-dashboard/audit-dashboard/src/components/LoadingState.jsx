export default function LoadingState({ message = 'Loading…', sub, progress }) {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>{message}</p>
      {progress != null && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
      {sub && <span className="loading-sub">{sub}</span>}
    </div>
  )
}

export function EmptyState({ icon = '📭', message = 'No results' }) {
  return (
    <div className="empty">
      <div className="icon">{icon}</div>
      <p>{message}</p>
    </div>
  )
}
