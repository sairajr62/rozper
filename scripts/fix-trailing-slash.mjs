import fs from "fs"
import path from "path"

const root = "."
let totalFixed = 0

// Redirect source → final destination mappings (with trailing slash)
const redirectMap = {
  "'/solutions/finance'":   "'/solutions/financial-services/'",
  '"/solutions/finance"':   '"/solutions/financial-services/"',
  "'/solutions/retail'":    "'/solutions/retail-ecommerce/'",
  '"/solutions/retail"':    '"/solutions/retail-ecommerce/"',
  "'/solutions/saas'":      "'/solutions/saas-tech/'",
  '"/solutions/saas"':      '"/solutions/saas-tech/"',
  "'/solutions/smb'":       "'/solutions/small-business/'",
  '"/solutions/smb"':       '"/solutions/small-business/"',
  "'/solutions/enterprise-it'":  "'/solutions/enterprise-ucaas/'",
  '"/solutions/enterprise-it"':  '"/solutions/enterprise-ucaas/"',
  "'/products/contact-center/analytics'":             "'/products/contact-center/interaction-analytics/'",
  '"/products/contact-center/analytics"':             '"/products/contact-center/interaction-analytics/"',
  "'/products/unified-communications/sms-mms'":       "'/products/unified-communications/business-sms-mms/'",
  '"/products/unified-communications/sms-mms"':       '"/products/unified-communications/business-sms-mms/"',
  "'/products/unified-communications/business-phone'":         "'/products/unified-communications/business-phone-system/'",
  '"/products/unified-communications/business-phone"':         '"/products/unified-communications/business-phone-system/"',
  "'/products/unified-communications/video-meetings'":         "'/products/unified-communications/hd-video-meetings/'",
  '"/products/unified-communications/video-meetings"':         '"/products/unified-communications/hd-video-meetings/"',
  "'/products/unified-communications/phone-system'":           "'/products/unified-communications/hosted-phone-system/'",
  '"/products/unified-communications/phone-system"':           '"/products/unified-communications/hosted-phone-system/"',
}

function getAllFiles(dir, exts) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (["node_modules", ".next", "dist", ".git"].includes(entry.name)) continue
      files.push(...getAllFiles(full, exts))
    } else if (exts.some(e => entry.name.endsWith(e))) {
      files.push(full)
    }
  }
  return files
}

const files = getAllFiles(path.join(root, "app"), [".tsx", ".ts"])
  .concat(getAllFiles(path.join(root, "components"), [".tsx", ".ts"]))

for (const file of files) {
  let content = fs.readFileSync(file, "utf8")
  const original = content

  // 1. Apply redirect source → destination mappings
  for (const [from, to] of Object.entries(redirectMap)) {
    // Only replace in href context
    content = content.replaceAll("href: " + from, "href: " + to)
    content = content.replaceAll("href=" + from, "href=" + to)
  }

  // 2. Fix data-property hrefs: href: '/path' or href: "/path" (no trailing slash)
  // Single quotes
  content = content.replace(
    /href:\s*'(\/(?!api\/|images\/|icon)[^'#?]*[^'/#?])'/g,
    (_, p) => `href: '${p}/'`
  )
  // Double quotes (data property with colon — avoids JSX already fixed)
  content = content.replace(
    /href:\s+"(\/(?!api\/|images\/|icon)[^"#?]*[^"/#?])"/g,
    (_, p) => `href: "${p}/"`
  )

  // 3. Fix dynamic template literals
  // /blog/${slug}
  content = content.replace(/`\/blog\/\$\{([^}]+)\}`/g, (_, s) => `\`/blog/\${${s}}/\``)
  // /area-codes/${state}/${code}
  content = content.replace(
    /`\/area-codes\/\$\{([^}]+)\}\/\$\{([^}]+)\}`/g,
    (_, a, b) => `\`/area-codes/\${${a}}/\${${b}}/\``
  )
  // /country-code/${slug}/best-time-to-call
  content = content.replace(
    /`\/country-code\/\$\{([^}]+)\}\/best-time-to-call`/g,
    (_, s) => `\`/country-code/\${${s}}/best-time-to-call/\``
  )
  // /country-code/${slug}  (bare, no sub-path)
  content = content.replace(
    /`\/country-code\/\$\{([^}]+)\}`/g,
    (_, s) => `\`/country-code/\${${s}}/\``
  )
  // /country-code/${slug}/anything (other sub-paths already handled above)
  content = content.replace(
    /`\/country-code\/\$\{([^}]+)\}\/([^`/][^`]*[^`/])`/g,
    (_, s, sub) => `\`/country-code/\${${s}}/${sub}/\``
  )

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8")
    totalFixed++
    console.log("Fixed: " + file.replace(root + "/", "").replace(root + "\\", ""))
  }
}

console.log("\nTotal files fixed: " + totalFixed)
