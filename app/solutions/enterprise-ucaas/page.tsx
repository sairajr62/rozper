import type { Metadata } from 'next'
import { EnterpriseITPageView } from '@/components/solutions/enterprise-it'
import { localizeMetadata } from "@/lib/locale-metadata"
import { SITE_URL, ORG_ID } from "@/lib/site"

const metadata: Metadata = {
  title: 'Enterprise UCaaS · SSO, SCIM & Multi-Site Support | Rozper',
  description: 'Enterprise phone and contact center platform with SSO, SCIM provisioning, multi-site management, custom SLAs, and GDPR/HIPAA compliance for enterprise IT teams.',
  openGraph: {
    title: 'Enterprise UCaaS · SSO, SCIM & Multi-Site Support | Rozper',
    description: 'Enterprise phone and contact center platform with SSO, SCIM provisioning, multi-site management, custom SLAs, and GDPR/HIPAA compliance for enterprise IT teams.',
    type: 'website',
    url: `${SITE_URL}/solutions/enterprise-ucaas/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/enterprise-ucaas/` },
}
export const generateMetadata = localizeMetadata(metadata)


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/solutions/enterprise-ucaas#service/`,
      "name": "Enterprise UCaaS",
      "description": "Enterprise-grade unified communications with SSO, SCIM provisioning, and multi-site support",
      "url": `${SITE_URL}/solutions/enterprise-ucaas/`,
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
        { "@type": "ListItem", "position": 3, "name": "Enterprise UCaaS", "item": `${SITE_URL}/solutions/enterprise-ucaas/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Rozper help enterprise organizations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper delivers enterprise-grade unified communications with SSO, SCIM provisioning, multi-site management, custom SLAs, and GDPR/HIPAA compliance — giving IT teams the controls and reliability large organizations require.",
          },
        },
        {
          "@type": "Question",
          "name": "What features does Rozper offer for enterprise UCaaS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers SSO, SCIM provisioning, multi-site support, custom SLAs, advanced analytics, dedicated account management, GDPR and HIPAA compliance, global PSTN coverage, and enterprise-grade uptime guarantees.",
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
