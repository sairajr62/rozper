import type { Metadata } from 'next'
import { EnterpriseITPageView } from '@/components/solutions/enterprise-it'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Enterprise UCaaS · SSO, SCIM, Multi-site | Rozper',
  description: 'Enterprise phone and contact center with SSO, SCIM, multi-site, custom SLAs, and GDPR/HIPAA compliance.',
  openGraph: {
    title: 'Enterprise UCaaS · SSO, SCIM, Multi-site | Rozper',
    description: 'Enterprise phone and contact center with SSO, SCIM, multi-site, custom SLAs, and GDPR/HIPAA compliance.',
    type: 'website',
    url: `${SITE_URL}/solutions/enterprise-ucaas`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/enterprise-ucaas` },
}

export default function EnterpriseITPage() {
  return <EnterpriseITPageView />
}
