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
const routes = blobs.filter(b => b.pathname.toLowerCase().includes("route"))
routes.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
for (const b of routes) {
  console.log(b.pathname.replace("blog/", "") + " | " + b.uploadedAt)
}
console.log("Total: " + routes.length)
