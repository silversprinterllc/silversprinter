export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default async function FleetPage() {
  let vehicles: Awaited<ReturnType<typeof prisma.vehicle.findMany>> = []
  try {
    vehicles = await prisma.vehicle.findMany({
      where: { status: { not: 'RETIRED' } },
      orderBy: { basePrice: 'asc' },
    })
  } catch {
    // DB not yet connected
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Our Fleet</p>
          <h1 className="font-serif text-5xl text-[#f0e6d0]">Three icons. One standard.</h1>
          <p className="text-[#5f5850] mt-4 max-w-xl mx-auto">
            Every vehicle maintained to exacting standards. Every detail considered before you board.
          </p>
        </div>

        <div className="space-y-12">
          {vehicles.map((v, i) => (
            <div key={v.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#433d38]/50 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="aspect-video lg:aspect-auto bg-[#2a2520] flex items-center justify-center">
                <span className="font-serif text-2xl text-[#433d38]">{v.name}</span>
              </div>
              <div className="p-10 flex flex-col justify-center bg-[#1a1612]">
                <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-2">{v.make} {v.model} · {v.year}</p>
                <h2 className="font-serif text-4xl text-[#f0e6d0] mb-2">{v.name}</h2>
                {v.tagline && <p className="text-[#a09890] mb-4 italic">{v.tagline}</p>}
                {v.description && <p className="text-sm text-[#5f5850] mb-6 leading-relaxed">{v.description}</p>}

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                  {v.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[#a09890]">
                      <span className="w-1 h-1 rounded-full bg-[#c9a96e] flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif text-3xl text-[#c9a96e]">from ${Number(v.basePrice)}</span>
                    <div className="flex items-center gap-1 text-xs text-[#5f5850] mt-1">
                      <Users size={12} /> {v.capacity} passengers
                    </div>
                  </div>
                  <Button size="lg" asChild>
                    <Link href={`/fleet/${v.slug}`} className="flex items-center gap-2">
                      View Details <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
