import { Metadata } from 'next'
import { FeatTollFreeNumbersPageView } from '@/components/features/toll-free-numbers'

export const metadata: Metadata = {
  title: 'Toll-Free Numbers · 800, 888, 877 & International | Rozper',
  description: 'Instant toll-free number provisioning in 150+ countries. USA 800/888/877 and international freephone. rozper.com.',
}

export default function TollFreeNumbersFeaturePage() {
  return <FeatTollFreeNumbersPageView />
}
