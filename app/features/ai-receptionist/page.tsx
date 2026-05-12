import { Metadata } from 'next'
import { FeatAIReceptionistPageView } from '@/components/features/ai-receptionist'

export const metadata: Metadata = {
  title: 'AI Receptionist · Automated 24/7 Call Answering | Rozper',
  description: 'AI receptionist that answers, qualifies, routes, and books 24/7. No missed calls. CRM sync. rozper.com.',
  openGraph: {
    title: 'AI Receptionist · Automated 24/7 Call Answering | Rozper',
    description: 'AI receptionist that answers, qualifies, routes, and books 24/7. No missed calls. CRM sync.',
    type: 'website',
  },
}

export default function AIReceptionistFeaturePage() {
  return <FeatAIReceptionistPageView />
}
