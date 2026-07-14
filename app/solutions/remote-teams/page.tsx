import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import {
  Breadcrumb,
  Hero,
  Stats,
  BentoFeatures,
  HowItWorks,
  CollaborationSection,
  Testimonials,
  FAQ,
  RelatedLinks,
  CTA,
} from './sections'
import { SITE_URL, ORG_ID } from "@/lib/site"
import { localizeMetadata } from "@/lib/locale-metadata"

const metadata = {
  title: 'Cloud Phone System for Remote & Distributed Teams | Rozper',
  description: 'Cloud calling, video, chat, and AI tools for distributed and remote teams — works from any device, in any country, across more than 150 countries worldwide.',
  openGraph: {
    title: 'Cloud Phone System for Remote & Distributed Teams | Rozper',
    description: 'Cloud calling, video, chat, and AI tools for distributed and remote teams — works from any device, in any country, across more than 150 countries worldwide.',
    type: 'website',
    url: `${SITE_URL}/solutions/remote-teams/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/remote-teams/` },
}

export const generateMetadata = localizeMetadata(metadata)

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/remote-teams#service/`,
      "name": "Phone System for Remote Teams",
      "description": "Cloud phone and collaboration tools for distributed remote teams worldwide",
      "url": `${SITE_URL}/solutions/remote-teams/`,
      "provider": {
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Rozper",
        "url": SITE_URL,
      },
      "serviceType": "Cloud Communications",
      "category": "Telecommunications",
      "areaServed": { "@type": "Place", "name": "Worldwide" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${SITE_URL}/solutions/` },
        { "@type": "ListItem", "position": 3, "name": "Phone System for Remote Teams", "item": `${SITE_URL}/solutions/remote-teams/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help remote teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper gives distributed teams cloud calling, video, chat, and AI tools that work from any device in any country across 150+ countries, keeping remote workers connected and productive regardless of location.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for remote teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers cloud phone, video conferencing, team messaging, AI assistant, mobile apps, international numbers, and collaboration tools that keep distributed teams aligned without requiring on-premise hardware.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Rozper offer a free trial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features. No credit card required.",
          },
        },
      ],
    },
  ],
}

export default function RemoteTeamsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-black">
        <Navbar />
        <Breadcrumb />
        <Hero />
        <Stats />
        <BentoFeatures />
        <HowItWorks />
        <CollaborationSection />
        <Testimonials />
        <FAQ />
        <RelatedLinks />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
