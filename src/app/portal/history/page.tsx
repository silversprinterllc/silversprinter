export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TripCard } from '@/components/portal/TripCard'

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let bookings: any[] = []
  try {
    bookings = await prisma.booking.findMany({
      where: { userId: session.user.id, status: { in: ['COMPLETED', 'CANCELLED', 'NO_SHOW'] } },
      include: { vehicle: true, chauffeur: true },
      orderBy: { pickupAt: 'desc' },
      take: 50,
    })
  } catch { /* DB not yet connected */ }

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Portal</p>
        <h1 className="font-serif text-3xl text-[#f0e6d0]">Trip History</h1>
      </div>

      {bookings.length === 0 ? (
        <div className="border border-[#433d38]/50 bg-[#1a1612] p-12 text-center">
          <p className="text-[#5f5850]">No past trips yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <TripCard
              key={b.id}
              id={b.id}
              bookingRef={b.bookingRef}
              pickupAddress={b.pickupAddress}
              destinationAddress={b.destinationAddress}
              pickupAt={b.pickupAt}
              vehicleName={b.vehicle.name}
              chauffeurName={b.chauffeur?.name}
              status={b.status}
              totalAmount={Number(b.totalAmount)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
