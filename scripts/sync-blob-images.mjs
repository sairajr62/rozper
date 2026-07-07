/**
 * Syncs public/images/blog/ ↔ Vercel Blob (blog/ prefix)
 *
 * 1. Uploads local images not yet on blob
 * 2. Deletes blobs with no matching local file
 * 3. Rewrites lib/blog-blob-urls.json to reflect current state
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { list, put, del } from "@vercel/blob"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const IMG_DIR = path.join(ROOT, "public", "images", "blog")
const JSON_PATH = path.join(ROOT, "lib", "blog-blob-urls.json")

// Load .env.local
const envPath = path.join(ROOT, ".env.local")
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([^#=]+)=(.*)$/)
  if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "")
}
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN
if (!TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN not set in .env.local")

// ── 1. Collect local files ────────────────────────────────────────────────────
const localFiles = fs.readdirSync(IMG_DIR).filter(f =>
  /\.(webp|png|jpg|jpeg|gif|svg)$/i.test(f)
)
console.log(`Local images: ${localFiles.length}`)

// ── 2. List all blobs under blog/ ────────────────────────────────────────────
let cursor
const allBlobs = []
do {
  const res = await list({ token: TOKEN, prefix: "blog/", cursor, limit: 1000 })
  allBlobs.push(...res.blobs)
  cursor = res.cursor
} while (cursor)
console.log(`Blobs on Vercel: ${allBlobs.length}`)

// Build lookup: basename → blob url
const blobByName = {}
for (const b of allBlobs) {
  const name = b.pathname.replace(/^blog\//, "")
  blobByName[name] = b.url
}

// ── 3. Upload missing images ──────────────────────────────────────────────────
const uploaded = []
const skipped = []
for (const filename of localFiles) {
  if (blobByName[filename]) {
    skipped.push(filename)
    continue
  }
  const filePath = path.join(IMG_DIR, filename)
  const data = fs.readFileSync(filePath)
  const ext = path.extname(filename).toLowerCase()
  const contentTypeMap = {
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  }
  const contentType = contentTypeMap[ext] || "application/octet-stream"

  process.stdout.write(`  Uploading: ${filename} ... `)
  try {
    const result = await put(`blog/${filename}`, data, {
      access: "public",
      token: TOKEN,
      contentType,
    })
    blobByName[filename] = result.url
    uploaded.push(filename)
    console.log("✓")
  } catch (err) {
    console.log(`✗ ${err.message}`)
  }
}

// ── 4. Delete blobs with no matching local file ───────────────────────────────
const localSet = new Set(localFiles)
const deleted = []
for (const b of allBlobs) {
  const name = b.pathname.replace(/^blog\//, "")
  if (!localSet.has(name)) {
    process.stdout.write(`  Deleting stale blob: ${name} ... `)
    try {
      await del(b.url, { token: TOKEN })
      delete blobByName[name]
      deleted.push(name)
      console.log("✓")
    } catch (err) {
      console.log(`✗ ${err.message}`)
    }
  }
}

// ── 5. Rebuild blog-blob-urls.json ────────────────────────────────────────────
// Only include entries for files that exist locally AND have a blob URL
const newJson = {}
for (const filename of localFiles.sort()) {
  if (blobByName[filename]) {
    newJson[filename] = blobByName[filename]
  }
}

fs.writeFileSync(JSON_PATH, JSON.stringify(newJson, null, 2) + "\n", "utf8")

// ── Summary ───────────────────────────────────────────────────────────────────
console.log("\n─────────────────────────────────────────")
console.log(`✓ Already on blob (skipped): ${skipped.length}`)
console.log(`✓ Uploaded:                  ${uploaded.length}`)
console.log(`✓ Deleted stale blobs:       ${deleted.length}`)
console.log(`✓ blog-blob-urls.json:       ${Object.keys(newJson).length} entries`)

if (uploaded.length) {
  console.log("\nUploaded:")
  uploaded.forEach(f => console.log(`  + ${f}`))
}
if (deleted.length) {
  console.log("\nDeleted:")
  deleted.forEach(f => console.log(`  - ${f}`))
}
