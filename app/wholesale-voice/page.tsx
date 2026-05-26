import type { Metadata } from "next"
import { WholesaleVoicePageView } from "@/components/solutions/wholesale-voice"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Wholesale Voice · A-Z Termination & Origination | Rozper",
  description:
    "Direct A-Z voice termination and origination at true carrier rates. Premium CLI routes, real-time quality scoring, least-cost routing, and per-second CDR billing.",
  openGraph: {
    title: "Wholesale Voice · A-Z Termination & Origination | Rozper",
    description:
      "Move millions of minutes on routes built to convert — wholesale voice termination and origination from Rozper.",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/wholesale-voice` },
}

export default function WholesaleVoicePage() {
  return <WholesaleVoicePageView />
}
