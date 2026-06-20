import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { StatusHero } from "@/components/status/hero"
import { StatusServices } from "@/components/status/services"
import { StatusRegions } from "@/components/status/regions"
import { StatusMetrics } from "@/components/status/metrics"
import { StatusIncidents } from "@/components/status/incidents"
import { StatusSubscribe } from "@/components/status/subscribe"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Platform Status · Uptime & Incidents | Rozper",
  description:
    "Real-time status for Rozper voice, messaging, AI, and APIs. Monitored across 14 regions with 90 days of incident history.",
  openGraph: {
    title: "Platform Status · Uptime & Incidents | Rozper",
    description:
      "Real-time status for Rozper voice, messaging, AI, and APIs. Monitored across 14 regions with 90 days of incident history.",
    type: "website",
    url: `${SITE_URL}/status`,
    siteName: "Rozper",
  },
  alternates: { canonical: `${SITE_URL}/status` },
}

export default function StatusPage() {
  return (
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
  )
}
