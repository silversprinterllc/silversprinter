'use client'

import { useState } from 'react'

const TIER_KEYS = ['system', 'intensive', 'concierge'] as const

const tiers = [
  {
    name: 'The System',
    type: 'Self-Paced Course',
    price: '$1,997',
    priceSub: 'or 4x $549',
    description: 'The complete Hub-and-Spoke Revenue System — all 10 modules, every template, lifetime access.',
    ideal: '1-10 unit owners who are self-starters and want to build at their own pace.',
    features: [
      'All 10 course modules (40+ lessons)',
      '60+ templates, checklists & swipe files',
      'Revenue Per Night Calculator',
      'Direct Booking Website Template',
      'Email sequence pack (25+ emails)',
      'Influencer outreach kit',
      'Private community access',
      'Lifetime access + updates',
      '14-day conditional money-back guarantee',
    ],
    cta: 'Enroll Now',
    highlighted: false,
  },
  {
    name: 'The Intensive',
    type: 'Done-With-You Cohort',
    price: '$2,997',
    priceSub: 'or 3x $1,099',
    description: 'Choose your track: Direct Booking, Automation, or Content & Growth. 5 focused coaching calls with personalized review of your property and systems.',
    ideal: 'Owners who want expert eyes on their work and a proven system built right the first time.',
    badge: 'Most Popular',
    features: [
      'Everything in The System',
      '5 live 1-on-1 coaching calls (20 min each)',
      'Personalized review of YOUR property, listings & systems',
      'Choose your track: Direct Booking, Automation, or Content',
      'Private Slack channel — async support between calls',
      'Loom video critiques of your site, copy & funnels',
      'Track-specific template packs',
      '14-day conditional money-back guarantee',
    ],
    cta: 'Join the Cohort',
    highlighted: true,
  },
  {
    name: 'The Concierge',
    type: 'Done-For-You Build',
    price: '$7,500',
    priceSub: 'or 2x $3,950',
    description: 'We build your direct booking system, automation stack, or content engine — and hand you the keys. You approve milestones. We do the work.',
    ideal: '1-30 unit operators who value speed over learning curve and want expert execution.',
    features: [
      'Everything in The Intensive',
      'Full system built by our team in 5 weeks',
      'Strategy call + competitive analysis',
      'Custom website, email funnels, or automation stack',
      'Tech stack configured and tested end-to-end',
      '90-day post-launch support',
      'Priority Slack access',
      'Available: Direct Booking, Automation, or Content track',
      'Application required',
    ],
    cta: 'Apply Now',
    highlighted: false,
  },
]

export default function PricingTiers() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleCheckout(tierIndex: number) {
    const tierKey = TIER_KEYS[tierIndex]
    setLoading(tierKey)
    try {
      const res = await fetch('/api/course/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: tierKey }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again or email ben@thehoadleygroup.com')
      }
    } catch {
      alert('Something went wrong. Please try again or email ben@thehoadleygroup.com')
    } finally {
      setLoading(null)
    }
  }

  return (
    <section id="pricing" aria-label="Pricing plans" className="py-16 sm:py-20 lg:py-28 bg-[var(--sf-cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Choose Your Path
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-4 mb-4">
            Three Ways to Build
            <br />
            <span className="sf-gold-gradient">Your Revenue Machine</span>
          </h2>
          <p className="text-[var(--sf-navy)]/60">
            Every tier includes the full 10-module curriculum. The difference is how
            much support you get building it.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 ${
                tier.highlighted
                  ? 'bg-[var(--sf-navy)] text-white ring-2 ring-[var(--sf-gold)] shadow-2xl shadow-[var(--sf-navy)]/20 md:scale-[1.03] lg:scale-105'
                  : 'bg-white border border-[var(--sf-navy)]/10'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[var(--sf-gold)] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <p
                  className={`text-xs font-semibold tracking-widest uppercase mb-2 ${
                    tier.highlighted ? 'text-[var(--sf-gold)]' : 'text-[var(--sf-gold)]'
                  }`}
                >
                  {tier.type}
                </p>
                <h3
                  className={`font-[var(--font-display)] text-2xl font-bold mb-2 ${
                    tier.highlighted ? 'text-white' : 'text-[var(--sf-navy)]'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    tier.highlighted ? 'text-white/60' : 'text-[var(--sf-navy)]/50'
                  }`}
                >
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span
                  className={`text-4xl font-bold ${
                    tier.highlighted ? 'text-white' : 'text-[var(--sf-navy)]'
                  }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-sm ml-2 ${
                    tier.highlighted ? 'text-white/40' : 'text-[var(--sf-navy)]/40'
                  }`}
                >
                  {tier.priceSub}
                </span>
              </div>

              {/* Ideal For */}
              <div
                className={`rounded-lg px-4 py-3 mb-6 ${
                  tier.highlighted ? 'bg-white/10' : 'bg-[var(--sf-navy)]/5'
                }`}
              >
                <p
                  className={`text-xs ${
                    tier.highlighted ? 'text-white/50' : 'text-[var(--sf-navy)]/40'
                  }`}
                >
                  <span className="font-semibold">Best for:</span> {tier.ideal}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        tier.highlighted ? 'text-[var(--sf-gold)]' : 'text-[var(--sf-gold)]'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={tier.highlighted ? 'text-white/80' : 'text-[var(--sf-navy)]/60'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleCheckout(index)}
                disabled={loading === TIER_KEYS[index]}
                className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer disabled:opacity-60 ${
                  tier.highlighted
                    ? 'bg-[var(--sf-gold)] text-white hover:bg-[var(--sf-gold)]/90 hover:shadow-lg'
                    : 'bg-[var(--sf-navy)] text-white hover:bg-[var(--sf-navy)]/90'
                }`}
              >
                {loading === TIER_KEYS[index] ? 'Redirecting to checkout...' : tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 border border-[var(--sf-navy)]/5">
            <svg className="w-5 h-5 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm text-[var(--sf-navy)]/60">
              <strong className="text-[var(--sf-navy)]">14-Day Conditional Money-Back Guarantee</strong> — Complete
              Modules 0 &amp; 1 and submit your homework. If you don&apos;t see the value, we refund every penny.{' '}
              <a href="/course/refund-policy" className="underline hover:text-[var(--sf-gold)]">Full refund policy</a>.
            </span>
          </div>
        </div>

        {/* Legal Consent & Payment Security */}
        <div className="mt-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-4 text-xs text-[var(--sf-navy)]/30">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure checkout via Stripe</span>
            </div>
            <span>·</span>
            <span>PCI Level 1 certified</span>
            <span>·</span>
            <span>We never see your card number</span>
          </div>
          <p className="text-xs text-[var(--sf-navy)]/25 max-w-lg mx-auto">
            By enrolling, you agree to our{' '}
            <a href="/course/terms" className="underline hover:text-[var(--sf-gold)]">Terms of Service</a>,{' '}
            <a href="/course/privacy" className="underline hover:text-[var(--sf-gold)]">Privacy Policy</a>, and{' '}
            <a href="/course/refund-policy" className="underline hover:text-[var(--sf-gold)]">Refund Policy</a>.
            Revenue figures shown are from our properties and are{' '}
            <a href="/course/earnings-disclaimer" className="underline hover:text-[var(--sf-gold)]">not guaranteed</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
