import { Metadata } from 'next'
import { FeatCallRecordingPageView } from '@/components/features/call-recording'

export const metadata: Metadata = {
  title: 'Call Recording · AI Search & Compliance | Rozper',
  description: 'Record every call with AI transcription, keyword search, and configurable retention. GDPR and HIPAA options. rozper.com.',
}

export default function CallRecordingFeaturePage() {
  return <FeatCallRecordingPageView />
}
