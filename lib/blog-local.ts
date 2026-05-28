// Server-only helpers for blog posts authored in this repo as Markdown.
// Files live in `content/blog/*.md`. Output shape matches the WordPress
// posts in `lib/blog-api.ts`, so the same UI renders both transparently.
//
// Local posts are merged into the WP feed by `lib/blog-api.ts`. Local wins
// on slug collision (an override mechanism).

import fs from "fs"
import path from "path"
import type { BlogPost, BlogPostDetail, BlogTerm } from "./blog-api"

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")

// ─── Frontmatter parser (minimal YAML subset) ────────────────────────────

type Frontmatter = {
  title?: string
  slug?: string
  excerpt?: string
  seoTitle?: string
  seoDescription?: string
  category?: string
  tags?: string[]
  author?: string
  publishDate?: string
  modified?: string
  readingTime?: string
  featuredImage?: string
}

function unquote(s: string): string {
  return s.replace(/^["']|["']$/g, "")
}

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  if (!raw.startsWith("---")) return { data: {}, body: raw }
  const end = raw.indexOf("\n---", 3)
  if (end === -1) return { data: {}, body: raw }
  const header = raw.slice(3, end).trim()
  const body = raw.slice(end + 4).replace(/^\r?\n/, "")

  const data: Record<string, unknown> = {}
  const lines = header.split(/\r?\n/)
  let i = 0
  while (i < lines.length) {
    const line = lines[i]!
    const m = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/)
    if (!m) {
      i++
      continue
    }
    const key = m[1]!
    const val = m[2]!.trim()
    if (val === "") {
      // Either a multi-line list (`- item` lines) or an empty value.
      const arr: string[] = []
      i++
      while (i < lines.length && /^\s*-\s+/.test(lines[i]!)) {
        arr.push(unquote(lines[i]!.replace(/^\s*-\s+/, "").trim()))
        i++
      }
      data[key] = arr
      continue
    }
    if (/^\[.*\]$/.test(val)) {
      data[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => unquote(s.trim()))
        .filter(Boolean)
    } else {
      data[key] = unquote(val)
    }
    i++
  }
  return { data: data as Frontmatter, body }
}

// ─── Minimal Markdown → HTML ─────────────────────────────────────────────
// Supports: headings, paragraphs, ul/ol lists, blockquote, hr, bold,
// italic, links, inline code, inline images. Trusted input (we write it).

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function inlineMd(s: string): string {
  let out = s
  // Inline code first so its contents aren't touched by other rules.
  out = out.replace(
    /`([^`]+)`/g,
    (_m, code: string) =>
      `<code class="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.92em]">${escapeHtml(code)}</code>`,
  )
  // Inline images
  out = out.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_m, alt: string, url: string) =>
      `<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" />`,
  )
  // Links
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, text: string, url: string) =>
      `<a href="${escapeHtml(url)}">${text}</a>`,
  )
  // Bold
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  // Italic (single * or _ — guard against bold/underscore-in-id cases)
  out = out.replace(/(^|[^*])\*([^*\s][^*]*[^*\s]|[^*\s])\*(?!\*)/g, "$1<em>$2</em>")
  out = out.replace(/(^|[^_])_([^_\s][^_]*[^_\s]|[^_\s])_(?!_)/g, "$1<em>$2</em>")
  return out
}

function mdToHtml(md: string, opts: { skipFirstH1?: boolean } = {}): string {
  const lines = md.split(/\r?\n/)
  const out: string[] = []
  let firstH1Skipped = false
  let i = 0
  while (i < lines.length) {
    const line = lines[i]!

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      out.push("<hr />")
      i++
      continue
    }

    // Heading
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      const level = h[1]!.length
      const text = h[2]!.trim()
      if (level === 1 && opts.skipFirstH1 && !firstH1Skipped) {
        firstH1Skipped = true
        i++
        continue
      }
      out.push(`<h${level}>${inlineMd(text)}</h${level}>`)
      i++
      continue
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i]!)) {
        buf.push(lines[i]!.replace(/^>\s?/, ""))
        i++
      }
      out.push(`<blockquote><p>${inlineMd(buf.join(" "))}</p></blockquote>`)
      continue
    }

    // Unordered list
    if (/^\s*-\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*-\s+/.test(lines[i]!)) {
        items.push(`<li>${inlineMd(lines[i]!.replace(/^\s*-\s+/, ""))}</li>`)
        i++
      }
      out.push(`<ul>${items.join("")}</ul>`)
      continue
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i]!)) {
        items.push(`<li>${inlineMd(lines[i]!.replace(/^\s*\d+\.\s+/, ""))}</li>`)
        i++
      }
      out.push(`<ol>${items.join("")}</ol>`)
      continue
    }

    // Blank line: skip
    if (/^\s*$/.test(line)) {
      i++
      continue
    }

    // Paragraph: collect until blank line or block start
    const buf: string[] = [line]
    i++
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]!) &&
      !/^(#|>|---+\s*$|\s*-\s+|\s*\d+\.\s+)/.test(lines[i]!)
    ) {
      buf.push(lines[i]!)
      i++
    }
    out.push(`<p>${inlineMd(buf.join(" "))}</p>`)
  }
  return out.join("\n")
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function stableHash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0
  return h
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return "RZ"
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
}

function formatDateLabel(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function stripHtmlAndCondense(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
}

function fileToPost(filename: string): BlogPostDetail | null {
  try {
    const filePath = path.join(CONTENT_DIR, filename)
    const raw = fs.readFileSync(filePath, "utf8")
    const { data, body } = parseFrontmatter(raw)

    const slug = data.slug || filename.replace(/\.md$/, "")
    const title = data.title || slug
    // Skip a leading H1 in the body if frontmatter already has the title,
    // so the post page doesn't render the title twice.
    const contentHtml = mdToHtml(body, { skipFirstH1: !!data.title })

    const wordCount = body
      .replace(/[#*_>\-]/g, " ")
      .split(/\s+/)
      .filter(Boolean).length
    const readMinutes = Math.max(1, Math.round(wordCount / 220))

    const isoDate = data.publishDate || new Date().toISOString().slice(0, 10)
    const date = new Date(isoDate).toISOString()
    const modified = data.modified
      ? new Date(data.modified).toISOString()
      : date

    const categories: BlogTerm[] = data.category
      ? [
          {
            id: 9000 + Math.abs(stableHash(data.category)) % 1000,
            name: data.category,
            slug: slugify(data.category),
          },
        ]
      : []
    const tags: BlogTerm[] = Array.isArray(data.tags)
      ? data.tags.map((t, idx) => ({
          id: 9500 + idx,
          name: t,
          slug: slugify(t),
        }))
      : []

    const authorName = data.author || "Shahid Kathawala"

    const stripped = stripHtmlAndCondense(contentHtml)

    return {
      // Negative IDs distinguish local posts from WordPress posts (which
      // are always positive).
      id: -Math.abs(stableHash(slug)) - 1,
      slug,
      link: `/blog/${slug}`,
      title,
      excerpt: data.excerpt || stripped.slice(0, 200),
      date,
      modified,
      dateLabel: formatDateLabel(date),
      readMinutes,
      author: {
        id: 0,
        name: authorName,
        initials: initialsFromName(authorName),
      },
      featuredImage: data.featuredImage
        ? { src: data.featuredImage, alt: title }
        : undefined,
      categories,
      tags,
      seoTitle: data.seoTitle,
      seoDescription:
        data.seoDescription || data.excerpt || stripped.slice(0, 160),
      contentHtml,
    }
  } catch (err) {
    console.error(`blog-local: failed to load ${filename}`, err)
    return null
  }
}

function dirExists(): boolean {
  try {
    return fs.statSync(CONTENT_DIR).isDirectory()
  } catch {
    return false
  }
}

// ─── Public API ──────────────────────────────────────────────────────────

export function loadAllLocalPosts(): BlogPostDetail[] {
  if (!dirExists()) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .map(fileToPost)
    .filter((p): p is BlogPostDetail => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function loadLocalPostBySlug(slug: string): BlogPostDetail | null {
  if (!dirExists()) return null
  const direct = path.join(CONTENT_DIR, `${slug}.md`)
  if (fs.existsSync(direct)) {
    return fileToPost(`${slug}.md`)
  }
  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.toLowerCase().endsWith(".md")) continue
    const post = fileToPost(file)
    if (post && post.slug === slug) return post
  }
  return null
}

export function loadAllLocalSlugs(): string[] {
  return loadAllLocalPosts().map((p) => p.slug)
}

// Convenience downcast for listing views — drops contentHtml.
export function toListing(post: BlogPostDetail): BlogPost {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { contentHtml: _unused, ...rest } = post
  return rest
}
