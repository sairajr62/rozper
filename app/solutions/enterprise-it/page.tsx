import type { Metadata } from 'next'
import { EnterpriseITPageView } from '@/components/solutions/enterprise-it'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Enterprise UCaaS · SSO, SCIM, Multi-site | Rozper',
  description: 'Enterprise phone and contact center with SSO, SCIM, multi-site, custom SLAs, and GDPR/HIPAA compliance. rozper.com.',
  alternates: { canonical: `${SITE_URL}/solutions/enterprise-it` },
}

export default function EnterpriseITPage() {
  return <EnterpriseITPageView />
}
