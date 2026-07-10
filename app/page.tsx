import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { TrustBar } from "@/components/landing/trust-bar"
import { Features } from "@/components/landing/features"
import { WhyRozper } from "@/components/landing/why-rozper"
import { Products } from "@/components/landing/products"
import { AISpotlight } from "@/components/landing/ai-spotlight"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Roles } from "@/components/landing/roles"
import { IntegrationsSection } from "@/components/landing/integrations-section"
import { Trust } from "@/components/landing/trust"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQ } from "@/components/landing/faq"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"
import { SITE_URL, ORG_ID, WEBSITE_ID } from "@/lib/site"

export const metadata = {
  title: "Rozper · UCaaS, Contact Center & AI for Global Teams",
  description:
    "Voice, video, SMS, AI, and contact center on one carrier-grade platform covering 150+ countries with 99.99% uptime, starting at just $9.99 per user monthly.",
  alternates: { canonical: `${SITE_URL}` },
  openGraph: {
    title: "Rozper · UCaaS, Contact Center & AI for Global Teams",
    description:
      "Voice, video, SMS, AI, and contact center on one carrier-grade platform covering 150+ countries with 99.99% uptime, starting at just $9.99 per user monthly.",
    url: `${SITE_URL}`,
    siteName: "Rozper",
    type: "website",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Rozper",
  description:
    "Voice, video, SMS, AI, and contact center on one carrier-grade platform. 150+ countries. 99.99% uptime.",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}/` },
    "query-input": "required name=search_term_string",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      {/* 1. Hero */}
      <Hero />
      {/* 2. Trust / Logo Bar */}
      <TrustBar />
      {/* 3. Platform View */}
      <Features />
      {/* 4. Why Teams Switch */}
      <WhyRozper />
      {/* 6. Capability Library */}
      <Products />
      {/* 7. AI Receptionist Spotlight */}
      <AISpotlight />
      {/* 8. How It Works */}
      <HowItWorks />
      {/* 10. Built for Teams */}
      <Roles />
      {/* 11. Integrations */}
      <IntegrationsSection />
      {/* 12. Trust */}
      <Trust />
      {/* 13. Testimonials */}
      <Testimonials />
      {/* 14. FAQ */}
      <FAQ />
      {/* Final CTA */}
      <CTA />
      <Footer />
    </main>
  )
}
