import type { Metadata } from 'next'
import { ProdCCOutboundDialerPageView } from '@/components/products/contact-center/outbound-dialer'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Outbound Dialer · Power & Predictive Dialing | Rozper',
  description: 'Power and predictive dialer with built-in compliance tools, live AI coaching, and CRM sync — outbound dialing that scales while staying fully compliant.',
  openGraph: {
    title: 'Outbound Dialer · Power & Predictive Dialing | Rozper',
    description: 'Power and predictive dialer with built-in compliance tools, live AI coaching, and CRM sync — outbound dialing that scales while staying fully compliant.',
    type: 'website',
    url: `${SITE_URL}/products/contact-center/outbound-dialer/`,
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/outbound-dialer/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/contact-center/outbound-dialer#app/`,
      "name": "Outbound Dialer",
      "description": "Power and predictive dialing for outbound sales and collections teams",
      "url": `${SITE_URL}/products/contact-center/outbound-dialer/`,
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
        { "@type": "ListItem", "position": 3, "name": "Outbound Dialer", "item": `${SITE_URL}/products/contact-center/outbound-dialer/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Outbound Dialer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Outbound Dialer is Rozper's power and predictive dialing solution built for outbound sales, collections, and customer outreach teams, with built-in compliance tools, AI coaching, and automatic CRM sync.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Outbound Dialer integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Outbound Dialer syncs with your CRM to import contact lists, log call outcomes, and update records automatically, while compliance tools help teams stay aligned with TCPA and DNC regulations.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for Outbound Dialer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function CCOutboundDialerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdCCOutboundDialerPageView />
    </>
  )
}
