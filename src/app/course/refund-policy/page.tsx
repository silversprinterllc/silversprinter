import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'

export const metadata = {
  title: 'Refund Policy | SpokeBnB',
  description: 'Refund policy for SpokeBnB courses and services.',
}

export default function RefundPolicyPage() {
  return (
    <main>
      <Header />

      <section className="pt-32 pb-16 sm:pb-20 lg:pb-28 bg-[var(--sf-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mb-2">
            Refund Policy
          </h1>
          <p className="text-sm text-[var(--sf-navy)]/40 mb-10">
            Last updated: March 30, 2026
          </p>

          <div className="prose prose-slate max-w-none text-[var(--sf-navy)]/70 text-sm leading-relaxed space-y-8">
            <div>
              <p className="text-base text-[var(--sf-navy)]/80">
                We stand behind the quality of our program and want every student to succeed.
                Our refund policy is designed to be fair to students who engage with the material
                and protective against bad-faith purchases.
              </p>
            </div>

            {/* Course + Intensive */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Self-Paced Course ($1,997) &amp; Intensive Cohort ($4,997)
              </h2>
              <div className="bg-white rounded-xl border border-[var(--sf-navy)]/10 p-6 mb-4">
                <p className="font-semibold text-[var(--sf-navy)] mb-3">
                  14-Day Conditional Money-Back Guarantee
                </p>
                <p className="mb-3">
                  You may request a full refund within 14 days of purchase if you meet
                  <strong> all</strong> of the following conditions:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>You have completed Module 0 (Foundation) and Module 1 (Distribution Platforms)</li>
                  <li>You have submitted the associated homework assignments</li>
                  <li>You can demonstrate that you made a good-faith effort to implement the strategies taught</li>
                  <li>You submit your refund request via email to <strong>ben@spokebnb.com</strong> with your completed worksheets attached</li>
                </ol>
              </div>

              <h3 className="text-base font-semibold text-[var(--sf-navy)] mb-2">
                Why is the refund conditional?
              </h3>
              <p className="mb-3">
                We&apos;ve structured this policy to ensure that refunds go to students who
                genuinely engaged with the program and didn&apos;t find value — not to people
                who purchase, download all the templates, and request a refund. If you complete
                the first two modules and honestly feel the program isn&apos;t worth the
                investment, we want to make it right.
              </p>

              <h3 className="text-base font-semibold text-[var(--sf-navy)] mb-2">
                When refunds will NOT be issued:
              </h3>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>No course activity (zero logins, no lesson completions, no homework submitted)</li>
                <li>Refund requested after the 14-day window</li>
                <li>Evidence of content downloading or distribution</li>
                <li>Chargebacks filed without first contacting us for resolution</li>
              </ul>
            </div>

            {/* DFY */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Done-For-You Services ($7,500 / $25,000)
              </h2>
              <div className="bg-white rounded-xl border border-[var(--sf-navy)]/10 p-6 mb-4">
                <p className="mb-3">
                  Due to the custom, labor-intensive nature of our Done-For-You implementation
                  services, DFY packages are <strong>non-refundable</strong> once the Discovery
                  &amp; Strategy phase has begun.
                </p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li><strong>Before strategy call:</strong> Full refund minus $500 administrative fee</li>
                  <li><strong>After strategy call / during build:</strong> No refund — work has commenced</li>
                  <li><strong>Scope disputes:</strong> If deliverables do not match the agreed scope, we will revise until they meet the specification at no additional charge</li>
                </ul>
              </div>
            </div>

            {/* Payment Plans */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Payment Plans
              </h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Payment plans are a financing arrangement, not a subscription — all installments are due regardless of course usage</li>
                <li>Approved refunds on payment plans are calculated based on the total amount paid to date</li>
                <li>Remaining installments are cancelled upon approved refund</li>
                <li>Defaulting on payment plan installments may result in access suspension and collection activity</li>
              </ul>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                How to Request a Refund
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Email <strong>ben@spokebnb.com</strong> with the subject line &quot;Refund Request — [Your Name]&quot;</li>
                <li>Include your completed Module 0 and Module 1 worksheets</li>
                <li>Briefly explain why the program did not meet your expectations</li>
                <li>We will review your request and respond within 3 business days</li>
                <li>Approved refunds are processed within 5-10 business days via your original payment method</li>
              </ol>
            </div>

            {/* Chargebacks */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Chargebacks
              </h2>
              <p className="mb-3">
                We ask that you contact us directly before initiating a chargeback with your
                bank or credit card company. We are committed to resolving any issues fairly
                and promptly.
              </p>
              <p>
                Filing a chargeback without first contacting us will result in{' '}
                <strong>immediate access revocation</strong> and we will submit all relevant
                documentation to the payment processor, including your agreement to these terms,
                course access logs, and communication records.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">Contact</h2>
              <p>
                Questions about our refund policy: <strong>ben@spokebnb.com</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
