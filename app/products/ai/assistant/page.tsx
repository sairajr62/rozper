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
  alternates: { canonical: `${SITE_URL}/products/ai/assistant` },
}

export default function AIAssistantProductPage() {
  return <ProdAIAssistantPageView />
}
