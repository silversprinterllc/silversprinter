export default function BundleOffer() {
  const deliverables = [
    { label: 'Direct Booking Engine DFY', value: '$7,500' },
    { label: 'Automation & Systems DFY', value: '$7,500' },
    { label: 'Content & Growth DFY', value: '$5,500' },
    { label: 'Experience Network Setup', value: '$3,000' },
    { label: 'Barefoot Advantage Consultation', value: '$1,500' },
    { label: '6-Month Post-Launch Support', value: '$3,000' },
  ]

  return (
    <section aria-label="Full Revenue Engine bundle" className="py-14 sm:py-20 lg:py-28 sf-navy-gradient relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--sf-gold)]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[var(--sf-gold)]/20 p-5 sm:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left — Copy */}
            <div>
              <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
                The Full Build
              </span>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Full Revenue Engine
                <br />
                <span className="sf-gold-gradient">Done For You</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                We build your entire Hub-and-Spoke Revenue System — direct bookings,
                automation, content engine, experience partnerships, and property
                acquisition strategy — and hand you a business that generates
                predictable demand from 8+ channels.
              </p>
              <p className="text-white/40 text-sm mb-8">
                For 3-20 unit operators who want the complete system installed by
                experts. This is the &ldquo;hire a team to build your hospitality
                business&rdquo; package.
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold text-white">$25,000</span>
                <span className="text-white/30 text-lg line-through">$28,000</span>
              </div>
              <p className="text-white/40 text-sm mb-8">Save $3,000 vs. purchasing individually</p>

              <a
                href="/course/apply"
                className="inline-flex items-center justify-center bg-[var(--sf-gold)] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-xl hover:shadow-[var(--sf-gold)]/20"
              >
                Apply for Full Revenue Engine
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Right — Deliverables */}
            <div>
              <h3 className="text-white font-semibold mb-4">What&apos;s Included:</h3>
              <div className="space-y-3">
                {deliverables.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-[var(--sf-gold)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/80 text-sm">{item.label}</span>
                    </div>
                    <span className="text-white/30 text-sm">{item.value} value</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm font-semibold">Total Value</span>
                  <span className="text-white font-bold text-lg">$28,000</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-6 bg-white/5 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/60">
                    <strong className="text-white">8-week build</strong> + 6-month post-launch support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
