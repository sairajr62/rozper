'use client'

import { motion } from 'framer-motion'
import {
  Phone, Video, MessageSquare, Zap, Globe, Shield, Users, Headphones,
  Bot, Mail, Send, Clock, FileText, BarChart3, Settings, Lock, 
  Smartphone, Monitor, Wifi, Cloud, Database, Server, Mic, Volume2,
  Bell, Calendar, CheckCircle, ArrowRight, Sparkles, Brain, Heart,
  Building, Briefcase, Target, TrendingUp, Award, Star, ThumbsUp,
  MessageCircle, Inbox, Share2, Link, PenTool, Image, Play, Pause,
  RefreshCw, Search, Filter, Download, Upload, Folder, File, Printer,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Phone, Video, MessageSquare, Zap, Globe, Shield, Users, Headphones,
  Bot, Mail, Send, Clock, FileText, BarChart3, Settings, Lock,
  Smartphone, Monitor, Wifi, Cloud, Database, Server, Mic, Volume2,
  Bell, Calendar, CheckCircle, ArrowRight, Sparkles, Brain, Heart,
  Building, Briefcase, Target, TrendingUp, Award, Star, ThumbsUp,
  MessageCircle, Inbox, Share2, Link, PenTool, Image, Play, Pause,
  RefreshCw, Search, Filter, Download, Upload, Folder, File, Printer
}

interface Section {
  title: string
  description: string
  features?: string[]
  icon?: string
}

interface AlternatingSectionsProps {
  sections: Section[]
}

export function AlternatingSections({ sections }: AlternatingSectionsProps) {
  return (
    <>
      {sections.map((section, index) => {
        const isEven = index % 2 === 0
        const Icon = section.icon ? iconMap[section.icon] : null
        
        return (
          <section
            key={section.title}
            className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${isEven ? 'bg-black' : 'bg-[#070707]'}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={!isEven ? 'lg:order-2' : ''}
                >
                  {Icon && (
                    <div className="inline-flex p-3 rounded-xl bg-[#046BD2]/10 mb-6">
                      <Icon className="w-8 h-8 text-[#046BD2]" />
                    </div>
                  )}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                    {section.title}
                  </h3>
                  <p className="text-lg text-[#CCD6DF] mb-6 leading-relaxed">
                    {section.description}
                  </p>
                  {section.features && (
                    <ul className="space-y-3">
                      {section.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#CCD6DF]">
                          <span className="text-[#046BD2]">&#10003;</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={!isEven ? 'lg:order-1' : ''}
                >
                  <div className="aspect-video bg-gradient-to-br from-[#046BD2]/10 to-[#0086F9]/5 rounded-2xl border border-[#0C0D0E] flex items-center justify-center">
                    <div className="text-center p-8">
                      {Icon && <Icon className="w-16 h-16 mx-auto mb-4 text-[#046BD2]/30" />}
                      <p className="text-[#757575] text-sm">Feature Illustration</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
