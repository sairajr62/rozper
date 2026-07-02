/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "txmte7vbg0qnj5i1.public.blob.vercel-storage.com",
        pathname: "/blog/**",
      },
      {
        protocol: "https",
        hostname: "www.rozper.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/audit', destination: '/audit/index.html' },
    ]
  },
  async redirects() {
    return [
      { source: "/features/ai-sentiment",                        destination: "/features/ai-sentiment-analysis",                   permanent: true },
      { source: "/products/ai/assistant",                        destination: "/products/ai/virtual-assistant",                    permanent: true },
      { source: "/products/ai/conversation",                     destination: "/products/ai/conversation-analytics",               permanent: true },
      { source: "/products/contact-center/analytics",            destination: "/products/contact-center/interaction-analytics",    permanent: true },
      { source: "/products/unified-communications/business-phone",                destination: "/products/unified-communications/business-phone-system",             permanent: true },
      { source: "/products/unified-communications/phone-system",                  destination: "/products/unified-communications/hosted-phone-system",               permanent: true },
      { source: "/products/unified-communications/sms-mms",                      destination: "/products/unified-communications/business-sms-mms",                  permanent: true },
      { source: "/products/unified-communications/video-meetings",                destination: "/products/unified-communications/hd-video-meetings",                 permanent: true },
      { source: "/solutions/enterprise-it",                      destination: "/solutions/enterprise-ucaas",                       permanent: true },
      { source: "/solutions/smb",                                destination: "/solutions/small-business",                         permanent: true },
      { source: "/solutions/finance",                            destination: "/solutions/financial-services",                     permanent: true },
      { source: "/solutions/retail",                             destination: "/solutions/retail-ecommerce",                       permanent: true },
      { source: "/solutions/saas",                               destination: "/solutions/saas-tech",                              permanent: true },
      { source: "/products/unified-communications/ai-assistant",  destination: "/products/ai-features/ai-assistant",                permanent: true },
      { source: "/blog/Wholesale-voice-services",                  destination: "/blog/wholesale-voice-services/",                    permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/audit/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/audit",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ]
  },
}

export default nextConfig
