import { Metadata } from 'next'
import { FeatConversationIntelligencePageView } from '@/components/features/conversation-intelligence'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Conversation Intelligence · Searchable Call Insights | Rozper',
  description: 'Every conversation transcribed, analyzed, and searchable. Competitor mentions, deal risks, coaching moments — all surfaced. rozper.com.',
  openGraph: {
    title: 'Conversation Intelligence · Searchable Call Insights | Rozper',
    description: 'Every conversation transcribed, analyzed, and searchable. Competitor mentions, deal risks, coaching moments — all surfaced.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/features/conversation-intelligence` },
}

export default function ConversationIntelligenceFeaturePage() {
  return <FeatConversationIntelligencePageView />
}
