import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Sterling Route — The Van, The Family, The Standard',
  description: "Sterling Route isn't a fleet. It's one custom Mercedes Sprinter, built by a father of five who needed a better way to travel. Now available to you.",
}

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HERO */}
      <section className="py-16 md:py-32 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">Palm Beach County, Florida</p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#f0e6d0] leading-tight mb-8 whitespace-pre-line">
            {"One Van.\nOne Family.\nOne Standard."}
          </h1>
          <p className="text-lg text-[#a09890] leading-relaxed max-w-2xl">
            Sterling Route exists because flying stopped making sense, a father of five needed a better way to move his family, and a Midwestern Automotive Design Daycruiser D6 turned out to be exactly the answer.
          </p>
        </div>
      </section>

      {/* THE ORIGIN */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-[#f0e6d0] mb-10">It Didn&apos;t Start as a Business</h2>
          <div className="space-y-7 text-[#a09890] text-base leading-relaxed">
            <p>
              We like to travel. Always have. But flying with five kids stopped making sense — and when the world made it even less appealing, we decided to move differently. We found a Midwestern Automotive Design Daycruiser D6 conversion and knew immediately it was the right call.
            </p>
            <p>
              MAD builds luxury van conversions on the Mercedes-Benz Sprinter platform — the Daycruiser D6 is their flagship floorplan. Two captain chairs up front, four in the back, two benches that fold flat for overnight runs. Private commode, microwave, refrigerator, 32-inch TV, WiFi from the road. We bought it for our family — the five kids, the summer runs to our lake house in New York, the white Christmas we drove up for last year. It&apos;s the kind of vehicle where nobody asks &ldquo;are we there yet&rdquo; because nobody wants the trip to end.
            </p>
            <p>
              Between our family trips, it sits. And it&apos;s too good a machine to sit. So we made it available — to golf groups who want to do the trip right, to corporate clients who understand that arrival is part of the pitch, to families who refuse to compromise on how they travel. The standards are the same as when my own kids are in the seats: the van is clean, the tank is full, and everything works.
            </p>
          </div>
        </div>
      </section>

      {/* THE MAN BEHIND IT */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-[#f0e6d0] mb-10">Why the Standards Are What They Are</h2>
          <div className="space-y-7 text-[#a09890] text-base leading-relaxed">
            <p>
              My background is construction and real estate. I hold a Certified General Contractor license in Florida and I&apos;ve brokered luxury property across Palm Beach County — Jupiter Island, Hobe Sound, the barrier islands. In those fields, there&apos;s no hiding behind averages. The work is either right or it isn&apos;t. The van is run the same way.
            </p>
            <p>
              When I say the van is maintained to a higher standard than most rentals, I mean it literally — because I put my own family in it. A $4 million custom home client expects the site to be immaculate. A Sterling Route renter should expect the same. One vehicle, one standard, no exceptions.
            </p>
          </div>
        </div>
      </section>

      {/* THE VAN */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-[#f0e6d0] mb-3">The Machine</h2>
          <p className="text-[#5f5850] text-sm mb-12">Midwestern Automotive Design Daycruiser D6 — luxury conversion on the Mercedes-Benz Sprinter platform.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#433d38]/40">
            {[
              {
                title: 'Mercedes-Benz Sprinter',
                body: 'The platform. Diesel. Built to run.',
              },
              {
                title: '10 Passengers',
                body: '2 captain chairs front, 4 captain chairs rear, 2 fold-flat benches.',
              },
              {
                title: 'Sleeps 2',
                body: 'Rear benches fold flat. Golf trip, overnight stay, no hotel required.',
              },
              {
                title: 'Private Commode & Sink',
                body: 'A self-contained bathroom. A detail that changes everything.',
              },
              {
                title: 'Full Galley',
                body: 'Microwave, mini fridge, cooler. Real food, real drinks, on the road.',
              },
              {
                title: '32" TV + WiFi',
                body: 'Entertainment that works. Streaming, gaming, film. All 10 seats.',
              },
            ].map((spec) => (
              <div key={spec.title} className="bg-[#0a0a0a] p-8 flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-[#c9a96e] shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-lg text-[#f0e6d0] mb-1">{spec.title}</h3>
                  <p className="text-[#5f5850] text-sm leading-relaxed">{spec.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STERLING RESERVE */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-[#f0e6d0] mb-3">Sterling Reserve</h2>
          <p className="text-[#5f5850] text-sm mb-8">For the clients who want first access, preferred rates, and a concierge who handles the details.</p>
          <p className="text-[#a09890] text-base leading-relaxed mb-10">
            We built a membership tier for the people who use the van regularly — the golf group that goes four times a year, the corporate team that runs investor tours, the family that&apos;s made the summer run a tradition. Sterling Reserve gives you priority booking, lower rates, and a planning contact who already knows your preferences. Three tiers. Limited availability.
          </p>
          <Link
            href="/sterling-reserve"
            className="inline-block border border-[#c9a96e]/50 text-[#c9a96e] text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#c9a96e]/10 transition-colors"
          >
            Explore Sterling Reserve
          </Link>
        </div>
      </section>

      {/* HOADLEY GROUP */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-6">Part of the Hoadley Group</h2>
          <p className="text-[#a09890] text-base leading-relaxed">
            Sterling Route is one piece of a larger vision. The Hoadley Group includes luxury and commercial real estate brokerage, custom construction, and hospitality assets across South Florida and beyond. If you&apos;re a Hoadley Group real estate client, ask about preferred rates.
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#f0e6d0] mb-4">The Van Is Ready.</h2>
          <p className="text-[#5f5850] text-base mb-12">Check availability for your dates.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Check Availability
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-[#c9a96e]/50 text-[#c9a96e] font-sans text-sm tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#c9a96e]/10 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
