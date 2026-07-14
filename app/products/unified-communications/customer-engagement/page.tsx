import { Metadata } from 'next'
import { ProdUCaaSCustomerEngagementPageView } from '@/components/products/unified-communications/customer-engagement'
import { localizeMetadata } from "@/lib/locale-metadata"
import { SITE_URL, ORG_ID } from "@/lib/site"

const metadata: Metadata = {
  title: 'Customer Engagement · Every Channel, One Inbox | Rozper',
  description: 'Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified in one inbox for every agent. Customer engagement built for fast, seamless conversations.',
  openGraph: {
    title: 'Customer Engagement · Every Channel, One Inbox | Rozper',
    description: 'Voice, SMS, WhatsApp, Instagram, Facebook, and web chat — unified in one inbox for every agent. Customer engagement built for fast, seamless conversations.',
    type: 'website',
    url: `${SITE_URL}/products/unified-communications/customer-engagement/`,
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/customer-engagement/` },
}
export const generateMetadata = localizeMetadata(metadata)


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/products/unified-communications/customer-engagement#app/`,
      "name": "Customer Engagement",
      "description": "Every customer channel — voice, chat, email, SMS — in one inbox",
      "url": `${SITE_URL}/products/unified-communications/customer-engagement/`,
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
        { "@type": "ListItem", "position": 4, "name": "Customer Engagement", "item": `${SITE_URL}/products/unified-communications/customer-engagement/` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Customer Engagement?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's Customer Engagement platform unifies voice, SMS, WhatsApp, Instagram, Facebook, and web chat into a single inbox so every agent can handle all customer conversations from one place." }
        },
        {
          "@type": "Question",
          "name": "How much does Customer Engagement cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rozper's unified communications plans start at $9.99 per user per month, including Customer Engagement and a 14-day free trial." }
        },
        {
          "@type": "Question",
          "name": "Does Customer Engagement work on mobile?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, Customer Engagement works on web browsers, iOS, and Android via the Rozper mobile app." }
        }
      ]
    }
  ]
}

export default function CustomerEngagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdUCaaSCustomerEngagementPageView />
    </>
  )
}
