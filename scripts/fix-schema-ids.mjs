import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'
import path from 'path'

const ROOT = process.cwd()
const files = await glob('app/**/*.tsx', { cwd: ROOT })

let changed = 0

for (const rel of files) {
  const full = path.join(ROOT, rel)
  let src = readFileSync(full, 'utf8')
  const orig = src

  // Determine which replacements are needed
  const needsOrg  = src.includes('`${SITE_URL}/#organization/`') || src.includes('`${SITE_URL}#organization`')
  const needsWeb  = src.includes('`${SITE_URL}/#website/`')       || src.includes('`${SITE_URL}#website`')

  if (!needsOrg && !needsWeb) continue

  // Replace org patterns → ORG_ID variable
  src = src.replaceAll('`${SITE_URL}/#organization/`', 'ORG_ID')
  src = src.replaceAll('`${SITE_URL}#organization`',   'ORG_ID')

  // Replace website patterns → WEBSITE_ID variable
  src = src.replaceAll('`${SITE_URL}/#website/`', 'WEBSITE_ID')
  src = src.replaceAll('`${SITE_URL}#website`',   'WEBSITE_ID')

  // Update the import from @/lib/site to include ORG_ID / WEBSITE_ID
  const libImportRe = /import\s*\{([^}]+)\}\s*from\s*["']@\/lib\/site["']/
  const match = src.match(libImportRe)
  if (match) {
    let names = match[1].split(',').map(s => s.trim()).filter(Boolean)
    if (needsOrg  && !names.includes('ORG_ID'))   names.push('ORG_ID')
    if (needsWeb  && !names.includes('WEBSITE_ID')) names.push('WEBSITE_ID')
    src = src.replace(libImportRe, `import { ${names.join(', ')} } from "@/lib/site"`)
  } else if (needsOrg || needsWeb) {
    // File uses ORG_ID/WEBSITE_ID but has no lib/site import yet — inject one after the last import
    const adds = []
    if (needsOrg)  adds.push('ORG_ID')
    if (needsWeb)  adds.push('WEBSITE_ID')
    src = src.replace(/((?:^import[^\n]*\n)+)/m, `$1import { ${adds.join(', ')} } from "@/lib/site"\n`)
  }

  if (src !== orig) {
    writeFileSync(full, src, 'utf8')
    console.log('fixed:', rel)
    changed++
  }
}

console.log(`\nDone — ${changed} files updated.`)
