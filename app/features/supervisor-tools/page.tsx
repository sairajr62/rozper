import { Metadata } from 'next'
import { FeatSupervisorToolsPageView } from '@/components/features/supervisor-tools'

export const metadata: Metadata = {
  title: 'Call Barge, Whisper & Monitoring | Rozper',
  description: 'Silent monitor, whisper coaching, and barge-in on any live call. Real-time supervisor control. rozper.com.',
}

export default function SupervisorToolsFeaturePage() {
  return <FeatSupervisorToolsPageView />
}
