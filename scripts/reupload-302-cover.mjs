/**
 * Force-reuploads 302-area-code-cover.webp to Vercel Blob, overwriting the existing entry.
 * Run: node scripts/reupload-302-cover.mjs
 */

import { put } from "@vercel/blob"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const FILENAME = "302-area-code-cover.webp"
const FILE_PATH = path.join(ROOT, "public", "images", "blog", FILENAME)
const OUTPUT_JSON = path.join(ROOT, "lib", "blog-blob-urls.json")

// Load .env.local
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

const buffer = fs.readFileSync(FILE_PATH)
console.log(`Uploading ${FILENAME} (${buffer.length} bytes)...`)

// Use a versioned path to bust CDN/browser cache
const blobPath = `blog/302-area-code-cover-v2.webp`
const blob = await put(blobPath, buffer, {
  access: "public",
  contentType: "image/webp",
  allowOverwrite: true,
  token: process.env.BLOB_READ_WRITE_TOKEN,
})

console.log(`✅ Uploaded: ${blob.url}`)

// Update blob-blob-urls.json
const mapping = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8"))
mapping[FILENAME] = blob.url
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2))
console.log(`✅ Updated lib/blog-blob-urls.json`)
