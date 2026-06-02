import type { Metadata } from "next"
import { WholesaleVoipPageView } from "@/components/solutions/wholesale-voip"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Wholesale VoIP · High-Performance Routes & Global Voice Termination | Rozper",
  description:
    "Wholesale voice solutions and international VoIP termination powered by direct A-Z routes, secure SIP interconnections, and performance-optimized global voice termination. 200+ countries.",
  openGraph: {
    title: "Wholesale VoIP · High-Performance Routes & Global Voice Termination | Rozper",
    description:
      "Direct A-Z routes, secure carrier interconnections, and performance-optimized global VoIP termination — built for carriers, VoIP providers, and telecom operators.",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/wholesale-voip` },
}

export default function WholesaleVoipPage() {
  return <WholesaleVoipPageView />
}
