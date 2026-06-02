import { Metadata } from 'next'
import { FeatSupervisorToolsPageView } from '@/components/features/supervisor-tools'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Call Barge, Whisper & Monitoring | Rozper',
  description: 'Silent monitor, whisper coaching, and barge-in on any live call. Real-time supervisor control. rozper.com.',
  alternates: { canonical: `${SITE_URL}/features/supervisor-tools` },
}

export default function SupervisorToolsFeaturePage() {
  return <FeatSupervisorToolsPageView />
}
