import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { LegalHero } from "@/components/legal/shared"
import { SecurityContent } from "@/components/legal/security-content"

export const metadata: Metadata = {
  title: "Security · Rozper",
  description:
    "Carrier-grade infrastructure, encryption everywhere, and audited controls. How Rozper keeps your communications safe.",
}

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <LegalHero
        eyebrow="Trust · Security · Compliance"
        title="Security at"
        gradientTail="every layer."
        description="Carrier-grade infrastructure, encryption in transit and at rest, third-party audits every quarter, and a security team you can actually email."
      />
      <SecurityContent />
      <Footer />
    </main>
  )
}
