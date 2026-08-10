import Link from 'next/link'

const rentalRanker = {
  href: 'https://rentalranker.barefootrealty.com',
  tag: 'Investment Scoring Tool',
  badge: 'Free · Powered by Barefoot Realty',
  title: 'RentalRanker™ — Find your next STR before anyone else does',
  body: 'Paste a Zillow or VRBO listing URL. Get an instant Investment Grade, Lifestyle Pick, or No-Go score based on revenue potential, market saturation, and cap rate — all in under 60 seconds.',
  cta: 'Score a listing free',
}

const tools = [
  {
    href: '/course/quiz',
    tag: 'Saturation Quiz',
    title: 'Is your market oversaturated?',
    body: 'Two-minute quiz that scores your market\'s saturation risk and reveals where the profitable white space still lives.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4m0 0l-4-4m4 4l-4 4M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
      </svg>
    ),
    cta: 'Take the quiz',
  },
  {
    href: '/course/audit',
    tag: 'Free Listing Audit',
    title: '40-point listing audit',
    body: 'Personalized 10-minute Loom walkthrough of your Airbnb listing with a ranked top-5 fix list. 5 spots per week.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    cta: 'Apply now',
    badge: '3 spots left',
  },
  {
    href: '/course/guidebook',
    tag: 'Local Area Guidebook',
    title: 'The $2,400/yr Notion template',
    body: 'Premium guest guidebook template with built-in Viator affiliate placements. Notion-ready in 90 minutes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    cta: 'Download free',
  },
  {
    href: '/course/regulations',
    tag: 'STR Regulation Lookup',
    title: 'Is Airbnb legal in your city?',
    body: 'License requirements, tax burdens, minimum stays, and pending legislation for 35+ US markets. Updated monthly.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    cta: 'Check your city',
  },
]

export default function FreeToolsSection() {
  return (
    <section id="tools-free" className="py-16 sm:py-20 lg:py-24 bg-[var(--sf-cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
            Free Tools
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--sf-navy)] mt-3">
            Start with a free tool
          </h2>
          <p className="text-[var(--sf-navy)]/60 mt-4 max-w-2xl mx-auto">
            Not ready to enroll? Take the tool that matches where you are. Every one is free, with
            no credit card required.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-2xl p-6 border border-[var(--sf-navy)]/10 shadow-sm sf-card-hover flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--sf-gold)]/10 text-[var(--sf-gold)] flex items-center justify-center">
                  {tool.icon}
                </div>
                {tool.badge && (
                  <span className="bg-[var(--sf-gold)] text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded-full">
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--sf-gold)]">
                {tool.tag}
              </p>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--sf-navy)] mt-1.5 mb-3 leading-tight">
                {tool.title}
              </h3>
              <p className="text-sm text-[var(--sf-navy)]/60 leading-relaxed flex-1">
                {tool.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sf-navy)] group-hover:text-[var(--sf-gold)] transition-colors">
                {tool.cta}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* RentalRanker Featured Partner Card */}
        <a
          href={rentalRanker.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-[var(--sf-navy)] rounded-2xl p-7 sm:p-8 shadow-xl shadow-[var(--sf-navy)]/20 hover:shadow-2xl hover:shadow-[var(--sf-navy)]/30 transition-all duration-300"
        >
          {/* Icon */}
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-[var(--sf-gold)]/20 text-[var(--sf-gold)] flex items-center justify-center">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--sf-gold)]">
                {rentalRanker.tag}
              </p>
              <span className="bg-[var(--sf-gold)]/15 text-[var(--sf-gold)] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                {rentalRanker.badge}
              </span>
            </div>
            <h3 className="font-[var(--font-display)] text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
              {rentalRanker.title}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
              {rentalRanker.body}
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 bg-[var(--sf-gold)] text-white text-sm font-semibold px-6 py-3 rounded-xl group-hover:bg-[var(--sf-gold)]/90 group-hover:shadow-lg transition-all whitespace-nowrap">
              {rentalRanker.cta}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </section>
  )
}
