import type { Metadata } from 'next'
import { ProdCCEnterprisePageView } from '@/components/products/contact-center/enterprise'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Enterprise Contact Center · SSO, Multi-site, Custom SLAs | Rozper',
  description: 'SSO, SCIM, multi-site routing, custom SLAs, and a dedicated success team. Enterprise contact center, your rules.',
  openGraph: {
    title: 'Enterprise Contact Center · SSO, Multi-site, Custom SLAs | Rozper',
    description: 'SSO, SCIM, multi-site routing, custom SLAs, and a dedicated success team.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/enterprise/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/contact-center/enterprise#app/`,
      "name": "Enterprise Contact Center",
      "description": "Enterprise-grade contact center with SSO, multi-site, and custom SLAs",
      "url": `${SITE_URL}/products/contact-center/enterprise/`,
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
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products/` },
        { "@type": "ListItem", "position": 3, "name": "Enterprise Contact Center", "item": `${SITE_URL}/products/contact-center/enterprise/` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Enterprise Contact Center?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enterprise Contact Center is Rozper's enterprise-grade offering that adds SSO, SCIM provisioning, multi-site routing, custom SLAs, dedicated support, and advanced security controls on top of the full Rozper platform.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Enterprise Contact Center integrate with existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enterprise Contact Center supports SSO via SAML/OIDC, SCIM for user provisioning, and connects to enterprise CRMs, ERPs, and data platforms through certified integrations and a robust API.",
          },
        },
        {
          "@type": "Question",
          "name": "Is there a free trial for Enterprise Contact Center?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Rozper offers a 14-day free trial with full access to all features.",
          },
        },
      ],
    },
  ],
}

export default function CCEnterprisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdCCEnterprisePageView />
    </>
  )
}
