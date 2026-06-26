import type { Metadata } from 'next'
import { FinancePageView } from '@/components/solutions/finance'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Center for Financial Services | Rozper',
  description: 'Compliant contact center for banks, insurance, and fintech. Call recording, PCI compliance, and regulatory controls. rozper.com.',
  openGraph: {
    title: 'Contact Center for Financial Services | Rozper',
    description: 'Compliant contact center for banks, insurance, and fintech. Call recording, PCI compliance, and regulatory controls.',
    type: 'website',
    url: `${SITE_URL}/solutions/finance/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/finance/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/finance#service/`,
      "name": "Contact Center for Financial Services",
      "description": "Secure, compliant contact center for financial services companies",
      "url": `${SITE_URL}/solutions/finance/`,
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
        { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${SITE_URL}/solutions/` },
        { "@type": "ListItem", "position": 3, "name": "Contact Center for Financial Services", "item": `${SITE_URL}/solutions/finance/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help financial services companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper delivers a secure, compliant contact center for banks, insurance providers, and fintech companies — with PCI-compliant call recording, regulatory archiving, and encryption to meet industry compliance requirements.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for finance companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers PCI compliance, call recording and archiving, encrypted communications, role-based access, regulatory controls, audit trails, and integrations with financial CRM and core banking systems.",
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

export default function FinancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FinancePageView />
    </>
  )
}
