import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUDIT_USER = 'rozper'
const AUDIT_PASS = 'rozperupdateducass'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/audit') || pathname.startsWith('/api/audit')) {
    const auth = request.headers.get('authorization') ?? ''
    const [type, credentials] = auth.split(' ')

    let valid = false
    if (type === 'Basic' && credentials) {
      try {
        const decoded = Buffer.from(credentials, 'base64').toString('utf8')
        const [user, pass] = decoded.split(':')
        valid = user === AUDIT_USER && pass === AUDIT_PASS
      } catch {}
    }

    if (!valid) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Rozper Audit Dashboard", charset="UTF-8"',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      })
    }

    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/audit/:path*', '/audit', '/api/audit/:path*'],
}
