import type { Metadata } from 'next'
import { EnterpriseITPageView } from '@/components/solutions/enterprise-it'

export const metadata: Metadata = {
  title: 'Enterprise UCaaS · SSO, SCIM, Multi-site | Rozper',
  description: 'Enterprise phone and contact center with SSO, SCIM, multi-site, custom SLAs, and GDPR/HIPAA compliance. rozper.com.',
}

export default function EnterpriseITPage() {
  return <EnterpriseITPageView />
}
