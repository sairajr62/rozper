import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { LegalHero } from "@/components/legal/shared"
import { PrivacyContent } from "@/components/legal/privacy-content"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy Policy · How Rozper Protects Your Data | Rozper",
  description:
    "How Rozper collects, uses, and protects personal information across our platform and websites.",
  openGraph: {
    title: "Privacy Policy · How Rozper Protects Your Data | Rozper",
    description: "How Rozper collects, uses, and protects personal information across our platform and websites.",
    type: 'website',
    url: `${SITE_URL}/legal/privacy`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/legal/privacy` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/legal/privacy#webpage`,
      "name": "Privacy Policy — Rozper",
      "description": "Rozper's privacy policy explaining how we collect, use, and protect your personal data.",
      "url": `${SITE_URL}/legal/privacy`,
      "publisher": { "@type": "Organization", "@id": `${SITE_URL}#organization`, "name": "Rozper" },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Legal", "item": `${SITE_URL}/legal` },
        { "@type": "ListItem", "position": 3, "name": "Privacy Policy", "item": `${SITE_URL}/legal/privacy` },
      ],
    },
  ],
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
