import { Metadata } from 'next'
import { ProdUCaaSAIAssistantPageView } from '@/components/products/ucaas/ai-assistant'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Assistant · Per-Seat AI for Every Team Member | Rozper',
  description: 'Per-seat AI that answers, drafts, summarizes, and coaches — on every call and message. AI that works before your team arrives.',
  openGraph: {
    title: 'AI Assistant · Per-Seat AI for Every Team Member | Rozper',
    description: 'Per-seat AI that answers, drafts, summarizes, and coaches — on every call and message.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ucaas/ai-assistant` },
}

export default function UCaaSAIAssistantPage() {
  return <ProdUCaaSAIAssistantPageView />
}
