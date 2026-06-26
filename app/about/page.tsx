import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { AboutHero } from "@/components/about/hero"
import { AboutStory } from "@/components/about/story"
import { AboutPrinciples } from "@/components/about/principles"
import { AboutTimeline } from "@/components/about/timeline"
import { AboutTeam } from "@/components/about/team"
import { AboutCTA } from "@/components/about/cta"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "About Rozper · Carrier-Grade UCaaS & Contact Center Platform",
  description:
    "Rozper unifies voice, video, contact center, and AI on one carrier-grade platform. Founded in 2018 — built so every call just works.",
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: {
    title: "About Rozper · Carrier-Grade UCaaS & Contact Center Platform",
    description:
      "Rozper unifies voice, video, contact center, and AI on one carrier-grade platform. Founded in 2018 — built so every call just works.",
    url: `${SITE_URL}/about/`,
    siteName: "Rozper",
    images: [
      {
        url: `${SITE_URL}/images/blog/Main_2672x941.webp`,
        width: 2672,
        height: 941,
        alt: "About Rozper – Unified Communications Platform",
      },
    ],
    type: "website",
  },
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage/`,
  url: `${SITE_URL}/about/`,
  name: "About Rozper · Carrier-Grade UCaaS & Contact Center Platform",
  description:
    "Rozper unifies voice, video, contact center, and AI on one carrier-grade platform. Founded in 2018 — built so every call just works.",
  isPartOf: { "@id": `${SITE_URL}/#website/` },
  publisher: { "@id": `${SITE_URL}/#organization/` },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization/`,
  name: "Rozper",
  url: SITE_URL,
  foundingDate: "2018",
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/white-rozper-logo.png`,
  },
  sameAs: [
    "https://www.linkedin.com/company/rozper",
    "https://twitter.com/rozper",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${SITE_URL}/contact/`,
    availableLanguage: "English",
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutPrinciples />
      <AboutTimeline />
      <AboutTeam />
      <AboutCTA />
      <Footer />
    </main>
  )
}
