import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { CompareHero } from "@/components/compare/hero"
import { PlansCompare } from "@/components/compare/plans-compare"
import { FeaturesMatrix } from "@/components/compare/features-matrix"
import { SavingsCalculator } from "@/components/compare/savings"
import { CompareCTA } from "@/components/compare/cta"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Compare Rozper vs RingCentral, 8x8, Vonage & Twilio",
  description:
    "Honest head-to-head: Rozper UCaaS + AI vs RingCentral, 8x8, Vonage & Twilio Flex. Side-by-side pricing, features, and total-cost calculator.",
  keywords:
    "Rozper vs RingCentral, Rozper vs 8x8, Rozper vs Vonage, Rozper vs Twilio, UCaaS comparison, contact center comparison, AI receptionist comparison",
  openGraph: {
    title: "Rozper vs. the legacy stack",
    description:
      "Side-by-side pricing and feature comparison against RingCentral, 8x8, Vonage, and Twilio Flex.",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/compare` },
}

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <CompareHero />
      <PlansCompare />
      <FeaturesMatrix />
      <SavingsCalculator />
      <CompareCTA />
      <Footer />
    </main>
  )
}
