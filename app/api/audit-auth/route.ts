import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 10

export async function POST(req: Request) {
  try {
    let body: any = {}
    try { body = await req.json() } catch { /* malformed body — fall through to 401 */ }

    const user = typeof body.user === 'string' ? body.user.trim() : ''
    const pass = typeof body.pass === 'string' ? body.pass.trim() : ''

    const expectedUser = (process.env.AUDIT_USER || 'admin').trim()
    const expectedPass = (process.env.AUDIT_PASS || 'rozper2024').trim()

    if (user && pass && user === expectedUser && pass === expectedPass) {
      const res = NextResponse.json({ ok: true })
      res.cookies.set('rozper_audit', '1', {
        path: '/',
        sameSite: 'lax',
        httpOnly: false,
      })
      return res
    }

    // Distinguish wrong credentials from missing body
    const status = user || pass ? 401 : 400
    return NextResponse.json({ ok: false, reason: status === 401 ? 'invalid_credentials' : 'bad_request' }, { status })
  } catch {
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }
}
