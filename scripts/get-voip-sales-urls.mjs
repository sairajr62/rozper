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
const targets = [
  "Common Objections in VoIP Sales.webp",
  "Key Benefits That Drive VoIP Sales.webp",
  "The VoIP Sales Process Explained.webp",
  "What Is VoIP Sales.webp",
  "voip rates hero.webp"
]
for (const name of targets) {
  const b = blobs.find(b => b.pathname === "blog/" + name)
  if (b) console.log(JSON.stringify(name) + ": " + JSON.stringify(b.url))
  else console.log("NOT FOUND: " + name)
}
