import Image from 'next/image'
import Link from 'next/link'
import { Users, Bath, UtensilsCrossed, Tv2, BedDouble, Flag, Trophy, Briefcase, PartyPopper } from 'lucide-react'
import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/marketing/HeroSection'

const amenities = [
  {
    icon: Users,
    title: 'Seating for 10',
    description: '2 captain chairs up front · 4 captain chairs rear · 2 side-facing bench seats (2 each)',
  },
  {
    icon: Bath,
    title: 'Private Commode & Sink',
    description: 'Onboard private restroom so you never have to stop on a long haul.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Microwave & Mini Fridge',
    description: 'Keep your food and drinks cold. Reheat meals on the road.',
  },
  {
    icon: Tv2,
    title: '32" TV · Bluetooth · WiFi',
    description: 'Stream anything via WiFi hotspot. Cast from your phone via Bluetooth.',
  },
  {
    icon: BedDouble,
    title: 'Sleeping Configuration',
    description: 'Bench seats fold flat to create a full-size sleeping area for 2.',
  },
]

const personas = [
  {
    icon: Flag,
    title: 'Golf Groups',
    description: 'Haul your crew, clubs, bags, and coolers to Streamsong, TPC Sawgrass, or Pinehurst. Multi-day trips made easy.',
  },
  {
    icon: Trophy,
    title: 'Game Day',
    description: 'Away games for Hurricanes, Gators, and Seminoles fans. Roll in tailgate-ready with everyone in one ride.',
  },
  {
    icon: Briefcase,
    title: 'Corporate',
    description: 'Site visits, client tours, and team events done in style. Perfect for contractor and real estate groups.',
  },
  {
    icon: PartyPopper,
    title: 'Family & Occasions',
    description: 'Weddings, birthdays, reunions, and road trips. Make the journey part of the celebration.',
  },
]

const heroPhotos = [
  { src: '/gallery/DSC04726.JPG', alt: 'Mercedes Sprinter — exterior side profile' },
  { src: '/gallery/DSC04731.JPG', alt: 'Mercedes Sprinter — front three-quarter' },
  { src: '/gallery/DSC04741.JPG', alt: 'Mercedes Sprinter — front view' },
  { src: '/gallery/DSC04746.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04751.JPG', alt: 'Exterior detail' },
  { src: '/gallery/DSC04756.JPG', alt: 'Exterior detail' },
]

export default function HomePage() {
  return (
    <div className="bg-[#0a0a0a]">
      <PublicNav />
      <HeroSection />

      {/* ── The Van ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">The Van</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-4">
              A suite on wheels
            </h2>
            <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-5" />
            <p className="text-[#a09890] max-w-xl mx-auto text-sm leading-relaxed">
              One premium Mercedes Sprinter, configured for comfort and adventure. Everything you need — nothing you don't.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="border border-[#433d38]/50 bg-[#1a1612] p-8 flex flex-col gap-4 hover:border-[#c9a96e]/40 transition-colors duration-300"
              >
                <Icon size={28} className="text-[#c9a96e]" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-[#f0e6d0]">{title}</h3>
                <p className="text-sm text-[#5f5850] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personas ── */}
      <section className="py-24 px-6 bg-[#0d0b09] border-t border-[#433d38]/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Perfect For</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">
              Who rides Silver Sprinter
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personas.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="border border-[#433d38]/50 bg-[#1a1612] p-8 flex flex-col gap-4 hover:border-[#c9a96e]/40 transition-colors duration-300"
              >
                <Icon size={28} className="text-[#c9a96e]" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-[#f0e6d0]">{title}</h3>
                <p className="text-sm text-[#5f5850] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Strip ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Gallery</p>
              <h2 className="font-serif text-4xl text-[#f0e6d0]">See inside &amp; out</h2>
            </div>
            <Link
              href="/gallery"
              className="text-sm text-[#c9a96e] hover:text-[#f0e6d0] tracking-wide transition-colors border-b border-[#c9a96e]/40 hover:border-[#f0e6d0]/40 pb-0.5"
            >
              View All 25 Photos →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {heroPhotos.map((photo) => (
              <Link
                key={photo.src}
                href="/gallery"
                className="group relative aspect-[4/3] overflow-hidden bg-[#1a1612] block"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-[#c9a96e]/0 group-hover:border-[#c9a96e]/50 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40 bg-[#0d0b09]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Ready to Roll</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6">
            Ready to Book?
          </h2>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-[#a09890] mb-10 leading-relaxed">
            Reserve South Florida's finest mobile suite for your next trip. Rental agreement and insurance handled simply through Outdoorsy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-medium hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Check Availability
            </Link>
            <a
              href="#outdoorsy"
              className="inline-flex items-center justify-center px-8 py-3 border border-[#c9a96e] text-[#c9a96e] font-sans text-sm tracking-widest uppercase font-medium hover:bg-[#c9a96e]/10 transition-colors duration-200"
            >
              View on Outdoorsy
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
