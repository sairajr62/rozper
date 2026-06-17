import { NextResponse } from 'next/server'
import { auditBlogs } from '../_lib/audit-helpers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(auditBlogs())
}
