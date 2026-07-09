/**
 * Force re-uploads every image found anywhere under
 * "C:\Users\Developer\Downloads\vercel images\vercel images" (excluding the
 * "content" folder) to Vercel Blob, overwriting existing blobs of the same
 * name, and updates lib/blog-blob-urls.json.
 * Run: node scripts/reupload-vercel-images-folder.mjs
 */

import { put } from "@vercel/blob"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const OUTPUT_JSON = path.join(ROOT, "lib", "blog-blob-urls.json")
const SOURCE_ROOT = "C:\\Users\\Developer\\Downloads\\vercel images\\vercel images"

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

const IMAGE_EXT = new Set([".webp", ".png", ".jpg", ".jpeg"])

function walk(dir, results) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name.toLowerCase() === "content") continue
      walk(full, results)
    } else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
      results.push(full)
    }
  }
}

const files = []
walk(SOURCE_ROOT, files)
console.log(`Found ${files.length} image files to upload.`)

const mapping = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8"))
const contentTypeFor = (ext) => ({
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
})[ext] || "application/octet-stream"

let ok = 0, failed = 0
for (const filePath of files) {
  const disk = path.basename(filePath)
  const ext = path.extname(disk).toLowerCase()
  const buffer = fs.readFileSync(filePath)
  const blobPath = `blog/${disk}`
  try {
    const blob = await put(blobPath, buffer, {
      access: "public",
      contentType: contentTypeFor(ext),
      allowOverwrite: true,
      token: TOKEN,
    })
    mapping[disk] = blob.url
    ok++
    console.log(`OK: ${disk}`)
  } catch (err) {
    failed++
    console.error(`FAILED: ${disk} — ${err.message}`)
  }
}

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2))
console.log(`Done. Uploaded: ${ok}, Failed: ${failed}. Updated lib/blog-blob-urls.json`)
