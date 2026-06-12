export default function Sidebar({ activeTab, onTabChange, siteOnline, counts }) {
  const nav = [
    { id: 'overview', icon: '🏠', label: 'Dashboard' },
    { id: 'pages',    icon: '📄', label: 'Pages',            count: counts.pageIssues,      countType: 'err' },
    { id: 'blogs',    icon: '📝', label: 'Blog Posts',       count: counts.blogIssues,      countType: 'warn' },
    { id: 'seo',      icon: '🔍', label: 'SEO',              count: counts.seoIssues,       countType: 'err' },
    { id: 'analytics',icon: '📊', label: 'Google Analytics', count: counts.analyticsIssues, countType: 'err' },
    { id: 'links',    icon: '🔗', label: 'Link Checker' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="brand">Rozper Audit</div>
        <div className="sub">// Site Inspector</div>
      </div>

      <div className="site-badge">
        <span className={`site-dot ${siteOnline === true ? 'online' : siteOnline === false ? 'offline' : ''}`} />
        <span style={{ color: siteOnline === true ? 'var(--green)' : siteOnline === false ? 'var(--red)' : 'var(--dim)' }}>
          {siteOnline === true ? 'localhost:3000 online' : siteOnline === false ? 'Site offline' : 'Checking…'}
        </span>
      </div>

      <nav className="nav">
        <div className="nav-section">
          <div className="nav-label">Overview</div>
          <NavItem item={nav[0]} active={activeTab === nav[0].id} onClick={() => onTabChange(nav[0].id)} />
        </div>
        <div className="nav-section">
          <div className="nav-label">Audits</div>
          {nav.slice(1).map(item => (
            <NavItem key={item.id} item={item} active={activeTab === item.id} onClick={() => onTabChange(item.id)} />
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">localhost:5173 · API :3001</div>
    </aside>
  )
}

function NavItem({ item, active, onClick }) {
  return (
    <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="nav-icon">{item.icon}</span>
      {item.label}
      {item.count > 0 && <span className={`nav-count ${item.countType}`}>{item.count}</span>}
    </button>
  )
}
