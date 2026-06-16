import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './tabs/Overview'
import PagesAudit from './tabs/PagesAudit'
import BlogAudit from './tabs/BlogAudit'
import LinkChecker from './tabs/LinkChecker'
import SEOAudit from './tabs/SEOAudit'
import AnalyticsAudit from './tabs/AnalyticsAudit'
import { checkHealth, fetchSummary, auditPages, auditBlogs, checkLinks, auditSEO, auditAnalytics, auditAnalyticsAll } from './api'

export default function App() {
  const [tab, setTab] = useState('overview')
  const [siteOnline, setSiteOnline] = useState(null)
  const [summary, setSummary] = useState(null)

  const [pageResults, setPageResults] = useState([])
  const [blogResults, setBlogResults] = useState([])
  const [seoResults, setSeoResults] = useState([])
  const [analyticsResults, setAnalyticsResults] = useState([])

  const [pagesLoading, setPagesLoading] = useState(false)
  const [blogsLoading, setBlogsLoading] = useState(false)
  const [seoLoading, setSeoLoading] = useState(false)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [running, setRunning] = useState(false)
  const [lastRun, setLastRun] = useState(null)

  useEffect(() => {
    checkHealth().then(r => setSiteOnline(r.online)).catch(() => setSiteOnline(false))
    fetchSummary().then(setSummary).catch(() => {})
  }, [])

  async function runPageAudit() {
    setPagesLoading(true)
    try { setPageResults(await auditPages()) } finally { setPagesLoading(false) }
  }

  async function runBlogAudit() {
    setBlogsLoading(true)
    try { setBlogResults(await auditBlogs()) } finally { setBlogsLoading(false) }
  }

  async function runSEOAudit() {
    setSeoLoading(true)
    try { setSeoResults(await auditSEO()) } finally { setSeoLoading(false) }
  }

  async function runAnalyticsAudit() {
    setAnalyticsLoading(true)
    try { setAnalyticsResults(await auditAnalytics()) } finally { setAnalyticsLoading(false) }
  }

  async function runAnalyticsAll() {
    setAnalyticsLoading(true)
    try { setAnalyticsResults(await auditAnalyticsAll()) } finally { setAnalyticsLoading(false) }
  }

  async function runAll() {
    setRunning(true)
    await Promise.all([runPageAudit(), runBlogAudit(), runSEOAudit(), runAnalyticsAudit()])
    setLastRun(new Date().toLocaleTimeString())
    setRunning(false)
  }

  function runCurrent() {
    if (tab === 'overview') runAll()
    else if (tab === 'pages') runPageAudit()
    else if (tab === 'blogs') runBlogAudit()
    else if (tab === 'seo') runSEOAudit()
    else if (tab === 'analytics') runAnalyticsAudit()
  }

  function exportReport() {
    const report = {
      generated: new Date().toISOString(),
      pages: pageResults,
      blogs: blogResults,
      seo: seoResults,
      analytics: analyticsResults,
    }
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `rozper-audit-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
  }

  const counts = {
    pageIssues: pageResults.filter(p => p.issues.length > 0).length,
    blogIssues: blogResults.filter(b => b.issues.length > 0).length,
    seoIssues: seoResults.filter(p => p.issues.length > 0).length,
    analyticsIssues: analyticsResults.filter(p => p.issues.length > 0).length,
  }

  const isLoading = running || pagesLoading || blogsLoading || seoLoading || analyticsLoading

  return (
    <div className="layout">
      <Sidebar activeTab={tab} onTabChange={setTab} siteOnline={siteOnline} counts={counts} />

      <div className="main">
        <Topbar
          activeTab={tab}
          lastRun={lastRun}
          onRun={runCurrent}
          running={isLoading}
          onExport={exportReport}
        />

        <div className="content">
          {tab === 'overview' && (
            <Overview
              summary={summary}
              pageResults={pageResults}
              blogResults={blogResults}
              onGoToPages={() => setTab('pages')}
              onGoToBlogs={() => setTab('blogs')}
            />
          )}
          {tab === 'pages' && (
            <PagesAudit results={pageResults} loading={pagesLoading} onRun={runPageAudit} />
          )}
          {tab === 'blogs' && (
            <BlogAudit results={blogResults} loading={blogsLoading} onRun={runBlogAudit} />
          )}
          {tab === 'links' && (
            <LinkChecker onCheck={checkLinks} />
          )}
          {tab === 'seo' && (
            <SEOAudit results={seoResults} loading={seoLoading} onRun={runSEOAudit} />
          )}
          {tab === 'analytics' && (
            <AnalyticsAudit
              results={analyticsResults}
              loading={analyticsLoading}
              onRun={runAnalyticsAudit}
              onRunAll={runAnalyticsAll}
            />
          )}
        </div>
      </div>
    </div>
  )
}
