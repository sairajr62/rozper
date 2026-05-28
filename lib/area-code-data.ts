// Server-only helper that reads area-code markdown files and returns
// structured data for the /area-codes pages.

import fs from "node:fs"
import path from "node:path"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

// ─── Types ────────────────────────────────────────────────────────────────

export type AreaCodeFAQ = {
  question: string
  answer: string
}

export type AreaCodeMeta = {
  code: string   // "215"
  slug: string   // "215-area-code"
  city: string   // "Philadelphia"
  state: string  // "Pennsylvania"
  excerpt: string
}

export type AreaCodeData = AreaCodeMeta & {
  title: string
  seoTitle: string
  seoDescription: string
  cities: string[]
  counties: string[]
  overlays: string[]
  faqs: AreaCodeFAQ[]
  readingTime: string
  publishDate: string
  author: string
}

// ─── Frontmatter parser (mirrors blog-local.ts) ───────────────────────────

type FM = Record<string, string | string[]>

function unquote(s: string): string {
  return s.replace(/^["']|["']$/g, "")
}

function parseFM(raw: string): { data: FM; body: string } {
  if (!raw.startsWith("---")) return { data: {}, body: raw }
  const end = raw.indexOf("\n---", 3)
  if (end === -1) return { data: {}, body: raw }
  const header = raw.slice(3, end).trim()
  const body = raw.slice(end + 4).replace(/^\r?\n/, "")
  const data: FM = {}
  const lines = header.split(/\r?\n/)
  let i = 0
  while (i < lines.length) {
    const line = lines[i]!
    const m = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/)
    if (!m) { i++; continue }
    const key = m[1]!
    const val = m[2]!.trim()
    if (val === "") {
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
      data[key] = val.slice(1, -1).split(",").map(s => unquote(s.trim())).filter(Boolean)
    } else {
      data[key] = unquote(val)
    }
    i++
  }
  return { data, body }
}

// ─── Content extraction helpers ───────────────────────────────────────────

function extractCity(title: string): string {
  // Strip "NNN Area Code[:|–|—||]" prefix
  const afterSep = title.replace(/^\d{3}\s+Area\s+Code\s*[:|–—|]\s*/i, "")
  if (!afterSep || afterSep === title) return ""
  // Remove common lead-in phrases
  let city = afterSep
    .replace(/^Get\s+a\s+Virtual\s+/i, "")
    .replace(/^Get\s+a\s+/i, "")
    .replace(/^Buy\s+a\s+/i, "")
    .replace(/^Virtual\s+/i, "")
  // Remove trailing descriptor words
  city = city
    .replace(/\s+Virtual\s+Phone\s+Numbers?$/i, "")
    .replace(/\s+Virtual\s+Numbers?$/i, "")
    .replace(/\s+Business\s+Numbers?$/i, "")
    .replace(/\s+Phone\s+Numbers?$/i, "")
    .replace(/\s+Numbers?$/i, "")
    .replace(/\s+Phone$/i, "")
    .trim()
  return city
}

const STATE_NAMES = new Set([
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
])

function extractState(tags: string[]): string {
  for (const tag of tags) {
    if (STATE_NAMES.has(tag)) return tag
  }
  return ""
}

// Line-by-line bullet list extractor — robust against blank lines between heading and list
function extractBulletList(body: string, keyword: string): string[] {
  const lines = body.split("\n")
  let inSection = false
  const items: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!inSection) {
      if (trimmed.toLowerCase().includes(keyword.toLowerCase()) &&
        (trimmed.startsWith("**") || trimmed.startsWith("#"))) {
        inSection = true
      }
    } else {
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        items.push(trimmed.replace(/^[-*]\s+/, "").trim())
      } else if (items.length > 0 && trimmed && !trimmed.startsWith("-") && !trimmed.startsWith("*")) {
        break
      }
    }
  }
  return items
}

function extractOverlays(body: string, mainCode: string): string[] {
  const overlays: string[] = []
  for (const m of body.matchAll(/area code (\d{3}) was added as (?:a |an |the )?(?:second |third )?overlay/gi)) {
    if (m[1] && m[1] !== mainCode && !overlays.includes(m[1])) overlays.push(m[1])
  }
  return overlays
}

function extractFAQs(body: string): AreaCodeFAQ[] {
  const lines = body.split("\n")
  let inFAQ = false
  const faqs: AreaCodeFAQ[] = []
  let currentQ = ""
  const currentA: string[] = []

  const saveCurrentFAQ = () => {
    if (currentQ && currentA.length > 0) {
      faqs.push({ question: currentQ, answer: currentA.join(" ").trim() })
    }
    currentQ = ""
    currentA.length = 0
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (!inFAQ) {
      if (/^##\s+FAQ/i.test(trimmed)) inFAQ = true
      continue
    }
    if (/^##\s+[^#]/.test(trimmed) && !/^##\s+FAQ/i.test(trimmed)) break
    if (/^---/.test(trimmed)) break

    if (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.includes("?")) {
      saveCurrentFAQ()
      currentQ = trimmed.replace(/\*\*/g, "").trim()
    } else if (currentQ && trimmed) {
      currentA.push(trimmed)
    }
  }
  saveCurrentFAQ()
  return faqs
}

// ─── File loader ──────────────────────────────────────────────────────────

function isAreaCodeFile(f: string): boolean {
  return /^\d{3}-area-code\.md$/.test(f)
}

function loadFile(filename: string): AreaCodeData | null {
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8")
    const { data, body } = parseFM(raw)
    const slug = String(data.slug ?? filename.replace(/\.md$/, ""))
    const code = slug.replace(/-area-code$/, "")
    const title = String(data.title ?? "")
    const tags = (data.tags as string[]) ?? []

    return {
      code,
      slug,
      title,
      city: extractCity(title),
      state: extractState(tags),
      excerpt: String(data.excerpt ?? ""),
      seoTitle: String(data.seoTitle ?? title),
      seoDescription: String(data.seoDescription ?? data.excerpt ?? ""),
      cities: extractBulletList(body, "Cities covered"),
      counties: extractBulletList(body, "Counties covered"),
      overlays: extractOverlays(body, code),
      faqs: extractFAQs(body),
      readingTime: String(data.readingTime ?? "7 min"),
      publishDate: String(data.publishDate ?? ""),
      author: String(data.author ?? "Shahid Kathawala"),
    }
  } catch (err) {
    console.error(`area-code-data: failed to load ${filename}`, err)
    return null
  }
}

// ─── Public API ───────────────────────────────────────────────────────────

export function getAllAreaCodes(): AreaCodeMeta[] {
  try {
    return fs.readdirSync(BLOG_DIR)
      .filter(isAreaCodeFile)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(f => loadFile(f))
      .filter((d): d is AreaCodeData => d !== null)
      .map(({ code, slug, city, state, excerpt }) => ({ code, slug, city, state, excerpt }))
  } catch {
    return []
  }
}

export function getAreaCodeData(code: string): AreaCodeData | null {
  return loadFile(`${code}-area-code.md`)
}

export function getAllAreaCodeSlugs(): string[] {
  try {
    return fs.readdirSync(BLOG_DIR)
      .filter(isAreaCodeFile)
      .map(f => f.replace(/-area-code\.md$/, ""))
  } catch {
    return []
  }
}
