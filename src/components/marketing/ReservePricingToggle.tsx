'use client'

import Link from 'next/link'

const tiers = [
  {
    label: 'Reserve',
    tagline: 'For the group that goes 3–4 times a year.',
    price: '$3,995',
    period: 'paid annually, upfront',
    credits: '10',
    retailValue: '$7,950+',
    savings: '~50%',
    additionalRate: '$695/day',
    bookingWindow: '7 days before public',
    rollover: 'Credits expire Dec 31',
    perks: [
      '10 day-credits loaded at purchase',
      'Use in any configuration (1–3 day blocks)',
      'Priority calendar: 7 days before public',
      'Additional days at $695/day',
      'Preferences on file',
    ],
    borderClass: 'border-[#433d38]',
    bgClass: 'bg-[#0f0e0c]',
    labelClass: 'text-[#5f5850]',
    dividerClass: 'bg-[#c9a96e]/40',
    ctaHref: '/contact?type=reserve',
    ctaLabel: 'Apply for Reserve',
    ctaClass: 'border border-[#c9a96e]/50 text-[#c9a96e] hover:bg-[#c9a96e]/10',
    featured: false,
  },
  {
    label: 'Gold',
    tagline: 'For the group that treats the van like a membership, not a rental.',
    price: '$6,995',
    period: 'paid annually, upfront',
    credits: '20',
    retailValue: '$15,900+',
    savings: '~56%',
    additionalRate: '$645/day',
    bookingWindow: '21 days before public',
    rollover: 'Credits expire Dec 31',
    perks: [
      '20 day-credits loaded at purchase',
      'Use in any configuration (1–7 day blocks)',
      'Priority calendar: 21 days before public',
      'Additional days at $645/day',
      'Van pre-set on every arrival',
      'Preferences on file · member line',
    ],
    borderClass: 'border-[#c9a96e]/50',
    bgClass: 'bg-[#0f0e0c]',
    labelClass: 'text-[#c9a96e]',
    dividerClass: 'bg-[#c9a96e]',
    ctaHref: '/contact?type=reserve-gold',
    ctaLabel: 'Apply for Gold',
    ctaClass: 'bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#d4b87a]',
    featured: true,
  },
  {
    label: 'Black',
    tagline: 'For operators and families who want the van always available.',
    price: '$11,995',
    period: 'paid annually, upfront',
    credits: '36',
    retailValue: '$28,620+',
    savings: '~58%',
    additionalRate: '$595/day',
    bookingWindow: 'First right of refusal · 30 days out',
    rollover: 'Credits roll to next year',
    perks: [
      '36 day-credits loaded at purchase',
      'Use in any configuration (1–14 day blocks)',
      'First right of refusal on any date',
      'Additional days at $595/day',
      'All fees waived (dump, cleaning)',
      'Day-credits roll to following year',
      'Van pre-set · member line · priority everything',
    ],
    borderClass: 'border-[#433d38]',
    bgClass: 'bg-[#0a0904]',
    labelClass: 'text-[#5f5850]',
    dividerClass: 'bg-[#c9a96e]/40',
    ctaHref: '/contact?type=reserve-black',
    ctaLabel: 'Apply for Black',
    ctaClass: 'border border-[#c9a96e]/50 text-[#c9a96e] hover:bg-[#c9a96e]/10',
    featured: false,
  },
]

export function ReservePricingToggle() {
  return (
    <div>
      {/* Header note */}
      <div className="mb-12 max-w-2xl">
        <p className="text-[#a09890] text-base leading-relaxed mb-3">
          All memberships are paid annually, upfront — no monthly billing, no surprises.
          Day-credits are loaded to your account at purchase and drawn down as you book.
          Membership is by application. Limited to 8 members total across all tiers.
        </p>
        <p className="text-xs text-[#5f5850]">
          Retail value calculated at $795/day base rate. Actual savings vary with trip timing.
        </p>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.label}
            className={`border ${tier.borderClass} ${tier.bgClass} p-8 flex flex-col relative`}
          >
            {tier.featured && (
              <div className="absolute top-0 left-0 right-0 h-px bg-[#c9a96e]" />
            )}
            {tier.featured && (
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Most Popular</p>
            )}

            <p className={`text-xs tracking-[0.3em] uppercase ${tier.labelClass} mb-2`}>
              {tier.label}
            </p>
            <p className="text-xs text-[#5f5850] mb-5 leading-relaxed">{tier.tagline}</p>

            {/* Price */}
            <div className="mb-1">
              <span className="font-serif text-4xl text-[#f0e6d0]">{tier.price}</span>
            </div>
            <p className="text-xs text-[#5f5850] mb-6">{tier.period}</p>

            <div className={`w-12 h-px ${tier.dividerClass} mb-6`} />

            {/* Value math */}
            <div className="bg-[#c9a96e]/5 border border-[#c9a96e]/20 p-4 mb-6">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#5f5850]">Day-credits included</span>
                <span className="text-[#f0e6d0] font-medium">{tier.credits} days</span>
              </div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#5f5850]">Retail value</span>
                <span className="text-[#f0e6d0]">{tier.retailValue}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#5f5850]">You save</span>
                <span className="text-[#c9a96e] font-medium">{tier.savings}</span>
              </div>
            </div>

            {/* Perks */}
            <ul className="space-y-2.5 mb-6 flex-1">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-xs text-[#a09890]">
                  <span className="text-[#c9a96e] mt-0.5 shrink-0">—</span>
                  {perk}
                </li>
              ))}
            </ul>

            {/* Footer details */}
            <p className="text-xs text-[#5f5850] mb-1">{tier.bookingWindow}</p>
            <p className="text-xs text-[#433d38] mb-5">{tier.rollover}</p>

            <Link
              href={tier.ctaHref}
              className={`block w-full text-center text-xs tracking-[0.2em] uppercase py-3 transition-colors ${tier.ctaClass}`}
            >
              {tier.ctaLabel}
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-10 p-6 border border-[#433d38]/40 bg-[#0f0e0c]">
        <p className="text-sm text-[#5f5850] leading-relaxed">
          <span className="text-[#c9a96e]">How credits work:</span> Day-credits are pre-purchased units of van time.
          One credit = one rental day. Book your credits in any combination throughout the year —
          a single Saturday, a long weekend, a full week. Credits are drawn from your account when you confirm a booking.
          Unused credits (except Black) expire December 31. They have no cash value and are non-transferable.
        </p>
      </div>
    </div>
  )
}
