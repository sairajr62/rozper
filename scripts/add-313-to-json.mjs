import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const JSON_PATH = path.join(ROOT, "lib", "blog-blob-urls.json")

const raw = fs.readFileSync(JSON_PATH, "utf8").replace(/^﻿/, "")
const blobUrls = JSON.parse(raw)

const entries = {
  "hero-313-area-code.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/hero-313-area-code.webp",
  "What Is the 313 Area Code.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/What%20Is%20the%20313%20Area%20Code.webp",
  "The History Behind the 313 Area Code.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/The%20History%20Behind%20the%20313%20Area%20Code.webp",
  "313 Area Code Time Zone and the 679 Overlay.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/313%20Area%20Code%20Time%20Zone%20and%20the%20679%20Overlay.webp",
  "Why Businesses Get a 313 Area Code Number.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/Why%20Businesses%20Get%20a%20313%20Area%20Code%20Number.webp",
}

for (const [k, v] of Object.entries(entries)) {
  blobUrls[k] = v
  console.log(`Added: ${k}`)
}

const sorted = Object.fromEntries(Object.entries(blobUrls).sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync(JSON_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log(`\nblog-blob-urls.json updated (${Object.keys(sorted).length} entries)`)
