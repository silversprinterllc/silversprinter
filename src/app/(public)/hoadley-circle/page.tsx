import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hoadley Circle — Private Vehicle Access',
  description: 'Private vehicle access for Hoadley Group Circle clients. South Florida property tours, airport runs, and private transport — with Benjamin.',
  robots: { index: false, follow: false },
}

export default function HoadleyCirclePage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HERO */}
      <section className="relative py-20 md:py-36 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">
            Hoadley Group · Circle Access
          </p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f0e6d0] leading-tight mb-8">
            The van comes<br />
            <span className="text-[#c9a96e]">with the relationship.</span>
          </h1>
          <p className="text-lg text-[#a09890] leading-relaxed max-w-2xl">
            As a Circle client, you have access to a private Mercedes Sprinter for property tours,
            airport transfers, and group transport. Benjamin drives. Ten passengers. Commode on board.
          </p>
        </div>
      </section>

      {/* WHAT THIS IS */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850]">How It Works</p>
          <div className="space-y-6 text-[#a09890] text-lg leading-relaxed font-serif">
            <p>
              When you sign with Hoadley Group, you get access to a private vehicle that most clients
              never know exists until they're inside it. The first time they see it parked out front,
              they typically say two things: "is this yours?" and "can we use it for the Keys trip in October?"
            </p>
            <p>
              The van does property tours differently. You sit in the back. Benjamin drives.
              You see Admirals Cove, Frenchman's Creek, Old Palm — three properties,
              forty miles of Palm Beach County, back to back — without splitting up, without parking in
              four different lots, without losing half the group between stops. The conversation in the
              van between properties is usually where decisions get made.
            </p>
            <p>
              This is a Circle benefit. It's part of how we work with clients who are serious about
              this market.
            </p>
          </div>
        </div>
      </section>

      {/* THE VAN */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">The Vehicle</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6">
              Built for ten people who don't compromise.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#c9a96e]/15">
            {[
              {
                title: 'Ten Passengers',
                body: 'Leather captain\'s chairs. Enough room for your family, your attorney, your architect, and whoever else needs to be in the room before you make an offer.',
              },
              {
                title: 'Private Commode',
                body: 'Full-day tours don\'t require pit stops. Stay on schedule, stay in the van, stay in the conversation.',
              },
              {
                title: 'WiFi + Streaming',
                body: 'Review floor plans, pull title history, get on a call between properties. The van is a mobile office if you need it to be.',
              },
              {
                title: 'Climate Controlled',
                body: 'South Florida in July. You know what that means. The van is always at temperature before you board.',
              },
              {
                title: 'Benjamin Drives',
                body: 'Not a hired driver. Benjamin knows every neighborhood, every access road, every dock. The ride is part of the service.',
              },
              {
                title: 'Sleeps Two',
                body: 'For clients doing extended search trips. Keeps the operation flexible when scheduling multiple consecutive days.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#0a0a0a] p-8 md:p-10">
                <div className="w-8 h-px bg-[#c9a96e] mb-6" />
                <h3 className="font-serif text-xl text-[#f0e6d0] mb-3">{item.title}</h3>
                <p className="text-[#5f5850] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO ACCESS */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">Access</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-10">
            Circle clients. Signed agreement. That's the gate.
          </h2>
          <div className="space-y-5">
            {[
              'Van access is included for all signed Hoadley Group buyer and seller clients.',
              'Benjamin personally handles all Circle client transport. Not contracted out.',
              'Property tours are scheduled through the standard communication channel — no separate booking system.',
              'Extended availability, group logistics, and multi-day arrangements are accommodated on a case-by-case basis.',
              'This is not a public-facing service. Circle access is earned through the brokerage relationship.',
            ].map((term, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-[#c9a96e]/50 mt-1 shrink-0">—</span>
                <p className="text-[#a09890] leading-relaxed">{term}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#5f5850] mb-6">Hoadley Group · Palm Beach County</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6 leading-tight">
            The first step is<br />a signed agreement.
          </h2>
          <p className="text-[#5f5850] text-base leading-relaxed mb-12 max-w-lg mx-auto">
            Van access, off-market notifications, construction assessments, and everything else Circle
            clients get — it all starts with a brokerage agreement and a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://saltwaterestates.com/onboarding/buyer"
              className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Buyer Intake
            </Link>
            <Link
              href="https://saltwaterestates.com/onboarding/seller"
              className="inline-block border border-[#c9a96e]/40 text-[#c9a96e] font-sans text-sm tracking-[0.2em] uppercase font-medium px-10 py-4 hover:border-[#c9a96e] transition-colors duration-200"
            >
              Seller Intake
            </Link>
          </div>
          <p className="mt-10 text-sm text-[#5f5850]">
            Already a client?{' '}
            <Link href="https://saltwaterestates.com/contact" className="text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors">
              Contact Benjamin directly →
            </Link>
          </p>
        </div>
      </section>

    </div>
  )
}
