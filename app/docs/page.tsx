import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { DocsHero } from "@/components/docs/hero"
import { DocsExplorer } from "@/components/docs/explorer"
import { DocsLearningPaths } from "@/components/docs/learning-paths"
import { DocsQuickstart } from "@/components/docs/quickstart"
import { DocsSDKGrid } from "@/components/docs/sdk-grid"
import { DocsCommunity } from "@/components/docs/community"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Documentation · Build with Rozper",
  description:
    "Everything you need to ship: quickstarts, SDKs, guides, and references for the Rozper voice, messaging, and AI platform.",
  alternates: { canonical: `${SITE_URL}/docs` },
  openGraph: {
    title: "Documentation · Build with Rozper",
    description:
      "Everything you need to ship: quickstarts, SDKs, guides, and references for the Rozper voice, messaging, and AI platform.",
    type: "website",
    url: `${SITE_URL}/docs`,
    siteName: "Rozper",
  },
}

export default function DocsPage() {
  return (
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
  )
}
