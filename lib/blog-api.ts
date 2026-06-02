// Server-side client for the Rozper WordPress REST API.
// All fetches use Next.js ISR caching via the `next.revalidate` option.
//
// Posts authored in this repo as Markdown (under `content/blog/*.md`) are
// merged in by the public helpers below — see `lib/blog-local.ts`. Local
// posts take precedence on slug collision so a `.md` file can override a
// WordPress post if needed.

import fs from "node:fs"
import path from "node:path"

const API_BASE =
  process.env.NEXT_PUBLIC_WP_API_URL ?? "https://www.rozper.com/wp-json/wp/v2"
const REVALIDATE_SECONDS = 60 * 30 // 30 min

// Local cache of WordPress posts (raw payloads), produced by
// `scripts/sync-wp-blogs.mjs`. Reading from this file means the live site
// doesn't hit the flaky WP API on every request — which removes the
// ECONNRESET / ">2MB can not be cached" runtime errors entirely. The WP
// fetch helpers below remain as a fallback for when the cache is absent.
const WP_CACHE_FILE = path.join(
  process.cwd(),
  "content",
  "wp-cache",
  "posts-raw.json",
)

let _rawCache: RawPost[] | null = null

function loadCachedRawPosts(): RawPost[] {
  if (_rawCache) return _rawCache
  try {
    const raw = fs.readFileSync(WP_CACHE_FILE, "utf8")
    const parsed = JSON.parse(raw)
    _rawCache = Array.isArray(parsed) ? (parsed as RawPost[]) : []
  } catch {
    _rawCache = []
  }
  return _rawCache
}

function cachedPostsNormalized(): BlogPostDetail[] {
  return loadCachedRawPosts()
    .map(safeNormalize)
    .filter((p): p is BlogPostDetail => p !== null)
}

// ─── Raw types (subset of what the WP REST API returns) ──────────────────

type Rendered = { rendered: string }

type RawAuthor = {
  id: number
  name: string
  description?: string
  avatar_urls?: Record<string, string>
  link?: string
}

type RawMediaSize = {
  source_url: string
  width: number
  height: number
}

type RawMedia = {
  id: number
  source_url: string
  alt_text?: string
  media_details?: {
    sizes?: Record<string, RawMediaSize>
  }
}

type RawTerm = {
  id: number
  name: string
  slug: string
  taxonomy: string
}

type RawPost = {
  id: number
  slug: string
  date: string
  modified: string
  link: string
  title: Rendered
  excerpt: Rendered
  content?: Rendered
  yoast_head_json?: {
    title?: string
    description?: string
    og_image?: Array<{ url: string }>
  }
  _embedded?: {
    author?: RawAuthor[]
    ["wp:featuredmedia"]?: RawMedia[]
    ["wp:term"]?: RawTerm[][]
  }
}

// ─── Normalized types exposed to the app ─────────────────────────────────

export type BlogTerm = { id: number; name: string; slug: string }

export type BlogAuthor = {
  id: number
  name: string
  initials: string
  avatar?: string
  bio?: string
}

export type BlogImage = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type BlogPost = {
  id: number
  slug: string
  link: string
  title: string
  excerpt: string
  date: string
  modified: string
  dateLabel: string
  readMinutes: number
  author: BlogAuthor
  featuredImage?: BlogImage
  categories: BlogTerm[]
  tags: BlogTerm[]
  seoTitle?: string
  seoDescription?: string
}

export type BlogPostDetail = BlogPost & { contentHtml: string }

// ─── Helpers ─────────────────────────────────────────────────────────────

function decodeEntities(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim()
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "??"
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
}

function estimateReadMinutes(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

// Some _embedded entries can come back as WP REST error objects
// (e.g. `{code, message, data}`) instead of the expected shape — for
// example when an author's user ID is hidden. Treat those as "missing".
function isWpError(x: unknown): boolean {
  return (
    !!x &&
    typeof x === "object" &&
    "code" in (x as Record<string, unknown>) &&
    "message" in (x as Record<string, unknown>)
  )
}

function normalizePost(raw: RawPost): BlogPostDetail {
  const rawAuthor = raw._embedded?.author?.[0]
  const author = rawAuthor && !isWpError(rawAuthor) ? rawAuthor : undefined

  const rawMedia = raw._embedded?.["wp:featuredmedia"]?.[0]
  const media = rawMedia && !isWpError(rawMedia) ? rawMedia : undefined

  const termGroups = raw._embedded?.["wp:term"] ?? []

  const categories: BlogTerm[] = []
  const tags: BlogTerm[] = []
  for (const group of termGroups) {
    if (!Array.isArray(group)) continue
    for (const term of group) {
      if (!term || isWpError(term) || !term.taxonomy) continue
      const t: BlogTerm = {
        id: term.id,
        name: decodeEntities(term.name ?? ""),
        slug: term.slug,
      }
      if (term.taxonomy === "category") categories.push(t)
      else if (term.taxonomy === "post_tag") tags.push(t)
    }
  }

  const contentHtml = raw.content?.rendered ?? ""
  const excerptText = stripHtml(raw.excerpt?.rendered ?? "")
  const titleText = decodeEntities(raw.title?.rendered ?? "Untitled")

  const sizes = media?.media_details?.sizes
  const chosen =
    sizes?.["large"] ??
    sizes?.["medium_large"] ??
    sizes?.["medium"] ??
    (media?.source_url
      ? {
          source_url: media.source_url,
          width: undefined as unknown as number,
          height: undefined as unknown as number,
        }
      : undefined)

  const featuredImage: BlogImage | undefined =
    media && chosen
      ? {
          src: chosen.source_url,
          alt: media.alt_text || titleText,
          width: chosen.width,
          height: chosen.height,
        }
      : undefined

  const authorName = author?.name ? decodeEntities(author.name) : ""
  const resolvedAuthor: BlogAuthor = authorName
    ? {
        id: author!.id,
        name: authorName,
        initials: initialsFromName(authorName),
        avatar:
          author!.avatar_urls?.["96"] ??
          author!.avatar_urls?.["48"] ??
          author!.avatar_urls?.["24"],
        bio: author!.description ? stripHtml(author!.description) : undefined,
      }
    : {
        id: 0,
        name: "Shahid Kathawala",
        initials: "SK",
      }

  return {
    id: raw.id,
    slug: raw.slug,
    link: raw.link,
    title: titleText,
    excerpt: excerptText,
    date: raw.date,
    modified: raw.modified,
    dateLabel: formatDate(raw.date),
    readMinutes: estimateReadMinutes(contentHtml || excerptText),
    author: resolvedAuthor,
    featuredImage,
    categories,
    tags,
    seoTitle: raw.yoast_head_json?.title,
    seoDescription:
      raw.yoast_head_json?.description ?? excerptText.slice(0, 160),
    contentHtml,
  }
}

function safeNormalize(raw: RawPost): BlogPostDetail | null {
  try {
    return normalizePost(raw)
  } catch (err) {
    console.error(
      `blog-api: failed to normalize post id=${raw?.id} slug=${raw?.slug}`,
      err,
    )
    return null
  }
}

async function wpFetch<T>(
  path: string,
  init?: { revalidate?: number },
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: init?.revalidate ?? REVALIDATE_SECONDS },
  })
  if (!res.ok) {
    throw new Error(`Rozper WP fetch failed: ${res.status} ${path}`)
  }
  return (await res.json()) as T
}

// ─── Public API ──────────────────────────────────────────────────────────

export type FetchPostsOptions = {
  page?: number
  perPage?: number
  search?: string
  categories?: number[]
}

export async function fetchPosts(
  opts: FetchPostsOptions = {},
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  const params = new URLSearchParams()
  params.set("per_page", String(opts.perPage ?? 12))
  params.set("page", String(opts.page ?? 1))
  params.set("_embed", "author,wp:featuredmedia,wp:term")
  if (opts.search) params.set("search", opts.search)
  if (opts.categories?.length)
    params.set("categories", opts.categories.join(","))

  const url = `/posts?${params.toString()}`
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  })
  if (!res.ok) {
    throw new Error(`Rozper WP fetch failed: ${res.status} ${url}`)
  }
  const total = Number(res.headers.get("x-wp-total") ?? "0")
  const totalPages = Number(res.headers.get("x-wp-totalpages") ?? "0")
  const raw = (await res.json()) as RawPost[]
  const posts = raw
    .map(safeNormalize)
    .filter((p): p is BlogPostDetail => p !== null)
  return { posts, total, totalPages }
}

/**
 * Return all posts (local Markdown + WordPress) sorted by date descending.
 *
 * Strategy:
 *  1. Local .md posts always win on slug collision.
 *  2. The static WP cache (content/wp-cache/posts-raw.json) provides a fast,
 *     always-available base covering all historical posts.
 *  3. We additionally fetch page 1 of the live WP API to pick up any NEW posts
 *     published after the last cache sync — without reading 2000+ posts on
 *     every request. Live data overwrites the cached entry for the same slug.
 *  4. If the live API is unreachable, the static cache silently covers us.
 *
 * This means new WordPress posts appear automatically within the ISR window
 * (30 min, set in app/blog/page.tsx) without a manual cache sync + redeploy.
 */
export async function fetchAllPosts(): Promise<{
  posts: BlogPost[]
  total: number
}> {
  // Local .md posts — always fresh, win on slug collision.
  const localPosts = (await import("./blog-local")).loadAllLocalPosts()
  const localSlugs = new Set(localPosts.map((p) => p.slug))

  // Build a base map from the static cache (no network, always fast).
  const baseBySlug = new Map(
    cachedPostsNormalized()
      .filter((p) => !localSlugs.has(p.slug))
      .map((p) => [p.slug, p]),
  )

  // Overlay the newest posts from the live WP API (page 1 only = ≤100 posts).
  // We fetch WITHOUT _embed to keep the response small (avoids the Vercel
  // ">2MB can not be cached" warning caused by embedded media/terms).
  // For posts already in the static cache: the richer cached version is kept.
  // For truly new posts not yet in the cache: lightweight metadata is shown
  // immediately, and their full data appears after the next sync-wp-blogs run.
  // The 30-min ISR window on the blog page controls how often this fires.
  try {
    const params = new URLSearchParams()
    params.set("per_page", "100")
    params.set("page", "1")
    // _fields limits payload to only what normalizePost needs without embeds
    params.set("_fields", "id,slug,date,modified,link,title,excerpt,author,yoast_head_json")

    const res = await fetch(`${API_BASE}/posts?${params.toString()}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (res.ok) {
      const raw = (await res.json()) as RawPost[]
      for (const r of raw) {
        if (!r.slug || localSlugs.has(r.slug)) continue
        if (baseBySlug.has(r.slug)) {
          // Post already in cache — no update needed (cache has richer data).
          continue
        }
        // Truly new post not yet in the cache: normalise with what we have.
        // Author name defaults to "Rozper Team" since _embed is not present.
        const norm = safeNormalize(r)
        if (norm) baseBySlug.set(norm.slug, norm)
      }
    }
  } catch {
    // Live API unavailable — static cache is the complete fallback, no action needed.
  }

  const combined = [...localPosts, ...baseBySlug.values()].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return { posts: combined, total: combined.length }
}

export async function fetchPostBySlug(
  slug: string,
): Promise<BlogPostDetail | null> {
  // Local posts win on slug collision.
  const local = (await import("./blog-local")).loadLocalPostBySlug(slug)
  if (local) return local

  // Then the synced cache.
  const cachedRaw = loadCachedRawPosts().find((p) => p.slug === slug)
  if (cachedRaw) return safeNormalize(cachedRaw)

  // Finally, live WP as a fallback.
  const params = new URLSearchParams()
  params.set("slug", slug)
  params.set("_embed", "author,wp:featuredmedia,wp:term")
  const raw = await wpFetch<RawPost[]>(`/posts?${params.toString()}`)
  if (!raw.length) return null
  return safeNormalize(raw[0]!)
}

export async function fetchRelatedPosts(
  post: BlogPostDetail,
  limit = 3,
): Promise<BlogPost[]> {
  const catIds = new Set(post.categories.map((c) => c.id))

  // Prefer the synced cache: same-category posts, newest first.
  const cached = cachedPostsNormalized().filter((p) => p.id !== post.id)
  if (cached.length) {
    const sameCat = cached
      .filter((p) => p.categories.some((c) => catIds.has(c.id)))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const pool = sameCat.length >= limit ? sameCat : [...sameCat, ...cached]
    // de-dupe by slug while preserving order
    const seen = new Set<string>()
    const out: BlogPost[] = []
    for (const p of pool) {
      if (!seen.has(p.slug)) {
        seen.add(p.slug)
        out.push(p)
      }
      if (out.length >= limit) break
    }
    return out
  }

  // Fallback to live WP.
  const params = new URLSearchParams()
  params.set("per_page", String(limit + 1))
  params.set("_embed", "author,wp:featuredmedia,wp:term")
  params.set("exclude", String(post.id))
  if (catIds.size) params.set("categories", [...catIds].join(","))
  try {
    const raw = await wpFetch<RawPost[]>(`/posts?${params.toString()}`)
    return raw
      .map(safeNormalize)
      .filter((p): p is BlogPostDetail => p !== null)
      .slice(0, limit)
  } catch {
    return []
  }
}

export async function fetchAllSlugs(): Promise<string[]> {
  // Used by generateStaticParams — must include every slug that has a page.
  const localSlugs = (await import("./blog-local")).loadAllLocalSlugs()
  const slugSet = new Set(localSlugs)

  // Add every slug from the static cache (no network, always available).
  for (const p of loadCachedRawPosts()) {
    if (p.slug) slugSet.add(p.slug)
  }

  // Also fetch page 1 of the live API to pick up slugs for brand-new posts
  // not yet in the static cache. ISR handles new posts beyond page 1 dynamically.
  try {
    const params = new URLSearchParams()
    params.set("per_page", "100")
    params.set("page", "1")
    params.set("_fields", "slug")
    const res = await fetch(`${API_BASE}/posts?${params.toString()}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS * 4 },
    })
    if (res.ok) {
      const items = (await res.json()) as Array<{ slug: string }>
      for (const item of items) {
        if (item.slug) slugSet.add(item.slug)
      }
    }
  } catch {
    // Static cache covers all known slugs; new posts are handled by ISR fallback.
  }

  return [...slugSet]
}
