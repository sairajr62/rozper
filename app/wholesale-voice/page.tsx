import type { Metadata } from "next"
import { WholesaleVoicePageView } from "@/components/solutions/wholesale-voice"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Wholesale Voice Solutions · Global VoIP Termination | Rozper",
  description:
    "Global wholesale voice carrier — A-Z VoIP termination, SIP trunking, DID & toll-free numbers, CLI & non-CLI routes. 200+ countries, 99.99% uptime SLA.",
  openGraph: {
    title: "Wholesale Voice Solutions · Global VoIP Termination | Rozper",
    description:
      "Global wholesale voice carrier — A-Z VoIP termination, SIP trunking, DID & toll-free numbers, CLI & non-CLI routes. 200+ countries, 99.99% uptime SLA.",
    type: "website",
    url: `${SITE_URL}/wholesale-voice`,
    siteName: "Rozper",
  },
  alternates: { canonical: `${SITE_URL}/wholesale-voice` },
}

export default function WholesaleVoicePage() {
  return <WholesaleVoicePageView />
}
