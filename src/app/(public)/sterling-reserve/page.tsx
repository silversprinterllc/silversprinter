import Link from 'next/link'
import type { Metadata } from 'next'
import { ReservePricingToggle } from '@/components/marketing/ReservePricingToggle'

export const metadata: Metadata = {
  title: 'Sterling Reserve Membership — Sterling Route',
  description: 'Priority access, preferred rates, and a dedicated concierge. Sterling Reserve is a private membership for travelers who plan ahead and expect more.',
}

export default function SterlingReservePage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HERO */}
      <section className="relative py-16 md:py-32 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">By Application · Palm Beach County</p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#f0e6d0] leading-tight mb-8">
            The Van Is Always Ready.<br />
            <span className="text-[#c9a96e]">The Question Is Whether You Are.</span>
          </h1>
          <p className="text-lg text-[#a09890] leading-relaxed max-w-2xl mb-6">
            Sterling Reserve is a private membership that gives you priority access to South Florida&apos;s finest self-drive van — at preferred rates, with a concierge who handles the details you shouldn&apos;t have to.
          </p>
          <p className="text-sm text-[#5f5850] tracking-wide">Three tiers. Limited availability. Founding member rates locked for life.</p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850]">The Alternative</p>
          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed font-serif">
            <p>
              You call on a Tuesday for a 10-person vehicle. The golf trip is in 8 days — Streamsong, four guys, two nights. Every operator you reach says the same thing: unavailable, not in that class, or someone booked it six weeks ago. You didn&apos;t know the calendar opened six weeks ago. Nobody told you. Now you&apos;re renting two Suburbans and trying to explain to your clients why the plan changed.
            </p>
            <p>
              When you do find something at the last minute, the cabin smells like someone else&apos;s weekend. The cooler is empty. There&apos;s a stranger&apos;s travel mug still in the cup holder. The photos on the listing were from three years ago. You paid top dollar and received something below average — and there&apos;s no one to call because the person who took your deposit doesn&apos;t work weekends.
            </p>
            <p>
              You almost had the dates. They were available on Sunday. You decided to wait until Monday to confirm. Monday morning: gone. Someone else moved faster. This is how it works when you have no priority, no relationship, and no access. Sterling Reserve is a different structure. If you move three or four times a year and the quality of the vehicle reflects on you and your business, there&apos;s a better arrangement.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT RESERVE MEMBERSHIP IS */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">What Reserve Membership Is</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6">Everything in Place Before You Ask</h2>
            <p className="text-[#a09890] text-lg leading-relaxed max-w-2xl">
              A membership that gives you access before the calendar opens, rates below what anyone else pays, and a concierge who&apos;s already thinking about your next trip.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#c9a96e]/15">
            {[
              {
                title: 'Priority Calendar',
                body: 'See open dates before public booking opens. Book first. Your preferred weekends are secured before the market touches them.',
              },
              {
                title: 'Preferred Daily Rate',
                body: '20–30% below rack rate, depending on tier. Rate locked at founding-member level for those who join in Year 1.',
              },
              {
                title: 'Included Rental Days',
                body: 'Every month comes with included days already in your account. Unused days roll forward within the calendar year.',
              },
              {
                title: 'Trip Concierge',
                body: 'One contact. Tee times, hotel blocks, game-day logistics, investor tours. You tell them where you want to end up — they build the path.',
              },
              {
                title: 'Van Pre-Set',
                body: 'Cabin temp, cooler stocked, your preferences on file. The van is ready before you arrive. First impressions matter.',
              },
              {
                title: 'Sterling Reserve Card',
                body: 'Physical card. Access to member pricing, priority line, and Hoadley Group preferred network.',
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

      {/* THREE TIER CARDS */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Membership Tiers</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">Three Levels. One Standard.</h2>
          </div>

          <ReservePricingToggle />
        </div>
      </section>

      {/* ROLLOVER POLICY */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">Rollover Policy</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-8">What Happens to Days You Don&apos;t Use</h2>
          <div className="space-y-6 text-[#a09890] leading-relaxed">
            <p>
              Unused included rental days roll forward each month and accumulate throughout the calendar year. They do not expire mid-year. On December 31st of each year, unused included days from that calendar year expire without cash value or credit.
            </p>
            <p>
              Plan accordingly. Use them for a long weekend in March, a golf trip in September, a family run to the Keys in November. They&apos;re yours — until they&apos;re not.
            </p>
          </div>
          <div className="mt-8 p-6 border border-[#433d38]/50 bg-[#0f0e0c]">
            <p className="text-sm text-[#5f5850] leading-relaxed">
              <span className="text-[#c9a96e]">Note:</span> Included days have no cash value. They cannot be sold, transferred, gifted, or redeemed for credit.
            </p>
          </div>
        </div>
      </section>

      {/* FEE SCHEDULE */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Fee Schedule</p>
            <h2 className="font-serif text-4xl text-[#f0e6d0] mb-3">Applies to All Members and Public Renters</h2>
            <p className="text-[#5f5850] text-sm">These fees apply uniformly. No member waivers on operational charges.</p>
          </div>

          <div className="overflow-x-auto border border-[#433d38]/50">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="bg-[#c9a96e]/10 border-b border-[#c9a96e]/30">
                  <th className="px-6 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Item</th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Fee</th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#433d38]/30">
                {[
                  { item: 'Black/grey tank dump', fee: "Renter's responsibility", notes: 'Non-compliance: $125. No exceptions. No member waivers.' },
                  { item: 'Cleaning fee', fee: '$175', notes: 'Heavy soiling, food mess, stains. Light cleaning expected.' },
                  { item: 'Smoking inside', fee: '$500', notes: 'Zero tolerance. No exceptions, ever.' },
                  { item: 'Fuel — failure to refill', fee: 'Fuel cost + $35', notes: 'Diesel. Return full.' },
                  { item: 'Mileage overage', fee: 'Per tier (see above)', notes: 'Billed post-return' },
                  { item: 'Late return', fee: '$95/hour', notes: 'After 3 hours: additional day at rack rate' },
                  { item: 'Security deposit', fee: '$1,500 held at booking', notes: 'Released within 72 hrs of clean return' },
                  { item: 'Pet found in vehicle', fee: '$500', notes: 'NO PETS. Zero exceptions. $500 fee if evidence of pet found.' },
                  { item: 'Additional driver — spouse/domestic partner', fee: 'FREE', notes: 'Must be listed before departure' },
                  { item: 'Additional driver — all others', fee: '$50/driver', notes: 'Must be listed before departure. No additions after departure.' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#c9a96e]/3 transition-colors">
                    <td className="px-6 py-4 text-[#f0e6d0]">{row.item}</td>
                    <td className="px-6 py-4 text-[#c9a96e]">{row.fee}</td>
                    <td className="px-6 py-4 text-[#5f5850] hidden md:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PLAIN ENGLISH MEMBERSHIP TERMS */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">The Terms, Straight</p>
          <div className="space-y-5">
            {[
              'Membership is month-to-month. Cancel with 30 days written notice. No cancellation fee.',
              'Founding member rates are locked for life if you join in Year 1 and maintain membership without lapse. A lapse of 60+ days resets to current pricing.',
              'Rates adjust annually for new members. Existing members are protected.',
              'Membership is non-transferable. One van, one member, one account.',
              'Sterling Route reserves the right to terminate membership for violation of rental terms or membership policy, with 30 days notice and prorated refund — except for violations involving damage, fraud, or policy abuse.',
            ].map((term, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-[#c9a96e]/50 mt-1 shrink-0">—</span>
                <p className="text-[#a09890] leading-relaxed">{term}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex gap-6">
            <Link href="/sterling-reserve/tos" className="text-sm text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors tracking-wide">
              Read the full membership terms →
            </Link>
            <Link href="/rental-terms" className="text-sm text-[#5f5850] hover:text-[#a09890] transition-colors tracking-wide">
              General rental terms →
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
            We keep the group small — not because the math demands it, but because the experience does. Every application is reviewed. Every member is known.
          </p>
          <Link
            href="/contact?type=reserve"
            className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-[0.2em] uppercase font-medium px-12 py-4 hover:bg-[#d4b87a] transition-colors duration-200"
          >
            Apply for Reserve Access
          </Link>
          <p className="mt-8 text-sm text-[#5f5850]">
            Questions? Call or text. We answer.
          </p>
        </div>
      </section>

    </div>
  )
}
