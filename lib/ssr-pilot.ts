/**
 * Pilot/rollout control for the SSR translation proxy.
 * Empty list = full-site mode (nothing opted out). Add path prefixes here to
 * exclude specific routes from server-side translation if ever needed.
 */
export const SSR_EXCLUDE_PATHS: string[] = []

const UNSAFE_PREFIXES = ["/api/", "/_next/", "/favicon", "/robots.txt", "/sitemap.xml", "/audit"]

/** True if this pathname is a real page route worth self-fetching/translating (not an API, static asset, or excluded system path). */
export function isSafeSsrPath(pathname: string): boolean {
  if (UNSAFE_PREFIXES.some((p) => pathname.startsWith(p))) return false
  const lastSegment = pathname.split("/").pop() ?? ""
  if (lastSegment.includes(".") && !pathname.endsWith("/")) return false // has a file extension, e.g. .xml/.png
  return true
}

/** True if this pathname should be SSR-translated for the given locale request. */
export function isSsrTranslated(pathname: string): boolean {
  if (!isSafeSsrPath(pathname)) return false
  if (SSR_EXCLUDE_PATHS.length === 0) return true
  return !SSR_EXCLUDE_PATHS.some((excluded) => pathname === excluded || pathname.startsWith(excluded))
}
