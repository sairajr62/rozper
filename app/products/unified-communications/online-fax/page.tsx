import { Metadata } from 'next'
import { ProdUCaaSOnlineFaxPageView } from '@/components/products/unified-communications/online-fax'
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: 'Online Fax · Digital Fax for Business Teams | Rozper',
  description: 'Send and receive faxes from your browser, mobile device, or email — available in 150+ countries. Digital fax with no machine, no dedicated phone line.',
  openGraph: {
    title: 'Online Fax · Digital Fax for Business Teams | Rozper',
    description: 'Send and receive faxes from your browser, mobile device, or email — available in 150+ countries. Digital fax with no machine, no dedicated phone line.',
    type: 'website',
    url: `${SITE_URL}/products/unified-communications/online-fax/`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/online-fax/` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/unified-communications/online-fax#app/`,
      "name": "Online Fax",
      "description": "Send and receive faxes digitally from any device — no fax machine needed",
      "url": `${SITE_URL}/products/unified-communications/online-fax/`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Starting at $9.99 per user/month" },
      "provider": {
        "@type": "Organization",
        "@id": ORG_ID,
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
        { "@type": "ListItem", "position": 4, "name": "Online Fax", "item": `${SITE_URL}/products/unified-communications/online-fax/` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Online Fax?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's Online Fax lets you send and receive faxes digitally from your browser, mobile device, or email in 150+ countries — no fax machine or dedicated phone line required." }
        },
        {
          "@type": "Question",
          "name": "How much does Online Fax cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's unified communications plans start at $9.99 per user per month, including Online Fax and a 14-day free trial." }
        },
        {
          "@type": "Question",
          "name": "Does Online Fax work on mobile?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, Online Fax works on web browsers, iOS, and Android via the Rozper mobile app." }
        }
      ]
    }
  ]
}

export default function OnlineFaxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdUCaaSOnlineFaxPageView />
    </>
  )
}
