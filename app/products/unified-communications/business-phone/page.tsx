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
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/business-phone/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/unified-communications/business-phone#app/`,
      "name": "Business Phone",
      "description": "Cloud calling for global teams with HD voice, call routing, and 150+ country coverage",
      "url": `${SITE_URL}/products/unified-communications/business-phone/`,
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
        { "@type": "ListItem", "position": 4, "name": "Business Phone", "item": `${SITE_URL}/products/unified-communications/business-phone/` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Business Phone?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's Business Phone is a cloud calling solution that gives global teams HD voice quality, intelligent call routing, and local numbers in 150+ countries." }
        },
        {
          "@type": "Question",
          "name": "How much does Business Phone cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's unified communications plans start at $9.99 per user per month, including Business Phone and a 14-day free trial." }
        },
        {
          "@type": "Question",
          "name": "Does Business Phone work on mobile?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, Business Phone works on web browsers, iOS, and Android via the Rozper mobile app." }
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
