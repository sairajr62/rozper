import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { LegalHero } from "@/components/legal/shared"
import { PrivacyContent } from "@/components/legal/privacy-content"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy Policy · Rozper",
  description:
    "How Rozper collects, uses, and protects personal information across our platform and websites.",
  alternates: { canonical: `${SITE_URL}/legal/privacy` },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <LegalHero
        eyebrow="Legal · Privacy"
        title="Privacy"
        gradientTail="policy."
        description="What we collect, how we use it, and the controls you have. Plain language, no surprises."
        lastUpdated="May 15, 2026"
      />
      <PrivacyContent />
      <Footer />
    </main>
  )
}
