import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { WhyRozper } from "@/components/landing/why-rozper"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Industries } from "@/components/landing/industries"
import { TrustStats } from "@/components/landing/trust-stats"
import { Products } from "@/components/landing/products"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQ } from "@/components/landing/faq"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <WhyRozper />
      <HowItWorks />
      <Industries />
      <TrustStats />
      <Products />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
