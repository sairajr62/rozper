import { NextResponse } from 'next/server'
import { auditBlogs, STATIC_PAGES } from '../_lib/audit-helpers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const blogResults = auditBlogs()
  return NextResponse.json({
    pages: { total: STATIC_PAGES.length },
    blogs: {
      total: blogResults.length,
      withIssues: blogResults.filter((b: any) => b.issues.length > 0).length,
      withWarnings: blogResults.filter((b: any) => b.warnings.length > 0).length,
      totalIssues: blogResults.reduce((s: number, b: any) => s + b.issues.length, 0),
      totalWarnings: blogResults.reduce((s: number, b: any) => s + b.warnings.length, 0),
      missingImages: blogResults.filter((b: any) => b.issues.some((i: string) => i.includes('image'))).length,
      thinContent: blogResults.filter((b: any) => b.issues.some((i: string) => i.includes('Thin'))).length,
    },
  })
}
