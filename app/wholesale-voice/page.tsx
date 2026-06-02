import type { Metadata } from "next"
import { WholesaleVoicePageView } from "@/components/solutions/wholesale-voice"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Wholesale Voice Solutions · Global VoIP Termination | Rozper",
  description:
    "Leading global provider of wholesale voice solutions. High-quality A-Z VoIP termination, SIP trunking, DID & toll-free numbers, and UCaaS integration. 200+ countries, 99.99% uptime SLA.",
  openGraph: {
    title: "Wholesale Voice Solutions · Global VoIP Termination | Rozper",
    description:
      "Your trusted wholesale voice carrier — A-Z termination, CLI & non-CLI routes, SIP trunking, and DID numbers across 200+ countries.",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/wholesale-voice` },
}

export default function WholesaleVoicePage() {
  return <WholesaleVoicePageView />
}
