import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import { WholesaleVoiceContactPageView } from "@/components/solutions/wholesale-voice-contact"

export const metadata: Metadata = {
  title: "Contact Wholesale Voice Team | Rozper",
  description:
    "Get a tailored A-Z rate deck from Rozper's wholesale voice team. Share your destinations and monthly volume — we respond within one business day.",
  alternates: { canonical: `${SITE_URL}/wholesale-voice/contact` },
}

export default function WholesaleVoiceContactPage() {
  return <WholesaleVoiceContactPageView />
}
