import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const JSON_PATH = path.join(ROOT, "lib", "blog-blob-urls.json")

const raw = fs.readFileSync(JSON_PATH, "utf8").replace(/^﻿/, "")
const blobUrls = JSON.parse(raw)

// These 4 were re-uploaded today (Jun 25) with new content — append version to bust cache
const toUpdate = [
  "302-advantage.webp",
  "302-scam-alert.webp",
  "302-understanding.webp",
  "302-why-delaware.webp",
]

for (const key of toUpdate) {
  if (blobUrls[key]) {
    // Strip any old version param, then add new one
    const baseUrl = blobUrls[key].replace(/\?.*$/, "")
    blobUrls[key] = `${baseUrl}?v=20260625`
    console.log(`Updated: ${key} → ${blobUrls[key]}`)
  }
}

const sorted = Object.fromEntries(Object.entries(blobUrls).sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync(JSON_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log(`\nblog-blob-urls.json updated (${Object.keys(sorted).length} entries)`)
