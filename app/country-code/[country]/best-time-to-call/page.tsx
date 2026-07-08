import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  CountryHero,
  BestTimeSection,
  CountryOverviewSection,
  BusinessEtiquetteSection,
  FeaturesSection,
  GettingStartedSection,
  FAQSection,
  RelatedCountriesSection,
  CountryCodeCTA,
} from "@/components/country-code/page-content"
import {
  getCountryBySlug,
  getAllCountrySlugs,
  getRelatedCountries,
  getBestCallingTimes,
  formatDialCode,
  formatUTCOffset,
} from "@/lib/country-code-data"
import { SITE_URL, ORG_ID } from "@/lib/site"
import { BreadcrumbStructuredData, FaqPageStructuredData } from "@/components/seo/structured-data"

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

  const title = `Best Time to Call ${country.name} from the US | ${formatDialCode(country.dialCode)} Dial Code`
  const description = `When to call ${country.name} from the United States. Country code ${formatDialCode(country.dialCode)}, timezone ${formatUTCOffset(country.utcOffset)}, business hours, and calling etiquette for ${country.name}.`

  return {
    title,
    description,
    keywords: `best time to call ${country.name}, ${country.name} country code, ${formatDialCode(country.dialCode)} dial code, call ${country.name} from US, ${country.name} business hours, ${country.name} time zone`,
    alternates: { canonical: `${SITE_URL}/country-code/${slug}/best-time-to-call/` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/country-code/${slug}/best-time-to-call/`,
      siteName: "Rozper",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function CountryCodePage({ params }: Props) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) notFound()

  const times = getBestCallingTimes(country)
  const related = getRelatedCountries(slug, 12)

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/country-code/${slug}/best-time-to-call/`,
    name: `Best Time to Call ${country.name} from the US`,
    description: `Country code ${formatDialCode(country.dialCode)}, timezone ${formatUTCOffset(country.utcOffset)}, and best calling hours for ${country.name}.`,
    url: `${SITE_URL}/country-code/${slug}/best-time-to-call/`,
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Rozper",
      url: SITE_URL,
    },
  }

  const faqItems = [
    {
      question: `What is the country code for ${country.name}?`,
      answer: `The country code for ${country.name} is ${formatDialCode(country.dialCode)}.`,
    },
    {
      question: `What is the best time to call ${country.name} from the US?`,
      answer: `${country.name} is on ${formatUTCOffset(country.utcOffset)}. Business hours (9 AM–5 PM local) correspond to ${times.est.start}–${times.est.end} US Eastern time.`,
    },
  ]

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Country Codes", url: `${SITE_URL}/country-code/` },
          { name: country.name, url: `${SITE_URL}/country-code/${slug}/` },
          { name: "Best Time to Call", url: `${SITE_URL}/country-code/${slug}/best-time-to-call/` },
        ]}
      />
      <FaqPageStructuredData items={faqItems} />
      <Navbar />
      <CountryHero country={country} times={times} />
      <BestTimeSection country={country} times={times} />
      <CountryOverviewSection country={country} />
      <BusinessEtiquetteSection country={country} />
      <FeaturesSection country={country} />
      <GettingStartedSection country={country} />
      <RelatedCountriesSection country={country} related={related} />
      <FAQSection country={country} times={times} />
      <CountryCodeCTA country={country} />
      <Footer />
    </main>
  )
}
