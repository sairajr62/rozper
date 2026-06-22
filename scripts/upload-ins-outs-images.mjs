/**
 * Uploads the 4 inline images for ins-and-outs-of-wholesale-voice blog post to Vercel Blob.
 * Run: node scripts/upload-ins-outs-images.mjs
 */

import { put } from "@vercel/blob"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const IMAGES_DIR = path.join(ROOT, "public", "images", "blog")
const OUTPUT_JSON = path.join(ROOT, "lib", "blog-blob-urls.json")

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

const TARGET_FILES = [
  "understanding-wholesale-voice.webp",
  "benefit ins outs.webp",
  "key feature ins outs.webp",
  "choosing the right provider ins outs.webp",
]

const existing = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8"))
const mapping = { ...existing }

for (const filename of TARGET_FILES) {
  if (mapping[filename]) {
    console.log(`  ⏭  Already uploaded: ${filename}`)
    continue
  }
  const filePath = path.join(IMAGES_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.error(`  ❌  File not found: ${filePath}`)
    continue
  }
  const buffer = fs.readFileSync(filePath)
  const ext = path.extname(filename).toLowerCase().slice(1)
  const contentType = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg"

  try {
    const blob = await put(`blog/${filename}`, buffer, {
      access: "public",
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    mapping[filename] = blob.url
    console.log(`  ✅  Uploaded: ${filename} → ${blob.url}`)
  } catch (err) {
    console.error(`  ❌  Failed: ${filename} —`, err.message)
  }
}

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2))
console.log("\nDone. blog-blob-urls.json updated.")
