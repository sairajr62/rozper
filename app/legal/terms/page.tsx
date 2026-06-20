import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { LegalHero } from "@/components/legal/shared"
import { TermsContent } from "@/components/legal/terms-content"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms of Service · Platform Usage Agreement | Rozper",
  description:
    "The agreement between you and Rozper for use of the platform and related services.",
  openGraph: {
    title: "Terms of Service · Platform Usage Agreement | Rozper",
    description: "The agreement between you and Rozper for use of the platform and related services.",
    type: 'website',
    url: `${SITE_URL}/legal/terms`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/legal/terms` },
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <LegalHero
        eyebrow="Legal · Terms"
        title="Terms of"
        gradientTail="service."
        description="The agreement that covers your use of Rozper — written to be readable, not just enforceable."
        lastUpdated="May 15, 2026"
      />
      <TermsContent />
      <Footer />
    </main>
  )
}
