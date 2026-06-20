import type { Metadata } from "next"
import { WholesaleVoipPageView } from "@/components/solutions/wholesale-voip"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Wholesale VoIP · Global Voice Termination | Rozper",
  description:
    "Wholesale VoIP termination with direct A-Z routes, secure SIP interconnections, and optimized global voice delivery. Built for carriers and VoIP providers.",
  openGraph: {
    title: "Wholesale VoIP · Global Voice Termination | Rozper",
    description:
      "Direct A-Z routes, secure carrier interconnections, and performance-optimized global VoIP termination — built for carriers, VoIP providers, and telecom operators.",
    type: "website",
    url: `${SITE_URL}/wholesale-voip`,
    siteName: "Rozper",
  },
  alternates: { canonical: `${SITE_URL}/wholesale-voip` },
}

export default function WholesaleVoipPage() {
  return <WholesaleVoipPageView />
}
