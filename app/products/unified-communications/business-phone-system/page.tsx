import { Metadata } from 'next'
import { ProdUCaaSBusinessPhonePageView } from '@/components/products/unified-communications/business-phone'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Business Phone · Cloud Calling for Global Teams | Rozper',
  description: 'Cloud phone with local numbers, smart routing, and AI — wherever your team is. Business calling built for 150+ countries.',
  openGraph: {
    title: 'Business Phone · Cloud Calling for Global Teams | Rozper',
    description: 'Cloud phone with local numbers, smart routing, and AI — wherever your team is.',
    type: 'website',
    url: `${SITE_URL}/products/unified-communications/business-phone-system/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/business-phone-system/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/unified-communications/business-phone-system#app/`,
      "name": "Business Phone System",
      "description": "Cloud-hosted business phone system with auto-attendant, call routing, and global numbers",
      "url": `${SITE_URL}/products/unified-communications/business-phone-system/`,
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
        { "@type": "ListItem", "position": 4, "name": "Business Phone System", "item": `${SITE_URL}/products/unified-communications/business-phone-system/` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Business Phone System?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's Business Phone System is a cloud-hosted phone solution with auto-attendant, intelligent call routing, and global number coverage across 150+ countries — no hardware required." }
        },
        {
          "@type": "Question",
          "name": "How much does Business Phone System cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's unified communications plans start at $9.99 per user per month, including Business Phone System and a 14-day free trial." }
        },
        {
          "@type": "Question",
          "name": "Does Business Phone System work on mobile?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, Business Phone System works on web browsers, iOS, and Android via the Rozper mobile app." }
        }
      ]
    }
  ]
}

export default function BusinessPhonePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdUCaaSBusinessPhonePageView />
    </>
  )
}
