import { NextResponse } from 'next/server'
import { seoAuditPage } from '../../_lib/audit-helpers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const route = searchParams.get('route') || '/'
  return NextResponse.json(await seoAuditPage(route))
}
