import type { Metadata } from 'next'
import { WholesaleVoipPageView } from '@/components/solutions/wholesale-voip'

export const metadata: Metadata = {
  title: 'Wholesale VOIP · Carrier-Grade Voice Termination | Rozper',
  description: 'Terminate and originate millions of minutes on a global Tier-1 network. Built for carriers, resellers, and enterprises that need quality, volume, and control.',
  openGraph: {
    title: 'Wholesale VOIP · Carrier-Grade Voice Termination | Rozper',
    description: 'Global wholesale voice termination, SIP trunking, and programmable routing at carrier scale.',
    type: 'website',
  },
}

export default function WholesaleVoipPage() {
  return <WholesaleVoipPageView />
}
