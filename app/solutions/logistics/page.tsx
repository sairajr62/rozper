import type { Metadata } from 'next'
import { LogisticsPageView } from '@/components/solutions/logistics'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Cloud Phone System for Logistics & Dispatch | Rozper',
  description: 'Dispatch communications, driver calls, customer SMS updates, and real-time coordination tools built for logistics, fleet, and field operations teams worldwide.',
  openGraph: {
    title: 'Cloud Phone System for Logistics & Dispatch | Rozper',
    description: 'Dispatch communications, driver calls, customer SMS updates, and real-time coordination tools built for logistics, fleet, and field operations teams worldwide.',
    type: 'website',
    url: `${SITE_URL}/solutions/logistics/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/logistics/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/logistics#service/`,
      "name": "Phone System for Logistics & Dispatch",
      "description": "Voice and messaging platform for logistics, fleet dispatch, and field operations teams",
      "url": `${SITE_URL}/solutions/logistics/`,
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
        { "@type": "ListItem", "position": 3, "name": "Phone System for Logistics & Dispatch", "item": `${SITE_URL}/solutions/logistics/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help logistics & dispatch teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper streamlines dispatch communications with reliable voice calling, SMS updates for drivers and customers, and coordination tools that keep field operations teams connected across routes and regions.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for logistics teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper provides dispatch voice calling, two-way SMS, automated customer notifications, mobile apps for field teams, call recording, and integrations with logistics management platforms.",
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

export default function LogisticsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LogisticsPageView />
    </>
  )
}
