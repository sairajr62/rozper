import { Metadata } from 'next'
import { ProdUCaaSWebsiteChatbotPageView } from '@/components/products/unified-communications/website-chatbot'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Website Chatbot · Engage Visitors 24/7 | Rozper',
  description: 'AI chatbot that captures leads, books meetings, and hands off to live agents — one-line embed. Engage visitors 24/7.',
  openGraph: {
    title: 'Website Chatbot · Engage Visitors 24/7 | Rozper',
    description: 'AI chatbot that captures leads, books meetings, and hands off to live agents — one-line embed.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/website-chatbot` },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/products/unified-communications/website-chatbot#webpage`,
  url: `${SITE_URL}/products/unified-communications/website-chatbot`,
  name: 'Website Chatbot · Engage Visitors 24/7 | Rozper',
  description: 'AI chatbot that captures leads, books meetings, and hands off to live agents — one-line embed. Engage visitors 24/7.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': `${SITE_URL}/#organization` },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Rozper Website Chatbot',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE_URL}/products/unified-communications/website-chatbot`,
  description: 'AI-powered website chatbot that captures leads, books meetings, and hands off to live agents with a one-line embed.',
  offers: {
    '@type': 'Offer',
    url: `${SITE_URL}/pricing`,
    priceCurrency: 'USD',
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
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
