export const LOCALE_CODES = [
  "es", "fr", "de", "it", "pt", "nl", "pl", "ru", "tr", "ar",
  "hi", "zh", "ja", "ko", "vi", "id", "th", "sv", "uk",
] as const

export type LocaleCode = (typeof LOCALE_CODES)[number]

const LOCALE_SET = new Set<string>(LOCALE_CODES)

export function isLocaleCode(value: string): value is LocaleCode {
  return LOCALE_SET.has(value)
}

/** Returns the locale segment from a pathname like "/fr/pricing/", or null if the path has no locale prefix (English). */
export function getLocaleFromPathname(pathname: string): LocaleCode | null {
  const segment = pathname.split("/").filter(Boolean)[0]
  if (segment && isLocaleCode(segment)) return segment
  return null
}

/** Strips a leading locale segment from a pathname, e.g. "/fr/pricing/" -> "/pricing/". Returns "/" unchanged if no locale prefix. */
export function stripLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname)
  if (!locale) return pathname
  const rest = pathname.slice(`/${locale}`.length)
  return rest === "" ? "/" : rest
}

/** Builds a path with the given locale prefix, replacing any existing locale prefix on the input path. */
export function addLocaleToPath(pathname: string, locale: string): string {
  const stripped = stripLocaleFromPathname(pathname)
  if (locale === "en") return stripped
  const withoutLeadingSlash = stripped === "/" ? "" : stripped
  return `/${locale}${withoutLeadingSlash}`
}
