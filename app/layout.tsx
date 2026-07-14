import type { Metadata } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { headers } from 'next/headers'
import { BfcacheFix } from './bfcache-fix'
import { SITE_URL } from '@/lib/site'
import { SiteStructuredData } from '@/components/seo/structured-data'
import { HreflangTags } from '@/components/shared/hreflang-tags'
import { InlineTranslations } from '@/components/i18n/InlineTranslations'
import { GlobalTranslator } from '@/components/i18n/GlobalTranslator'
import { stripLocaleFromPathname } from '@/lib/locale'
import { isRTL } from '@/lib/translate'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Rozper - One Platform. Every Call. Every Country.',
  description: 'UCaaS, contact center, AI, and virtual numbers on a carrier-grade network covering 150+ countries. Starting at $9.99 per user.',
  generator: 'v0.app',
  icons: {
    icon: { url: '/icon.svg', type: 'image/svg+xml' },
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rozper',
    creator: '@rozper',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B1220',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const h = await headers()
  const locale = h.get('x-locale') ?? 'en'
  const pathname = stripLocaleFromPathname(h.get('x-pathname') ?? '/')
  const dir = isRTL(locale) ? 'rtl' : undefined

  return (
    <html
      lang={locale}
      dir={dir}
      className={`scroll-smooth ${archivo.variable} ${inter.variable}`}
      style={{ backgroundColor: '#0B1220' }}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" style={{ backgroundColor: '#0B1220', color: '#ffffff' }} suppressHydrationWarning>
        <HreflangTags path={pathname} />
        <InlineTranslations txMap={{}} locale={locale} />
        <BfcacheFix />
        <SiteStructuredData />
        <GlobalTranslator locale={locale} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.FLOATCHAT_WEBSITE_TOKEN && (
          <Script
            id="floatchat-sdk"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.floatchatSettings = {"position":"right","type":"standard","launcherTitle":""};
                (function(d,t) {
                  var BASE_URL="https://app.floatchat.com";
                  var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                  g.src=BASE_URL+"/packs/js/sdk.js";
                  g.async = true;
                  s.parentNode.insertBefore(g,s);
                  g.onload=function(){
                    window.floatchatSDK.run({ websiteToken: '${process.env.FLOATCHAT_WEBSITE_TOKEN}', baseUrl: BASE_URL })
                  }
                })(document,"script");
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
