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

export const metadata = {
  title: "Rozper · UCaaS, Contact Center & AI for Global Teams | rozper.com",
  description:
    "Voice, video, SMS, AI, and contact center on one carrier-grade platform. 150+ countries. 99.99% uptime. $9.99/user. Start a no-pressure conversation at rozper.com.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
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
