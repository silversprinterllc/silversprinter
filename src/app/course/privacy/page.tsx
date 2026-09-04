import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'

export const metadata = {
  title: 'Privacy Policy | SpokeBnB',
  description: 'Privacy Policy for the SpokeBnB platform and services.',
}

export default function PrivacyPage() {
  return (
    <main>
      <Header />

      <section className="pt-32 pb-16 sm:pb-20 lg:pb-28 bg-[var(--sf-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--sf-navy)]/40 mb-10">
            Last updated: March 30, 2026
          </p>

          <div className="prose prose-slate max-w-none text-[var(--sf-navy)]/70 text-sm leading-relaxed space-y-8">
            {/* 1 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">1. Who We Are</h2>
              <p>
                SpokeBnB is operated by Barefoot Realty &amp; Investments LLC
                (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                This Privacy Policy explains how we collect, use, disclose, and protect your
                personal information when you visit our website, purchase our products, or
                interact with our services.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">2. Information We Collect</h2>

              <h3 className="text-base font-semibold text-[var(--sf-navy)] mb-2">
                Information You Provide Directly
              </h3>
              <ul className="list-disc pl-6 space-y-1.5 mb-4">
                <li><strong>Account information:</strong> Name, email address when you create an account or purchase</li>
                <li><strong>Purchase information:</strong> Billing address and transaction details (credit card numbers are processed and stored exclusively by Stripe — we never see, store, or have access to your full card number)</li>
                <li><strong>Communication:</strong> Information you provide when contacting support, joining our community, or responding to surveys</li>
                <li><strong>Course activity:</strong> Lesson completions, homework submissions, and community posts</li>
              </ul>

              <h3 className="text-base font-semibold text-[var(--sf-navy)] mb-2">
                Information Collected Automatically
              </h3>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Device information:</strong> Browser type, operating system, device type</li>
                <li><strong>Usage data:</strong> Pages visited, time spent on site, click patterns</li>
                <li><strong>IP address:</strong> Used for analytics, security, and approximate geographic location</li>
                <li><strong>Cookies:</strong> Small text files stored on your device to improve your experience (see Section 7)</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>To deliver and manage your purchased course content and services</li>
                <li>To process payments (via Stripe — we do not handle card data)</li>
                <li>To send transactional emails (purchase confirmations, login details, course updates)</li>
                <li>To send marketing communications (only with your consent — you can unsubscribe anytime)</li>
                <li>To improve our website, course content, and user experience</li>
                <li>To respond to your support requests and communications</li>
                <li>To prevent fraud and protect the security of our platform</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">4. Third-Party Services</h2>
              <p className="mb-3">
                We use the following third-party services that may receive your data in order
                to provide our Services:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Stripe</strong> — Payment processing (PCI Level 1 certified). Stripe&apos;s privacy policy: stripe.com/privacy</li>
                <li><strong>Course platform (Kajabi/Teachable)</strong> — Course hosting, account management, content delivery</li>
                <li><strong>Email service provider</strong> — Transactional and marketing emails (you can unsubscribe at any time)</li>
                <li><strong>Google Analytics</strong> — Website usage analytics (anonymized data)</li>
                <li><strong>Slack/Discord</strong> — Community and cohort communication (if you join voluntarily)</li>
                <li><strong>Vercel</strong> — Website hosting</li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or trade your personal information to third parties
                for their marketing purposes.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">5. Payment Security</h2>
              <p>
                All payment transactions are processed through <strong>Stripe</strong>, which is
                PCI Level 1 certified — the highest level of security certification in the
                payments industry. We <strong>never</strong> see, store, process, or have access
                to your full credit card number, CVV, or other sensitive payment credentials.
                Your payment information is encrypted and transmitted directly to Stripe&apos;s
                secure servers.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">6. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as
                needed to provide Services. If you request account deletion, we will delete your
                personal data within 30 days, except where we are required to retain information
                for legal, accounting, or fraud prevention purposes.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">7. Cookies</h2>
              <p className="mb-3">We use cookies for:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Essential cookies:</strong> Required for the website and course platform to function (login sessions, cart state)</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site (Google Analytics)</li>
                <li><strong>Marketing cookies:</strong> Used for retargeting advertisements (only with your consent)</li>
              </ul>
              <p className="mt-3">
                You can disable cookies through your browser settings, though this may affect
                website functionality.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">8. Your Rights</h2>
              <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Access</strong> the personal data we hold about you</li>
                <li><strong>Correct</strong> inaccurate personal data</li>
                <li><strong>Delete</strong> your personal data (&quot;right to be forgotten&quot;)</li>
                <li><strong>Port</strong> your data to another service</li>
                <li><strong>Opt out</strong> of marketing communications at any time</li>
                <li><strong>Withdraw consent</strong> for data processing where consent is the legal basis</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email us at{' '}
                <strong>ben@spokebnb.com</strong>. We will respond within 30 days.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">9. California Residents (CCPA)</h2>
              <p>
                If you are a California resident, you have additional rights under the California
                Consumer Privacy Act (CCPA), including the right to know what personal information
                we collect, the right to request deletion, and the right to opt out of the sale
                of personal information. We do not sell personal information. To make a CCPA
                request, email <strong>ben@spokebnb.com</strong>.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">10. Children&apos;s Privacy</h2>
              <p>
                Our Services are not directed to individuals under the age of 18. We do not
                knowingly collect personal information from children. If we learn that we have
                collected personal information from a child under 18, we will delete that
                information promptly.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">11. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your
                personal information, including SSL/TLS encryption for data in transit, secure
                hosting infrastructure, and access controls. However, no method of transmission
                or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* 12 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on
                this page with an updated date. We encourage you to review this page periodically.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--sf-navy)] mb-3">13. Contact</h2>
              <p>
                For privacy-related questions or requests:{' '}
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
