import { NextResponse } from 'next/server'
import { list } from '@vercel/blob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const debug = new URL(req.url).searchParams.has('debug')
  try {
    const { blobs } = await list({ prefix: 'leads/' })

    if (debug) {
      return NextResponse.json({
        blobCount: blobs.length,
        blobs: blobs.map(b => ({ url: b.url, pathname: b.pathname, size: b.size })),
        hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      })
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN
    const leads = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const res = await fetch(blob.url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          })
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
