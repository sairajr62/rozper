import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  CountryPageHero,
  CountryQuickFacts,
  CallingGuideBanner,
  VirtualNumberBenefits,
  CountryFeaturesSection,
  CountryGettingStarted,
  CountryPageRelated,
  CountryPageFAQ,
  CountryPageCTA,
} from "@/components/country-code/country-page"
import {
  getCountryBySlug,
  getAllCountrySlugs,
  getRelatedCountries,
  getBestCallingTimes,
  formatDialCode,
  formatUTCOffset,
} from "@/lib/country-code-data"
import { SITE_URL, ORG_ID } from "@/lib/site"

export const dynamicParams = true

type Props = { params: Promise<{ country: string }> }

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") return []
  return getAllCountrySlugs().map((slug) => ({ country: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) return {}

  const title = `${country.name} Country Code ${formatDialCode(country.dialCode)} – Virtual Phone Numbers | Rozper`
  const description = `${country.name} international dialing code is ${formatDialCode(country.dialCode)}. Get a virtual ${country.name} phone number, explore best calling times, and connect with ${country.capital} from anywhere.`

  return {
    title,
    description,
    keywords: `${country.name} country code, ${formatDialCode(country.dialCode)} dial code, ${country.name} virtual phone number, call ${country.name}, ${country.name} international calling`,
    alternates: { canonical: `${SITE_URL}/country-code/${slug}/` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/country-code/${slug}/`,
      siteName: "Rozper",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) notFound()

  const times = getBestCallingTimes(country)
  const related = getRelatedCountries(slug, 12)

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/country-code/${slug}/`,
    name: `${country.name} Country Code ${formatDialCode(country.dialCode)}`,
    description: `International dialing code for ${country.name} is ${formatDialCode(country.dialCode)}. Timezone: ${formatUTCOffset(country.utcOffset)}. Capital: ${country.capital}.`,
    url: `${SITE_URL}/country-code/${slug}/`,
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Rozper",
      url: SITE_URL,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Country Codes", item: `${SITE_URL}/country-code/` },
        { "@type": "ListItem", position: 3, name: country.name, item: `${SITE_URL}/country-code/${slug}/` },
      ],
    },
    hasPart: [
      {
        "@type": "WebPage",
        url: `${SITE_URL}/country-code/${slug}/best-time-to-call/`,
        name: `Best Time to Call ${country.name} from the US`,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <CountryPageHero country={country} times={times} />
      <CountryQuickFacts country={country} />
      <CallingGuideBanner country={country} times={times} />
      <VirtualNumberBenefits country={country} />
      <CountryFeaturesSection country={country} />
      <CountryGettingStarted country={country} />
      <CountryPageRelated country={country} related={related} />
      <CountryPageFAQ country={country} times={times} />
      <CountryPageCTA country={country} />
      <Footer />
    </main>
  )
}
