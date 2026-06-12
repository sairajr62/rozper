import { put } from '@vercel/blob'
import { readFileSync, readdirSync } from 'fs'
import { join, extname, basename } from 'path'

const TOKEN = 'vercel_blob_rw_M8debJgdKSQPKG9j_nyPcXhDKUHlAilLunsybwiB4H1biqE'

const BASE = 'C:/Users/Developer/Downloads/blogs image/blogs image'

const SLUG_MAP = {
  '201-area-code image': '201-area-code',
  '213-area-code image': '213-area-code',
  '228-area-code image': '228-area-code',
  '310-area-code image': '310-area-code',
  '312-area-code image': '312-area-code',
  '315-area-code image': '315-area-code',
  '415-area-code image': '415-area-code',
  '424-area code image': '424-area-code',
  '470-area-code image': '470-area-code',
  '559-area-code image': '559-area-code',
}

const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jfif': 'image/jpeg', '.jpg': 'image/jpeg' }

let uploaded = 0, failed = 0

for (const [folder, slug] of Object.entries(SLUG_MAP)) {
  const dir = join(BASE, folder)
  const files = readdirSync(dir)
  for (const file of files) {
    const ext = extname(file).toLowerCase()
    const name = file.toLowerCase()
    let blobName
    if (name.includes('hero')) {
      blobName = `blog/${slug}${ext}`
    } else {
      const m = name.match(/(\d+)/)
      blobName = m ? `blog/${slug}-image-${m[1]}${ext}` : `blog/${slug}-${basename(file, extname(file)).toLowerCase().replace(/\s+/g, '-')}${ext}`
    }
    const bytes = readFileSync(join(dir, file))
    const mime = MIME[ext] || 'application/octet-stream'
    try {
      const result = await put(blobName, bytes, {
        access: 'private',
        token: TOKEN,
        contentType: mime,
        allowOverwrite: true,
      })
      console.log(`OK: ${blobName} → ${result.url}`)
      uploaded++
    } catch (e) {
      console.error(`FAIL: ${blobName} — ${e.message}`)
      failed++
    }
  }
}

console.log(`\nDone — Uploaded: ${uploaded} | Failed: ${failed}`)
