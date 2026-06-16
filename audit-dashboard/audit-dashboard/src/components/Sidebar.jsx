import {
  LayoutDashboard,
  FileText,
  BookOpen,
  SearchCheck,
  BarChart3,
  Link2,
  Target,
  ScanSearch,
  Wifi,
  WifiOff,
  Loader,
} from 'lucide-react'

const ICONS = {
  overview:   <LayoutDashboard size={15} />,
  pages:      <FileText        size={15} />,
  blogs:      <BookOpen        size={15} />,
  seo:        <SearchCheck     size={15} />,
  analytics:  <BarChart3       size={15} />,
  'blog-links': <Link2         size={15} />,
  leads:      <Target          size={15} />,
  links:      <ScanSearch      size={15} />,
}

export default function Sidebar({ activeTab, onTabChange, siteOnline, counts }) {
  const nav = [
    { id: 'overview',    label: 'Dashboard' },
    { id: 'pages',       label: 'Pages',            count: counts.pageIssues,      countType: 'err' },
    { id: 'blogs',       label: 'Blog Posts',       count: counts.blogIssues,      countType: 'warn' },
    { id: 'seo',         label: 'SEO',              count: counts.seoIssues,       countType: 'err' },
    { id: 'analytics',   label: 'Google Analytics', count: counts.analyticsIssues, countType: 'err' },
    { id: 'blog-links',  label: 'Blog Links',       count: counts.blogLinksIssues, countType: 'err' },
    { id: 'leads',       label: 'Leads' },
    { id: 'links',       label: 'Link Checker' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="brand">Rozper Audit</div>
        <div className="sub">// Site Inspector</div>
      </div>

      <div className="site-badge">
        <span className={`site-dot ${siteOnline === true ? 'online' : siteOnline === false ? 'offline' : ''}`} />
        {siteOnline === true  && <Wifi    size={12} style={{ color: 'var(--green)' }} />}
        {siteOnline === false && <WifiOff size={12} style={{ color: 'var(--red)' }} />}
        {siteOnline === null  && <Loader  size={12} style={{ color: 'var(--dim)' }} />}
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
      <span className="nav-icon" style={{ display: 'flex', alignItems: 'center' }}>
        {ICONS[item.id]}
      </span>
      {item.label}
      {item.count > 0 && <span className={`nav-count ${item.countType}`}>{item.count}</span>}
    </button>
  )
}
