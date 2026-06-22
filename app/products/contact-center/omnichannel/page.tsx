import type { Metadata } from 'next'
import { ProdCCOmnichannelPageView } from '@/components/products/contact-center/omnichannel'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Omnichannel Contact Center · Every Channel, One Screen | Rozper',
  description: 'Voice, chat, social, and SMS unified — with AI routing and full CRM context. Every channel, one agent screen.',
  openGraph: {
    title: 'Omnichannel Contact Center · Every Channel, One Screen | Rozper',
    description: 'Voice, chat, social, and SMS unified — with AI routing and full CRM context.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/omnichannel` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/contact-center/omnichannel#app`,
      "name": "Omnichannel Contact Center",
      "description": "Voice, chat, email, and social in a single agent workspace",
      "url": `${SITE_URL}/products/contact-center/omnichannel`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free trial available" },
      "provider": {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        "name": "Rozper",
        "url": SITE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products` },
        { "@type": "ListItem", "position": 3, "name": "Omnichannel Contact Center", "item": `${SITE_URL}/products/contact-center/omnichannel` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Omnichannel Contact Center?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Omnichannel Contact Center by Rozper unifies voice, chat, email, SMS, and social media into a single agent workspace with AI-powered routing and full CRM context, so every customer gets a consistent experience regardless of channel.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Omnichannel Contact Center integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Omnichannel Contact Center connects to your CRM, helpdesk, and social platforms through native integrations, ensuring agents see the full customer history across every channel in one view.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for Omnichannel Contact Center?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function CCOmnichannelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdCCOmnichannelPageView />
    </>
  )
}
