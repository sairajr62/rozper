import { list } from "@vercel/blob"
import fs from "fs"

const env = fs.readFileSync(".env.local", "utf8")
for (const line of env.split("\n")) {
  const m = line.match(/^([^#=]+)=(.*)$/)
  if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "")
}

let cursor
const blobs = []
do {
  const res = await list({ token: process.env.BLOB_READ_WRITE_TOKEN, prefix: "blog/", cursor, limit: 1000 })
  blobs.push(...res.blobs)
  cursor = res.cursor
} while (cursor)

// Show blobs that are 40KB+ and were uploaded after June 20 (likely new cover images)
const recent = blobs.filter(b => {
  const d = new Date(b.uploadedAt)
  return d > new Date("2026-06-20") && b.size > 40000
})
recent.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
console.log("=== Recent large blobs (>40KB, after June 20) ===")
for (const b of recent) {
  console.log(`${b.pathname} | ${b.size} bytes | ${b.uploadedAt}`)
}

// Also check all blobs with "cover" in name
const covers = blobs.filter(b => b.pathname.toLowerCase().includes("cover") || b.pathname.toLowerCase().includes("hero"))
console.log("\n=== All blobs with 'cover' or 'hero' in name ===")
for (const b of covers) {
  console.log(`${b.pathname} | ${b.size} bytes`)
}
console.log(`\nTotal blobs: ${blobs.length}`)
