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
    url: `${SITE_URL}/compare/`,
  },
  alternates: { canonical: `${SITE_URL}/compare/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "Rozper vs RingCentral, 8x8, Vonage & Twilio",
      "description": "Compare Rozper's pricing, features, and global coverage against leading UCaaS providers.",
      "url": `${SITE_URL}/compare/`,
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Compare", "item": `${SITE_URL}/compare/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper compare to RingCentral?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers comparable UCaaS features to RingCentral — including cloud phone, video, team chat, and contact center — at a lower starting price with built-in AI tools and no per-feature add-on fees.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Rozper compare to 8x8?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper matches 8x8's global voice coverage and contact center capabilities while providing a more modern AI-first platform with simpler pricing and faster onboarding.",
          },
        },
        {
          "@type": "Question",
          "name": "Why switch to Rozper?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper combines UCaaS, CCaaS, and AI voice agents into one platform starting at $9.99 per user — eliminating the need for multiple vendors and reducing total cost of ownership.",
          },
        },
      ],
    },
  ],
}

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0B1220]">
        <Navbar />
        <CompareHero />
        <PlansCompare />
        <FeaturesMatrix />
        <SavingsCalculator />
        <CompareCTA />
        <Footer />
      </main>
    </>
  )
}
