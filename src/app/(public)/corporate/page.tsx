import Link from 'next/link'
import type { Metadata } from 'next'
import { Building2, Users, Calendar, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Corporate Travel — Sterling Route',
  description: 'The MAD Daycruiser D6 for executive travel, client transport, and corporate offsites. Self-drive. No driver. All private.',
}

const perks = [
  {
    icon: Building2,
    title: 'Client-Ready on Arrival',
    description: 'Van pre-set before pickup. Temperature, cooler, configuration. Your clients notice the difference between arriving well and arriving adequately.',
  },
  {
    icon: Users,
    title: 'Your Whole Group, One Vehicle',
    description: 'Up to 10 occupants. Leadership retreats, investor tours, site visits, board offsites. One vehicle, one conversation, no splitting the team across two Ubers.',
  },
  {
    icon: Calendar,
    title: 'Road Club for Repeat Travel',
    description: 'Companies that move quarterly should look at the Sterling Road Club — priority calendar access, one upfront payment, preferred daily rate. Van is there when you need it.',
  },
  {
    icon: Shield,
    title: 'Verified Renters Only',
    description: 'Background and license verification before keys. Identity on file. A vehicle that reflects well on your brand because it is maintained to the same standard every time.',
  },
]

const useCases = [
  {
    title: 'Investor & Client Transport',
    body: 'The drive from the airport to the job site is part of the pitch. Arrive in a MAD Daycruiser D6 and the narrative is set before you walk through the door.',
  },
  {
    title: 'Executive Retreats',
    body: 'Leadership team, one vehicle, one conversation the whole way there and back. No logistics tail, no coordination overhead.',
  },
  {
    title: 'Site & Property Tours',
    body: 'Multiple stops. Multiple stakeholders. The van moves the whole group with the same comfort the whole day — not a caravan of rental cars.',
  },
  {
    title: 'Hoadley Group Clients',
    body: 'Real estate clients of the Hoadley Group receive preferred access and rates. If you are touring properties with us, ask about corporate pricing before you book.',
  },
]

export default function CorporatePage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HERO */}
      <section className="py-16 md:py-32 px-4 md:px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-8">Corporate Travel</p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f0e6d0] leading-tight mb-8">
            The Vehicle<br />
            <span className="text-[#c9a96e]">Reflects the Standard.</span>
          </h1>
          <p className="text-lg text-[#a09890] leading-relaxed max-w-2xl mb-6">
            A MAD Daycruiser D6 for executive travel, client transport, and corporate offsites. Self-drive. No driver. Up to 10 occupants. The whole team, one vehicle, no excuses.
          </p>
          <p className="text-sm text-[#5f5850]">From $900/day · Palm Beach County · Road Club available by application</p>
        </div>
      </section>

      {/* WHY CORPORATE */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-12">What It Solves</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#c9a96e]/10">
            {perks.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-[#0a0a0a] p-8 md:p-10">
                <Icon size={20} className="text-[#c9a96e] mb-5" />
                <h3 className="font-serif text-xl text-[#f0e6d0] mb-3">{title}</h3>
                <p className="text-sm text-[#5f5850] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-12">Common Use Cases</p>
          <div className="space-y-0 divide-y divide-[#433d38]/40">
            {useCases.map((uc) => (
              <div key={uc.title} className="py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <h3 className="font-serif text-lg text-[#f0e6d0]">{uc.title}</h3>
                <p className="text-sm text-[#a09890] leading-relaxed md:col-span-2">{uc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVE CTA */}
      <section className="py-24 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-6">Sterling Road Club</p>
          <h2 className="font-serif text-4xl text-[#f0e6d0] mb-6">Move More Than Three Times a Year?</h2>
          <p className="text-[#a09890] text-base leading-relaxed mb-10">
            Four charter seats at $22,500/year. One upfront payment, 32 days loaded, calendar access before the public opens. Van is there when you need it — no calls, no checking, no getting shut out on peak dates.
          </p>
          <Link
            href="/sterling-reserve"
            className="inline-block border border-[#c9a96e]/50 text-[#c9a96e] text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#c9a96e]/10 transition-colors"
          >
            Explore the Road Club →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6 leading-tight">
            Ready to Book?
          </h2>
          <p className="text-[#5f5850] text-base leading-relaxed mb-12 max-w-lg mx-auto">
            Check availability for your dates, or contact us to discuss corporate access and the Road Club.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/insurance"
              className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-[0.2em] uppercase font-medium px-12 py-4 hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Check Availability
            </Link>
            <Link
              href="/contact?type=corporate"
              className="inline-block border border-[#c9a96e]/50 text-[#c9a96e] font-sans text-sm tracking-[0.2em] uppercase px-12 py-4 hover:bg-[#c9a96e]/10 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
