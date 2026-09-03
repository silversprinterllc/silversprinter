'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Tier = {
  key: string
  name: string
  eyebrow: string
  price: string
  priceSub: string
  description: string
  forWho: string
  payback: string
  features: string[]
  cta: string
  ctaAction: 'checkout' | 'apply'
  highlighted: boolean
  badge?: string
}

const tiers: Tier[] = [
  {
    key: 'system',
    name: 'The System',
    eyebrow: 'Education',
    price: '$1,997',
    priceSub: 'one-time · lifetime access',
    description:
      'The complete Hub-and-Spoke education product — all 15 modules, every template, the full framework from acquisition through exit.',
    forWho:
      '1–10 unit operators who want to understand and run their own direct-booking business.',
    payback: 'Typical payback: under 60 days',
    features: [
      'All 15 modules (87+ lessons)',
      '60+ templates, checklists & swipe files',
      'Acquisition scorecard + pre-offer checklist',
      'Email sequence pack (25+ emails)',
      'Local Guide Engine Playbook',
      'Backlink Authority System',
      'Influencer outreach kit',
      'Tax strategy framework (Module 01)',
      'Exit-ready & DSCR documentation (Module 13)',
      'Private community access',
      'Lifetime access + all future updates',
      '14-day conditional money-back guarantee',
    ],
    cta: 'Enroll in The System',
    ctaAction: 'checkout',
    highlighted: false,
  },
  {
    key: 'build',
    name: 'The Build',
    eyebrow: 'Infrastructure',
    price: '$5,497',
    priceSub: 'one-time · full payment',
    description:
      'We build your direct-booking website — property-specific, booking-ready, and handed off. You own it permanently.',
    forWho:
      'Operators who want professional direct-booking infrastructure without the build-it-yourself learning curve.',
    payback: 'Typical payback: under 13 months from OTA fee savings alone',
    badge: 'Most Popular',
    features: [
      'Property-specific responsive website',
      'Custom domain connection',
      'PMS integration (OwnerRez, Hostaway, Hospitable, and others)',
      'Booking path + lead capture',
      'Gallery, amenities, location, reviews, FAQ',
      'SEO foundation — metadata, structured data, sitemap',
      'Analytics + Google Search Console setup',
      'Policies & legal framework',
      'Launch QA — mobile, desktop, booking flow',
      'Structured intake → first build in 3–4 weeks',
      'You own it. No ongoing platform fee.',
    ],
    cta: 'Get The Build',
    ctaAction: 'checkout',
    highlighted: true,
  },
  {
    key: 'portfolio',
    name: 'Portfolio / DFY',
    eyebrow: 'Advanced',
    price: 'From $9,997',
    priceSub: 'quoted after intake call',
    description:
      'Multiple properties, portfolio brands, done-for-you full-service, or needs that go beyond the standard Build.',
    forWho:
      'Operators with 3+ properties, or those who want full-service implementation without doing it themselves.',
    payback: 'Full-service DFY from $24,997',
    features: [
      'Everything in The Build, scaled to your portfolio',
      'Multi-property or portfolio brand architecture',
      'Custom PMS or booking integrations',
      'Done-for-you full-service implementation available',
      'Advanced booking logic or dashboard',
      'Dedicated intake and scoping call',
      'Scope and investment quoted after review',
    ],
    cta: 'Apply for Portfolio / DFY',
    ctaAction: 'apply',
    highlighted: false,
  },
]

// ─── ROI comparison data ──────────────────────────────────────────────────────
const alternatives = [
  {
    label: 'Property management co.',
    cost: '$30,000–$48,000/yr',
    note: '25–40% of gross on a $120K property. Every year. Forever.',
    isRed: true,
  },
  {
    label: 'Web agency (site only)',
    cost: '$8,000–$15,000',
    note: 'Build only. No PMS integration, no STR strategy, no SEO foundation.',
    isRed: true,
  },
  {
    label: 'SpokeBnB System + Build',
    cost: '$7,494 once',
    note: 'Education + infrastructure. You own everything. Pays back in months.',
    isRed: false,
  },
]

export default function PricingTiers() {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  async function handleAction(tier: Tier) {
    if (tier.ctaAction === 'apply') {
      router.push('/course/apply')
      return
    }

    setLoading(tier.key)
    try {
      const res = await fetch('/api/course/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: tier.key,
          planType: 'full',
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again or email ben@spokebnb.com')
      }
    } catch {
      alert('Something went wrong. Please try again or email ben@spokebnb.com')
    } finally {
      setLoading(null)
    }
  }

  return (
    <section id="pricing" aria-label="Pricing" className="py-16 sm:py-20 lg:py-28 bg-[var(--sf-cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Pricing
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-4 mb-4">
            We&apos;re proud of our price.
            <br />
            <span className="sf-gold-gradient">Here&apos;s why it&apos;s worth it.</span>
          </h2>
          <p className="text-[var(--sf-navy)]/60 leading-relaxed">
            We don&apos;t ask you to &ldquo;call for pricing&rdquo; because we&apos;re ashamed to publish it.
            SpokeBnB is a professional investment in a revenue-generating asset — and the price reflects that.
            Not the most expensive option in the market. The best-value one.
          </p>
        </div>

        {/* ROI Comparison */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-[var(--sf-navy)]/30 mb-4">
            Compare the real cost of the alternatives
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {alternatives.map((alt) => (
              <div
                key={alt.label}
                className={`rounded-xl p-4 border ${
                  alt.isRed
                    ? 'bg-white border-[var(--sf-navy)]/10'
                    : 'bg-[var(--sf-navy)] border-[var(--sf-navy)]'
                }`}
              >
                <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1.5 ${alt.isRed ? 'text-[var(--sf-navy)]/30' : 'text-[var(--sf-gold)]'}`}>
                  {alt.label}
                </p>
                <p className={`text-xl font-bold mb-1 ${alt.isRed ? 'text-[var(--sf-navy)]/40 line-through' : 'text-white'}`}>
                  {alt.cost}
                </p>
                <p className={`text-xs leading-relaxed ${alt.isRed ? 'text-[var(--sf-navy)]/40' : 'text-white/60'}`}>
                  {alt.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.key}
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
                <p className="text-xs font-semibold tracking-widest uppercase mb-2 text-[var(--sf-gold)]">
                  {tier.eyebrow}
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
              <div className="mb-2">
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

              {/* Payback */}
              <p className={`text-xs font-semibold mb-6 ${tier.highlighted ? 'text-[var(--sf-gold)]' : 'text-[var(--sf-gold)]'}`}>
                {tier.payback}
              </p>

              {/* Best for */}
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
                  <span className="font-semibold">Best for: </span>
                  {tier.forWho}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-[var(--sf-gold)]"
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
                onClick={() => handleAction(tier)}
                disabled={loading === tier.key}
                className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer disabled:opacity-60 ${
                  tier.highlighted
                    ? 'bg-[var(--sf-gold)] text-white hover:bg-[var(--sf-gold)]/90 hover:shadow-lg'
                    : 'bg-[var(--sf-navy)] text-white hover:bg-[var(--sf-navy)]/90'
                }`}
              >
                {loading === tier.key ? 'Redirecting...' : tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bundle Banner */}
        <div className="mt-8 rounded-2xl border border-[var(--sf-gold)]/30 bg-white overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-6">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--sf-gold)] mb-1">
                Best Value — System + Build Together
              </p>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--sf-navy)] mb-1">
                Buy both and save $500
              </h3>
              <p className="text-sm text-[var(--sf-navy)]/50">
                The System ($1,997) + The Build ($5,497) bundled at{' '}
                <strong className="text-[var(--sf-navy)]">$6,997</strong>.
                Education and infrastructure, together — the full stack for operators who are serious about owning their distribution.
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => router.push('/course/apply')}
                className="inline-block bg-[var(--sf-navy)] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[var(--sf-navy)]/90 transition-all whitespace-nowrap"
              >
                Apply for Bundle →
              </button>
            </div>
          </div>
        </div>

        {/* Guarantee — System only */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 border border-[var(--sf-navy)]/5">
            <svg className="w-5 h-5 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm text-[var(--sf-navy)]/60">
              <strong className="text-[var(--sf-navy)]">14-Day Conditional Guarantee (System)</strong> — Complete
              Modules 00 &amp; 01 and submit your homework. If you don&apos;t see the value, we refund every penny.{' '}
              <a href="/course/legal/refund" className="underline hover:text-[var(--sf-gold)]">Full refund policy</a>.
            </span>
          </div>
        </div>

        {/* Legal / Payment security */}
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
            By purchasing, you agree to our{' '}
            <a href="/course/legal/terms" className="underline hover:text-[var(--sf-gold)]">Terms of Service</a>,{' '}
            <a href="/course/legal/privacy" className="underline hover:text-[var(--sf-gold)]">Privacy Policy</a>, and{' '}
            <a href="/course/legal/refund" className="underline hover:text-[var(--sf-gold)]">Refund Policy</a>.
            Revenue figures shown are from our own properties and are{' '}
            <a href="/course/legal/earnings-disclaimer" className="underline hover:text-[var(--sf-gold)]">not guaranteed</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
