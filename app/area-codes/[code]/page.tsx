import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import {
  AreaCodeHero,
  CoverageSection,
  MapSection,
  WhySection,
  FeaturesSection,
  GettingStartedSection,
  FAQSection,
  AreaCodeCTA,
} from "@/components/area-codes/page-content"
import { getAreaCodeData, getAllAreaCodeSlugs } from "@/lib/area-code-data"
import { SITE_URL } from "@/lib/site"

type Props = { params: Promise<{ code: string }> }

export async function generateStaticParams() {
  return getAllAreaCodeSlugs().map(slug => ({ code: slug.replace(/-area-code$/, "") }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const data = getAreaCodeData(code)
  if (!data) return {}
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    keywords: `${data.code} area code, ${data.city} virtual phone number, ${data.code} number for business, area code ${data.code}`,
    alternates: { canonical: `${SITE_URL}/area-codes/${code}` },
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      type: "website",
      url: `${SITE_URL}/area-codes/${code}`,
      siteName: "Rozper",
    },
    twitter: {
      card: "summary_large_image",
      title: data.seoTitle,
      description: data.seoDescription,
    },
  }
}

export default async function AreaCodePage({ params }: Props) {
  const { code } = await params
  const data = getAreaCodeData(code)
  if (!data) notFound()

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/area-codes/${code}`,
    name: `${code} Area Code Virtual Phone Number`,
    description: data.excerpt,
    url: `${SITE_URL}/area-codes/${code}`,
    brand: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Rozper",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: "Rozper", url: SITE_URL },
    },
  }

  const faqSchema = data.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faqs.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Navbar />
      <AreaCodeHero data={data} />
      <CoverageSection data={data} />
      <MapSection city={data.city} state={data.state} code={data.code} />
      <WhySection city={data.city} code={data.code} />
      <FeaturesSection code={data.code} />
      <GettingStartedSection code={data.code} city={data.city} />
      <FAQSection faqs={data.faqs} code={data.code} />
      <AreaCodeCTA code={data.code} city={data.city} />
      <Footer />
    </main>
  )
}
