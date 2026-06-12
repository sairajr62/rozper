// Blog API — local Markdown only.
// All posts come from content/blog/*.md via lib/blog-local.ts.
// WordPress fetching has been removed.

// ─── Types exposed to the app ─────────────────────────────────────────────

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
  featuredImageFit?: "cover" | "contain"
  featuredImagePosition?: string
  categories: BlogTerm[]
  tags: BlogTerm[]
  seoTitle?: string
  seoDescription?: string
}

export type BlogPostDetail = BlogPost & { contentHtml: string }

// ─── Public API ──────────────────────────────────────────────────────────

export async function fetchAllPosts(): Promise<{
  posts: BlogPost[]
  total: number
}> {
  const { loadAllLocalPosts } = await import("./blog-local")
  const posts = loadAllLocalPosts()
  return { posts, total: posts.length }
}

export async function fetchPostBySlug(
  slug: string,
): Promise<BlogPostDetail | null> {
  const { loadLocalPostBySlug } = await import("./blog-local")
  return loadLocalPostBySlug(slug)
}

export async function fetchRelatedPosts(
  post: BlogPostDetail,
  limit = 3,
): Promise<BlogPost[]> {
  const { loadAllLocalPosts } = await import("./blog-local")
  const all = loadAllLocalPosts().filter((p) => p.slug !== post.slug)
  const catNames = new Set(post.categories.map((c) => c.name))

  const sameCat = all.filter((p) =>
    p.categories.some((c) => catNames.has(c.name)),
  )
  const pool = sameCat.length >= limit ? sameCat : [...sameCat, ...all]

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

export async function fetchAllSlugs(): Promise<string[]> {
  const { loadAllLocalSlugs } = await import("./blog-local")
  return loadAllLocalSlugs()
}

// Kept for any remaining call-sites that import FetchPostsOptions.
export type FetchPostsOptions = {
  page?: number
  perPage?: number
  search?: string
  categories?: number[]
}
