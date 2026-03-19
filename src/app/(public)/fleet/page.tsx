import Image from 'next/image'
import Link from 'next/link'
import {
  Users,
  Bath,
  UtensilsCrossed,
  Tv2,
  BedDouble,
  Wifi,
  Refrigerator,
  Microwave,
  MonitorSmartphone,
} from 'lucide-react'

const specs = [
  { label: 'Vehicle', value: 'Mercedes-Benz Sprinter' },
  { label: 'Passenger Capacity', value: '10 passengers' },
  { label: 'Seating', value: '2 front captain chairs · 4 rear captain chairs · 2 benches' },
  { label: 'Sleeping', value: 'Benches fold to full-size sleeping area (sleeps 2)' },
  { label: 'Restroom', value: 'Private commode + sink' },
  { label: 'Kitchen', value: 'Microwave + mini fridge' },
  { label: 'Entertainment', value: '32" TV · Bluetooth · WiFi streaming' },
  { label: 'Rental Platform', value: 'Outdoorsy (rental agreement & insurance included)' },
  { label: 'Location', value: 'South Florida' },
  { label: 'Drive Type', value: 'Self-drive rental' },
]

const features = [
  {
    icon: Users,
    title: '10 Passengers',
    description: '2 captain chairs up front, 4 in the rear, plus 2 side-facing benches seating 2 each.',
  },
  {
    icon: Bath,
    title: 'Private Restroom',
    description: 'Onboard commode and sink — no unplanned stops on long hauls.',
  },
  {
    icon: Refrigerator,
    title: 'Mini Fridge',
    description: 'Keep drinks cold and food fresh for the whole trip.',
  },
  {
    icon: Microwave,
    title: 'Microwave',
    description: 'Heat up meals without stopping at a restaurant.',
  },
  {
    icon: Tv2,
    title: '32" Television',
    description: 'Big-screen entertainment for the whole group.',
  },
  {
    icon: Wifi,
    title: 'WiFi Hotspot',
    description: 'Stream content and stay connected on the road.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Bluetooth Audio',
    description: 'Connect your phone and control the playlist.',
  },
  {
    icon: BedDouble,
    title: 'Sleeps 2',
    description: 'Benches fold flat into a full-size sleeping area for overnight trips.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Road-Trip Ready',
    description: 'Everything onboard so your crew stays comfortable for hundreds of miles.',
  },
]

export default function TheVanPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">

      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <Image
          src="/gallery/DSC04726.JPG"
          alt="Silver Sprinter Mercedes van — exterior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="relative z-10 px-6 pb-16 max-w-4xl mx-auto w-full">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">The Van</p>
          <h1 className="font-serif text-5xl md:text-7xl text-[#f0e6d0] leading-tight mb-4">
            South Florida's<br />
            <span className="text-[#c9a96e]">Mobile Suite</span>
          </h1>
          <p className="text-[#a09890] text-base max-w-xl">
            One premium Mercedes Sprinter. 10 passengers. Everything you need for golf trips, game days, corporate outings, and family adventures.
          </p>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="border-y border-[#433d38]/50 bg-[#1a1612]/80 px-8 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10', label: 'Passengers' },
            { value: 'Private', label: 'Commode + Sink' },
            { value: 'WiFi', label: 'Streaming' },
            { value: 'Sleeps', label: '2' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-2xl text-[#c9a96e]">{value}</p>
              <p className="text-xs tracking-widest uppercase text-[#5f5850] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features Grid ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Amenities</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">
              Everything inside
            </h2>
            <div className="w-16 h-px bg-[#c9a96e] mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
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

      {/* ── Specs Table ── */}
      <section className="py-16 px-6 border-t border-[#433d38]/40 bg-[#0d0b09]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Specifications</p>
            <h2 className="font-serif text-4xl text-[#f0e6d0]">The details</h2>
          </div>

          <div className="divide-y divide-[#433d38]/40">
            {specs.map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row py-4 gap-1 sm:gap-8">
                <span className="text-xs tracking-[0.15em] uppercase text-[#5f5850] sm:w-48 flex-shrink-0">
                  {label}
                </span>
                <span className="text-sm text-[#a09890]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-[#433d38]/40 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Ready to Go</p>
          <h2 className="font-serif text-5xl text-[#f0e6d0] mb-6">Book the van</h2>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-[#a09890] mb-10 leading-relaxed">
            Rental agreement and insurance are handled through Outdoorsy — simple, fast, and protected.
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

    </div>
  )
}
