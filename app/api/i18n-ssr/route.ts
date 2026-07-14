import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { translateHtmlBody } from "@/lib/html-translator"
import { isLocaleCode } from "@/lib/locale"

const CACHE_HEADER = "public, s-maxage=604800, stale-while-revalidate=2592000"
const TRANSLATE_BUDGET_MS = 15000 // worst case (endpoint outage/throttling): serve English rather than hang the request

/**
 * SSR proxy target. middleware.ts rewrites /<locale>/<path> here (locale +
 * path passed as request headers, since req.url keeps the original URL after
 * a rewrite). Self-fetches the origin path with the internal bypass header so
 * middleware renders the English page WITH the locale context (translated
 * <head> via generateMetadata), then translates the <body>.
 */
export async function GET(request: NextRequest) {
  const locale = request.headers.get("x-ld-locale") ?? ""
  const path = request.headers.get("x-ld-path") ?? "/"

  if (!isLocaleCode(locale)) {
    return NextResponse.json({ error: "Missing or invalid locale" }, { status: 400 })
  }

  const origin = request.nextUrl.origin
  const targetUrl = `${origin}${path}`

  const upstream = await fetch(targetUrl, {
    headers: {
      "x-ld-ssr": locale,
      "x-locale": locale,
      "User-Agent": request.headers.get("User-Agent") ?? "Mozilla/5.0",
    },
    redirect: "manual",
  })

  // Propagate redirects (localized) instead of trying to translate a 3xx body.
  if (upstream.status >= 300 && upstream.status < 400) {
    const location = upstream.headers.get("location")
    if (location) {
      let localizedLocation = location
      try {
        const parsed = new URL(location, origin)
        if (parsed.origin === origin && !parsed.pathname.startsWith(`/${locale}/`)) {
          parsed.pathname = `/${locale}${parsed.pathname}`
          localizedLocation = parsed.toString()
        }
      } catch {
        // relative or unparsable location — forward as-is
      }
      return NextResponse.redirect(localizedLocation, upstream.status)
    }
  }

  const contentType = upstream.headers.get("content-type") ?? ""
  if (!contentType.includes("text/html")) {
    const body = await upstream.arrayBuffer()
    return new NextResponse(body, { status: upstream.status, headers: { "content-type": contentType } })
  }

  const html = await upstream.text()

  let translated: string
  try {
    translated = await Promise.race([
      translateHtmlBody(html, locale),
      new Promise<string>((_, reject) =>
        setTimeout(() => reject(new Error("translation budget exceeded")), TRANSLATE_BUDGET_MS),
      ),
    ])
  } catch {
    // Endpoint outage/throttling on this locale — serve the untranslated
    // English page rather than hang; a retry later can still succeed and
    // populate the cache (this response is NOT given the long cache header).
    return new NextResponse(html, {
      status: upstream.status,
      headers: { "content-type": "text/html; charset=utf-8" },
    })
  }

  return new NextResponse(translated, {
    status: upstream.status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": CACHE_HEADER,
    },
  })
}
