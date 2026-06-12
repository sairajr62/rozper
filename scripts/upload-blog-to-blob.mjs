/**
 * Uploads every file in public/images/blog/ to Vercel Blob Storage.
 * Saves a mapping { "filename.webp": "https://..." } to lib/blog-blob-urls.json
 *
 * Run once: node scripts/upload-blog-to-blob.mjs
 * Requires BLOB_READ_WRITE_TOKEN in .env.local
 */

import { put, list } from "@vercel/blob"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const IMAGES_DIR = path.join(ROOT, "public", "images", "blog")
const OUTPUT_JSON = path.join(ROOT, "lib", "blog-blob-urls.json")

// Load .env.local manually (Node doesn't auto-load it)
const envPath = path.join(ROOT, ".env.local")
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "")
  }
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("❌  BLOB_READ_WRITE_TOKEN not found in .env.local")
  process.exit(1)
}

// Load existing mapping so we can skip already-uploaded files
let existing = {}
if (fs.existsSync(OUTPUT_JSON)) {
  existing = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8"))
}

const files = fs.readdirSync(IMAGES_DIR).filter((f) => {
  const ext = path.extname(f).toLowerCase()
  return [".webp", ".png", ".jpg", ".jpeg", ".gif", ".avif"].includes(ext)
})

console.log(`Found ${files.length} images. Already uploaded: ${Object.keys(existing).length}`)

const mapping = { ...existing }
let uploaded = 0
let skipped = 0
let failed = 0

for (const filename of files) {
  if (mapping[filename]) {
    skipped++
    continue
  }
  const filePath = path.join(IMAGES_DIR, filename)
  const buffer = fs.readFileSync(filePath)
  const ext = path.extname(filename).toLowerCase().slice(1)
  const contentType =
    ext === "webp" ? "image/webp"
    : ext === "png" ? "image/png"
    : ext === "jpg" || ext === "jpeg" ? "image/jpeg"
    : ext === "gif" ? "image/gif"
    : ext === "avif" ? "image/avif"
    : "image/webp"

  try {
    const blob = await put(`blog/${filename}`, buffer, {
      access: "public",
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    mapping[filename] = blob.url
    uploaded++
    process.stdout.write(`  ✅ [${uploaded + skipped}/${files.length}] ${filename}\n`)
  } catch (err) {
    failed++
    console.error(`  ❌ Failed: ${filename} —`, err.message)
  }
}

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2))
console.log(`\nDone. Uploaded: ${uploaded} | Skipped: ${skipped} | Failed: ${failed}`)
console.log(`Mapping saved to lib/blog-blob-urls.json`)
