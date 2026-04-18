'use client'

import Link from 'next/link'
import { useState } from 'react'

type BillingCycle = 'annual' | 'monthly'

const tiers = {
  reserve: {
    label: 'Reserve',
    sub: 'For the intentional traveler',
    annual: { monthly: '$399', yearly: '$4,788' },
    monthly: { monthly: '$499', yearly: null },
    borderClass: 'border-[#433d38]',
    bgClass: 'bg-[#0f0e0c]',
    accentClass: 'text-[#5f5850]',
    dividerClass: 'bg-[#c9a96e]/40',
    ctaHref: '/contact?type=reserve',
    ctaLabel: 'Apply — Reserve',
    ctaClass: 'border border-[#c9a96e]/50 text-[#c9a96e] hover:bg-[#c9a96e]/10',
    featured: false,
    bookingNotice: '48-hr advance booking window',
    includes: [
      '1 included rental day / month',
      '20% off all additional days',
      '150 miles/day included',
      'Priority calendar access',
    ],
    valueNote: '12 days/yr · $399/day effective',
  },
  gold: {
    label: 'Gold',
    sub: 'For the group that goes regularly',
    annual: { monthly: '$799', yearly: '$9,588' },
    monthly: { monthly: '$999', yearly: null },
    borderClass: 'border-[#c9a96e]/50',
    bgClass: 'bg-[#0f0e0c]',
    accentClass: 'text-[#c9a96e]',
    dividerClass: 'bg-[#c9a96e]',
    ctaHref: '/contact?type=reserve-gold',
    ctaLabel: 'Apply — Gold',
    ctaClass: 'bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#d4b87a]',
    featured: true,
    bookingNotice: '24-hr advance booking window',
    includes: [
      '2 included rental days / month',
      '25% off all additional days',
      '200 miles/day included',
      'Priority calendar — before public opens',
    ],
    valueNote: '24 days/yr · $399/day effective',
  },
  black: {
    label: 'Black',
    sub: 'For those who move differently',
    annual: { monthly: '$1,195', yearly: '$14,340' },
    monthly: { monthly: '$1,495', yearly: null },
    borderClass: 'border-[#433d38]',
    bgClass: 'bg-[#0a0904]',
    accentClass: 'text-[#5f5850]',
    dividerClass: 'bg-[#c9a96e]/40',
    ctaHref: '/contact?type=reserve-black',
    ctaLabel: 'Apply — Black',
    ctaClass: 'border border-[#c9a96e]/50 text-[#c9a96e] hover:bg-[#c9a96e]/10',
    featured: false,
    bookingNotice: 'Same-day booking · First right of refusal',
    includes: [
      '3 included rental days / month',
      '30% off all additional days',
      '250 miles/day included',
      'Dump fee waived · Snack board included',
    ],
    valueNote: '36 days/yr · $398/day effective',
  },
}

export function ReservePricingToggle() {
  const [cycle, setCycle] = useState<BillingCycle>('annual')

  return (
    <div>
      {/* Toggle */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="flex items-center gap-1 border border-[#433d38] p-1">
          {(['monthly', 'annual'] as BillingCycle[]).map((c) => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className={`px-6 py-2 text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                cycle === c
                  ? 'bg-[#c9a96e] text-[#0a0a0a] font-medium'
                  : 'text-[#5f5850] hover:text-[#a09890]'
              }`}
            >
              {c === 'annual' ? 'Annual' : 'Monthly'}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#5f5850] text-center max-w-sm leading-relaxed">
          Annual plans save 20%. Founding member rates locked for life — price never increases as long as membership is active.
        </p>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(tiers).map(([key, tier]) => {
          const pricing = cycle === 'annual' ? tier.annual : tier.monthly
          return (
            <div
              key={key}
              className={`border ${tier.borderClass} ${tier.bgClass} p-8 flex flex-col relative`}
            >
              {tier.featured && (
                <div className="absolute top-0 left-0 right-0 h-px bg-[#c9a96e]" />
              )}
              <p className={`text-xs tracking-[0.3em] uppercase ${tier.accentClass} mb-3`}>
                {tier.sub}
              </p>
              <div className="mb-2">
                <span className="font-serif text-4xl text-[#f0e6d0]">{pricing.monthly}</span>
                <span className="text-[#5f5850] text-sm">/mo</span>
              </div>
              {cycle === 'annual' && pricing.yearly ? (
                <p className="text-xs text-[#5f5850] mb-6">billed {pricing.yearly}/year</p>
              ) : (
                <p className="text-xs text-[#5f5850] mb-6">billed monthly</p>
              )}
              <div className={`w-12 h-px ${tier.dividerClass} mb-6`} />
              <ul className="space-y-2.5 mb-5">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-[#a09890]">
                    <span className="text-[#c9a96e] mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#5f5850] border-t border-[#433d38]/40 pt-4 mb-2">{tier.bookingNotice}</p>
              <p className="text-xs text-[#c9a96e]/60 mb-4">{tier.valueNote}</p>
              <div className="mt-auto pt-2">
                <Link
                  href={tier.ctaHref}
                  className={`block w-full text-center text-xs tracking-[0.2em] uppercase py-3 transition-colors ${tier.ctaClass}`}
                >
                  {tier.ctaLabel}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
