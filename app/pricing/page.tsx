import { Metadata } from 'next'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { PricingHero } from '@/components/pricing/hero'
import { PricingPlans } from '@/components/pricing/plans'
import { PricingTestimonial } from '@/components/pricing/testimonial'
import { PricingFAQ } from '@/components/pricing/faq'
import { PricingCTA } from '@/components/pricing/cta'
import { RelatedLinks } from '@/components/product-page'

export const metadata: Metadata = {
  title: 'Pricing · $9.99/user Business Phone & Contact Center | Rozper',
  description: 'Simple, transparent pricing starting at $9.99/user. UCaaS, contact center, and AI tools. 14-day free trial. rozper.com.',
  keywords: 'business phone pricing, UCaaS pricing, contact center pricing, Rozper',
  openGraph: {
    title: 'Pricing · $9.99/user Business Phone & Contact Center | Rozper',
    description: 'Simple, transparent pricing starting at $9.99/user. UCaaS, contact center, and AI tools. 14-day free trial.',
    type: 'website',
  },
}

const relatedLinks = [
  { title: 'Healthcare', description: 'HIPAA-compliant communications for healthcare teams', href: '/solutions/healthcare' },
  { title: 'Enterprise Contact Center', description: 'High-volume CCaaS for large organizations', href: '/products/contact-center/enterprise' },
  { title: 'HubSpot Integration', description: 'Native CRM sync with HubSpot', href: '/integrations/hubspot' },
  { title: 'UCaaS Platform', description: 'Unified communications starting at $9.99/user', href: '/products/ucaas' }
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <PricingHero />
      <PricingPlans />
      <PricingTestimonial />
      <RelatedLinks
        title="See How Teams Use Rozper"
        subtitle="Explore solutions for your industry and team size."
        links={relatedLinks}
      />
      <PricingFAQ />
      <PricingCTA />
      <Footer />
    </main>
  )
}
