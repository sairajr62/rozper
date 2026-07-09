import { Metadata } from 'next'
import { FeatTollFreeNumbersPageView } from '@/components/features/toll-free-numbers'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Toll-Free Numbers · 800, 888, 877 & International | Rozper',
  description: 'Instant toll-free number provisioning in 150+ countries. USA 800, 888, and 877 numbers plus international freephone options, routed to any destination.',
  openGraph: {
    title: 'Toll-Free Numbers · 800, 888, 877 & International | Rozper',
    description: 'Instant toll-free number provisioning in 150+ countries. USA 800, 888, and 877 numbers plus international freephone options, routed to any destination.',
    type: 'website',
    url: `${SITE_URL}/features/toll-free-numbers/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/features/toll-free-numbers/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/features/toll-free-numbers#service/`,
      "name": "Toll-Free Numbers",
      "description": "Instant toll-free number provisioning in 150+ countries. USA 800/888/877 and international freephone.",
      "url": `${SITE_URL}/features/toll-free-numbers/`,
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
        { "@type": "ListItem", "position": 2, "name": "Features", "item": `${SITE_URL}/features/` },
        { "@type": "ListItem", "position": 3, "name": "Toll-Free Numbers", "item": `${SITE_URL}/features/toll-free-numbers/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Toll-Free Numbers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Toll-Free Numbers from Rozper are 800, 888, and 877 numbers (and international freephone equivalents) that let customers call your business at no charge to them, establishing a national or global presence and increasing inbound call volume.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Toll-Free Numbers work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You provision a toll-free number instantly from Rozper's dashboard, choose your country and prefix, and the number is live within minutes. Calls to the number are routed to any destination — SIP trunk, team, or IVR — with full call analytics and no extra hardware needed.",
          },
        },
        {
          "@type": "Question",
          "name": "Who uses Toll-Free Numbers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Toll-Free Numbers are used by businesses that want a professional, nationwide brand presence — including e-commerce companies, customer support centers, healthcare providers, and any organization that wants customers to call them without worrying about long-distance charges.",
          },
        },
      ],
    },
  ],
}

export default function TollFreeNumbersFeaturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeatTollFreeNumbersPageView />
    </>
  )
}
