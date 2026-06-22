import * as fs from 'fs'
import * as path from 'path'
import * as cheerio from 'cheerio'
import matter from 'gray-matter'

export const SITE = process.env.AUDIT_TARGET_SITE || 'https://rozper.vercel.app'
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export const STATIC_PAGES = [
  '/',
  '/about',
  '/area-codes',
  '/blog',
  '/compare',
  '/contact',
  '/country-code',
  '/demo',
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

async function fetchHtml(url: string, timeout = 10000, userAgent = 'RozperAuditBot/1.0') {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(timeout),
      headers: { 'User-Agent': userAgent },
    })
    const text = await res.text()
    return { status: res.status, text }
  } catch (err: any) {
    throw new Error(err?.message || 'Fetch failed')
  }
}

export async function auditPage(route: string) {
  const url = SITE + route
  const start = Date.now()
  const result: any = {
    route, url,
    status: null, responseMs: null,
    issues: [], warnings: [],
    title: null, description: null,
    h1Count: 0,
    hasOgTitle: false, hasOgDesc: false, hasOgImage: false,
    hasCanonical: false,
    imagesWithoutAlt: 0,
    wordCount: 0,
  }

  try {
    const { status, text } = await fetchHtml(url, 10000)
    result.status = status
    result.responseMs = Date.now() - start

    if (status === 404) { result.issues.push('Page returns 404'); return result }
    if (status >= 500) { result.issues.push(`Server error: ${status}`); return result }
    if (status >= 300 && status < 400) result.warnings.push(`Redirect: ${status}`)

    const $ = cheerio.load(text)

    result.title = $('title').text().trim()
    if (!result.title) result.issues.push('Missing <title> tag')
    else if (result.title.length < 30) result.warnings.push(`Title too short (${result.title.length} chars)`)
    else if (result.title.length > 65) result.warnings.push(`Title too long (${result.title.length} chars)`)

    result.description = $('meta[name="description"]').attr('content') || ''
    if (!result.description) result.issues.push('Missing meta description')
    else if (result.description.length < 50) result.warnings.push(`Meta description too short (${result.description.length} chars)`)
    else if (result.description.length > 160) result.warnings.push(`Meta description too long (${result.description.length} chars)`)

    result.h1Count = $('h1').length
    if (result.h1Count === 0) result.issues.push('Missing H1 tag')
    else if (result.h1Count > 1) result.warnings.push(`Multiple H1 tags (${result.h1Count})`)

    result.hasOgTitle = !!$('meta[property="og:title"]').attr('content')
    result.hasOgDesc = !!$('meta[property="og:description"]').attr('content')
    result.hasOgImage = !!$('meta[property="og:image"]').attr('content')
    if (!result.hasOgTitle) result.warnings.push('Missing og:title')
    if (!result.hasOgDesc) result.warnings.push('Missing og:description')
    if (!result.hasOgImage) result.warnings.push('Missing og:image')

    result.hasCanonical = !!$('link[rel="canonical"]').attr('href')
    if (!result.hasCanonical) result.warnings.push('Missing canonical URL')

    result.imagesWithoutAlt = $('img:not([alt])').length + $('img[alt=""]').length
    if (result.imagesWithoutAlt > 0) result.warnings.push(`${result.imagesWithoutAlt} image(s) missing alt text`)

    const bodyText = $('main, article, body').text().replace(/\s+/g, ' ').trim()
    result.wordCount = bodyText.split(' ').filter(Boolean).length
    if (result.wordCount < 100) result.warnings.push(`Thin content (${result.wordCount} words)`)

    if (result.responseMs > 3000) result.warnings.push(`Slow response: ${result.responseMs}ms`)
  } catch (err: any) {
    result.status = 0
    result.responseMs = Date.now() - start
    result.issues.push(`Fetch error: ${err.message}`)
  }

  return result
}

export function auditBlogs() {
  const results: any[] = []
  if (!fs.existsSync(BLOG_DIR)) return results

  const files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.md'))

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)

    const issues: string[] = []
    const warnings: string[] = []

    if (!data.title) issues.push('Missing title')
    if (!data.slug) warnings.push('Missing slug (will use filename)')
    if (!data.excerpt) warnings.push('Missing excerpt/description')
    if (!data.seoTitle) warnings.push('Missing seoTitle')
    if (!data.seoDescription) warnings.push('Missing seoDescription')
    else if (data.seoDescription.length > 160) warnings.push(`seoDescription too long (${data.seoDescription.length} chars)`)
    else if (data.seoDescription.length < 50) warnings.push(`seoDescription too short (${data.seoDescription.length} chars)`)
    if (!data.featuredImage) issues.push('Missing featuredImage')
    else {
      const imgPath = path.join(process.cwd(), 'public', data.featuredImage)
      if (!fs.existsSync(imgPath)) issues.push(`Featured image not found: ${data.featuredImage}`)
    }
    if (!data.category) warnings.push('Missing category')
    if (!data.author) warnings.push('Missing author')
    if (!data.publishDate) warnings.push('Missing publishDate')
    if (!data.tags || !data.tags.length) warnings.push('No tags')
    if (data.seoTitle && data.seoTitle.length > 65) warnings.push(`seoTitle too long (${data.seoTitle.length} chars)`)
    if (data.seoTitle && data.seoTitle.length < 30) warnings.push(`seoTitle too short (${data.seoTitle.length} chars)`)

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

  return results.sort((a: any, b: any) => b.issues.length - a.issues.length)
}

export async function checkLinks(route: string) {
  const url = SITE + route
  const links: string[] = []

  try {
    const { text } = await fetchHtml(url, 10000)
    const $ = cheerio.load(text)
    $('a[href]').each((_: any, el: any) => {
      const href = $(el).attr('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      if (href.startsWith('http') && !href.includes('localhost')) return
      links.push(href.startsWith('/') ? href : '/' + href)
    })
  } catch {}

  const unique = [...new Set(links)]
  const results: any[] = []

  for (const link of unique.slice(0, 30)) {
    try {
      const { status } = await fetchHtml(SITE + link, 8000)
      results.push({ href: link, status, broken: status === 404 || status >= 500 })
    } catch {
      results.push({ href: link, status: 0, broken: true })
    }
  }

  return results
}

export async function seoAuditPage(route: string) {
  const url = SITE + route
  const start = Date.now()
  const result: any = {
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
    const { status, text } = await fetchHtml(url, 10000, 'RozperSEOBot/1.0')
    result.status = status
    result.responseMs = Date.now() - start
    if (status !== 200) { result.issues.push(`Status ${status}`); return result }

    const $ = cheerio.load(text)

    result.title = $('title').text().trim()
    result.titleLen = result.title.length
    if (!result.title) result.issues.push('Missing <title>')
    else if (result.titleLen < 30) result.warnings.push(`Title too short (${result.titleLen} chars, min 30)`)
    else if (result.titleLen > 65) result.warnings.push(`Title too long (${result.titleLen} chars, max 65)`)

    result.description = $('meta[name="description"]').attr('content') || ''
    result.descLen = result.description.length
    if (!result.description) result.issues.push('Missing meta description')
    else if (result.descLen < 50) result.warnings.push(`Description too short (${result.descLen} chars, min 50)`)
    else if (result.descLen > 160) result.warnings.push(`Description too long (${result.descLen} chars, max 160)`)

    $('h1').each((_: any, el: any) => result.h1.push($(el).text().trim().slice(0, 80)))
    $('h2').each((_: any, el: any) => result.h2.push($(el).text().trim().slice(0, 80)))
    $('h3').each((_: any, el: any) => result.h3.push($(el).text().trim().slice(0, 60)))
    if (result.h1.length === 0) result.issues.push('No H1 tag')
    else if (result.h1.length > 1) result.warnings.push(`Multiple H1 tags (${result.h1.length})`)
    if (result.h2.length === 0) result.warnings.push('No H2 tags — add subheadings')

    result.canonical = $('link[rel="canonical"]').attr('href') || null
    if (!result.canonical) result.warnings.push('No canonical URL')

    result.robotsMeta = $('meta[name="robots"]').attr('content') || null
    if (result.robotsMeta && result.robotsMeta.includes('noindex')) result.issues.push('Page is noindex!')

    $('script[type="application/ld+json"]').each((_: any, el: any) => {
      result.hasJsonLd = true
      try {
        const parsed = JSON.parse($(el).html() || '{}')
        const type = parsed['@type'] || parsed[0]?.['@type']
        if (type) result.jsonLdTypes.push(type)
      } catch {}
    })
    if (!result.hasJsonLd) result.warnings.push('No JSON-LD structured data')

    const ogFields = ['og:title','og:description','og:image','og:url','og:type']
    let ogFound = 0
    ogFields.forEach((p: string) => { if ($(`meta[property="${p}"]`).attr('content')) ogFound++ })
    result.ogScore = Math.round((ogFound / ogFields.length) * 100)
    if (result.ogScore < 60) result.warnings.push(`Low OG completeness (${result.ogScore}%)`)

    result.twitterCard = !!$('meta[name="twitter:card"]').attr('content')
    if (!result.twitterCard) result.warnings.push('No Twitter/X card meta')

    const imgs = $('img')
    result.imagesTotal = imgs.length
    result.imagesWithAlt = 0
    imgs.each((_: any, el: any) => { if ($(el).attr('alt') && ($(el).attr('alt') as string).trim()) result.imagesWithAlt++ })
    const missingAlt = result.imagesTotal - result.imagesWithAlt
    if (missingAlt > 0) result.warnings.push(`${missingAlt} image(s) missing alt text`)

    $('a[href]').each((_: any, el: any) => {
      const href = $(el).attr('href') || ''
      if (href.startsWith('http') && !href.includes('localhost')) result.externalLinks++
      else if (href.startsWith('/') || href.startsWith(SITE)) result.internalLinks++
    })

    result.wordCount = $('main, article, body').text().replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length
    if (result.wordCount < 100) result.warnings.push(`Thin content (${result.wordCount} words)`)

  } catch (err: any) {
    result.status = 0
    result.responseMs = Date.now() - start
    result.issues.push(`Fetch error: ${err.message}`)
  }
  return result
}

export async function checkAnalytics(route: string) {
  const url = SITE + route
  const result: any = {
    route, url, status: null,
    hasGA4: false, ga4Id: null,
    hasGTM: false, gtmId: null,
    hasDataLayer: false,
    hasConsentMode: false,
    hasOldUA: false, uaId: null,
    issues: [], warnings: [],
  }
  try {
    const { status, text } = await fetchHtml(url, 8000, 'RozperAnalyticsBot/1.0')
    result.status = status
    if (status !== 200) { result.issues.push(`Page not reachable (${status})`); return result }

    const ga4Match = text.match(/['"]?(G-[A-Z0-9]{6,12})['"]?/)
    if (ga4Match) { result.hasGA4 = true; result.ga4Id = ga4Match[1] }
    else result.issues.push('No GA4 tracking ID (G-XXXXXXXX) found')

    const gtmMatch = text.match(/['"]?(GTM-[A-Z0-9]{5,8})['"]?/)
    if (gtmMatch) { result.hasGTM = true; result.gtmId = gtmMatch[1] }

    result.hasDataLayer = text.includes('dataLayer') || text.includes('datalayer')
    if (!result.hasDataLayer) result.warnings.push('dataLayer not initialised')

    result.hasConsentMode = text.includes('consent') && (text.includes('gtag') || text.includes('dataLayer'))
    if (!result.hasConsentMode) result.warnings.push('No consent mode signals detected')

    const uaMatch = text.match(/['"]?(UA-\d{5,10}-\d)['"]?/)
    if (uaMatch) { result.hasOldUA = true; result.uaId = uaMatch[1]; result.issues.push(`Legacy UA tag found (${uaMatch[1]}) — migrate to GA4`) }

    if (!result.hasGA4 && !result.hasGTM) result.issues.push('No analytics tracking found on this page')
  } catch (err: any) {
    result.status = 0
    result.issues.push(`Fetch error: ${err.message}`)
  }
  return result
}

export function auditBlogLinks() {
  const INTERNAL_PATTERN = /^(\/|https?:\/\/(www\.)?rozper\.com)/i
  const IMAGE_PATTERN = /\.(png|jpg|jpeg|webp|gif|svg|ico)(\?.*)?$/i
  const LINK_RE = /(?<!!)\[([^\]]*)\]\(([^)]+)\)/g
  let files: string[]
  try { files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.md')) } catch { return [] }
  const results: any[] = []
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const internalLinks: any[] = [], externalLinks: any[] = []
    let match
    const re = new RegExp(LINK_RE.source, LINK_RE.flags)
    while ((match = re.exec(content)) !== null) {
      const text = match[1].trim(), href = match[2].trim()
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue
      if (IMAGE_PATTERN.test(href)) continue
      if (INTERNAL_PATTERN.test(href)) internalLinks.push({ text, href })
      else externalLinks.push({ text, href })
    }
    const issues: string[] = [], warnings: string[] = []
    if (internalLinks.length < 2) issues.push(`Only ${internalLinks.length} internal link(s) — minimum 2 required`)
    if (externalLinks.length < 1) warnings.push('No external links found — add at least 1 outbound link')
    results.push({ file, slug: data.slug || file.replace('.md', ''), title: data.title || file, internalLinks, externalLinks, internalCount: internalLinks.length, externalCount: externalLinks.length, issues, warnings })
  }
  return results.sort((a: any, b: any) => b.issues.length - a.issues.length)
}
