export default function InstructorBio() {
  return (
    <section id="instructor" aria-label="About the instructor" className="py-14 sm:py-20 lg:py-28 bg-[var(--sf-cream)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          {/* Photo placeholder */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--sf-navy)]/10">
              {/* Placeholder silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-[var(--sf-navy)]/20 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-[var(--sf-navy)]/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--sf-navy)]/30">Instructor Photo</p>
                </div>
              </div>
              {/* Gold accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--sf-gold)]" />
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-3">
            <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
              Your Instructor
            </span>
            <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--sf-navy)] mt-3 mb-6">
              Built by Operators,
              <br />
              Not Theorists
            </h2>

            <div className="space-y-4 text-[var(--sf-navy)]/60 leading-relaxed">
              <p>
                RevenuePerNight was developed from the inside — by operators who manage
                real short-term rental portfolios, optimize real revenue, and close real
                property deals every month.
              </p>
              <p>
                Backed by <strong className="text-[var(--sf-navy)]">Barefoot Realty &amp; Investments</strong>,
                a licensed Florida real estate brokerage specializing in luxury and
                high-performing vacation rental properties, this program connects the
                operational playbook with actual property acquisition opportunities.
              </p>
              <p>
                Every module, template, and tool recommendation comes from hundreds of
                optimized listings, thousands of guest interactions, and millions in
                managed rental revenue. This isn&apos;t theory from a YouTube channel.
                It&apos;s the system we run.
              </p>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { value: '100+', label: 'Listings Optimized' },
                { value: '$2M+', label: 'Revenue Managed' },
                { value: '15+', label: 'Markets Analyzed' },
                { value: '8', label: 'Revenue Channels' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-[var(--sf-gold)]">{stat.value}</div>
                  <div className="text-xs text-[var(--sf-navy)]/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
