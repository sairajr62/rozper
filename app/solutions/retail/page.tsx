import type { Metadata } from 'next'
import { RetailPageView } from '@/components/solutions/retail'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Omnichannel Contact Center for Retail & eCommerce | Rozper',
  description: 'Omnichannel support for retail and eCommerce brands — voice, chat, SMS, and social channels unified in one platform, built to handle seasonal traffic peaks.',
  openGraph: {
    title: 'Omnichannel Contact Center for Retail & eCommerce | Rozper',
    description: 'Omnichannel support for retail and eCommerce brands — voice, chat, SMS, and social channels unified in one platform, built to handle seasonal traffic peaks.',
    type: 'website',
    url: `${SITE_URL}/solutions/retail/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/retail/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/retail#service/`,
      "name": "Contact Center for Retail & eCommerce",
      "description": "Omnichannel support platform for retail and eCommerce businesses",
      "url": `${SITE_URL}/solutions/retail/`,
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
        { "@type": "ListItem", "position": 3, "name": "Contact Center for Retail & eCommerce", "item": `${SITE_URL}/solutions/retail/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help retail & eCommerce businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper unifies voice, chat, SMS, and social channels so retail and eCommerce businesses can deliver consistent omnichannel support, handle seasonal peaks, and improve customer satisfaction across all touchpoints.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for retail & eCommerce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper provides omnichannel routing, live chat, SMS order updates, social messaging, AI-powered chatbots, workforce scheduling, real-time analytics, and eCommerce platform integrations.",
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

export default function RetailPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RetailPageView />
    </>
  )
}
