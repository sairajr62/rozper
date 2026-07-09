import type { Metadata } from 'next'
import { ContactCenterPageView } from '@/components/products/contact-center/overview'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Contact Center · AI-Powered Omnichannel Platform | Rozper',
  description: 'Omnichannel inbox, AI agents, supervisor tools, and rich analytics unified in one platform — a contact center that answers, routes, and resolves itself.',
  openGraph: {
    title: 'Contact Center · AI-Powered Omnichannel Platform | Rozper',
    description: 'Omnichannel inbox, AI agents, supervisor tools, and rich analytics unified in one platform — a contact center that answers, routes, and resolves itself.',
    type: 'website',
    url: `${SITE_URL}/products/contact-center/`,
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/contact-center#app/`,
      "name": "Contact Center",
      "description": "AI-powered omnichannel contact center for inbound and outbound teams",
      "url": `${SITE_URL}/products/contact-center/`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free trial available" },
      "provider": {
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "Rozper",
        "url": SITE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products/` },
        { "@type": "ListItem", "position": 3, "name": "Contact Center", "item": `${SITE_URL}/products/contact-center/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Contact Center?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper Contact Center is an AI-powered omnichannel platform that handles inbound and outbound voice, chat, email, and social interactions from a single agent workspace — with built-in AI, supervisor tools, and analytics.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Contact Center integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper Contact Center connects to leading CRMs, helpdesks, and workforce management tools through native integrations and open APIs, so agents always have full context.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for Contact Center?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function ContactCenterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactCenterPageView />
    </>
  )
}
