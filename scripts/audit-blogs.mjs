import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BLOG_DIR = path.resolve(__dirname, "..", "content", "blog")

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw }
  const metaRaw = match[1]
  const body = match[2]
  const meta = {}
  let currentKey = null
  let inList = false
  for (const line of metaRaw.split("\n")) {
    const keyMatch = line.match(/^(\w[\w-]*):\s*(.*)$/)
    if (keyMatch && !line.startsWith("  ") && !line.startsWith("- ")) {
      currentKey = keyMatch[1]
      const val = keyMatch[2].replace(/^["']|["']$/g, "").trim()
      if (val === "") { meta[currentKey] = []; inList = true }
      else { meta[currentKey] = val; inList = false }
    } else if (inList && line.match(/^\s*- (.+)/)) {
      const item = line.match(/^\s*- (.+)/)[1].replace(/^["']|["']$/g, "").trim()
      if (!Array.isArray(meta[currentKey])) meta[currentKey] = []
      meta[currentKey].push(item)
    }
  }
  return { meta, body }
}

function countWords(body) {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/^\s*#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\s*>\s*/gm, "")
    .replace(/[|`_*#~\\]/g, " ")
    .replace(/---/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
}

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md")).sort()

const results = []

for (const file of files) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
  const { meta, body } = parseFrontmatter(raw)

  const wordCount = countWords(body)
  const seoTitle = meta.seoTitle || ""
  const seoDesc = meta.seoDescription || ""
  const author = meta.author || ""
  const keywords = meta.keywords || []

  const issues = []

  // Word count
  const wcLow = wordCount < 1500
  const wcHigh = wordCount > 1700
  const wcStatus = wcLow ? "LOW" : wcHigh ? "HIGH" : "OK"

  // SEO Title
  const titleLen = seoTitle.length
  let titleStatus = "OK"
  if (!seoTitle) titleStatus = "MISSING"
  else if (titleLen < 50) titleStatus = `SHORT (${titleLen})`
  else if (titleLen > 60) titleStatus = `LONG (${titleLen})`

  // SEO Description
  const descLen = seoDesc.length
  let descStatus = "OK"
  if (!seoDesc) descStatus = "MISSING"
  else if (descLen < 150) descStatus = `SHORT (${descLen})`
  else if (descLen > 160) descStatus = `LONG (${descLen})`

  // Author
  const authorStatus = author === "Shahid Kathawala" ? "OK" : `WRONG: "${author}"`

  // Keywords
  const kwStatus = Array.isArray(keywords) && keywords.length >= 5 ? "OK" : `FEW (${Array.isArray(keywords) ? keywords.length : 0})`

  // Inline images (count ![...] in body)
  const imgMatches = body.match(/!\[[^\]]*\]\([^)]+\)/g) || []
  const imgCount = imgMatches.length

  results.push({
    file,
    wordCount,
    wcStatus,
    titleLen,
    titleStatus,
    descLen,
    descStatus,
    authorStatus,
    kwStatus,
    imgCount,
  })
}

// Print report
console.log("=" .repeat(130))
console.log("BLOG AUDIT REPORT")
console.log("=" .repeat(130))
console.log(
  "File".padEnd(45),
  "Words".padEnd(8),
  "WC".padEnd(6),
  "Title".padEnd(14),
  "Desc".padEnd(14),
  "Author".padEnd(20),
  "KW".padEnd(8),
  "Imgs"
)
console.log("-".repeat(130))

for (const r of results) {
  const hasIssue = r.wcStatus !== "OK" || r.titleStatus !== "OK" || r.descStatus !== "OK" || r.authorStatus !== "OK" || r.kwStatus !== "OK"
  const flag = hasIssue ? "⚠" : " "
  console.log(
    (flag + " " + r.file).padEnd(45),
    String(r.wordCount).padEnd(8),
    r.wcStatus.padEnd(6),
    r.titleStatus.padEnd(14),
    r.descStatus.padEnd(14),
    r.authorStatus.padEnd(20),
    r.kwStatus.padEnd(8),
    r.imgCount
  )
}

console.log("\n")
console.log("ISSUES SUMMARY")
console.log("=".repeat(80))

const wcLow = results.filter(r => r.wcStatus === "LOW")
const wcHigh = results.filter(r => r.wcStatus === "HIGH")
const titleIssues = results.filter(r => r.titleStatus !== "OK")
const descIssues = results.filter(r => r.descStatus !== "OK")
const authorIssues = results.filter(r => r.authorStatus !== "OK")
const kwIssues = results.filter(r => r.kwStatus !== "OK")
const noImages = results.filter(r => r.imgCount === 0)
const fewImages = results.filter(r => r.imgCount > 0 && r.imgCount < 4)

if (wcLow.length) {
  console.log(`\n📉 WORD COUNT TOO LOW (<1500): ${wcLow.length} blogs`)
  wcLow.forEach(r => console.log(`   ${r.file} — ${r.wordCount} words`))
}
if (wcHigh.length) {
  console.log(`\n📈 WORD COUNT TOO HIGH (>1700): ${wcHigh.length} blogs`)
  wcHigh.forEach(r => console.log(`   ${r.file} — ${r.wordCount} words`))
}
if (titleIssues.length) {
  console.log(`\n🏷️  SEO TITLE ISSUES: ${titleIssues.length} blogs`)
  titleIssues.forEach(r => console.log(`   ${r.file} — ${r.titleStatus} | "${r.titleStatus.includes("MISSING") ? "(no title)" : r.titleLen + " chars"}`))
}
if (descIssues.length) {
  console.log(`\n📝 SEO DESCRIPTION ISSUES: ${descIssues.length} blogs`)
  descIssues.forEach(r => console.log(`   ${r.file} — ${r.descStatus}`))
}
if (authorIssues.length) {
  console.log(`\n👤 AUTHOR ISSUES: ${authorIssues.length} blogs`)
  authorIssues.forEach(r => console.log(`   ${r.file} — ${r.authorStatus}`))
}
if (kwIssues.length) {
  console.log(`\n🔑 KEYWORD ISSUES (need ≥5): ${kwIssues.length} blogs`)
  kwIssues.forEach(r => console.log(`   ${r.file} — ${r.kwStatus}`))
}
if (noImages.length) {
  console.log(`\n🖼️  NO INLINE IMAGES: ${noImages.length} blogs`)
  noImages.forEach(r => console.log(`   ${r.file}`))
}
if (fewImages.length) {
  console.log(`\n🖼️  FEW INLINE IMAGES (<4): ${fewImages.length} blogs`)
  fewImages.forEach(r => console.log(`   ${r.file} — ${r.imgCount} image(s)`))
}

console.log(`\n✅ Total blogs: ${results.length}`)
const clean = results.filter(r => r.wcStatus === "OK" && r.titleStatus === "OK" && r.descStatus === "OK" && r.authorStatus === "OK" && r.kwStatus === "OK" && r.imgCount >= 4)
console.log(`✅ Fully passing (all checks): ${clean.length}`)
