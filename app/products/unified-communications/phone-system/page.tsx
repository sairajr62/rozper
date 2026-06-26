import { Metadata } from 'next'
import { ProdUCaaSPhoneSystemPageView } from '@/components/products/unified-communications/phone-system'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Hosted Phone System · Extensions, Hunt Groups, IVR | Rozper',
  description: 'Extensions, hunt groups, IVR, and dial plans — hosted on a carrier-grade network. Enterprise phone features, zero hardware.',
  openGraph: {
    title: 'Hosted Phone System · Extensions, Hunt Groups, IVR | Rozper',
    description: 'Extensions, hunt groups, IVR, and dial plans — hosted on a carrier-grade network.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/phone-system/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/unified-communications/phone-system#app/`,
      "name": "Hosted Phone System",
      "description": "Cloud-based phone system for businesses of all sizes",
      "url": `${SITE_URL}/products/unified-communications/phone-system/`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Starting at $9.99 per user/month" },
      "provider": {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        "name": "Rozper",
        "url": SITE_URL
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products/` },
        { "@type": "ListItem", "position": 3, "name": "Unified Communications", "item": `${SITE_URL}/products/unified-communications/` },
        { "@type": "ListItem", "position": 4, "name": "Hosted Phone System", "item": `${SITE_URL}/products/unified-communications/phone-system/` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Hosted Phone System?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's Hosted Phone System is a cloud-based phone solution with extensions, hunt groups, IVR, and dial plans — scalable for businesses of all sizes with zero on-premise hardware." }
        },
        {
          "@type": "Question",
          "name": "How much does Hosted Phone System cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's unified communications plans start at $9.99 per user per month, including Hosted Phone System and a 14-day free trial." }
        },
        {
          "@type": "Question",
          "name": "Does Hosted Phone System work on mobile?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, Hosted Phone System works on web browsers, iOS, and Android via the Rozper mobile app." }
        }
      ]
    }
  ]
}

export default function PhoneSystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdUCaaSPhoneSystemPageView />
    </>
  )
}
