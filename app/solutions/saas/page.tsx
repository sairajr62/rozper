import type { Metadata } from 'next'
import { SaaSPageView } from '@/components/solutions/saas'

export const metadata: Metadata = {
  title: 'Cloud Phone for SaaS & Tech Companies | Rozper',
  description: 'Phone, video, and AI for fast-growing SaaS teams. CRM integration, global coverage, scales with headcount. rozper.com.',
}

export default function SaaSPage() {
  return <SaaSPageView />
}
