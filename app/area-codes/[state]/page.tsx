import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  StateHero,
  StateAreaCodeGrid,
  StateBenefits,
  StateIndustries,
  StateHowItWorks,
  StateFAQ,
  StateCTA,
} from "@/components/area-codes/state-page"
import {
  slugToState,
  getCodesByStateSlug,
  getAllAreaCodes,
  getAllStateSlugs,
  stateToSlug,
  getStateByCode,
} from "@/lib/area-code-data"
import { SITE_URL } from "@/lib/site"

export const dynamicParams = true

type Props = { params: Promise<{ state: string }> }

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") return []
  return getAllStateSlugs().map(slug => ({ state: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateParam } = await params

  // If it looks like a numeric code, no dedicated metadata needed — will redirect
  if (/^\d{3}$/.test(stateParam)) return {}

  const stateName = slugToState(stateParam)
  if (!stateName) return {}

  const codes = getCodesByStateSlug(stateParam)
  const codeList = codes.slice(0, 5).join(", ") + (codes.length > 5 ? ", and more" : "")
  const title = `${stateName} Area Codes – Virtual Phone Numbers | Rozper`
  const description = `Get a virtual phone number with a ${stateName} area code. Rozper offers virtual numbers for all ${codes.length} ${stateName} area codes including ${codeList}.`

  return {
    title,
    description,
    keywords: `${stateName} area codes, ${stateName} virtual phone numbers, ${codes.slice(0, 3).join(" ")} area code`,
    alternates: { canonical: `${SITE_URL}/area-codes/${stateParam}/` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/area-codes/${stateParam}/`,
      siteName: "Rozper",
    },
  }
}

export default async function StateOrRedirectPage({ params }: Props) {
  const { state: stateParam } = await params

  // Handle legacy /area-codes/205 URLs → redirect to /area-codes/alabama/205
  if (/^\d{3}$/.test(stateParam)) {
    const stateName = getStateByCode(stateParam)
    if (stateName) {
      redirect(`/area-codes/${stateToSlug(stateName)}/${stateParam}/`)
    }
    notFound()
  }

  const stateName = slugToState(stateParam)
  if (!stateName) notFound()

  const allCodes = getAllAreaCodes()
  const stateCodes = allCodes
    .filter(ac => ac.stateSlug === stateParam)
    .map(ac => ({
      code: ac.code,
      city: ac.city !== stateName ? ac.city : "",
      stateSlug: stateParam,
      excerpt: ac.excerpt,
    }))

  if (stateCodes.length === 0) notFound()

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/area-codes/${stateParam}/`,
    name: `${stateName} Area Code Virtual Phone Numbers`,
    description: `Virtual phone numbers for all ${stateCodes.length} ${stateName} area codes.`,
    url: `${SITE_URL}/area-codes/${stateParam}/`,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization/`,
      name: "Rozper",
      url: SITE_URL,
    },
    hasPart: stateCodes.map(c => ({
      "@type": "WebPage",
      url: `${SITE_URL}/area-codes/${stateParam}/${c.code}/`,
      name: `${c.code} Area Code Virtual Phone Numbers`,
    })),
  }

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <StateHero state={stateName} stateSlug={stateParam} codeCount={stateCodes.length} codes={stateCodes.map(c => c.code)} />
      <StateBenefits state={stateName} />
      <StateAreaCodeGrid state={stateName} stateSlug={stateParam} codes={stateCodes} />
      <StateIndustries state={stateName} />
      <StateHowItWorks state={stateName} stateSlug={stateParam} />
      <StateFAQ state={stateName} codeCount={stateCodes.length} />
      <StateCTA state={stateName} />
      <Footer />
    </main>
  )
}
