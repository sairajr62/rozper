import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { AreaCodesHubClient } from "@/components/area-codes/hub-client"
import { getAllAreaCodes } from "@/lib/area-code-data"
import { SITE_URL, ORG_ID } from "@/lib/site"

export const metadata: Metadata = {
  title: "U.S. Area Code Virtual Phone Numbers | Rozper",
  description:
    "Get a virtual phone number for any U.S. area code — New York 212, Los Angeles 310, Chicago 312, Miami 305, and 300+ more. Instant setup, 99.99% uptime.",
  keywords: "area code virtual numbers, local phone numbers, virtual phone numbers USA, US area codes, business phone number, area code lookup",
  alternates: { canonical: `${SITE_URL}/area-codes/` },
  openGraph: {
    title: "U.S. Area Code Virtual Phone Numbers | Rozper",
    description: "Instant local presence in any U.S. market. Virtual numbers for 300+ area codes across all 50 states.",
    type: "website",
    url: `${SITE_URL}/area-codes/`,
    siteName: "Rozper",
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/area-codes/`,
  name: "U.S. Area Code Virtual Phone Numbers",
  description: "Virtual phone numbers for every U.S. area code — local presence without a physical office.",
  url: `${SITE_URL}/area-codes/`,
  publisher: {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Rozper",
    url: SITE_URL,
  },
}

const STATE_ABBR: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", "District of Columbia": "DC",
  Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID", Illinois: "IL",
  Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA",
  Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI", Minnesota: "MN",
  Mississippi: "MS", Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK",
  Oregon: "OR", Pennsylvania: "PA", "Puerto Rico": "PR", "Rhode Island": "RI",
  "South Carolina": "SC", "South Dakota": "SD", Tennessee: "TN", Texas: "TX",
  Utah: "UT", Vermont: "VT", Virginia: "VA", Washington: "WA",
  "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
}

export const revalidate = 86400

export default function AreaCodesHubPage() {
  const codes = getAllAreaCodes()

  // Build state groups on the server
  const stateMap = new Map<string, { stateSlug: string; codes: string[] }>()
  for (const ac of codes) {
    if (!ac.state) continue
    const existing = stateMap.get(ac.state)
    if (existing) {
      existing.codes.push(ac.code)
    } else {
      stateMap.set(ac.state, { stateSlug: ac.stateSlug, codes: [ac.code] })
    }
  }

  const stateGroups = Array.from(stateMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([state, { stateSlug, codes: stateCodes }]) => ({
      state,
      stateSlug,
      abbr: STATE_ABBR[state] ?? state.slice(0, 2).toUpperCase(),
      codes: stateCodes.slice(0, 5),
      totalCodes: stateCodes.length,
    }))

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <AreaCodesHubClient
        codes={codes}
        stateGroups={stateGroups}
        totalCodes={codes.length}
        totalStates={stateGroups.length}
      />
      <Footer />
    </main>
  )
}
