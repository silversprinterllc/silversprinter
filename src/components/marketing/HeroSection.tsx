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
          South Florida · Self-Drive Rental
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#f0e6d0] leading-[1.05] mb-6">
          South Florida's Finest<br />
          <span className="text-gold-gradient">Mobile Suite</span>
        </h1>
        <p className="text-base md:text-lg text-[#a09890] max-w-xl mx-auto mb-10 leading-relaxed">
          One premium Mercedes Sprinter van · 10 passengers · Private commode · WiFi streaming
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/book">Check Availability</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/fleet">The Van</Link>
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 mt-20 w-full max-w-3xl border border-[#433d38]/50 bg-[#1a1612]/80 backdrop-blur-sm px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10', label: 'Passengers' },
            { value: 'Private', label: 'Commode' },
            { value: 'WiFi', label: '+ Streaming' },
            { value: 'Sleeps', label: '2' },
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
