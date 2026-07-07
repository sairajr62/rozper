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

const wholesale = blobs.filter(b =>
  b.pathname.toLowerCase().includes("wholesale") ||
  b.pathname.toLowerCase().includes("voip")
)

wholesale.sort((a, b) => a.pathname.localeCompare(b.pathname))
for (const b of wholesale) {
  console.log(`${b.pathname.replace("blog/", "")} => ${b.url}`)
}
console.log(`\nTotal wholesale/voip blobs: ${wholesale.length}`)
