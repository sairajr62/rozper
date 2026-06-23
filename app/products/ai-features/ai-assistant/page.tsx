import { Metadata } from 'next'
import { ProdAIAssistantPageView } from '@/components/products/ai/assistant'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Virtual Assistant · Per-Seat AI for Every Agent | Rozper',
  description: 'Live coaching, auto-summaries, and suggested replies — on every call and message. Included on every Rozper seat.',
  openGraph: {
    title: 'AI Virtual Assistant · Per-Seat AI for Every Agent | Rozper',
    description: 'Live coaching, auto-summaries, and suggested replies — on every call and message.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ai-features/ai-assistant` },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/products/ai-features/ai-assistant#software`,
      name: 'Rozper AI Virtual Assistant',
      description:
        'Live call coaching, automatic call summaries, suggested replies, rep performance analytics, compliance monitoring, and post-call follow-up drafts — included on every Rozper seat.',
      url: `${SITE_URL}/products/ai-features/ai-assistant`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Included on every Rozper Business and Enterprise seat at no extra per-seat charge.',
      },
      featureList: [
        'Real-Time Call Coaching',
        'Auto Call Summaries',
        'Suggested Replies',
        'Rep Performance Analytics',
        'Compliance Monitoring',
        'Post-Call Follow-up Drafts',
      ],
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Rozper',
        url: SITE_URL,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Rozper',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/rozper-logo.png`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/products/ai-features/ai-assistant#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
        { '@type': 'ListItem', position: 3, name: 'AI Features', item: `${SITE_URL}/products/ai-features` },
        { '@type': 'ListItem', position: 4, name: 'AI Assistant', item: `${SITE_URL}/products/ai-features/ai-assistant` },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/products/ai-features/ai-assistant#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is it included on every Rozper seat?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. AI Assistant is included on Business and Enterprise plans at no extra per-seat charge.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I train it on my own data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Upload playbooks, FAQs, and product docs — the AI surfaces them during relevant calls.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does it work on inbound and outbound?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Live coaching runs on all call types — inbound, outbound, transfers, and conference.',
          },
        },
      ],
    },
  ],
}

export default function AIAssistantProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProdAIAssistantPageView />
    </>
  )
}
