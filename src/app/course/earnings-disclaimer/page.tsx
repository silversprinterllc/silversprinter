import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'

export const metadata = {
  title: 'Earnings Disclaimer | RevenuePerNight',
  description: 'Earnings disclaimer and affiliate disclosure for RevenuePerNight.',
}

export default function EarningsDisclaimerPage() {
  return (
    <main>
      <Header />

      <section className="pt-32 pb-16 sm:pb-20 lg:pb-28 bg-[var(--sf-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mb-2">
            Earnings Disclaimer
          </h1>
          <p className="text-sm text-[var(--sf-navy)]/40 mb-10">
            Last updated: March 30, 2026
          </p>

          <div className="prose prose-slate max-w-none text-[var(--sf-navy)]/70 text-sm leading-relaxed space-y-8">
            {/* Main Disclaimer */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                No Earnings Guarantees
              </h2>
              <div className="bg-white rounded-xl border border-[var(--sf-navy)]/10 p-6">
                <p className="mb-3">
                  The revenue figures, cap rates, NOI projections, and financial data shared
                  throughout our marketing materials, sales pages, and course content are based
                  on <strong>our actual properties</strong> — specifically Lakeside Landing FLX
                  (a luxury lakefront property in the Finger Lakes, NY) and Smooth Sailing (a
                  mid-range vacation rental in the Finger Lakes, NY).
                </p>
                <p className="mb-3">
                  <strong>Live Case Study Notice:</strong> The primary case study used throughout
                  this course — Lakeside Landing FLX on Seneca Lake, NY — is the instructor&apos;s own
                  property. Revenue figures cited reflect the property at various points in time
                  including acquisition, and are used to illustrate system architecture and
                  potential, not to represent current or typical student outcomes. The
                  property&apos;s direct booking system is currently being rebuilt and documented in
                  real time. All forward-looking revenue figures are projections based on system
                  design, not guaranteed results.
                </p>
                <p className="font-semibold text-[var(--sf-navy)]">
                  These results are illustrative examples only. They are not typical and are
                  not guaranteed. Your results will vary.
                </p>
              </div>
            </div>

            {/* Factors */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Factors That Affect Results
              </h2>
              <p className="mb-3">
                Individual results depend on numerous factors, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Property type, location, condition, and amenities</li>
                <li>Local market conditions, competition, and seasonality</li>
                <li>Your pricing strategy and implementation quality</li>
                <li>Time, effort, and consistency applied to the strategies taught</li>
                <li>Prior experience and business knowledge</li>
                <li>Economic conditions, regulatory environment, and travel trends</li>
                <li>The tools and technology you choose to implement</li>
                <li>Your ability to invest in recommended software and services</li>
              </ul>
            </div>

            {/* Not Advice */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Not Professional Advice
              </h2>
              <p>
                RevenuePerNight is an educational program. Nothing in our courses, coaching
                sessions, templates, calculators, or any other materials constitutes
                professional financial, investment, legal, tax, or real estate advice. All
                content is for educational purposes only. You are solely responsible for your
                own business and investment decisions. We strongly recommend consulting with
                licensed professionals — including accountants, attorneys, financial advisors,
                and licensed real estate professionals — before making significant business or
                investment decisions.
              </p>
            </div>

            {/* Property Acquisition */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Property Acquisition Disclaimer
              </h2>
              <p>
                Module 10 (&quot;The Barefoot Advantage&quot;) discusses real estate investment
                strategies and property acquisition. Barefoot Realty &amp; Investments is a
                licensed real estate brokerage in the State of Florida. Any references to
                property acquisition, market analysis, or investment strategies within the course
                are educational in nature. Specific property transactions, if pursued, would be
                conducted under separate real estate agreements with appropriate disclosures as
                required by Florida law.
              </p>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Testimonials &amp; Case Studies
              </h2>
              <p>
                Any testimonials, case studies, or success stories shared on our website or
                within our course materials represent the experiences of specific individuals.
                These results are not guaranteed and should not be interpreted as typical. We
                do not imply that you will achieve similar results. Each student&apos;s experience
                will depend on the factors outlined above.
              </p>
            </div>

            {/* Affiliate */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Affiliate Disclosure
              </h2>
              <p className="mb-3">
                Our course materials contain affiliate links to third-party tools and services
                that we recommend. When you purchase through these links, we may earn a
                commission at no additional cost to you. These affiliate relationships include
                but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Property management software (Hostaway, Hospitable, Lodgify, OwnerRez)</li>
                <li>Dynamic pricing tools (PriceLabs, Beyond Pricing)</li>
                <li>Guest WiFi capture (StayFi)</li>
                <li>Market research (AirDNA)</li>
                <li>Cleaning management (Turno)</li>
                <li>Digital guidebooks (TouchStay, Hostfully)</li>
                <li>Website and booking platforms (Lodgify, OwnerRez)</li>
                <li>Experience marketplaces (Viator)</li>
              </ul>
              <p className="mt-3">
                We only recommend tools and services that we actively use in our own properties.
                Affiliate relationships do not influence our educational content or
                recommendations. If a free or lower-cost alternative is better for your
                situation, we will say so.
              </p>
            </div>

            {/* Forward-Looking */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">
                Forward-Looking Statements
              </h2>
              <p>
                Any projections, revenue targets, or financial estimates presented in our
                materials are forward-looking statements based on our experience, market research,
                and assumptions that we believe to be reasonable. Forward-looking statements are
                inherently uncertain and actual results may differ materially. We make no
                representation or warranty as to the accuracy or completeness of any projection.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">Contact</h2>
              <p>
                Questions about this disclaimer: <strong>support@revenuepernight.com</strong>
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
