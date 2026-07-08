/**
 * Uploads all images for the new UCaaS/virtual-number blog batch to Vercel Blob
 * and updates blog-blob-urls.json.
 * Run: node scripts/upload-ucaas-batch-images.mjs
 */

import { put } from "@vercel/blob"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PUBLIC_BLOG = path.join(ROOT, "public", "images", "blog")
const OUTPUT_JSON = path.join(ROOT, "lib", "blog-blob-urls.json")

const envPath = path.join(ROOT, ".env.local")
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "")
  }
}

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN
if (!TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN not set")
  process.exit(1)
}

const FILES = [
  "a-local-prefix-feels-genuine.webp",
  "choose-the-right-area-code.webp",
  "how-rozper-supports-multi-city-rollouts.webp",
  "overlay-codes-and-choosing-multiple-prefixes_1.webp",
  "research-the-market-before-picking-a-prefix.webp",
  "combine-both-build-customer-trust.webp",
  "toll-free-vs-local-area-code.webp",
  "toll-free-vs-local-numbers.webp",
  "when-toll-free-still-makes-sense.webp",
  "why-local-numbers-feel-more-trustworthy.webp",
  "avoid-these-common-ucaas-switching-mistakes.webp",
  "hybrid-work-changed-the-rules-v2.webp",
  "look-beyond-voice-messaging-and-more.webp",
  "ucaas-buyers-guide-what-to-look-for-before-you-switch.webp",
  "why-uptime-should-top-your-checklist.webp",
  "calendar-sync-eliminates-double-booked-meetings.webp",
  "crm-integration-turns-calls-into-data.webp",
  "integrations-matter-more-than-features.webp",
  "where-rozper-fits-the-stack.webp",
  "hero-comparing-ongoing-ucaas-and-pbx-costs.webp",
  "hero-comparing-ucaas-vs-traditional-pbx-costs.webp",
  "hero-how-scalability-costs-diverge-over-time.webp",
  "hero-where-rozper-fits-the-cost-picture.webp",
  "a-simple-test-recall-versus-recognition.webp",
  "common-mistakes-in-the-vanity-numbers-vs-local-area-codes-decision.webp",
  "the-quick-verdict.webp",
  "vanity-numbers-vs-local-area-codes.webp",
  "what-makes-a-vanity-number-memorable.webp",
]

const mapping = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8"))

for (const disk of FILES) {
  const filePath = path.join(PUBLIC_BLOG, disk)
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    continue
  }
  const buffer = fs.readFileSync(filePath)
  const blobPath = `blog/${disk}`
  console.log(`Uploading "${disk}" (${buffer.length} bytes) -> ${blobPath}`)
  const blob = await put(blobPath, buffer, {
    access: "public",
    contentType: "image/webp",
    allowOverwrite: true,
    token: TOKEN,
  })
  console.log(`  OK: ${blob.url}`)
  mapping[disk] = blob.url
}

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2))
console.log("Updated lib/blog-blob-urls.json")
