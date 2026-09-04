const spokes = [
  {
    number: '01',
    title: 'Distribution Platforms',
    desc: 'Airbnb, VRBO, Booking.com, Expedia, TripAdvisor, Google Vacation Rentals — visible everywhere travelers search.',
  },
  {
    number: '02',
    title: 'Direct Booking Engine',
    desc: 'Your own booking website, email funnels, and guest capture system — commission-free revenue you control.',
  },
  {
    number: '03',
    title: 'Dynamic Pricing',
    desc: 'Data-driven pricing that adjusts in real-time to demand, seasonality, events, and competitor behavior.',
  },
  {
    number: '04',
    title: 'Automation & Systems',
    desc: 'Guest messaging, cleaning, pricing, and retention — all running on autopilot in under 2 hours/property/week.',
  },
  {
    number: '05',
    title: 'Content & Social',
    desc: 'TikTok, Instagram, YouTube, Pinterest, Facebook — a content engine that drives discovery and bookings.',
  },
  {
    number: '06',
    title: 'Creator Network',
    desc: 'Influencers and travel creators who promote your property to their audiences in exchange for stays.',
  },
  {
    number: '07',
    title: 'Guest Network',
    desc: 'Repeat visitors, referrers, and brand ambassadors who fill your calendar and sell for you.',
  },
  {
    number: '08',
    title: 'Product Placement',
    desc: 'B2B partnerships, local business sponsors, and shoppable stays that turn your property into a revenue platform.',
  },
  {
    number: '09',
    title: 'Curated Experiences',
    desc: 'Personal chefs, wine tours, boat charters — premium experiences you monetize through commissions and upsells.',
  },
  {
    number: '10',
    title: 'The Barefoot Advantage',
    desc: 'Build long-term wealth through property ownership in premium Florida STR markets with Barefoot Realty & Investments.',
  },
]

export default function HubAndSpoke() {
  return (
    <section id="program" aria-label="The Hub-and-Spoke Revenue System" className="py-14 sm:py-20 lg:py-28 bg-[var(--sf-cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            The Framework
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--sf-navy)] mt-4 mb-6">
            The Hub-and-Spoke
            <br />
            <span className="sf-gold-gradient">Revenue System</span>
          </h2>
          <p className="text-lg text-[var(--sf-navy)]/60 leading-relaxed">
            Your property is the hub. Every booking channel, marketing system, and
            guest touchpoint is a spoke. More spokes = more demand = higher Revenue
            Per Night. Most hosts have 1-2 spokes. We build all 10.
          </p>
        </div>

        {/* The Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[var(--sf-navy)]/5 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-[var(--sf-navy)] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Without the System
            </h3>
            <ul className="space-y-3 text-sm text-[var(--sf-navy)]/60">
              <li className="flex gap-2"><span className="text-red-400 mt-0.5">&#x2717;</span> Relying on Airbnb alone — 15-20% commission on every booking</li>
              <li className="flex gap-2"><span className="text-red-400 mt-0.5">&#x2717;</span> Setting prices by gut feel — leaving $5,000-$15,000/year on the table</li>
              <li className="flex gap-2"><span className="text-red-400 mt-0.5">&#x2717;</span> Managing everything manually — 4+ hours/property/day</li>
              <li className="flex gap-2"><span className="text-red-400 mt-0.5">&#x2717;</span> Guests book once and disappear — zero retention system</li>
              <li className="flex gap-2"><span className="text-red-400 mt-0.5">&#x2717;</span> No content, no brand, no direct traffic — invisible online</li>
            </ul>
          </div>
          <div className="bg-[var(--sf-gold)]/5 rounded-2xl p-8 border border-[var(--sf-gold)]/20">
            <h3 className="text-lg font-semibold text-[var(--sf-navy)] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--sf-gold)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              With SpokeBnB
            </h3>
            <ul className="space-y-3 text-sm text-[var(--sf-navy)]/60">
              <li className="flex gap-2"><span className="text-[var(--sf-gold)] mt-0.5">&#x2713;</span> 10 spokes — distribution, direct, content, creators, guests, and more</li>
              <li className="flex gap-2"><span className="text-[var(--sf-gold)] mt-0.5">&#x2713;</span> Dynamic pricing capturing maximum revenue from every night</li>
              <li className="flex gap-2"><span className="text-[var(--sf-gold)] mt-0.5">&#x2713;</span> Operations automated — under 2 hours/property/week</li>
              <li className="flex gap-2"><span className="text-[var(--sf-gold)] mt-0.5">&#x2713;</span> 30-40% of bookings coming direct, commission-free</li>
              <li className="flex gap-2"><span className="text-[var(--sf-gold)] mt-0.5">&#x2713;</span> A brand and content engine that compounds over time</li>
            </ul>
          </div>
        </div>

        {/* 10 Spokes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {spokes.map((spoke) => (
            <div
              key={spoke.number}
              className="group bg-white rounded-xl p-6 border border-[var(--sf-navy)]/5 sf-card-hover cursor-default"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[var(--sf-gold)]/30 font-[var(--font-display)]">
                  {spoke.number}
                </span>
                <div>
                  <h4 className="font-semibold text-[var(--sf-navy)] mb-1 group-hover:text-[var(--sf-gold)] transition-colors">
                    {spoke.title}
                  </h4>
                  <p className="text-sm text-[var(--sf-navy)]/50 leading-relaxed">{spoke.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
