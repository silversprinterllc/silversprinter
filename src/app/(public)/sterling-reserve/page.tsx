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
                title: 'Pre-Purchased Day-Credits',
                body: 'You buy a block of days upfront. Those credits sit in your account and you draw them down as you book — one day at a time, a long weekend, a full week. Use them however you want throughout the year.',
              },
              {
                title: 'One Payment. Done.',
                body: 'No monthly billing. No auto-renewals hitting at inconvenient times. One wire or card charge at signup, and the credits are yours. We front-load the relationship. So do you.',
              },
              {
                title: 'Priority Calendar Access',
                body: 'Members see open dates before public booking opens. You lock your weekends before anyone else touches the calendar. Peak dates, holiday weekends, bowl game travel — yours first.',
              },
              {
                title: 'Deeply Discounted Rate',
                body: 'Reserve members pay 50–58% less than rack rate on included days. No negotiating, no promo codes — your member rate is locked at purchase price for the full year.',
              },
              {
                title: 'Van Pre-Set on Arrival',
                body: 'Your preferences are on file. Temperature set, cooler stocked, cabin configured before you arrive. Gold and Black members get this on every booking automatically.',
              },
              {
                title: 'Limited to 8 Members',
                body: 'We cap total membership at 8 across all tiers. This is not a loyalty program with thousands of cardholders. It is a small group with real access to a real vehicle.',
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

      {/* CREDIT POLICY */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">How Credits Work</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-8">Your Days. Your Schedule.</h2>
          <div className="space-y-6 text-[#a09890] leading-relaxed">
            <p>
              When you join, your day-credits are loaded immediately. You can book them in any configuration — a single Tuesday, a three-day long weekend, a full week. There is no required schedule. No "use it by the 15th." Your credits are yours until December 31st.
            </p>
            <p>
              Black members are the exception — your credits roll to the following calendar year. If you buy in November, you are not burning credits during the holidays. You carry them forward.
            </p>
            <p>
              Reserve and Gold credits do not roll. They expire December 31. This is intentional — it keeps the calendar moving, keeps the van available, and keeps the program sustainable for everyone in it. Plan accordingly. A long weekend in March, a golf trip in September, a family run to the Keys before Thanksgiving. The year is longer than it looks.
            </p>
          </div>
          <div className="mt-8 p-6 border border-[#433d38]/50 bg-[#0f0e0c]">
            <p className="text-sm text-[#5f5850] leading-relaxed">
              <span className="text-[#c9a96e]">Important:</span> Day-credits have no cash value. They cannot be sold, transferred, gifted, or redeemed for a refund. Membership fees are non-refundable after purchase.
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
              'Membership is annual and paid in full at signup. No monthly billing. No auto-renewal without your explicit confirmation.',
              'Day-credits are loaded immediately upon payment. They are yours to use any time before December 31 (Black members carry credits to the following year).',
              'Membership fees are non-refundable. Day-credits have no cash value and cannot be transferred, sold, or redeemed.',
              'Membership is non-transferable. One account, one primary member. Additional drivers may be added per standard rental policy.',
              'Founding member pricing is locked for life provided membership is renewed before expiration. A lapse of more than 60 days resets to current rates.',
              'Sterling Route may terminate a membership for material violation of rental terms, with any unused credits forfeited in cases of damage, fraud, or policy abuse.',
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
