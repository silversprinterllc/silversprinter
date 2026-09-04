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
              with predictable demand from 10 owned channels.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 sm:gap-8 mb-8 sm:mb-10">
              {[
                { value: '15', label: 'Modules' },
                { value: '10', label: 'Demand Channels' },
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

          {/* Right — Brand Mark (Desktop only) */}
          <div className="relative hidden lg:flex flex-col items-center justify-center" aria-hidden="true">
            {/* Radial glow behind wheel */}
            <div className="absolute w-[380px] h-[380px] rounded-full bg-[var(--sf-gold)]/6 blur-[90px]" />

            {/* Official eight-spoke wheel mark */}
            <svg
              viewBox="0 0 512 512"
              className="relative w-[300px] h-[300px] text-[var(--sf-gold)] drop-shadow-[0_0_40px_rgba(212,160,23,0.25)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              strokeLinecap="round"
              role="img"
              aria-label="SpokeBnB eight-spoke wheel"
            >
              <circle cx="256" cy="256" r="150" />
              <circle cx="256" cy="256" r="21" />
              <line x1="278.50" y1="256.00" x2="394.00" y2="256.00" />
              <line x1="271.91" y1="271.91" x2="353.58" y2="353.58" />
              <line x1="256.00" y1="278.50" x2="256.00" y2="394.00" />
              <line x1="240.09" y1="271.91" x2="158.42" y2="353.58" />
              <line x1="233.50" y1="256.00" x2="118.00" y2="256.00" />
              <line x1="240.09" y1="240.09" x2="158.42" y2="158.42" />
              <line x1="256.00" y1="233.50" x2="256.00" y2="118.00" />
              <line x1="271.91" y1="240.09" x2="353.58" y2="158.42" />
            </svg>

            {/* Wordmark + tagline */}
            <div className="mt-8 text-center">
              <p className="font-[var(--font-display)] text-5xl font-semibold tracking-tight text-white">
                Spoke<span className="text-[var(--sf-gold)]">BnB</span>
              </p>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-px w-10 bg-[var(--sf-gold)]/40" />
                <p className="text-white/45 text-[11px] font-semibold tracking-[0.25em] uppercase">
                  Build Demand You Own.
                </p>
                <div className="h-px w-10 bg-[var(--sf-gold)]/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
