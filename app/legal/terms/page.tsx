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
    url: `${SITE_URL}/legal/terms/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/legal/terms/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/legal/terms#webpage/`,
      "name": "Terms of Service — Rozper",
      "description": "Rozper's terms of service outlining the conditions for using the Rozper platform and services.",
      "url": `${SITE_URL}/legal/terms/`,
      "publisher": { "@type": "Organization", "@id": `${SITE_URL}#organization`, "name": "Rozper" },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Legal", "item": `${SITE_URL}/legal/` },
        { "@type": "ListItem", "position": 3, "name": "Terms of Service", "item": `${SITE_URL}/legal/terms/` },
      ],
    },
  ],
}

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
