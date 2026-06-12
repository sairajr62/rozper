const TITLES = {
  overview:  'Dashboard',
  pages:     'Pages Audit',
  blogs:     'Blog Posts Audit',
  links:     'Link Checker',
  seo:       'SEO Audit',
  analytics: 'Google Analytics',
}

export default function Topbar({ activeTab, lastRun, onRun, running, onExport }) {
  return (
    <header className="topbar">
      <h1>{TITLES[activeTab] || 'Dashboard'}</h1>
      <div className="actions">
        {lastRun && <span className="last-run">Last run: {lastRun}</span>}
        <button className="btn btn-ghost btn-sm" onClick={onExport}>⬇ Export</button>
        <button className="btn btn-primary btn-sm" onClick={onRun} disabled={running}>
          {running ? '⏳ Running…' : '▶ Run Audit'}
        </button>
      </div>
    </header>
  )
}
