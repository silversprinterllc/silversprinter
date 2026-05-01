import Link from 'next/link'

const perks = [
  'Calendar opens to you 30 days before the public',
  'Round-robin priority for holiday and peak weekends',
  'Van pre-set before every arrival — preferences on file',
  'Direct member line · priority response',
  'Additional days beyond your credits at $750/day',
  'First right of refusal on Road Club seats for van two',
  'Founding seat price locked — renew before expiration, rate never moves',
]

export function ReservePricingToggle() {
  return (
    <div className="border border-[#c9a96e]/40 bg-[#0f0e0c]">

      {/* Top bar */}
      <div className="h-px bg-[#c9a96e]" />

      <div className="p-10 md:p-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-3">Sterling Road Club</p>
            <p className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-4">$25,000</p>
            <p className="text-sm text-[#5f5850]">per seat · paid in full at enrollment</p>
          </div>
          <div className="md:text-right">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-2">Seats Available</p>
            <p className="font-serif text-4xl text-[#f0e6d0]">4</p>
            <p className="text-xs text-[#433d38] mt-1">When they're filled, the Club is closed.</p>
          </div>
        </div>

        {/* Two-column: what's included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#c9a96e]/15 mb-12">

          {/* Signature Week */}
          <div className="bg-[#0f0e0c] p-8">
            <div className="w-8 h-px bg-[#c9a96e] mb-6" />
            <h3 className="font-serif text-2xl text-[#f0e6d0] mb-3">1 Signature Week</h3>
            <p className="text-[#5f5850] text-sm leading-relaxed mb-4">
              Seven consecutive days, chosen at enrollment. These dates are locked — no one can book them.
              Plan a year out. Your golf trip is in September. Lock September. Done.
            </p>
            <p className="text-xs text-[#c9a96e]/70">7 days · immovable · yours every year</p>
          </div>

          {/* Day Credits */}
          <div className="bg-[#0f0e0c] p-8">
            <div className="w-8 h-px bg-[#c9a96e] mb-6" />
            <h3 className="font-serif text-2xl text-[#f0e6d0] mb-3">25 Day-Credits</h3>
            <p className="text-[#5f5850] text-sm leading-relaxed mb-4">
              Loaded to your account at enrollment. Book them one at a time or string them together —
              a long weekend, a week, however you want. $750/day on every credit.
            </p>
            <p className="text-xs text-[#c9a96e]/70">$750/day · any date · draw down all year</p>
          </div>
        </div>

        {/* Value callout */}
        <div className="flex flex-col sm:flex-row gap-8 mb-12 p-6 border border-[#433d38]/60">
          <div className="flex-1">
            <p className="text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-1">Days Included</p>
            <p className="font-serif text-3xl text-[#f0e6d0]">32 days</p>
            <p className="text-xs text-[#433d38] mt-1">7 locked + 25 flexible</p>
          </div>
          <div className="w-px bg-[#433d38]/50 hidden sm:block" />
          <div className="flex-1">
            <p className="text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-1">Your Seat Fee</p>
            <p className="font-serif text-3xl text-[#f0e6d0]">$25,000</p>
            <p className="text-xs text-[#433d38] mt-1">paid once · credits load immediately</p>
          </div>
          <div className="w-px bg-[#433d38]/50 hidden sm:block" />
          <div className="flex-1">
            <p className="text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-1">Additional Days</p>
            <p className="font-serif text-3xl text-[#f0e6d0]">$750</p>
            <p className="text-xs text-[#433d38] mt-1">member rate · beyond your credits</p>
          </div>
        </div>

        {/* Perks */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">Also Included</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm text-[#a09890]">
                <span className="text-[#c9a96e] shrink-0 mt-0.5">—</span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Round-robin note */}
        <div className="mb-12 p-5 border border-[#433d38]/50 bg-[#0a0a0a]">
          <p className="text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-2">How Peak Dates Work</p>
          <p className="text-sm text-[#5f5850] leading-relaxed">
            Holiday weekends and high-demand dates are allocated by rotating round-robin among the four members.
            Year one: enrollment order. Year two: reverse order. Rotates annually. Fair, simple, no disputes.
            Your Signature Week is always yours — round-robin applies only to additional credit bookings on peak dates.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Link
            href="/contact?type=road-club"
            className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-xs tracking-[0.2em] uppercase font-medium px-12 py-4 hover:bg-[#d4b87a] transition-colors duration-200"
          >
            Apply for a Seat
          </Link>
          <p className="text-xs text-[#433d38] leading-relaxed self-center max-w-xs">
            Every application is reviewed. Membership is by approval. We keep it small on purpose.
          </p>
        </div>
      </div>
    </div>
  )
}
