import { Metadata } from 'next'
import { ProdUCaaSWebsiteChatbotPageView } from '@/components/products/unified-communications/website-chatbot'
import { localizeMetadata } from "@/lib/locale-metadata"
import { SITE_URL, ORG_ID, WEBSITE_ID } from "@/lib/site"

const metadata: Metadata = {
  title: 'Website Chatbot · Engage Every Visitor 24/7 | Rozper',
  description: 'AI chatbot that captures leads, books meetings, and hands off to live agents with a simple one-line embed. Engage every website visitor 24 hours a day.',
  openGraph: {
    title: 'Website Chatbot · Engage Every Visitor 24/7 | Rozper',
    description: 'AI chatbot that captures leads, books meetings, and hands off to live agents with a simple one-line embed. Engage every website visitor 24 hours a day.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/website-chatbot/` },
}
export const generateMetadata = localizeMetadata(metadata)


const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/products/unified-communications/website-chatbot#webpage/`,
  url: `${SITE_URL}/products/unified-communications/website-chatbot/`,
  name: 'Website Chatbot · Engage Visitors 24/7 | Rozper',
  description: 'AI chatbot that captures leads, books meetings, and hands off to live agents — one-line embed. Engage visitors 24/7.',
  isPartOf: { '@id': WEBSITE_ID },
  publisher: { '@id': ORG_ID },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Rozper Website Chatbot',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE_URL}/products/unified-communications/website-chatbot/`,
  description: 'AI-powered website chatbot that captures leads, books meetings, and hands off to live agents with a one-line embed.',
  offers: {
    '@type': 'Offer',
    url: `${SITE_URL}/pricing/`,
    priceCurrency: 'USD',
  },
  publisher: {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Rozper',
    url: SITE_URL,
  },
}

export default function WebsiteChatbotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <ProdUCaaSWebsiteChatbotPageView />
    </>
  )
}
