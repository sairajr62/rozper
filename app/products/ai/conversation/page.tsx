import { Metadata } from 'next'
import { ProdAIConversationPageView } from '@/components/products/ai/conversation'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Conversation Analytics · Transcripts, Sentiment & Intent | Rozper',
  description: 'Transcripts, sentiment, intent, and keyword trends — on 100% of conversations. Included on every Rozper seat.',
  openGraph: {
    title: 'Conversation Analytics · Transcripts, Sentiment & Intent | Rozper',
    description: 'Transcripts, sentiment, intent, and keyword trends — on 100% of conversations.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ai/conversation` },
}

export default function ConversationAnalyticsProductPage() {
  return <ProdAIConversationPageView />
}
