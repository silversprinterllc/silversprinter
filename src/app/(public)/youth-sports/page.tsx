import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Trophy } from 'lucide-react'

export const metadata = {
  title: 'Youth Sports Travel Teams — Sterling Route',
  description: 'One van. 10 athletes. Flag football, soccer, volleyball — travel tournaments from Palm Beach County done right. Special team rates available.',
}

export default function YouthSportsPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/gallery/DSC04726.JPG"
          alt="Sterling Route — built for travel teams"
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">For Travel Teams · Palm Beach County</p>

          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8 text-[#f0e6d0]">
            They Play Together.<br />
            <span className="text-[#c9a96e]">They Should Ride Together.</span>
          </h1>

          <p className="text-[#a09890] text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 font-serif italic">
            Three minivans. Four separate GPS routes. Two kids who got carsick.
            One dad who took the wrong exit and missed warmups.
            There&apos;s a better way.
          </p>

          {/* Stats bar */}
          <div className="border border-[#433d38]/50 bg-[#1a1612]/80 backdrop-blur-sm px-8 py-6 mb-12 max-w-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '10', label: 'Seats' },
                { value: '✓', label: 'All Gear Fits' },
                { value: '1', label: 'Driver' },
                { value: '100%', label: 'Tournament Ready' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-serif text-2xl text-[#c9a96e]">{value}</p>
                  <p className="text-xs tracking-widest uppercase text-[#5f5850] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/insurance"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-semibold hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Check Availability <ArrowRight size={16} />
            </Link>
            <Link
              href="#team-rates"
              className="inline-flex items-center justify-center px-10 py-4 border border-[#433d38] text-[#a09890] font-sans text-sm tracking-widest uppercase hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors duration-200"
            >
              Team Rates
            </Link>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto space-y-8 text-[#a09890] text-lg leading-relaxed">
          <p>
            Tournament weekend starts Friday night. You&apos;ve got 9 players, a cooler, six equipment bags,
            and a group chat with 23 unread messages about who&apos;s driving who. Someone&apos;s parents
            can&apos;t make it. Someone else needs to leave early. The caravan has already fallen apart
            and you haven&apos;t left the parking lot.
          </p>
          <p>
            Your team spent six months practicing together. They should spend the two hours to Orlando
            together too. The pre-game energy in that van — music up, jerseys on, everyone locked in —
            that&apos;s part of the experience. You can&apos;t replicate it across three separate vehicles.
          </p>
          <p className="text-[#f0e6d0] font-serif text-2xl italic border-l-2 border-[#c9a96e] pl-6">
            One van. One driver. Everybody in. That&apos;s it.
          </p>
        </div>
      </section>

      {/* ── Who This Is For ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">Use Cases</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0] mb-16">
            Built for Travel Teams
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                sport: 'Flag Football',
                body: 'WCFL, PBG, Acreage leagues. Regional tournaments. Championship weekends. The van fits your whole roster.',
              },
              {
                sport: 'Soccer',
                body: 'Travel league weekends to Sarasota, Vero Beach, Orlando. Bags, balls, and a full bench.',
              },
              {
                sport: 'Volleyball',
                body: 'Club tournament season runs year-round. Early Saturday mornings are better when everyone rides together.',
              },
              {
                sport: 'Basketball',
                body: 'AAU tournaments. Convention center venues. The whole team, one arrival.',
              },
              {
                sport: 'Baseball & Softball',
                body: 'Gear-heavy sports need gear-friendly transport. The van handles it.',
              },
              {
                sport: 'Any Travel Team',
                body: 'If you\'ve got 8–10 athletes and a tournament this season, this is for you.',
              },
            ].map(({ sport, body }) => (
              <div
                key={sport}
                className="border-l-2 border-[#433d38] bg-[#1a1612] p-8 hover:border-[#c9a96e] transition-colors duration-200"
              >
                <h3 className="font-serif text-xl text-[#c9a96e] mb-3">{sport}</h3>
                <p className="text-sm text-[#a09890] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Coach Perspective ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">From a Coach</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0] mb-10">
            I Know What Tournament Weekends Look Like
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              I coach youth football. I&apos;ve done the caravan. I&apos;ve been the guy waiting in a parking lot
              for 20 minutes while parents trickle in from three different directions. I&apos;ve watched kids
              arrive at a tournament scattered and distracted instead of together and ready. It matters.
            </p>
            <p>
              This van exists because we needed it for our own family — five kids, a lot of miles, no interest
              in flying. When it&apos;s not on a family trip, it&apos;s available for groups who want to travel right.
              Youth teams get a special rate because I&apos;ve been on that sideline and I know what the budget
              looks like.
            </p>
          </div>

          <div className="w-16 h-px bg-[#c9a96e] mt-10" />
        </div>
      </section>

      {/* ── The Van for Teams ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">The Details</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0] mb-16">
            What Your Team Gets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '10 Seats, All Configured',
                body: '2 captain chairs up front, 4 captain chairs in the main cabin, 2 rear benches. Every athlete has a real seat. No third-row sardines.',
              },
              {
                title: 'Gear Storage',
                body: 'Equipment bags, coolers, ball bags — the Sprinter has the cargo capacity to handle a full team\'s worth of gear.',
              },
              {
                title: '32" TV + WiFi',
                body: 'Film session on the way there. Celebration playlist on the way back. Or just let them watch whatever — they earned it.',
              },
              {
                title: 'Private Commode',
                body: 'Early morning departures and long drives don\'t have to mean gas station stops. There\'s a bathroom on board.',
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

      {/* ── Team Culture ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">More Than a Ride</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0] mb-16">
            The Bus Ride Is Part of the Game
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#433d38]/30">
            {[
              {
                title: 'Team Cohesion',
                body: 'There\'s a reason championship teams talk about the bus rides. The two hours together before a game — that\'s where inside jokes form, where the quiet kid finally opens up, where the team becomes a team. You can\'t manufacture that. But you can create the conditions for it.',
              },
              {
                title: 'Coachable Moments',
                body: 'Film on the screen. Game plan conversation. Pre-game talk without the parking lot chaos around you. The ride in is 90 minutes of focused preparation. Use it. The van is a rolling film room, chalk talk session, and team meeting — all before you hit the field.',
              },
              {
                title: 'Shared Experience',
                body: 'Win or lose, they\'ll remember the ride home. That\'s where the real debrief happens — not the formal one, the one between teammates. Those conversations build culture. A caravan of minivans doesn\'t give you that. One van does.',
              },
              {
                title: 'Convenience for Families',
                body: 'Parents don\'t have to drive. One vehicle, one departure time, one arrival. Families who can\'t make the trip know their kid is with the team, not riding with someone they barely know. That peace of mind matters more than people say.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-[#0d0b09] p-10">
                <h3 className="font-serif text-xl text-[#c9a96e] mb-4">{title}</h3>
                <p className="text-sm text-[#a09890] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-l-2 border-[#c9a96e] pl-8 max-w-2xl">
            <p className="font-serif text-2xl text-[#f0e6d0] italic leading-relaxed">
              &ldquo;The caravan gets you there. The van gets you there together.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── Team Rates ── */}
      <section id="team-rates" className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">Special Pricing for Youth Travel Teams</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0] mb-12">
            Team Rates
          </h2>

          <div className="border border-[#c9a96e]/40 bg-[#1a1612] p-10 mb-10">
            <div className="mb-8">
              <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-2">Standard Daily Rate</p>
              <p className="font-serif text-4xl text-[#f0e6d0]">$995<span className="text-lg text-[#5f5850]">/day</span></p>
            </div>

            <div className="border-t border-[#433d38]/40 pt-8 mb-8">
              <p className="text-[#a09890] text-sm leading-relaxed mb-6">
                We offer special team pricing for verified youth travel teams. Tell us about your program —
                league, sport, how often you travel — and we&apos;ll take care of you. Reach out before you book.
              </p>
              <a
                href="mailto:hello@sterlingroute.com?subject=Youth Team Rate Inquiry"
                className="inline-flex items-center gap-2 text-sm text-[#c9a96e] hover:text-[#d4b87a] transition-colors tracking-wide"
              >
                Ask about team rates → hello@sterlingroute.com
              </a>
            </div>

            <div className="border-t border-[#433d38]/40 pt-8 space-y-3">
              {[
                'Subject to availability — tournament weekends book fast',
                'All standard rental terms apply (rental agreement, insurance, deposit)',
                'Mention your team, league, and travel frequency when you reach out',
              ].map((item) => (
                <p key={item} className="text-xs text-[#5f5850] leading-relaxed flex items-start gap-2">
                  <span className="text-[#433d38] flex-shrink-0 mt-0.5">—</span>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <Link
            href="/insurance"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-semibold hover:bg-[#d4b87a] transition-colors duration-200"
          >
            Check Availability <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Road Club for Teams ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">For Programs That Travel Regularly</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0] mb-4">
            The Road Club Makes the Math Easy.
          </h2>
          <p className="text-[#a09890] text-lg mb-16 max-w-2xl leading-relaxed">
            Four charter seats. $22,500/year. 32 days included — one Signature Week locked at enrollment, 25 flexible day-credits at $750/day. If your program moves 10+ times a season, one seat covers it all and then some.
          </p>

          {/* Comparison */}
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#433d38]">
                  <th className="text-left py-4 px-6 text-xs tracking-[0.2em] uppercase text-[#5f5850] font-normal">Option</th>
                  <th className="text-center py-4 px-6 text-xs tracking-[0.2em] uppercase text-[#5f5850] font-normal">Days Available</th>
                  <th className="text-center py-4 px-6 text-xs tracking-[0.2em] uppercase text-[#5f5850] font-normal">Annual Cost</th>
                  <th className="text-center py-4 px-6 text-xs tracking-[0.2em] uppercase text-[#c9a96e] font-normal">Effective $/Day</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#433d38]/40 bg-[#1a1612]">
                  <td className="py-5 px-6 font-serif text-[#f0e6d0]">Sterling Road Club Seat</td>
                  <td className="py-5 px-6 text-center text-[#a09890]">32 days</td>
                  <td className="py-5 px-6 text-center text-[#c9a96e] font-medium">$22,500/yr</td>
                  <td className="py-5 px-6 text-center font-serif text-xl text-[#c9a96e]">$703</td>
                </tr>
                <tr className="border-b border-[#433d38]/40 opacity-50">
                  <td className="py-5 px-6 text-[#5f5850]">Public Booking (Rack Rate)</td>
                  <td className="py-5 px-6 text-center text-[#5f5850]">As available</td>
                  <td className="py-5 px-6 text-center text-[#5f5850]">Pay per trip</td>
                  <td className="py-5 px-6 text-center text-[#5f5850]">$900–$1,295</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-[#433d38]/50 bg-[#1a1612] p-8 mb-8 max-w-2xl">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">Example: 12-Tournament Season</p>
            <p className="text-[#a09890] text-sm leading-relaxed mb-3">
              Rack rate: 12 days × avg $950 = <span className="text-[#f0e6d0]">$11,400/year</span>
            </p>
            <p className="text-[#a09890] text-sm leading-relaxed mb-3">
              Road Club: 12 day-credits from your 25 included = <span className="text-[#c9a96e]">already covered</span>
            </p>
            <p className="text-[#5f5850] text-xs leading-relaxed border-t border-[#433d38] pt-4 mt-4">
              You still have 13 credits left in the year. Priority booking means you get tournament weekends before the calendar opens to the public. Four seats total — applications are accepted now.
            </p>
          </div>

          <Link
            href="/sterling-reserve"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-[#c9a96e] text-[#c9a96e] font-sans text-sm tracking-widest uppercase hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-colors duration-200"
          >
            Apply for a Road Club Seat <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Tournament Destinations ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6 text-center">From Palm Beach County</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f0e6d0] mb-4 text-center">
            Where Teams Go
          </h2>
          <p className="text-[#5f5850] text-center mb-16 text-sm">All within a day&apos;s drive.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { name: 'Orlando / ESPN Wide World of Sports', drive: '3 hours' },
              { name: 'Tampa / Hillsborough Sports Complex', drive: '3.5 hours' },
              { name: 'Sarasota / Venice', drive: '2.5 hours' },
              { name: 'Vero Beach / Treasure Coast', drive: '1 hour' },
              { name: 'Fort Lauderdale / Miami', drive: '1.5 hours' },
              { name: 'Gainesville / Ocala', drive: '3 hours' },
              { name: 'Jacksonville / TPC Sawgrass area', drive: '5 hours' },
              { name: 'Anywhere in Florida', drive: "It's a Sprinter. It runs." },
            ].map(({ name, drive }) => (
              <div key={name} className="border border-[#433d38]/50 bg-[#1a1612] p-6 flex items-center justify-between gap-4">
                <p className="text-sm text-[#f0e6d0] leading-snug">{name}</p>
                <p className="text-xs text-[#5f5850] flex-shrink-0">{drive}</p>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-[#433d38] pl-6">
            <p className="text-sm text-[#5f5850] leading-relaxed">
              Multi-day tournament weekend? The rear benches fold flat and sleep 2.
              Some teams stay over — saves hotels, keeps everyone together.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sponsorship ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">Sterling Route at Your League</p>
          <h2 className="font-serif text-2xl md:text-3xl text-[#f0e6d0] mb-8">
            We Sponsor Local.
          </h2>

          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed">
            <p>
              Sterling Route supports youth sports leagues in Palm Beach County — WCFL, Palm Beach Gardens,
              The Acreage. If your league is interested in a sponsorship partnership, we&apos;d love to talk.
            </p>
            <p>
              Banner, van photo, QR code. Parents scan it at the game. Simple.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="mailto:hello@sterlingroute.com"
              className="text-sm text-[#c9a96e] hover:text-[#d4b87a] transition-colors tracking-wide"
            >
              Reach out at hello@sterlingroute.com
            </a>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-32 px-6 bg-[#0d0b09] border-t border-[#433d38]/40 text-center">
        <div className="max-w-2xl mx-auto">
          <Trophy size={32} className="text-[#c9a96e] mx-auto mb-8" />
          <h2 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6 leading-tight">
            Tournament Weekend<br />
            <span className="text-[#c9a96e]">Is Coming.</span>
          </h2>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-[#a09890] mb-12 text-lg leading-relaxed">
            Book early — weekends fill fast and there&apos;s only one van.
          </p>
          <Link
            href="/insurance"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-semibold hover:bg-[#d4b87a] transition-colors duration-200"
          >
            Check Availability <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}
