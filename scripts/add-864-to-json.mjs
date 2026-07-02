import fs from "fs"
const path = "lib/blog-blob-urls.json"
const json = JSON.parse(fs.readFileSync(path, "utf8"))
const newEntries = {
  "864-image-3.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/864-image-3.webp",
  "864-image-4.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/864-image-4.webp"
}
Object.assign(json, newEntries)
const sorted = Object.fromEntries(Object.entries(json).sort(([a],[b]) => a.localeCompare(b)))
fs.writeFileSync(path, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log("Done")
