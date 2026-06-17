import { NextResponse } from 'next/server'
import { checkAnalytics, STATIC_PAGES } from '../../_lib/audit-helpers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const results = []
  for (const route of STATIC_PAGES) results.push(await checkAnalytics(route))
  return NextResponse.json(results)
}
