import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Corporate & Real Estate — SilverSprinter',
  description: 'How South Florida\'s top brokers and builders use the van to show elite properties, transport investors, and close deals. The experience starts before the front door.',
}

export default function CorporatePage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/gallery/DSC04761.JPG"
          alt="SilverSprinter — real estate and corporate"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">For Real Estate &amp; Business</p>

          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8 text-[#f0e6d0]">
            The Showing Starts<br />
            Before You Pull<br />
            <span className="text-[#c9a96e]">Into the Driveway.</span>
          </h1>

          <p className="text-[#a09890] text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 font-serif italic">
            Your buyers have been in your van for 45 minutes before they walk
            through the front door. By the time they see the house,
            they already trust you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-semibold hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Inquire Now <ArrowRight size={16} />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-10 py-4 border border-[#433d38] text-[#a09890] font-sans text-sm tracking-widest uppercase hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors duration-200"
            >
              See the Van
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Real Estate Story ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">The Real Estate Angle</p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-10 leading-tight">
            Elite buyers expect an elite experience.
            The house is only part of it.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Think about what your best clients are buying. Not just a home —
              a lifestyle. A neighborhood. A statement about where they&apos;ve arrived.
              The purchase price reflects all of that. The experience of buying it should too.
            </p>
            <p>
              When you pick up a buyer in a custom Mercedes Sprinter — clean, quiet,
              captain chairs, cold water in the fridge — you&apos;re not just being
              convenient. You&apos;re telling them something about the level at which
              you operate. The conversation on the way to the first showing is relaxed,
              unhurried, and on your terms. You control the environment.
              That&apos;s not nothing. That&apos;s the whole game.
            </p>
            <p>
              Compare that to meeting them at the property, watching them arrive
              frazzled from GPS and parking, and spending the first ten minutes
              of your showing time getting them settled. You&apos;ve seen it.
              That&apos;s not how the best brokers work.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              The agent who controls the journey controls the conversation.
              The agent who controls the conversation closes more deals.
            </p>
          </div>
        </div>
      </section>

      {/* ── How Brokers Use It ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 text-center">How Brokers Use It</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-4 text-center">
            Three scenarios that pay for the rental ten times over.
          </h2>
          <p className="text-[#5f5850] text-center mb-16 text-sm">These are real use cases, not hypotheticals.</p>

          <div className="space-y-6">
            {[
              {
                number: '01',
                title: 'Showing a $50M Home on Jupiter Island',
                body: 'Your buyer is arriving from New York. They\'ve seen three properties on Zoom and they\'re ready to make a decision. You pick them up at PBI in the Sprinter. On the drive to Jupiter Island — 40 minutes up the coast — you walk through the comps, the neighborhood, what makes this property different. By the time you turn onto the island, they\'re already oriented. They\'re comfortable. They\'re with you. You\'re not meeting them in a driveway and starting from zero. You walk that home with a buyer who is primed, focused, and trusts your judgment. That\'s a different showing.',
              },
              {
                number: '02',
                title: 'Scouting a Commercial Development Site',
                body: 'You\'re evaluating three parcels for a commercial project — different municipalities, different zoning, different access realities. The ownership group, the architect, and the GC need to walk all three in one day. One van means one conversation, continuous from the first site to the last. No one gets lost. No one arrives at the second site still processing the first. The decision gets made faster because the group never fragments.',
              },
              {
                number: '03',
                title: 'The Out-of-State Investor Tour',
                body: 'A high-net-worth investor is flying in to evaluate four properties across Palm Beach County. They have one day. You\'ve curated the tour. You pick them up, control the environment, and make every transition between properties feel intentional rather than logistical. By the time they\'re back at the airport, they\'ve seen four properties and spent six hours with you. That\'s not a showing day. That\'s a relationship.',
              },
            ].map(({ number, title, body }) => (
              <div key={number} className="border border-[#433d38]/50 bg-[#1a1612] p-8 flex gap-8">
                <p className="font-serif text-4xl text-[#433d38] flex-shrink-0 leading-none">{number}</p>
                <div>
                  <h3 className="font-serif text-xl text-[#c9a96e] mb-4">{title}</h3>
                  <p className="text-sm text-[#a09890] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Construction Angle ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">For Builders &amp; Contractors</p>

          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            How you show up to a job site
            says something about how you run the job.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Every contractor has a truck. Most have two.
              But when you&apos;re bidding a $4M custom home in Palm Beach Gardens,
              or presenting to a development group evaluating a commercial site,
              or walking the ownership team through a project milestone —
              the way you show up is a statement about how you run your business.
            </p>
            <p>
              Pulling up in a custom Sprinter — clean, organized, your team together —
              communicates something before a single word is said.
              It says the details matter to you. It says you think about the whole picture.
              It says you&apos;re not the contractor who&apos;s late and disorganized
              on the day of the meeting. That&apos;s exactly what a $3M client
              needs to believe before they sign.
            </p>
            <p>
              It also solves a straightforward problem: getting six people to a site
              in two counties without three separate vehicles and three separate ETAs.
              One departure time. One arrival. One conversation the whole way there —
              which means when you walk the site, everyone is already aligned.
            </p>
            <p>
              This is brand building. Not in the marketing sense —
              in the sense that every client interaction shapes what people believe
              about working with you. The van is part of that picture.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              The job starts when you leave the office.
              The brand starts before you arrive.
            </p>
          </div>
        </div>
      </section>

      {/* ── What's Inside ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
              <Image
                src="/gallery/DSC04766.JPG"
                alt="SilverSprinter exterior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border border-[#c9a96e]/20" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">The Environment</p>
              <h2 className="font-serif text-4xl text-[#f0e6d0] mb-8">
                Premium without being pretentious.
              </h2>
              <p className="text-[#a09890] text-lg leading-relaxed mb-8">
                Custom Mercedes Sprinter. Captain chairs. Clean, intentional interior.
                Everything needed for productive, comfortable client days —
                without the formality of a limousine or the blandness of a charter bus.
              </p>
              <div className="space-y-4">
                {[
                  '10 seats — buyers, partners, or your full team rides together',
                  'WiFi onboard — review documents, pull comps, stay connected',
                  '32" display — walk through plans, renderings, or listings en route',
                  'Mini fridge — water and refreshments handled before they ask',
                  'Private commode — full-day tours without unplanned stops',
                  'Self-drive — you set the schedule and control every detail',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={16} className="text-[#c9a96e] mt-0.5 flex-shrink-0" />
                    <span className="text-[#a09890] text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The ROI ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">The Business Case</p>

          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            One van rental that closes a deal
            is the best marketing spend of the quarter.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Think about your last big close. What did building that relationship
              cost you over six months? The dinners. The flights. The time.
              The introductions. The follow-ups.
            </p>
            <p>
              Now think about the day it came together — the final tour,
              the investor walkthrough, the site visit where everything clicked.
              That day had details. Details matter most at the close.
            </p>
            <p>
              Your best clients — the ones worth hundreds of thousands in commission
              or contract value — notice when the experience is premium.
              They also notice when it isn&apos;t.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              A $600 van rental on the day of a $400,000 close
              is not a line item. It&apos;s a strategy.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who Owns This Van ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">Who Owns This Van</p>

          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            We use it for exactly what you&apos;re describing.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              SilverSprinter is owned and operated by a Florida-licensed
              general contractor (CGC) and real estate broker. This is the same van
              we use for property tours, site visits, investor days, and client transport.
              It&apos;s not a rental fleet vehicle. It&apos;s ours — and we take care of it
              the way you take care of something that represents your business.
            </p>
            <p>
              We know what&apos;s at stake on a high-value client day.
              We&apos;ve been in the room when it went right
              and when it didn&apos;t. The van is one of the things that tilts the day
              in the right direction. That&apos;s why we rent it — because other professionals
              deserve access to that same advantage.
            </p>
            <p>
              Clients of our real estate and construction businesses
              receive preferred rates. If you&apos;re referred by someone we work with,
              let us know when you inquire.
            </p>
          </div>
        </div>
      </section>

      {/* ── Other Uses ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 text-center">Other Business Uses</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-16 text-center">
            Any day that needs to make an impression.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Executive Airport Transport',
                body: 'Out-of-town investors, partners, or clients arriving at FLL or MIA. Pick them up in a custom Sprinter. The meeting starts before they reach the office.',
              },
              {
                title: 'Team Events & Appreciation',
                body: 'Your top producers have earned more than a dinner reservation. One premium vehicle, everyone together, zero logistics headaches.',
              },
              {
                title: 'Corporate Retreats & Off-Sites',
                body: 'Leadership team heading to a resort or off-site venue. Everyone arrives together, on time, and in the right frame of mind.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="border border-[#433d38]/50 bg-[#1a1612] p-8">
                <h3 className="font-serif text-xl text-[#c9a96e] mb-4">{title}</h3>
                <p className="text-sm text-[#a09890] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 bg-[#0d0b09] border-t border-[#433d38]/40 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">Let&apos;s Talk</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6 leading-tight">
            You&apos;ve got a deal to close.<br />
            <span className="text-[#c9a96e]">We&apos;ve got the van.</span>
          </h2>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-[#a09890] mb-12 text-lg leading-relaxed">
            Tell us your dates, group size, and what you&apos;re doing.
            Business and real estate clients receive preferred rates.
            Let&apos;s make the day work.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-semibold hover:bg-[#d4b87a] transition-colors duration-200"
          >
            Check Availability <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}
