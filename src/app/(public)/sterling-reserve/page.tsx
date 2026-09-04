import Link from 'next/link'
import type { Metadata } from 'next'
import { ReservePricingToggle } from '@/components/marketing/ReservePricingToggle'

export const metadata: Metadata = {
  title: 'Sterling Road Club — Sterling Route',
  description: 'Four charter seats. One van. A dedicated week that is yours every year. Sterling Road Club is a private annual membership for those who move on their schedule — not the calendar.',
}

export default function SterlingReservePage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HERO */}
      <section className="relative py-16 md:py-32 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">By Application · Palm Beach County</p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#f0e6d0] leading-tight mb-8">
            Four Seats.<br />
            <span className="text-[#c9a96e]">The Rest Is Public.</span>
          </h1>
          <p className="text-lg text-[#a09890] leading-relaxed max-w-2xl mb-6">
            Sterling Road Club is not a loyalty program. It is a private annual membership — four seats, one van, a dedicated week that is yours every year.
            When the seats are filled, the Club is closed.
          </p>
          <p className="text-sm text-[#5f5850] tracking-wide">$22,500/year · 4 charter seats · founding price locked for life</p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850]">Why This Exists</p>
          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed font-serif">
            <p>
              You call on a Tuesday for a 10-person vehicle. The golf trip is in 8 days — Streamsong, four guys, two nights. Every operator you reach says the same thing: unavailable, not in that class, or someone booked it six weeks ago. You didn&apos;t know the calendar opened six weeks ago. Nobody told you. Now you&apos;re renting two Suburbans and trying to explain to your clients why the plan changed.
            </p>
            <p>
              You almost had the dates. They were available on Sunday. You decided to wait until Monday to confirm. Monday morning: gone. Someone else moved faster. This is how it works when you have no priority, no relationship, and no access.
            </p>
            <p>
              Sterling Road Club is a different structure. Four people who plan ahead, locked in, with a week that cannot be taken from them. If you move three or four times a year and the quality of the vehicle reflects on you, there&apos;s a better arrangement.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT THE CLUB IS */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">What the Club Is</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6">One Seat. One Week. Everything Else Handled.</h2>
            <p className="text-[#a09890] text-lg leading-relaxed max-w-2xl">
              A Road Club seat gives you one locked week per year, 25 flexible day-credits, and priority access to the calendar before anyone else sees it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#c9a96e]/10">
            {[
              {
                title: 'Your Signature Week',
                body: 'Seven consecutive days chosen at enrollment. Locked. Immovable. No public booking can touch them. Plan your golf trip, your family run, your investor tour — twelve months in advance if you want. The van is already yours.',
              },
              {
                title: '25 Day-Credits',
                body: 'Loaded immediately at enrollment. Draw them down throughout the year — a single Thursday, a long weekend, a second trip. $750/day on every credit. Book them any way you want.',
              },
              {
                title: 'Round-Robin Priority',
                body: 'Peak weekends and holiday dates rotate fairly among the four members. Year one goes in enrollment order. Year two reverses. Your Signature Week is never part of the rotation — those dates are always yours.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#0a0a0a] p-8 md:p-10">
                <div className="w-8 h-px bg-[#c9a96e] mb-6" />
                <h3 className="font-serif text-xl text-[#f0e6d0] mb-3">{item.title}</h3>
                <p className="text-[#5f5850] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE OFFER CARD */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">The Membership</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">Everything in One Seat.</h2>
          </div>
          <ReservePricingToggle />
        </div>
      </section>

      {/* THE GROWTH STORY */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">Where This Goes</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-8">Four Seats. One Van. Then Two.</h2>
          <div className="space-y-6 text-[#a09890] text-base leading-relaxed">
            <p>
              Four charter seats at $22,500 each is $90,000. That is the down payment on the second van.
            </p>
            <p>
              When the second van arrives, Road Club members get first access to the new seats — before any public announcement, before any waitlist, before anyone else knows the calendar has expanded. Founding members of the first Club have the option to hold a seat in the second Club at the same rate they paid when they joined.
            </p>
            <p>
              This is how it grows — not by franchising, not by cutting corners, but by filling four seats at a time with people who understand what they&apos;re buying.
            </p>
          </div>
        </div>
      </section>

      {/* HOW CREDITS WORK */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">How Credits Work</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-8">Your Days. Your Schedule.</h2>
          <div className="space-y-6 text-[#a09890] leading-relaxed">
            <p>
              When you join, your 25 day-credits are loaded immediately. Book them in any configuration —
              a single Tuesday, a three-day long weekend, back-to-back weeks if you want. There is no required schedule.
              Credits are yours until December 31st.
            </p>
            <p>
              Your Signature Week sits separately. It is not drawn from your credits. It is locked at enrollment and lives on the calendar as a permanent block for your year. Those seven days cost nothing additional — they are the anchor of your membership.
            </p>
            <p>
              Credits do not roll. They expire December 31. This keeps the calendar moving and the Club functioning for everyone in it. A long weekend in March, a golf trip in September, a family run before Thanksgiving — 25 days is more than enough to use well if you plan.
            </p>
          </div>
          <div className="mt-8 p-6 border border-[#433d38]/50 bg-[#0f0e0c]">
            <p className="text-sm text-[#5f5850] leading-relaxed">
              <span className="text-[#c9a96e]">Important:</span> Day-credits have no cash value. They cannot be sold, transferred, gifted, or redeemed for a refund. Seat fees are non-refundable after enrollment. Credits expire December 31 unless otherwise noted in writing.
            </p>
          </div>
        </div>
      </section>

      {/* FEE SCHEDULE */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Fee Schedule</p>
            <h2 className="font-serif text-4xl text-[#f0e6d0] mb-3">Applies to All Renters</h2>
            <p className="text-[#5f5850] text-sm">Operational fees apply uniformly. No member waivers except as noted.</p>
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
                  { item: 'Black/grey tank dump', fee: "Renter's responsibility", notes: 'Non-compliance: $125. No exceptions.' },
                  { item: 'Cleaning fee', fee: '$175', notes: 'Heavy soiling, food mess, stains. Light cleaning expected.' },
                  { item: 'Smoking inside', fee: '$500', notes: 'Zero tolerance. No exceptions, ever.' },
                  { item: 'Fuel — failure to refill', fee: 'Fuel cost + $35', notes: 'Diesel. Return full.' },
                  { item: 'Mileage overage', fee: '$0.55/mile', notes: 'Billed post-return. 150 mi/day included.' },
                  { item: 'Late return', fee: '$95/hour', notes: 'After 3 hours: additional day at rack rate' },
                  { item: 'Security deposit', fee: '$1,500 held at booking', notes: 'Released within 72 hrs of clean return' },
                  { item: 'Pet found in vehicle', fee: '$500', notes: 'NO PETS. Zero exceptions.' },
                  { item: 'Additional driver — spouse/domestic partner', fee: 'FREE', notes: 'Must be listed before departure' },
                  { item: 'Additional driver — all others', fee: '$50/driver', notes: 'Must be listed before departure' },
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

      {/* PLAIN ENGLISH TERMS */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">The Terms, Straight</p>
          <div className="space-y-5">
            {[
              'Membership is annual. Paid in full at enrollment. No monthly billing, no auto-renewal without your explicit confirmation.',
              'Your Signature Week is locked at enrollment. Credits are loaded immediately. Both are available from day one.',
              'Seat fees are non-refundable. Day-credits have no cash value and cannot be transferred, sold, or redeemed.',
              'Membership is non-transferable. One seat, one member. Additional drivers may be added per standard rental policy.',
              'Founding member pricing is locked for life provided the seat is renewed before expiration. A lapse of more than 60 days resets to current rates.',
              'Sterling Route may terminate a seat for material violation of rental terms, with unused credits forfeited in cases of damage, fraud, or policy abuse.',
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

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#5f5850] mb-6">By Application</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6 leading-tight">
            Four Seats.<br />Apply for One.
          </h2>
          <p className="text-[#5f5850] text-base leading-relaxed mb-12 max-w-lg mx-auto">
            Every application is reviewed. Every member is known. We keep it small because the experience demands it.
          </p>
          <Link
            href="/contact?type=road-club"
            className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-[0.2em] uppercase font-medium px-12 py-4 hover:bg-[#d4b87a] transition-colors duration-200"
          >
            Apply for a Seat
          </Link>
          <p className="mt-8 text-sm text-[#5f5850]">
            Questions? Call or text. We answer.
          </p>
        </div>
      </section>

    </div>
  )
}
