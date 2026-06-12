import { put, del, list } from '@vercel/blob'
import { readFileSync, readdirSync } from 'fs'
import { join, extname, basename } from 'path'

const TOKEN = 'vercel_blob_rw_M8debJgdKSQPKG9j_nyPcXhDKUHlAilLunsybwiB4H1biqE'
const BASE = 'C:/Users/Developer/Downloads/blogs image/blogs image'
const FOLDERS = {
  '201-area-code image': '201-area-code',
  '228-area-code image': '228-area-code',
}
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jfif': 'image/jpeg', '.jpg': 'image/jpeg' }

// Delete existing wrong blobs
const res = await list({ token: TOKEN, limit: 1000 })
const toDelete = res.blobs
  .filter(b => b.pathname.startsWith('blog/201-area-code/') || b.pathname.startsWith('blog/228-area-code/'))
  .map(b => b.url)
if (toDelete.length) {
  await del(toDelete, { token: TOKEN })
  console.log('Deleted', toDelete.length, 'old blobs')
}

let ok = 0, fail = 0
for (const [folder, slug] of Object.entries(FOLDERS)) {
  const dir = join(BASE, folder)
  for (const file of readdirSync(dir)) {
    const ext = extname(file).toLowerCase()
    const name = file.toLowerCase()
    let blobName

    if (name.includes('hero')) {
      blobName = `blog/${slug}/hero${ext}`
    } else {
      // Use LAST number to get sequence (e.g. "201 image 2" → 2, "228 image 3" → 3)
      const matches = name.match(/\d+/g)
      const num = matches ? matches[matches.length - 1] : null
      blobName = num
        ? `blog/${slug}/image-${num}${ext}`
        : `blog/${slug}/${basename(file, ext).toLowerCase().replace(/\s+/g, '-')}${ext}`
    }

    try {
      const bytes = readFileSync(join(dir, file))
      await put(blobName, bytes, {
        access: 'private',
        token: TOKEN,
        contentType: MIME[ext] || 'application/octet-stream',
        allowOverwrite: true,
      })
      ok++
      console.log('OK:', blobName)
    } catch (e) {
      fail++
      console.error('FAIL:', blobName, '-', e.message)
    }
  }
}

console.log(`\nDone — OK: ${ok} | Failed: ${fail}`)
