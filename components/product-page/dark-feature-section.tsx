'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Check, Phone, Video, MessageSquare, Zap, Globe, Shield, Users, Headphones,
  Bot, Mail, Send, Clock, FileText, BarChart3, Settings, Lock, 
  Smartphone, Monitor, Wifi, Cloud, Database, Server, Mic, Volume2,
  Bell, Calendar, CheckCircle, ArrowRight, Sparkles, Brain, Heart,
  Building, Briefcase, Target, TrendingUp, Award, Star, ThumbsUp,
  MessageCircle, Inbox, Share2, Link as LinkIcon, PenTool, Image, Play, Pause,
  RefreshCw, Search, Filter, Download, Upload, Folder, File, Printer,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Phone, Video, MessageSquare, Zap, Globe, Shield, Users, Headphones,
  Bot, Mail, Send, Clock, FileText, BarChart3, Settings, Lock,
  Smartphone, Monitor, Wifi, Cloud, Database, Server, Mic, Volume2,
  Bell, Calendar, CheckCircle, ArrowRight, Sparkles, Brain, Heart,
  Building, Briefcase, Target, TrendingUp, Award, Star, ThumbsUp,
  MessageCircle, Inbox, Share2, Link: LinkIcon, PenTool, Image, Play, Pause,
  RefreshCw, Search, Filter, Download, Upload, Folder, File, Printer
}

interface FeatureItem {
  icon?: string
  title: string
  description: string
}

interface DarkFeatureSectionProps {
  title: string
  titleHighlight?: string
  subtitle?: string
  benefits?: string[]
  features?: FeatureItem[]
  ctaLabel?: string
  ctaHref?: string
  imageSrc?: string
  imageAlt?: string
  reversed?: boolean
}

export function DarkFeatureSection({
  title,
  titleHighlight,
  subtitle,
  benefits,
  features,
  ctaLabel = 'Start a No-Pressure Conversation',
  ctaHref = '/contact',
  reversed = false
}: DarkFeatureSectionProps) {
  // Combine both formats into a unified list
  const items = benefits || features?.map(f => f.title + ': ' + f.description) || []
  const featureList = features || []
  const useFeatureFormat = !benefits && features && features.length > 0

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#070707]">
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: reversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={reversed ? 'lg:order-2' : ''}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {titleHighlight ? (
                <>
                  {title.split(titleHighlight)[0]}
                  <span className="text-[#046BD2]">{titleHighlight}</span>
                  {title.split(titleHighlight)[1]}
                </>
              ) : (
                title
              )}
            </h2>
            {subtitle && (
              <p className="text-lg text-[#CCD6DF] mb-8">{subtitle}</p>
            )}
            
            {useFeatureFormat ? (
              <div className="space-y-6 mb-8">
                {featureList.map((feature, index) => {
                  const Icon = feature.icon ? iconMap[feature.icon] : CheckCircle
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#046BD2]/20 flex items-center justify-center">
                        {Icon && <Icon className="w-5 h-5 text-[#046BD2]" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                        <p className="text-[#CCD6DF] text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <ul className="space-y-4 mb-8">
                {items.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#046BD2]/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-[#046BD2]" />
                    </div>
                    <span className="text-[#CCD6DF]">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            )}
            
            <Link
              href={ctaHref}
              className="inline-flex px-6 py-3 bg-[#046BD2] hover:bg-[#046BD2]/90 text-white font-semibold rounded-lg transition-all duration-300"
            >
              {ctaLabel}
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: reversed ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`relative ${reversed ? 'lg:order-1' : ''}`}
          >
            <div className="aspect-video bg-gradient-to-br from-[#046BD2]/20 to-[#0086F9]/10 rounded-2xl border border-[#046BD2]/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#046BD2]/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#046BD2]" />
                </div>
                <p className="text-[#757575] text-sm">Feature Visualization</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
