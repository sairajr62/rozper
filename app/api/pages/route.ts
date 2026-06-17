import { NextResponse } from 'next/server'
import { auditPage, STATIC_PAGES } from '../_lib/audit-helpers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const results = []
  for (const route of STATIC_PAGES) {
    results.push(await auditPage(route))
  }
  return NextResponse.json(results)
}
