import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const JSON_PATH = path.join(ROOT, "lib", "blog-blob-urls.json")

// Read raw bytes, strip BOM if present, parse, re-write without BOM
const raw = fs.readFileSync(JSON_PATH, "utf8").replace(/^﻿/, "")
const parsed = JSON.parse(raw)

// Sort keys and write back using Node.js (no BOM)
const sorted = Object.fromEntries(Object.entries(parsed).sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync(JSON_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log(`Fixed: ${Object.keys(sorted).length} entries, no BOM`)

// Verify
const firstBytes = Buffer.from(fs.readFileSync(JSON_PATH).slice(0, 3))
console.log(`First 3 bytes: ${firstBytes[0]} ${firstBytes[1]} ${firstBytes[2]} (239 187 191 = BOM)`)
console.log(`BOM present: ${firstBytes[0] === 239 && firstBytes[1] === 187 && firstBytes[2] === 191}`)
