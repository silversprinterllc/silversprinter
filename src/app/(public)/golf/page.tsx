import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Golf Trips — SilverSprinter',
  description: 'Two foursomes. One van. A weekend at Streamsong, Cabot, or Hammock Beach that your group will talk about for years. South Florida\'s premier golf trip van.',
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
            Two Foursomes.<br />
            One Van.<br />
            <span className="text-[#c9a96e]">A Weekend Worth Remembering.</span>
          </h1>

          <p className="text-[#a09890] text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 font-serif italic">
            Eight guys. Eight sets of clubs. One cargo carrier.
            Friday afternoon you leave South Florida.
            Sunday evening you come home different.
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

      {/* ── The Weekend ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">The Trip</p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-10 leading-tight">
            Here's how the weekend goes.
          </h2>

          <div className="space-y-8 text-[#a09890] text-lg leading-relaxed">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Friday Afternoon</p>
              <p>
                The cargo carrier is loaded with all eight bags. Everyone meets at one spot —
                no caravan, no three separate departure texts. One person drives down.
                The other seven settle in. The mini fridge is stocked.
                The Ryder Cup highlights are already on the 32" screen.
                Someone is giving a scouting report on Black versus Blue.
                You&apos;re still in Palm Beach County and the weekend is already good.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Friday Evening</p>
              <p>
                You arrive at Streamsong with enough light for a twilight round —
                or you make a reservation at the clubhouse and do it right.
                Either way, you&apos;re not scattered across three different check-in lines.
                Everyone is there. The weekend has officially started.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Saturday</p>
              <p>
                First tee, 7am. Two foursomes. Eighteen holes for everyone.
                Lunch at the turn or back at the lodge. For the ambitious ones —
                and there&apos;s always a couple — another eighteen in the afternoon.
                Thirty-six holes on one of the best courses in Florida.
                By dinner, the handicap arguments are already in full swing.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Saturday Evening</p>
              <p>
                A proper dinner. The kind where you don&apos;t look at your watch.
                Everyone tells their version of the day. Someone brings up the shot
                on 14 that nobody expected. The stories start taking shape —
                the ones that will still come up years from now.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Sunday Morning</p>
              <p>
                One more round. Fresh legs, renewed confidence, familiar trash talk.
                After the back nine, bags go back in the carrier. Someone else drives home.
                The van is quieter now — not because it&apos;s less good, but because
                everyone is full and content and thinking about the same things.
              </p>
            </div>

            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              That&apos;s not just a golf trip.
              That&apos;s the one they talk about every time someone mentions Streamsong.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Problem With the Old Way ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8">The Alternative</p>

          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            How it goes without the van.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Three separate cars. Somebody&apos;s bag gets crammed sideways in a trunk
              designed for groceries. You spend the first nine holes wondering
              if the shaft is bent.
            </p>
            <p>
              Everyone arrives at different times. The first hour is just logistics —
              who&apos;s in what room, who drove with who, who&apos;s waiting at the bag drop.
              The trip doesn&apos;t really start until Saturday morning.
              You&apos;ve already burned Friday night.
            </p>
            <p>
              By Sunday afternoon, someone&apos;s tired, someone&apos;s sore,
              and someone drew the short straw on the drive home.
              Three hours back to South Florida alone with your thoughts
              instead of with your group.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              You can do better. The van is how.
            </p>
          </div>
        </div>
      </section>

      {/* ── Self-Drive Note ── */}
      <section className="py-16 px-6 border-t border-[#433d38]/40 bg-[#1a1612]">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <p className="font-serif text-5xl text-[#433d38]">→</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">How It Works</p>
            <p className="text-[#a09890] text-lg leading-relaxed">
              SilverSprinter is a <strong className="text-[#f0e6d0]">self-drive rental.</strong> One
              person in your group drives — you work that out beforehand. Maybe it rotates:
              one guy takes Friday&apos;s run down, a fresh set of hands takes Sunday home.
              Split eight ways, the van still costs less than three rental cars,
              and seven people are riding in serious comfort the entire way.
              Everybody wins. Especially whoever calls shotgun.
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
                  '10 seats — 2 foursomes ride together, no one left behind',
                  'Cargo carrier compatible — all 8 bags fit, none crammed',
                  'Mini fridge — stock it your way the night before',
                  'Private commode & sink — no gas station detours',
                  '32" TV with Bluetooth & WiFi streaming',
                  'Microwave — real food on a long drive',
                  'Bench seats fold flat — sleep on the overnight haul to Pinehurst',
                  'Self-drive — you set the schedule, the pace, the playlist',
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
          <p className="text-[#5f5850] text-center mb-16 text-sm">These are the drives worth making. We&apos;ve thought through every one of them.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Streamsong Resort',
                location: 'Bowling Green, FL · 2.5 hrs',
                note: 'Black, Red, and Blue. Three of the best courses in the state, on the same property. The obvious choice for a first big trip. You\'ll be back.',
              },
              {
                name: 'Cabot Citrus Farms',
                location: 'Ocala, FL · 3 hrs',
                note: 'The new standard for Florida golf. Cabot\'s first US property. Four courses in the works, already worth the drive. Get there before everyone else does.',
              },
              {
                name: 'Hammock Beach Golf Resort',
                location: 'Palm Coast, FL · 3.5 hrs',
                note: 'The Ocean Course. Atlantic views on most holes, Tom Watson design, and a resort that makes you want to stay an extra day. You probably will.',
              },
              {
                name: 'TPC Sawgrass',
                location: 'Ponte Vedra Beach, FL · 5 hrs',
                note: 'The Stadium Course. You\'ve watched the 17th your whole life. Time to stand on that tee box and find out what you\'re made of.',
              },
              {
                name: 'Innisbrook Resort',
                location: 'Palm Harbor, FL · 3 hrs',
                note: 'Copperhead Course — home of the Valspar Championship. Four courses on property. If the group is serious about golf, this is your weekend.',
              },
              {
                name: 'Pinehurst No. 2',
                location: 'Pinehurst, NC · 10 hrs',
                note: 'A pilgrimage, not a trip. Ten hours up, ten hours back, 18 holes on the greatest course in America. You take shifts. The bench folds flat. You arrive ready.',
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
              Eight guys. Streamsong for the weekend.
            </p>
            <p>
              Three rental cars: $180–$240 each, call it $700.
              Gas for three vehicles: $180. Resort parking: $90.
              Total before anyone tees off: nearly $1,000 just to get there and back —
              in cars that don&apos;t fit the bags comfortably and split the group
              for five hours each way.
            </p>
            <p>
              Or one SilverSprinter. Everyone chips in equally.
              The bags fit. The group is together.
              One person drives each direction — you decide who before you leave.
              Split eight ways, the van lands in the same neighborhood as the rental cars,
              and the experience isn&apos;t in the same zip code.
            </p>
            <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
              Same cost. Completely different trip.
              That&apos;s the whole story.
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 text-center">Simple Process</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-16 text-center">Three steps and you&apos;re done.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Pick your weekend',
                body: 'Choose the course. Check availability. Hold the dates with a deposit. Lock it in before someone else&apos;s group takes your weekend.',
              },
              {
                step: '02',
                title: 'Sign through Outdoorsy',
                body: 'Rental agreement and insurance handled through Outdoorsy. Clean, straightforward, protected. Five minutes.',
              },
              {
                step: '03',
                title: 'Load up and go',
                body: 'Carrier on. Bags in. Fridge stocked. One person drives. Seven people settle in. Best golf trip your group has ever taken.',
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
            There&apos;s one van. Spring and fall weekends fill up fast.
            If your group has been saying &ldquo;we should do Streamsong&rdquo; for three years,
            this is the part where you actually do it.
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
