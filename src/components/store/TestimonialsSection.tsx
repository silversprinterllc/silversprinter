import Link from 'next/link'

export default function TestimonialsSection() {
  return (
    <section aria-label="Reference implementation" className="py-14 sm:py-20 lg:py-28 bg-[var(--sf-navy)]/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Built on Real Properties
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-4">
            The System in
            <span className="sf-gold-gradient"> Practice</span>
          </h2>
          <p className="text-[var(--sf-navy)]/50 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            SpokeBnB was built backward from two properties we operate on Seneca Lake in the Finger Lakes — Lakeside
            Landing FLX and Smooth Sailing FLX. The modules, templates, and frameworks in the course are the
            same systems running on those properties today.
          </p>
        </div>

        {/* Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Reference Implementation */}
          <div className="bg-white rounded-2xl p-8 border border-[var(--sf-navy)]/5 sf-card-hover">
            <div className="w-10 h-10 rounded-xl bg-[var(--sf-gold)]/10 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="font-semibold text-[var(--sf-navy)] mb-2">Reference Implementation</h3>
            <p className="text-[var(--sf-navy)]/50 text-sm leading-relaxed mb-5">
              Smooth Sailing FLX — a live direct-booking site on Seneca Lake built using the same module
              system, intake process, and architecture behind every SpokeBnB Build.
            </p>
            <a
              href="https://smoothsailingflx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sf-gold)] hover:text-[var(--sf-navy)] transition-colors"
            >
              See it live
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* The System */}
          <div className="bg-white rounded-2xl p-8 border border-[var(--sf-navy)]/5 sf-card-hover">
            <div className="w-10 h-10 rounded-xl bg-[var(--sf-gold)]/10 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-semibold text-[var(--sf-navy)] mb-2">15 Modules — Fully Built</h3>
            <p className="text-[var(--sf-navy)]/50 text-sm leading-relaxed mb-5">
              Distribution, direct bookings, dynamic pricing, automation, content, creators, guest retention,
              experiences, the Barefoot Advantage, and more. Built from what actually moves revenue — not
              theory.
            </p>
            <Link
              href="/course#curriculum"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sf-gold)] hover:text-[var(--sf-navy)] transition-colors"
            >
              See the curriculum
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Early Access */}
          <div className="bg-[var(--sf-navy)] rounded-2xl p-8 border border-[var(--sf-navy)]/5">
            <div className="w-10 h-10 rounded-xl bg-[var(--sf-gold)]/15 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-2">Early Access</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              SpokeBnB is in early access. Student results are being collected as the first operators complete
              the System and receive their Builds. Verified results will replace this panel.
            </p>
            <Link
              href="/course#pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sf-gold)] hover:text-white transition-colors"
            >
              Be among the first
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
