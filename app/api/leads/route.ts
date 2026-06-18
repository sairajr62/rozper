import { NextResponse } from 'next/server'
import { list, get } from '@vercel/blob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'leads/' })

    const leads = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const result = await get(blob.url, { access: 'private' })
          if (!result || result.statusCode !== 200 || !result.stream) return null
          const text = await new Response(result.stream).text()
          return JSON.parse(text)
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
