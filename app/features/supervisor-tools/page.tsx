import { Metadata } from 'next'
import { FeatSupervisorToolsPageView } from '@/components/features/supervisor-tools'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Call Barge, Whisper & Monitoring | Rozper',
  description: 'Silent monitor, whisper coaching, and barge-in on any live call. Real-time supervisor control.',
  openGraph: {
    title: 'Call Barge, Whisper & Monitoring | Rozper',
    description: 'Silent monitor, whisper coaching, and barge-in on any live call. Real-time supervisor control.',
    type: 'website',
    url: `${SITE_URL}/features/supervisor-tools`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/features/supervisor-tools` },
}

export default function SupervisorToolsFeaturePage() {
  return <FeatSupervisorToolsPageView />
}
