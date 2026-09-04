import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Sterling Route',
  description: 'How Sterling Route LLC collects, uses, and protects your personal information. Covers bookings, payments, and communications.',
}

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 border-b border-[#433d38]/50">
      <div className="flex items-start gap-6">
        <span className="text-xs tracking-[0.2em] text-[#433d38] font-mono mt-1.5 shrink-0 w-8">
          {String(number).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-5">{title}</h2>
          <div className="space-y-4 text-[#a09890] text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* PAGE HEADER */}
      <div className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Last Updated March 2026</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6">
            Privacy Policy
          </h1>
          <p className="text-[#5f5850] text-base leading-relaxed max-w-xl">
            Sterling Route LLC takes your privacy seriously. This policy explains what we collect, how we use it, and who we share it with — in plain terms.
          </p>
        </div>
      </div>

      <div className="h-px bg-[#c9a96e]/20 max-w-3xl mx-auto" />

      <div className="max-w-3xl mx-auto px-6">

        <Section number={1} title="Who We Are">
          <p>
            Sterling Route LLC is a luxury van rental business operating in Palm Beach County, Florida. Our website is sterlingroute.com and our contact email is{' '}
            <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
              hello@sterlingroute.com
            </a>
            .
          </p>
          <p>
            Sterling Route is part of the Hoadley Group. Questions about this privacy policy may be directed to the email address above.
          </p>
        </Section>

        <Section number={2} title="What We Collect">
          <p>We collect the following categories of personal information:</p>
          <ul className="space-y-2 mt-3">
            {[
              'Full name, email address, and phone number — provided when you inquire, book, or apply for membership.',
              'Payment information — processed by Stripe, Inc. We never store card numbers or full payment credentials on our servers.',
              'Booking details — dates, party size, destination, special requests, and trip preferences.',
              'Sterling Reserve membership information — tier, preferences, trip history, and communication preferences.',
              'IP address and browser type — collected automatically via our hosting infrastructure (Vercel) for security and analytics purposes.',
              'Cookies — used for essential site function and anonymous traffic analytics. See Section 6.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#c9a96e]/50 mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section number={3} title="How We Use It">
          <p>We use your personal information to:</p>
          <ul className="space-y-2 mt-3">
            {[
              'Process and confirm bookings and collect deposits and final balances.',
              'Send booking confirmations, pre-trip instructions, and post-trip receipts.',
              'Respond to inquiries submitted through the contact form or by email.',
              'Manage Sterling Reserve memberships, including preference profiles and trip coordination.',
              'Enforce the Rental Agreement and Sterling Reserve Terms of Service.',
              'Improve the site and our service based on aggregate usage patterns.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#c9a96e]/50 mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            We do not sell your data. We do not use your personal information for targeted advertising.
          </p>
        </Section>

        <Section number={4} title="Stripe">
          <p>
            All payment processing is handled by Stripe, Inc. When you complete a booking or deposit payment, you submit your payment information directly to Stripe through a secure embedded interface. We transmit your name, email address, and booking amount to Stripe to process the transaction.
          </p>
          <p>
            We do not store credit card numbers, CVV codes, or full card data on our servers at any time. Stripe&apos;s own privacy policy governs how they handle your payment data. You can review it at{' '}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors"
            >
              stripe.com/privacy
            </a>
            .
          </p>
        </Section>

        <Section number={5} title="Email Communications">
          <p>
            We use Resend to send transactional emails — including booking confirmations, pre-trip instructions, and payment receipts. These communications are sent only in connection with your bookings or inquiries.
          </p>
          <p>
            We do not send marketing or promotional emails without your explicit consent. If you consent to marketing communications during the booking or membership process, you may opt out at any time by emailing{' '}
            <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
              hello@sterlingroute.com
            </a>{' '}
            with the subject line &ldquo;Unsubscribe.&rdquo;
          </p>
        </Section>

        <Section number={6} title="Cookies">
          <p>
            We use essential cookies necessary for the site to function — including session management and security tokens. We also collect anonymous analytics data (page views, session duration, general geographic region) to understand how the site is used.
          </p>
          <p>
            We do not use tracking cookies for advertising. We do not sell data to ad networks or third-party marketers. You may disable cookies in your browser settings; essential site functions may be affected.
          </p>
        </Section>

        <Section number={7} title="Data Sharing">
          <p>We do not sell your personal data. We share it only with the following service providers, strictly for the purposes described:</p>
          <ul className="space-y-3 mt-3">
            {[
              { name: 'Stripe, Inc.', purpose: 'Payment processing. Governed by Stripe\'s own privacy policy.' },
              { name: 'Resend', purpose: 'Transactional email delivery. Your email address and booking-related content only.' },
              { name: 'Vercel', purpose: 'Website hosting and infrastructure. Vercel may log IP addresses and request data per their privacy policy.' },
              { name: 'Supabase', purpose: 'Database hosting. Booking records, member profiles, and inquiry data are stored in a Supabase-hosted database.' },
            ].map((item) => (
              <li key={item.name} className="flex items-start gap-3">
                <span className="text-[#c9a96e]/50 mt-0.5 shrink-0">—</span>
                <span><span className="text-[#f0e6d0]">{item.name}</span> — {item.purpose}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            We may disclose personal information if required by law, court order, or valid legal process. We will attempt to notify you if permitted by law.
          </p>
        </Section>

        <Section number={8} title="Data Retention">
          <p>
            Booking records and associated personal data are retained for a minimum of 7 years in accordance with Florida business records requirements. This includes names, contact information, booking dates, and payment records.
          </p>
          <p>
            Non-transactional data — such as inquiry messages that did not result in a booking — is retained for up to 12 months. You may request deletion of non-transactional data at any time by emailing{' '}
            <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
              hello@sterlingroute.com
            </a>
            .
          </p>
        </Section>

        <Section number={9} title="Your Rights">
          <p>
            You have the right to request access to, correction of, or deletion of your personal data that we hold. To exercise any of these rights, email{' '}
            <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
              hello@sterlingroute.com
            </a>{' '}
            with the subject line &ldquo;Data Request&rdquo; and describe your request. We respond within 30 days.
          </p>
          <p>
            If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we have collected about you and the right to request deletion. To exercise these rights, use the same contact above.
          </p>
          <p>
            We do not sell personal information, and therefore no opt-out of sale is applicable.
          </p>
        </Section>

        <Section number={10} title="Children">
          <p>
            Sterling Route&apos;s services are available only to persons 25 years of age or older, as required by our Rental Agreement. We do not knowingly collect personal information from anyone under 18. If we become aware that a person under 18 has submitted personal data, we will delete it promptly.
          </p>
        </Section>

        <Section number={11} title="Changes">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. Material changes will be noted at the top of this page with a new &ldquo;Last Updated&rdquo; date. Continued use of the site after a material change constitutes acceptance of the updated policy.
          </p>
          <p>
            Non-material changes (such as formatting updates or clarifications that do not alter the substance of our practices) may be made without specific notice.
          </p>
        </Section>

        <Section number={12} title="Contact">
          <p>Questions, requests, or concerns about this Privacy Policy:</p>
          <div className="mt-4 p-5 border border-[#433d38]/50 bg-[#0f0e0c] space-y-1">
            <p>
              <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
                hello@sterlingroute.com
              </a>
            </p>
            <p>Sterling Route LLC</p>
            <p>Palm Beach County, FL 33411</p>
          </div>
        </Section>

      </div>

      <div className="py-12 px-6 text-center">
        <p className="text-xs text-[#433d38]">
          © {new Date().getFullYear()} Sterling Route LLC. All rights reserved.
        </p>
      </div>

    </div>
  )
}
