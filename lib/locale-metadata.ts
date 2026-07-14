import type { Metadata } from "next"
import { headers } from "next/headers"
import { serverTranslate } from "./server-translator"
import { SITE_URL } from "./site"

export async function getRequestLocale(): Promise<string> {
  const h = await headers()
  return h.get("x-locale") ?? "en"
}

function localizedUrl(url: string | undefined, locale: string): string | undefined {
  if (!url || locale === "en") return url
  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname === "" ? "/" : parsed.pathname
    return `${SITE_URL}/${locale}${pathname}`
  } catch {
    return url
  }
}

async function translateIfString(value: unknown, locale: string): Promise<unknown> {
  if (typeof value !== "string" || !value) return value
  return serverTranslate(value, locale)
}

/** Translates and localizes an already-built Metadata object for the given locale. English is a no-op. */
export async function applyLocale(metadata: Metadata, locale: string): Promise<Metadata> {
  if (!locale || locale === "en") return metadata

  const title = typeof metadata.title === "string" ? await serverTranslate(metadata.title, locale) : metadata.title
  const description =
    typeof metadata.description === "string" ? await serverTranslate(metadata.description, locale) : metadata.description

  const og = metadata.openGraph
  const tw = metadata.twitter

  const [ogTitle, ogDescription, twTitle, twDescription] = await Promise.all([
    translateIfString(og?.title, locale),
    translateIfString(og?.description, locale),
    translateIfString(tw?.title, locale),
    translateIfString(tw?.description, locale),
  ])

  const canonicalStr =
    typeof metadata.alternates?.canonical === "string" ? metadata.alternates.canonical : undefined
  const ogUrlStr = typeof og?.url === "string" ? og.url : undefined

  return {
    ...metadata,
    title,
    description,
    alternates: metadata.alternates
      ? { ...metadata.alternates, canonical: localizedUrl(canonicalStr, locale) ?? metadata.alternates.canonical }
      : metadata.alternates,
    openGraph: og
      ? {
          ...og,
          title: (ogTitle as string) ?? og.title,
          description: (ogDescription as string) ?? og.description,
          url: localizedUrl(ogUrlStr, locale) ?? og.url,
        }
      : og,
    twitter: tw
      ? {
          ...tw,
          title: (twTitle as string) ?? tw.title,
          description: (twDescription as string) ?? tw.description,
        }
      : tw,
  }
}

/**
 * Wraps a static `Metadata` object into a Next.js `generateMetadata` function
 * that reads the current request's locale (set by middleware via the
 * `x-locale` header) and translates it. Usage:
 *
 *   const metadata = { title: "...", ... }
 *   export const generateMetadata = localizeMetadata(metadata)
 */
export function localizeMetadata(metadata: Metadata) {
  return async function generateMetadata(): Promise<Metadata> {
    const locale = await getRequestLocale()
    return applyLocale(metadata, locale)
  }
}
