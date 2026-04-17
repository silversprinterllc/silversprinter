import Link from 'next/link'

export default function QuizPromo() {
  return (
    <section aria-label="STR Saturation Quiz" className="py-14 sm:py-20 lg:py-24 bg-[var(--sf-cream)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--sf-navy)] to-[#0f1a2e] p-8 sm:p-12 lg:p-16">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(212,160,23,0.4) 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          {/* Glow */}
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[var(--sf-gold)]/10 rounded-full blur-[100px]" aria-hidden="true" />

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--sf-gold)] animate-pulse" />
                <span className="text-white/70 text-xs font-medium tracking-wide uppercase">
                  Free Diagnostic — 60 Seconds
                </span>
              </div>

              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Take the 60-Second
                <br />
                <span className="sf-gold-gradient">Saturation Check</span>
              </h2>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                11 questions. Personalized score out of 100. A report that tells you exactly where your STR is exposed — and the 3 moves that would raise your score fastest.
              </p>

              <Link
                href="/course/quiz"
                className="inline-flex items-center justify-center bg-[var(--sf-gold)] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-xl hover:shadow-[var(--sf-gold)]/20 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Take the Saturation Quiz
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <p className="text-white/40 text-xs mt-4">No email required to see your score.</p>
            </div>

            {/* Mock gauge visual */}
            <div className="relative flex items-center justify-center lg:justify-end" aria-hidden="true">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 sm:p-10 w-full max-w-sm">
                <div className="text-center">
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Your Score</p>
                  <div className="relative inline-block">
                    <svg width="180" height="110" viewBox="0 0 180 110" className="overflow-visible">
                      <path
                        d="M 10 95 A 80 80 0 0 1 170 95"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="14"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 10 95 A 80 80 0 0 1 170 95"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="14"
                        strokeLinecap="round"
                        strokeDasharray="251.3"
                        strokeDashoffset="113"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                      <span className="text-5xl font-bold text-white font-[var(--font-display)]">54</span>
                      <span className="text-xs text-white/50">of 100</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mt-4">
                    At Risk
                  </div>
                  <p className="text-white/40 text-xs mt-3">Sample result</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
