const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { BetaAnalyticsDataClient } = require('@google-analytics/data')

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || '373031310'
const GA4_CREDS_PATH = path.join(__dirname, 'ga4-credentials.json')
let ga4Client = null
try {
  let creds
  if (fs.existsSync(GA4_CREDS_PATH)) {
    creds = JSON.parse(fs.readFileSync(GA4_CREDS_PATH, 'utf8'))
  } else if (process.env.GA4_CREDENTIALS_JSON) {
    creds = JSON.parse(process.env.GA4_CREDENTIALS_JSON)
  }
  if (creds) ga4Client = new BetaAnalyticsDataClient({ credentials: creds })
  else console.warn('GA4 credentials not found — live data endpoints disabled')
} catch (e) {
  console.warn('GA4 credentials error:', e.message)
}

const app = express()
const PORT = process.env.PORT || 3001
const SITE = process.env.AUDIT_TARGET_SITE || 'http://localhost:3000'

// Serve built React app in production
const DIST = path.join(__dirname, 'dist')
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST))
}
const PROJECT = path.join(__dirname, '..', '..')
const BLOG_DIR = path.join(PROJECT, 'content', 'blog')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// ─── All static routes to audit ───────────────────────────────────────────────
const STATIC_PAGES = [
  '/',
  '/about',
  '/area-codes',
  '/blog',
  '/compare',
  '/contact',
  '/country-code',
  '/docs',
  '/docs/api',
  '/features/ai-agent-assist',
  '/features/ai-receptionist',
  '/features/ai-sentiment',
  '/features/auto-attendant',
  '/features/call-recording',
  '/features/conversation-intelligence',
  '/features/supervisor-tools',
  '/features/toll-free-numbers',
  '/integrations/hubspot',
  '/integrations/zoho',
  '/legal/privacy',
  '/legal/terms',
  '/pricing',
  '/products/ai',
  '/products/ai/assistant',
  '/products/ai/conversation',
  '/products/ai/receptionist',
  '/products/contact-center',
  '/products/contact-center/agent-assist',
  '/products/contact-center/analytics',
  '/products/contact-center/enterprise',
  '/products/contact-center/omnichannel',
  '/products/contact-center/outbound-dialer',
  '/products/contact-center/supervisor-tools',
  '/products/ucaas',
  '/products/ucaas/ai-assistant',
  '/products/ucaas/business-phone',
  '/products/ucaas/customer-engagement',
  '/products/ucaas/online-fax',
  '/products/ucaas/phone-system',
  '/products/ucaas/sms-mms',
  '/products/ucaas/team-chat',
  '/products/ucaas/video-meetings',
  '/products/ucaas/website-chatbot',
  '/security',
  '/solutions/enterprise-it',
  '/solutions/finance',
  '/solutions/healthcare',
  '/solutions/logistics',
  '/solutions/remote-teams',
  '/solutions/retail',
  '/solutions/saas',
  '/solutions/sales-teams',
  '/solutions/smb',
  '/solutions/support-teams',
  '/status',
  '/wholesale-voice',
  '/wholesale-voip',
]

// ─── Fetch + audit a single page ──────────────────────────────────────────────
async function auditPage(route) {
  const url = SITE + route
  const start = Date.now()
  const result = {
    route,
    url,
    status: null,
    responseMs: null,
    issues: [],
    warnings: [],
    title: null,
    description: null,
    h1Count: 0,
    hasOgTitle: false,
    hasOgDesc: false,
    hasOgImage: false,
    hasCanonical: false,
    imagesWithoutAlt: 0,
    wordCount: 0,
  }

  try {
    const res = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
      headers: { 'User-Agent': 'RozperAuditBot/1.0' },
    })
    result.status = res.status
    result.responseMs = Date.now() - start

    if (res.status === 404) {
      result.issues.push('Page returns 404')
      return result
    }
    if (res.status >= 500) {
      result.issues.push(`Server error: ${res.status}`)
      return result
    }
    if (res.status >= 300 && res.status < 400) {
      result.warnings.push(`Redirect: ${res.status}`)
    }

    const $ = cheerio.load(res.data)

    // Title
    result.title = $('title').text().trim()
    if (!result.title) result.issues.push('Missing <title> tag')
    else if (result.title.length < 30) result.warnings.push(`Title too short (${result.title.length} chars)`)
    else if (result.title.length > 65) result.warnings.push(`Title too long (${result.title.length} chars)`)

    // Meta description
    result.description = $('meta[name="description"]').attr('content') || ''
    if (!result.description) result.issues.push('Missing meta description')
    else if (result.description.length < 50) result.warnings.push(`Meta description too short (${result.description.length} chars)`)
    else if (result.description.length > 160) result.warnings.push(`Meta description too long (${result.description.length} chars)`)

    // H1
    result.h1Count = $('h1').length
    if (result.h1Count === 0) result.issues.push('Missing H1 tag')
    else if (result.h1Count > 1) result.warnings.push(`Multiple H1 tags (${result.h1Count})`)

    // OG tags
    result.hasOgTitle = !!$('meta[property="og:title"]').attr('content')
    result.hasOgDesc = !!$('meta[property="og:description"]').attr('content')
    result.hasOgImage = !!$('meta[property="og:image"]').attr('content')
    if (!result.hasOgTitle) result.warnings.push('Missing og:title')
    if (!result.hasOgDesc) result.warnings.push('Missing og:description')
    if (!result.hasOgImage) result.warnings.push('Missing og:image')

    // Canonical
    result.hasCanonical = !!$('link[rel="canonical"]').attr('href')
    if (!result.hasCanonical) result.warnings.push('Missing canonical URL')

    // Images without alt
    result.imagesWithoutAlt = $('img:not([alt])').length + $('img[alt=""]').length
    if (result.imagesWithoutAlt > 0) result.warnings.push(`${result.imagesWithoutAlt} image(s) missing alt text`)

    // Word count (body text)
    const bodyText = $('main, article, body').text().replace(/\s+/g, ' ').trim()
    result.wordCount = bodyText.split(' ').filter(Boolean).length
    if (result.wordCount < 100) result.warnings.push(`Thin content (${result.wordCount} words)`)

    // Response time
    if (result.responseMs > 3000) result.warnings.push(`Slow response: ${result.responseMs}ms`)

  } catch (err) {
    result.status = 0
    result.responseMs = Date.now() - start
    result.issues.push(`Fetch error: ${err.message}`)
  }

  return result
}

// ─── Audit blog markdown files ─────────────────────────────────────────────────
function auditBlogs() {
  const results = []
  if (!fs.existsSync(BLOG_DIR)) return results

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)

    const issues = []
    const warnings = []

    // Required fields
    if (!data.title) issues.push('Missing title')
    if (!data.slug) warnings.push('Missing slug (will use filename)')
    if (!data.excerpt) warnings.push('Missing excerpt/description')
    if (!data.seoTitle) warnings.push('Missing seoTitle')
    if (!data.seoDescription) warnings.push('Missing seoDescription')
    else if (data.seoDescription.length > 160) warnings.push(`seoDescription too long (${data.seoDescription.length} chars)`)
    else if (data.seoDescription.length < 50) warnings.push(`seoDescription too short (${data.seoDescription.length} chars)`)
    if (!data.featuredImage) issues.push('Missing featuredImage')
    else {
      // Check if the image file actually exists
      const imgPath = path.join(PROJECT, 'public', data.featuredImage)
      if (!fs.existsSync(imgPath)) issues.push(`Featured image not found: ${data.featuredImage}`)
    }
    if (!data.category) warnings.push('Missing category')
    if (!data.author) warnings.push('Missing author')
    if (!data.publishDate) warnings.push('Missing publishDate')

    // Tags
    if (!data.tags || !data.tags.length) warnings.push('No tags')

    // Title length
    if (data.seoTitle && data.seoTitle.length > 65) warnings.push(`seoTitle too long (${data.seoTitle.length} chars)`)
    if (data.seoTitle && data.seoTitle.length < 30) warnings.push(`seoTitle too short (${data.seoTitle.length} chars)`)

    // Word count
    const wordCount = content.replace(/[#*_>\-\[\]]/g, ' ').split(/\s+/).filter(Boolean).length
    if (wordCount < 300) issues.push(`Thin content: only ${wordCount} words`)
    else if (wordCount < 600) warnings.push(`Short content: ${wordCount} words`)

    results.push({
      file,
      slug: data.slug || file.replace('.md', ''),
      title: data.title || file,
      category: data.category || null,
      featuredImage: data.featuredImage || null,
      wordCount,
      issues,
      warnings,
      publishDate: data.publishDate || null,
      author: data.author || null,
    })
  }

  return results.sort((a, b) => b.issues.length - a.issues.length)
}

// ─── Check links within a page ────────────────────────────────────────────────
async function checkLinks(route) {
  const url = SITE + route
  const links = []

  try {
    const res = await axios.get(url, { timeout: 10000, headers: { 'User-Agent': 'RozperAuditBot/1.0' } })
    const $ = cheerio.load(res.data)

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      if (href.startsWith('http') && !href.includes('localhost')) return // skip external for now
      links.push(href.startsWith('/') ? href : '/' + href)
    })
  } catch {}

  // Deduplicate
  const unique = [...new Set(links)]
  const results = []

  for (const link of unique.slice(0, 30)) { // limit per page
    try {
      const r = await axios.get(SITE + link, {
        timeout: 8000,
        validateStatus: () => true,
        headers: { 'User-Agent': 'RozperAuditBot/1.0' },
      })
      results.push({ href: link, status: r.status, broken: r.status === 404 || r.status >= 500 })
    } catch {
      results.push({ href: link, status: 0, broken: true })
    }
  }

  return results
}

// ─── API Routes ───────────────────────────────────────────────────────────────

// Quick site health check
app.get('/api/health', async (req, res) => {
  try {
    const r = await axios.get(SITE, { timeout: 5000, validateStatus: () => true })
    res.json({ online: r.status < 500, status: r.status, site: SITE })
  } catch {
    res.json({ online: false, status: 0, site: SITE })
  }
})

// Audit all static pages
app.get('/api/pages', async (req, res) => {
  const results = []
  for (const route of STATIC_PAGES) {
    const result = await auditPage(route)
    results.push(result)
  }
  res.json(results)
})

// Audit a single page
app.get('/api/page', async (req, res) => {
  const { route } = req.query
  if (!route) return res.status(400).json({ error: 'route required' })
  const result = await auditPage(route)
  res.json(result)
})

// Audit all blog posts
app.get('/api/blogs', (req, res) => {
  const results = auditBlogs()
  res.json(results)
})

// Check links on a page
app.get('/api/links', async (req, res) => {
  const { route = '/' } = req.query
  const results = await checkLinks(route)
  res.json(results)
})

// Summary stats
app.get('/api/summary', async (req, res) => {
  const [pageResults, blogResults] = await Promise.all([
    Promise.resolve(STATIC_PAGES.slice(0, 5).map(r => ({ route: r, issues: [], warnings: [] }))), // lightweight
    Promise.resolve(auditBlogs()),
  ])

  const totalBlogIssues = blogResults.reduce((s, b) => s + b.issues.length, 0)
  const totalBlogWarnings = blogResults.reduce((s, b) => s + b.warnings.length, 0)

  res.json({
    pages: { total: STATIC_PAGES.length },
    blogs: {
      total: blogResults.length,
      withIssues: blogResults.filter(b => b.issues.length > 0).length,
      withWarnings: blogResults.filter(b => b.warnings.length > 0).length,
      totalIssues: totalBlogIssues,
      totalWarnings: totalBlogWarnings,
      missingImages: blogResults.filter(b => b.issues.some(i => i.includes('image'))).length,
      thinContent: blogResults.filter(b => b.issues.some(i => i.includes('Thin'))).length,
    },
  })
})

// ─── SEO Deep Audit ───────────────────────────────────────────────────────────
async function seoAuditPage(route) {
  const url = SITE + route
  const start = Date.now()
  const result = {
    route, url,
    status: null, responseMs: null,
    title: null, titleLen: 0,
    description: null, descLen: 0,
    h1: [], h2: [], h3: [],
    canonical: null, robotsMeta: null,
    hasJsonLd: false, jsonLdTypes: [],
    ogScore: 0, twitterCard: false,
    imagesTotal: 0, imagesWithAlt: 0,
    internalLinks: 0, externalLinks: 0,
    wordCount: 0, issues: [], warnings: [],
  }
  try {
    const res = await axios.get(url, { timeout: 10000, validateStatus: () => true, headers: { 'User-Agent': 'RozperSEOBot/1.0' } })
    result.status = res.status
    result.responseMs = Date.now() - start
    if (res.status !== 200) { result.issues.push(`Status ${res.status}`); return result }

    const $ = cheerio.load(res.data)

    // Title
    result.title = $('title').text().trim()
    result.titleLen = result.title.length
    if (!result.title) result.issues.push('Missing <title>')
    else if (result.titleLen < 30) result.warnings.push(`Title too short (${result.titleLen} chars, min 30)`)
    else if (result.titleLen > 65) result.warnings.push(`Title too long (${result.titleLen} chars, max 65)`)

    // Description
    result.description = $('meta[name="description"]').attr('content') || ''
    result.descLen = result.description.length
    if (!result.description) result.issues.push('Missing meta description')
    else if (result.descLen < 50) result.warnings.push(`Description too short (${result.descLen} chars, min 50)`)
    else if (result.descLen > 160) result.warnings.push(`Description too long (${result.descLen} chars, max 160)`)

    // Headings
    $('h1').each((_, el) => result.h1.push($(el).text().trim().slice(0, 80)))
    $('h2').each((_, el) => result.h2.push($(el).text().trim().slice(0, 80)))
    $('h3').each((_, el) => result.h3.push($(el).text().trim().slice(0, 60)))
    if (result.h1.length === 0) result.issues.push('No H1 tag')
    else if (result.h1.length > 1) result.warnings.push(`Multiple H1 tags (${result.h1.length})`)
    if (result.h2.length === 0) result.warnings.push('No H2 tags — add subheadings')

    // Canonical
    result.canonical = $('link[rel="canonical"]').attr('href') || null
    if (!result.canonical) result.warnings.push('No canonical URL')

    // Robots meta
    result.robotsMeta = $('meta[name="robots"]').attr('content') || null
    if (result.robotsMeta && result.robotsMeta.includes('noindex')) result.issues.push('Page is noindex!')

    // JSON-LD
    $('script[type="application/ld+json"]').each((_, el) => {
      result.hasJsonLd = true
      try {
        const parsed = JSON.parse($(el).html())
        const type = parsed['@type'] || parsed[0]?.['@type']
        if (type) result.jsonLdTypes.push(type)
      } catch {}
    })
    if (!result.hasJsonLd) result.warnings.push('No JSON-LD structured data')

    // OG tags
    const ogFields = ['og:title','og:description','og:image','og:url','og:type']
    let ogFound = 0
    ogFields.forEach(p => { if ($(`meta[property="${p}"]`).attr('content')) ogFound++ })
    result.ogScore = Math.round((ogFound / ogFields.length) * 100)
    if (result.ogScore < 60) result.warnings.push(`Low OG completeness (${result.ogScore}%)`)

    // Twitter card
    result.twitterCard = !!$('meta[name="twitter:card"]').attr('content')
    if (!result.twitterCard) result.warnings.push('No Twitter/X card meta')

    // Images
    const imgs = $('img')
    result.imagesTotal = imgs.length
    result.imagesWithAlt = 0
    imgs.each((_, el) => { if ($(el).attr('alt') && $(el).attr('alt').trim()) result.imagesWithAlt++ })
    const missingAlt = result.imagesTotal - result.imagesWithAlt
    if (missingAlt > 0) result.warnings.push(`${missingAlt} image(s) missing alt text`)

    // Links
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || ''
      if (href.startsWith('http') && !href.includes('localhost')) result.externalLinks++
      else if (href.startsWith('/') || href.startsWith(SITE)) result.internalLinks++
    })

    // Word count
    result.wordCount = $('main, article, body').text().replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length
    if (result.wordCount < 100) result.warnings.push(`Thin content (${result.wordCount} words)`)

  } catch (err) {
    result.status = 0
    result.responseMs = Date.now() - start
    result.issues.push(`Fetch error: ${err.message}`)
  }
  return result
}

app.get('/api/seo', async (req, res) => {
  const results = []
  for (const route of STATIC_PAGES) {
    results.push(await seoAuditPage(route))
  }
  res.json(results)
})

app.get('/api/seo/single', async (req, res) => {
  const { route = '/' } = req.query
  res.json(await seoAuditPage(route))
})

// ─── Google Analytics Check ───────────────────────────────────────────────────
async function checkAnalytics(route) {
  const url = SITE + route
  const result = {
    route, url, status: null,
    hasGA4: false, ga4Id: null,
    hasGTM: false, gtmId: null,
    hasDataLayer: false,
    hasConsentMode: false,
    hasOldUA: false, uaId: null,
    issues: [], warnings: [],
  }
  try {
    const res = await axios.get(url, { timeout: 8000, validateStatus: () => true, headers: { 'User-Agent': 'RozperAnalyticsBot/1.0' } })
    result.status = res.status
    if (res.status !== 200) { result.issues.push(`Page not reachable (${res.status})`); return result }

    const html = res.data

    // GA4 — G-XXXXXXXX
    const ga4Match = html.match(/['"]?(G-[A-Z0-9]{6,12})['"]?/)
    if (ga4Match) { result.hasGA4 = true; result.ga4Id = ga4Match[1] }
    else result.issues.push('No GA4 tracking ID (G-XXXXXXXX) found')

    // GTM — GTM-XXXXXXX
    const gtmMatch = html.match(/['"]?(GTM-[A-Z0-9]{5,8})['"]?/)
    if (gtmMatch) { result.hasGTM = true; result.gtmId = gtmMatch[1] }

    // dataLayer
    result.hasDataLayer = html.includes('dataLayer') || html.includes('datalayer')
    if (!result.hasDataLayer) result.warnings.push('dataLayer not initialised')

    // Consent mode
    result.hasConsentMode = html.includes('consent') && (html.includes('gtag') || html.includes('dataLayer'))
    if (!result.hasConsentMode) result.warnings.push('No consent mode signals detected')

    // Old UA — UA-XXXXXX
    const uaMatch = html.match(/['"]?(UA-\d{5,10}-\d)['"]?/)
    if (uaMatch) { result.hasOldUA = true; result.uaId = uaMatch[1]; result.issues.push(`Legacy UA tag found (${uaMatch[1]}) — migrate to GA4`) }

    if (!result.hasGA4 && !result.hasGTM) result.issues.push('No analytics tracking found on this page')

  } catch (err) {
    result.status = 0
    result.issues.push(`Fetch error: ${err.message}`)
  }
  return result
}

app.get('/api/analytics', async (req, res) => {
  // Check a representative sample: homepage + key pages
  const routes = ['/', '/blog', '/pricing', '/contact', '/about', '/area-codes', '/solutions/finance', '/products/ucaas', '/security', '/wholesale-voip']
  const results = []
  for (const r of routes) results.push(await checkAnalytics(r))
  res.json(results)
})

app.get('/api/analytics/all', async (req, res) => {
  const results = []
  for (const route of STATIC_PAGES) results.push(await checkAnalytics(route))
  res.json(results)
})

// ─── Blog Links Audit ─────────────────────────────────────────────────────────
function auditBlogLinks() {
  const INTERNAL_PATTERN = /^(\/|https?:\/\/(www\.)?rozper\.com)/i
  const IMAGE_PATTERN = /\.(png|jpg|jpeg|webp|gif|svg|ico)(\?.*)?$/i
  const LINK_RE = /(?<!!)\[([^\]]*)\]\(([^)]+)\)/g
  let files
  try { files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')) } catch { return [] }
  const results = []
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const internalLinks = [], externalLinks = []
    let match
    const re = new RegExp(LINK_RE.source, LINK_RE.flags)
    while ((match = re.exec(content)) !== null) {
      const text = match[1].trim(), href = match[2].trim()
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue
      if (IMAGE_PATTERN.test(href)) continue
      if (INTERNAL_PATTERN.test(href)) internalLinks.push({ text, href })
      else externalLinks.push({ text, href })
    }
    const issues = [], warnings = []
    if (internalLinks.length < 2) issues.push(`Only ${internalLinks.length} internal link(s) — minimum 2 required`)
    if (externalLinks.length < 1) warnings.push('No external links found — add at least 1 outbound link')
    results.push({ file, slug: data.slug || file.replace('.md', ''), title: data.title || file, internalLinks, externalLinks, internalCount: internalLinks.length, externalCount: externalLinks.length, issues, warnings })
  }
  return results.sort((a, b) => b.issues.length - a.issues.length)
}
app.get('/api/blog-links', (req, res) => { res.json(auditBlogLinks()) })

// ─── GA4 Live Data Endpoints ──────────────────────────────────────────────────
function ga4Error(res) { res.status(503).json({ error: 'GA4 credentials not configured' }) }
function metricVal(row, idx) { return row.metricValues?.[idx]?.value ?? '0' }
function dimVal(row, idx) { return row.dimensionValues?.[idx]?.value ?? '' }

app.get('/api/ga4/overview', async (req, res) => {
  if (!ga4Client) return ga4Error(res)
  try {
    const property = `properties/${GA4_PROPERTY_ID}`
    const [r30, r7] = await Promise.all([
      ga4Client.runReport({ property, dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }, { name: 'bounceRate' }, { name: 'averageSessionDuration' }, { name: 'newUsers' }] }),
      ga4Client.runReport({ property, dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }], metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }] }),
    ])
    const row30 = r30[0].rows?.[0], row7 = r7[0].rows?.[0]
    res.json({ thirtyDays: { sessions: parseInt(metricVal(row30, 0)), users: parseInt(metricVal(row30, 1)), pageviews: parseInt(metricVal(row30, 2)), bounceRate: parseFloat(metricVal(row30, 3)), avgSessionSec: parseFloat(metricVal(row30, 4)), newUsers: parseInt(metricVal(row30, 5)) }, sevenDays: { sessions: parseInt(metricVal(row7, 0)), users: parseInt(metricVal(row7, 1)), pageviews: parseInt(metricVal(row7, 2)) } })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/ga4/top-pages', async (req, res) => {
  if (!ga4Client) return ga4Error(res)
  try {
    const [response] = await ga4Client.runReport({ property: `properties/${GA4_PROPERTY_ID}`, dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }], metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }, { name: 'averageSessionDuration' }], orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 20 })
    res.json((response.rows || []).map(row => ({ path: dimVal(row, 0), title: dimVal(row, 1), views: parseInt(metricVal(row, 0)), users: parseInt(metricVal(row, 1)), avgSec: parseFloat(metricVal(row, 2)) })))
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/ga4/traffic-sources', async (req, res) => {
  if (!ga4Client) return ga4Error(res)
  try {
    const [response] = await ga4Client.runReport({ property: `properties/${GA4_PROPERTY_ID}`, dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] })
    res.json((response.rows || []).map(row => ({ channel: dimVal(row, 0), sessions: parseInt(metricVal(row, 0)), users: parseInt(metricVal(row, 1)), views: parseInt(metricVal(row, 2)) })))
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/ga4/devices', async (req, res) => {
  if (!ga4Client) return ga4Error(res)
  try {
    const [response] = await ga4Client.runReport({ property: `properties/${GA4_PROPERTY_ID}`, dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], dimensions: [{ name: 'deviceCategory' }], metrics: [{ name: 'sessions' }, { name: 'activeUsers' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] })
    res.json((response.rows || []).map(row => ({ device: dimVal(row, 0), sessions: parseInt(metricVal(row, 0)), users: parseInt(metricVal(row, 1)) })))
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/ga4/trend', async (req, res) => {
  if (!ga4Client) return ga4Error(res)
  try {
    const [response] = await ga4Client.runReport({ property: `properties/${GA4_PROPERTY_ID}`, dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], dimensions: [{ name: 'date' }], metrics: [{ name: 'sessions' }, { name: 'activeUsers' }], orderBys: [{ dimension: { dimensionName: 'date' } }] })
    res.json((response.rows || []).map(row => ({ date: dimVal(row, 0), sessions: parseInt(metricVal(row, 0)), users: parseInt(metricVal(row, 1)) })))
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// Fallback to React app for any non-API route (production)
if (fs.existsSync(DIST)) {
  app.get('*', (req, res) => res.sendFile(path.join(DIST, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`\n  Rozper Audit Dashboard`)
  console.log(`  ─────────────────────────────────────────`)
  console.log(`  Dashboard: http://localhost:${PORT}`)
  console.log(`  Auditing:  ${SITE}`)
  console.log(`  ─────────────────────────────────────────\n`)
})
