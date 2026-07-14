import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { serverTranslateBatch } from "@/lib/server-translator"
import { isLocaleCode } from "@/lib/locale"

interface TranslateRequestBody {
  texts?: string[]
  text?: string
  locale?: string
}

/** Client-fallback translation endpoint for dynamic DOM (menus/modals) not covered by SSR. */
export async function POST(request: NextRequest) {
  let body: TranslateRequestBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { locale } = body
  if (!locale || (locale !== "en" && !isLocaleCode(locale))) {
    return NextResponse.json({ error: "Invalid or missing locale" }, { status: 400 })
  }

  const texts = Array.isArray(body.texts) ? body.texts : body.text ? [body.text] : []
  if (texts.length === 0) {
    return NextResponse.json({ translations: {} })
  }

  try {
    const translations = await serverTranslateBatch(texts, locale)
    return NextResponse.json({ translations: Object.fromEntries(translations) })
  } catch {
    // Single-text retry as a last resort before giving up.
    if (texts.length === 1) {
      try {
        const translations = await serverTranslateBatch(texts, locale)
        return NextResponse.json({ translations: Object.fromEntries(translations) })
      } catch {
        return NextResponse.json({ translations: {} })
      }
    }
    return NextResponse.json({ translations: {} })
  }
}
