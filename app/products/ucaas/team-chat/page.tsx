import { Metadata } from 'next'
import { ProdUCaaSTeamChatPageView } from '@/components/products/ucaas/team-chat'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Team Chat · Built Into Your Phone System | Rozper',
  description: 'Chat, share files, and start calls from one app — no extra tools. Team messaging built into your phone system.',
  openGraph: {
    title: 'Team Chat · Built Into Your Phone System | Rozper',
    description: 'Chat, share files, and start calls from one app — no extra tools.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ucaas/team-chat` },
}

export default function TeamChatPage() {
  return <ProdUCaaSTeamChatPageView />
}
