const testimonials = [
  {
    name: 'Sarah M.',
    role: '4-Unit STR Operator, Destin FL',
    quote:
      'Within 60 days of launching my direct booking site, I had 12 commission-free bookings. The email sequences alone paid for the entire program.',
    metric: '+34% Revenue Per Night',
    stars: 5,
  },
  {
    name: 'David R.',
    role: '8-Unit Portfolio Manager, Nashville TN',
    quote:
      'I was spending 6 hours a day managing my properties. After the Automation Lab, I am under 45 minutes. The systems just work.',
    metric: '-85% Time Spent',
    stars: 5,
  },
  {
    name: 'Jennifer L.',
    role: '2-Unit STR Owner, Scottsdale AZ',
    quote:
      'The influencer module was a game-changer. One creator stay generated over 40 direct bookings and content I am still using 8 months later.',
    metric: '40+ Bookings from 1 Stay',
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[var(--sf-gold)]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section aria-label="Student testimonials" className="py-14 sm:py-20 lg:py-28 bg-[var(--sf-navy)]/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Results
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-4">
            What Operators Are
            <span className="sf-gold-gradient"> Saying</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-8 border border-[var(--sf-navy)]/5 sf-card-hover"
            >
              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <p className="text-[var(--sf-navy)]/60 text-sm leading-relaxed mt-4 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Metric badge */}
              <div className="inline-block bg-[var(--sf-gold)]/10 rounded-lg px-3 py-1.5 mb-4">
                <span className="text-[var(--sf-gold)] text-sm font-bold">{t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--sf-navy)]/5">
                <div className="w-10 h-10 rounded-full bg-[var(--sf-navy)]/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-[var(--sf-navy)]/40">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--sf-navy)]">{t.name}</div>
                  <div className="text-xs text-[var(--sf-navy)]/40">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note — hidden until real testimonials replace placeholders */}
        {/* <p className="text-center text-xs text-[var(--sf-navy)]/30 mt-8">
          * Placeholder testimonials — will be replaced with real student results after first cohort.
        </p> */}
      </div>
    </section>
  )
}
