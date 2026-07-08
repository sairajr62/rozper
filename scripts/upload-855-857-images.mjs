/**
 * Uploads all 855 and 857 area code images to Vercel Blob and updates blog-blob-urls.json.
 * Run: node scripts/upload-855-857-images.mjs
 */

import { put } from "@vercel/blob"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PUBLIC_BLOG = path.join(ROOT, "public", "images", "blog")
const OUTPUT_JSON = path.join(ROOT, "lib", "blog-blob-urls.json")

// Load env
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

// disk filename -> blob storage path (for CDN URL generation)
const UPLOADS = [
  { disk: "855-hero.webp", blobPath: "blog/855-hero.webp" },
  { disk: "where-855-fits-in-the-toll-free-family.webp", blobPath: "blog/where-855-fits-in-the-toll-free-family.webp" },
  { disk: "the-cost-of-an-855-line.webp", blobPath: "blog/the-cost-of-an-855-line.webp" },
  { disk: "using-855-to-win-and-track-customers.webp", blobPath: "blog/using-855-to-win-and-track-customers.webp" },
  { disk: "is-an-855-number-right-for-your-business.webp", blobPath: "blog/is-an-855-number-right-for-your-business.webp" },
  { disk: "857-hero.webp", blobPath: "blog/857-hero.webp" },
  { disk: "where-the-857-area-code-covers.webp", blobPath: "blog/where-the-857-area-code-covers.webp" },
  { disk: "how-857-overlays-the-617-area-code.webp", blobPath: "blog/how-857-overlays-the-617-area-code.webp" },
  { disk: "a-quick-history-of-the-857-area-code.webp", blobPath: "blog/a-quick-history-of-the-857-area-code.webp" },
  { disk: "why-ten-digit-dialing-is-the-norm.webp", blobPath: "blog/why-ten-digit-dialing-is-the-norm.webp" },
]

const mapping = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8"))

for (const { disk, blobPath } of UPLOADS) {
  const filePath = path.join(PUBLIC_BLOG, disk)
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    continue
  }
  const buffer = fs.readFileSync(filePath)
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
