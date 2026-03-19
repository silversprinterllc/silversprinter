import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Game Day — SilverSprinter',
  description: 'Away games for Hurricanes, Gators, and Seminoles fans who are done squeezing into someone\'s Uber. 10 seats. WiFi. Cold drinks. The tailgate starts at your driveway.',
}

export default function GameDayPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/gallery/DSC04751.JPG"
          alt="SilverSprinter — game day ready"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">For Game Day Crews</p>

          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8 text-[#f0e6d0]">
            Because You're Not<br />
            22 Anymore.<br />
            <span className="text-[#c9a96e]">And That's a Good Thing.</span>
          </h1>

          <p className="text-[#a09890] text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 font-serif italic">
            10 seats. A cold fridge. WiFi. Your playlist.
            The tailgate starts the moment you pull out of the driveway.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-semibold hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Reserve Game Day <ArrowRight size={16} />
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

      {/* ── The Old Way ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">The Old Way</p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-10 leading-tight">
            Let's be honest about the Uber situation.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Ten of you want to go to Gainesville for a noon kickoff.
              You check Uber. It's surge pricing. Of course it's surge pricing.
              It's a home game, 80,000 people are moving at the same time,
              and the algorithm knows it.
            </p>
            <p>
              You split into three cars. Somebody's wife has a minivan.
              You feel bad about it. You spend two hours in a caravan
              on I-75 with nobody to talk to because your buddies are in a different car.
            </p>
            <p>
              Parking is $60 cash only. Somebody doesn't have cash.
              Now there's a whole thing.
            </p>
            <p>
              After the game — win or lose — the ride home is the problem.
              Who's driving? How much did he drink? Are we stopping for food?
              Does anyone have room for the guy who took the bus?
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              At some point, the logistics of getting there starts to outweigh
              the fun of actually going.
            </p>
          </div>
        </div>
      </section>

      {/* ── The New Way ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">The Better Way</p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-10 leading-tight">
            One van. One crew. Zero logistics.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Saturday morning. Everyone meets at your place. The fridge in the van
              is already loaded — you stocked it Friday night while you watched
              the injury report. Cooler in the back. Flags on the windows.
            </p>
            <p>
              The whole crew is in one vehicle. For the entire trip.
              That means everyone hears the same pre-game takes.
              Everyone reacts to the same highlights on the 32" screen.
              The trip itself becomes part of the day.
            </p>
            <p>
              You pull up, you park once, and everyone walks in together.
              Not in separate pods, not 40 minutes apart — together,
              the way game day is supposed to be.
            </p>
            <p>
              After the game? Nobody's calculating who owes what on Venmo.
              Nobody's waiting on a surge to calm down.
              You pile back in, someone puts on the post-game show,
              and you debrief the fourth quarter all the way home.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              The van ride is half the experience.
              Stop treating it like the part you survive to get to the game.
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
                src="/gallery/DSC04756.JPG"
                alt="SilverSprinter — exterior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border border-[#c9a96e]/20" />
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">What's Onboard</p>
              <h2 className="font-serif text-4xl text-[#f0e6d0] mb-8">
                Everything game day needs.
              </h2>
              <div className="space-y-4">
                {[
                  '10 seats — captain chairs and benches, nobody\'s cramped',
                  'Mini fridge — stock it with whatever you\'re drinking',
                  'Microwave — hot food on the road, no drive-throughs',
                  'Private commode — no gas station stops',
                  '32" TV — pre-game, RedZone, post-game, all of it',
                  'WiFi & Bluetooth — stream, cast, connect',
                  'Self-drive — you control when you leave, how long you stay',
                  'Room for a cooler, chairs, a canopy — real tailgate gear',
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

      {/* ── The Games ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 text-center">The Trips Worth Making</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-4 text-center">
            Florida fans know these drives.
          </h2>
          <p className="text-[#5f5850] text-center mb-16 text-sm">We're in South Florida. These are the away trips your crew keeps almost taking.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                team: 'Miami Hurricanes',
                venue: 'Hard Rock Stadium',
                location: 'Miami Gardens · 30 min',
                note: 'Home crowd, but the van makes it an event. Show up as a crew, leave as a legend. Away game matchups change every year — check the schedule.',
              },
              {
                team: 'Florida Gators',
                venue: 'Ben Hill Griffin Stadium',
                location: 'Gainesville · 3.5 hrs',
                note: 'The Swamp. Noon kickoff in September heat. Everybody\'s going. The difference is whether you\'re sweating in a Prius or riding up right.',
              },
              {
                team: 'Florida State Seminoles',
                venue: 'Doak Campbell Stadium',
                location: 'Tallahassee · 4.5 hrs',
                note: 'Night game in Tallahassee. You know what that means. One van, ten people, everybody gets home safe. Plan accordingly.',
              },
            ].map((game) => (
              <div key={game.team} className="border border-[#433d38]/50 bg-[#1a1612] p-8">
                <p className="font-serif text-xl text-[#c9a96e] mb-1">{game.team}</p>
                <p className="text-sm text-[#f0e6d0] mb-1">{game.venue}</p>
                <p className="text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-4">{game.location}</p>
                <p className="text-sm text-[#a09890] leading-relaxed">{game.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Reality Check ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">Real Talk</p>

          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            The one conversation nobody wants to have.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Florida college football away games — especially night games —
              are the trips where somebody always has to make the responsible call.
              Who's driving? Did he actually stop? Are we sure?
            </p>
            <p>
              The van removes that entirely. Nobody's the designated driver.
              Nobody's calculating how long ago they had their last drink.
              Nobody's waking up Monday with a story they'd rather not tell.
            </p>
            <p>
              You rent a self-drive van. You designate the most sober person in your crew
              as the driver for that trip. Or you stay overnight and drive back in the morning
              when you're ready. The flexibility is yours.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              Ten people who can all fully enjoy the game
              is worth every dollar of the rental. Full stop.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 bg-[#0d0b09] border-t border-[#433d38]/40 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">Fall Schedule Fills Fast</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6 leading-tight">
            Pick the game.<br />
            <span className="text-[#c9a96e]">Book the van.</span><br />
            Show up right.
          </h2>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-[#a09890] mb-12 text-lg leading-relaxed">
            There is one van. Fall weekends — especially Gator and FSU games —
            go fast. Check availability now before someone else's crew takes your dates.
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
