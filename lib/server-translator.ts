/**
 * Free, unofficial Google Translate endpoint (translate.googleapis.com).
 * No API key, no SLA — Google can rate-limit or block this at any time.
 * Cached in-memory per server instance plus the Next.js Data Cache (7 days)
 * so a given string+locale pair is only ever translated once across deploys.
 */

const ENDPOINT = "https://translate.googleapis.com/translate_a/single"
const CACHE_SECONDS = 60 * 60 * 24 * 7 // 7 days, matches the SSR response cache
const FETCH_TIMEOUT_MS = 6000 // the free endpoint has no SLA — a slow/hung call must not hang the whole page

const memoryCache = new Map<string, string>()

function cacheKey(text: string, targetLocale: string): string {
  return `${targetLocale}:${text}`
}

function parseSingle(json: unknown): string | null {
  try {
    const arr = json as unknown[]
    const segments = arr[0] as unknown[]
    if (!Array.isArray(segments)) return null
    return segments.map((seg) => (Array.isArray(seg) ? seg[0] : "")).join("")
  } catch {
    return null
  }
}

/** Translates a single string. Returns the original string unchanged on any failure. */
export async function serverTranslate(text: string, targetLocale: string): Promise<string> {
  if (!text || !text.trim() || targetLocale === "en") return text

  const key = cacheKey(text, targetLocale)
  const cached = memoryCache.get(key)
  if (cached) return cached

  const url = `${ENDPOINT}?client=gtx&sl=en&tl=${encodeURIComponent(targetLocale)}&dt=t&q=${encodeURIComponent(text)}`

  try {
    const res = await fetch(url, {
      next: { revalidate: CACHE_SECONDS },
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
    if (!res.ok) return text
    const json = await res.json()
    const translated = parseSingle(json)
    if (!translated) return text
    memoryCache.set(key, translated)
    return translated
  } catch {
    return text
  }
}

const BATCH_CONCURRENCY = 8

/**
 * Translates many strings for one locale. The free endpoint does NOT
 * actually support multiple `q=` params per request (only the first is
 * honored, despite it accepting the extra params without error) — so this
 * fires one request per uncached string, capped at a fixed concurrency to
 * keep round trips bounded without hammering the endpoint.
 */
export async function serverTranslateBatch(
  texts: string[],
  targetLocale: string,
): Promise<Map<string, string>> {
  const result = new Map<string, string>()
  if (targetLocale === "en") {
    for (const t of texts) result.set(t, t)
    return result
  }

  const uncached: string[] = []
  for (const t of texts) {
    if (!t || !t.trim()) {
      result.set(t, t)
      continue
    }
    const cached = memoryCache.get(cacheKey(t, targetLocale))
    if (cached) result.set(t, cached)
    else uncached.push(t)
  }
  if (uncached.length === 0) return result

  let cursor = 0
  async function worker() {
    while (cursor < uncached.length) {
      const text = uncached[cursor++]
      result.set(text, await serverTranslate(text, targetLocale))
    }
  }
  await Promise.all(Array.from({ length: Math.min(BATCH_CONCURRENCY, uncached.length) }, worker))

  return result
}
