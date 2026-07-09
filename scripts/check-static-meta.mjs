// Checks that a static page's exported `metadata.title` / `metadata.description`
// (or generateMetadata's TITLE/DESCRIPTION consts) fall inside 50-60 / 150-160 chars.
// Usage: node scripts/check-static-meta.mjs app/about/page.tsx [more files...]
import fs from "fs"

function extractTitleDesc(src) {
  const constTitle = src.match(/const TITLE\s*=\s*['"]([^'"]*)['"]/)
  const constDesc = src.match(/const DESCRIPTION\s*=\s*((?:['"][^'"]*['"]\s*\+?\s*)+)/)
  if (constTitle || constDesc) {
    const desc = constDesc ? [...constDesc[1].matchAll(/['"]([^'"]*)['"]/g)].map(m => m[1]).join("") : null
    return { title: constTitle ? constTitle[1] : null, desc }
  }
  const metaBlockMatch = src.match(/export const metadata[\s\S]*?\n\}/)
  const block = metaBlockMatch ? metaBlockMatch[0] : src
  const titleMatch = block.match(/\btitle:\s*['"]([^'"]*)['"]/)
  const descMatch = block.match(/\bdescription:\s*((?:['"][^'"]*['"]\s*\+?\s*)+)/)
  const desc = descMatch ? [...descMatch[1].matchAll(/['"]([^'"]*)['"]/g)].map(m => m[1]).join("") : null
  return { title: titleMatch ? titleMatch[1] : null, desc }
}

let anyBad = false
for (const f of process.argv.slice(2)) {
  const src = fs.readFileSync(f, "utf8")
  const { title, desc } = extractTitleDesc(src)
  const tlen = title ? title.length : -1
  const dlen = desc ? desc.length : -1
  const tOk = title != null && tlen >= 50 && tlen <= 60
  const dOk = desc != null && dlen >= 150 && dlen <= 160
  if (!tOk || !dOk) anyBad = true
  console.log(`${f}\tT=${tlen}(${tOk ? "ok" : "BAD"})\tD=${dlen}(${dOk ? "ok" : "BAD"})\t${title}`)
}
process.exit(anyBad ? 1 : 0)
