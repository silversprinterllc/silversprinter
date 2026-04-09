'use client'

import { useState } from 'react'

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`}
  >
    <path
      d="M3 6L8 11L13 6"
      stroke="#c9a96e"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#433d38]/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[#f0e6d0] text-base leading-snug group-hover:text-[#c9a96e] transition-colors">
          {question}
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="pb-6 pr-8">
          <div className="text-[#a09890] text-sm leading-relaxed space-y-3">
            {answer}
          </div>
        </div>
      )}
    </div>
  )
}

function FAQSection({ title, items }: { title: string; items: { question: string; answer: React.ReactNode }[] }) {
  return (
    <section className="py-16 border-b border-[#c9a96e]/20">
      <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">{title}</p>
      <div>
        {items.map((item, i) => (
          <FAQItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  )
}

export default function FAQPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HEADER */}
      <div className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Frequently Asked Questions</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6">
            What You Need to Know
          </h1>
          <p className="text-[#5f5850] text-base leading-relaxed max-w-xl">
            Every question answered plainly. If yours isn&apos;t here, call or text — we answer.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">

        <FAQSection
          title="The Van"
          items={[
            {
              question: 'Is this a self-drive rental — no driver included?',
              answer: <p>Correct. You drive. Sterling Route provides the vehicle; you provide the driver. No chauffeur, no livery, no commercial transportation license required. Just you and 9 of your closest behind the wheel of a Mercedes Sprinter.</p>,
            },
            {
              question: 'What kind of license do I need?',
              answer: <p>A standard U.S. driver&apos;s license. No CDL required. You must be 25 or older with a clean driving record — no DUI in the past 7 years, no more than 2 moving violations in the past 3 years.</p>,
            },
            {
              question: 'What\'s the fuel type?',
              answer: <p>Diesel. The Sprinter runs on diesel fuel. Return the tank full — same way you got it. Failure to refuel: actual fuel cost + $35 service charge.</p>,
            },
            {
              question: 'Can the van sleep passengers?',
              answer: <p>Yes. The two rear benches fold flat and sleep 2 comfortably. Ideal for a golf trip where someone wants to stay over at the course rather than drive back.</p>,
            },
            {
              question: 'What\'s the maximum passenger capacity?',
              answer: <p>10 passengers. 2 captain chairs in the front cab, 4 captain chairs in the main cabin, and 2 fold-flat benches in the rear. Do not exceed 10.</p>,
            },
            {
              question: 'What amenities are inside?',
              answer: <p>32&quot; TV, Bluetooth audio, WiFi streaming, microwave, mini fridge, private commode and sink, USB-C charging at every seat, climate control throughout.</p>,
            },
            {
              question: 'What is a "private commode"?',
              answer: <p>A self-contained toilet. It has a black water holding tank. That tank must be dumped by the renter at or before return. This is non-negotiable. Fee for non-compliance: $125. No member waivers.</p>,
            },
          ]}
        />

        <FAQSection
          title="Booking & Availability"
          items={[
            {
              question: 'How far in advance can I book?',
              answer: <p>Public customers book based on live availability — first come, first served. Reserve members get a 60-day window before public. Gold gets 90 days. Black has full calendar access with no restriction.</p>,
            },
            {
              question: 'Is there a minimum advance booking notice?',
              answer: <p>Yes. Public bookings require a minimum of 72 hours advance notice — same-day and next-day bookings are not available for public customers. Sterling Reserve Gold members: 24-hour minimum. Sterling Reserve Black members: same-day booking available subject to availability.</p>,
            },
            {
              question: 'What\'s the minimum rental period?',
              answer: <p>One day (24 hours). Minimum charge $795. No half-days, no hourly rates.</p>,
            },
            {
              question: 'Can I extend my rental while on the road?',
              answer: <p>Subject to availability. Contact us as early as possible. Extensions are not guaranteed and are billed at the applicable daily rate.</p>,
            },
            {
              question: 'What\'s the booking process from start to keys?',
              answer: (
                <ol className="space-y-2 list-none">
                  {[
                    'Insurance — get coverage through Bonzah or RentalCover before proceeding.',
                    'Book online with dates, trip type, add-ons, and contact details.',
                    'Pay 35% deposit.',
                    'Receive rental agreement and insurance verification confirmation.',
                    'Balance auto-charged 48 hours before departure.',
                    'Pick up at confirmed Palm Beach County location.',
                    'Return clean, tanks dumped, fuel full.',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#c9a96e]/60 shrink-0 font-medium">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              ),
            },
            {
              question: 'Where do I pick up the van?',
              answer: <p>Palm Beach County, Florida. Exact address confirmed at booking. We do not currently offer delivery.</p>,
            },
            {
              question: 'Can I take the van out of Florida?',
              answer: <p>Yes — anywhere in the continental United States. No travel outside the contiguous 48 states. No international travel.</p>,
            },
          ]}
        />

        <FAQSection
          title="Insurance"
          items={[
            {
              question: 'Is insurance included in the rental?',
              answer: <p>No. Insurance is the renter&apos;s responsibility and is required before any reservation is confirmed. We recommend Bonzah (bonzah.com) or RentalCover (rentalcover.com) for renter coverage. Both provide instant quotes by date range. Minimum $1,000,000 liability coverage required.</p>,
            },
            {
              question: 'Why do I have to get my own insurance?',
              answer: <p>Because it protects you. A personal auto policy won&apos;t cover a rented vehicle of this class during a commercial rental period. Bonzah and RentalCover issue policies specific to your trip dates and vehicle — it takes about 5 minutes and ensures you&apos;re covered for what&apos;s actually happening.</p>,
            },
            {
              question: 'What if I already have RV or vehicle rental coverage?',
              answer: <p>Contact us before booking. We&apos;ll verify your coverage meets minimum requirements. If it does, you may use it in place of Bonzah or RentalCover.</p>,
            },
            {
              question: 'What does the $1,500 security deposit cover?',
              answer: <p>Minor damage, cleaning fees, dump fees, mileage overage, or any other charges incurred during the rental. It is released within 72 hours of a clean return. Damage beyond $1,500 is billed to the card on file.</p>,
            },
          ]}
        />

        <FAQSection
          title="Sterling Reserve Membership"
          items={[
            {
              question: 'Do unused included days roll over?',
              answer: <p>Yes. Unused included rental days accumulate month to month throughout the calendar year. They expire on December 31st of each calendar year. No extensions, no cash value, no credit.</p>,
            },
            {
              question: 'Can I share my membership with a friend or colleague?',
              answer: <p>No. Membership is non-transferable. The named member must be the primary renter on every booking made under the membership. A guest may drive — but the member must be present and listed.</p>,
            },
            {
              question: 'Can I pause my membership?',
              answer: <p>Not currently. Membership is month-to-month. You may cancel with 30 days written notice. If you rejoin later, your rate will be the current published rate — not your original founding rate.</p>,
            },
            {
              question: 'Can I upgrade or downgrade my tier?',
              answer: <p>Yes. Upgrades take effect immediately (prorated for the current month). Downgrades take effect at the next billing cycle. No fee to change tiers.</p>,
            },
            {
              question: 'What is a "Founding Member" rate?',
              answer: <p>Members who join during Year 1 (the first 12 months Sterling Reserve is offered) lock their monthly rate for life, as long as they maintain membership without a lapse of 60+ days. Founding rates do not increase when we raise prices for new members.</p>,
            },
            {
              question: 'Do members still pay the dump fee and cleaning fee?',
              answer: <p>Yes. Every renter at every tier is responsible for dumping the tanks and returning the van in clean condition. Membership does not waive these fees. There are no exceptions.</p>,
            },
            {
              question: 'What is the Hoadley Group preferred client access (Black tier)?',
              answer: <p>Black members gain access to the Hoadley Group professional network — which includes real estate brokerage, land acquisition, and custom construction services in South Florida. This means priority scheduling for property showings, site tours, and investor transportation coordination. It is a professional benefit, not a personal one.</p>,
            },
            {
              question: 'What does "first right of refusal on second van" mean?',
              answer: <p>When Sterling Route adds a second vehicle to the fleet, Black members get the first opportunity to claim a membership slot before it opens to the public. No obligation — just the option.</p>,
            },
          ]}
        />

        <FAQSection
          title="Fees, Returns & Policies"
          items={[
            {
              question: 'What if I return the van late?',
              answer: <p>$95/hour for up to 3 hours. After 3 hours, the remainder of the day is billed at the full rack rate. This applies to all renters regardless of membership.</p>,
            },
            {
              question: 'What if I damage the van?',
              answer: <p>Your rental insurance is primary. You are responsible for the deductible. Damage beyond your security deposit is billed to the card on file. Sterling Route reserves the right to terminate future bookings pending damage review.</p>,
            },
            {
              question: 'Can I bring a pet?',
              answer: <p>No. There are no pets allowed under any circumstances. Zero exceptions. If evidence of a pet is found in or on the vehicle upon return, a mandatory $500 fee will be charged to the card on file, in addition to any cleaning costs.</p>,
            },
            {
              question: 'Can someone else drive?',
              answer: <p>Yes, if listed before departure. Additional listed drivers must meet all eligibility requirements (25+, valid license, clean record). No adding drivers after departure. Spouse or domestic partner: free. All other additional drivers: $50 per driver, collected before departure.</p>,
            },
            {
              question: 'What\'s the cancellation policy?',
              answer: (
                <div className="space-y-2">
                  {[
                    { timing: '30+ days before departure', outcome: 'Full refund minus $95 processing fee' },
                    { timing: '15–29 days', outcome: '50% of deposit refunded' },
                    { timing: '8–14 days', outcome: 'Deposit forfeited' },
                    { timing: '7 days or fewer', outcome: 'Deposit forfeited; balance still due if charged' },
                    { timing: 'Named tropical storm within 72 hours', outcome: 'Full credit toward future booking' },
                  ].map((row) => (
                    <div key={row.timing} className="flex items-start gap-3">
                      <span className="text-[#c9a96e]/60 shrink-0">—</span>
                      <span><span className="text-[#f0e6d0]">{row.timing}:</span> {row.outcome}</span>
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />

        {/* BOTTOM CTA */}
        <section className="py-16">
          <p className="text-[#5f5850] text-sm mb-6">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:hello@sterlingroute.com"
              className="inline-block border border-[#c9a96e]/50 text-[#c9a96e] font-sans text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#c9a96e]/10 transition-colors text-center"
            >
              Email Us
            </a>
            <a
              href="/contact"
              className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-xs tracking-[0.2em] uppercase font-medium px-8 py-3 hover:bg-[#d4b87a] transition-colors text-center"
            >
              Contact Us
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
