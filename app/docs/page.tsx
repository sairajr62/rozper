import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { DocsHero } from "@/components/docs/hero"
import { DocsExplorer } from "@/components/docs/explorer"
import { DocsLearningPaths } from "@/components/docs/learning-paths"
import { DocsQuickstart } from "@/components/docs/quickstart"
import { DocsSDKGrid } from "@/components/docs/sdk-grid"
import { DocsCommunity } from "@/components/docs/community"
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: "Documentation · Build with Rozper",
  description:
    "Everything you need to ship: quickstarts, SDKs, guides, and references for the Rozper voice, messaging, and AI platform.",
  alternates: { canonical: `${SITE_URL}/docs/` },
  openGraph: {
    title: "Documentation · Build with Rozper",
    description:
      "Everything you need to ship: quickstarts, SDKs, guides, and references for the Rozper voice, messaging, and AI platform.",
    type: "website",
    url: `${SITE_URL}/docs/`,
    siteName: "Rozper",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${SITE_URL}/docs#webpage/`,
      "name": "Rozper Developer Documentation",
      "description": "Official documentation for building with the Rozper platform — APIs, SDKs, webhooks, and integration guides.",
      "url": `${SITE_URL}/docs/`,
      "publisher": { "@type": "Organization", "@id": ORG_ID, "name": "Rozper", "url": SITE_URL },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Documentation", "item": `${SITE_URL}/docs/` },
      ],
    },
  ],
}

export default function DocsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      <DocsHero />
      <DocsQuickstart />
      <DocsExplorer />
      <DocsLearningPaths />
      <DocsSDKGrid />
      <DocsCommunity />
      <Footer />
    </main>
    </>
  )
}
