const BASE = '/api'

export async function checkHealth() {
  const r = await fetch(`${BASE}/health`)
  return r.json()
}

export async function fetchSummary() {
  const r = await fetch(`${BASE}/summary`)
  return r.json()
}

export async function auditPages() {
  const r = await fetch(`${BASE}/pages`)
  return r.json()
}

export async function auditBlogs() {
  const r = await fetch(`${BASE}/blogs`)
  return r.json()
}

export async function checkLinks(route) {
  const r = await fetch(`${BASE}/links?route=${encodeURIComponent(route)}`)
  return r.json()
}

export async function auditSEO() {
  const r = await fetch(`${BASE}/seo`)
  return r.json()
}

export async function auditSEOSingle(route) {
  const r = await fetch(`${BASE}/seo/single?route=${encodeURIComponent(route)}`)
  return r.json()
}

export async function auditAnalytics() {
  const r = await fetch(`${BASE}/analytics`)
  return r.json()
}

export async function auditAnalyticsAll() {
  const r = await fetch(`${BASE}/analytics/all`)
  return r.json()
}

export async function auditLeads() {
  const r = await fetch(`${BASE}/leads`)
  return r.json()
}

export async function auditBlogLinks() {
  const r = await fetch(`${BASE}/blog-links`)
  return r.json()
}

export async function fetchGA4Overview() {
  const r = await fetch(`${BASE}/ga4/overview`)
  return r.json()
}

export async function fetchGA4TopPages() {
  const r = await fetch(`${BASE}/ga4/top-pages`)
  return r.json()
}

export async function fetchGA4TrafficSources() {
  const r = await fetch(`${BASE}/ga4/traffic-sources`)
  return r.json()
}

export async function fetchGA4Devices() {
  const r = await fetch(`${BASE}/ga4/devices`)
  return r.json()
}

export async function fetchGA4Trend() {
  const r = await fetch(`${BASE}/ga4/trend`)
  return r.json()
}
