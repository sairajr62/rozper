import type { Metadata } from 'next'
import { ProdCCAgentAssistPageView } from '@/components/products/contact-center/agent-assist'

export const metadata: Metadata = {
  title: 'AI Agent Assist · Live Coaching on Every Call | Rozper',
  description: 'AI that whispers the right answer, surfaces knowledge, and scores quality — in real time. Live coaching on every call.',
  openGraph: {
    title: 'AI Agent Assist · Live Coaching on Every Call | Rozper',
    description: 'AI that whispers the right answer, surfaces knowledge, and scores quality — in real time.',
    type: 'website',
  },
}

export default function CCAgentAssistPage() {
  return <ProdCCAgentAssistPageView />
}
