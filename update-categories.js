const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', 'rozper-main', 'content', 'blog')

const slugs = [
  'wholesale-did-numbers-providers','wholesale-voip-solutions','top-wholesale-voip',
  'top-voip-wholesale','wholesale-voip-routes','wholesale-voip-providers','wholesale-sip',
  'wholesale-voip-service-providers','wholesale-termination-voip','wholesale-call-termination-provider',
  'wholesale-voip','wholesale-termination-a-comprehensive-overview','wholesale-sip-termination-rates',
  'wholesale-voip-termination-india','wholesale-voice-termination','wholesale-voip-services',
  'wholesale-did-number','wholesale-voip-carrier-services','top-voip-wholesale-business',
  'voip-wholesale-carrier-list','mastering-wholesale-voip-rates','voip-wholesale-explained',
  'wholesale-voip-origination','voip-wholesale-service-providers','top-wholesale-voice-provider',
  'voip-wholesale-business','the-ultimate-guide-wholesale-voip-providers','wholesale-termination-rates',
  'wholesale-sip-trunk-services','understanding-wholesale-voip-routes','wholesale-az-voip-termination',
  'wholesale-did-numbers','voip-wholesale-service-provider','unlocking-the-potential-of-wholesale-voip',
  'wholesale-voice-services','wholesale-call-termination-providers','wholesale-voip-termination-providers',
  'best-wholesale-voip-service','wholesale-voip-minutes-providers-business','wholesale-voip-termination-carriers',
  'voice-wholesale-solutions','navigating-wholesale-sip-termination-providers','voice-termination-providers',
  'wholesale-call-termination','voip-wholesale-carriers','voip-wholesale-termination',
  'power-of-wholesale-voice-termination-providers','wholesale-voice-business','international-voip-wholesale-provider',
  'voip-termination-wholesale','wholesale-voip-lcr','top-tier-wholesale-voice-termination-providers',
  'wholesale-voip-minutes-providers','wholesale-voice-business-services','wholesale-voip-termination',
  'voice-termination-wholesale','voip-wholesale-rates','voip-wholesale',
  'wholesale-voip-termination-a-detailed-guide','wholesale-voice-termination-rates-trends','wholesale-voip-carriers',
  'wholesale-voice-business-model','wholesale-voice-carriers','wholesale-voice-rates',
  'wholesale-voip-origination-guide','boost-your-business-wholesale-did-numbers',
  'maximizing-wholesale-sip-comprehensive-guide','mobile-wholesale','wholesale-voip-traffic',
  'unlocking-wholesale-sip-trunk-providers','termination-voip-wholesale','navigating-wholesale-voip-termination',
  'ins-and-outs-of-wholesale-voice','best-wholesale-voip-termination-rates'
]

const slugSet = new Set(slugs.map(s => s.toLowerCase()))

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
let updated = 0

for (const file of files) {
  const fileSlug = file.replace('.md', '').toLowerCase()
  if (!slugSet.has(fileSlug)) continue

  const fp = path.join(dir, file)
  let raw = fs.readFileSync(fp, 'utf8')
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1)

  const updated_raw = raw.replace(/^category:\s*.+$/m, 'category: "Wholesale Voice & VoIP"')

  if (updated_raw !== raw) {
    fs.writeFileSync(fp, updated_raw, 'utf8')
    updated++
    console.log('Updated:', file)
  } else {
    console.log('No category line found:', file)
  }
}

console.log('\nTotal updated:', updated, '/', files.filter(f => slugSet.has(f.replace('.md','').toLowerCase())).length, 'matching files')
