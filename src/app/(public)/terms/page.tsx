import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — Sterling Route',
  description: 'Terms governing use of the sterlingroute.com website. Separate from the Rental Agreement and Sterling Reserve Terms of Service.',
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

export default function TermsPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* PAGE HEADER */}
      <div className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Last Updated March 2026</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6">
            Terms of Use
          </h1>
          <p className="text-[#5f5850] text-base leading-relaxed max-w-xl">
            These terms govern your use of the sterlingroute.com website. Rental bookings and Sterling Reserve membership are governed by separate agreements linked below.
          </p>
        </div>
      </div>

      <div className="h-px bg-[#c9a96e]/20 max-w-3xl mx-auto" />

      <div className="max-w-3xl mx-auto px-6">

        <Section number={1} title="Acceptance">
          <p>
            By accessing or using sterlingroute.com (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use the Site.
          </p>
          <p>
            These Terms of Use apply to all visitors, users, and others who access the Site. They do not replace or supersede the Sterling Route Rental Agreement or the Sterling Reserve Terms of Service, which govern their respective subject matters independently.
          </p>
        </Section>

        <Section number={2} title="Use of Site">
          <p>
            The Site is provided for personal, non-commercial use to learn about Sterling Route services, submit booking inquiries, and access information about Sterling Reserve membership.
          </p>
          <p>The following uses are strictly prohibited:</p>
          <ul className="space-y-2 mt-3">
            {[
              'Scraping, crawling, or automated data harvesting of any kind.',
              'Using the Site or its content for competitive intelligence, price monitoring, or market research without written permission.',
              'Impersonating Sterling Route, its principals, or any other person or entity.',
              'Submitting false or misleading information in booking inquiries or contact forms.',
              'Attempting to gain unauthorized access to any part of the Site or its infrastructure.',
              'Transmitting malware, spam, or any content that could damage, disable, or impair the Site.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#c9a96e]/50 mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section number={3} title="Intellectual Property">
          <p>
            All content on this Site — including but not limited to text, copy, photography, design, branding, the &ldquo;Sterling Route&rdquo; name and mark, and all page layouts — is the property of Sterling Route LLC and is protected by applicable copyright and trademark law.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works from, publicly display, or otherwise exploit any content from this Site without the prior written permission of Sterling Route LLC. Brief quotation for editorial, critical, or informational purposes may be permissible; contact{' '}
            <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
              hello@sterlingroute.com
            </a>{' '}
            to request permission.
          </p>
        </Section>

        <Section number={4} title="Booking Terms">
          <p>
            Bookings made through this Site are governed in full by the{' '}
            <Link href="/rental-terms" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
              Sterling Route Rental Agreement
            </Link>
            , which you acknowledge and accept at the time of deposit payment. These Terms of Use do not replace, modify, or supersede the Rental Agreement in any respect.
          </p>
          <p>
            In the event of a conflict between these Terms of Use and the Rental Agreement regarding a rental transaction, the Rental Agreement controls.
          </p>
        </Section>

        <Section number={5} title="Membership Terms">
          <p>
            Sterling Reserve membership is governed by the{' '}
            <Link href="/sterling-reserve/tos" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
              Sterling Reserve Terms of Service
            </Link>
            , which you accept at the time of membership enrollment. These Terms of Use do not replace, modify, or supersede the Sterling Reserve Terms of Service in any respect.
          </p>
        </Section>

        <Section number={6} title="Accuracy of Information">
          <p>
            We make reasonable efforts to keep rates, availability, descriptions, and other information on this Site accurate and up to date. However, we do not warrant that all information is complete, current, or error-free at all times.
          </p>
          <p>
            Sterling Route LLC reserves the right to correct errors, inaccuracies, or omissions at any time without notice. Published rates and availability are subject to change. Confirmed rates are those set at the time of deposit payment under a signed or accepted Rental Agreement.
          </p>
        </Section>

        <Section number={7} title="Third-Party Links">
          <p>
            This Site may contain links to third-party websites or services, including but not limited to Stripe (payments), Roamly (insurance), Outdoorsy, and other partners or resources. These links are provided for convenience only.
          </p>
          <p>
            Sterling Route LLC has no control over the content, privacy practices, or availability of third-party sites and is not responsible for any harm or damages arising from your use of those sites. Linking does not imply endorsement.
          </p>
        </Section>

        <Section number={8} title="Disclaimer">
          <p>
            The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            Sterling Route LLC does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. You use the Site at your own risk.
          </p>
        </Section>

        <Section number={9} title="Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, Sterling Route LLC&apos;s total liability for any claims arising from your use of this Site — not including claims arising from an actual rental booking or membership agreement, which are governed by their respective terms — is limited to one hundred dollars ($100).
          </p>
          <p>
            Sterling Route LLC is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Site, even if we have been advised of the possibility of such damages.
          </p>
        </Section>

        <Section number={10} title="Governing Law">
          <p>
            These Terms of Use are governed by the laws of the State of Florida, without regard to conflict of law principles. The parties consent to personal jurisdiction in Palm Beach County, Florida.
          </p>
          <p>
            Any dispute arising from these Terms of Use that cannot be resolved informally will be submitted to binding arbitration under the Commercial Arbitration Rules of the American Arbitration Association, with proceedings held in Palm Beach County, Florida. The prevailing party shall be entitled to recover reasonable attorneys&apos; fees.
          </p>
          <p>
            You waive any right to participate in a class action lawsuit or class-wide arbitration related to any claim arising from your use of this Site.
          </p>
        </Section>

        <Section number={11} title="Contact">
          <p>Questions about these Terms of Use:</p>
          <div className="mt-4 p-5 border border-[#433d38]/50 bg-[#0f0e0c] space-y-1">
            <p>
              <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
                hello@sterlingroute.com
              </a>
            </p>
            <p>Sterling Route LLC</p>
            <p>Palm Beach County, FL</p>
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
