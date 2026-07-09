import type { Metadata } from "next"
import { SignInPageView } from "@/components/auth/sign-in-page"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sign In to Your Rozper Communications Workspace | Rozper",
  description: "Sign in to your Rozper workspace — one platform for calls, video meetings, team chat, SMS, and AI tools. Access your account securely from anywhere, anytime.",
  alternates: { canonical: `${SITE_URL}/sign-in/` },
  robots: { index: false, follow: false },
}

export default function SignInPage() {
  return <SignInPageView />
}
