import { Metadata } from 'next'
import { FeatAIAgentAssistPageView } from '@/components/features/ai-agent-assist'

export const metadata: Metadata = {
  title: 'AI Agent Assist · Live Whisper Coaching for Every Call | Rozper',
  description: 'AI whispers answers, surfaces articles, and scores calls live. Faster resolution. Better agents. rozper.com.',
  openGraph: {
    title: 'AI Agent Assist · Live Whisper Coaching for Every Call | Rozper',
    description: 'AI whispers answers, surfaces articles, and scores calls live. Faster resolution. Better agents.',
    type: 'website',
  },
}

export default function AIAgentAssistFeaturePage() {
  return <FeatAIAgentAssistPageView />
}
