import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { user, pass } = await req.json()

    const expectedUser = (process.env.AUDIT_USER || 'admin').trim()
    const expectedPass = (process.env.AUDIT_PASS || 'rozper2024').trim()

    if (user.trim() === expectedUser && pass.trim() === expectedPass) {
      const res = NextResponse.json({ ok: true })
      res.cookies.set('rozper_audit', '1', {
        path: '/',
        sameSite: 'lax',
        httpOnly: false,
      })
      return res
    }

    return NextResponse.json({ ok: false }, { status: 401 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
