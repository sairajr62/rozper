import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const ROOT = process.cwd()

// Map of file path → canonical URL path (with trailing slash)
const PAGES = {
  'app/pricing/page.tsx':                                              '/pricing/',
  'app/compare/page.tsx':                                             '/compare/',
  'app/products/ai/page.tsx':                                         '/products/ai/',
  'app/products/contact-center/page.tsx':                             '/products/contact-center/',
  'app/products/contact-center/agent-assist/page.tsx':                '/products/contact-center/agent-assist/',
  'app/products/contact-center/enterprise/page.tsx':                  '/products/contact-center/enterprise/',
  'app/products/contact-center/interaction-analytics/page.tsx':       '/products/contact-center/interaction-analytics/',
  'app/products/contact-center/omnichannel/page.tsx':                 '/products/contact-center/omnichannel/',
  'app/products/contact-center/outbound-dialer/page.tsx':             '/products/contact-center/outbound-dialer/',
  'app/products/contact-center/supervisor-tools/page.tsx':            '/products/contact-center/supervisor-tools/',
  'app/products/unified-communications/page.tsx':                     '/products/unified-communications/',
  'app/products/unified-communications/business-phone-system/page.tsx': '/products/unified-communications/business-phone-system/',
  'app/products/unified-communications/business-sms-mms/page.tsx':    '/products/unified-communications/business-sms-mms/',
  'app/products/unified-communications/customer-engagement/page.tsx': '/products/unified-communications/customer-engagement/',
  'app/products/unified-communications/hd-video-meetings/page.tsx':   '/products/unified-communications/hd-video-meetings/',
  'app/products/unified-communications/hosted-phone-system/page.tsx': '/products/unified-communications/hosted-phone-system/',
  'app/products/unified-communications/online-fax/page.tsx':          '/products/unified-communications/online-fax/',
  'app/products/unified-communications/team-chat/page.tsx':           '/products/unified-communications/team-chat/',
  'app/products/unified-communications/website-chatbot/page.tsx':     '/products/unified-communications/website-chatbot/',
  'app/features/ai-sentiment-analysis/page.tsx':                      '/features/ai-sentiment-analysis/',
  'app/features/ai-receptionist/page.tsx':                            '/features/ai-receptionist/',
  'app/features/ai-agent-assist/page.tsx':                            '/features/ai-agent-assist/',
  'app/features/call-recording/page.tsx':                             '/features/call-recording/',
  'app/features/conversation-intelligence/page.tsx':                  '/features/conversation-intelligence/',
  'app/products/ai/virtual-assistant/page.tsx':                       '/products/ai/virtual-assistant/',
  'app/products/ai/receptionist/page.tsx':                            '/products/ai/receptionist/',
  'app/products/ai/conversation-analytics/page.tsx':                  '/products/ai/conversation-analytics/',
  'app/products/ai-features/ai-assistant/page.tsx':                   '/products/ai-features/ai-assistant/',
  'app/sign-in/page.tsx':                                             '/sign-in/',
}

let changed = 0

for (const [rel, urlPath] of Object.entries(PAGES)) {
  const full = path.join(ROOT, rel)
  let src
  try { src = readFileSync(full, 'utf8') } catch { continue }
  const orig = src

  // If this page already has url: inside an openGraph block — skip
  if (/openGraph[\s\S]*?url\s*:/.test(src)) continue

  // Check if openGraph exists but lacks url
  if (!src.includes('openGraph')) {
    console.log('SKIP (no openGraph):', rel)
    continue
  }

  // Ensure SITE_URL is imported
  if (!src.includes('from "@/lib/site"') && !src.includes("from '@/lib/site'")) {
    src = src.replace(/(import[^\n]+\n)/, `$1import { SITE_URL } from "@/lib/site"\n`)
  } else if (!src.includes('SITE_URL')) {
    // Already imports from lib/site but doesn't include SITE_URL
    src = src.replace(
      /import\s*\{([^}]+)\}\s*from\s*["']@\/lib\/site["']/,
      (_, names) => {
        const list = names.split(',').map(s => s.trim()).filter(Boolean)
        if (!list.includes('SITE_URL')) list.unshift('SITE_URL')
        return `import { ${list.join(', ')} } from "@/lib/site"`
      }
    )
  }

  // Insert url: after openGraph: { or type: "website" line
  // Strategy: find `openGraph: {` and insert url right after the opening brace content
  src = src.replace(
    /(openGraph\s*:\s*\{[^}]*?)(type\s*:\s*["'][^"']+["'],?)/,
    `$1$2\n    url: \`\${SITE_URL}${urlPath}\`,`
  )

  if (src === orig) {
    // Fallback: insert url as first key in openGraph block
    src = src.replace(
      /openGraph\s*:\s*\{(\s*)/,
      `openGraph: {$1url: \`\${SITE_URL}${urlPath}\`,\n    `
    )
  }

  if (src !== orig) {
    writeFileSync(full, src, 'utf8')
    console.log('fixed:', rel)
    changed++
  } else {
    console.log('UNCHANGED (check manually):', rel)
  }
}

console.log(`\nDone — ${changed} files updated.`)
