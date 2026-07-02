export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rozper.vercel.app"

// Canonical entity IDs for structured data — use these everywhere instead of inline strings
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
