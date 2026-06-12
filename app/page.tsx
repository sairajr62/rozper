import dynamic from "next/dynamic"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { SITE_URL } from "@/lib/site"

// Below-fold sections: code-split so they don't block initial JS parse
const TrustBar = dynamic(() => import("@/components/landing/trust-bar").then(m => ({ default: m.TrustBar })))
const Features = dynamic(() => import("@/components/landing/features").then(m => ({ default: m.Features })))
const WhyRozper = dynamic(() => import("@/components/landing/why-rozper").then(m => ({ default: m.WhyRozper })))
const Products = dynamic(() => import("@/components/landing/products").then(m => ({ default: m.Products })))
const AISpotlight = dynamic(() => import("@/components/landing/ai-spotlight").then(m => ({ default: m.AISpotlight })))
const HowItWorks = dynamic(() => import("@/components/landing/how-it-works").then(m => ({ default: m.HowItWorks })))
const Roles = dynamic(() => import("@/components/landing/roles").then(m => ({ default: m.Roles })))
const IntegrationsSection = dynamic(() => import("@/components/landing/integrations-section").then(m => ({ default: m.IntegrationsSection })))
const Trust = dynamic(() => import("@/components/landing/trust").then(m => ({ default: m.Trust })))
const Testimonials = dynamic(() => import("@/components/landing/testimonials").then(m => ({ default: m.Testimonials })))
const FAQ = dynamic(() => import("@/components/landing/faq").then(m => ({ default: m.FAQ })))
const CTA = dynamic(() => import("@/components/landing/cta").then(m => ({ default: m.CTA })))
const Footer = dynamic(() => import("@/components/landing/footer").then(m => ({ default: m.Footer })))

export const metadata = {
  title: "Rozper · UCaaS, Contact Center & AI for Global Teams | rozper.com",
  description:
    "Voice, video, SMS, AI, and contact center on one carrier-grade platform. 150+ countries. 99.99% uptime. $9.99/user. Start a no-pressure conversation at rozper.com.",
  alternates: { canonical: `${SITE_URL}` },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Rozper",
  url: SITE_URL,
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
    url: `${SITE_URL}/contact`,
    availableLanguage: "English",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Rozper",
  description:
    "Voice, video, SMS, AI, and contact center on one carrier-grade platform. 150+ countries. 99.99% uptime.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <WhyRozper />
      <Products />
      <AISpotlight />
      <HowItWorks />
      <Roles />
      <IntegrationsSection />
      <Trust />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
