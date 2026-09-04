// LEGAL DISCLAIMER: This document is a template. It must be reviewed by a licensed attorney
// before being published or used to take payments. Last updated: April 2026.

import type { Metadata } from 'next'
import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'

export const metadata: Metadata = {
  title: 'Earnings Disclaimer | SpokeBnB',
  description:
    'Important information about income representations, results, and the non-advice nature of SpokeBnB educational content.',
  alternates: { canonical: '/course/legal/earnings-disclaimer' },
  robots: { index: true, follow: true },
}

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'real-numbers', label: 'Real Numbers We Publish' },
  { id: 'not-typical', label: 'Results Are Not Typical, Not Guaranteed' },
  { id: 'variables', label: 'Variables That Affect Outcomes' },
  { id: 'not-advice', label: 'Education, Not Financial or Real-Estate Advice' },
  { id: 'professionals', label: 'Consult Qualified Professionals' },
  { id: 'past-performance', label: 'Past Performance' },
  { id: 'effort', label: 'Implementation Effort Required' },
  { id: 'tools', label: 'Tool & Vendor Recommendations' },
  { id: 'student-decisions', label: 'Student Business Decisions' },
  { id: 'contact', label: 'Contact' },
]

export default function EarningsDisclaimerPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--sf-cream)] min-h-screen">
        <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">
          <a
            href="/course"
            className="inline-block text-[var(--sf-gold)] hover:underline text-sm font-medium mb-8"
          >
            &larr; Back to Course
          </a>

          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold text-[var(--sf-navy)] mb-3">
            Earnings Disclaimer
          </h1>
          <p className="text-[var(--sf-navy)]/50 text-sm mb-10">
            Last Updated: April 2026
          </p>

          <nav
            aria-label="Table of contents"
            className="bg-white border border-[var(--sf-navy)]/10 rounded-xl p-6 mb-12 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-[var(--sf-navy)] mb-4">
              Contents
            </h2>
            <ol className="space-y-2 list-decimal pl-6 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[var(--sf-gold)] hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-12 text-[#374151] text-[17px] leading-[1.75]">
            <section id="overview">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                1. Overview
              </h2>
              <p className="mb-4">
                This Earnings Disclaimer is provided in accordance with the
                Federal Trade Commission&apos;s (FTC) guidelines on endorsements
                and testimonials (16 C.F.R. Part 255). Please read it carefully
                before making any purchasing or business decisions based on
                information presented on our website, in our marketing
                materials, or within our courses.
              </p>
              <p>
                By using any {`SpokeBnB`} content, you acknowledge and
                agree to the disclosures below.
              </p>
            </section>

            <section id="real-numbers">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                2. Real Numbers We Publish
              </h2>
              <p className="mb-4">
                The financial figures we publish &mdash; for example, the
                progression from roughly $66,086 to $130,000+ in annual revenue
                for <em>Lakeside Landing FLX</em> &mdash; are based on actual
                gross-revenue figures from real short-term rental properties we
                operate in the Finger Lakes, New York market. These are
                property-specific, market-specific figures and reflect the
                outcome of years of operator decisions, market conditions, and
                capital investment.
              </p>
              <p>
                Case studies and testimonials published on our site reflect the
                actual experiences of the individuals or properties depicted.
                They are provided for illustrative and educational purposes
                only.
              </p>
            </section>

            <section id="not-typical">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                3. Results Are Not Typical, Not Guaranteed
              </h2>
              <p className="mb-4 uppercase tracking-wide text-sm font-semibold text-[var(--sf-navy)]">
                The results shown are not typical, and we make no promise that
                you will achieve similar results.
              </p>
              <p>
                Individual outcomes vary significantly. Most people who buy
                educational products do not implement them fully or at all, and
                therefore do not achieve material results. {`SpokeBnB`}
                {' '}does not and cannot guarantee any specific income, revenue,
                occupancy, ADR, ROI, or other business result.
              </p>
            </section>

            <section id="variables">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                4. Variables That Affect Outcomes
              </h2>
              <p className="mb-3">
                Your results will depend on many factors outside of our
                control, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>the specific property, its condition, amenities, and cost basis;</li>
                <li>local demand, seasonality, and the competitiveness of the market;</li>
                <li>your nightly rates, pricing strategy, and cleaning / turnover costs;</li>
                <li>the time, effort, and capital you invest in implementation;</li>
                <li>your operational discipline, guest-experience quality, and review management;</li>
                <li>local short-term rental regulations, permits, HOA rules, and tax obligations;</li>
                <li>platform algorithms, booking-channel economics, and broader economic conditions;</li>
                <li>your skill, experience, and business judgment.</li>
              </ul>
            </section>

            <section id="not-advice">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                5. Education, Not Financial or Real-Estate Advice
              </h2>
              <p className="mb-4">
                {`SpokeBnB`} content is educational in nature. It is{' '}
                <strong>not</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>financial, investment, or securities advice;</li>
                <li>real-estate brokerage or investment advice;</li>
                <li>legal or tax advice;</li>
                <li>accounting advice;</li>
                <li>a recommendation to buy, sell, or hold any specific property or security.</li>
              </ul>
              <p className="mt-4">
                Nothing in our materials creates a fiduciary, advisory,
                brokerage, or professional relationship between you and{' '}
                {`SpokeBnB`} or its personnel.
              </p>
            </section>

            <section id="professionals">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                6. Consult Qualified Professionals
              </h2>
              <p>
                Before making any real-estate purchase, financing decision,
                investment, tax election, or business structure choice, consult
                with qualified, licensed professionals in your jurisdiction,
                including a real-estate attorney, a CPA, a licensed real-estate
                broker, and, where appropriate, a financial advisor. Do not
                rely solely on information in our courses or marketing.
              </p>
            </section>

            <section id="past-performance">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                7. Past Performance
              </h2>
              <p>
                Past performance is not a guarantee or reliable indicator of
                future results. Markets, regulations, guest behavior, and
                platform economics change over time, sometimes rapidly.
                Strategies that worked in the past may not work in the future.
              </p>
            </section>

            <section id="effort">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                8. Implementation Effort Required
              </h2>
              <p>
                The Hub-and-Spoke system is an operating framework that
                requires meaningful, sustained implementation effort. Buying
                the course does not produce results. Building direct-booking
                infrastructure, configuring dynamic pricing, producing content,
                managing listings, and handling guests takes time, attention,
                and follow-through.
              </p>
            </section>

            <section id="tools">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                9. Tool &amp; Vendor Recommendations
              </h2>
              <p>
                We reference specific tools and vendors (for example,
                Hostaway, PriceLabs, StayFi, Kit, AirDNA, Lodgify, Hospitable,
                Viator, and others). A recommendation to use a tool is not a
                guarantee of the tool&apos;s performance, availability, or
                pricing, nor a warranty that the tool will produce any
                specific result for you. Some of these are affiliate
                relationships &mdash; see our{' '}
                <a
                  href="/course/legal/affiliate-disclosure"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  Affiliate Disclosure
                </a>
                .
              </p>
            </section>

            <section id="student-decisions">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                10. Student Business Decisions
              </h2>
              <p>
                You, and only you, are responsible for your business decisions
                and outcomes. {`SpokeBnB`} is not responsible for the
                business decisions you make based on information in our
                courses or marketing materials, including decisions about
                property acquisition, financing, pricing, staffing, marketing
                spend, or compliance.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                11. Contact
              </h2>
              <p>
                Questions about this disclaimer? Email{' '}
                <a
                  href="mailto:legal@spokebnb.com"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  legal@spokebnb.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
