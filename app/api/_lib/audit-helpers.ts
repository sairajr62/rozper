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
  '/docs',
  '/docs/api',
  '/features/ai-agent-assist',
  '/features/ai-receptionist',
  '/features/ai-sentiment-analysis',
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
  '/products/ai/conversation-analytics',
  '/products/ai/receptionist',
  '/products/contact-center',
  '/products/contact-center/agent-assist',
  '/products/contact-center/interaction-analytics',
  '/products/contact-center/enterprise',
  '/products/contact-center/omnichannel',
  '/products/contact-center/outbound-dialer',
  '/products/contact-center/supervisor-tools',
  '/products/unified-communications',
  '/products/ai-features/ai-assistant',
  '/products/unified-communications/business-phone-system',
  '/products/unified-communications/customer-engagement',
  '/products/unified-communications/online-fax',
  '/products/unified-communications/hosted-phone-system',
  '/products/unified-communications/business-sms-mms',
  '/products/unified-communications/team-chat',
  '/products/unified-communications/hd-video-meetings',
  '/products/unified-communications/website-chatbot',
  '/security',
  '/solutions/enterprise-ucaas',
  '/solutions/financial-services',
  '/solutions/logistics',
  '/solutions/remote-teams',
  '/solutions/retail-ecommerce',
  '/solutions/saas-tech',
  '/solutions/sales-teams',
  '/solutions/small-business',
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

// ─── Markdown / readability helpers ──────────────────────────────────────────
function stripMarkdown(text: string): string {
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

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!word) return 0
  if (word.length <= 3) return 1
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '')
  const m = word.match(/[aeiouy]{1,2}/g)
  return m ? m.length : 1
}

function calcReadability(cleanText: string): { score: number; label: string; level: string } | null {
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 3)
  const words = cleanText.split(/\s+/).filter(Boolean)
  if (sentences.length < 2 || words.length < 10) return null
  const syllables = words.reduce((s, w) => s + countSyllables(w), 0)
  const raw = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length))
  const score = Math.max(0, Math.min(100, Math.round(raw)))
  let label: string, level: string
  if (score >= 70)      { label = 'Easy';      level = 'ok'   }
  else if (score >= 50) { label = 'Moderate';  level = 'warn' }
  else                  { label = 'Difficult'; level = 'err'  }
  return { score, label, level }
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
    if (!data.featuredImage) issues.push('Missing featuredImage')
    else {
      const imgPath = path.join(process.cwd(), 'public', data.featuredImage)
      const blobUrlsPath = path.join(process.cwd(), 'lib', 'blog-blob-urls.json')
      let inBlob = false
      try {
        const blobUrls: Record<string, string> = JSON.parse(fs.readFileSync(blobUrlsPath, 'utf8'))
        const filename = data.featuredImage.split('/').pop() ?? ''
        inBlob = !!blobUrls[filename]
      } catch { /* ignore */ }
      if (!fs.existsSync(imgPath) && !inBlob) issues.push(`Featured image not found: ${data.featuredImage}`)
    }
    if (!data.category) warnings.push('Missing category')
    if (!data.author) warnings.push('Missing author')
    if (!data.publishDate) warnings.push('Missing publishDate')
    if (!data.tags || !data.tags.length) warnings.push('No tags')

    // seoTitle: 50–60 chars
    if (data.seoTitle && data.seoTitle.length > 60) warnings.push(`seoTitle too long (${data.seoTitle.length} chars, max 60)`)
    if (data.seoTitle && data.seoTitle.length < 50) warnings.push(`seoTitle too short (${data.seoTitle.length} chars, min 50)`)

    // seoDescription: 150–160 chars
    if (data.seoDescription && data.seoDescription.length > 160) warnings.push(`seoDescription too long (${data.seoDescription.length} chars, max 160)`)
    else if (data.seoDescription && data.seoDescription.length < 150) warnings.push(`seoDescription too short (${data.seoDescription.length} chars, min 150)`)

    // Word count — strip markdown properly
    const cleanContent = stripMarkdown(content)
    const wordCount = cleanContent.split(/\s+/).filter(Boolean).length
    if (wordCount < 1400) warnings.push(`Short content: ${wordCount} words (target 1400–1700)`)
    else if (wordCount > 1700) warnings.push(`Long content: ${wordCount} words (target 1400–1700)`)

    // Readability (Flesch Reading Ease)
    const readability = calcReadability(cleanContent)
    if (readability?.level === 'err')  warnings.push(`Hard to read — Flesch score ${readability.score} (target ≥50)`)
    else if (readability?.level === 'warn') warnings.push(`Moderate readability — Flesch score ${readability.score} (aim for ≥70)`)

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
  // rozper.vercel.app is staging — only rozper.com + relative paths count as internal
  const INTERNAL_PATTERN = /^(\/|https?:\/\/(www\.)?rozper\.com)/i
  const STAGING_PATTERN  = /^https?:\/\/rozper\.vercel\.app/i
  const IMAGE_PATTERN    = /\.(png|jpg|jpeg|webp|gif|svg|ico)(\?.*)?$/i
  const LINK_RE          = /(?<!!)\[([^\]]*)\]\(([^)]+)\)/g

  function extractLinks(text: string): { text: string; href: string }[] {
    const links: { text: string; href: string }[] = []
    const re = new RegExp(LINK_RE.source, LINK_RE.flags)
    let m
    while ((m = re.exec(text)) !== null) {
      const linkText = m[1].trim(), href = m[2].trim()
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue
      if (IMAGE_PATTERN.test(href)) continue
      links.push({ text: linkText, href })
    }
    return links
  }

  function splitSections(text: string): { heading: string; body: string }[] {
    const parts: { heading: string; body: string }[] = []
    const lines = text.split('\n')
    let heading = ''
    let bodyLines: string[] = []
    for (const line of lines) {
      const m = line.match(/^#{2,3}\s+(.+)/)
      if (m) {
        parts.push({ heading, body: bodyLines.join('\n') })
        heading = m[1].trim()
        bodyLines = []
      } else {
        bodyLines.push(line)
      }
    }
    parts.push({ heading, body: bodyLines.join('\n') })
    return parts
  }

  let files: string[]
  try { files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.md')) } catch { return [] }

  const results: any[] = []
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
    const { data, content } = matter(raw)

    const sections = splitSections(content)
    const introSection      = sections[0]
    const conclusionSections = sections.filter(s =>
      /conclusion|summary|final\s+thought|wrap.?up|closing/i.test(s.heading)
    )

    const introLinks      = extractLinks(introSection.body)
    const conclusionLinks = conclusionSections.flatMap(s => extractLinks(s.body))

    const internalLinks: any[] = []
    const externalLinks: any[] = []
    const stagingLinks: any[]  = []

    for (const link of extractLinks(content)) {
      if (STAGING_PATTERN.test(link.href))  stagingLinks.push(link)
      else if (INTERNAL_PATTERN.test(link.href)) internalLinks.push(link)
      else externalLinks.push(link)
    }

    const issues: string[] = [], warnings: string[] = []
    if (internalLinks.length < 2) issues.push(`Only ${internalLinks.length} internal link(s) — minimum 2 required`)
    if (externalLinks.length < 1) warnings.push('No external links — add at least 1 outbound link')
    if (stagingLinks.length > 0)  warnings.push(`${stagingLinks.length} link(s) use rozper.vercel.app — change to rozper.com`)
    if (introLinks.length > 0)    warnings.push(`${introLinks.length} link(s) in introduction — remove links from intro`)
    if (conclusionLinks.length > 0) warnings.push(`${conclusionLinks.length} link(s) in conclusion — remove links from conclusion`)

    results.push({
      file,
      slug: data.slug || file.replace('.md', ''),
      title: data.title || file,
      internalLinks, externalLinks, stagingLinks,
      introLinks, conclusionLinks,
      internalCount: internalLinks.length,
      externalCount: externalLinks.length,
      issues, warnings,
    })
  }
  return results.sort((a: any, b: any) => b.issues.length - a.issues.length)
}
