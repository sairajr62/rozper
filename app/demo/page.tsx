import type { Metadata } from "next"
import ExampleComp from "@/components/ui/pricing-card"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Demo · Rozper",
  alternates: { canonical: `${SITE_URL}/demo` },
}

export default function DemoOne() {
  return <ExampleComp />;
}
