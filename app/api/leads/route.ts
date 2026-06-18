import { NextResponse } from 'next/server'
import { list, getDownloadUrl } from '@vercel/blob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const debug = new URL(req.url).searchParams.has('debug')
  try {
    const { blobs } = await list({ prefix: 'leads/' })

    if (debug) {
      const first = blobs[0]
      let fetchTest: any = null
      if (first) {
        try {
          const signedUrl = await getDownloadUrl(first.url)
          const res = await fetch(signedUrl)
          fetchTest = { status: res.status, ok: res.ok, signedUrl, text: await res.text() }
        } catch (err: any) {
          fetchTest = { error: err?.message ?? String(err) }
        }
      }
      return NextResponse.json({
        blobCount: blobs.length,
        blobs: blobs.map(b => ({ url: b.url, pathname: b.pathname, size: b.size })),
        hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
        fetchTest,
      })
    }

    const leads = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const signedUrl = await getDownloadUrl(blob.url)
          const res = await fetch(signedUrl)
          return await res.json()
        } catch {
          return null
        }
      })
    )

    const sorted = leads
      .filter(Boolean)
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

    return NextResponse.json(sorted)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
