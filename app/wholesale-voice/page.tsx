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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Wholesale Voice Solutions",
      "description": "Global wholesale voice termination for carriers and VoIP providers with direct routes, competitive rates, and 99.99% uptime.",
      "url": `${SITE_URL}/wholesale-voice`,
      "provider": { "@type": "Organization", "@id": `${SITE_URL}#organization`, "name": "Rozper", "url": SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Wholesale Voice", "item": `${SITE_URL}/wholesale-voice` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is wholesale voice?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Wholesale voice is a bulk voice termination service that allows carriers and VoIP providers to route large volumes of calls through Rozper's global network at competitive per-minute rates.",
          },
        },
        {
          "@type": "Question",
          "name": "What countries are covered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper's wholesale voice network covers 200+ countries with both CLI and non-CLI routes, including direct and indirect termination options for A-Z destinations.",
          },
        },
        {
          "@type": "Question",
          "name": "What SLA does Rozper offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper offers a 99.99% uptime SLA for wholesale voice services, backed by redundant infrastructure and 24/7 network operations support.",
          },
        },
      ],
    },
  ],
}

export default function WholesaleVoicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WholesaleVoicePageView />
    </>
  )
}
