import { Metadata } from 'next'
import { FeatAIAgentAssistPageView } from '@/components/features/ai-agent-assist'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Agent Assist · Live Whisper Coaching for Every Call | Rozper',
  description: 'AI whispers answers, surfaces articles, and scores calls live. Faster resolution. Better agents. rozper.com.',
  openGraph: {
    title: 'AI Agent Assist · Live Whisper Coaching for Every Call | Rozper',
    description: 'AI whispers answers, surfaces articles, and scores calls live. Faster resolution. Better agents.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/features/ai-agent-assist` },
}

export default function AIAgentAssistFeaturePage() {
  return <FeatAIAgentAssistPageView />
}
