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
  title: "Status · Rozper",
  description:
    "Real-time platform status. Voice, messaging, AI, dashboard, and APIs — all monitored from 14 regions, all 90 days of history visible.",
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
