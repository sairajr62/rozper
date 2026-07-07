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

const SRC = "C:\\Users\\Developer\\Downloads\\380_area_code_webp\\380_area_code_webp"

const files = [
  "380-hero.webp",
  "Cities the 380 Area Code Covers.webp",
  "how-the-380-area-code-came-to-be.webp",
  "how-to-get-a-local-columbus-phone-number.webp",
  "why-businesses-choose-a-380-area-code-number.webp",
]

const blobUrls = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"))
const uploaded = {}

for (const filename of files) {
  const filePath = path.join(SRC, filename)
  const data = fs.readFileSync(filePath)
  process.stdout.write(`Uploading: ${filename} ... `)
  try {
    const result = await put(`blog/${filename}`, data, {
      access: "public",
      token: TOKEN,
      contentType: "image/webp",
    })
    blobUrls[filename] = result.url
    uploaded[filename] = result.url
    console.log(`✓  ${result.url}`)
  } catch (err) {
    console.log(`✗ ${err.message}`)
  }
}

// Sort keys and write back
const sorted = Object.fromEntries(Object.entries(blobUrls).sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync(JSON_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log(`\nblog-blob-urls.json updated (${Object.keys(sorted).length} total entries)`)
console.log("\nUploaded URLs:")
for (const [name, url] of Object.entries(uploaded)) {
  console.log(`  ${name}: ${url}`)
}
