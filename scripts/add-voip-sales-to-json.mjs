import fs from "fs"
const path = "lib/blog-blob-urls.json"
const json = JSON.parse(fs.readFileSync(path, "utf8"))

const newEntries = {
  "Common Objections in VoIP Sales.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/Common%20Objections%20in%20VoIP%20Sales.webp",
  "Key Benefits That Drive VoIP Sales.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/Key%20Benefits%20That%20Drive%20VoIP%20Sales.webp",
  "The VoIP Sales Process Explained.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/The%20VoIP%20Sales%20Process%20Explained.webp",
  "What Is VoIP Sales.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/What%20Is%20VoIP%20Sales.webp",
  "voip rates hero.webp": "https://txmte7vbg0qnj5i1.public.blob.vercel-storage.com/blog/voip%20rates%20hero.webp"
}

Object.assign(json, newEntries)

// Sort keys alphabetically
const sorted = Object.fromEntries(Object.entries(json).sort(([a],[b]) => a.localeCompare(b)))
fs.writeFileSync(path, JSON.stringify(sorted, null, 2) + "\n", "utf8")
console.log("Added " + Object.keys(newEntries).length + " entries to blog-blob-urls.json")
