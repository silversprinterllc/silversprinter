export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Users, Calendar, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
    include: {
      bookings: {
        where: { status: 'COMPLETED' },
        include: { review: true, user: { select: { name: true } } },
        take: 5,
        orderBy: { pickupAt: 'desc' },
      },
    },
  })

  if (!vehicle) notFound()

  const reviews = vehicle.bookings.filter((b) => b.review)
  const avgRating = reviews.length
    ? reviews.reduce((sum, b) => sum + (b.review?.rating ?? 0), 0) / reviews.length
    : null

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      {/* Hero image */}
      <div className="aspect-[21/9] bg-[#2a2520] flex items-center justify-center">
        <span className="font-serif text-4xl text-[#433d38]">{vehicle.name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-2">{vehicle.make} {vehicle.model} · {vehicle.year}</p>
            <h1 className="font-serif text-5xl text-[#f0e6d0] mb-2">{vehicle.name}</h1>
            {vehicle.tagline && <p className="text-xl text-[#a09890] italic mb-6">{vehicle.tagline}</p>}
            {vehicle.description && <p className="text-[#5f5850] leading-relaxed mb-10">{vehicle.description}</p>}

            {/* Features */}
            <h2 className="font-serif text-2xl text-[#f0e6d0] mb-4">Features</h2>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {vehicle.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-[#a09890]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />{f}
                </div>
              ))}
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <>
                <h2 className="font-serif text-2xl text-[#f0e6d0] mb-2">Reviews</h2>
                {avgRating && (
                  <div className="flex items-center gap-2 mb-6">
                    <Star size={16} className="text-[#c9a96e] fill-[#c9a96e]" />
                    <span className="font-serif text-xl text-[#c9a96e]">{avgRating.toFixed(1)}</span>
                    <span className="text-sm text-[#5f5850]">({reviews.length} reviews)</span>
                  </div>
                )}
                <div className="space-y-4">
                  {reviews.map(({ review, user }) =>
                    review ? (
                      <div key={review.id} className="border border-[#433d38]/50 bg-[#1a1612] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#f0e6d0]">{user.name ?? 'Guest'}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} size={12} className="text-[#c9a96e] fill-[#c9a96e]" />
                            ))}
                          </div>
                        </div>
                        {review.comment && <p className="text-sm text-[#5f5850] italic">"{review.comment}"</p>}
                      </div>
                    ) : null
                  )}
                </div>
              </>
            )}
          </div>

          {/* Pricing sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-[#433d38]/50 bg-[#1a1612] p-6">
              <h3 className="font-serif text-xl text-[#f0e6d0] mb-6">Pricing</h3>
              <div className="space-y-3 mb-8 text-sm">
                <div className="flex justify-between text-[#a09890]">
                  <span>Airport Transfer</span>
                  <span className="text-[#c9a96e]">{formatCurrency(Number(vehicle.basePrice))}</span>
                </div>
                {vehicle.pricePerHour && (
                  <div className="flex justify-between text-[#a09890]">
                    <span>Per Hour</span>
                    <span className="text-[#c9a96e]">{formatCurrency(Number(vehicle.pricePerHour))}</span>
                  </div>
                )}
                {vehicle.pricePerDay && (
                  <div className="flex justify-between text-[#a09890]">
                    <span>Per Day</span>
                    <span className="text-[#c9a96e]">{formatCurrency(Number(vehicle.pricePerDay))}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5f5850] mb-6">
                <Users size={14} />
                Up to {vehicle.capacity} passengers
              </div>
              <Button size="lg" className="w-full" asChild>
                <Link href={`/book?vehicleId=${vehicle.id}`}>Book {vehicle.name}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
