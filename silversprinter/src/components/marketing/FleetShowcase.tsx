import Link from 'next/link'
import { Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface VehicleCardProps {
  name: string
  slug: string
  tagline: string
  capacity: number
  basePrice: number
  features: string[]
}

export function VehicleCard({ name, slug, tagline, capacity, basePrice, features }: VehicleCardProps) {
  return (
    <div className="group border border-[#433d38]/50 bg-[#1a1612] rounded-lg overflow-hidden hover:border-[#c9a96e]/40 transition-all duration-300">
      <div className="aspect-video bg-[#2a2520] flex items-center justify-center">
        <span className="text-[#433d38] font-serif text-lg">{name}</span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-xl text-[#f0e6d0]">{name}</h3>
          <div className="flex items-center gap-1 text-[#5f5850] text-sm">
            <Users size={14} />
            <span>{capacity}</span>
          </div>
        </div>
        <p className="text-sm text-[#a09890] mb-4">{tagline}</p>
        <ul className="space-y-1 mb-6">
          {features.slice(0, 3).map((f) => (
            <li key={f} className="text-xs text-[#5f5850] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c9a96e] flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <span className="font-serif text-[#c9a96e] text-lg">from ${basePrice}</span>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/fleet/${slug}`} className="flex items-center gap-1">
              Details <ArrowRight size={14} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function FleetShowcase({ vehicles }: { vehicles: VehicleCardProps[] }) {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <hr className="gold-rule mb-16 max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Our Fleet</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">Three icons. One standard.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <VehicleCard key={v.slug} {...v} />
          ))}
        </div>
      </div>
    </section>
  )
}
