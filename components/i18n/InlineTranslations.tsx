import Script from "next/script"

interface InlineTranslationsProps {
  txMap: Record<string, string>
  locale: string
}

/**
 * Injects window.__LD_TX__ / window.__LD_SSR_LANG__ via next/script
 * (beforeInteractive), not a raw JSX <script>, since React 19 logs a
 * "script tag while rendering" error for the latter during Fast Refresh.
 */
export function InlineTranslations({ txMap, locale }: InlineTranslationsProps) {
  if (!locale || locale === "en") return null

  const payload = `window.__LD_TX__=${JSON.stringify(txMap)};window.__LD_SSR_LANG__=${JSON.stringify(locale)};`

  return (
    <Script id="ld-inline-translations" strategy="beforeInteractive">
      {payload}
    </Script>
  )
}
