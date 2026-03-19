import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Family & Occasions — SilverSprinter',
  description: 'The family road trip reimagined. Weddings, reunions, birthdays, and adventures — for families who\'ve outgrown the minivan and airport chaos.',
}

export default function FamilyPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/gallery/DSC04771.JPG"
          alt="SilverSprinter — family trips and occasions"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">For Families & Occasions</p>

          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8 text-[#f0e6d0]">
            They&apos;re Only Young Once.<br />
            <span className="text-[#c9a96e]">Drive Like It.</span>
          </h1>

          <p className="text-[#a09890] text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 font-serif italic">
            The family trip reimagined — for families who&apos;ve outgrown the minivan,
            the airport circus, and the idea that getting there has to be the hard part.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-semibold hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Reserve the Van <ArrowRight size={16} />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-10 py-4 border border-[#433d38] text-[#a09890] font-sans text-sm tracking-widest uppercase hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors duration-200"
            >
              See Inside
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Story ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">A Different Kind of Trip</p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-10 leading-tight">
            Somewhere between South Florida
            and wherever you&apos;re going,
            something happens.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              The kids stop looking at their phones. Not because you asked them to —
              because something better is happening. Someone puts on a movie
              on the big screen. Someone else figures out how to cast from their phone.
              Your youngest claims the bench seat and announces it&apos;s her bed now.
            </p>
            <p>
              Your spouse pulls something out of the mini fridge and hands it to you.
              You&apos;re not white-knuckling the wheel in traffic. You&apos;re just
              sitting there, watching your family settle into the trip.
            </p>
            <p>
              Nobody has asked &ldquo;are we there yet?&rdquo; in 45 minutes.
              And you realize — this is the part you usually just survive.
              And it&apos;s actually really good right now.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              The trip is the memory too. Not just the destination.
              Give them both.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Problem With the Usual ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">The Alternative</p>

          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            Flying used to feel like freedom.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Now it means arriving two hours early, navigating TSA with three
              carry-ons, two kids, and a car seat you&apos;re not sure is allowed.
              It means connecting flights. Delayed gates. $47 airport sandwiches.
              Arriving exhausted before the vacation even starts.
            </p>
            <p>
              Driving in two cars means half the family is somewhere behind you
              for six hours. Nobody&apos;s really together. You&apos;re just
              a caravan counting exits.
            </p>
            <p>
              The minivan was great for a season. But there&apos;s a version
              of family travel where everyone is comfortable, entertained,
              fed, and in the same place — for the whole trip.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              You&apos;ve built a life worth celebrating.
              The way you travel should reflect that.
            </p>
          </div>
        </div>
      </section>

      {/* ── What's Inside ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
              <Image
                src="/gallery/DSC04776.JPG"
                alt="SilverSprinter exterior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border border-[#c9a96e]/20" />
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">Built For This</p>
              <h2 className="font-serif text-4xl text-[#f0e6d0] mb-8">
                Everything a family needs for the long haul.
              </h2>
              <div className="space-y-4">
                {[
                  '10 seats — room for the whole family plus grandparents',
                  'Bench seats fold flat — a real sleeping area for little ones (or tired adults)',
                  'Mini fridge — snacks and drinks on your schedule, not a gas station\'s',
                  'Microwave — real food on the road, not fast food every three hours',
                  'Private commode & sink — no emergency exits, no gas station bathrooms',
                  '32" TV with WiFi & Bluetooth — movies, playlists, podcasts',
                  'Self-drive — leave when you want, stop when you want, arrive on your time',
                  'Luggage capacity — everyone\'s bags actually fit',
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

      {/* ── Occasions ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 text-center">Occasions Worth Doing Right</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-4 text-center">
            Some trips are just trips. Some are something more.
          </h2>
          <p className="text-[#5f5850] text-center mb-16 text-sm">The van works for both. Here&apos;s where people take it.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Family Road Trips',
                body: 'Florida to the mountains. Florida to the lake. Florida to wherever the summer points you. One van, everyone together, nothing left at the side of the road.',
              },
              {
                title: 'Weddings & Celebrations',
                body: 'The wedding party gets from the hotel to the venue together. The family gets from the reception to the after-party together. Nobody gets lost. Nobody\'s waiting on an Uber at midnight in formal wear.',
              },
              {
                title: 'Milestone Birthdays',
                body: '50th. 60th. The kind of birthday that deserves a real celebration with the people who matter. Dinner, a show, a destination — done right, not cobbled together.',
              },
              {
                title: 'Reunions',
                body: 'The extended family is in from out of town. Everyone piles in. It becomes the reunion before the reunion. Some of the best moments happen in transit — give them room to happen.',
              },
              {
                title: 'School & Sports Events',
                body: 'Away tournaments. Senior nights. Graduation weekends. The events that mark a season of your kid\'s life are worth doing in a way that becomes its own memory.',
              },
              {
                title: 'Just Because',
                body: 'Sometimes you don\'t need a reason. You just want a weekend somewhere better than your usual somewhere, with the people you want around you. That\'s enough.',
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

      {/* ── The Commode Section — no joke ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">Not a Small Thing</p>

          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            Let&apos;s talk about the bathroom.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              If you have kids — and especially if you have young kids — you already
              know what it&apos;s like to make an emergency exit off I-95 to find
              the least terrifying gas station bathroom in a part of Florida
              you didn&apos;t plan to be in.
            </p>
            <p>
              The SilverSprinter has a private commode and sink onboard.
              Clean. Private. Available whenever you need it.
            </p>
            <p>
              On a 6-hour family road trip, that single feature changes
              the entire dynamic of the drive. You don&apos;t stop unless you want to.
              You don&apos;t lose 25 minutes every two hours.
              You just&hellip; drive.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              It&apos;s not glamorous to say it out loud.
              But every parent reading this just nodded.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">Who Owns This Van</p>

          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            We take this exact van on our family trips.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              We bought this van for our family. We&apos;ve driven it from South Florida
              to our lake house on Seneca Lake in New York — weeks at a time.
              We know every inch of it. We know what works. We take care of it
              the way you take care of something that matters to your family.
            </p>
            <p>
              When it&apos;s not in use, we rent it — because it spends too much time
              sitting when it could be taking someone&apos;s family on something good.
            </p>
            <p>
              You&apos;re not renting a fleet vehicle with 60,000 miles on it.
              You&apos;re borrowing ours.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 border-t border-[#433d38]/40 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">The Trip Is Waiting</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6 leading-tight">
            Give them a trip<br />
            <span className="text-[#c9a96e]">worth remembering.</span>
          </h2>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-[#a09890] mb-12 text-lg leading-relaxed">
            Summer weekends and holiday travel fill up fast.
            If you&apos;ve been thinking about a trip, check the calendar now
            before the dates you want are gone.
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
