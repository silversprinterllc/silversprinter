const toolCategories = [
  {
    category: 'Property Management',
    tools: [
      { name: 'Hospitable', use: 'PMS for 1-3 units', cost: '$29/mo', affiliate: true },
      { name: 'Hostaway', use: 'PMS for 4+ units', cost: 'Custom', affiliate: true },
      { name: 'OwnerRez', use: 'Direct-booking focused PMS', cost: '$40/mo', affiliate: true },
    ],
  },
  {
    category: 'Dynamic Pricing',
    tools: [
      { name: 'PriceLabs', use: 'AI pricing engine', cost: '$19.99/mo', affiliate: true },
      { name: 'AirDNA', use: 'Market research & data', cost: 'Varies', affiliate: true },
    ],
  },
  {
    category: 'Direct Booking',
    tools: [
      { name: 'Lodgify', use: 'Website + booking engine', cost: '$12-59/mo', affiliate: true },
      { name: 'StayFi', use: 'WiFi guest email capture', cost: '$15/mo', affiliate: true },
      { name: 'Stripe', use: 'Payment processing', cost: '2.9% + $0.30', affiliate: false },
    ],
  },
  {
    category: 'Operations',
    tools: [
      { name: 'Turno', use: 'Cleaning automation', cost: 'Free-$8/mo', affiliate: false },
      { name: 'TouchStay', use: 'Digital guidebooks', cost: '$12.50/mo', affiliate: false },
      { name: 'Rankbreeze', use: 'Listing SEO & rank tracking', cost: '$29/mo', affiliate: false },
    ],
  },
  {
    category: 'Content & Marketing',
    tools: [
      { name: 'Canva', use: 'Design & pins', cost: 'Free/Pro', affiliate: false },
      { name: 'CapCut', use: 'Video editing', cost: 'Free', affiliate: false },
      { name: 'Later/Buffer', use: 'Social scheduling', cost: '$15-25/mo', affiliate: false },
    ],
  },
  {
    category: 'Experiences',
    tools: [
      { name: 'Viator', use: 'Activity affiliate revenue', cost: 'Free (8% commission)', affiliate: true },
      { name: 'Hostfully', use: 'Guidebook + Viator links', cost: '$129/mo', affiliate: true },
    ],
  },
]

export default function ToolStack() {
  return (
    <section id="tools" aria-label="Recommended tools" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Recommended Tech Stack
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-4 mb-4">
            The Tools That
            <br />
            <span className="sf-gold-gradient">Power the System</span>
          </h2>
          <p className="text-[var(--sf-navy)]/60">
            Every tool is battle-tested and recommended based on value, not affiliate
            deals. We show you exactly what to use, how to configure it, and when to
            upgrade.
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {toolCategories.map((cat) => (
            <div
              key={cat.category}
              className="bg-[var(--sf-cream)] rounded-xl p-6 border border-[var(--sf-navy)]/5"
            >
              <h3 className="font-semibold text-[var(--sf-navy)] mb-4 text-sm uppercase tracking-wider">
                {cat.category}
              </h3>
              <div className="space-y-3">
                {cat.tools.map((tool) => (
                  <div key={tool.name} className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-[var(--sf-navy)] text-sm">{tool.name}</span>
                        {tool.affiliate && (
                          <span className="text-[8px] bg-[var(--sf-gold)]/10 text-[var(--sf-gold)] px-1.5 py-0.5 rounded font-semibold uppercase">
                            Partner
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--sf-navy)]/40">{tool.use}</p>
                    </div>
                    <span className="text-xs text-[var(--sf-navy)]/50 whitespace-nowrap shrink-0">
                      {tool.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cost Summary */}
        <div className="mt-10 bg-[var(--sf-navy)]/5 rounded-xl p-6 max-w-2xl mx-auto text-center">
          <p className="text-sm text-[var(--sf-navy)]/60">
            <strong className="text-[var(--sf-navy)]">Typical monthly tool cost: $100-$200/mo</strong>
            {' '}for a 1-5 unit operation. Every dollar spent on tools should return 5-10x in
            increased bookings and saved time. We break down the ROI for each tool in the
            course.
          </p>
        </div>
      </div>
    </section>
  )
}
