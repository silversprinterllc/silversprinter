import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Corporate — SilverSprinter',
  description: 'How South Florida\'s smartest companies move their people. Site visits, client transport, team events — done in a way that says something about your business.',
}

export default function CorporatePage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/gallery/DSC04761.JPG"
          alt="SilverSprinter — corporate transport"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">For Business</p>

          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8 text-[#f0e6d0]">
            Your Clients Notice<br />
            Everything.<br />
            <span className="text-[#c9a96e]">Make It Count.</span>
          </h1>

          <p className="text-[#a09890] text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 font-serif italic">
            The meeting hasn&apos;t started yet. They&apos;re already forming an opinion.
            The van you sent says everything about how you do business.
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

      {/* ── Who This Is For ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">Who This Is For</p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-10 leading-tight">
            If you close deals for a living,
            this van pays for itself.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              You&apos;re a general contractor taking a development group out to walk
              three job sites in one day. You&apos;re a broker showing a commercial
              investor four properties across two counties. You&apos;re a team lead
              bringing eight people to a client kickoff across town.
            </p>
            <p>
              The question isn&apos;t whether you can afford a premium vehicle.
              You&apos;re already spending money on the meeting — the flights,
              the restaurant, the prep time. The question is whether you&apos;re
              going to let the transportation be the thing that undermines
              the impression you&apos;ve spent months building.
            </p>
            <p>
              What does it say about your company when your best client
              spends 45 minutes in an Uber Pool before the most important
              meeting of the quarter?
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              The experience of working with you starts before anyone
              shakes a hand. Make sure it starts right.
            </p>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 text-center">Common Uses</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-16 text-center">
            Built for how South Florida business actually works.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Multi-Site Property Tours',
                body: 'Three development sites, two counties, one van. Your buyers stay together, stay engaged, and stay comfortable between stops. No one\'s reconsidering between locations.',
              },
              {
                title: 'Client Airport Pickup',
                body: 'Out-of-town investors or partners arriving at FLL or MIA. You don\'t send a car service — you send a statement. They step off the plane and into a custom Mercedes Sprinter.',
              },
              {
                title: 'Team Appreciation Events',
                body: 'Your top performers have earned a proper night out. One premium vehicle that gets everyone there and back without a single logistical headache.',
              },
              {
                title: 'Construction Site Visits',
                body: 'Contractor crews or project owners touring a site. Bring everyone out together, talk through the job on the way there. More professional than three pickup trucks.',
              },
              {
                title: 'Real Estate Investment Groups',
                body: 'Syndicators and investor groups doing due diligence on a multi-property deal. Everyone sees the same properties in the same order. The deal gets done faster when your group is aligned.',
              },
              {
                title: 'Corporate Retreats & Off-Sites',
                body: 'Leadership teams heading to a resort or off-site venue. Professional from the moment the van arrives. Everyone arrives focused — not drained from the drive.',
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
              Think about your last big close. What did the relationship
              cost you over six months? The dinners. The flights. The time.
              The introductions.
            </p>
            <p>
              Now think about the day everything came together — the final site visit,
              the investor tour, the closing dinner. That day had details.
              Details matter at the close more than anywhere else.
            </p>
            <p>
              The clients worth hundreds of thousands in revenue to you
              notice when you arrange a premium experience.
              They notice when you don&apos;t.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              A $600 van rental on the day of a $400,000 close
              is not a line item. It&apos;s a strategy.
            </p>
          </div>
        </div>
      </section>

      {/* ── What's Inside ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">The Environment</p>
              <h2 className="font-serif text-4xl text-[#f0e6d0] mb-8">
                Premium without being pretentious.
              </h2>
              <p className="text-[#a09890] text-lg leading-relaxed mb-8">
                Custom Mercedes Sprinter. Captain chairs. Clean interior.
                Everything you need for productive, comfortable travel —
                without the formality of a limousine or the blandness of a charter bus.
              </p>
              <div className="space-y-4">
                {[
                  '10 seats — captain chairs front and rear, benches for larger groups',
                  'WiFi onboard — your team can work the whole way',
                  '32" display — present, review, debrief en route',
                  'Mini fridge — water, coffee, or whatever the occasion calls for',
                  'Private commode — full days without stopping',
                  'Self-drive — you control the schedule, not the other way around',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={16} className="text-[#c9a96e] mt-0.5 flex-shrink-0" />
                    <span className="text-[#a09890] text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/gallery/DSC04766.JPG"
                alt="SilverSprinter — corporate ready"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border border-[#c9a96e]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Straight Talk ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">Straight Talk</p>

          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            We&apos;re business owners too. We get it.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              SilverSprinter is owned by a Florida-licensed general contractor
              and real estate broker. This van gets used for exactly the same things
              described on this page — site visits, investor tours, client days.
            </p>
            <p>
              We know what it&apos;s like to be the one responsible for the impression.
              We know what it costs when a client trip falls flat.
              And we know what it&apos;s worth when it goes exactly right.
            </p>
            <p>
              When you rent this van for business, you&apos;re renting from someone
              who uses it the same way. That matters.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 bg-[#0d0b09] border-t border-[#433d38]/40 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">Ready When You Are</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6 leading-tight">
            You&apos;ve got a deal to close.<br />
            <span className="text-[#c9a96e]">We&apos;ve got the van.</span>
          </h2>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-[#a09890] mb-12 text-lg leading-relaxed">
            Corporate and business inquiries welcome. Tell us your dates,
            group size, and what you&apos;re doing — we&apos;ll make sure it works.
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
