import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { HubHero, AreaCodeGrid } from "@/components/area-codes/hub"
import { getAllAreaCodes } from "@/lib/area-code-data"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "U.S. Area Code Virtual Phone Numbers | Rozper",
  description:
    "Get a local virtual phone number in any U.S. market — Philadelphia, Denver, Chicago, Miami, and more. Instant setup, 99.999% uptime, 24/7 support.",
  keywords: "area code virtual numbers, local phone numbers, virtual phone numbers USA, business phone number, area code lookup",
  alternates: { canonical: `${SITE_URL}/area-codes` },
  openGraph: {
    title: "U.S. Area Code Virtual Phone Numbers | Rozper",
    description: "Instant local presence in any U.S. market. Virtual numbers for 200+ area codes.",
    type: "website",
    url: `${SITE_URL}/area-codes`,
    siteName: "Rozper",
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/area-codes`,
  name: "U.S. Area Code Virtual Phone Numbers",
  description: "Virtual phone numbers for every U.S. area code — local presence without a physical office.",
  url: `${SITE_URL}/area-codes`,
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Rozper",
    url: SITE_URL,
  },
}

export const revalidate = 86400 // rebuild daily

export default function AreaCodesHubPage() {
  const codes = getAllAreaCodes()

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <HubHero />
      <AreaCodeGrid codes={codes} />
      <Footer />
    </main>
  )
}
