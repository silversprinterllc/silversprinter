export default function HeroSection() {
  return (
    <section
      aria-label="SpokeBnB course overview"
      className="relative overflow-hidden sf-navy-gradient min-h-[80vh] lg:min-h-[90vh] flex items-center pt-20 lg:pt-24"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(212,160,23,0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Glow Effect */}
      <div className="absolute top-1/4 right-1/4 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[var(--sf-gold)]/5 rounded-full blur-[80px] lg:blur-[120px]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="sf-section">
            {/* Airbnb 15.5% Fee Hook */}
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              <span>⚡</span>
              <span>Airbnb just moved 15.5% of your gross revenue onto your tab — here&apos;s how to take it back</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--sf-gold)] animate-pulse" />
              <span className="text-white/70 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
                Now Enrolling — Limited Seats
              </span>
            </div>

            <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 sm:mb-6">
              Stop Leaving Money
              <br />
              <span className="sf-gold-gradient">On the Nightstand</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              The Hub-and-Spoke Revenue System that transforms short-term rentals
              from passive listings into scalable, revenue-generating businesses
              with predictable demand from 8+ channels.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 sm:gap-8 mb-8 sm:mb-10">
              {[
                { value: '10', label: 'Modules' },
                { value: '8', label: 'Demand Channels' },
                { value: '60+', label: 'Templates' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-[var(--sf-gold)]">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center bg-[var(--sf-gold)] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-xl hover:shadow-[var(--sf-gold)]/20 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Enroll Now — $1,997
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#program"
                className="inline-flex items-center justify-center border-2 border-white/20 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:border-white/40 hover:bg-white/5 transition-all active:scale-[0.98]"
              >
                See Full Curriculum
              </a>
            </div>
          </div>

          {/* Right — Visual (Desktop only) */}
          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="relative w-full aspect-square max-w-[480px] mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-[var(--sf-gold)]/20" />
              <div className="absolute inset-8 rounded-full border border-[var(--sf-gold)]/10" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[var(--sf-gold)] flex items-center justify-center shadow-xl shadow-[var(--sf-gold)]/30">
                <div className="text-center">
                  <div className="text-white font-bold text-sm leading-tight">YOUR</div>
                  <div className="text-white font-bold text-sm leading-tight">PROPERTY</div>
                </div>
              </div>

              {[
                { label: 'Airbnb', angle: 0 },
                { label: 'Direct', angle: 45 },
                { label: 'Pricing', angle: 90 },
                { label: 'Systems', angle: 135 },
                { label: 'Content', angle: 180 },
                { label: 'Creators', angle: 225 },
                { label: 'Guests', angle: 270 },
                { label: 'Experiences', angle: 315 },
              ].map((spoke) => {
                const rad = (spoke.angle * Math.PI) / 180
                const x = 50 + 38 * Math.cos(rad)
                const y = 50 + 38 * Math.sin(rad)
                return (
                  <div
                    key={spoke.label}
                    className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/10 backdrop-blur-sm border border-[var(--sf-gold)]/20 flex items-center justify-center"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span className="text-white text-xs font-semibold text-center leading-tight">
                      {spoke.label}
                    </span>
                  </div>
                )
              })}

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180
                  const x = 50 + 38 * Math.cos(rad)
                  const y = 50 + 38 * Math.sin(rad)
                  return (
                    <line
                      key={angle}
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke="rgba(212,160,23,0.2)"
                      strokeWidth="0.3"
                    />
                  )
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
