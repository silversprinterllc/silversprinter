import Link from 'next/link'

export default function BundleOffer() {
  return (
    <section aria-label="How the products work together" className="py-14 sm:py-20 sf-navy-gradient relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--sf-gold)]/5 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Two Products. One Goal.
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
            The System teaches the strategy.
            <br />
            <span className="sf-gold-gradient">The Build delivers the infrastructure.</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            You can buy one, the other, or both — they are independent products with a natural relationship.
            Most operators start with the System to understand the model, then commission a Build once
            they know what they want their site to do.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* System */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase mb-3">Education</p>
            <h3 className="font-[var(--font-display)] text-2xl font-bold text-white mb-3">The System</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              15 modules covering distribution, direct bookings, dynamic pricing, automation, content,
              creators, guest retention, experiences, and property acquisition. The frameworks that run on
              our own properties, packaged for independent operators.
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-white">$1,997</span>
              <span className="text-white/30 text-sm">one-time</span>
            </div>
            <Link
              href="/course#pricing"
              className="inline-flex items-center justify-center w-full bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/15 transition-all"
            >
              View System Details
            </Link>
          </div>

          {/* Build */}
          <div className="bg-[var(--sf-gold)]/10 border border-[var(--sf-gold)]/25 rounded-2xl p-8">
            <p className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase mb-3">Infrastructure</p>
            <h3 className="font-[var(--font-display)] text-2xl font-bold text-white mb-3">The Build</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              We build your property-specific direct-booking website — responsive, connected to your PMS,
              optimized for search, and ready to take bookings. The infrastructure that answers
              &ldquo;where do guests book directly?&rdquo; Handed off and live in 3–4 weeks.
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-white">$5,497</span>
              <span className="text-white/30 text-sm">one-time</span>
            </div>
            <Link
              href="/course#pricing"
              className="inline-flex items-center justify-center w-full bg-[var(--sf-gold)] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-lg hover:shadow-[var(--sf-gold)]/20"
            >
              View Build Details
            </Link>
          </div>

          {/* Bundle */}
          <div className="md:col-span-2 bg-white/5 border border-[var(--sf-gold)]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase mb-1">Best Value</p>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white mb-1">The System + The Build</h3>
              <p className="text-white/50 text-sm">Buy both together and save $500 — education and infrastructure, one investment.</p>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              <div className="text-right">
                <div className="text-white/30 text-sm line-through">$7,494</div>
                <div className="text-3xl font-bold text-white">$6,994</div>
                <div className="text-[var(--sf-gold)] text-xs font-semibold mt-0.5">Save $500</div>
              </div>
              <Link
                href="/course#pricing"
                className="inline-flex items-center justify-center bg-[var(--sf-gold)] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-lg hover:shadow-[var(--sf-gold)]/20 whitespace-nowrap"
              >
                Buy Bundle
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs mt-8">
          For portfolio builds, multi-property brands, or custom scope —{' '}
          <Link href="/course/apply" className="text-white/40 hover:text-[var(--sf-gold)] underline transition-colors">
            apply here
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
