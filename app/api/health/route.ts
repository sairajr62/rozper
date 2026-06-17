import { NextResponse } from 'next/server'
import { SITE } from '../_lib/audit-helpers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await fetch(SITE, {
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': 'RozperAuditBot/1.0' },
    })
    return NextResponse.json({ online: res.status < 500, status: res.status, site: SITE })
  } catch {
    return NextResponse.json({ online: false, status: 0, site: SITE })
  }
}
