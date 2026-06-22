import { Metadata } from 'next'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { PricingHero } from '@/components/pricing/hero'
import { PricingPlans } from '@/components/pricing/plans'
import { PricingTestimonial } from '@/components/pricing/testimonial'
import { PricingFAQ } from '@/components/pricing/faq'
import { PricingCTA } from '@/components/pricing/cta'
import { RelatedLinks } from '@/components/product-page'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pricing · $9.99/user Business Phone & Contact Center | Rozper',
  description: 'Simple, transparent pricing starting at $9.99/user. UCaaS, contact center, and AI tools. 14-day free trial. rozper.com.',
  keywords: 'business phone pricing, UCaaS pricing, contact center pricing, Rozper',
  openGraph: {
    title: 'Pricing · $9.99/user Business Phone & Contact Center | Rozper',
    description: 'Simple, transparent pricing starting at $9.99/user. UCaaS, contact center, and AI tools. 14-day free trial.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/pricing` },
}

const relatedLinks = [
  { title: 'Enterprise Contact Center', description: 'High-volume CCaaS for large organizations', href: '/products/contact-center/enterprise' },
  { title: 'HubSpot Integration', description: 'Native CRM sync with HubSpot', href: '/integrations/hubspot' },
  { title: 'UCaaS Platform', description: 'Unified communications starting at $9.99/user', href: '/products/unified-communications' }
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Rozper",
      "description": "UCaaS, contact center, AI voice agents, and global numbers starting at $9.99 per user.",
      "url": `${SITE_URL}/pricing`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": [
        {
          "@type": "Offer",
          "name": "Starter",
          "price": "9.99",
          "priceCurrency": "USD",
          "priceSpecification": { "@type": "UnitPriceSpecification", "price": "9.99", "priceCurrency": "USD", "unitText": "user/month" },
        },
        { "@type": "Offer", "name": "Professional", "price": "19.99", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "Enterprise", "description": "Custom pricing for enterprise teams" },
      ],
      "provider": { "@type": "Organization", "@id": `${SITE_URL}#organization`, "name": "Rozper" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Pricing", "item": `${SITE_URL}/pricing` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does Rozper cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper plans start at $9.99 per user per month, including cloud phone, video meetings, team chat, and AI features." },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, Rozper offers a 14-day free trial with no credit card required." },
        },
        {
          "@type": "Question",
          "name": "Can I change my plan later?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can upgrade or downgrade your Rozper plan at any time from your account settings." },
        },
      ],
    },
  ],
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
