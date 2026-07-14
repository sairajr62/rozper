import type { Metadata } from 'next'
import { FinancePageView } from '@/components/solutions/finance'
import { localizeMetadata } from "@/lib/locale-metadata"
import { SITE_URL, ORG_ID } from "@/lib/site"

const metadata: Metadata = {
  title: 'Compliant Contact Center for Financial Services | Rozper',
  description: 'Compliant contact center for banks, insurance carriers, and fintech companies, with PCI-compliant call recording, regulatory archiving, and audit controls.',
  openGraph: {
    title: 'Compliant Contact Center for Financial Services | Rozper',
    description: 'Compliant contact center for banks, insurance carriers, and fintech companies, with PCI-compliant call recording, regulatory archiving, and audit controls.',
    type: 'website',
    url: `${SITE_URL}/solutions/financial-services/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/financial-services/` },
}
export const generateMetadata = localizeMetadata(metadata)


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/financial-services#service/`,
      "name": "Contact Center for Financial Services",
      "description": "Compliant cloud contact center for banks, lenders, and financial services firms",
      "url": `${SITE_URL}/solutions/financial-services/`,
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
        { "@type": "ListItem", "position": 3, "name": "Contact Center for Financial Services", "item": `${SITE_URL}/solutions/financial-services/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help financial services firms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper provides a compliant contact center built for banks, lenders, and fintech companies — with call recording, PCI compliance controls, regulatory archiving, and audit trails that meet financial industry standards.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for financial services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers PCI-compliant call recording, regulatory archiving, encrypted communications, role-based access controls, GDPR and HIPAA compliance tools, and integrations with financial CRM and banking platforms.",
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
