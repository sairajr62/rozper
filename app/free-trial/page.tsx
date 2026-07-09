import type { Metadata } from "next"
import { FreeTrialPageView } from "@/components/auth/free-trial-page"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Start Your Free 14-Day Rozper Trial Today | Rozper",
  description: "Get 14 days of free access to Rozper — calls, video meetings, team chat, SMS, and AI transcription tools. No credit card required, cancel anytime today.",
  alternates: { canonical: `${SITE_URL}/free-trial/` },
  openGraph: {
    title: "Start Your Free 14-Day Trial | Rozper",
    description: "Calls, video, team chat, SMS and AI — free for 14 days. No credit card required.",
    url: `${SITE_URL}/free-trial/`,
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "Start Your Free Trial — Rozper",
      "description": "Try Rozper free for 14 days. No credit card required. Full access to cloud phone, AI, contact center, and global numbers.",
      "url": `${SITE_URL}/free-trial/`,
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Free Trial", "item": `${SITE_URL}/free-trial/` },
      ],
    },
  ],
}

export default function FreeTrialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FreeTrialPageView />
    </>
  )
}
