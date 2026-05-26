import { Metadata } from 'next'
import { ProdUCaaSWebsiteChatbotPageView } from '@/components/products/ucaas/website-chatbot'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Website Chatbot · Engage Visitors 24/7 | Rozper',
  description: 'AI chatbot that captures leads, books meetings, and hands off to live agents — one-line embed. Engage visitors 24/7.',
  openGraph: {
    title: 'Website Chatbot · Engage Visitors 24/7 | Rozper',
    description: 'AI chatbot that captures leads, books meetings, and hands off to live agents — one-line embed.',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/products/ucaas/website-chatbot` },
}

export default function WebsiteChatbotPage() {
  return <ProdUCaaSWebsiteChatbotPageView />
}
