import type { Metadata } from 'next'
import { SalesTeamsPageView } from '@/components/solutions/sales-teams'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cloud Phone for Sales Teams | Rozper',
  description: 'Power dialer, AI coaching, CRM sync, and conversation intelligence for sales teams. More dials. Better calls. More closed. rozper.com.',
  openGraph: {
    title: 'Cloud Phone for Sales Teams | Rozper',
    description: 'Power dialer, AI coaching, CRM sync, and conversation intelligence for sales teams. More dials. Better calls. More closed.',
    type: 'website',
    url: `${SITE_URL}/solutions/sales-teams`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/sales-teams` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/sales-teams#service`,
      "name": "Cloud Phone for Sales Teams",
      "description": "Cloud phone system with power dialer, call recording, and CRM integrations for sales teams",
      "url": `${SITE_URL}/solutions/sales-teams`,
      "provider": {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
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
        { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${SITE_URL}/solutions` },
        { "@type": "ListItem", "position": 3, "name": "Cloud Phone for Sales Teams", "item": `${SITE_URL}/solutions/sales-teams` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help sales teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper equips sales teams with a power dialer, AI coaching, conversation intelligence, and CRM sync so reps can make more dials, have better conversations, and close more deals from any device.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for sales teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers a power dialer, call recording, AI-powered coaching, conversation intelligence, CRM integrations, click-to-call, voicemail drop, and real-time leaderboards designed to maximize sales team productivity.",
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

export default function SalesTeamsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SalesTeamsPageView />
    </>
  )
}
