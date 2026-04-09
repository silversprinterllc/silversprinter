import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rental Agreement & Terms of Use — Sterling Route',
  description: 'Complete rental agreement and terms of use for Sterling Route van rentals. Renter eligibility, insurance requirements, cancellation policy, prohibited uses, damage liability, and governing law.',
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

export default function RentalTermsPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* PAGE HEADER */}
      <div className="py-16 md:py-24 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Last Updated March 2026</p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f0e6d0] mb-6">
            Rental Agreement &amp;<br />Terms of Use
          </h1>
          <p className="text-[#5f5850] text-base leading-relaxed max-w-xl">
            Please read this agreement in full before booking. By completing your reservation and paying your deposit, you agree to all terms below.
          </p>
        </div>
      </div>

      {/* Thin gold divider */}
      <div className="h-px bg-[#c9a96e]/20 max-w-3xl mx-auto" />

      <div className="max-w-3xl mx-auto px-4 md:px-6">

        <Section number={1} title="Parties">
          <Para>
            This agreement is between Sterling Route LLC (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) and the individual completing the reservation (&ldquo;Renter&rdquo;). The Renter is solely responsible for compliance with all terms herein.
          </Para>
        </Section>

        <Section number={2} title="Vehicle">
          <Para>
            The rented vehicle is a custom Mercedes-Benz Sprinter van (&ldquo;the Vehicle&rdquo;), configured for up to 10 passengers. The Vehicle is provided as-is for self-drive use only. No driver, chauffeur, or transportation service is provided or implied. Renter assumes full operational responsibility for the Vehicle during the rental period.
          </Para>
        </Section>

        <Section number={3} title="Renter Eligibility">
          <Para>To rent the Vehicle, the Renter must:</Para>
          <Rule>Be 25 years of age or older at the time of rental</Rule>
          <Rule>Hold a valid U.S. driver&apos;s license</Rule>
          <Rule>Have no DUI, DWI, or reckless driving conviction within the past 7 years</Rule>
          <Rule>Have no more than 2 moving violations in the past 3 years</Rule>
          <Rule>Provide valid insurance through Bonzah, RentalCover, or an approved equivalent prior to departure</Rule>
          <Rule>Pass identity verification at Company&apos;s discretion</Rule>
          <Para>
            Any additional listed drivers must meet the same eligibility requirements. All drivers must be listed prior to departure. Adding unlisted drivers during the rental period constitutes a material breach of this agreement. Spouse or domestic partner may be added at no additional charge. All other additional drivers: $50 per driver, collected before departure. No driver additions after departure.
          </Para>
        </Section>

        <Section number={4} title="Insurance Requirement">
          <Para>
            Insurance is the Renter&apos;s sole responsibility. The Company does not provide insurance coverage of any kind. Renter must obtain a valid rental vehicle insurance policy through Bonzah (bonzah.com), RentalCover (rentalcover.com), or a pre-approved equivalent providing a minimum of $1,000,000 in liability coverage before the rental commences.
          </Para>
          <Para>
            Failure to present proof of insurance at pickup will result in cancellation of the rental. The deposit is non-refundable in this circumstance.
          </Para>
        </Section>

        <Section number={5} title="Fuel">
          <Para>
            The Vehicle operates on DIESEL FUEL ONLY. Renter is strictly prohibited from introducing any other fuel type (regular gasoline, premium gasoline, E85, or any other fuel) into the Vehicle. Introducing incorrect fuel into the Vehicle constitutes catastrophic damage and Renter accepts full financial liability for all resulting repair costs, including but not limited to fuel system flush, injector replacement, and engine repair, which may exceed $10,000.
          </Para>
          <Para>
            The Vehicle must be returned with the fuel tank at the same level as at departure (full). Failure to return the Vehicle with a full tank will result in a charge equal to the cost of fuel to refill plus a $35 service fee.
          </Para>
        </Section>

        <Section number={6} title="Vehicle Height & Clearance">
          <Para>
            The Vehicle has a roof height requiring a minimum clearance of 10 feet 6 inches (10&apos;6&ldquo;). Renter is responsible for verifying clearance at all locations, including but not limited to: bridges, overpasses, parking garages, drive-throughs, and covered structures. Damage resulting from failure to verify clearance is Renter&apos;s sole liability and is not covered under general wear and tear.
          </Para>
        </Section>

        <Section number={7} title="Waste System & Sanitation">
          <Para>
            The Vehicle is equipped with a black water (toilet) holding tank and a grey water (sink) holding tank. Renter is responsible for dumping both tanks at a licensed dump station at or before Vehicle return. Failure to dump tanks upon return will result in a mandatory $125 sanitation fee charged to the card on file. This fee applies to all renters at all membership tiers without exception or waiver.
          </Para>
          <Para>
            Renter shall not dump tanks on private property, public roads, or any location not designated as a licensed dump station. Improper dumping resulting in fines, penalties, or property damage is Renter&apos;s sole liability.
          </Para>
        </Section>

        <Section number={8} title="Prohibited Uses">
          <Para>Renter agrees that the Vehicle shall NOT be used for:</Para>
          <Rule>Commercial transportation of passengers for hire (Uber, Lyft, charter, livery, or any fee-based transport service)</Rule>
          <Rule>Subletting or renting the Vehicle to any third party</Rule>
          <Rule>Towing any vehicle, trailer, or watercraft</Rule>
          <Rule>Off-road driving or unpaved surfaces beyond normal rural roads</Rule>
          <Rule>Racing, stunt driving, or any competitive event</Rule>
          <Rule>Transport of illegal substances or contraband</Rule>
          <Rule>Transport of animals of any kind — NO PETS. Zero exceptions. Evidence of a pet found in or on the Vehicle upon return results in a mandatory $500 fee, charged to the card on file, in addition to any cleaning costs.</Rule>
          <Rule>Any use that violates applicable local, state, or federal law</Rule>
          <Rule>Travel outside the continental United States</Rule>
          <Para>
            Violation of any prohibited use constitutes immediate grounds for termination of the rental, forfeiture of all deposits and payments, and full liability for any resulting damage.
          </Para>
        </Section>

        <Section number={9} title="Smoking & Substances">
          <Para>
            Smoking of any kind — including cigarettes, cigars, pipes, vaping devices, and cannabis — is strictly prohibited inside the Vehicle at all times. Zero tolerance. Violation results in a mandatory $500 deodorization and cleaning fee charged to the card on file, in addition to any additional cleaning costs. No exceptions under any circumstances.
          </Para>
        </Section>

        <Section number={10} title="Passenger Capacity & Safety">
          <Para>
            Maximum passenger capacity is 10 persons. Exceeding this limit is prohibited. All passengers must be seated with seatbelts fastened while the Vehicle is in motion. Renter is responsible for passenger compliance. Company is not liable for injuries resulting from failure to use seatbelts.
          </Para>
        </Section>

        <Section number={11} title="Security Deposit">
          <Para>
            A security deposit of $1,500 is collected at the time of booking. The deposit is held and applied against any unpaid fees, damage charges, or policy violations incurred during the rental. The deposit (or remaining balance after charges) is released within 72 hours of a verified clean return. The security deposit is not a limitation on Renter&apos;s liability — Renter remains liable for all costs exceeding $1,500.
          </Para>
        </Section>

        <Section number={12} title="Payment Terms">
          <Para>
            A deposit of 35% of the total rental cost is due at the time of booking. The remaining balance (65%) is due 48 hours before the scheduled departure date and will be charged automatically to the card on file. If the balance charge fails, Company reserves the right to cancel the reservation. The deposit is subject to the cancellation policy in Section 13.
          </Para>
          <Rule>Minimum advance booking notice: 72 hours for public bookings. Sterling Reserve Gold members: 24-hour minimum. Sterling Reserve Black members: same-day booking available subject to availability.</Rule>
        </Section>

        <Section number={13} title="Cancellation Policy">
          <Rule>30 or more days before departure: Full deposit refund minus $95 processing fee</Rule>
          <Rule>15–29 days before departure: 50% of deposit refunded</Rule>
          <Rule>8–14 days before departure: Deposit forfeited in full</Rule>
          <Rule>7 days or fewer before departure: Deposit forfeited; balance due if already charged</Rule>
          <Rule>No-show (failure to appear within 2 hours of scheduled pickup without notice): Full forfeiture of deposit and balance. No credit.</Rule>
          <Para>
            Date changes are permitted once at no charge if requested 14 or more days before departure, subject to availability. Date changes within 14 days of departure are treated as a cancellation and rebook.
          </Para>
          <Para>
            Named tropical storms or hurricanes within 72 hours of scheduled departure qualify for a full credit toward a future booking (not a cash refund) at Company&apos;s discretion.
          </Para>
        </Section>

        <Section number={14} title="Damage & Liability">
          <Para>
            Renter is responsible for all damage to the Vehicle occurring during the rental period, regardless of fault. This includes but is not limited to: collision damage, interior damage, roof damage from clearance violations, mechanical damage from improper fuel, tire damage, and water damage.
          </Para>
          <Para>
            Renter&apos;s rental insurance is primary. Renter is responsible for the deductible. Damage exceeding the security deposit will be charged to the card on file. For damage exceeding card limits, Company reserves the right to pursue collection through all available legal means.
          </Para>
          <Para>
            Company is not liable for personal property lost, stolen, or damaged inside the Vehicle during the rental period.
          </Para>
        </Section>

        <Section number={15} title="Return Condition">
          <Para>The Vehicle must be returned:</Para>
          <Rule>On time (see Section 16 for late fees)</Rule>
          <Rule>With a full fuel tank (diesel)</Rule>
          <Rule>With black and grey water tanks dumped</Rule>
          <Rule>In clean interior condition — light cleaning expected; excessive mess, food waste, stains, or odor subject to $175 cleaning fee</Rule>
          <Rule>With all keys, accessories, and provided equipment intact</Rule>
        </Section>

        <Section number={16} title="Late Returns">
          <Para>
            Late returns are charged at $95 per hour for the first three hours. Returns more than three hours past the scheduled return time will be charged a full additional day at the applicable rack rate. Renter acknowledges that late returns may impact subsequent reservations and agrees to compensate Company for any resulting costs.
          </Para>
        </Section>

        <Section number={17} title="Roadside & Mechanical">
          <Para>In the event of a mechanical failure, breakdown, or accident, Renter must:</Para>
          <Rule>Ensure safety of all passengers</Rule>
          <Rule>Contact Company immediately at the number provided at pickup</Rule>
          <Rule>Not authorize any repairs without prior written approval from Company</Rule>
          <Para>
            Company will arrange roadside assistance. Unauthorized repairs are not reimbursable. Company is not liable for trip interruption, accommodation costs, or consequential losses arising from vehicle mechanical failure.
          </Para>
        </Section>

        <Section number={18} title="Privacy & Identity Verification">
          <Para>
            Company collects personal information for the purposes of completing the rental transaction and conducting identity and background verification. Company may use third-party verification services including Forewarn to confirm renter identity and safety. By completing a reservation, Renter consents to this verification. Company does not sell personal data to third parties.
          </Para>
        </Section>

        <Section number={19} title="Governing Law & Dispute Resolution">
          <Para>
            This agreement is governed by the laws of the State of Florida. Any dispute arising from or related to this agreement shall be resolved by binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules, with proceedings conducted in Palm Beach County, Florida. The parties waive the right to a jury trial and to participate in any class action.
          </Para>
        </Section>

        <Section number={20} title="Entire Agreement">
          <Para>
            This agreement, together with the Sterling Reserve Membership Terms (if applicable), constitutes the entire agreement between the parties and supersedes all prior communications, representations, and understandings. No modification of this agreement is valid unless in writing and signed by an authorized representative of Sterling Route LLC.
          </Para>
        </Section>

        {/* FOOTER CTA */}
        <section className="py-16">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-block px-8 py-3 bg-[#c9a96e] text-[#0a0a0a] text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#d4b87a] transition-colors"
            >
              Book the Van
            </Link>
            <Link
              href="/sterling-reserve"
              className="inline-block px-8 py-3 border border-[#433d38] text-sm tracking-[0.15em] uppercase text-[#a09890] hover:text-[#f0e6d0] hover:border-[#c9a96e]/50 transition-colors"
            >
              View Sterling Reserve
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
