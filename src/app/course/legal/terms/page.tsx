// LEGAL DISCLAIMER: This document is a template. It must be reviewed by a licensed attorney
// before being published or used to take payments. Last updated: April 2026.

import type { Metadata } from 'next'
import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | SpokeBnB',
  description:
    'The legal agreement between you and SpokeBnB governing use of our website, courses, and services.',
  alternates: { canonical: '/course/legal/terms' },
  robots: { index: true, follow: true },
}

const sections = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'license', label: 'License Grant (Not Ownership)' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'accounts', label: 'User Accounts' },
  { id: 'access', label: 'Course Access & Delivery' },
  { id: 'payment', label: 'Payment Terms' },
  { id: 'refunds', label: 'Refund Policy' },
  { id: 'no-guarantees', label: 'No Guarantees of Results' },
  { id: 'conduct', label: 'User Conduct & Community Rules' },
  { id: 'third-party', label: 'Third-Party Services & Links' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'disputes', label: 'Dispute Resolution & Arbitration' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'modifications', label: 'Modifications to These Terms' },
  { id: 'severability', label: 'Severability & Entire Agreement' },
  { id: 'contact', label: 'Contact' },
]

export default function TermsOfServicePage() {
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
            Terms of Service
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
            <section id="acceptance">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                These Terms of Service (the &quot;Terms&quot;) are a binding
                legal agreement between you (&quot;you&quot; or
                &quot;Customer&quot;) and {`SpokeBnB`} (&quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;). By accessing our website,
                creating an account, purchasing a product, or using any service
                we provide, you agree to these Terms and to our{' '}
                <a
                  href="/course/legal/privacy"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <p>
                If you do not agree, do not use our services. If you are entering
                into these Terms on behalf of a company or entity, you represent
                that you have authority to bind that entity.
              </p>
            </section>

            <section id="license">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                2. License Grant (Not Ownership)
              </h2>
              <p className="mb-4">
                When you purchase access to a {`SpokeBnB`} course,
                worksheet, template, or community, you are purchasing a{' '}
                <strong>limited, non-exclusive, non-transferable,
                revocable license</strong> to access and use the content for
                your personal business education. You are <strong>not</strong>{' '}
                purchasing ownership of any materials.
              </p>
              <p>
                This license may not be sublicensed, resold, assigned, or
                transferred to any other person or entity.
              </p>
            </section>

            <section id="ip">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                3. Intellectual Property
              </h2>
              <p className="mb-4">
                All content, materials, videos, workbooks, templates, SOPs,
                frameworks, marks, logos, and systems provided by {`SpokeBnB`}
                &mdash; including the {`SpokeBnB`} System and Hub-and-Spoke
                methodology &mdash; are owned by {`SpokeBnB`} or our
                licensors and are protected by U.S. and international copyright,
                trademark, and other intellectual-property laws.
              </p>
              <p className="mb-4">You may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>copy, reproduce, redistribute, publicly display, or publish any course content;</li>
                <li>share your login credentials or course access with anyone else;</li>
                <li>create derivative works, courses, or training materials based on our content;</li>
                <li>record, screen-capture, or re-broadcast any live sessions;</li>
                <li>use our content to train any machine-learning model or AI system.</li>
              </ul>
              <p className="mt-4">
                Violation may result in immediate termination of your access
                without refund, legal action, and damages up to the maximum
                allowed by law.
              </p>
            </section>

            <section id="accounts">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                4. User Accounts
              </h2>
              <p className="mb-4">
                Accounts are for a single user. You may not share your account
                with any other person. You are responsible for maintaining the
                confidentiality of your credentials and for all activity that
                occurs under your account.
              </p>
              <p>
                You must provide accurate and current information at registration
                and keep it updated. We may suspend or terminate accounts with
                inaccurate or fraudulent information.
              </p>
            </section>

            <section id="access">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                5. Course Access &amp; Delivery
              </h2>
              <p className="mb-4">
                Upon successful payment, you receive access to the {`SpokeBnB`}
                System for the duration described at the time of purchase. Unless
                otherwise stated, access is offered as &quot;lifetime access&quot;
                &mdash; meaning for as long as we operate the course platform and
                you comply with these Terms.
              </p>
              <p className="mb-4">
                To reduce overwhelm and ensure implementation, Modules 5
                through 10 are delivered on a drip schedule that may be released
                over several weeks following enrollment. Modules 0 through 4 are
                available immediately.
              </p>
              <p>
                We may update, supplement, or discontinue specific lessons as we
                improve the curriculum. Any material reduction in content will be
                communicated in advance when practicable.
              </p>
            </section>

            <section id="payment">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                6. Payment Terms
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All payments are processed securely by Stripe. You authorize us
                  and Stripe to charge your selected payment method.
                </li>
                <li>
                  All prices are in U.S. dollars (USD) unless otherwise stated.
                </li>
                <li>
                  You are responsible for all applicable taxes, duties, and fees.
                </li>
                <li>
                  For payment-plan purchases, you authorize recurring charges for
                  the agreed installments. Missed payments may result in
                  suspension of access until the balance is cured. After 30 days
                  of non-payment, the full remaining balance may become
                  immediately due.
                </li>
                <li>
                  For subscription products, charges renew automatically until
                  you cancel. You may cancel at any time; cancellation stops
                  future charges but does not refund completed billing periods.
                </li>
              </ul>
            </section>

            <section id="refunds">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                7. Refund Policy
              </h2>
              <p>
                Our refund terms are set out in our{' '}
                <a
                  href="/course/legal/refund"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  Refund Policy
                </a>
                , which is incorporated into these Terms by reference. By
                purchasing, you agree to those refund terms.
              </p>
            </section>

            <section id="no-guarantees">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                8. No Guarantees of Results
              </h2>
              <p className="mb-4">
                {`SpokeBnB`} provides education and tools, not guaranteed
                income, real-estate advice, investment advice, legal advice, or
                professional consulting. Your results depend on factors outside
                our control, including your property, market, effort, and
                compliance with local laws.
              </p>
              <p>
                Any income statements, case studies, or testimonials reflect
                individual experiences and are not typical. See our{' '}
                <a
                  href="/course/legal/earnings-disclaimer"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  Earnings Disclaimer
                </a>
                {' '}for details.
              </p>
            </section>

            <section id="conduct">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                9. User Conduct &amp; Community Rules
              </h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>violate any applicable law or third-party right;</li>
                <li>harass, threaten, or defame other students, staff, or guests;</li>
                <li>share course materials outside the community;</li>
                <li>use community spaces to solicit customers or promote unrelated offers without our permission;</li>
                <li>upload malware, spam, or automated tools;</li>
                <li>attempt to access any portion of the platform you are not authorized to access.</li>
              </ul>
              <p className="mt-4">
                Violation may result in removal from community spaces,
                termination of your license, and other remedies permitted by law
                &mdash; without refund.
              </p>
            </section>

            <section id="third-party">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                10. Third-Party Services &amp; Links
              </h2>
              <p>
                Our content references third-party products and services (such
                as Hostaway, PriceLabs, StayFi, and others). We are not
                responsible for the availability, terms, pricing, or performance
                of third-party services. Your use of any third-party service is
                governed by that provider&apos;s own agreements.
              </p>
            </section>

            <section id="disclaimers">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                11. Disclaimers
              </h2>
              <p className="mb-4 uppercase tracking-wide text-sm font-semibold text-[var(--sf-navy)]">
                Our services are provided &quot;as is&quot; and &quot;as available.&quot;
              </p>
              <p>
                To the fullest extent permitted by law, we disclaim all warranties,
                express or implied, including any implied warranties of
                merchantability, fitness for a particular purpose,
                non-infringement, and any warranty arising from course of dealing
                or usage of trade. We do not warrant that the services will be
                uninterrupted, error-free, or free from harmful components.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                12. Limitation of Liability
              </h2>
              <p className="mb-4 uppercase tracking-wide text-sm font-semibold text-[var(--sf-navy)]">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  {`SpokeBnB`} and its owners, officers, employees,
                  contractors, and affiliates will not be liable for any
                  indirect, incidental, consequential, special, exemplary, or
                  punitive damages, including lost profits, lost revenue, lost
                  data, or business interruption, arising from or related to
                  these Terms or your use of our services.
                </li>
                <li>
                  Our total aggregate liability for any claim is limited to the
                  amount you actually paid us in the twelve (12) months preceding
                  the event giving rise to the claim.
                </li>
              </ul>
              <p className="mt-4">
                Some jurisdictions do not allow the limitation of certain
                warranties or damages, so some of the above may not apply to you.
              </p>
            </section>

            <section id="indemnification">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                13. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless
                {' '}{`SpokeBnB`} and its owners, officers, employees, and
                affiliates from any claims, losses, damages, liabilities, and
                expenses (including reasonable attorneys&apos; fees) arising
                from: (a) your use of our services; (b) your breach of these
                Terms; or (c) your violation of any law or third-party right.
              </p>
            </section>

            <section id="disputes">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                14. Dispute Resolution &amp; Arbitration
              </h2>
              <p className="mb-4">
                <strong>Please read carefully.</strong> This section affects
                your legal rights.
              </p>
              <p className="mb-4">
                Any dispute, claim, or controversy arising from or relating to
                these Terms or our services shall be resolved by{' '}
                <strong>binding individual arbitration</strong> administered by
                the American Arbitration Association (AAA) under its Consumer
                Arbitration Rules. The arbitration shall take place in the
                State of Florida, or by video conference at the
                arbitrator&apos;s discretion. The arbitrator&apos;s decision
                shall be final and enforceable in any court of competent
                jurisdiction.
              </p>
              <p className="mb-4">
                <strong>Class-action waiver.</strong> You and {`SpokeBnB`}
                {' '}agree that each may bring claims against the other only in
                an individual capacity and not as a plaintiff or class member
                in any purported class, collective, or representative
                proceeding.
              </p>
              <p>
                You may opt out of this arbitration provision within 30 days of
                first purchase by sending written notice to the contact address
                below.
              </p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                15. Termination
              </h2>
              <p>
                We may suspend or terminate your access at any time, with or
                without notice, for any violation of these Terms, non-payment,
                fraudulent activity, chargebacks, misuse of our content, or
                conduct that we reasonably determine to be harmful to the
                community. Upon termination for cause, no refund will be due.
              </p>
            </section>

            <section id="governing-law">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                16. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the State of Florida,
                United States, without regard to conflict-of-law principles.
                Subject to the arbitration provision above, the exclusive venue
                for any permitted court proceedings shall be the state or
                federal courts located in Florida.
              </p>
            </section>

            <section id="modifications">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                17. Modifications to These Terms
              </h2>
              <p>
                We may modify these Terms at any time. We will post the updated
                Terms on this page and update the &quot;Last Updated&quot;
                date. Material changes will be communicated by email or a
                conspicuous site notice. Continued use after changes
                constitutes acceptance.
              </p>
            </section>

            <section id="severability">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                18. Severability &amp; Entire Agreement
              </h2>
              <p className="mb-4">
                If any provision of these Terms is held unenforceable, the
                remaining provisions remain in full force and effect. The
                unenforceable provision shall be reformed only to the extent
                necessary to make it enforceable.
              </p>
              <p>
                These Terms, together with the Privacy Policy, Refund Policy,
                Earnings Disclaimer, and Affiliate Disclosure, constitute the
                entire agreement between you and {`SpokeBnB`} regarding
                our services and supersede any prior agreements.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                19. Contact
              </h2>
              <p>
                For legal notices or questions about these Terms, email{' '}
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
