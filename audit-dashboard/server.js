const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const app = express()
app.set('etag', false)
app.use((req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next() })
const PORT = 3001
const SITE = 'http://localhost:3000'

// Serve built React app in production
const DIST = path.join(__dirname, 'dist')
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST))
}
const PROJECT = path.join(__dirname, '..')
const BLOG_DIR = path.join(PROJECT, 'content', 'blog')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// ─── Shared headers that prevent 304 Not Modified responses ──────────────────
const NO_CACHE_HEADERS = {
  'User-Agent': 'RozperAuditBot/1.0',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
}

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
  '/products/unified-communications',
  '/products/ai-features/ai-assistant',
  '/products/unified-communications/business-phone',
  '/products/unified-communications/customer-engagement',
  '/products/unified-communications/online-fax',
  '/products/unified-communications/phone-system',
  '/products/unified-communications/sms-mms',
  '/products/unified-communications/team-chat',
  '/products/unified-communications/video-meetings',
  '/products/unified-communications/website-chatbot',
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
      headers: NO_CACHE_HEADERS,
    })
    result.status = res.status
    result.responseMs = Date.now() - start

    if (res.status === 304) {
      result.warnings.push('Server returned 304 Not Modified — content could not be parsed')
      return result
    }
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

// ─── Readability helpers ───────────────────────────────────────────────────────
function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/[|>\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!word) return 0
  if (word.length <= 3) return 1
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '')
  const m = word.match(/[aeiouy]{1,2}/g)
  return m ? m.length : 1
}

function calcReadability(cleanText) {
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 3)
  const words = cleanText.split(/\s+/).filter(Boolean)
  if (sentences.length < 2 || words.length < 10) return null
  const syllables = words.reduce((s, w) => s + countSyllables(w), 0)
  const raw = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length))
  const score = Math.max(0, Math.min(100, Math.round(raw)))
  let label, level
  if (score >= 70) { label = 'Easy';       level = 'ok'   }
  else if (score >= 50) { label = 'Moderate';  level = 'warn' }
  else                  { label = 'Difficult'; level = 'err'  }
  return { score, label, level }
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

    // Title length (50–60 chars)
    if (data.seoTitle && data.seoTitle.length > 60) warnings.push(`seoTitle too long (${data.seoTitle.length} chars, max 60)`)
    if (data.seoTitle && data.seoTitle.length < 50) warnings.push(`seoTitle too short (${data.seoTitle.length} chars, min 50)`)

    // seoDescription (150–160 chars)
    if (data.seoDescription && data.seoDescription.length > 160) warnings.push(`seoDescription too long (${data.seoDescription.length} chars, max 160)`)
    else if (data.seoDescription && data.seoDescription.length < 150) warnings.push(`seoDescription too short (${data.seoDescription.length} chars, min 150)`)

    // Word count — strip markdown properly before counting
    const cleanContent = stripMarkdown(content)
    const wordCount = cleanContent.split(/\s+/).filter(Boolean).length
    if (wordCount < 1500) warnings.push(`Short content: ${wordCount} words (target 1500–1700)`)
    else if (wordCount > 1700) warnings.push(`Long content: ${wordCount} words (target 1500–1700)`)

    // Readability (Flesch Reading Ease)
    const readability = calcReadability(cleanContent)
    if (readability && readability.level === 'err')  warnings.push(`Hard to read — Flesch score ${readability.score} (target ≥50)`)
    else if (readability && readability.level === 'warn') warnings.push(`Moderate readability — Flesch score ${readability.score} (aim for ≥70)`)

    results.push({
      file,
      slug: data.slug || file.replace('.md', ''),
      title: data.title || file,
      category: data.category || null,
      featuredImage: data.featuredImage || null,
      wordCount,
      readability,
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
    const res = await axios.get(url, { timeout: 10000, headers: NO_CACHE_HEADERS })
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
        headers: NO_CACHE_HEADERS,
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
    const r = await axios.get(SITE, { timeout: 5000, validateStatus: () => true, headers: NO_CACHE_HEADERS })
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
    const res = await axios.get(url, { timeout: 10000, validateStatus: () => true, headers: { ...NO_CACHE_HEADERS, 'User-Agent': 'RozperSEOBot/1.0' } })
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
    const res = await axios.get(url, { timeout: 8000, validateStatus: () => true, headers: { ...NO_CACHE_HEADERS, 'User-Agent': 'RozperAnalyticsBot/1.0' } })
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
  const routes = ['/', '/blog', '/pricing', '/contact', '/about', '/area-codes', '/solutions/finance', '/products/unified-communications', '/security', '/wholesale-voip']
  const results = []
  for (const r of routes) results.push(await checkAnalytics(r))
  res.json(results)
})

app.get('/api/analytics/all', async (req, res) => {
  const results = []
  for (const route of STATIC_PAGES) results.push(await checkAnalytics(route))
  res.json(results)
})

// ─── Blog link audit: check internal/external links in markdown ──────────────
function auditBlogLinks() {
  const INTERNAL_PATTERN = /^(\/|https?:\/\/(www\.)?rozper\.com)/i
  const IMAGE_PATTERN = /\.(png|jpg|jpeg|webp|gif|svg|ico)(\?.*)?$/i
  // Match markdown links [text](url) but not images ![alt](url)
  const LINK_RE = /(?<!!)\[([^\]]*)\]\(([^)]+)\)/g

  let files
  try { files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')) }
  catch { return [] }

  const results = []

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)

    const internalLinks = []
    const externalLinks = []

    let match
    while ((match = LINK_RE.exec(content)) !== null) {
      const text = match[1].trim()
      const href = match[2].trim()

      // Skip anchors, mailto, tel, and image files
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue
      if (IMAGE_PATTERN.test(href)) continue

      if (INTERNAL_PATTERN.test(href)) {
        internalLinks.push({ text, href })
      } else {
        externalLinks.push({ text, href })
      }
    }

    const issues = []
    const warnings = []

    if (internalLinks.length < 2)
      issues.push(`Only ${internalLinks.length} internal link(s) — minimum 2 required`)
    if (externalLinks.length < 1)
      warnings.push('No external links found — add at least 1 outbound link')

    results.push({
      file,
      slug: data.slug || file.replace('.md', ''),
      title: data.title || file,
      internalLinks,
      externalLinks,
      internalCount: internalLinks.length,
      externalCount: externalLinks.length,
      issues,
      warnings,
    })
  }

  return results.sort((a, b) => b.issues.length - a.issues.length)
}

app.get('/api/blog-links', (req, res) => {
  res.json(auditBlogLinks())
})

// ─── Leads audit: scan pages for lead capture elements ───────────────────────
const CTA_KEYWORDS = [
  'free trial', 'get started', 'start free', 'sign up', 'sign-up', 'signup',
  'request demo', 'book demo', 'get demo', 'schedule demo',
  'contact us', 'contact sales', 'talk to sales', 'speak to sales',
  'get a quote', 'request quote', 'get pricing', 'see pricing',
  'try for free', 'try it free', 'start now', 'get started free',
]

const CHAT_WIDGETS = [
  { name: 'Intercom', pattern: /intercom/i },
  { name: 'Drift', pattern: /drift\.com|DriftWidget/i },
  { name: 'Crisp', pattern: /crisp\.chat/i },
  { name: 'HubSpot Chat', pattern: /js\.hs-scripts|hubspot/i },
  { name: 'Zendesk Chat', pattern: /zopim|zendesk/i },
  { name: 'Tidio', pattern: /tidio/i },
  { name: 'Tawk', pattern: /tawk\.to/i },
  { name: 'LiveChat', pattern: /livechat/i },
]

async function auditLeads(route) {
  const url = SITE + route
  const start = Date.now()
  const result = {
    route, url,
    status: null,
    responseMs: null,
    // forms
    formCount: 0,
    forms: [],           // [{ action, method, inputCount, hasEmail, hasPhone, hasSubmit }]
    // CTAs
    ctaCount: 0,
    ctas: [],            // [{ text, href, type }]
    // contact links
    phoneLinks: [],      // tel: hrefs
    emailLinks: [],      // mailto: hrefs
    // chat
    chatWidget: null,
    // lead score 0–100
    score: 0,
    issues: [],
    warnings: [],
  }

  try {
    const res = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
      headers: NO_CACHE_HEADERS,
    })
    result.status = res.status
    result.responseMs = Date.now() - start

    if (res.status !== 200) {
      result.issues.push(`Page returned ${res.status}`)
      return result
    }

    const $ = cheerio.load(res.data)
    const bodyHtml = $.html()
    const bodyText = $('body').text()

    // ── Forms ────────────────────────────────────────────────────────────────
    $('form').each((_, el) => {
      const form = $(el)
      const inputs = form.find('input, textarea, select')
      const hasEmail = inputs.filter('[type="email"], [name*="email"], [placeholder*="email" i]').length > 0
      const hasPhone = inputs.filter('[type="tel"], [name*="phone"], [placeholder*="phone" i]').length > 0
      const hasSubmit = form.find('[type="submit"], button[type="submit"], button').length > 0
      result.forms.push({
        action: form.attr('action') || '(no action)',
        method: (form.attr('method') || 'GET').toUpperCase(),
        inputCount: inputs.length,
        hasEmail,
        hasPhone,
        hasSubmit,
      })
    })
    result.formCount = result.forms.length

    // ── CTA buttons / links ───────────────────────────────────────────────────
    const seen = new Set()
    $('a, button').each((_, el) => {
      const text = $(el).text().trim().toLowerCase()
      const href = $(el).attr('href') || ''
      const matched = CTA_KEYWORDS.find(kw => text.includes(kw))
      if (matched && !seen.has(text)) {
        seen.add(text)
        result.ctas.push({
          text: $(el).text().trim().slice(0, 60),
          href: href.slice(0, 80),
          type: el.tagName === 'button' ? 'button' : 'link',
        })
      }
    })
    result.ctaCount = result.ctas.length

    // ── Phone & email contact links ───────────────────────────────────────────
    $('a[href^="tel:"]').each((_, el) => {
      const num = $(el).attr('href').replace('tel:', '').trim()
      if (num && !result.phoneLinks.includes(num)) result.phoneLinks.push(num)
    })
    $('a[href^="mailto:"]').each((_, el) => {
      const addr = $(el).attr('href').replace('mailto:', '').trim()
      if (addr && !result.emailLinks.includes(addr)) result.emailLinks.push(addr)
    })

    // ── Chat widget detection ─────────────────────────────────────────────────
    for (const widget of CHAT_WIDGETS) {
      if (widget.pattern.test(bodyHtml)) {
        result.chatWidget = widget.name
        break
      }
    }

    // ── Lead score (0–100) ────────────────────────────────────────────────────
    let score = 0
    if (result.formCount > 0)    score += 30
    if (result.ctaCount >= 2)    score += 25
    else if (result.ctaCount === 1) score += 12
    if (result.phoneLinks.length > 0) score += 15
    if (result.emailLinks.length > 0) score += 10
    if (result.chatWidget)       score += 15
    if (result.formCount > 0 && result.forms.some(f => f.hasEmail)) score += 5
    result.score = Math.min(score, 100)

    // ── Issues & warnings ────────────────────────────────────────────────────
    if (result.formCount === 0 && result.ctaCount === 0)
      result.issues.push('No lead capture elements found (no forms, no CTAs)')
    if (result.ctaCount === 0)
      result.warnings.push('No primary CTA buttons/links detected')
    if (result.formCount === 0)
      result.warnings.push('No forms found on this page')
    if (!result.chatWidget)
      result.warnings.push('No live chat widget detected')
    if (result.phoneLinks.length === 0 && result.emailLinks.length === 0)
      result.warnings.push('No phone or email contact links')

  } catch (err) {
    result.status = 0
    result.responseMs = Date.now() - start
    result.issues.push(`Fetch error: ${err.message}`)
  }

  return result
}

app.get('/api/leads', async (req, res) => {
  const results = []
  for (const route of STATIC_PAGES) results.push(await auditLeads(route))
  res.json(results)
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
