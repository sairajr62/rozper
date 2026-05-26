import { Metadata } from 'next'
import { FeatAutoAttendantPageView } from '@/components/features/auto-attendant'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Auto-Attendant & Visual IVR Builder | Rozper',
  description: 'Multi-level auto-attendant and visual IVR builder. Route calls correctly from the first ring. No code needed. rozper.com.',
  alternates: { canonical: `${SITE_URL}/features/auto-attendant` },
}

export default function AutoAttendantFeaturePage() {
  return <FeatAutoAttendantPageView />
}
