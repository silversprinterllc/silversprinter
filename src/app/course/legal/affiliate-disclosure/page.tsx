import type { Metadata } from 'next'
import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | SpokeBnB',
  description:
    'Our FTC-compliant disclosure of affiliate partnerships and commissions earned on tool recommendations.',
  alternates: { canonical: '/course/legal/affiliate-disclosure' },
  robots: { index: true, follow: true },
}

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'how-we-earn', label: 'How We Earn Commissions' },
  { id: 'no-cost', label: 'No Additional Cost to You' },
  { id: 'only-we-use', label: 'We Only Recommend Tools We Use' },
  { id: 'identification', label: 'How Affiliate Links Are Identified' },
  { id: 'independence', label: 'Editorial Independence' },
  { id: 'partners', label: 'Current Affiliate Partners' },
  { id: 'changes', label: 'Right to Change Recommendations' },
  { id: 'your-choice', label: 'Your Choice' },
  { id: 'contact', label: 'Contact' },
]

export default function AffiliateDisclosurePage() {
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
            Affiliate Disclosure
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
                This Affiliate Disclosure is provided in accordance with the
                Federal Trade Commission&apos;s (FTC) 16 C.F.R. Part 255
                guidelines on endorsements, testimonials, and material
                connections. We believe in transparency: you should know when
                a recommendation could earn us money, so you can weigh that
                when making your own decisions.
              </p>
            </section>

            <section id="how-we-earn">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                2. How We Earn Commissions
              </h2>
              <p>
                {`SpokeBnB`} participates in affiliate and partner
                programs with several short-term rental software vendors, tool
                providers, and service companies. When you click a link on our
                website, in our emails, or in our course materials, and
                subsequently subscribe to or purchase a product through that
                link, we may receive a commission, referral fee, or revenue
                share from the vendor. These commissions help fund our
                business, content, and student support.
              </p>
            </section>

            <section id="no-cost">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                3. No Additional Cost to You
              </h2>
              <p>
                The commissions we earn <strong>do not increase the price
                you pay</strong>. In many cases, our affiliate links actually
                provide a discount, extended trial, or exclusive bonus from
                the vendor. You pay the same price (or less) as you would
                buying directly from the vendor.
              </p>
            </section>

            <section id="only-we-use">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                4. We Only Recommend Tools We Use
              </h2>
              <p>
                We only recommend tools and services that we actively use (or
                have used) in our own short-term rental properties, including{' '}
                <em>Lakeside Landing FLX</em> and <em>Smooth Sailing</em>. If
                a product is not good enough for our own operations, we do not
                recommend it, regardless of the commission rate offered.
              </p>
            </section>

            <section id="identification">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                5. How Affiliate Links Are Identified
              </h2>
              <p className="mb-4">
                We identify material connections in the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>a link, banner, or section labeled &quot;affiliate,&quot; &quot;partner,&quot; or &quot;sponsored&quot;;</li>
                <li>inline disclosure such as &quot;(affiliate)&quot; adjacent to a recommended link;</li>
                <li>a general disclosure statement near the top of relevant pages;</li>
                <li>this Affiliate Disclosure page and the list of current partners below.</li>
              </ul>
              <p className="mt-4">
                If a page or lesson discusses a product with which we have an
                affiliate relationship, assume a material connection exists
                even where not separately labeled on that specific reference.
              </p>
            </section>

            <section id="independence">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                6. Editorial Independence
              </h2>
              <p>
                Our recommendations are editorially independent. We would
                recommend the same tools even without commissions. We are
                willing to say negative things about affiliate partners when
                warranted, and we will remove or update recommendations when
                a product changes in a way that no longer meets our standards.
              </p>
            </section>

            <section id="partners">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                7. Current Affiliate Partners
              </h2>
              <p className="mb-4">
                As of the last updated date, we participate in affiliate or
                partner programs with the following companies (non-exhaustive):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Hospitable</strong> &mdash; property management and STR automation</li>
                <li><strong>OwnerRez</strong> &mdash; property management system and direct booking</li>
                <li><strong>PriceLabs</strong> &mdash; dynamic pricing</li>
                <li><strong>StayFi</strong> &mdash; guest Wi-Fi and email capture</li>
                <li><strong>Turno</strong> &mdash; cleaning and turnover management</li>
                <li><strong>Minut</strong> &mdash; noise monitoring</li>
                <li><strong>Kit</strong> (formerly ConvertKit) &mdash; email marketing</li>
                <li><strong>Canva</strong> &mdash; design and creative assets</li>
                <li><strong>AirDNA</strong> &mdash; market data and analytics</li>
                <li><strong>Viator</strong> &mdash; experiences and bookable activities</li>
                <li>Additional vendors referenced in specific lessons and playbooks</li>
              </ul>
              <p className="mt-4">
                This list is updated periodically. If you would like a current
                list, email{' '}
                <a
                  href="mailto:support@spokebnb.com"
                  className="text-[var(--sf-gold)] hover:underline"
                >
                  support@spokebnb.com
                </a>
                .
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                8. Right to Change Recommendations
              </h2>
              <p>
                The tool landscape evolves rapidly. We reserve the right to
                add, remove, or replace recommended tools at any time as the
                market changes, products improve or decline, or new solutions
                emerge. Changes to our recommendations do not create any
                obligation to refund previously purchased course content that
                referenced prior tools.
              </p>
            </section>

            <section id="your-choice">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                9. Your Choice
              </h2>
              <p>
                You are never required to use our affiliate links. You may
                always search for and purchase recommended tools directly
                through the vendor&apos;s website. Your experience with the
                tool will be the same either way; using our link simply
                supports our ability to continue creating content.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-[var(--sf-navy)] mb-4">
                10. Contact
              </h2>
              <p>
                Questions about this disclosure, or a specific affiliate
                relationship? Email{' '}
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
