'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    initials: 'DK',
    name: 'Daniel Kim',
    role: 'Co-founder',
    company: 'Stackwave Labs',
    quote:
      "We were paying $47/user/month with RingCentral and still buying add-ons for things Rozper includes by default. Switching to the Starter plan cut our comms bill by 60% overnight. I wish we'd done it sooner.",
  },
  {
    initials: 'LM',
    name: 'Laura Mendez',
    role: 'Office Manager',
    company: 'Briar Street Dental',
    quote:
      "I was nervous about hidden fees — every other platform had them. Rozper's pricing is exactly what it says. $9.99 per user. That's it. No activation fee, no number porting fee, no surprise invoice.",
  },
  {
    initials: 'TO',
    name: 'Taiwo Okonkwo',
    role: 'Operations Lead',
    company: 'Foresight Logistics',
    quote:
      "The 14-day trial sold us. No card on file, full access to everything — we had enough time to actually test it with real calls before committing. Most platforms give you a demo. Rozper gave us the real thing.",
  },
  {
    initials: 'RB',
    name: 'Rachel Bloom',
    role: 'Head of Finance',
    company: 'Lightpath Media',
    quote:
      "Annual billing at $9.99 per user versus the $19/user we were paying elsewhere — for a 22-person team that's over $2,400 back in the budget every year. The CFO approved it in 10 minutes.",
  },
  {
    initials: 'AS',
    name: 'Arjun Sethi',
    role: 'Founder',
    company: 'Clearview Realty',
    quote:
      "I thought cheap meant cutting corners. What I didn't expect was getting AI call transcripts, a chatbot, and WhatsApp integration in the base plan. Competitors charge extra for each of those.",
  },
  {
    initials: 'NF',
    name: 'Natalie Ford',
    role: 'Customer Support Manager',
    company: 'Helios Commerce',
    quote:
      "We scaled from 4 seats to 19 in three months. Adding users took seconds and the per-seat cost stayed the same — no renegotiating, no new contract. That kind of pricing predictability matters when you're growing fast.",
  },
]

const stats = [
  { value: '500+', label: 'Teams switched this year' },
  { value: '4.9 / 5', label: 'Average rating' },
  { value: '60%', label: 'Average bill reduction' },
  { value: '$2,400+', label: 'Saved per team / year' },
]

const row1 = testimonials.slice(0, 3)
const row2 = testimonials.slice(3)

type Testimonial = (typeof testimonials)[number]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="flex-shrink-0 w-[360px] flex flex-col gap-4 rounded-2xl p-6 mx-3"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: '2px solid rgba(4,107,210,0.55)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#046BD2] text-[#046BD2]" />
        ))}
      </div>
      <p className="text-[#CCD6DF] text-sm leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-1 border-t border-white/[0.07]">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #046BD2 0%, #0086F9 100%)' }}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-white font-semibold text-xs">{t.name}</p>
          <p className="text-[#757575] text-xs">{t.role} &middot; {t.company}</p>
        </div>
      </div>
    </div>
  )
}

export function PricingTestimonial() {
  const featured = testimonials[0]

  return (
    <section className="relative py-24 bg-[#0B1220] overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .track-left  { animation: marquee-left  42s linear infinite; }
        .track-right { animation: marquee-right 36s linear infinite; }
        .marquee-row:hover .track-left,
        .marquee-row:hover .track-right { animation-play-state: paused; }
      `}</style>

      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#046BD2]/8 rounded-full blur-[180px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center px-4 mb-14"
      >
        <p className="text-[#046BD2] text-sm font-semibold uppercase tracking-widest mb-3">
          Customer stories
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          Trusted by teams worldwide
        </h2>
        <p className="text-[#757575] text-base max-w-xl mx-auto">
          Real numbers from real teams who switched to Rozper.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mb-16 px-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
            viewport={{ once: true }}
            className="flex flex-col items-center px-7 py-4 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span
              className="text-2xl font-bold leading-none"
              style={{
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #CCD6DF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {s.value}
            </span>
            <span className="text-[#757575] text-xs mt-1.5 whitespace-nowrap">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Featured quote */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 sm:px-6 mb-12"
      >
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-12 sm:px-14"
          style={{
            background: 'linear-gradient(135deg, rgba(4,107,210,0.12) 0%, rgba(255,255,255,0.04) 60%, rgba(0,134,249,0.08) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 0 60px rgba(4,107,210,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#046BD2]/70 to-transparent" />
          <div
            className="absolute -top-2 left-8 text-[130px] font-serif select-none pointer-events-none leading-none"
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(135deg, rgba(4,107,210,0.28) 0%, transparent 80%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
            aria-hidden
          >
            &ldquo;
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative z-10">
            <div className="flex-1">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.06, type: 'spring', stiffness: 300 }}
                    viewport={{ once: true }}
                  >
                    <Star className="w-5 h-5 fill-[#046BD2] text-[#046BD2]" />
                  </motion.div>
                ))}
              </div>
              <blockquote className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
            </div>
            <div className="hidden lg:block w-px h-20 bg-white/10 flex-shrink-0" />
            <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:text-center lg:w-44 flex-shrink-0">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 border border-[#046BD2]/40"
                style={{ background: 'linear-gradient(135deg, #046BD2 0%, #0086F9 100%)' }}
              >
                {featured.initials}
              </div>
              <div>
                <p className="text-white font-bold">{featured.name}</p>
                <p className="text-[#757575] text-sm">{featured.role}</p>
                <p className="text-[#046BD2] text-sm font-medium">{featured.company}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Infinite marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0B1220 0%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0B1220 0%, transparent 100%)' }}
        />

        <div className="marquee-row overflow-hidden mb-4">
          <div className="track-left flex w-max">
            {[...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>

        <div className="marquee-row overflow-hidden">
          <div className="track-right flex w-max">
            {[...row2, ...row2].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
