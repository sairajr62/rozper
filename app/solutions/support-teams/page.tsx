import type { Metadata } from 'next'
import { SupportTeamsPageView } from '@/components/solutions/support-teams'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Omnichannel Contact Center for Support Teams | Rozper',
  description: 'Omnichannel support inbox for voice, chat, SMS, and social. AI agent assist, CRM sync, and SLA tools. rozper.com.',
  openGraph: {
    title: 'Omnichannel Contact Center for Support Teams | Rozper',
    description: 'Omnichannel support inbox for voice, chat, SMS, and social. AI agent assist, CRM sync, and SLA tools.',
    type: 'website',
    url: `${SITE_URL}/solutions/support-teams`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/support-teams` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/support-teams#service`,
      "name": "Contact Center for Support Teams",
      "description": "Omnichannel contact center for support teams with AI agent assist and real-time dashboards",
      "url": `${SITE_URL}/solutions/support-teams`,
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
        { "@type": "ListItem", "position": 3, "name": "Contact Center for Support Teams", "item": `${SITE_URL}/solutions/support-teams` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help support teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper provides an omnichannel support inbox that unifies voice, chat, SMS, and social channels with AI agent assist, real-time dashboards, CRM sync, and SLA management tools — so support teams can resolve issues faster and maintain high customer satisfaction.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for support teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers omnichannel routing, AI agent assist, live call monitoring, CRM integrations, SLA tracking, real-time dashboards, call recording, and workforce management tools purpose-built for customer support operations.",
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

export default function SupportTeamsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SupportTeamsPageView />
    </>
  )
}
