import { NextResponse } from 'next/server'
import { checkAnalytics } from '../_lib/audit-helpers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const routes = ['/', '/blog', '/pricing', '/contact', '/about', '/area-codes', '/solutions/finance', '/products/ucaas', '/security', '/wholesale-voip']
  const results = []
  for (const r of routes) results.push(await checkAnalytics(r))
  return NextResponse.json(results)
}
