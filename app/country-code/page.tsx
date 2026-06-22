import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"
import { CountryCodeHubClient } from "./_client"

export const metadata: Metadata = {
  title: "International Country Codes & Virtual Phone Numbers | Rozper",
  description:
    "Browse country codes for 237 countries. Get international virtual phone numbers with local presence — instant setup, no hardware needed.",
  alternates: { canonical: `${SITE_URL}/country-code` },
  openGraph: {
    title: "International Country Codes & Virtual Phone Numbers | Rozper",
    description:
      "Browse country codes for 237 countries. Get international virtual phone numbers with local presence — instant setup, no hardware needed.",
    type: "website",
    url: `${SITE_URL}/country-code`,
    siteName: "Rozper",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/country-code#webpage`,
      "name": "International Country Codes & Virtual Phone Numbers",
      "description": "Find international dialing codes and get virtual phone numbers in 150+ countries with Rozper.",
      "url": `${SITE_URL}/country-code`,
      "publisher": { "@type": "Organization", "@id": `${SITE_URL}#organization`, "name": "Rozper" },
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Country Codes", "item": `${SITE_URL}/country-code` },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are international dialing codes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Country codes are numeric prefixes dialed before a local number to reach phones in another country. For example, +1 is the US/Canada, +44 is the UK.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I get a virtual phone number in any country?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rozper provides virtual phone numbers in 150+ countries, enabling local presence without a physical office.",
          },
        },
        {
          "@type": "Question",
          "name": "How do I find a country's dialing code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Browse the Rozper country code directory to find dialing codes, time zones, and calling tips for every country we cover.",
          },
        },
      ],
    },
  ],
}

export default function CountryCodeHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountryCodeHubClient />
    </>
  )
}
