import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rental Terms — Sterling Route',
  description: 'Rental terms, cancellation policy, renter responsibilities, insurance requirements, and governing law for Sterling Route van rentals.',
}

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-12 border-b border-[#c9a96e]/20">
      <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">{label}</p>
      {children}
    </section>
  )
}

function Rule({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-[#c9a96e]/50 mt-1 shrink-0">—</span>
      <div>
        {title && <span className="text-[#f0e6d0] font-medium">{title} </span>}
        <span className="text-[#a09890]">{children}</span>
      </div>
    </div>
  )
}

export default function RentalTermsPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* Page Header */}
      <div className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Sterling Route LLC</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6">Rental Terms</h1>
          <p className="text-[#5f5850] text-base leading-relaxed max-w-xl">
            These terms govern all rentals of the Sterling Route vehicle. Clear, firm, and written to be read.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">

        {/* Agreement Summary */}
        <Section id="summary" label="Rental Agreement Summary">
          <div className="border-l-2 border-[#c9a96e]/30 pl-6 py-2">
            <p className="text-[#a09890] leading-relaxed">
              This page is a summary of the material terms governing your rental. The complete rental agreement — including all representations, warranties, and obligations — is provided at booking through the Outdoorsy/Roamly platform. By confirming your reservation, you acknowledge and agree to both this summary and the full agreement.
            </p>
          </div>
        </Section>

        {/* Eligibility */}
        <Section id="eligibility" label="Renter Eligibility">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-6">Who May Rent</h2>
          <div className="space-y-4">
            <Rule>Must be 25 years of age or older at the time of rental.</Rule>
            <Rule>Must hold a valid, U.S.-issued driver&apos;s license.</Rule>
            <Rule>Must have a clean driving record — no DUI conviction within the past 7 years; no more than 2 moving violations within the past 3 years.</Rule>
            <Rule>Must obtain trip rental insurance through Roamly before the reservation is confirmed. No exceptions.</Rule>
          </div>
        </Section>

        {/* Insurance */}
        <Section id="insurance" label="Insurance Requirement">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-4">Non-Negotiable. First Step.</h2>
          <p className="text-[#a09890] leading-relaxed mb-8">
            No booking is confirmed without insurance. All renters must obtain trip coverage through Roamly (roamly.com) before the reservation is finalized. This protects you, your passengers, and the vehicle.
          </p>
          <div className="border border-[#c9a96e]/30 bg-[#c9a96e]/5 p-6 space-y-4">
            <Rule title="Minimum liability coverage:">$1,000,000. Required on every reservation.</Rule>
            <Rule title="Physical damage coverage:">Required. Must cover the vehicle for the full rental period.</Rule>
            <Rule title="Coverage dates:">Must match your exact rental dates — pickup through scheduled return.</Rule>
            <Rule title="Alternative providers:">Contact us before booking if you intend to use coverage other than Roamly.</Rule>
          </div>
          <p className="text-[#5f5850] text-sm mt-6">
            Sterling Route LLC is not liable for any loss, damage, or claim arising from an uninsured or underinsured rental. Misrepresentation of insurance status voids the rental agreement.
          </p>
        </Section>

        {/* Cancellation */}
        <Section id="cancellation" label="Cancellation Policy">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-6">Cancellations &amp; Changes</h2>
          <div className="border border-[#433d38]/50 overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#c9a96e]/20">
                  <th className="px-6 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Timing</th>
                  <th className="px-6 py-4 text-right text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#433d38]/30">
                {[
                  { timing: '30+ days before departure', outcome: 'Full refund minus $95 processing fee' },
                  { timing: '15–29 days before departure', outcome: '50% of deposit refunded' },
                  { timing: '8–14 days before departure', outcome: 'Deposit forfeited' },
                  { timing: '7 days or fewer', outcome: 'Deposit forfeited; balance still due if already charged' },
                  { timing: 'No-show', outcome: 'Full forfeiture — deposit and balance' },
                ].map((row) => (
                  <tr key={row.timing}>
                    <td className="px-6 py-4 text-[#a09890]">{row.timing}</td>
                    <td className="px-6 py-4 text-right text-[#f0e6d0]">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4">
            <Rule title="Date changes:">One free date change permitted if requested 14 or more days before departure. Changes requested within 14 days are treated as a cancellation and rebook at the current rate.</Rule>
            <Rule title="Force majeure / named storms:">Credit toward a future booking at Sterling Route&apos;s discretion. Refunds are not issued for weather or acts of God.</Rule>
          </div>
        </Section>

        {/* Payment Terms */}
        <Section id="payment" label="Payment Terms">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-6">Deposits &amp; Balances</h2>
          <div className="space-y-4">
            <Rule>35% deposit is due at the time of booking to hold your dates.</Rule>
            <Rule>Remaining balance is due 24 hours before your departure.</Rule>
            <Rule>Balance is charged automatically to the card on file. You will receive notification in advance.</Rule>
            <Rule>Failed balance payment results in automatic cancellation. Deposit is forfeited.</Rule>
          </div>
        </Section>

        {/* Renter Responsibilities */}
        <Section id="responsibilities" label="Renter Responsibilities">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-6">Your Obligations</h2>
          <div className="space-y-5">
            <Rule title="Black and grey tank dump:">You are solely responsible for dumping both tanks before or at the time of return. Failure to dump results in a $125 fee charged automatically. This fee applies to all renters including Reserve members. There are no exceptions and no waivers.</Rule>
            <Rule title="Cleaning:">Return the vehicle in the same condition you received it. Light cleaning is expected and included. Heavy soiling, food mess, or interior staining results in a $175 cleaning fee. Smoking inside the vehicle results in a $350 fee.</Rule>
            <Rule title="Fuel:">Return with a full tank. Failure to return full results in the cost of fuel plus a $35 service charge billed to card on file.</Rule>
            <Rule title="Mileage:">See the fee schedule for included miles per day by tier. Overages are billed at the per-mile rate and charged post-return based on odometer reading.</Rule>
            <Rule title="Late return:">$95/hour past your scheduled return time. After 3 hours past the scheduled return, the additional time is treated as a full additional day billed at the rack rate.</Rule>
            <Rule title="Personal property:">Sterling Route LLC is not responsible for any personal items left in the vehicle. Items left for more than 7 days will be disposed of.</Rule>
            <Rule title="Pets:">Not permitted without prior written approval. An unauthorized pet in the vehicle results in a $250 fee regardless of whether damage occurred.</Rule>
          </div>
        </Section>

        {/* Vehicle Use Restrictions */}
        <Section id="restrictions" label="Vehicle Use Restrictions">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-6">What Is Not Permitted</h2>
          <div className="space-y-4">
            <Rule>Off-road use of any kind. The vehicle is a Class B motorhome and must remain on paved or improved surfaces.</Rule>
            <Rule>Towing. No trailer or additional vehicle may be towed.</Rule>
            <Rule>Commercial passenger transport for compensation — Uber, Lyft, rideshare, or similar services.</Rule>
            <Rule>Travel outside the continental United States.</Rule>
            <Rule>Any driver other than the listed renter without prior written approval from Sterling Route. Unauthorized drivers void the rental agreement and any associated insurance coverage.</Rule>
            <Rule>Maximum occupancy of 10 passengers at any time, including the driver.</Rule>
          </div>
        </Section>

        {/* Damages & Deposit */}
        <Section id="damages" label="Damages &amp; Security Deposit">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-6">Security Deposit</h2>
          <div className="space-y-4">
            <Rule>A $500 security deposit is held at the time of booking.</Rule>
            <Rule>The deposit is released within 72 hours of return, pending inspection of the vehicle.</Rule>
            <Rule>Any damage beyond the deposit amount is billed to the card on file. Documentation of damage is provided at time of billing.</Rule>
            <Rule>The renter is responsible for the full deductible on any insurance claim arising from the rental period.</Rule>
          </div>
        </Section>

        {/* Governing Law */}
        <Section id="governing-law" label="Governing Law">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-6">Jurisdiction &amp; Dispute Resolution</h2>
          <div className="space-y-4">
            <Rule>These terms are governed by the laws of the State of Florida.</Rule>
            <Rule>Venue is Palm Beach County, Florida.</Rule>
            <Rule>All disputes arising from or relating to this rental agreement shall be resolved by binding arbitration under the rules of the American Arbitration Association (AAA). Class action waiver applies.</Rule>
          </div>
        </Section>

        {/* Contact */}
        <section className="py-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">Contact</p>
          <div className="space-y-2 text-[#a09890]">
            <p className="font-serif text-xl text-[#f0e6d0]">Sterling Route LLC</p>
            <p>Palm Beach County, Florida</p>
            <p>
              <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">
                hello@sterlingroute.com
              </a>
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
