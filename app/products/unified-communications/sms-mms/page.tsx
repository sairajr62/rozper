import { Metadata } from 'next'
import { ProdUCaaSSMSMMSPageView } from '@/components/products/unified-communications/sms-mms'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Business SMS & MMS · Messaging Built for Teams | Rozper',
  description: 'Two-way messaging, bulk sends, and WhatsApp — all from your business number. SMS and MMS built for business scale.',
  openGraph: {
    title: 'Business SMS & MMS · Messaging Built for Teams | Rozper',
    description: 'Two-way messaging, bulk sends, and WhatsApp — all from your business number.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/sms-mms/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/unified-communications/sms-mms#app/`,
      "name": "Business SMS & MMS",
      "description": "Business text messaging with two-way SMS and MMS from your business number",
      "url": `${SITE_URL}/products/unified-communications/sms-mms/`,
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
        { "@type": "ListItem", "position": 4, "name": "Business SMS & MMS", "item": `${SITE_URL}/products/unified-communications/sms-mms/` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Business SMS & MMS?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's Business SMS & MMS provides two-way text and multimedia messaging directly from your business number, with bulk messaging and WhatsApp support built for business scale." }
        },
        {
          "@type": "Question",
          "name": "How much does Business SMS & MMS cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's unified communications plans start at $9.99 per user per month, including Business SMS & MMS and a 14-day free trial." }
        },
        {
          "@type": "Question",
          "name": "Does Business SMS & MMS work on mobile?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, Business SMS & MMS works on web browsers, iOS, and Android via the Rozper mobile app." }
        }
      ]
    }
  ]
}

export default function SMSMMSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdUCaaSSMSMMSPageView />
    </>
  )
}
