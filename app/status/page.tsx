import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { StatusHero } from "@/components/status/hero"
import { StatusServices } from "@/components/status/services"
import { StatusRegions } from "@/components/status/regions"
import { StatusMetrics } from "@/components/status/metrics"
import { StatusIncidents } from "@/components/status/incidents"
import { StatusSubscribe } from "@/components/status/subscribe"
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: "Platform Status · Uptime & Incidents | Rozper",
  description:
    "Real-time status for Rozper voice, messaging, AI, and APIs. Monitored across 14 regions with 90 days of incident history.",
  openGraph: {
    title: "Platform Status · Uptime & Incidents | Rozper",
    description:
      "Real-time status for Rozper voice, messaging, AI, and APIs. Monitored across 14 regions with 90 days of incident history.",
    type: "website",
    url: `${SITE_URL}/status/`,
    siteName: "Rozper",
  },
  alternates: { canonical: `${SITE_URL}/status/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/status#webpage/`,
      "name": "Rozper Platform Status",
      "description": "Real-time uptime and incident status for the Rozper platform, including voice, messaging, AI, and API services.",
      "url": `${SITE_URL}/status/`,
      "publisher": { "@type": "Organization", "@id": ORG_ID, "name": "Rozper" },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Status", "item": `${SITE_URL}/status/` },
      ],
    },
  ],
}

export default function StatusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <StatusHero />
      <StatusServices />
      <StatusRegions />
      <StatusMetrics />
      <StatusIncidents />
      <StatusSubscribe />
      <Footer />
    </main>
    </>
  )
}
