import { put, del } from "@vercel/blob"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const JSON_PATH = path.join(ROOT, "lib", "blog-blob-urls.json")

const env = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8")
for (const line of env.split("\n")) {
  const m = line.match(/^([^#=]+)=(.*)$/)
  if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "")
}
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN

// 1. Download the image from the space-named blob
const OLD_URL = "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/302%20hero%20section.webp"
console.log("Downloading from blob...")
const res = await fetch(OLD_URL)
if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
const buffer = Buffer.from(await res.arrayBuffer())
console.log(`Downloaded ${buffer.length} bytes`)

// 2. Re-upload with clean hyphenated name
const NEW_NAME = "302-hero-section.webp"
console.log(`Uploading as blog/${NEW_NAME} ...`)
const result = await put(`blog/${NEW_NAME}`, buffer, {
  access: "public",
  token: TOKEN,
  contentType: "image/webp",
})
console.log(`✓ ${result.url}`)

// 3. Delete the space-named blob
console.log("Deleting old space-named blob...")
await del(OLD_URL, { token: TOKEN })
console.log("✓ Deleted old blob")

// 4. Update blog-blob-urls.json
const blobUrls = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"))
delete blobUrls["302 hero section.webp"]
delete blobUrls["302-area-code-hero.webp"]
blobUrls[NEW_NAME] = result.url
const sorted = Object.fromEntries(Object.entries(blobUrls).sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync(JSON_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log(`JSON updated (${Object.keys(sorted).length} entries)`)
console.log(`\nNew entry: "${NEW_NAME}": "${result.url}"`)
