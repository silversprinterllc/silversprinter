import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6">
      {/* Dot texture */}
      <div className="absolute inset-0 dot-texture" />
      {/* Gold gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#c9a96e08_0%,_transparent_70%)]" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-6">
          West Palm Beach · Self-Drive Luxury
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#f0e6d0] leading-[1.05] mb-6">
          The van South Florida<br />
          <span className="text-gold-gradient">has been missing.</span>
        </h1>
        <p className="text-base md:text-lg text-[#a09890] max-w-xl mx-auto mb-10 leading-relaxed">
          One MAD Daycruiser D6. Ten passengers. Private cabin, commode on board.
          You drive. Available by the day.
        </p>
        <div className="flex justify-center mb-8">
          <div className="border-l-2 border-[#c9a96e] pl-4 max-w-sm text-left">
            <p className="text-xs text-[#5f5850] leading-relaxed">
              <span className="text-[#c9a96e]">One van.</span> When it&apos;s booked, it&apos;s booked.
              Peak weekends and holiday dates go weeks in advance.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/insurance">Check Availability</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/rates">See Rates</Link>
          </Button>
        </div>
      </div>

      {/* Van specs bar */}
      <div className="relative z-10 mt-20 w-full max-w-3xl border border-[#433d38]/50 bg-[#1a1612]/80 backdrop-blur-sm px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10', label: 'Passengers' },
            { value: '$900', label: 'Starting / Day' },
            { value: 'MAD D6', label: 'Daycruiser' },
            { value: 'WPB', label: 'Pickup & Return' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-2xl text-[#c9a96e]">{value}</p>
              <p className="text-xs tracking-widest uppercase text-[#5f5850] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
