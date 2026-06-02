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

interface Feature {
  title: string
  description: string
  icon: string
}

interface FeatureGridProps {
  title: string
  titleHighlight?: string
  subtitle?: string
  features: Feature[]
}

export function FeatureGrid({ title, titleHighlight, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
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
            <p className="text-lg text-[#CCD6DF] max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Phone
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 bg-white/[0.03] border border-[#0C0D0E] rounded-2xl hover:border-[#046BD2]/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-[#046BD2]/10 mb-6">
                  <Icon className="w-6 h-6 text-[#046BD2]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#CCD6DF] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
