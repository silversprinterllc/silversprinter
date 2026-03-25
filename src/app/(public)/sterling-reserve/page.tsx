import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sterling Reserve Membership — Sterling Route',
  description: 'Priority access, preferred rates, and a dedicated concierge. Sterling Reserve is a private membership for travelers who plan ahead and expect more.',
}

export default function SterlingReservePage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HERO */}
      <section className="relative py-32 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">By Application Only</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#f0e6d0] leading-tight mb-8">
            The Van Is Always Ready.<br />
            <span className="text-[#c9a96e]">The Question Is Whether You Are.</span>
          </h1>
          <p className="text-lg text-[#a09890] leading-relaxed max-w-2xl">
            Sterling Reserve is a private membership that gives you priority access to the Sterling Route van, preferred daily rates, and a concierge who plans the trip before you ask.
          </p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850]">The Alternative</p>
          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed font-serif">
            <p>
              You call on a Tuesday. The dates you want — the Masters weekend, the Seminole trip, the three-day corporate run down to Homestead — are already gone. Someone booked six weeks ago. You didn&apos;t know it was possible to book six weeks ago. Now you&apos;re calling around, comparing rates on vehicles you&apos;ve never seen, hoping the photos are recent.
            </p>
            <p>
              When the van does show up, the cabin smells like someone else&apos;s trip. The cooler is empty. The Bluetooth is paired to a stranger&apos;s phone. There&apos;s no one to call, and the person who took your deposit is unavailable until Monday. You told your clients it would be seamless. It isn&apos;t.
            </p>
            <p>
              That&apos;s the market rate experience. You pay top dollar and receive average outcomes. Sterling Reserve exists because some clients have no interest in that arrangement. If you travel three or four times a year and the quality of the vehicle matters to your business, your relationships, or simply your standards — there is a better structure.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT MEMBERS GET */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">What Reserve Members Get</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">Everything in Place Before You Ask</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#c9a96e]/10">
            {[
              {
                title: 'Priority Calendar',
                body: 'Members see open dates 60 days before public booking opens. Your dates are secured before the market touches them.',
              },
              {
                title: 'Preferred Daily Rate',
                body: '15–20% below rack rate depending on your tier. On a four-day trip, that covers your membership for the month.',
              },
              {
                title: 'The Van, Your Way',
                body: 'Pre-set cabin temperature, stocked cooler, your playlist queued before you board. First impressions matter. We know that.',
              },
              {
                title: 'Dedicated Concierge',
                body: 'One point of contact. Text them directly. They handle the logistics so you handle the relationship.',
              },
              {
                title: 'Trip Design Included',
                body: 'Tee times, hotel blocks, game-day logistics. All handled. You tell them where you want to end up. They build the path.',
              },
              {
                title: 'Sterling Reserve Card',
                body: 'Physical card. Access to member pricing on all add-ons — catering packages, equipment transport, premium concierge upgrades.',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-[#0a0a0a] p-8 md:p-10">
                <div className="w-8 h-px bg-[#c9a96e] mb-6" />
                <h3 className="font-serif text-xl text-[#f0e6d0] mb-3">{benefit.title}</h3>
                <p className="text-[#5f5850] text-sm leading-relaxed">{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE TIERS */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Membership Tiers</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">Three Levels. One Standard.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* RESERVE */}
            <div className="border border-[#433d38] bg-[#0f0e0c] p-8 flex flex-col">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-3">Reserve</p>
                <div className="mb-6">
                  <span className="font-serif text-4xl text-[#f0e6d0]">$295</span>
                  <span className="text-[#5f5850] text-sm">/month</span>
                </div>
                <div className="w-12 h-px bg-[#c9a96e]/40 mb-6" />
              </div>
              <ul className="space-y-3 text-sm text-[#a09890] flex-1">
                {[
                  '60-day priority booking window',
                  '15% off daily rate',
                  '150 mi/day included — $0.45/mi overage',
                  'Email concierge',
                  '2 complimentary trip planning sessions/year',
                  'Founding member rate — locked for life if joined in Year 1',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#c9a96e]/60 mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[#433d38]/50">
                <Link
                  href="/contact?type=reserve"
                  className="block w-full text-center border border-[#c9a96e]/50 text-[#c9a96e] text-xs tracking-[0.2em] uppercase py-3 hover:bg-[#c9a96e]/10 transition-colors"
                >
                  Apply — Reserve
                </Link>
              </div>
            </div>

            {/* RESERVE GOLD */}
            <div className="border border-[#c9a96e]/50 bg-[#0f0e0c] p-8 flex flex-col relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-[#c9a96e]" />
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Reserve Gold</p>
                <div className="mb-6">
                  <span className="font-serif text-4xl text-[#f0e6d0]">$595</span>
                  <span className="text-[#5f5850] text-sm">/month</span>
                </div>
                <div className="w-12 h-px bg-[#c9a96e] mb-6" />
              </div>
              <ul className="space-y-3 text-sm text-[#a09890] flex-1">
                {[
                  '90-day priority booking window',
                  '18% off daily rate',
                  '200 mi/day included — $0.40/mi overage',
                  'Phone + email concierge',
                  'Unlimited trip planning',
                  'Van pre-stocked on arrival',
                  '1 annual signature trip design — Streamsong, Cabot, TPC, and others',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#c9a96e] mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[#c9a96e]/20">
                <Link
                  href="/contact?type=reserve-gold"
                  className="block w-full text-center bg-[#c9a96e] text-[#0a0a0a] text-xs tracking-[0.2em] uppercase font-medium py-3 hover:bg-[#d4b87a] transition-colors"
                >
                  Apply — Reserve Gold
                </Link>
              </div>
            </div>

            {/* RESERVE BLACK */}
            <div className="border border-[#433d38] bg-[#0a0904] p-8 flex flex-col">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-3">Reserve Black</p>
                <div className="mb-6">
                  <span className="font-serif text-4xl text-[#f0e6d0]">$1,195</span>
                  <span className="text-[#5f5850] text-sm">/month</span>
                </div>
                <div className="w-12 h-px bg-[#c9a96e]/40 mb-6" />
              </div>
              <ul className="space-y-3 text-sm text-[#a09890] flex-1">
                {[
                  'Unlimited advance booking — full calendar access',
                  '22% off daily rate',
                  '250 mi/day included — $0.35/mi overage',
                  '24/7 white-glove concierge',
                  'Unlimited trip planning',
                  'Van pre-stocked to your saved preferences',
                  'Annual signature trip fully designed and booked',
                  'Hoadley Group preferred client access — real estate and construction network',
                  'Founding Black members: first right of refusal on second van',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#c9a96e]/60 mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[#433d38]/50">
                <Link
                  href="/contact?type=reserve-black"
                  className="block w-full text-center border border-[#c9a96e]/50 text-[#c9a96e] text-xs tracking-[0.2em] uppercase py-3 hover:bg-[#c9a96e]/10 transition-colors"
                >
                  Apply — Reserve Black
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEE SCHEDULE */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Fee Schedule</p>
            <h2 className="font-serif text-4xl text-[#f0e6d0]">All Members &amp; Public Renters</h2>
            <p className="text-[#5f5850] text-sm mt-3">These fees apply uniformly. No member waivers on operational charges.</p>
          </div>

          <div className="border border-[#433d38]/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#c9a96e]/20">
                  <th className="px-6 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Fee</th>
                  <th className="px-6 py-4 text-right text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#433d38]/30">
                {[
                  {
                    fee: 'Black/grey tank dump',
                    amount: "Renter's responsibility. Non-compliance: $125",
                  },
                  {
                    fee: 'Cleaning fee',
                    amount: '$175 if returned below standard',
                  },
                  {
                    fee: 'Mileage overage — public',
                    amount: '100 mi/day included, $0.50/mi over',
                  },
                  {
                    fee: 'Mileage overage — Reserve tier',
                    amount: '150 mi/day included, $0.45/mi over',
                  },
                  {
                    fee: 'Mileage overage — Reserve Gold',
                    amount: '200 mi/day included, $0.40/mi over',
                  },
                  {
                    fee: 'Mileage overage — Reserve Black',
                    amount: '250 mi/day included, $0.35/mi over',
                  },
                  {
                    fee: 'Fuel',
                    amount: 'Return full. Failure: fuel cost + $35 service fee',
                  },
                  {
                    fee: 'Late return',
                    amount: '$95/hour past scheduled return',
                  },
                  {
                    fee: 'Security deposit',
                    amount: '$500 held at booking — released within 72 hrs of clean return',
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#c9a96e]/3 transition-colors">
                    <td className="px-6 py-4 text-[#a09890]">{row.fee}</td>
                    <td className="px-6 py-4 text-right text-[#f0e6d0]">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PLAIN ENGLISH TERMS */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">The Terms, Plain English</p>
          <div className="border-l-2 border-[#c9a96e]/30 pl-8">
            <p className="text-[#a09890] leading-relaxed text-lg font-serif">
              Membership is month-to-month. Cancel anytime with 30 days notice. No cancellation fee. Membership rate is locked at the founding tier rate if you join in Year 1 and maintain your membership continuously. Rates adjust annually for new members only. If you cancel and rejoin, you re-enter at the current rate.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/rental-terms"
              className="text-sm text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors tracking-wide"
            >
              Read the full rental terms →
            </Link>
          </div>
        </div>
      </section>

      {/* APPLICATION CTA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#5f5850] mb-6">By Application</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6 leading-tight">
            Reserve Membership Is<br />by Application
          </h2>
          <p className="text-[#5f5850] text-base leading-relaxed mb-12 max-w-lg mx-auto">
            We keep the group small by design. There is no automated sign-up. Every application is reviewed and every member is known.
          </p>
          <Link
            href="/contact?type=reserve"
            className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-[0.2em] uppercase font-medium px-12 py-4 hover:bg-[#d4b87a] transition-colors duration-200"
          >
            Apply for Reserve Access
          </Link>
          <p className="mt-8 text-sm text-[#5f5850]">
            Questions? Call or text directly.
          </p>
        </div>
      </section>

    </div>
  )
}
