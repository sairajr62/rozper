const BASE = '/api'
const OPTS = { cache: 'no-store' }

export async function checkHealth() {
  const r = await fetch(`${BASE}/health`, OPTS)
  return r.json()
}

export async function fetchSummary() {
  const r = await fetch(`${BASE}/summary`, OPTS)
  return r.json()
}

export async function auditPages() {
  const r = await fetch(`${BASE}/pages`, OPTS)
  return r.json()
}

export async function auditBlogs() {
  const r = await fetch(`${BASE}/blogs`, OPTS)
  return r.json()
}

export async function checkLinks(route) {
  const r = await fetch(`${BASE}/links?route=${encodeURIComponent(route)}`, OPTS)
  return r.json()
}

export async function auditSEO() {
  const r = await fetch(`${BASE}/seo`, OPTS)
  return r.json()
}

export async function auditSEOSingle(route) {
  const r = await fetch(`${BASE}/seo/single?route=${encodeURIComponent(route)}`, OPTS)
  return r.json()
}

export async function auditAnalytics() {
  const r = await fetch(`${BASE}/analytics`, OPTS)
  return r.json()
}

export async function auditAnalyticsAll() {
  const r = await fetch(`${BASE}/analytics/all`, OPTS)
  return r.json()
}
