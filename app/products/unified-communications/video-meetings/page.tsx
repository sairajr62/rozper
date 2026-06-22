import { Metadata } from 'next'
import { ProdUCaaSVideoMeetingsPageView } from '@/components/products/unified-communications/video-meetings'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'HD Video Meetings · AI Transcripts Included | Rozper',
  description: 'Up to 200 participants, AI summaries, and screen sharing — all inside Rozper. HD video with AI transcripts.',
  openGraph: {
    title: 'HD Video Meetings · AI Transcripts Included | Rozper',
    description: 'Up to 200 participants, AI summaries, and screen sharing — all inside Rozper.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/unified-communications/video-meetings` },
}

export default function VideoMeetingsPage() {
  return <ProdUCaaSVideoMeetingsPageView />
}
