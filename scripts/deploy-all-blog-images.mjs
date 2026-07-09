/**
 * Uploads every image in public/images/blog/ to Vercel Blob,
 * overwriting existing blobs of the same name, and updates
 * lib/blog-blob-urls.json with the resulting URL for every file.
 * Run: node scripts/deploy-all-blog-images.mjs
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

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN
if (!TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN not set")
  process.exit(1)
}

const contentTypeFor = (ext) =>
  ({
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".avif": "image/avif",
  })[ext] || "application/octet-stream"

const files = fs.readdirSync(IMAGES_DIR).filter((f) => {
  const ext = path.extname(f).toLowerCase()
  return [".webp", ".png", ".jpg", ".jpeg", ".avif"].includes(ext)
})

console.log(`Found ${files.length} image files in public/images/blog/`)

const mapping = fs.existsSync(OUTPUT_JSON) ? JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8")) : {}

let ok = 0
let failed = 0
const failures = []

for (const filename of files) {
  const filePath = path.join(IMAGES_DIR, filename)
  const ext = path.extname(filename).toLowerCase()
  const buffer = fs.readFileSync(filePath)
  const blobPath = `blog/${filename}`
  try {
    const blob = await put(blobPath, buffer, {
      access: "public",
      contentType: contentTypeFor(ext),
      allowOverwrite: true,
      token: TOKEN,
    })
    mapping[filename] = blob.url
    ok++
    if (ok % 25 === 0) console.log(`  ...${ok}/${files.length} done`)
  } catch (err) {
    failed++
    failures.push([filename, err.message])
    console.error(`FAILED: ${filename} — ${err.message}`)
  }
}

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2))
console.log(`\nDone. Uploaded/updated: ${ok}, Failed: ${failed}.`)
if (failures.length) {
  console.log("Failures:")
  failures.forEach(([f, e]) => console.log(` ${f}: ${e}`))
}
console.log(`Total mapping entries: ${Object.keys(mapping).length}`)
