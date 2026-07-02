'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check } from 'lucide-react'

type PlanFeature = string

type Plan = {
  id: string
  name: string
  popular: boolean
  type: 'free' | 'paid' | 'custom'
  monthlyPrice?: number
  annualPrice?: number
  priceDisplay?: string          // overrides price number display
  priceSub: string               // line under price
  annualNote?: string            // shown only when annual toggle is on
  description: string
  cta: string
  features: PlanFeature[]
}

const plans: Plan[] = [
  {
    id: 'trial',
    name: 'Trial',
    popular: false,
    type: 'free',
    priceDisplay: 'Free',
    priceSub: '14 days',
    description: 'Explore every feature risk-free. No credit card required.',
    cta: 'Start Free Trial',
    features: [
      '1 seat min · No credit card',
      '100 min calling · 50 SMS',
      '25 AI Receptionist min',
      '100 chatbot convos',
      'Basic IVR · 1 DID',
      'Email support · No SLA',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    popular: false,
    type: 'paid',
    monthlyPrice: 12.99,
    annualPrice: 7.99,
    priceSub: 'per user / month',
    annualNote: 'Billed $119.88/user/year',
    description: 'A full business phone — calling, AI, SMS, and CRM sync from day one.',
    cta: 'Choose Starter',
    features: [
      '1 seat min',
      'Unlimited US/CA calling + SMS/MMS',
      '25 AI Receptionist min/mo',
      '200 chatbot convos/mo (pooled)',
      'AI Assistant · AI Call Tags · AI Writer',
      'Call queues · Multi-level IVR · CNAM',
      '1 local DID · 5 GB storage',
      'Email support · 99.9% SLA',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    popular: true,
    type: 'paid',
    monthlyPrice: 19.99,
    annualPrice: 15.99,
    priceSub: 'per user / month',
    annualNote: 'Billed $191.88/user/year',
    description: 'Full omnichannel, deep integrations, and compliance for growing teams.',
    cta: 'Choose Professional',
    features: [
      '3 seat min',
      'Unlimited US/CA calling + SMS/MMS',
      '100 AI Receptionist min/mo',
      '1,000 chatbot convos/mo',
      'WhatsApp · FB · IG · Telegram · Viber · MS Teams',
      'Salesforce · HubSpot · Zoho · Zendesk · Pipedrive · Zapier',
      'Call recording (30 days) · Supervisor listen/whisper/barge',
      '2 DIDs · 1 toll-free (shared) · 25 GB storage',
      'SOC 2 Type II · Online Fax',
      'Email + Chat support · 99.95% SLA',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    popular: false,
    type: 'paid',
    monthlyPrice: 29.99,
    annualPrice: 25.99,
    priceSub: 'per user / month',
    annualNote: 'Billed $311.88/user/year',
    description: 'Voice cloning, predictive dialing, and analytics for high-volume ops.',
    cta: 'Choose Enterprise',
    features: [
      '10 seat min',
      'Unlimited US/CA + 10K intl min pool',
      '300 AI Receptionist min/mo',
      '3,000 chatbot convos/mo',
      'Voice cloning · Local presence',
      'Predictive/Progressive auto dialer',
      'Full ACD · Skills-based routing',
      'Business Analytics Pro (custom dashboards)',
      'Advanced recording (1 yr) · 100 GB storage',
      'Phone + Priority support · 99.99% SLA',
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    popular: false,
    type: 'custom',
    priceDisplay: 'Call Sales',
    priceSub: '50+ seats',
    description: 'White-label, HIPAA BAA, dedicated fine-tuning, and financial SLA credits.',
    cta: 'Contact Sales',
    features: [
      '50+ seats',
      'Custom AI quotas + dedicated fine-tuning',
      'White-label API',
      'HIPAA BAA · SOC 2 Type II',
      'BigQuery / Snowflake export',
      'Dedicated CSM + TAM',
      '99.99% SLA + financial credits',
    ],
  },
]

export function PricingPlans() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing-plans" className="relative py-12 sm:py-16 lg:py-24 bg-[#0B1220] overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(4,107,210,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(4,107,210,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Billing toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6 sm:mb-8 lg:mb-12"
        >
          <div
            className="flex flex-wrap justify-center p-1 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <button
              onClick={() => setAnnual(false)}
              className="px-4 sm:px-7 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none"
              style={{
                background: !annual ? 'white' : 'transparent',
                color: !annual ? '#0B1220' : '#757575',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="flex items-center gap-2 px-4 sm:px-7 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none"
              style={{
                background: annual ? 'white' : 'transparent',
                color: annual ? '#0B1220' : '#757575',
              }}
            >
              Yearly
              <span
                className="text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap"
                style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* ── 5-column equal-height card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
          {plans.map((plan, i) => {
            const isPopular = plan.popular
            const isFree = plan.type === 'free'
            const isCustom = plan.type === 'custom'

            const displayPrice =
              plan.type === 'paid'
                ? `$${(annual ? plan.annualPrice! : plan.monthlyPrice!).toFixed(2)}`
                : plan.priceDisplay!

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="relative flex flex-col h-full rounded-2xl overflow-hidden"
                style={{
                  border: isPopular
                    ? '1px solid rgba(255,255,255,0.55)'
                    : isFree || isCustom
                    ? '1px solid rgba(255,255,255,0.07)'
                    : '1px solid rgba(255,255,255,0.1)',
                  background: isPopular
                    ? 'linear-gradient(160deg, #0f1f38 0%, #0c1828 100%)'
                    : isFree
                    ? 'rgba(255,255,255,0.02)'
                    : isCustom
                    ? 'linear-gradient(160deg, rgba(37,117,252,0.08) 0%, rgba(255,255,255,0.025) 100%)'
                    : 'rgba(255,255,255,0.032)',
                  boxShadow: isPopular
                    ? '0 0 50px rgba(4,107,210,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : 'none',
                }}
              >
                {/* ── Header: name badge (+ popular badge) ── */}
                <div className="flex flex-wrap items-center justify-center gap-2 px-5 pt-5 pb-0 min-h-[2.75rem]">
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: '#CCD6DF',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {plan.name}
                  </span>
                  {isPopular && (
                    <span
                      className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.25)',
                      }}
                    >
                      Most popular
                    </span>
                  )}
                </div>

                {/* ── Body: price + description + features + CTA ── */}
                <div className="flex flex-col flex-1 px-3 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-6">

                  {/* Price */}
                  <div className="mb-0.5">
                    <motion.div
                      key={`${plan.id}-${annual ? 'a' : 'm'}`}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl font-bold text-white leading-none"
                    >
                      {displayPrice}
                      {plan.type === 'paid' && (
                        <span className="text-xs font-normal text-[#757575] ml-1">/mo</span>
                      )}
                    </motion.div>
                  </div>

                  {/* Sub-label / annual note */}
                  <p className="text-[#757575] text-xs mt-1">
                    {plan.type === 'paid' && annual && plan.annualNote
                      ? plan.annualNote
                      : plan.priceSub}
                  </p>
                  {plan.type === 'paid' && annual && (
                    <p className="text-[#757575] text-xs line-through opacity-60 break-words overflow-hidden">
                      ${plan.monthlyPrice!.toFixed(2)}/mo billed monthly
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-[#CCD6DF] text-xs leading-relaxed mt-3 mb-4">
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="mb-4"
                    style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }}
                  />

                  {/* Features — flex-1 so this section grows to fill remaining space */}
                  <ul className="flex-1 space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            border: '1px solid rgba(4,107,210,0.4)',
                            background: 'rgba(4,107,210,0.1)',
                          }}
                        >
                          <Check className="w-2.5 h-2.5 text-[#046BD2]" strokeWidth={3} />
                        </div>
                        <span className="text-[#CCD6DF] text-xs leading-snug break-words min-w-0">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — pinned to bottom */}
                  <a
                    href={plan.id === 'trial' ? '/free-trial' : '/contact'}
                    className="mt-auto w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 focus:outline-none text-center block"
                    style={
                      isPopular
                        ? { background: 'white', color: '#0B1220' }
                        : {
                            background: 'rgba(255,255,255,0.07)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.13)',
                          }
                    }
                    onMouseEnter={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = '#dce8f5'
                      } else {
                        e.currentTarget.style.background = 'rgba(4,107,210,0.18)'
                        e.currentTarget.style.borderColor = 'rgba(4,107,210,0.45)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPopular) {
                        e.currentTarget.style.background = 'white'
                      } else {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'
                      }
                    }}
                  >
                    {plan.cta}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-[#757575] text-sm mt-10"
        >
          All paid plans include a 14-day free trial.{' '}
          <a
            href="/"
            className="text-[#046BD2] hover:text-[#0086F9] font-medium transition-colors duration-200"
          >
            Volume discounts for 25+ seats →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
