import type { Metadata } from "next"
import { FreeTrialPageView } from "@/components/auth/free-trial-page"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rozper.com"

export const metadata: Metadata = {
  title: "Start Your Free Trial | Rozper",
  description: "Get 14 days of free access to Rozper — calls, video meetings, team chat, SMS and AI transcription. No credit card required.",
  alternates: { canonical: `${SITE_URL}/free-trial` },
  openGraph: {
    title: "Start Your Free 14-Day Trial | Rozper",
    description: "Calls, video, team chat, SMS and AI — free for 14 days. No credit card required.",
    url: `${SITE_URL}/free-trial`,
    type: "website",
  },
}

export default function FreeTrialPage() {
  return <FreeTrialPageView />
}
