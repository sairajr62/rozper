import type { Metadata } from "next"
import { SITE_URL, ORG_ID } from "@/lib/site"
import { CountryCodeHubClient } from "./_client"

const TITLE = "International Country Codes & Virtual Phone Numbers | Rozper"
const DESCRIPTION =
  "Browse country codes for 237 countries. Get international virtual phone numbers with local presence — instant setup, no hardware needed, cancel anytime."
const PAGE_URL = `${SITE_URL}/country-code/`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Rozper",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    site: "@rozper",
    creator: "@rozper",
  },
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Country Codes", item: PAGE_URL },
    ],
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Rozper",
  url: SITE_URL,
  foundingDate: "2018",
  logo: { "@type": "ImageObject", url: `${SITE_URL}/images/white-rozper-logo.png` },
  sameAs: ["https://www.linkedin.com/company/rozper", "https://twitter.com/rozper"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${SITE_URL}/contact/`,
    availableLanguage: "English",
  },
}

export default function CountryCodeHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <CountryCodeHubClient />
    </>
  )
}
