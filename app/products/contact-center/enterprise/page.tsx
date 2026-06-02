import type { Metadata } from 'next'
import { ProdCCEnterprisePageView } from '@/components/products/contact-center/enterprise'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Enterprise Contact Center · SSO, Multi-site, Custom SLAs | Rozper',
  description: 'SSO, SCIM, multi-site routing, custom SLAs, and a dedicated success team. Enterprise contact center, your rules.',
  openGraph: {
    title: 'Enterprise Contact Center · SSO, Multi-site, Custom SLAs | Rozper',
    description: 'SSO, SCIM, multi-site routing, custom SLAs, and a dedicated success team.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/contact-center/enterprise` },
}

export default function CCEnterprisePage() {
  return <ProdCCEnterprisePageView />
}
