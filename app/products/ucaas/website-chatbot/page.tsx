import { Metadata } from 'next'
import { ProdUCaaSWebsiteChatbotPageView } from '@/components/products/ucaas/website-chatbot'

export const metadata: Metadata = {
  title: 'Website Chatbot · Engage Visitors 24/7 | Rozper',
  description: 'AI chatbot that captures leads, books meetings, and hands off to live agents — one-line embed. Engage visitors 24/7.',
  openGraph: {
    title: 'Website Chatbot · Engage Visitors 24/7 | Rozper',
    description: 'AI chatbot that captures leads, books meetings, and hands off to live agents — one-line embed.',
    type: 'website',
  },
}

export default function WebsiteChatbotPage() {
  return <ProdUCaaSWebsiteChatbotPageView />
}
