import { Metadata } from 'next'
import { FeatCallRecordingPageView } from '@/components/features/call-recording'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Call Recording · AI Search & Compliance | Rozper',
  description: 'Record every call with AI transcription, keyword search, and configurable retention. GDPR and HIPAA options. rozper.com.',
  alternates: { canonical: `${SITE_URL}/features/call-recording` },
}

export default function CallRecordingFeaturePage() {
  return <FeatCallRecordingPageView />
}
