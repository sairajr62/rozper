import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLocaleFromPathname, stripLocaleFromPathname, isLocaleCode } from './lib/locale'
import { isSsrTranslated } from './lib/ssr-pilot'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/audit')) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  // Internal bypass: the SSR proxy route self-fetches the origin path with
  // this header so we render the page WITH locale context (translated head
  // via generateMetadata) but WITHOUT re-entering the locale-rewrite branch.
  const bypassLocale = request.headers.get('x-ld-ssr')
  if (bypassLocale && isLocaleCode(bypassLocale)) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', bypassLocale)
    requestHeaders.set('x-pathname', pathname)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // "/en" or "/en/..." has no meaning here (English has no prefix) — redirect
  // to the un-prefixed path.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const target = request.nextUrl.clone()
    target.pathname = pathname.replace(/^\/en/, '') || '/'
    return NextResponse.redirect(target, 308)
  }

  const locale = getLocaleFromPathname(pathname)

  if (locale && isSsrTranslated(pathname)) {
    const strippedPath = stripLocaleFromPathname(pathname)
    const target = request.nextUrl.clone()
    target.pathname = '/api/i18n-ssr'
    target.search = ''
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-ld-locale', locale)
    requestHeaders.set('x-ld-path', `${strippedPath}${request.nextUrl.search}`)
    return NextResponse.rewrite(target, { request: { headers: requestHeaders } })
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', 'en')
  requestHeaders.set('x-pathname', pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/|api/|favicon|robots.txt|sitemap.xml).*)'],
}
