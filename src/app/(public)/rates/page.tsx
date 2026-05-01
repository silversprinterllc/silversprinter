import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rates — Sterling Route',
  description: 'Transparent daily rates, member pricing, add-on fees, and the complete fee schedule for Sterling Route van rentals. One van. Flat daily rates. No surprises.',
}

export default function RatesPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HEADER */}
      <section className="py-16 md:py-32 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">Transparent Pricing</p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#f0e6d0] leading-tight mb-8">
            What It Costs
          </h1>
          <p className="text-lg text-[#a09890] leading-relaxed max-w-2xl">
            One van. Flat daily rates. No fuel surcharges, no blackout fees, no surprises. What you see is what you pay.
          </p>
        </div>
      </section>

      {/* SECTION 1: PUBLIC DAILY RATES */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Section 1</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0]">Public Daily Rates</h2>
          </div>

          <div className="overflow-x-auto border border-[#433d38]/50 mb-6">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="bg-[#c9a96e]/10 border-b border-[#c9a96e]/30">
                  <th className="px-6 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Day Type</th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Daily Rate</th>
                  <th className="px-6 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal hidden md:table-cell">Typical Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#433d38]/30">
                {[
                  { type: 'Standard', rate: '$900', days: 'Monday – Thursday' },
                  { type: 'Weekend', rate: '$995', days: 'Friday, Saturday, Sunday' },
                  { type: 'Premium / Holiday', rate: '$1,095', days: 'Federal holidays + holiday weekends' },
                  { type: 'Signature Events', rate: '$1,295', days: 'Masters Week, Super Bowl, Memorial Day, July 4th, Labor Day, New Year\'s' },
                ].map((row) => (
                  <tr
                    key={row.type}
                    className={`hover:bg-[#c9a96e]/3 transition-colors${row.type === 'Signature Events' ? ' bg-[#c9a96e]/5 border-l-2 border-[#c9a96e]' : ''}`}
                  >
                    <td className={`px-6 py-4${row.type === 'Signature Events' ? ' text-[#c9a96e] font-medium' : ' text-[#f0e6d0]'}`}>{row.type}</td>
                    <td className={`px-6 py-4 font-medium${row.type === 'Signature Events' ? ' text-[#c9a96e]' : ' text-[#c9a96e]'}`}>{row.rate}</td>
                    <td className="px-6 py-4 text-[#5f5850] hidden md:table-cell">{row.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 text-sm text-[#5f5850]">
            <p>Minimum 1-day rental. Minimum charge $900. Rates are per 24-hour rental period.</p>
            <p>Public included mileage: <span className="text-[#a09890]">150 miles/day.</span> Overage: <span className="text-[#a09890]">$0.50/mile.</span></p>
            <p className="text-[#5f5850]/70 text-xs">Reference: WPB → Miami RT ≈ 140 mi · WPB → Streamsong RT ≈ 240 mi · WPB → Tampa RT ≈ 280 mi</p>
            <p>Minimum 72-hour advance booking notice required for public bookings.</p>
            <p className="text-[#a09890]">
              Signature event dates are released seasonally. Road Club members have priority access via round-robin.
            </p>
            <p className="text-[#a09890]">
              Multi-day rentals of 5+ consecutive days: 10% off total rental cost. Contact us to apply.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: ROAD CLUB MEMBER RATES */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Section 2</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0]">Sterling Road Club Member Rates</h2>
          </div>

          <div className="border border-[#c9a96e]/30 bg-[#0f0e0c] p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-2">Signature Week</p>
                <p className="font-serif text-3xl text-[#f0e6d0] mb-1">Included</p>
                <p className="text-xs text-[#433d38]">7 days · locked at enrollment · no additional charge</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-2">Day-Credit Rate</p>
                <p className="font-serif text-3xl text-[#f0e6d0] mb-1">$750<span className="text-lg text-[#5f5850]">/day</span></p>
                <p className="text-xs text-[#433d38]">flat rate · any date · 25 credits included</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-2">Additional Days</p>
                <p className="font-serif text-3xl text-[#f0e6d0] mb-1">$750<span className="text-lg text-[#5f5850]">/day</span></p>
                <p className="text-xs text-[#433d38]">beyond your 25 credits · same member rate</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#5f5850]">
            Road Club day-credits are valid on any date, including weekends. Signature event dates available
            to members via round-robin priority system.{' '}
            <Link href="/sterling-reserve" className="text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors">
              Learn about the Road Club →
            </Link>
          </p>
        </div>
      </section>

      {/* SECTION 3: ADD-ON PRICING */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Section 3</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0]">Add-On Pricing</h2>
          </div>

          <div className="overflow-x-auto border border-[#433d38]/50 mb-6">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="bg-[#c9a96e]/10 border-b border-[#c9a96e]/30">
                  <th className="px-6 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Add-On</th>
                  <th className="px-6 py-4 text-right text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Public Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#433d38]/30">
                {[
                  { addon: 'Stocked Cooler', price: '$65' },
                  { addon: 'Golf Trip Setup', price: '$45' },
                  { addon: 'Tailgate Package', price: '$55' },
                  { addon: 'Champagne Service', price: '$75' },
                  { addon: 'Premium Snack Board', price: '$85' },
                  { addon: 'Floral Arrangement', price: '$60' },
                ].map((row) => (
                  <tr key={row.addon} className="hover:bg-[#c9a96e]/3 transition-colors">
                    <td className="px-6 py-4 text-[#f0e6d0]">{row.addon}</td>
                    <td className="px-6 py-4 text-right text-[#c9a96e]">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 border border-[#433d38]/50 bg-[#0f0e0c] text-sm text-[#5f5850]">
            <p>Road Club members receive add-ons at cost plus a $25 setup fee. Van is pre-configured before every arrival — preferences on file.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEE SCHEDULE */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Section 4</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0]">Fee Schedule</h2>
            <p className="text-[#5f5850] text-sm mt-3">Applies to all members and public renters. No member waivers on operational charges.</p>
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

      {/* SECTION 5: DEPOSIT & PAYMENT */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Section 5</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0]">Deposit &amp; Payment</h2>
          </div>

          <div className="space-y-4">
            {[
              '35% deposit due at booking to hold your dates.',
              'Balance due 48 hours before departure.',
              'Balance charged automatically to the card on file.',
              'Security deposit: $1,500 held at booking, released within 72 hours of clean return.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-[#c9a96e]/50 mt-1 shrink-0">—</span>
                <p className="text-[#a09890] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/insurance"
              className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-[#d4b87a] transition-colors duration-200 text-center"
            >
              Check Availability
            </Link>
            <Link
              href="/sterling-reserve"
              className="inline-block border border-[#c9a96e]/50 text-[#c9a96e] font-sans text-sm tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#c9a96e]/10 transition-colors duration-200 text-center"
            >
              Explore Road Club
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
