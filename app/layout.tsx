import type { Metadata } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { BfcacheFix } from './bfcache-fix'
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
  metadataBase: new URL('https://rozper.com'),
  title: 'Rozper - One Platform. Every Call. Every Country.',
  description: 'UCaaS, contact center, AI, and virtual numbers on a carrier-grade network covering 150+ countries. Starting at $9.99 per user.',
  generator: 'v0.app',
  icons: {
    icon: { url: '/icon.svg', type: 'image/svg+xml' },
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${archivo.variable} ${inter.variable}`} style={{ backgroundColor: '#0B1220' }}>
      <body className="font-sans antialiased" style={{ backgroundColor: '#0B1220', color: '#ffffff' }} suppressHydrationWarning>
        <BfcacheFix />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Script id="floatchat" strategy="afterInteractive">{`
          window.floatchatSettings = {"position":"right","type":"standard","launcherTitle":""};
          (function(d,t) {
            var BASE_URL="https://app.floatchat.com";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.floatchatSDK.run({
                websiteToken: 'Y5dhjsU4KbGVne8XFCxbtGxK',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
        `}</Script>
      </body>
    </html>
  )
}
