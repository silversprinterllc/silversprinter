'use client'

import Link from 'next/link'

const tiers = [
  {
    label: 'Reserve',
    tagline: 'For the group that moves three or four times a year.',
    price: '$3,995',
    period: 'paid in full at enrollment',
    credits: '10 day-credits',
    creditsNote: 'Loaded to your account immediately',
    additionalRate: '$695/day',
    bookingWindow: '7 days before public',
    rollover: 'Credits expire Dec 31',
    perks: [
      '10 days of priority van access',
      'Calendar opens to you before the public',
      'Your preferences on file',
      'Additional days at member rate ($695/day)',
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
    tagline: 'For the group that treats the van like it belongs to them.',
    price: '$6,995',
    period: 'paid in full at enrollment',
    credits: '20 day-credits',
    creditsNote: 'Loaded to your account immediately',
    additionalRate: '$645/day',
    bookingWindow: '21 days before public',
    rollover: 'Credits expire Dec 31',
    perks: [
      '20 days of priority van access',
      'Calendar opens 21 days before the public',
      'Van pre-set on every arrival',
      'Preferences on file · member line',
      'Additional days at member rate ($645/day)',
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
    tagline: 'For operators and families who move on their schedule, not the calendar.',
    price: '$11,995',
    period: 'paid in full at enrollment',
    credits: '36 day-credits',
    creditsNote: 'Loaded immediately · carry to next year',
    additionalRate: '$595/day',
    bookingWindow: 'First call on any date · 30 days out',
    rollover: 'Credits carry to the following year',
    perks: [
      '36 days — first call on any date, any time',
      'First right of refusal 30 days before public',
      'All operational fees waived (dump, cleaning)',
      'Day-credits carry to the following year',
      'Van pre-set · member line · priority everything',
      'Additional days at member rate ($595/day)',
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
          All memberships are paid in full at enrollment — one payment, no monthly billing, no surprises.
          Day-credits are loaded to your account immediately and drawn down as you book.
          Membership is by application. Limited to 8 members total across all tiers.
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
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Most Requested</p>
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

            {/* Credits block */}
            <div className="mb-6">
              <p className="font-serif text-2xl text-[#f0e6d0] mb-1">{tier.credits}</p>
              <p className="text-xs text-[#5f5850]">{tier.creditsNote}</p>
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
            <div className="mb-5 space-y-1.5">
              <p className="text-xs text-[#5f5850]">Priority window: {tier.bookingWindow}</p>
              <p className="text-xs text-[#433d38]">{tier.rollover}</p>
            </div>

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
          One credit = one rental day. Book them in any combination throughout the year —
          a single Saturday, a long weekend, a full week. Credits are drawn from your account when you confirm a booking.
          Unused credits (except Black tier) expire December 31. They have no cash value and are non-transferable.
        </p>
      </div>
    </div>
  )
}
