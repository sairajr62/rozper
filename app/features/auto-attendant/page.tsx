import { Metadata } from 'next'
import { FeatAutoAttendantPageView } from '@/components/features/auto-attendant'

export const metadata: Metadata = {
  title: 'Auto-Attendant & Visual IVR Builder | Rozper',
  description: 'Multi-level auto-attendant and visual IVR builder. Route calls correctly from the first ring. No code needed. rozper.com.',
}

export default function AutoAttendantFeaturePage() {
  return <FeatAutoAttendantPageView />
}
