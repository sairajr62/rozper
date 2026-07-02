import fs from "fs"
const path = "lib/blog-blob-urls.json"
const json = JSON.parse(fs.readFileSync(path, "utf8"))
const newEntries = {
  "Types of wholesale voip routes.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/Types%20of%20wholesale%20voip%20routes.webp",
  "What is wholesale voip.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/What%20is%20wholesale%20voip.webp",
  "how to choose wholesale voip routes.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/how%20to%20choose%20wholesale%20voip%20routes.webp",
  "key benefits of wholesale voip routes.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/key%20benefits%20of%20wholesale%20voip%20routes.webp",
  "wholesale voip routes.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/wholesale%20voip%20routes.webp"
}
Object.assign(json, newEntries)
const sorted = Object.fromEntries(Object.entries(json).sort(([a],[b]) => a.localeCompare(b)))
fs.writeFileSync(path, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log("Added " + Object.keys(newEntries).length + " entries")
