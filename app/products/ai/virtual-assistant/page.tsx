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
    url: `${SITE_URL}/products/ai/virtual-assistant`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/products/ai/virtual-assistant` },
}

export default function AIAssistantProductPage() {
  return <ProdAIAssistantPageView />
}
