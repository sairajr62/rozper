import {
  LayoutDashboard,
  FileText,
  BookOpen,
  SearchCheck,
  BarChart3,
  TrendingUp,
  Link2,
  Target,
  ScanSearch,
  Gauge,
  Wifi,
  WifiOff,
  Loader,
} from 'lucide-react'

const ICONS = {
  overview:     <LayoutDashboard size={15} />,
  pages:        <FileText        size={15} />,
  blogs:        <BookOpen        size={15} />,
  seo:          <SearchCheck     size={15} />,
  analytics:    <BarChart3       size={15} />,
  ga4:          <TrendingUp      size={15} />,
  'blog-links': <Link2           size={15} />,
  leads:        <Target          size={15} />,
  links:        <ScanSearch      size={15} />,
  pagespeed:    <Gauge           size={15} />,
}

export default function Sidebar({ activeTab, onTabChange, siteOnline, counts, onLogout }) {
  const nav = [
    { id: 'overview',    label: 'Dashboard' },
    { id: 'pages',       label: 'Pages',            count: counts.pageIssues,      countType: 'err' },
    { id: 'blogs',       label: 'Blog Posts',       count: counts.blogIssues,      countType: 'warn' },
    { id: 'seo',         label: 'SEO',              count: counts.seoIssues,       countType: 'err' },
    { id: 'analytics',   label: 'GA4 Tag Audit',    count: counts.analyticsIssues, countType: 'err' },
    { id: 'ga4',         label: 'GA4 Live Data' },
    { id: 'blog-links',  label: 'Blog Links',       count: counts.blogLinksIssues, countType: 'err' },
    { id: 'leads',       label: 'Leads' },
    { id: 'links',       label: 'Link Checker' },
    { id: 'pagespeed',   label: 'Page Speed' },
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
          {siteOnline === true ? 'rozper.vercel.app online' : siteOnline === false ? 'Site offline' : 'Checking…'}
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

      <div className="sidebar-footer" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Profile avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #0d9aaa 0%, #0f766e 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(13,154,170,0.35)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>

        {/* Label */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Admin</div>
          <div style={{ fontSize: 10, color: 'var(--dim)', lineHeight: 1.3 }}>rozper.vercel.app</div>
        </div>

        {/* Logout button */}
        {onLogout && (
          <button
            onClick={onLogout}
            title="Sign out"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--dim)', padding: 4, borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.15s, background 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.background = 'none' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        )}
      </div>
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
