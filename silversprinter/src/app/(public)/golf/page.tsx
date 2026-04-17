import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Golf Trip Van Rental — Sterling Route',
  description:
    'Two foursomes, one van. Golf trips to Streamsong, Cabot Citrus Farms, TPC Sawgrass from Palm Beach County. Self-drive luxury Sprinter rental.',
}

export default function GolfPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Golf</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6">
            Two foursomes. One van.
          </h1>
          <p className="text-[#a09890] text-lg max-w-2xl mx-auto leading-relaxed">
            Golf trips to Streamsong, Cabot Citrus Farms, TPC Sawgrass, and beyond. Sterling Route carries your whole group — clubs, coolers, and all — in one custom luxury van from Palm Beach County.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/book">Reserve the Van</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { stat: '10', label: 'Passengers', detail: 'Full foursome plus caddies and guests' },
            { stat: '$795', label: 'From/Day', detail: 'Self-drive. No driver required.' },
            { stat: 'MAD', label: 'Daycruiser D6', detail: 'Private commode, 32" TV, full galley' },
          ].map(({ stat, label, detail }) => (
            <div key={label} className="border border-[#433d38]/50 bg-[#1a1612] p-8 text-center">
              <span className="font-serif text-4xl text-[#c9a96e]">{stat}</span>
              <p className="font-serif text-lg text-[#f0e6d0] mt-2 mb-1">{label}</p>
              <p className="text-sm text-[#5f5850]">{detail}</p>
            </div>
          ))}
        </div>

        <div className="border border-[#c9a96e]/30 bg-[#c9a96e]/5 p-12 text-center">
          <h2 className="font-serif text-3xl text-[#f0e6d0] mb-4">Ready to tee it up?</h2>
          <p className="text-[#a09890] mb-8">Check availability and reserve the van for your golf trip.</p>
          <Button size="lg" asChild>
            <Link href="/book">Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
