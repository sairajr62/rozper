import type { Metadata } from 'next'
import { SMBPageView } from '@/components/solutions/smb'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Phone System for Small Business · AI Included | Rozper',
  description: 'Small business phone with AI receptionist, call recording, and CRM sync. Enterprise features at $9.99/user. rozper.com.',
  openGraph: {
    title: 'Phone System for Small Business · AI Included | Rozper',
    description: 'Small business phone with AI receptionist, call recording, and CRM sync. Enterprise features at $9.99/user.',
    type: 'website',
    url: `${SITE_URL}/solutions/smb`,
    siteName: 'Rozper',
  },
  alternates: { canonical: `${SITE_URL}/solutions/smb` },
}

export default function SMBPage() {
  return <SMBPageView />
}
