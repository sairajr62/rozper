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
