import { del, list } from "@vercel/blob"
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

// Delete the old cover blob
const OLD_URL = "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/302-area-code-cover.webp"
console.log("Deleting old blob: 302-area-code-cover.webp ...")
await del(OLD_URL, { token: TOKEN })
console.log("✓ Deleted")

// Remove from blog-blob-urls.json
const blobUrls = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"))
delete blobUrls["302-area-code-cover.webp"]
const sorted = Object.fromEntries(Object.entries(blobUrls).sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync(JSON_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log(`blog-blob-urls.json updated — removed 302-area-code-cover.webp (${Object.keys(sorted).length} entries remaining)`)

console.log("\nCurrent 302 blob entries in JSON:")
for (const [k, v] of Object.entries(sorted).filter(([k]) => k.includes("302"))) {
  console.log(`  ${k}: ${v}`)
}
