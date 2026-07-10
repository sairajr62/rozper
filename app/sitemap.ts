import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { fetchAllPosts } from "@/lib/blog-api"
import { AREA_CODES_BY_STATE, stateToSlug } from "@/lib/area-codes-static"
import { getAllCountrySlugs } from "@/lib/country-code-data"

// Static routes that are indexable canonical pages (redirect sources and /sign-in excluded)
const STATIC_ROUTES = [
  "/",
  "/about/",
  "/blog/",
  "/compare/",
  "/contact/",
  "/docs/",
  "/docs/api/",
  "/free-trial/",
  "/legal/privacy/",
  "/legal/terms/",
  "/pricing/",
  "/security/",
  "/status/",
  "/wholesale-voice/",
  "/wholesale-voip/",
  "/area-codes/",
  "/country-code/",
  "/integrations/hubspot/",
  "/integrations/zoho/",
  // Features
  "/features/ai-agent-assist/",
  "/features/ai-receptionist/",
  "/features/ai-sentiment-analysis/",
  "/features/auto-attendant/",
  "/features/call-recording/",
  "/features/conversation-intelligence/",
  "/features/supervisor-tools/",
  "/features/toll-free-numbers/",
  // Solutions (canonical destinations only — redirect sources excluded)
  "/solutions/enterprise-ucaas/",
  "/solutions/financial-services/",
  "/solutions/logistics/",
  "/solutions/remote-teams/",
  "/solutions/retail-ecommerce/",
  "/solutions/saas-tech/",
  "/solutions/sales-teams/",
  "/solutions/small-business/",
  "/solutions/support-teams/",
  // Products — UC (canonical destinations only)
  "/products/unified-communications/",
  "/products/unified-communications/business-phone-system/",
  "/products/unified-communications/business-sms-mms/",
  "/products/unified-communications/customer-engagement/",
  "/products/unified-communications/hd-video-meetings/",
  "/products/unified-communications/hosted-phone-system/",
  "/products/unified-communications/online-fax/",
  "/products/unified-communications/team-chat/",
  "/products/unified-communications/website-chatbot/",
  // Products — Contact Center
  "/products/contact-center/",
  "/products/contact-center/agent-assist/",
  "/products/contact-center/enterprise/",
  "/products/contact-center/interaction-analytics/",
  "/products/contact-center/omnichannel/",
  "/products/contact-center/outbound-dialer/",
  "/products/contact-center/supervisor-tools/",
  // Products — AI
  "/products/ai/",
  "/products/ai/conversation-analytics/",
  "/products/ai/receptionist/",
  "/products/ai/virtual-assistant/",
  "/products/ai-features/ai-assistant/",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Build-time timestamp used as a lastModified fallback for pages without
  // per-record dates (static marketing pages, area-code/country listings).
  const buildDate = new Date()

  // Blog posts
  const emptyPosts: Awaited<ReturnType<typeof fetchAllPosts>> = { posts: [], total: 0 }
  const { posts: blogPosts } = await fetchAllPosts().catch(() => emptyPosts)
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  // Area codes — state hub + individual code pages
  const areaCodeEntries: MetadataRoute.Sitemap = []
  for (const [state, codes] of Object.entries(AREA_CODES_BY_STATE)) {
    const slug = stateToSlug(state)
    areaCodeEntries.push({
      url: `${SITE_URL}/area-codes/${slug}/`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.4,
    })
    for (const code of codes) {
      areaCodeEntries.push({
        url: `${SITE_URL}/area-codes/${slug}/${code}/`,
        lastModified: buildDate,
        changeFrequency: "yearly",
        priority: 0.3,
      })
    }
  }

  // Country code pages
  const countrySlugs = getAllCountrySlugs()
  const countryEntries: MetadataRoute.Sitemap = countrySlugs.flatMap((slug) => [
    { url: `${SITE_URL}/country-code/${slug}/`, lastModified: buildDate, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${SITE_URL}/country-code/${slug}/best-time-to-call/`, lastModified: buildDate, changeFrequency: "yearly" as const, priority: 0.3 },
  ])

  // Static pages
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: buildDate,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : route.startsWith("/products") || route.startsWith("/solutions") ? 0.8 : 0.7,
  }))

  return [...staticEntries, ...blogEntries, ...areaCodeEntries, ...countryEntries]
}
