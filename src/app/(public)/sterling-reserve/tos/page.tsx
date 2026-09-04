import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sterling Reserve Membership Terms — Sterling Route',
  description: 'Terms of service for Sterling Reserve membership. Billing, included days, priority booking rights, member rates, concierge services, cancellation, and governing law.',
}

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 border-b border-[#433d38]/50">
      <div className="flex items-start gap-6">
        <span className="text-xs tracking-[0.2em] text-[#433d38] font-mono mt-1.5 shrink-0 w-8">{String(number).padStart(2, '0')}</span>
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

function Para({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

function Rule({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#c9a96e]/50 mt-0.5 shrink-0">—</span>
      <span>{children}</span>
    </div>
  )
}

export default function SterlingReserveTOSPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* PAGE HEADER */}
      <div className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Sterling Route LLC</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6">
            Sterling Reserve<br />Membership Terms
          </h1>
          <p className="text-[#5f5850] text-base leading-relaxed max-w-xl mb-4">
            These terms govern Sterling Reserve membership. They are written to be read — not buried.
          </p>
          <p className="text-xs text-[#433d38]">Effective Date: Current membership enrollment date. Palm Beach County, Florida.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">

        <Section number={1} title="Agreement">
          <Para>
            By subscribing to Sterling Reserve, the member agrees to these terms in addition to Sterling Route&apos;s general rental terms, which remain in full effect for every rental made under membership. In the event of conflict between these membership terms and the general rental terms, the more restrictive provision applies.
          </Para>
          <Para>
            Enrollment constitutes acceptance of all terms set forth herein. Continued membership following any update to these terms constitutes acceptance of the revised terms.
          </Para>
        </Section>

        <Section number={2} title="Membership Tiers and Billing">
          <Para>
            Sterling Reserve is offered in three tiers — Reserve, Gold, and Black — at the annual rates published at the time of enrollment. Membership is paid in full at enrollment. There is no monthly billing and no auto-renewal without the member&apos;s explicit confirmation.
          </Para>
          <Rule>The full annual membership fee is due at enrollment. Payment must clear before day-credits are loaded and booking access is granted.</Rule>
          <Rule>Membership runs for one calendar year from the date of enrollment.</Rule>
          <Rule>Renewal pricing will be presented to the member before expiration. Founding member rate protection (see Section 5) applies to eligible members who renew before expiration.</Rule>
          <Rule>A lapse of 60 or more days after expiration resets the member to current published pricing. Founding member rate protection does not survive a lapse.</Rule>
        </Section>

        <Section number={3} title="Day-Credits">
          <Para>
            Upon receipt of full payment, the member&apos;s account is credited with a block of day-credits corresponding to their tier: 10 credits (Reserve), 20 credits (Gold), or 36 credits (Black). Credits are loaded immediately and available for booking upon enrollment.
          </Para>
          <Rule>Day-credits expire on December 31st of the enrollment year without cash value, credit, or extension — except Black tier credits, which carry over to the following calendar year.</Rule>
          <Rule>Day-credits have no cash value. They cannot be sold, transferred, gifted, redeemed for cash, or applied to another member&apos;s account.</Rule>
          <Rule>One credit = one rental day. Credits may be used in any configuration throughout the year — a single day, a long weekend, or a consecutive multi-day rental.</Rule>
          <Rule>Credits are drawn from the account at time of confirmed booking and are not reinstated in the event of member-initiated cancellation.</Rule>
        </Section>

        <Section number={4} title="Priority Booking Rights">
          <Para>
            Priority calendar access is a core benefit of Sterling Reserve membership and is provided as described at the time of enrollment. Access windows are: 7 days before public opening (Reserve), 21 days before public opening (Gold), and first right of refusal 30 days out with full calendar visibility (Black).
          </Para>
          <Para>
            Sterling Route reserves the right to restrict calendar access during: (a) scheduled maintenance periods, (b) force majeure events, or (c) extraordinary circumstances requiring vehicle removal from service. Sterling Route will provide a minimum of 48 hours&apos; notice for planned restrictions. Emergency situations may result in shorter notice.
          </Para>
          <Para>
            Priority access does not constitute a guaranteed reservation. Reservations are confirmed only upon payment of the applicable deposit and receipt of valid insurance documentation.
          </Para>
        </Section>

        <Section number={5} title="Member Rates">
          <Para>
            Member rates apply to the primary account holder only. They may not be extended, shared, or applied to bookings made by non-members.
          </Para>
          <Rule>Member rates cannot be combined with promotional pricing, discount codes, or any other offer unless explicitly stated.</Rule>
          <Rule>Additional-day rates (beyond included days) are subject to change with 30 days&apos; written notice to active members.</Rule>
          <Rule>Founding member rate protection: Members who enroll during Year 1 of Sterling Reserve and maintain membership without a lapse of 60+ days are protected from monthly rate increases for the life of their membership. Rate protection applies to the base membership fee only — not to additional-day rates, add-on pricing, or fee schedules, which may adjust with standard notice.</Rule>
          <Rule>New members enrolling after Year 1 are not eligible for founding rate protection and are subject to current published pricing.</Rule>
        </Section>

        <Section number={6} title="Concierge Services">
          <Para>
            Concierge services are provided per tier as described at enrollment. The scope, response time targets, and included services differ by tier and are documented on the Sterling Reserve membership page.
          </Para>
          <Rule>Response time targets (24 hours for Reserve, 4 hours for Gold, same-day for Black) are operational goals, not guaranteed service levels.</Rule>
          <Rule>Trip planning, tee time coordination, hotel block assistance, and logistics support are advisory services. Sterling Route acts in a coordination capacity only.</Rule>
          <Rule>Sterling Route is not liable for the acts or failures of third-party vendors — including hotels, golf courses, restaurants, or transportation providers — that are recommended or booked through the concierge service.</Rule>
          <Rule>Concierge services are for the primary member&apos;s trips only. They may not be resold, gifted, or applied to trips organized for profit.</Rule>
        </Section>

        <Section number={7} title="Cancellation of Membership">
          <Para>
            Annual membership fees are non-refundable. Sterling Reserve is structured as an upfront commitment — day-credits are loaded immediately upon payment and are available for use from day one.
          </Para>
          <Rule>Members who wish to cancel before year-end will not receive a refund of any portion of the annual membership fee.</Rule>
          <Rule>Unused day-credits at the time of cancellation expire without cash value or credit, except as provided for Black tier carryover.</Rule>
          <Rule>Members may choose not to renew at year-end without penalty. Non-renewal requires no notice — membership simply expires.</Rule>
          <Rule>Members who re-enroll after a lapse of 60 or more days are subject to then-current published pricing. Founding member rate protection does not survive a lapse.</Rule>
        </Section>

        <Section number={8} title="Termination by Sterling Route">
          <Para>
            Sterling Route reserves the right to terminate Sterling Reserve membership immediately, without advance notice, for any of the following:
          </Para>
          <Rule>Violation of rental terms, including damage, fraud, or misrepresentation of insurance status.</Rule>
          <Rule>Abusive, threatening, or harassing behavior directed at Sterling Route staff or contractors.</Rule>
          <Rule>Misuse of concierge services, including but not limited to: requesting services outside the scope of the membership, using concierge access for commercial resale, or directing concierge resources to third-party benefit.</Rule>
          <Rule>Non-payment following the 3-day cure period described in Section 2.</Rule>
          <Para>
            In the case of termination for cause, no refund of any kind will be issued — including for unused included days, prepaid membership fees, or any portion of the current billing cycle. For terminations not for cause (e.g., business closure), Sterling Route will provide 30 days&apos; notice and a prorated refund of the unused portion of the current billing period.
          </Para>
        </Section>

        <Section number={9} title="Member Responsibilities">
          <Para>
            All general Sterling Route rental terms apply to every rental made under a Sterling Reserve membership. Membership status does not alter, waive, or supersede any renter obligation under the general terms.
          </Para>
          <Rule>The black and grey tank dump fee applies to every renter, at every tier, on every rental. There are no exceptions and no member waivers.</Rule>
          <Rule>Cleaning fees apply if the vehicle is returned below expected standard. Membership does not include complimentary cleaning.</Rule>
          <Rule>Insurance is required on every rental, regardless of membership tier. No reservation will be confirmed without valid Bonzah, RentalCover, or approved equivalent coverage.</Rule>
          <Rule>Fuel must be returned full on every rental. Failure results in actual fuel cost plus $35 service charge.</Rule>
          <Rule>Mileage overage is billed at the per-mile rate applicable to the member&apos;s tier, based on post-return odometer reading.</Rule>
        </Section>

        <Section number={10} title="Non-Transferability">
          <Para>
            Sterling Reserve membership is personal and non-transferable. It is issued to a named individual and tied to a single account.
          </Para>
          <Rule>Sharing membership credentials, included day access, or member rates with non-members constitutes material breach of these terms.</Rule>
          <Rule>Material breach under this section is grounds for immediate termination without refund.</Rule>
          <Rule>The named member must be the primary renter on every booking made under the membership. A guest may be listed as an additional driver, but the member must be present and named on the rental agreement.</Rule>
        </Section>

        <Section number={11} title="Rate Changes">
          <Para>
            Sterling Route reserves the right to adjust Sterling Reserve membership pricing for new enrollments and renewals. The following notice and protection provisions apply:
          </Para>
          <Rule>Rate changes for new members take effect on the published effective date with no minimum notice required.</Rule>
          <Rule>Rate changes for existing, non-founding members take effect with a minimum of 60 days&apos; written notice delivered to the email address on file.</Rule>
          <Rule>Founding members are exempt from base membership fee increases as described in Section 5. All other pricing (additional-day rates, fee schedule) may change with standard 60-day notice.</Rule>
        </Section>

        <Section number={12} title="Limitation of Liability">
          <Para>
            Sterling Route&apos;s total liability to a member under these terms, under the general rental terms, or arising from any event connected to membership or rental, is limited to the monthly membership fee paid for the billing cycle in which the issue arose.
          </Para>
          <Para>
            Sterling Route is not liable for: lost travel arrangements, trip cancellation costs, business losses, lost profits, or failures of third-party vendors recommended or booked through the concierge service.
          </Para>
          <Para>
            These limitations apply to the maximum extent permitted by applicable law. Nothing in these terms limits liability for gross negligence or intentional misconduct.
          </Para>
        </Section>

        <Section number={13} title="Governing Law">
          <Para>
            These terms are governed by the laws of the State of Florida, without regard to conflict of law principles. Venue is exclusively Palm Beach County, Florida.
          </Para>
          <Para>
            All disputes arising from or relating to Sterling Reserve membership shall be resolved by binding arbitration under the Commercial Arbitration Rules of the American Arbitration Association (AAA), administered in Palm Beach County, Florida. The arbitrator&apos;s decision is final and binding and may be entered as a judgment in any court of competent jurisdiction.
          </Para>
          <Para>
            Class action waiver: Members waive any right to bring or participate in a class action, class arbitration, or representative action of any kind. All disputes must be brought in an individual capacity.
          </Para>
        </Section>

        {/* CONTACT */}
        <section className="py-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">Section 14 · Contact</p>
          <div className="space-y-2 text-[#a09890]">
            <p className="font-serif text-xl text-[#f0e6d0]">Sterling Route LLC</p>
            <p>Palm Beach County, Florida</p>
            <p>
              <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
                hello@sterlingroute.com
              </a>
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/sterling-reserve" className="text-sm text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors">
              ← Back to Sterling Reserve
            </Link>
            <Link href="/rental-terms" className="text-sm text-[#5f5850] hover:text-[#a09890] transition-colors">
              General Rental Terms →
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
