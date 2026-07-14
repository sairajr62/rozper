import { LOCALE_CODES } from "@/lib/locale"
import { SITE_URL } from "@/lib/site"

interface HreflangTagsProps {
  /** Current path with any locale prefix already stripped, e.g. "/pricing/". */
  path: string
}

/** Emits x-default + en + all 19 locale hreflang <link> tags for the current path. */
export function HreflangTags({ path }: HreflangTagsProps) {
  // Site-wide trailingSlash: true — every href below must end with "/" for
  // consistency with the actual canonical URLs (matches hreflang-tags.tsx's
  // sibling logic in locale-metadata.ts's localizedUrl()).
  const enHref = `${SITE_URL}${path === "/" ? "/" : path}`

  return (
    <>
      <link rel="alternate" hrefLang="x-default" href={enHref} />
      <link rel="alternate" hrefLang="en" href={enHref} />
      {LOCALE_CODES.map((code) => (
        <link key={code} rel="alternate" hrefLang={code} href={`${SITE_URL}/${code}${path === "/" ? "/" : path}`} />
      ))}
    </>
  )
}
