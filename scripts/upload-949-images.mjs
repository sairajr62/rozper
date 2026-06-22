/**
 * Uploads all 949 area code images to Vercel Blob and updates blog-blob-urls.json.
 * Run: node scripts/upload-949-images.mjs
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

// disk filename  -> blob storage path (for CDN URL generation)
const UPLOADS = [
  { disk: "949-hero.webp",      blobPath: "blog/949-hero.webp" },
  { disk: "949 image 1.webp",   blobPath: "blog/voip-plans-949.webp" },
  { disk: "949 image 2.webp",   blobPath: "blog/voip-platform-949-strategy-v2.webp" },
  { disk: "949 image 3.webp",   blobPath: "blog/essential-features-949-v2.webp" },
  { disk: "949 image 4.webp",   blobPath: "blog/maximize-949-number-impact-v2.webp" },
]

const mapping = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8"))

for (const { disk, blobPath } of UPLOADS) {
  const filePath = path.join(PUBLIC_BLOG, disk)
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    continue
  }
  const buffer = fs.readFileSync(filePath)
  console.log(`Uploading "${disk}" (${buffer.length} bytes) → ${blobPath}`)
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
