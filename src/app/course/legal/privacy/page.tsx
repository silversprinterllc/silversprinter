// LEGAL DISCLAIMER: This document is a template. It must be reviewed by a licensed attorney
// before being published or used to take payments. Last updated: April 2026.

import type { Metadata } from 'next'
import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | {{BRAND_NAME}}',
  description:
    'How {{BRAND_NAME}} collects, uses, and protects your data. Our commitments under CCPA, GDPR, and general privacy law.',
  alternates: { canonical: '/course/legal/privacy' },
  robots: { index: true, follow: true },
}

const sections = [
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'third-parties', label: 'Third-Party Service Providers' },
  { id: 'cookies', label: 'Cookies & Tracking Technologies' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Privacy Rights' },
  { id: 'california', label: 'California Privacy Rights (CCPA/CPRA)' },
  { id: 'eu-uk', label: 'EU & UK Privacy Rights (GDPR)' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'international', label: 'International Data Transfers' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
]

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-[var(--sf-navy)]/50 text-sm mb-10">
            Last Updated: April 2026
          </p>

          {/* Table of Contents */}
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
            <section id="who-we-are">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                1. Who We Are
              </h2>
              <p className="mb-4">
                {`{{BRAND_NAME}}`} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
                an educational platform providing training, tools, and coaching for
                short-term rental operators. We are based in the State of Florida,
                United States. This Privacy Policy explains how we collect, use,
                disclose, and protect personal information when you visit our
                website, create an account, purchase our products, or interact with
                our services.
              </p>
              <p>
                By using our website or services, you agree to the practices
                described in this Privacy Policy. If you do not agree, please do
                not use our services.
              </p>
            </section>

            <section id="information-we-collect">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-lg font-semibold text-[var(--sf-navy)] mb-2">
                a. Information You Provide Directly
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-5">
                <li>
                  <strong>Account information:</strong> name, email address, and
                  password when you register or purchase a product.
                </li>
                <li>
                  <strong>Billing information:</strong> billing address and
                  transaction details. Full payment-card numbers are processed and
                  stored exclusively by Stripe; we never see, store, or have access
                  to your full card number.
                </li>
                <li>
                  <strong>Communications:</strong> information you share when
                  contacting support, responding to surveys, or posting in our
                  community spaces.
                </li>
                <li>
                  <strong>Course activity:</strong> lesson completions, homework
                  submissions, worksheet uploads, and community posts.
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--sf-navy)] mb-2">
                b. Information Collected Automatically
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-5">
                <li>
                  <strong>Device & usage data:</strong> IP address, browser type,
                  operating system, referring URLs, pages visited, and timestamps.
                </li>
                <li>
                  <strong>Cookies and similar technologies:</strong> see
                  &quot;Cookies &amp; Tracking Technologies&quot; below.
                </li>
                <li>
                  <strong>Analytics data:</strong> aggregated behavior via Google
                  Analytics and similar tools.
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--sf-navy)] mb-2">
                c. Information from Third Parties
              </h3>
              <p>
                We may receive information from payment processors, email-service
                providers, affiliate partners, and single-sign-on providers (for
                example, &quot;Sign in with Google&quot;).
              </p>
            </section>

            <section id="how-we-use">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>deliver course access, fulfill purchases, and provide customer support;</li>
                <li>send transactional communications (receipts, course updates, login notices);</li>
                <li>send marketing emails about new offers, events, and tools (you may unsubscribe at any time);</li>
                <li>improve our website, products, and services through analytics;</li>
                <li>prevent fraud, enforce our Terms of Service, and protect our legal rights;</li>
                <li>comply with legal obligations.</li>
              </ul>
            </section>

            <section id="third-parties">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                4. Third-Party Service Providers
              </h2>
              <p className="mb-4">
                We share limited personal information with trusted service
                providers who help us operate our business. These providers are
                contractually required to protect your information and use it only
                for the purposes we specify.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Stripe</strong> &mdash; payment processing and
                  subscription management.
                </li>
                <li>
                  <strong>Kajabi</strong> &mdash; course hosting, member login,
                  and content delivery.
                </li>
                <li>
                  <strong>Kit (ConvertKit)</strong> &mdash; email marketing and
                  automation.
                </li>
                <li>
                  <strong>Google Analytics</strong> &mdash; website traffic and
                  behavior analytics.
                </li>
                <li>
                  <strong>Customer support, hosting, and email-delivery vendors</strong>
                  &mdash; as required for service operations.
                </li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                5. Cookies &amp; Tracking Technologies
              </h2>
              <p className="mb-4">
                We use cookies, pixels, and similar technologies to remember your
                preferences, keep you signed in, measure traffic, and support
                marketing. You can control cookies through your browser settings
                and, where applicable, our on-site cookie preference tool.
                Disabling certain cookies may affect site functionality.
              </p>
              <p>
                We may use retargeting pixels from platforms such as Meta and
                Google so our advertisements can reach people who have visited
                our site. You may opt out of interest-based advertising through
                the Digital Advertising Alliance at{' '}
                <a
                  href="https://optout.aboutads.info"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  optout.aboutads.info
                </a>
                .
              </p>
            </section>

            <section id="data-retention">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                6. Data Retention
              </h2>
              <p>
                We retain personal information for as long as your account is
                active, as needed to provide our services, and as required to
                comply with legal obligations, resolve disputes, and enforce our
                agreements. Transactional records are typically retained for at
                least seven (7) years to meet tax and accounting requirements.
              </p>
            </section>

            <section id="data-security">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                7. Data Security
              </h2>
              <p>
                We use industry-standard administrative, technical, and physical
                safeguards to protect your information, including encryption in
                transit (TLS), encrypted data at rest where appropriate, access
                controls, and vendor due-diligence. No method of transmission or
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section id="your-rights">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                8. Your Privacy Rights
              </h2>
              <p className="mb-3">
                Subject to applicable law, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>access the personal information we hold about you;</li>
                <li>correct inaccurate or incomplete information;</li>
                <li>request deletion of your personal information;</li>
                <li>request a portable copy of your data;</li>
                <li>object to or restrict certain processing;</li>
                <li>withdraw previously given consent.</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, email{' '}
                <a
                  href="mailto:privacy@spokebnb.com"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  privacy@spokebnb.com
                </a>
                . We will respond within the time required by applicable law
                (typically 30&ndash;45 days). We may need to verify your identity
                before fulfilling a request.
              </p>
            </section>

            <section id="california">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                9. California Privacy Rights (CCPA/CPRA)
              </h2>
              <p className="mb-3">
                California residents have additional rights under the California
                Consumer Privacy Act, as amended by the CPRA, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>the right to know what personal information we collect, use, disclose, and sell or share;</li>
                <li>the right to delete personal information collected from you;</li>
                <li>the right to correct inaccurate personal information;</li>
                <li>the right to opt out of the sale or sharing of personal information;</li>
                <li>the right to limit the use of sensitive personal information;</li>
                <li>the right to non-discrimination for exercising your rights.</li>
              </ul>
              <p className="mt-4">
                We do not sell personal information for money. To the extent our
                advertising cookies constitute &quot;sharing&quot; under
                California law, you may opt out by emailing{' '}
                <a
                  href="mailto:privacy@spokebnb.com"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  privacy@spokebnb.com
                </a>
                .
              </p>
            </section>

            <section id="eu-uk">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                10. EU &amp; UK Privacy Rights (GDPR)
              </h2>
              <p className="mb-3">
                If you are located in the European Economic Area, United Kingdom,
                or Switzerland, our legal bases for processing are:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contract:</strong> to deliver the products and services
                  you purchase.
                </li>
                <li>
                  <strong>Legitimate interests:</strong> to operate and improve
                  our business, prevent fraud, and communicate with customers.
                </li>
                <li>
                  <strong>Consent:</strong> for marketing emails and non-essential
                  cookies; you may withdraw consent at any time.
                </li>
                <li>
                  <strong>Legal obligation:</strong> to comply with tax,
                  accounting, and regulatory requirements.
                </li>
              </ul>
              <p className="mt-4">
                You have the right to lodge a complaint with your local data
                protection authority.
              </p>
            </section>

            <section id="children">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                11. Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed to children under 13, and we do not
                knowingly collect personal information from children under 13. If
                you believe a child has provided personal information to us,
                please contact{' '}
                <a
                  href="mailto:privacy@spokebnb.com"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  privacy@spokebnb.com
                </a>{' '}
                and we will delete it promptly.
              </p>
            </section>

            <section id="international">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                12. International Data Transfers
              </h2>
              <p>
                We are based in the United States, and your information may be
                processed in the United States and other countries whose data
                protection laws differ from those in your country of residence.
                Where required by law, we use Standard Contractual Clauses or
                other approved transfer mechanisms.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                13. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will post
                the revised policy on this page and update the &quot;Last
                Updated&quot; date. Material changes will be communicated by
                email or a conspicuous notice on our website.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                14. Contact Us
              </h2>
              <p>
                For questions or privacy requests, email{' '}
                <a
                  href="mailto:privacy@spokebnb.com"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  privacy@spokebnb.com
                </a>
                . You may also contact us via the support address listed on the{' '}
                <a
                  href="/course"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  course page
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
