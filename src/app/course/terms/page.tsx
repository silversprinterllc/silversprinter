import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'

export const metadata = {
  title: 'Terms of Service | SpokeBnB',
  description: 'Terms of Service for the SpokeBnB program and related services.',
}

export default function TermsPage() {
  return (
    <main>
      <Header />

      <section className="pt-32 pb-16 sm:pb-20 lg:pb-28 bg-[var(--sf-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--sf-navy)]/40 mb-10">
            Last updated: March 30, 2026
          </p>

          <div className="prose prose-slate max-w-none text-[var(--sf-navy)]/70 text-sm leading-relaxed space-y-8">
            {/* 1 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or purchasing any product, course, service, or digital content
                (&quot;Services&quot;) offered through SpokeBnB (&quot;Company,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated by Barefoot Realty
                &amp; Investments LLC, you (&quot;Student,&quot; &quot;you,&quot; or
                &quot;your&quot;) agree to be bound by these Terms of Service (&quot;Terms&quot;).
                If you do not agree with any part of these Terms, do not purchase or access our
                Services.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">2. Services Provided</h2>
              <p>
                SpokeBnB provides digital educational courses, live cohort coaching programs,
                done-for-you implementation services, downloadable templates, calculators, and
                related digital content focused on short-term rental (STR) business optimization.
                Services are delivered through our online platform, live video calls, and digital
                downloads.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">3. License &amp; Intellectual Property</h2>
              <p className="mb-3">
                Upon purchase, you are granted a <strong>limited, non-exclusive, non-transferable,
                revocable license</strong> to access and use the purchased course materials for
                your personal or internal business use only. You do <strong>not</strong> acquire
                ownership of any course content.
              </p>
              <p className="mb-3">You may NOT:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Copy, reproduce, distribute, or share course materials with any third party</li>
                <li>Resell, sublicense, or commercially exploit any course content</li>
                <li>Record, screenshot, or capture live coaching calls for distribution</li>
                <li>Use course materials to create a competing product or service</li>
                <li>Share login credentials with anyone outside your purchased account</li>
                <li>Upload or redistribute templates, swipe files, or downloadable resources</li>
              </ul>
              <p className="mt-3">
                All course content, frameworks, templates, the Hub-and-Spoke Revenue Model,
                Revenue Per Night methodology, and all associated materials are the exclusive
                intellectual property of Barefoot Realty &amp; Investments LLC. Violation of
                these terms will result in <strong>immediate access revocation with no
                refund</strong> and may result in legal action.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">4. Account Responsibility</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>You are responsible for maintaining the confidentiality of your login credentials</li>
                <li>Each purchase grants access to one (1) individual account only</li>
                <li>Sharing accounts is prohibited and will result in access termination</li>
                <li>You must provide accurate information during registration</li>
                <li>You are responsible for all activity under your account</li>
              </ul>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">5. Payments &amp; Billing</h2>
              <p className="mb-3">
                All payments are processed securely through Stripe. We do not store, process, or
                have access to your credit card numbers or payment credentials. Stripe is PCI
                Level 1 certified — the highest level of payment security.
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>All prices are in US Dollars (USD) unless otherwise stated</li>
                <li>Payment plans are binding — all installments must be completed regardless of course usage</li>
                <li>Failed payment plan installments may result in access suspension until payment is resolved</li>
                <li>Applicable taxes may be added based on your location</li>
              </ul>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">6. Refund Policy</h2>
              <p className="mb-3">
                We stand behind the quality of our program. Our refund policy varies by product tier:
              </p>

              <h3 className="text-base font-semibold text-[var(--sf-navy)] mb-2">
                The System ($1,997) &amp; The Build ($5,497)
              </h3>
              <p className="mb-3">
                You may request a full refund within <strong>14 days</strong> of purchase,
                provided you have:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 mb-3">
                <li>Completed Module 0 (Foundation) and Module 1 (Market Analysis)</li>
                <li>Submitted the associated homework assignments</li>
                <li>Demonstrated good-faith engagement with the material</li>
              </ul>
              <p className="mb-3">
                Refund requests must be submitted via email to{' '}
                <strong>ben@spokebnb.com</strong> with your completed worksheets
                attached. Refunds are processed within 5-10 business days.
              </p>
              <p className="mb-4">
                <strong>If you have not engaged with the material</strong> (no logins, no lesson
                completions, no homework submitted), no refund will be issued. This policy exists
                to protect against bad-faith purchases and ensure students who request refunds
                have given the program a genuine effort.
              </p>

              <h3 className="text-base font-semibold text-[var(--sf-navy)] mb-2">
                Done-For-You Services ($5,497 / $25,000)
              </h3>
              <p className="mb-3">
                Due to the custom nature of implementation services, DFY packages are
                non-refundable once the Discovery &amp; Strategy phase has begun. You may
                cancel before the initial strategy call for a full refund minus a $500
                administrative fee.
              </p>

              <h3 className="text-base font-semibold text-[var(--sf-navy)] mb-2">
                Payment Plans
              </h3>
              <p>
                Refunds on payment plans are calculated based on the amount paid to date.
                Remaining installments are cancelled upon approved refund. Choosing a payment
                plan and then requesting a refund after only one installment does not reduce
                your financial obligation for services already accessed.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">7. Earnings Disclaimer</h2>
              <p className="mb-3">
                The revenue figures, cap rates, and financial projections shared in our marketing
                materials and course content are based on our actual properties and real
                operational data. These results are <strong>not typical and are not
                guaranteed</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Individual results vary based on property type, location, market conditions,
                  pricing, effort, experience, and numerous other factors</li>
                <li>We make no guarantees of income, revenue increases, or specific financial outcomes</li>
                <li>Past performance is not indicative of future results</li>
                <li>This program is educational in nature and does not constitute financial,
                  investment, tax, or real estate advice</li>
                <li>You should consult qualified professionals before making investment or
                  business decisions</li>
              </ul>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">8. Affiliate Disclosure</h2>
              <p>
                Some tools and services recommended in our course materials include affiliate
                links. If you purchase through these links, we may earn a commission at no
                additional cost to you. We only recommend tools and services that we use in
                our own properties and that we believe provide genuine value. Affiliate
                relationships do not influence our educational content or recommendations.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">9. No Professional Advice</h2>
              <p>
                SpokeBnB provides educational content about short-term rental business
                optimization. Nothing in our Services constitutes professional financial,
                investment, legal, tax, or real estate advice. You are solely responsible for
                your own business and investment decisions. We recommend consulting with
                licensed professionals for specific financial, legal, or real estate matters.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">10. Limitation of Liability</h2>
              <p className="mb-3">
                To the maximum extent permitted by applicable law:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Our total liability for any claim related to our Services shall not exceed the
                  amount you paid for the specific Service giving rise to the claim</li>
                <li>We shall not be liable for any indirect, incidental, special, consequential,
                  or punitive damages, including but not limited to loss of revenue, profits,
                  business opportunities, or data</li>
                <li>We are not liable for business decisions you make based on course content</li>
                <li>We are not responsible for the performance, availability, or actions of any
                  third-party tools, platforms, or services mentioned in our curriculum</li>
              </ul>
            </div>

            {/* 11 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">11. Dispute Resolution &amp; Arbitration</h2>
              <p className="mb-3">
                Any dispute, claim, or controversy arising out of or relating to these Terms or
                our Services shall be resolved through <strong>binding arbitration</strong> in
                accordance with the rules of the American Arbitration Association. Arbitration
                shall take place in the State of Florida. You agree that:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>All disputes will be resolved on an individual basis</li>
                <li>You waive any right to participate in a class action lawsuit or class-wide
                  arbitration</li>
                <li>The arbitrator&apos;s decision shall be final and binding</li>
                <li>Judgment on the arbitration award may be entered in any court of competent
                  jurisdiction</li>
              </ul>
            </div>

            {/* 12 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">12. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your access to our Services at any
                time, with or without notice, for conduct that we believe violates these Terms,
                is harmful to other users, or is otherwise objectionable. In the event of
                termination for violation of these Terms, no refund will be issued.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the
                State of Florida, without regard to its conflict of law principles.
              </p>
            </div>

            {/* 14 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">14. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be posted on
                this page with an updated &quot;Last updated&quot; date. Your continued use of our
                Services after changes are posted constitutes acceptance of the revised Terms.
              </p>
            </div>

            {/* 15 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">15. Contact</h2>
              <p>
                For questions about these Terms, contact us at:{' '}
                <strong>ben@spokebnb.com</strong>
              </p>
              <p className="mt-2">
                Barefoot Realty &amp; Investments LLC
                <br />
                Florida, United States
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
