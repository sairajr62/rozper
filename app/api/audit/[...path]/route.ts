import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'

const SITE = process.env.NODE_ENV === 'production'
  ? 'https://rozper.vercel.app'
  : 'http://localhost:3000'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

const NO_CACHE = { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'User-Agent': 'RozperAuditBot/1.0' }

const STATIC_PAGES = [
  '/', '/about', '/area-codes', '/blog', '/compare', '/contact', '/country-code',
  '/docs', '/docs/api',
  '/features/ai-agent-assist', '/features/ai-receptionist', '/features/ai-sentiment-analysis',
  '/features/auto-attendant', '/features/call-recording', '/features/conversation-intelligence',
  '/features/supervisor-tools', '/features/toll-free-numbers',
  '/integrations/hubspot', '/integrations/zoho',
  '/legal/privacy', '/legal/terms', '/pricing',
  '/products/ai', '/products/ai/virtual-assistant', '/products/ai/conversation-analytics',
  '/products/ai/receptionist',
  '/products/contact-center', '/products/contact-center/agent-assist',
  '/products/contact-center/interaction-analytics', '/products/contact-center/enterprise',
  '/products/contact-center/omnichannel', '/products/contact-center/outbound-dialer',
  '/products/contact-center/supervisor-tools',
  '/products/ucaas', '/products/ucaas/ai-assistant', '/products/ucaas/business-phone-system',
  '/products/ucaas/customer-engagement', '/products/ucaas/online-fax',
  '/products/ucaas/hosted-phone-system', '/products/ucaas/business-sms-mms',
  '/products/ucaas/team-chat', '/products/ucaas/hd-video-meetings', '/products/ucaas/website-chatbot',
  '/security',
  '/solutions/enterprise-ucaas', '/solutions/financial-services', '/solutions/healthcare',
  '/solutions/logistics', '/solutions/remote-teams', '/solutions/retail-ecommerce',
  '/solutions/saas-tech', '/solutions/sales-teams', '/solutions/small-business', '/solutions/support-teams',
  '/status', '/wholesale-voice', '/wholesale-voip',
]

async function fetchPage(url: string) {
  const start = Date.now()
  try {
    const res = await fetch(url, { headers: NO_CACHE, signal: AbortSignal.timeout(10000) })
    const text = await res.text()
    return { status: res.status, html: text, ms: Date.now() - start, err: null }
  } catch (e: any) {
    return { status: 0, html: '', ms: Date.now() - start, err: e.message }
  }
}

async function auditPage(route: string) {
  const url = SITE + route
  const { status, html, ms, err } = await fetchPage(url)
  const result: any = { route, url, status, responseMs: ms, issues: [], warnings: [], title: null, description: null, h1Count: 0, hasOgTitle: false, hasOgDesc: false, hasOgImage: false, hasCanonical: false, imagesWithoutAlt: 0, wordCount: 0 }

  if (err) { result.issues.push(`Fetch error: ${err}`); return result }
  if (status === 404) { result.issues.push('Page returns 404'); return result }
  if (status >= 500) { result.issues.push(`Server error: ${status}`); return result }
  if (status >= 300 && status < 400) result.warnings.push(`Redirect: ${status}`)

  const $ = cheerio.load(html)
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
  if (ms > 3000) result.warnings.push(`Slow response: ${ms}ms`)

  return result
}

function auditBlogs() {
  const results: any[] = []
  if (!fs.existsSync(BLOG_DIR)) return results
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  for (const file of files) {
    const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'))
    const issues: string[] = [], warnings: string[] = []
    if (!data.title) issues.push('Missing title')
    if (!data.slug) warnings.push('Missing slug')
    if (!data.excerpt) warnings.push('Missing excerpt/description')
    if (!data.seoTitle) warnings.push('Missing seoTitle')
    if (!data.seoDescription) warnings.push('Missing seoDescription')
    else if (data.seoDescription.length > 160) warnings.push(`seoDescription too long (${data.seoDescription.length} chars)`)
    else if (data.seoDescription.length < 50) warnings.push(`seoDescription too short (${data.seoDescription.length} chars)`)
    if (!data.featuredImage) issues.push('Missing featuredImage')
    if (!data.category) warnings.push('Missing category')
    if (!data.author) warnings.push('Missing author')
    if (!data.publishDate) warnings.push('Missing publishDate')
    if (!data.tags?.length) warnings.push('No tags')
    if (data.seoTitle?.length > 65) warnings.push(`seoTitle too long (${data.seoTitle.length} chars)`)
    if (data.seoTitle?.length < 30) warnings.push(`seoTitle too short (${data.seoTitle.length} chars)`)
    const wordCount = content.replace(/[#*_>\-\[\]]/g, ' ').split(/\s+/).filter(Boolean).length
    if (wordCount < 300) issues.push(`Thin content: only ${wordCount} words`)
    else if (wordCount < 600) warnings.push(`Short content: ${wordCount} words`)
    results.push({ file, slug: data.slug || file.replace('.md',''), title: data.title || file, category: data.category||null, featuredImage: data.featuredImage||null, wordCount, issues, warnings, publishDate: data.publishDate||null, author: data.author||null })
  }
  return results.sort((a, b) => b.issues.length - a.issues.length)
}

async function seoAuditPage(route: string) {
  const url = SITE + route
  const { status, html, ms, err } = await fetchPage(url)
  const result: any = { route, url, status, responseMs: ms, title: null, titleLen: 0, description: null, descLen: 0, h1: [], h2: [], h3: [], canonical: null, robotsMeta: null, hasJsonLd: false, jsonLdTypes: [], ogScore: 0, twitterCard: false, imagesTotal: 0, imagesWithAlt: 0, internalLinks: 0, externalLinks: 0, wordCount: 0, issues: [], warnings: [] }
  if (err) { result.issues.push(`Fetch error: ${err}`); return result }
  if (status !== 200) { result.issues.push(`Status ${status}`); return result }

  const $ = cheerio.load(html)
  result.title = $('title').text().trim(); result.titleLen = result.title.length
  if (!result.title) result.issues.push('Missing <title>')
  else if (result.titleLen < 30) result.warnings.push(`Title too short (${result.titleLen} chars)`)
  else if (result.titleLen > 65) result.warnings.push(`Title too long (${result.titleLen} chars)`)

  result.description = $('meta[name="description"]').attr('content') || ''; result.descLen = result.description.length
  if (!result.description) result.issues.push('Missing meta description')
  else if (result.descLen < 50) result.warnings.push(`Description too short (${result.descLen} chars)`)
  else if (result.descLen > 160) result.warnings.push(`Description too long (${result.descLen} chars)`)

  $('h1').each((_: any, el: any) => result.h1.push($(el).text().trim().slice(0,80)))
  $('h2').each((_: any, el: any) => result.h2.push($(el).text().trim().slice(0,80)))
  $('h3').each((_: any, el: any) => result.h3.push($(el).text().trim().slice(0,60)))
  if (!result.h1.length) result.issues.push('No H1 tag')
  else if (result.h1.length > 1) result.warnings.push(`Multiple H1s (${result.h1.length})`)
  if (!result.h2.length) result.warnings.push('No H2 tags')

  result.canonical = $('link[rel="canonical"]').attr('href') || null
  if (!result.canonical) result.warnings.push('No canonical URL')
  result.robotsMeta = $('meta[name="robots"]').attr('content') || null
  if (result.robotsMeta?.includes('noindex')) result.issues.push('Page is noindex!')

  $('script[type="application/ld+json"]').each((_: any, el: any) => {
    result.hasJsonLd = true
    try { const p = JSON.parse($(el).html() || '{}'); const t = p['@type']||p[0]?.['@type']; if (t) result.jsonLdTypes.push(t) } catch {}
  })
  if (!result.hasJsonLd) result.warnings.push('No JSON-LD structured data')

  let ogFound = 0
  ;['og:title','og:description','og:image','og:url','og:type'].forEach(p => { if ($(`meta[property="${p}"]`).attr('content')) ogFound++ })
  result.ogScore = Math.round((ogFound / 5) * 100)
  if (result.ogScore < 60) result.warnings.push(`Low OG completeness (${result.ogScore}%)`)
  result.twitterCard = !!$('meta[name="twitter:card"]').attr('content')
  if (!result.twitterCard) result.warnings.push('No Twitter/X card meta')

  const imgs = $('img'); result.imagesTotal = imgs.length
  imgs.each((_: any, el: any) => { if ($(el).attr('alt')?.trim()) result.imagesWithAlt++ })
  const missingAlt = result.imagesTotal - result.imagesWithAlt
  if (missingAlt > 0) result.warnings.push(`${missingAlt} image(s) missing alt`)

  $('a[href]').each((_: any, el: any) => {
    const href = $(el).attr('href') || ''
    if (href.startsWith('http') && !href.includes('localhost')) result.externalLinks++
    else if (href.startsWith('/') || href.includes('rozper')) result.internalLinks++
  })
  result.wordCount = $('main, article, body').text().replace(/\s+/g,' ').trim().split(' ').filter(Boolean).length
  if (result.wordCount < 100) result.warnings.push(`Thin content (${result.wordCount} words)`)

  // Score
  let score = 100
  if (!result.title) score -= 20; else if (result.titleLen < 30 || result.titleLen > 65) score -= 8
  if (!result.description) score -= 20; else if (result.descLen < 50 || result.descLen > 160) score -= 8
  if (!result.h1.length) score -= 15; else if (result.h1.length > 1) score -= 5
  if (!result.canonical) score -= 10
  if (!result.hasJsonLd) score -= 10
  if (result.ogScore < 80) score -= 8
  if (!result.twitterCard) score -= 5
  if (missingAlt > 0) score -= Math.min(10, missingAlt * 2)
  if (result.robotsMeta?.includes('noindex')) score -= 30
  result.score = Math.max(0, score)

  return result
}

async function checkAnalytics(route: string) {
  const url = SITE + route
  const { status, html, err } = await fetchPage(url)
  const result: any = { route, url, status, hasGA4: false, ga4Id: null, hasGTM: false, gtmId: null, hasDataLayer: false, hasConsentMode: false, hasOldUA: false, uaId: null, issues: [], warnings: [] }
  if (err) { result.issues.push(`Fetch error: ${err}`); return result }
  if (status !== 200) { result.issues.push(`Page not reachable (${status})`); return result }
  const ga4 = html.match(/['"]?(G-[A-Z0-9]{6,12})['"]?/)
  if (ga4) { result.hasGA4 = true; result.ga4Id = ga4[1] } else result.issues.push('No GA4 ID found')
  const gtm = html.match(/['"]?(GTM-[A-Z0-9]{5,8})['"]?/)
  if (gtm) { result.hasGTM = true; result.gtmId = gtm[1] }
  result.hasDataLayer = html.includes('dataLayer') || html.includes('datalayer')
  if (!result.hasDataLayer) result.warnings.push('dataLayer not initialised')
  result.hasConsentMode = html.includes('consent') && (html.includes('gtag') || html.includes('dataLayer'))
  if (!result.hasConsentMode) result.warnings.push('No consent mode signals')
  const ua = html.match(/['"]?(UA-\d{5,10}-\d)['"]?/)
  if (ua) { result.hasOldUA = true; result.uaId = ua[1]; result.issues.push(`Legacy UA tag found (${ua[1]})`) }
  if (!result.hasGA4 && !result.hasGTM) result.issues.push('No analytics tracking found')
  return result
}

async function checkLinks(route: string) {
  const url = SITE + route
  const { html, err } = await fetchPage(url)
  if (err) return []
  const $ = cheerio.load(html)
  const links: string[] = []
  $('a[href]').each((_: any, el: any) => {
    const href = $(el).attr('href') || ''
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
    if (href.startsWith('http') && !href.includes('localhost')) return
    links.push(href.startsWith('/') ? href : '/' + href)
  })
  const unique = [...new Set(links)].slice(0, 30)
  const results = await Promise.all(unique.map(async link => {
    try {
      const r = await fetch(SITE + link, { headers: NO_CACHE, signal: AbortSignal.timeout(8000) })
      return { href: link, status: r.status, broken: r.status === 404 || r.status >= 500 }
    } catch { return { href: link, status: 0, broken: true } }
  }))
  return results
}

async function auditLeads(route: string) {
  const url = SITE + route
  const { status, html, ms, err } = await fetchPage(url)
  const result: any = { route, url, status, responseMs: ms, formCount: 0, forms: [], ctaCount: 0, ctas: [], phoneLinks: [], emailLinks: [], chatWidget: null, score: 0, issues: [], warnings: [] }
  if (err || status !== 200) { result.issues.push(err || `Status ${status}`); return result }

  const $ = cheerio.load(html)
  const CTA_KW = ['free trial','get started','start free','sign up','signup','request demo','book demo','contact us','contact sales','get a quote','get pricing','see pricing','try for free','start now']
  const CHAT = [{ name:'Intercom',p:/intercom/i },{ name:'Drift',p:/drift\.com/i },{ name:'Crisp',p:/crisp\.chat/i },{ name:'HubSpot',p:/hs-scripts/i },{ name:'Zendesk',p:/zopim|zendesk/i },{ name:'Tawk',p:/tawk\.to/i }]

  $('form').each((_: any, el: any) => {
    const f = $(el), inputs = f.find('input,textarea,select')
    result.forms.push({ action: f.attr('action')||'(none)', method: (f.attr('method')||'GET').toUpperCase(), inputCount: inputs.length, hasEmail: !!inputs.filter('[type="email"],[name*="email"]').length, hasPhone: !!inputs.filter('[type="tel"],[name*="phone"]').length, hasSubmit: !!f.find('[type="submit"],button').length })
  })
  result.formCount = result.forms.length

  const seen = new Set<string>()
  $('a,button').each((_: any, el: any) => {
    const text = $(el).text().trim().toLowerCase()
    const href = $(el).attr('href') || ''
    const m = CTA_KW.find(k => text.includes(k))
    if (m && !seen.has(text)) { seen.add(text); result.ctas.push({ text: $(el).text().trim().slice(0,60), href: href.slice(0,80), type: el.tagName === 'button' ? 'button' : 'link' }) }
  })
  result.ctaCount = result.ctas.length

  $('a[href^="tel:"]').each((_: any, el: any) => { const n = $(el).attr('href')!.replace('tel:','').trim(); if (n && !result.phoneLinks.includes(n)) result.phoneLinks.push(n) })
  $('a[href^="mailto:"]').each((_: any, el: any) => { const a = $(el).attr('href')!.replace('mailto:','').trim(); if (a && !result.emailLinks.includes(a)) result.emailLinks.push(a) })

  for (const w of CHAT) { if (w.p.test(html)) { result.chatWidget = w.name; break } }

  let score = 0
  if (result.formCount > 0) score += 30
  if (result.ctaCount >= 2) score += 25; else if (result.ctaCount === 1) score += 12
  if (result.phoneLinks.length > 0) score += 15
  if (result.emailLinks.length > 0) score += 10
  if (result.chatWidget) score += 15
  if (result.formCount > 0 && result.forms.some((f: any) => f.hasEmail)) score += 5
  result.score = Math.min(score, 100)

  if (!result.formCount && !result.ctaCount) result.issues.push('No lead capture elements found')
  if (!result.ctaCount) result.warnings.push('No CTA buttons/links detected')
  if (!result.formCount) result.warnings.push('No forms found')
  if (!result.chatWidget) result.warnings.push('No live chat widget detected')
  if (!result.phoneLinks.length && !result.emailLinks.length) result.warnings.push('No phone or email contact links')

  return result
}

function auditBlogLinks() {
  const INTERNAL_PATTERN = /^(\/|https?:\/\/(www\.)?rozper\.com)/i
  const IMAGE_PATTERN = /\.(png|jpg|jpeg|webp|gif|svg|ico)(\?.*)?$/i
  const LINK_RE = /(?<!!)\[([^\]]*)\]\(([^)]+)\)/g
  const results: any[] = []
  if (!fs.existsSync(BLOG_DIR)) return results
  const files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.md'))
  for (const file of files) {
    const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'))
    const internalLinks: any[] = [], externalLinks: any[] = []
    const re = new RegExp(LINK_RE.source, LINK_RE.flags)
    let match
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
    results.push({ file, slug: data.slug || file.replace('.md',''), title: data.title || file, internalLinks, externalLinks, internalCount: internalLinks.length, externalCount: externalLinks.length, issues, warnings })
  }
  return results.sort((a, b) => b.issues.length - a.issues.length)
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params
  const slug = segments.join('/')
  const { searchParams } = req.nextUrl

  if (slug === 'health') {
    try {
      const r = await fetch(SITE, { headers: NO_CACHE, signal: AbortSignal.timeout(5000) })
      return NextResponse.json({ online: r.status < 500, status: r.status, site: SITE })
    } catch { return NextResponse.json({ online: false, status: 0, site: SITE }) }
  }

  if (slug === 'summary') {
    const blogs = auditBlogs()
    return NextResponse.json({ pages: { total: STATIC_PAGES.length }, blogs: { total: blogs.length, withIssues: blogs.filter((b: any) => b.issues.length > 0).length, withWarnings: blogs.filter((b: any) => b.warnings.length > 0).length, totalIssues: blogs.reduce((s: number, b: any) => s + b.issues.length, 0), totalWarnings: blogs.reduce((s: number, b: any) => s + b.warnings.length, 0), missingImages: blogs.filter((b: any) => b.issues.some((i: string) => i.includes('image'))).length, thinContent: blogs.filter((b: any) => b.issues.some((i: string) => i.includes('Thin'))).length } })
  }

  if (slug === 'pages') {
    const results = await Promise.all(STATIC_PAGES.map(auditPage))
    return NextResponse.json(results)
  }

  if (slug === 'page') {
    const route = searchParams.get('route')
    if (!route) return NextResponse.json({ error: 'route required' }, { status: 400 })
    return NextResponse.json(await auditPage(route))
  }

  if (slug === 'blogs') {
    return NextResponse.json(auditBlogs())
  }

  if (slug === 'links') {
    const route = searchParams.get('route') || '/'
    return NextResponse.json(await checkLinks(route))
  }

  if (slug === 'seo') {
    const results = await Promise.all(STATIC_PAGES.map(seoAuditPage))
    return NextResponse.json(results)
  }

  if (slug === 'seo/single') {
    const route = searchParams.get('route') || '/'
    return NextResponse.json(await seoAuditPage(route))
  }

  if (slug === 'analytics') {
    const routes = ['/','/blog','/pricing','/contact','/about','/area-codes','/solutions/financial-services','/products/ucaas','/security','/wholesale-voip']
    return NextResponse.json(await Promise.all(routes.map(checkAnalytics)))
  }

  if (slug === 'analytics/all') {
    return NextResponse.json(await Promise.all(STATIC_PAGES.map(checkAnalytics)))
  }

  if (slug === 'leads') {
    const results = await Promise.all(STATIC_PAGES.map(auditLeads))
    return NextResponse.json(results)
  }

  if (slug === 'blog-links') {
    return NextResponse.json(auditBlogLinks())
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
