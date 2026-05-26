import type { Metadata } from "next"
import { WholesaleVoipPageView } from "@/components/solutions/wholesale-voip"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Wholesale VoIP · White-Label SIP Infrastructure | Rozper",
  description:
    "Elastic SIP trunking, programmable routing, and number provisioning APIs. The carrier-grade VoIP platform you can build on and resell as your own.",
  openGraph: {
    title: "Wholesale VoIP · White-Label SIP Infrastructure | Rozper",
    description:
      "SIP infrastructure ready to white-label — elastic trunks, programmable routing, and number APIs at carrier scale.",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/wholesale-voip` },
}

export default function WholesaleVoipPage() {
  return <WholesaleVoipPageView />
}
