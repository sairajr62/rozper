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

export default function CountryCodeHubPage() {
  return <CountryCodeHubClient />
}
