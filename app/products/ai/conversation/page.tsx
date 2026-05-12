import { Metadata } from 'next'
import { ProdAIConversationPageView } from '@/components/products/ai/conversation'

export const metadata: Metadata = {
  title: 'Conversation Analytics · Transcripts, Sentiment & Intent | Rozper',
  description: 'Transcripts, sentiment, intent, and keyword trends — on 100% of conversations. Included on every Rozper seat.',
  openGraph: {
    title: 'Conversation Analytics · Transcripts, Sentiment & Intent | Rozper',
    description: 'Transcripts, sentiment, intent, and keyword trends — on 100% of conversations.',
    type: 'website',
  },
}

export default function ConversationAnalyticsProductPage() {
  return <ProdAIConversationPageView />
}
