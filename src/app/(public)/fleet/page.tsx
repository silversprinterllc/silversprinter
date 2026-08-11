import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Van — MAD Daycruiser D6 | Sterling Route',
  description: 'One vehicle. A Midwestern Automotive Design Daycruiser D6 luxury Sprinter conversion. 10 occupants, private commode, full galley, 32" TV, WiFi. Available by the day in Palm Beach County.',
}

const specs = [
  {
    category: 'Platform',
    detail: 'Mercedes-Benz Sprinter — diesel, built to run.',
  },
  {
    category: 'Conversion',
    detail: 'Midwestern Automotive Design Daycruiser D6 — custom luxury build.',
  },
  {
    category: 'Capacity',
    detail: '10 occupants maximum — driver + 9 passengers. 10 belts. Not one more.',
  },
  {
    category: 'Seating',
    detail: '1 front passenger seat, 4 captain chairs (main cabin), 2 fold-flat benches (rear).',
  },
  {
    category: 'Sleeping',
    detail: 'Rear benches fold flat. Sleeps 2. Overnight runs, no hotel required.',
  },
  {
    category: 'Bathroom',
    detail: 'Private commode and sink — self-contained with black water holding tank.',
  },
  {
    category: 'Galley',
    detail: 'Microwave, mini fridge, and cooler. Real food on real trips.',
  },
  {
    category: 'Entertainment',
    detail: '32" TV, Bluetooth audio, WiFi streaming. All 10 seats.',
  },
  {
    category: 'Charging',
    detail: 'USB-C charging at every seat.',
  },
  {
    category: 'Climate',
    detail: 'Climate control throughout the cabin.',
  },
  {
    category: 'Height',
    detail: "9'6\" — plan bridge and garage clearance. Minimum 10'6\" required.",
  },
  {
    category: 'Fuel',
    detail: 'Diesel only. Return full. Non-compliance: fuel cost + $35.',
  },
]

export default function FleetPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HERO */}
      <section className="py-16 md:py-32 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">The Vehicle</p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f0e6d0] leading-tight mb-8">
            MAD Daycruiser D6.<br />
            <span className="text-[#c9a96e]">One van. The right one.</span>
          </h1>
          <p className="text-lg text-[#a09890] leading-relaxed max-w-2xl mb-6">
            A Midwestern Automotive Design luxury Sprinter conversion — owned, maintained, and driven to the same standard as when the owner&apos;s own family is in the seats.
          </p>
          <p className="text-sm text-[#5f5850]">$900/day · Palm Beach County · 10 occupants maximum</p>
        </div>
      </section>

      {/* THE MACHINE — FULL SPEC */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-12">Full Specification</p>

          <div className="divide-y divide-[#433d38]/40">
            {specs.map((spec) => (
              <div key={spec.category} className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-5">
                <p className="text-xs tracking-[0.2em] uppercase text-[#5f5850] sm:pt-0.5">{spec.category}</p>
                <p className="text-sm text-[#a09890] sm:col-span-2 leading-relaxed">{spec.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE STANDARD */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">The Standard</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-8">Why It&apos;s Different</h2>
          <div className="space-y-6 text-[#a09890] text-base leading-relaxed">
            <p>
              There is one van. No fleet, no rotation, no second unit covering while the first gets serviced. The vehicle you book is the MAD Daycruiser D6 — the same one the owner uses for his own family&apos;s travel.
            </p>
            <p>
              That creates a different level of accountability. The van is cleaned between every rental the way you clean a vehicle before your family gets in it. It is fueled, checked, and configured before you arrive. Every rental.
            </p>
            <p>
              The downside: when the van is booked, it is booked. There is no fallback. If the dates matter, book early. If you want guaranteed access before the calendar opens, apply for the Road Club.
            </p>
          </div>
        </div>
      </section>

      {/* RATES SNAPSHOT */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">Rates</p>
          <div className="divide-y divide-[#433d38]/40">
            {[
              { label: 'Standard daily rate', value: '$900/day' },
              { label: 'Weekend rate (Fri–Sun)', value: '$995/day' },
              { label: 'Premium dates (holidays, events)', value: '$1,095/day' },
              { label: 'Included mileage', value: '150 miles/day' },
              { label: 'Mileage overage', value: '$0.50/mile' },
              { label: 'Security deposit', value: '$1,500 held at booking' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center py-4">
                <span className="text-sm text-[#a09890]">{row.label}</span>
                <span className="text-sm text-[#c9a96e] font-medium">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/rates" className="text-xs text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors tracking-wide">
              Full rate card and fee schedule →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6 leading-tight">
            The Van Is Ready.
          </h2>
          <p className="text-[#5f5850] text-base leading-relaxed mb-12 max-w-lg mx-auto">
            Check availability for your dates. If you move more than a few times a year, ask about the Road Club.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/insurance"
              className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-[0.2em] uppercase font-medium px-12 py-4 hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Check Availability
            </Link>
            <Link
              href="/sterling-reserve"
              className="inline-block border border-[#c9a96e]/50 text-[#c9a96e] font-sans text-sm tracking-[0.2em] uppercase px-12 py-4 hover:bg-[#c9a96e]/10 transition-colors duration-200"
            >
              Road Club
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
