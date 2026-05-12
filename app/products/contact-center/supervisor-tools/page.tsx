import type { Metadata } from 'next'
import { ProdCCSupervisorToolsPageView } from '@/components/products/contact-center/supervisor-tools'

export const metadata: Metadata = {
  title: 'Supervisor Tools · Barge, Whisper, Monitor | Rozper',
  description: 'Barge, whisper, and monitor live — with AI alerts when calls need attention. See every call and fix it before it ends.',
  openGraph: {
    title: 'Supervisor Tools · Barge, Whisper, Monitor | Rozper',
    description: 'Barge, whisper, and monitor live — with AI alerts when calls need attention.',
    type: 'website',
  },
}

export default function CCSupervisorToolsPage() {
  return <ProdCCSupervisorToolsPageView />
}
