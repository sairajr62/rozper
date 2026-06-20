const BASE = '/api'

async function get(path) {
  const r = await fetch(`${BASE}${path}`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export async function checkHealth()          { return get('/health') }
export async function fetchSummary()         { return get('/summary') }
export async function auditPages()           { return get('/pages') }
export async function auditBlogs()           { return get('/blogs') }
export async function auditSEO()             { return get('/seo') }
export async function auditAnalytics()       { return get('/analytics') }
export async function auditAnalyticsAll()    { return get('/analytics/all') }
export async function auditBlogLinks()       { return get('/blog-links') }
export async function fetchLeads()           { return get('/leads') }
export async function fetchGA4Overview()     { return get('/ga4/overview') }
export async function fetchGA4TopPages()     { return get('/ga4/top-pages') }
export async function fetchGA4TrafficSources() { return get('/ga4/traffic-sources') }
export async function fetchGA4Devices()      { return get('/ga4/devices') }
export async function fetchGA4Trend()        { return get('/ga4/trend') }

export async function checkLinks(route) {
  const r = await fetch(`${BASE}/links?route=${encodeURIComponent(route)}`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export async function auditSEOSingle(route) {
  const r = await fetch(`${BASE}/seo/single?route=${encodeURIComponent(route)}`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export async function auditPageSpeed(url) {
  const r = await fetch(`${BASE}/pagespeed?url=${encodeURIComponent(url)}`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}
