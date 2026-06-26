import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { ApiHero } from "@/components/api/hero"
import { ApiExplorer } from "@/components/api/explorer"
import { ApiAuthSection } from "@/components/api/auth-section"
import { ApiErrorsSection } from "@/components/api/errors-section"
import { ApiWebhooks } from "@/components/api/webhooks"
import { ApiChangelog } from "@/components/api/changelog"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "API Reference · REST & WebSocket Docs | Rozper",
  description:
    "REST + WebSocket reference for the Rozper platform. Every endpoint, every parameter, every error code — with copy-paste examples in 8 languages.",
  openGraph: {
    title: "API Reference · REST & WebSocket Docs | Rozper",
    description:
      "REST + WebSocket reference for the Rozper platform. Every endpoint, every parameter, every error code — with copy-paste examples in 8 languages.",
    type: "website",
    url: `${SITE_URL}/docs/api/`,
    siteName: "Rozper",
    images: [
      {
        url: `${SITE_URL}/docs/api/opengraph-image/`,
        width: 1200,
        height: 630,
        alt: "API Reference · REST & WebSocket Docs | Rozper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "API Reference · REST & WebSocket Docs | Rozper",
    description:
      "REST + WebSocket reference for the Rozper platform. Every endpoint, every parameter, every error code — with copy-paste examples in 8 languages.",
    images: [`${SITE_URL}/docs/api/opengraph-image/`],
  },
  alternates: { canonical: `${SITE_URL}/docs/api/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${SITE_URL}/docs/api#webpage/`,
      "name": "Rozper API Reference",
      "description": "REST and WebSocket API reference for the Rozper platform. Endpoints for calls, SMS, numbers, and webhooks.",
      "url": `${SITE_URL}/docs/api/`,
      "publisher": { "@type": "Organization", "@id": `${SITE_URL}#organization`, "name": "Rozper", "url": SITE_URL },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Docs", "item": `${SITE_URL}/docs/` },
        { "@type": "ListItem", "position": 3, "name": "API Reference", "item": `${SITE_URL}/docs/api/` },
      ],
    },
  ],
}

export default function ApiReferencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <ApiHero />
      <ApiAuthSection />
      <ApiExplorer />
      <ApiErrorsSection />
      <ApiWebhooks />
      <ApiChangelog />
      <Footer />
    </main>
    </>
  )
}
