import type { Metadata } from 'next'
import Link from 'next/link'
import ToolPageHeader from '@/components/store/ToolPageHeader'
import Footer from '@/components/store/Footer'
import ToolFAQ from '@/components/store/ToolFAQ'
import RegulationSearch from './RegulationSearch'
import RegulationAlertForm from './RegulationAlertForm'

export const metadata: Metadata = {
  title: 'STR Regulation Lookup | Is Airbnb Legal in Your City? | {{BRAND_NAME}}',
  description:
    'Check short-term rental laws, license requirements, and tax obligations for any US city. Free regulation database.',
  alternates: { canonical: '/course/regulations' },
}

const whyItMatters = [
  {
    title: 'Avoid six-figure fines',
    body:
      'Cities like Miami Beach fine up to $100,000 for repeat violations. Key West exceeds $20K. Knowing the rules before you buy prevents career-ending mistakes.',
  },
  {
    title: 'License the property accurately',
    body:
      'Every jurisdiction has its own permit. Vacation Rental Certificate, BTR, STRP, Home Share — we track the exact license name, cost, and renewal cadence.',
  },
  {
    title: 'Model real cash flow',
    body:
      'Combined tax burdens range from 11% to 17%. That gap is enough to turn a cash-flowing property into a break-even disaster. Factor it into your pro-forma before you offer.',
  },
  {
    title: 'Spot the pending bills',
    body:
      'State pre-emption and municipal ordinance reviews can change the game overnight. We track pending legislation so you know what could shift before you close.',
  },
]

const trustSignals = [
  { num: '35+', label: 'US markets' },
  { num: 'Monthly', label: 'Updates' },
  { num: '12,000+', label: 'Investors served' },
  { num: '100%', label: 'Free' },
]

const faqItems = [
  {
    q: 'Is this legal advice?',
    a: 'No. This tool is a research starting point built from publicly available municipal, county, and state sources. Regulations change frequently. Always verify current rules with the issuing municipality and consult a licensed attorney and CPA before purchasing property or operating a short-term rental.',
  },
  {
    q: 'How often is the data updated?',
    a: 'Every city is re-verified on a rotating monthly cadence. Each record shows a "Last Updated" date. Any record more than 180 days old is flagged as outdated.',
  },
  {
    q: 'Which states do you cover?',
    a: 'Florida (25 markets) is deepest. We also cover Tennessee, North Carolina, New York, California, South Carolina, and Utah — 35+ markets total, expanding based on subscriber requests.',
  },
  {
    q: 'What if my city isn\'t in the database?',
    a: 'Drop your email below and tell us the city. High-demand requests get prioritized in the next monthly build cycle.',
  },
  {
    q: 'Will this work for commercial / multifamily / co-living?',
    a: 'The database focuses on short-term rentals (under-30-day stays). Some records note where medium-term and long-term rules differ. For commercial or mixed-use, confirm with a local attorney.',
  },
]

export default function RegulationsPage() {
  return (
    <main>
      <ToolPageHeader />

      {/* Hero */}
      <section className="sf-navy-gradient pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(212,160,23,0.6) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/course"
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-[var(--sf-gold)] transition-colors mb-6"
          >
            ← Back to Course
          </Link>

          <span className="inline-block bg-[var(--sf-gold)]/15 border border-[var(--sf-gold)]/30 rounded-full px-3 py-1 text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase mb-5">
            Free Regulation Database
          </span>

          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Is Short-Term Rental Legal in{' '}
            <span className="sf-gold-gradient">Your City?</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Every STR investor asks this first. We&apos;re the only tool that answers it —
            licensing costs, tax burdens, minimum stays, zoning restrictions, and pending
            legislation for 35+ US markets.
          </p>
          <p className="mt-5 text-sm font-semibold tracking-wider uppercase text-[var(--sf-gold)]">
            Check before you buy.
          </p>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white border-b border-[var(--sf-navy)]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustSignals.map((t) => (
              <div key={t.label}>
                <div className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--sf-navy)]">
                  {t.num}
                </div>
                <div className="text-xs text-[var(--sf-navy)]/50 uppercase tracking-wider mt-1">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Interface + Sample Result */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--sf-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RegulationSearch />

          <p className="text-center text-xs text-[var(--sf-navy)]/50 mt-6 max-w-xl mx-auto">
            Information is sourced from publicly available municipal, county, state, and federal
            sources. This is not legal advice — always confirm with the municipality before
            purchase.
          </p>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
              Why Check First
            </span>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--sf-navy)] mt-3">
              Regulation is the highest-risk variable in STR
            </h2>
            <p className="text-[var(--sf-navy)]/60 mt-4 max-w-2xl mx-auto">
              AirDNA, Rabbu, Mashvisor, BNBCalc — none of them tell you if the property you&apos;re
              about to buy is even legal to rent. We do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {whyItMatters.map((item, idx) => (
              <div
                key={item.title}
                className="bg-[var(--sf-cream)] rounded-2xl p-6 sm:p-7 border border-[var(--sf-navy)]/10 sf-card-hover"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--sf-gold)]/10 text-[var(--sf-gold)] flex items-center justify-center font-[var(--font-display)] font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[var(--sf-navy)] text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--sf-navy)]/70 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="sf-navy-gradient py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(212,160,23,0.6) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
            Stay Ahead
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Get alerts when <span className="sf-gold-gradient">your city&apos;s</span> STR rules
            change
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            One email per month, only when something meaningful changes in the markets you care
            about. Plus the STR Legality Checklist as a welcome gift.
          </p>

          <div className="max-w-md mx-auto">
            <RegulationAlertForm />
          </div>
        </div>
      </section>

      {/* Soft CTA: Barefoot Realty */}
      <section className="py-16 sm:py-20 bg-[var(--sf-cream)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[var(--sf-gold)]/20 shadow-xl">
            <div className="grid md:grid-cols-[auto,1fr] gap-6 md:gap-10 items-center">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[var(--sf-navy)] flex items-center justify-center mx-auto md:mx-0">
                <svg className="w-8 h-8 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
                  Ready to Buy?
                </span>
                <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--sf-navy)] mt-2 mb-3">
                  Considering STR property?{' '}
                  <br className="hidden md:block" />
                  Talk to Barefoot Realty.
                </h3>
                <p className="text-[var(--sf-navy)]/70 mb-5">
                  Barefoot Realty &amp; Investments specializes in STR-ready properties in
                  Florida&apos;s top vacation markets. We find the ones that actually cash flow —
                  compliant, rentable, and underpriced.
                </p>
                <a
                  href="#"
                  className="inline-block bg-[var(--sf-navy)] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[var(--sf-navy)]/90 transition-all hover:shadow-lg"
                >
                  Get a Property Consult →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Footer */}
      <section className="bg-white border-t border-[var(--sf-navy)]/10 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center text-sm text-[var(--sf-navy)]/60">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Updated monthly
            </div>
            <span className="hidden md:inline text-[var(--sf-navy)]/20">|</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Sourced from municipal websites
            </div>
            <span className="hidden md:inline text-[var(--sf-navy)]/20">|</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Used by 12,000+ investors
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ToolFAQ items={faqItems} />

      {/* Footer CTA with cross-link to quiz */}
      <section className="sf-navy-gradient py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/course/quiz"
            className="text-sm text-white/60 hover:text-[var(--sf-gold)] transition-colors"
          >
            Already know your city&apos;s legal? Check if the market is saturated →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
