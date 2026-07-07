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

const area302 = blobs.filter(b => b.pathname.toLowerCase().includes("302"))
area302.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
for (const b of area302) {
  console.log(`${b.pathname} | size=${b.size} | uploaded=${b.uploadedAt}`)
  console.log(`  url: ${b.url}`)
}
console.log(`\nTotal 302 blobs: ${area302.length}`)
