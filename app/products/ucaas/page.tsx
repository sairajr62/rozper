import type { Metadata } from 'next'
import { UcaasPageView } from '@/components/products/ucaas/overview'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'UCaaS Platform · Unified Communications for Global Teams | Rozper',
  description: 'Voice, video, messaging, and AI in one platform. 150+ countries. From $12.99/user/mo. Start a no-pressure conversation at rozper.com.',
  openGraph: {
    title: 'UCaaS Platform · Unified Communications for Global Teams | Rozper',
    description: 'Voice, video, messaging, and AI in one platform. 150+ countries. From $12.99/user/mo.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ucaas` },
}

export default function UcaasPage() {
  return <UcaasPageView />
}
