import type { Metadata } from 'next'
import { SupportTeamsPageView } from '@/components/solutions/support-teams'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Omnichannel Contact Center for Support Teams | Rozper',
  description: 'Omnichannel support inbox for voice, chat, SMS, and social. AI agent assist, CRM sync, and SLA tools. rozper.com.',
  alternates: { canonical: `${SITE_URL}/solutions/support-teams` },
}

export default function SupportTeamsPage() {
  return <SupportTeamsPageView />
}
