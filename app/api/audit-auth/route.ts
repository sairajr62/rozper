import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { user, pass } = await req.json()

    const expectedUser = (process.env.AUDIT_USER || 'admin').trim()
    const expectedPass = (process.env.AUDIT_PASS || 'rozper2024').trim()

    if (user.trim() === expectedUser && pass.trim() === expectedPass) {
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: false }, { status: 401 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
