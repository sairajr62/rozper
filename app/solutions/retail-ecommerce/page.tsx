import type { Metadata } from 'next'
import { RetailPageView } from '@/components/solutions/retail'
import { localizeMetadata } from "@/lib/locale-metadata"
import { SITE_URL, ORG_ID } from "@/lib/site"

const metadata: Metadata = {
  title: 'Omnichannel Contact Center for Retail & eCommerce | Rozper',
  description: 'Omnichannel support for retail and eCommerce brands — voice, chat, SMS, and social channels unified in one platform, built to handle seasonal traffic peaks.',
  openGraph: {
    title: 'Omnichannel Contact Center for Retail & eCommerce | Rozper',
    description: 'Omnichannel support for retail and eCommerce brands — voice, chat, SMS, and social channels unified in one platform, built to handle seasonal traffic peaks.',
    type: 'website',
    url: `${SITE_URL}/solutions/retail-ecommerce/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/retail-ecommerce/` },
}
export const generateMetadata = localizeMetadata(metadata)


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/retail-ecommerce#service/`,
      "name": "Contact Center for Retail & eCommerce",
      "description": "Omnichannel customer service for retail and eCommerce brands",
      "url": `${SITE_URL}/solutions/retail-ecommerce/`,
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
        { "@type": "ListItem", "position": 3, "name": "Contact Center for Retail & eCommerce", "item": `${SITE_URL}/solutions/retail-ecommerce/` },
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
            "text": "Rozper unifies voice, chat, SMS, and social into one omnichannel contact center so retail and eCommerce brands can handle peak season volumes, reduce response times, and deliver consistent customer experiences across all channels.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for retail & eCommerce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers omnichannel routing, live chat, order update SMS, social messaging, AI chatbots, workforce management, analytics dashboards, and CRM integrations to handle high-volume retail customer service.",
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
