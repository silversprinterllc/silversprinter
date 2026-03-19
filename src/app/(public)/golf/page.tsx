import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Golf Trips — SilverSprinter',
  description: 'The only way four guys with bags, coolers, and nowhere to be until tee time should travel. South Florida\'s premier golf trip van.',
}

export default function GolfPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/gallery/DSC04726.JPG"
          alt="SilverSprinter — built for golf trips"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">For Golf Groups</p>

          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8 text-[#f0e6d0]">
            The Golf Trip<br />
            You've Been Talking<br />
            <span className="text-[#c9a96e]">About Since Last Year.</span>
          </h1>

          <p className="text-[#a09890] text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 font-serif italic">
            Four guys. Four bags. One van. Zero designated drivers.
            Zero arguments. Zero Ubers that smell like the last guy.
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

      {/* ── The Problem ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">Sound Familiar?</p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-10 leading-tight">
            Here's how most golf trips actually go.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Somebody draws the short straw and drives the whole way sober while everyone
              else is three Coronas deep before you hit the Alligator Alley toll.
            </p>
            <p>
              Three separate cars. Three separate Spotify playlists. Three separate people
              arguing about which exit to take. You get to the resort 40 minutes apart
              and spend the first hour just finding each other.
            </p>
            <p>
              Your Titleist bag — the one you've spent $2,000 on — is crammed sideways
              into a trunk designed for groceries. You spend the first nine holes
              wondering if the shaft is bent.
            </p>
            <p>
              And on the way home? Someone's too tired to drive. Someone else drank too much
              at the 19th hole. The ride back becomes a negotiation.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              You're 47. You've earned a better way to do this.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Solution ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">The Fix</p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-10 leading-tight">
            Imagine this instead.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Friday morning. Everyone loads up at the same address. Bags go in the back —
              there's room, we built it that way. You pull out of the driveway and the
              mini fridge is already stocked with exactly what you put in it the night before.
            </p>
            <p>
              The 32" TV is on. Someone's already queued up the Ryder Cup highlights.
              The WiFi is running. The seats recline. Nobody is stressed about traffic
              because nobody is driving — you're <em>all</em> just riding.
            </p>
            <p>
              Three hours to Streamsong. It flies. You show up rested, loose, and ready.
              You roll up to the bag drop together — not in three separate Hyundai Elantras —
              and the valet looks at the van the way you want him to look at the van.
            </p>
            <p>
              On the way home after Saturday's round, someone needs a bathroom. Not a problem.
              There's a private commode onboard. You don't stop. You don't exit the highway.
              You don't lose 25 minutes at a Wawa.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              The trip starts the moment you leave the driveway.
              And it doesn't stop being good until you get home.
            </p>
          </div>
        </div>
      </section>

      {/* ── What's Inside ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">What You Get</p>
              <h2 className="font-serif text-4xl text-[#f0e6d0] mb-8">
                Built for exactly this trip.
              </h2>
              <div className="space-y-4">
                {[
                  '10 captain and bench seats — everyone rides together',
                  'Full-size bag storage in the rear — no cramming, no bending',
                  'Mini fridge — stock it yourself the night before',
                  'Private commode & sink — no unplanned stops',
                  '32" TV with Bluetooth & WiFi streaming',
                  'Microwave — reheat the sandwiches you packed',
                  'Bench seats fold flat to a sleeping area — for the ride home after Day 2',
                  'Self-drive rental — you\'re in control, not on someone\'s schedule',
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
                src="/gallery/DSC04741.JPG"
                alt="SilverSprinter exterior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border border-[#c9a96e]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 text-center">Where People Are Going</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-4 text-center">
            South Florida to anywhere worth playing.
          </h2>
          <p className="text-[#5f5850] text-center mb-16 text-sm">We're based in South Florida. These are the drives worth making.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Streamsong Resort',
                location: 'Bowling Green, FL · 2.5 hrs',
                note: 'Black, Red, and Blue. Three of the best courses in the state. Bring snacks — you\'ll be there all weekend.',
              },
              {
                name: 'TPC Sawgrass',
                location: 'Ponte Vedra Beach, FL · 5 hrs',
                note: 'The Stadium Course. You know the 17th. You\'ve watched it on TV your whole life. Time to stand on the tee box.',
              },
              {
                name: 'Hammock Beach Golf Resort',
                location: 'Palm Coast, FL · 3.5 hrs',
                note: 'The Ocean Course with Atlantic views on every other hole. Worth every mile.',
              },
              {
                name: 'World Golf Village',
                location: 'St. Augustine, FL · 5 hrs',
                note: 'King & Bear. Slammer & Squire. Two courses, one trip. Combine it with TPC for the ultimate Florida swing.',
              },
              {
                name: 'Innisbrook Resort',
                location: 'Palm Harbor, FL · 3 hrs',
                note: 'Copperhead Course — home of the Valspar Championship. Tampa Bay on a perfect day.',
              },
              {
                name: 'Pinehurst No. 2',
                location: 'Pinehurst, NC · 10 hrs',
                note: 'A pilgrimage. You sleep in shifts. The bench folds flat. You arrive ready to play a bucket-list course.',
              },
            ].map((dest) => (
              <div key={dest.name} className="border border-[#433d38]/50 bg-[#1a1612] p-8">
                <p className="font-serif text-xl text-[#c9a96e] mb-1">{dest.name}</p>
                <p className="text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-4">{dest.location}</p>
                <p className="text-sm text-[#a09890] leading-relaxed">{dest.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Math ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">The Economics</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            Do the math. It writes itself.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Four guys. Streamsong for the weekend.
            </p>
            <p>
              Three rental cars runs you $180–$240 each — call it $700 total.
              Gas for three cars: another $150. Parking at the resort: $60.
              The guy who ends up driving home sober? He's not paying, he's owed.
            </p>
            <p>
              Or: one SilverSprinter. Everyone chips in equally. Nobody drives.
              Everybody drinks what they want on the way home. The bags fit.
              The cooler fits. The golf trip actually feels like a golf trip.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              Split four ways, the van often costs less than the rental cars —
              and it's not even close in terms of experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 text-center">Simple Process</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-16 text-center">Three steps and you're done.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Check the dates',
                body: 'Pick your tee time weekend. Check availability on the booking page. Hold the dates with a deposit.',
              },
              {
                step: '02',
                title: 'Sign through Outdoorsy',
                body: 'Rental agreement and insurance are handled through Outdoorsy. Clean, simple, protected. Takes five minutes.',
              },
              {
                step: '03',
                title: 'Load up and roll',
                body: 'Pick up the van. Stock the fridge. Load the bags. Drive to the best golf trip your group has ever taken.',
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="border border-[#433d38]/50 bg-[#1a1612] p-8">
                <p className="font-serif text-5xl text-[#433d38] mb-6">{step}</p>
                <h3 className="font-serif text-xl text-[#c9a96e] mb-4">{title}</h3>
                <p className="text-sm text-[#5f5850] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 border-t border-[#433d38]/40 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">One More Thing</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6 leading-tight">
            Stop talking about it.<br />
            <span className="text-[#c9a96e]">Book the van.</span>
          </h2>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-[#a09890] mb-12 text-lg leading-relaxed">
            There's one van. Weekends fill up — especially fall and spring.
            If you've been saying "we should do Streamsong" for three years,
            now is a good time to stop saying it.
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
