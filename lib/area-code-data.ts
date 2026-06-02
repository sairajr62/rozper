// Server-only helper — reads area-code markdown files and returns structured data.
// Falls back to generated data for codes that exist in the static map but have no markdown.

import fs from "node:fs"
import path from "node:path"
import {
  AREA_CODES_BY_STATE,
  CODE_TO_STATE,
  stateToSlug,
  slugToState,
  getCodesByStateSlug as staticGetCodesBySlug,
  getAllStateSlugs as staticGetAllStateSlugs,
  getStateByCode,
} from "./area-codes-static"

export { stateToSlug, slugToState, getStateByCode } from "./area-codes-static"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

// ─── Types ────────────────────────────────────────────────────────────────

export type AreaCodeFAQ = {
  question: string
  answer: string
}

export type AreaCodeMeta = {
  code: string      // "215"
  slug: string      // "215-area-code"
  city: string      // "Philadelphia"
  state: string     // "Pennsylvania"
  stateSlug: string // "pennsylvania"
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

// ─── Frontmatter parser ───────────────────────────────────────────────────

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
  const afterSep = title.replace(/^\d{3}\s+Area\s+Code\s*[:|–—|]\s*/i, "")
  if (!afterSep || afterSep === title) return ""
  let city = afterSep
    .replace(/^Get\s+a\s+Virtual\s+/i, "")
    .replace(/^Get\s+a\s+/i, "")
    .replace(/^Buy\s+a\s+/i, "")
    .replace(/^Virtual\s+/i, "")
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

const STATE_NAMES = new Set(Object.keys(AREA_CODES_BY_STATE))

function extractState(tags: string[]): string {
  for (const tag of tags) {
    if (STATE_NAMES.has(tag)) return tag
  }
  return ""
}

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

// Cache whether the content/blog directory exists to avoid repeated stat calls
let _blogDirExists: boolean | null = null
function blogDirExists(): boolean {
  if (_blogDirExists === null) {
    try { fs.statSync(BLOG_DIR); _blogDirExists = true } catch { _blogDirExists = false }
  }
  return _blogDirExists
}

// Cache the set of existing markdown filenames to avoid per-file stat overhead
let _existingFiles: Set<string> | null = null
function getExistingFiles(): Set<string> {
  if (_existingFiles === null) {
    try {
      _existingFiles = new Set(fs.readdirSync(BLOG_DIR).filter(isAreaCodeFile))
    } catch {
      _existingFiles = new Set()
    }
  }
  return _existingFiles
}

function isAreaCodeFile(f: string): boolean {
  return /^\d{3}-area-code\.md$/.test(f)
}

function loadFile(filename: string): AreaCodeData | null {
  if (!blogDirExists()) return null
  if (!getExistingFiles().has(filename)) return null
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8")
    const { data, body } = parseFM(raw)
    const slug = String(data.slug ?? filename.replace(/\.md$/, ""))
    const code = slug.replace(/-area-code$/, "")
    const title = String(data.title ?? "")
    const tags = (data.tags as string[]) ?? []
    const state = extractState(tags)

    return {
      code,
      slug,
      title,
      city: extractCity(title),
      state,
      stateSlug: stateToSlug(state || CODE_TO_STATE[code] || ""),
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
  } catch {
    return null
  }
}

// ─── Fallback generator for codes without markdown ────────────────────────

function generateAreaCodeData(code: string): AreaCodeData {
  const state = CODE_TO_STATE[code] ?? ""
  const sSlug = stateToSlug(state)
  const stateStr = state || "the United States"
  const excerpt = `Get a ${code} area code virtual phone number for your ${stateStr} business. Establish local presence without a physical office — instant setup, 99.99% uptime, 24/7 support.`

  const faqs: AreaCodeFAQ[] = [
    {
      question: `What is the ${code} area code?`,
      answer: `The ${code} area code is assigned to ${stateStr} as part of the North American Numbering Plan (NANP). It serves businesses and residents in this region.`,
    },
    {
      question: `Can I get a virtual ${code} phone number?`,
      answer: `Yes. Rozper provides virtual phone numbers with the ${code} area code. You can receive calls, make outbound calls, and use all standard business phone features without a physical presence in the area.`,
    },
    {
      question: `How do I get a ${code} number with Rozper?`,
      answer: `Sign up for a Rozper plan, select the ${code} area code during setup, choose your preferred number, and you are live in under 10 minutes. No hardware or technician is required.`,
    },
    {
      question: `Why should I use a ${code} area code for my business?`,
      answer: `A local ${code} area code builds immediate trust with customers in ${stateStr}. Local numbers are answered at significantly higher rates than toll-free or out-of-state numbers, which directly improves call pickup and conversion rates.`,
    },
    {
      question: `Can I port my existing ${code} number to Rozper?`,
      answer: `Yes, Rozper supports number porting. You can transfer your existing ${code} number to Rozper and keep your current business number while gaining access to all Rozper features.`,
    },
  ]

  return {
    code,
    slug: `${code}-area-code`,
    title: `${code} Area Code Virtual Phone Numbers${state ? ` – ${state}` : ""}`,
    city: state,
    state,
    stateSlug: sSlug,
    excerpt,
    seoTitle: `${code} Area Code Virtual Phone Numbers | Rozper`,
    seoDescription: excerpt,
    cities: [],
    counties: [],
    overlays: [],
    faqs,
    readingTime: "5 min",
    publishDate: "",
    author: "Rozper",
  }
}

// ─── Public API ───────────────────────────────────────────────────────────

export function getAllAreaCodes(): AreaCodeMeta[] {
  const result: AreaCodeMeta[] = []
  for (const [state, codes] of Object.entries(AREA_CODES_BY_STATE)) {
    const sSlug = stateToSlug(state)
    for (const code of codes) {
      const md = loadFile(`${code}-area-code.md`)
      if (md) {
        result.push({
          code: md.code,
          slug: md.slug,
          city: md.city,
          state: md.state || state,
          stateSlug: md.stateSlug || sSlug,
          excerpt: md.excerpt,
        })
      } else {
        result.push({
          code,
          slug: `${code}-area-code`,
          city: state,
          state,
          stateSlug: sSlug,
          excerpt: `Get a ${code} area code virtual phone number for your ${state} business.`,
        })
      }
    }
  }
  return result
}

export function getAreaCodeData(code: string): AreaCodeData | null {
  const md = loadFile(`${code}-area-code.md`)
  if (md) return md
  if (CODE_TO_STATE[code]) return generateAreaCodeData(code)
  return null
}

export function getAreaCodeDataByState(stateSlug: string, code: string): AreaCodeData | null {
  const codes = staticGetCodesBySlug(stateSlug)
  if (!codes.includes(code)) return null
  return getAreaCodeData(code)
}

export function getCodesByStateSlug(stateSlug: string): string[] {
  return staticGetCodesBySlug(stateSlug)
}

export function getAllStateSlugs(): string[] {
  return staticGetAllStateSlugs()
}

export function getAllAreaCodeSlugs(): string[] {
  return Array.from(getExistingFiles()).map(f => f.replace(/-area-code\.md$/, ""))
}
