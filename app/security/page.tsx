import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { LegalHero } from "@/components/legal/shared"
import { SecurityContent } from "@/components/legal/security-content"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Security & Compliance · Trust at Every Layer | Rozper",
  description:
    "Carrier-grade infrastructure, encryption everywhere, and audited controls. How Rozper keeps your communications safe.",
  openGraph: {
    title: "Security & Compliance · Trust at Every Layer | Rozper",
    description: "Carrier-grade infrastructure, encryption everywhere, and audited controls. How Rozper keeps your communications safe.",
    type: "website",
    url: `${SITE_URL}/security/`,
    siteName: "Rozper",
  },
  alternates: { canonical: `${SITE_URL}/security/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/security#webpage/`,
      "name": "Rozper Security & Compliance",
      "description": "Rozper's security posture — SOC 2, encryption, GDPR compliance, and enterprise-grade data protection.",
      "url": `${SITE_URL}/security/`,
      "publisher": { "@type": "Organization", "@id": `${SITE_URL}#organization`, "name": "Rozper" },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Security", "item": `${SITE_URL}/security/` },
      ],
    },
  ],
}

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
