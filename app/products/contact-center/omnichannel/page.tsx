import type { Metadata } from 'next'
import { ProdCCOmnichannelPageView } from '@/components/products/contact-center/omnichannel'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Omnichannel Contact Center · Every Channel, One Screen | Rozper',
  description: 'Voice, chat, social, and SMS unified — with AI routing and full CRM context. Every channel, one agent screen.',
  openGraph: {
    title: 'Omnichannel Contact Center · Every Channel, One Screen | Rozper',
    description: 'Voice, chat, social, and SMS unified — with AI routing and full CRM context.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/omnichannel` },
}

export default function CCOmnichannelPage() {
  return <ProdCCOmnichannelPageView />
}
