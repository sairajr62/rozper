import { useState, useEffect, useRef } from 'react'
import * as XLSX from 'xlsx'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './tabs/Overview'
import PagesAudit from './tabs/PagesAudit'
import BlogAudit from './tabs/BlogAudit'
import LinkChecker from './tabs/LinkChecker'
import SEOAudit from './tabs/SEOAudit'
import AnalyticsAudit from './tabs/AnalyticsAudit'
import LeadsAudit from './tabs/LeadsAudit'
import BlogLinksAudit from './tabs/BlogLinksAudit'
import GA4Live from './tabs/GA4Live'
import PageSpeedTab from './tabs/PageSpeedTab'
import { checkHealth, fetchSummary, auditPages, auditBlogs, checkLinks, auditSEO, auditAnalytics, auditAnalyticsAll, auditBlogLinks } from './api'

export default function App({ onLogout }) {
  const [tab, setTab] = useState('overview')
  const [siteOnline, setSiteOnline] = useState(null)
  const [summary, setSummary] = useState(null)

  const [pageResults, setPageResults] = useState([])
  const [blogResults, setBlogResults] = useState([])
  const [seoResults, setSeoResults] = useState([])
  const [analyticsResults, setAnalyticsResults] = useState([])
  const [blogLinksResults, setBlogLinksResults] = useState([])

  const [pagesLoading, setPagesLoading] = useState(false)
  const [blogsLoading, setBlogsLoading] = useState(false)
  const [seoLoading, setSeoLoading] = useState(false)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [blogLinksLoading, setBlogLinksLoading] = useState(false)
  const [running, setRunning] = useState(false)
  const [lastRun, setLastRun] = useState(null)
  const autoRanRef = useRef(false)

  useEffect(() => {
    checkHealth().then(r => setSiteOnline(r.online)).catch(() => setSiteOnline(false))
    fetchSummary().then(setSummary).catch(() => {})

    // Auto-run the Overview audits on first load so it's populated without clicking Run Audit
    if (!autoRanRef.current) {
      autoRanRef.current = true
      runAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  async function runBlogLinksAudit() {
    setBlogLinksLoading(true)
    try { setBlogLinksResults(await auditBlogLinks()) } finally { setBlogLinksLoading(false) }
  }

  async function runAll() {
    setRunning(true)
    try {
      await Promise.allSettled([runPageAudit(), runBlogAudit(), runSEOAudit(), runAnalyticsAudit(), runBlogLinksAudit()])
      setLastRun(new Date().toLocaleTimeString())
    } finally {
      setRunning(false)
    }
  }

  function runCurrent() {
    if (tab === 'overview') runAll()
    else if (tab === 'pages') runPageAudit()
    else if (tab === 'blogs') runBlogAudit()
    else if (tab === 'seo') runSEOAudit()
    else if (tab === 'analytics') runAnalyticsAudit()
    else if (tab === 'blog-links') runBlogLinksAudit()
  }

  function exportReport() {
    const wb = XLSX.utils.book_new()
    const date = new Date().toISOString().slice(0, 10)

    // ── Pages sheet ──────────────────────────────────────────────────────────
    if (pageResults.length) {
      const rows = pageResults.map(p => ({
        Route: p.route,
        Status: p.status,
        'Response (ms)': p.responseMs,
        Title: p.title || '',
        'Title Length': p.titleLen ?? '',
        'Meta Description': p.metaDesc || '',
        'Meta Desc Length': p.metaDescLen ?? '',
        H1: p.h1 || '',
        'H1 Count': p.h1Count ?? '',
        'Word Count': p.wordCount ?? '',
        'OG Title': p.ogTitle || '',
        'OG Description': p.ogDesc || '',
        'OG Image': p.ogImage || '',
        Canonical: p.canonical || '',
        Issues: (p.issues || []).join(' | '),
        Warnings: (p.warnings || []).join(' | '),
      }))
      const ws = XLSX.utils.json_to_sheet(rows)
      applyColumnWidths(ws, rows)
      XLSX.utils.book_append_sheet(wb, ws, 'Pages')
    }

    // ── Blogs sheet ──────────────────────────────────────────────────────────
    if (blogResults.length) {
      const rows = blogResults.map(b => ({
        File: b.file || '',
        Title: b.title || '',
        Slug: b.slug || '',
        Author: b.author || '',
        'Publish Date': b.publishDate || '',
        Category: b.category || '',
        'SEO Title': b.seoTitle || '',
        'SEO Description': b.seoDescription || '',
        'Word Count': b.wordCount ?? '',
        'Featured Image': b.featuredImage || '',
        'Image Exists': b.imageExists ?? '',
        Issues: (b.issues || []).join(' | '),
        Warnings: (b.warnings || []).join(' | '),
      }))
      const ws = XLSX.utils.json_to_sheet(rows)
      applyColumnWidths(ws, rows)
      XLSX.utils.book_append_sheet(wb, ws, 'Blog Posts')
    }

    // ── SEO sheet ────────────────────────────────────────────────────────────
    if (seoResults.length) {
      const rows = seoResults.map(p => ({
        Route: p.route,
        Status: p.status,
        'H1 Count': p.h1Count ?? '',
        'H2 Count': p.h2Count ?? '',
        'H3 Count': p.h3Count ?? '',
        Canonical: p.canonical || '',
        'Robots Meta': p.robotsMeta || '',
        'OG Score': p.ogScore ?? '',
        'Has JSON-LD': p.hasJsonLd ? 'Yes' : 'No',
        'Has Twitter Card': p.hasTwitterCard ? 'Yes' : 'No',
        'Images Missing Alt': p.imagesMissingAlt ?? '',
        'Internal Links': p.internalLinks ?? '',
        'External Links': p.externalLinks ?? '',
        'Word Count': p.wordCount ?? '',
        Issues: (p.issues || []).join(' | '),
        Warnings: (p.warnings || []).join(' | '),
      }))
      const ws = XLSX.utils.json_to_sheet(rows)
      applyColumnWidths(ws, rows)
      XLSX.utils.book_append_sheet(wb, ws, 'SEO')
    }

    // ── Analytics sheet ──────────────────────────────────────────────────────
    if (analyticsResults.length) {
      const rows = analyticsResults.map(p => ({
        Route: p.route,
        'Has GA4': p.hasGA4 ? 'Yes' : 'No',
        'GA4 ID': p.ga4Id || '',
        'Has GTM': p.hasGTM ? 'Yes' : 'No',
        'GTM ID': p.gtmId || '',
        'Has dataLayer': p.hasDataLayer ? 'Yes' : 'No',
        'Has Consent Mode': p.hasConsentMode ? 'Yes' : 'No',
        'Legacy UA': p.hasOldUA ? (p.uaId || 'Yes') : 'No',
        Issues: (p.issues || []).join(' | '),
        Warnings: (p.warnings || []).join(' | '),
      }))
      const ws = XLSX.utils.json_to_sheet(rows)
      applyColumnWidths(ws, rows)
      XLSX.utils.book_append_sheet(wb, ws, 'Analytics')
    }

    // ── Summary sheet (always included) ─────────────────────────────────────
    const summaryRows = [
      { Metric: 'Report Generated', Value: new Date().toLocaleString() },
      { Metric: 'Pages Audited', Value: pageResults.length },
      { Metric: 'Page Issues', Value: pageResults.filter(p => p.issues?.length).length },
      { Metric: 'Blog Posts Audited', Value: blogResults.length },
      { Metric: 'Blog Issues', Value: blogResults.filter(b => b.issues?.length).length },
      { Metric: 'SEO Pages Audited', Value: seoResults.length },
      { Metric: 'SEO Issues', Value: seoResults.filter(p => p.issues?.length).length },
      { Metric: 'Analytics Pages Audited', Value: analyticsResults.length },
      { Metric: 'Analytics Issues', Value: analyticsResults.filter(p => p.issues?.length).length },
    ]
    const wsSummary = XLSX.utils.json_to_sheet(summaryRows)
    wsSummary['!cols'] = [{ wch: 28 }, { wch: 30 }]
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary')

    XLSX.writeFile(wb, `rozper-audit-${date}.xlsx`)
  }

  function applyColumnWidths(ws, rows) {
    if (!rows.length) return
    const keys = Object.keys(rows[0])
    ws['!cols'] = keys.map(k => ({
      wch: Math.min(60, Math.max(k.length + 2, ...rows.map(r => String(r[k] ?? '').length)))
    }))
  }

  const counts = {
    pageIssues: pageResults.filter(p => p.issues.length > 0).length,
    blogIssues: blogResults.filter(b => b.issues.length > 0).length,
    seoIssues: seoResults.filter(p => p.issues.length > 0).length,
    analyticsIssues: analyticsResults.filter(p => p.issues.length > 0).length,
    blogLinksIssues: blogLinksResults.filter(p => p.issues.length > 0).length,
  }

  const isLoading = running || pagesLoading || blogsLoading || seoLoading || analyticsLoading || blogLinksLoading

  return (
    <div className="layout">
      <Sidebar activeTab={tab} onTabChange={setTab} siteOnline={siteOnline} counts={counts} onLogout={onLogout} />

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
          {tab === 'blog-links' && (
            <BlogLinksAudit results={blogLinksResults} loading={blogLinksLoading} onRun={runBlogLinksAudit} />
          )}
          {tab === 'ga4' && (
            <GA4Live />
          )}
          {tab === 'leads' && (
            <LeadsAudit />
          )}
          {tab === 'pagespeed' && (
            <PageSpeedTab />
          )}
        </div>
      </div>
    </div>
  )
}
