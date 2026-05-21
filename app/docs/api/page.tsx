import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { ApiHero } from "@/components/api/hero"
import { ApiExplorer } from "@/components/api/explorer"
import { ApiAuthSection } from "@/components/api/auth-section"
import { ApiErrorsSection } from "@/components/api/errors-section"
import { ApiWebhooks } from "@/components/api/webhooks"
import { ApiChangelog } from "@/components/api/changelog"

export const metadata: Metadata = {
  title: "API Reference · Rozper",
  description:
    "REST + WebSocket reference for the Rozper platform. Every endpoint, every parameter, every error code — with copy-paste examples in 8 languages.",
}

export default function ApiReferencePage() {
  return (
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
  )
}
