import { Metadata } from 'next'
import { ProdUCaaSVideoMeetingsPageView } from '@/components/products/ucaas/video-meetings'

export const metadata: Metadata = {
  title: 'HD Video Meetings · AI Transcripts Included | Rozper',
  description: 'Up to 200 participants, AI summaries, and screen sharing — all inside Rozper. HD video with AI transcripts.',
  openGraph: {
    title: 'HD Video Meetings · AI Transcripts Included | Rozper',
    description: 'Up to 200 participants, AI summaries, and screen sharing — all inside Rozper.',
    type: 'website',
  },
}

export default function VideoMeetingsPage() {
  return <ProdUCaaSVideoMeetingsPageView />
}
