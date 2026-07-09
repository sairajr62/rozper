import type { Metadata } from 'next'
import { EnterpriseITPageView } from '@/components/solutions/enterprise-it'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Enterprise UCaaS · SSO, SCIM & Multi-Site Support | Rozper',
  description: 'Enterprise phone and contact center platform with SSO, SCIM provisioning, multi-site management, custom SLAs, and GDPR/HIPAA compliance for enterprise IT teams.',
  openGraph: {
    title: 'Enterprise UCaaS · SSO, SCIM & Multi-Site Support | Rozper',
    description: 'Enterprise phone and contact center platform with SSO, SCIM provisioning, multi-site management, custom SLAs, and GDPR/HIPAA compliance for enterprise IT teams.',
    type: 'website',
    url: `${SITE_URL}/solutions/enterprise-it/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/enterprise-it/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/enterprise-it#service/`,
      "name": "Enterprise IT Communications",
      "description": "Carrier-grade phone system for enterprise IT with global coverage and 99.99% SLA",
      "url": `${SITE_URL}/solutions/enterprise-it/`,
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
        { "@type": "ListItem", "position": 3, "name": "Enterprise IT Communications", "item": `${SITE_URL}/solutions/enterprise-it/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help enterprise IT teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper provides carrier-grade infrastructure with 99.99% uptime SLA, global PSTN coverage, SSO, SCIM, multi-site management, and compliance controls that enterprise IT teams need for mission-critical communications.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for enterprise IT?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers 99.99% uptime SLA, global number coverage, SSO and SCIM provisioning, multi-site management, network redundancy, GDPR and HIPAA compliance, advanced security controls, and dedicated enterprise support.",
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

export default function EnterpriseITPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EnterpriseITPageView />
    </>
  )
}
