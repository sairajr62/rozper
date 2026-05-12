import type { Metadata } from 'next'
import { SMBPageView } from '@/components/solutions/smb'

export const metadata: Metadata = {
  title: 'Phone System for Small Business · AI Included | Rozper',
  description: 'Small business phone with AI receptionist, call recording, and CRM sync. Enterprise features at $9.99/user. rozper.com.',
}

export default function SMBPage() {
  return <SMBPageView />
}
