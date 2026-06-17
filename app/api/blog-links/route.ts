import { NextResponse } from 'next/server'
import { auditBlogLinks } from '../_lib/audit-helpers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(auditBlogLinks())
}
