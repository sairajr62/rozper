/**
 * Sync WordPress blog posts into a local cache.
 *
 * Fetches every published post from the Rozper WordPress REST API (with
 * embedded author / media / terms) and writes the raw payloads to
 *   content/wp-cache/posts-raw.json
 *
 * The app (lib/blog-cache.ts + lib/blog-api.ts) reads this file at runtime, so
 * the live site no longer depends on the flaky WP API on every request — which
 * also eliminates the ECONNRESET / ">2MB can not be cached" errors.
 *
 * Run:  node scripts/sync-wp-blogs.mjs
 * (re-run whenever you publish new posts on rozper.com)
 */

import { writeFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, "..")
const API_BASE = "https://www.rozper.com/wp-json/wp/v2"
const OUT_FILE = join(PROJECT_ROOT, "content", "wp-cache", "posts-raw.json")
const PER_PAGE = 100
const MAX_PAGES = 20
const RETRIES = 4

async function fetchWithRetry(url) {
  let lastErr
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } })
      // 400 past the last page is WordPress's "no more pages" signal.
      if (res.status === 400) return { status: 400, data: [] }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      return { status: 200, data }
    } catch (err) {
      lastErr = err
      const wait = attempt * 1500
      console.warn(`  attempt ${attempt} failed (${err.message}); retrying in ${wait}ms...`)
      await new Promise((r) => setTimeout(r, wait))
    }
  }
  throw lastErr
}

async function main() {
  console.log("Syncing WordPress posts -> local cache...")
  const all = []
  const seen = new Set()

  for (let page = 1; page <= MAX_PAGES; page++) {
    const params = new URLSearchParams({
      per_page: String(PER_PAGE),
      page: String(page),
      _embed: "author,wp:featuredmedia,wp:term",
    })
    const url = `${API_BASE}/posts?${params.toString()}`
    console.log(`Fetching page ${page}...`)
    const { status, data } = await fetchWithRetry(url)
    if (status === 400 || !Array.isArray(data) || data.length === 0) break

    for (const post of data) {
      if (post && post.id != null && !seen.has(post.id)) {
        seen.add(post.id)
        all.push(post)
      }
    }
    if (data.length < PER_PAGE) break
  }

  // Sort newest first for deterministic output.
  all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  mkdirSync(dirname(OUT_FILE), { recursive: true })
  writeFileSync(OUT_FILE, JSON.stringify(all, null, 0), "utf8")

  const mb = (Buffer.byteLength(JSON.stringify(all)) / 1024 / 1024).toFixed(2)
  console.log(`\nDONE. Cached ${all.length} posts -> ${OUT_FILE} (${mb} MB)`)
}

main().catch((e) => {
  console.error("Sync failed:", e)
  process.exit(1)
})
