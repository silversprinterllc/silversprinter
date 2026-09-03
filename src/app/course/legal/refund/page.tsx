import type { Metadata } from 'next'
import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'

export const metadata: Metadata = {
  title: 'Refund Policy | SpokeBnB',
  description:
    'Our completion-based refund policy for SpokeBnB courses, cohorts, done-for-you services, and add-ons.',
  alternates: { canonical: '/course/legal/refund' },
  robots: { index: true, follow: true },
}

const sections = [
  { id: 'overview', label: 'Policy Overview' },
  { id: 'core-course', label: 'Core Course Refund (Completion-Based)' },
  { id: 'how-to-request', label: 'How to Request a Refund' },
  { id: 'exclusions', label: 'When Refunds Will Not Be Issued' },
  { id: 'bundles', label: 'Bundle Refunds' },
  { id: 'intensives', label: 'Intensive Cohort Refunds' },
  { id: 'dfy', label: 'Done-For-You (DFY) Refunds' },
  { id: 'addons', label: 'Add-Ons & Digital Products' },
  { id: 'chargebacks', label: 'Chargebacks' },
  { id: 'why', label: 'Why This Policy Exists' },
  { id: 'contact', label: 'Contact' },
]

export default function RefundPolicyPage() {
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
            Refund Policy
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
                1. Policy Overview
              </h2>
              <p className="mb-4">
                {`SpokeBnB`} offers a completion-based refund policy
                designed to protect students who genuinely engage with the
                material while safeguarding the integrity of our community from
                content piracy and refund abuse.
              </p>
              <p>
                By purchasing, you acknowledge and agree to the terms below.
                This Refund Policy is incorporated into our{' '}
                <a
                  href="/course/legal/terms"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  Terms of Service
                </a>
                .
              </p>
            </section>

            <section id="core-course">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                2. Core Course Refund (Completion-Based)
              </h2>
              <blockquote className="border-l-4 border-[var(--sf-gold)] bg-white pl-6 pr-6 py-5 rounded-r-xl mb-4 shadow-sm">
                <p className="italic">
                  If you complete Module 0 and Module 1, submit the homework
                  assignments, and can demonstrate you implemented the
                  strategies without seeing meaningful improvement in your STR
                  business, we&apos;ll refund your purchase within 14 days of
                  enrollment.
                </p>
              </blockquote>
              <p>
                This policy applies to the self-paced {`SpokeBnB`} System
                course. All three conditions must be met: (1) completion of
                Modules 0 and 1, (2) submission of the associated worksheets,
                and (3) evidence of a good-faith implementation attempt. Requests
                received after 14 days from the date of enrollment are not
                eligible.
              </p>
            </section>

            <section id="how-to-request">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                3. How to Request a Refund
              </h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Email{' '}
                  <a
                    href="mailto:support@spokebnb.com"
                    className="text-[var(--sf-gold)] hover:underline"
                  >
                    support@spokebnb.com
                  </a>{' '}
                  with the subject line &quot;Refund Request.&quot;
                </li>
                <li>
                  Include your completed Module 0 and Module 1 worksheets.
                </li>
                <li>
                  Include screenshots or other documentation showing your
                  implementation attempts (for example, updated listing photos,
                  pricing changes, direct-booking site setup, or automation
                  flows).
                </li>
                <li>
                  State the outcome you observed and, if possible, the metrics
                  that did not improve.
                </li>
              </ol>
              <p className="mt-4">
                We review eligible requests and process approved refunds to
                your original payment method within 5 business days of approval.
                Your card issuer or bank may require additional time before the
                refund appears on your statement.
              </p>
            </section>

            <section id="exclusions">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                4. When Refunds Will Not Be Issued
              </h2>
              <p className="mb-3">Refunds will not be issued if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have not engaged with the course material or completed the required homework.</li>
                <li>You purchased and immediately requested a refund without attempting implementation.</li>
                <li>More than 14 days have passed since your purchase.</li>
                <li>You have shared, distributed, downloaded in bulk, or published any course content.</li>
                <li>You are requesting a refund for an Intensive cohort that has already begun.</li>
                <li>You are requesting a refund for a Done-For-You (DFY) engagement where work has been initiated.</li>
                <li>Your account has been terminated for violation of our Terms of Service.</li>
                <li>You initiated a chargeback instead of contacting our support team first.</li>
              </ul>
            </section>

            <section id="bundles">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                5. Bundle Refunds
              </h2>
              <p>
                When you purchase a bundle (for example, course + intensive or
                course + DFY), refund eligibility is calculated{' '}
                <strong>pro-rated</strong> based on the components you have
                accessed or consumed. The fair-market value of any component
                already delivered, attended, or substantially consumed will be
                deducted from any refund amount. Bonus or no-cost items
                included in a bundle are not refundable.
              </p>
            </section>

            <section id="intensives">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                6. Intensive Cohort Refunds
              </h2>
              <p>
                Refunds for Intensive cohorts are available only before the
                cohort&apos;s scheduled start date. Once the cohort begins, your
                seat is secured, curriculum materials are released, and a coach
                has been assigned &mdash; no refunds will be issued. You may
                request to transfer your seat to a future cohort, subject to
                availability and a transfer fee; transfers are not guaranteed.
              </p>
            </section>

            <section id="dfy">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                7. Done-For-You (DFY) Refunds
              </h2>
              <p className="mb-4">
                Done-For-You engagements operate on a milestones-based model.
                Your initial deposit secures our team&apos;s time and is{' '}
                <strong>non-refundable</strong> once work has begun. Subsequent
                payments correspond to delivered milestones and are refundable
                only if we fail to deliver a scheduled milestone, subject to the
                cure period described in your engagement letter.
              </p>
              <p>
                If you cancel a DFY engagement mid-project, you remain
                responsible for the value of work completed to the cancellation
                date, and we retain any deposit.
              </p>
            </section>

            <section id="addons">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                8. Add-Ons &amp; Digital Products
              </h2>
              <p>
                Digital add-ons, templates, SOP packs, swipe files, and other
                downloadable products are{' '}
                <strong>non-refundable</strong> once access has been granted or
                the file has been downloaded. This is because once delivered,
                digital products cannot be &quot;returned.&quot;
              </p>
            </section>

            <section id="chargebacks">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                9. Chargebacks
              </h2>
              <p className="mb-4">
                If you have a concern with your purchase, please contact{' '}
                <a
                  href="mailto:support@spokebnb.com"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  support@spokebnb.com
                </a>{' '}
                first. We resolve legitimate issues quickly.
              </p>
              <p>
                Initiating a chargeback or payment dispute without first
                contacting us, or in contravention of this Refund Policy, is a
                material breach of our Terms of Service. We reserve the right
                to (a) terminate your access immediately, (b) dispute the
                chargeback with your card issuer and provide documentation of
                your engagement with our materials, and (c) refer the matter
                for collection, including for attorneys&apos; fees and costs
                where permitted by law.
              </p>
            </section>

            <section id="why">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                10. Why This Policy Exists
              </h2>
              <p>
                The {`SpokeBnB`} System works when implemented. Our
                completion-based refund ensures students who genuinely engage
                have full protection, while protecting the integrity of our
                community, our content, and the students who show up to do the
                work. We hold ourselves accountable to deliver value &mdash; and
                we ask you to hold yourself accountable to implement.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                11. Contact
              </h2>
              <p>
                All refund requests must go through{' '}
                <a
                  href="mailto:support@spokebnb.com"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  support@spokebnb.com
                </a>
                . We typically respond within 2 business days.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
