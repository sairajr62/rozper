/**
 * Uploads all images for the 27-area-code deploy batch to Vercel Blob
 * and updates blog-blob-urls.json.
 * Run: node scripts/upload-27-area-code-images.mjs
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

const FILES = JSON.parse(fs.readFileSync(path.join(__dirname, "tmp-new-images.json"), "utf8"))

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
