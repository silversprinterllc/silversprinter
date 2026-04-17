import Link from 'next/link'
import { Briefcase, Users, Target, Tv, Heart, Trophy } from 'lucide-react'

const trips = [
  {
    icon: Target,
    title: 'Golf Trips',
    body: 'Two foursomes, one van. Streamsong, Cabot, Hammock Beach. The weekend your group keeps almost booking.',
    href: '/golf',
  },
  {
    icon: Tv,
    title: 'Game Day',
    body: 'Hurricanes, Gators, Seminoles. The whole crew in one van — tailgate starts at your driveway.',
    href: '/gameday',
  },
  {
    icon: Briefcase,
    title: 'Corporate',
    body: 'Executive team travel, client transport, incentive trips. Net-30 invoicing and dedicated coordination.',
    href: '/corporate',
  },
  {
    icon: Heart,
    title: 'Family & Occasions',
    body: 'Weddings, reunions, milestone birthdays. Every seat filled with people who matter.',
    href: '/family',
  },
  {
    icon: Trophy,
    title: 'Travel Teams',
    body: 'Flag football, soccer, volleyball. Tournament weekends from Palm Beach County. Team rates available.',
    href: '/youth-sports',
  },
  {
    icon: Users,
    title: 'Groups',
    body: 'Bachelorettes, wine tours, any occasion with eight to ten people who deserve to arrive together.',
    href: '/book',
  },
]

export function TripTypes() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 dot-texture" />
      <hr className="gold-rule mb-16 max-w-7xl mx-auto" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Who It&apos;s For</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">Every trip worth taking</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(({ icon: Icon, title, body, href }) => (
            <Link
              key={title}
              href={href}
              className="group border border-[#433d38]/50 bg-[#1a1612] p-8 hover:border-[#c9a96e]/50 transition-colors duration-200"
            >
              <Icon size={24} className="text-[#c9a96e] mb-4" />
              <h3 className="font-serif text-lg text-[#f0e6d0] mb-2 group-hover:text-[#c9a96e] transition-colors duration-200">{title}</h3>
              <p className="text-sm text-[#5f5850] leading-relaxed">{body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
