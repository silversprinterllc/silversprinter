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
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">By Application · Palm Beach County</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#f0e6d0] leading-tight mb-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* RESERVE */}
            <div className="border border-[#433d38] bg-[#0f0e0c] p-8 flex flex-col">
              <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-3">For the intentional traveler</p>
              <div className="mb-2">
                <span className="font-serif text-4xl text-[#f0e6d0]">$499</span>
                <span className="text-[#5f5850] text-sm">/month</span>
              </div>
              <p className="text-xs text-[#5f5850] mb-6">$5,388/year</p>
              <div className="w-12 h-px bg-[#c9a96e]/40 mb-8" />

              <div className="space-y-6 flex-1">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Included Every Month</p>
                  <ul className="space-y-2 text-sm text-[#a09890]">
                    {[
                      '1 included rental day (12 per year)',
                      '100 miles per included rental day',
                      'Unused days roll forward; expire Dec 31',
                      '60-day advance booking window',
                      'Email concierge — 24-hr response',
                      'Trip planning starter kit: destination guides, packing lists, course recommendations',
                      'Sterling Reserve card (physical, shipped)',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#c9a96e]/60 mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#433d38]/50 pt-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Additional Days</p>
                  <ul className="space-y-2 text-sm text-[#a09890]">
                    {[
                      '$796/day (20% off $995 rack rate)',
                      '100 miles/day included',
                      '$0.50/mile overage',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#c9a96e]/60 mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#433d38]/50 pt-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Expectations</p>
                  <ul className="space-y-2 text-sm text-[#a09890]">
                    {[
                      '48-hour minimum advance booking notice',
                      'Insurance through Roamly required on every rental',
                      'Return van in clean condition',
                      'Tanks dumped at return — no exceptions',
                      'Fuel returned full',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#c9a96e]/60 mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#433d38]/50 pt-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Not Permitted</p>
                  <ul className="space-y-2 text-sm text-[#5f5850]">
                    {[
                      'Sharing membership or included days with non-members',
                      'Selling or transferring included days',
                      'Stacking included-day rate with promotional offers',
                      'Commercial passenger transport (rideshare, charter, etc.)',
                      'Subletting the van in any form',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#433d38] mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#433d38]/50">
                <Link
                  href="/contact?type=reserve"
                  className="block w-full text-center border border-[#c9a96e]/50 text-[#c9a96e] text-xs tracking-[0.2em] uppercase py-3 hover:bg-[#c9a96e]/10 transition-colors"
                >
                  Apply — Reserve
                </Link>
              </div>
            </div>

            {/* GOLD */}
            <div className="border border-[#c9a96e]/50 bg-[#0f0e0c] p-8 flex flex-col relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-[#c9a96e]" />
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">For the group that goes regularly</p>
              <div className="mb-2">
                <span className="font-serif text-4xl text-[#f0e6d0]">$999</span>
                <span className="text-[#5f5850] text-sm">/month</span>
              </div>
              <p className="text-xs text-[#5f5850] mb-6">$10,788/year</p>
              <div className="w-12 h-px bg-[#c9a96e] mb-8" />

              <div className="space-y-6 flex-1">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Included Every Month</p>
                  <ul className="space-y-2 text-sm text-[#a09890]">
                    {[
                      '2 included rental days (24 per year)',
                      '150 miles per included rental day',
                      'Unused days roll forward; expire Dec 31',
                      '90-day advance booking window',
                      'Phone + email concierge — 4-hr response',
                      '2 full trip designs per year (tee times, hotel blocks, dinner reservations, full logistics)',
                      'Van pre-stocked on arrival: ice, water, your preferred beverages (cost + $25 setup)',
                      'Sterling Reserve Gold card',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#c9a96e] mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#c9a96e]/20 pt-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Additional Days</p>
                  <ul className="space-y-2 text-sm text-[#a09890]">
                    {[
                      '$746/day (25% off rack)',
                      '150 miles/day included',
                      '$0.45/mile overage',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#c9a96e] mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#c9a96e]/20 pt-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Expectations</p>
                  <ul className="space-y-2 text-sm text-[#a09890]">
                    {[
                      '24-hour advance booking notice minimum',
                      'Insurance required per terms',
                      'Van returned clean, tanks dumped, fuel full',
                      'Trip designs requested minimum 7 days before trip',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#c9a96e] mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#c9a96e]/20 pt-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Not Permitted</p>
                  <ul className="space-y-2 text-sm text-[#5f5850]">
                    {[
                      'All Reserve restrictions apply',
                      'Cannot apply pre-stocked setup fee to third parties',
                      'Concierge services are for member\'s trips only — not resale',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#433d38] mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#c9a96e]/20">
                <Link
                  href="/contact?type=reserve-gold"
                  className="block w-full text-center bg-[#c9a96e] text-[#0a0a0a] text-xs tracking-[0.2em] uppercase font-medium py-3 hover:bg-[#d4b87a] transition-colors"
                >
                  Apply — Gold
                </Link>
              </div>
            </div>

            {/* BLACK */}
            <div className="border border-[#433d38] bg-[#0a0904] p-8 flex flex-col">
              <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-3">For those who move differently</p>
              <div className="mb-2">
                <span className="font-serif text-4xl text-[#f0e6d0]">$1,495</span>
                <span className="text-[#5f5850] text-sm">/month</span>
              </div>
              <p className="text-xs text-[#5f5850] mb-6">$16,140/year</p>
              <div className="w-12 h-px bg-[#c9a96e]/40 mb-8" />

              <div className="space-y-6 flex-1">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Included Every Month</p>
                  <ul className="space-y-2 text-sm text-[#a09890]">
                    {[
                      '3 included rental days (36 per year)',
                      '200 miles per included rental day',
                      'Unused days roll forward; expire Dec 31',
                      'Full calendar access — no advance window restriction',
                      '24/7 white-glove concierge (direct text line, same-day response)',
                      'Unlimited trip designs — tee times, hotels, site tours, investor logistics, whatever it takes',
                      'Van pre-stocked to your saved preference profile on every rental (no setup fee)',
                      '1 annual signature trip fully designed + arranged: Streamsong, Cabot Citrus Farms, TPC Sawgrass, Innisbrook, Pinehurst — or yours',
                      'Hoadley Group preferred client access — real estate showings, construction site tours, investor transport coordination',
                      'First right of refusal on second van when added to fleet',
                      'Sterling Reserve Black card',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#c9a96e]/60 mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#433d38]/50 pt-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Additional Days</p>
                  <ul className="space-y-2 text-sm text-[#a09890]">
                    {[
                      '$697/day (30% off rack)',
                      '200 miles/day included',
                      '$0.40/mile overage',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#c9a96e]/60 mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#433d38]/50 pt-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Expectations</p>
                  <ul className="space-y-2 text-sm text-[#a09890]">
                    {[
                      'Insurance required per terms (same as all tiers)',
                      'Van returned clean, tanks dumped, fuel full — no exceptions at any tier',
                      'Preference profile updated annually or on request',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#c9a96e]/60 mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#433d38]/50 pt-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Not Permitted</p>
                  <ul className="space-y-2 text-sm text-[#5f5850]">
                    {[
                      'All Reserve and Gold restrictions apply',
                      'Hoadley Group preferred access is for member\'s business use only — not transferable to third parties',
                      'Signature trip design is for primary member\'s group — not a commercial planning service',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#433d38] mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#433d38]/50">
                <Link
                  href="/contact?type=reserve-black"
                  className="block w-full text-center border border-[#c9a96e]/50 text-[#c9a96e] text-xs tracking-[0.2em] uppercase py-3 hover:bg-[#c9a96e]/10 transition-colors"
                >
                  Apply — Black
                </Link>
              </div>
            </div>

          </div>
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

          <div className="border border-[#433d38]/50 overflow-hidden">
            <table className="w-full text-sm">
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
                  { item: 'Smoking inside', fee: '$350', notes: 'Strict. No exceptions.' },
                  { item: 'Fuel — failure to refill', fee: 'Fuel cost + $35', notes: 'Diesel. Return full.' },
                  { item: 'Mileage overage', fee: 'Per tier (see above)', notes: 'Billed post-return' },
                  { item: 'Late return', fee: '$95/hour', notes: 'After 3 hours: additional day at rack rate' },
                  { item: 'Security deposit', fee: '$500 held at booking', notes: 'Released within 72 hrs of clean return' },
                  { item: 'Unauthorized pet', fee: '$250', notes: 'Pets require prior written approval' },
                  { item: 'Additional driver', fee: '$0 (approved in advance)', notes: 'Must be listed before departure' },
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
