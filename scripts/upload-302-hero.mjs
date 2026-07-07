import { put } from "@vercel/blob"
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
if (!TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN not set")

const SRC = "C:\\Users\\Developer\\Downloads\\rozper-github-clone\\public\\images\\blog\\302-area-code-cover.webp"
const BLOB_NAME = "302-area-code-hero.webp"

const data = fs.readFileSync(SRC)
console.log(`Uploading ${SRC} (${data.length} bytes) as blog/${BLOB_NAME}...`)

const result = await put(`blog/${BLOB_NAME}`, data, {
  access: "public",
  token: TOKEN,
  contentType: "image/webp",
})
console.log(`✓ ${result.url}`)

const blobUrls = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"))
blobUrls[BLOB_NAME] = result.url
const sorted = Object.fromEntries(Object.entries(blobUrls).sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync(JSON_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log(`blog-blob-urls.json updated (${Object.keys(sorted).length} entries)`)
