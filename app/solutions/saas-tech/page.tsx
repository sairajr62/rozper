import type { Metadata } from 'next'
import { SaaSPageView } from '@/components/solutions/saas'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cloud Phone for SaaS & Tech Companies | Rozper',
  description: 'Phone, video, and AI for fast-growing SaaS teams. CRM integration, global coverage, scales with headcount. rozper.com.',
  alternates: { canonical: `${SITE_URL}/solutions/saas-tech` },
}

export default function SaaSPage() {
  return <SaaSPageView />
}
