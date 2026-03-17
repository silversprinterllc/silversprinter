import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TripCard } from '@/components/portal/TripCard'

export default async function PortalPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
      status: { in: ['PENDING', 'CONFIRMED', 'CHAUFFEUR_ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'] },
    },
    include: { vehicle: true, chauffeur: true },
    orderBy: { pickupAt: 'asc' },
  })

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Portal</p>
        <h1 className="font-serif text-3xl text-[#f0e6d0]">Welcome back{session.user.name ? `, ${session.user.name.split(' ')[0]}` : ''}</h1>
      </div>

      {bookings.length === 0 ? (
        <div className="border border-[#433d38]/50 bg-[#1a1612] p-12 text-center">
          <p className="font-serif text-2xl text-[#f0e6d0] mb-2">No upcoming trips</p>
          <p className="text-[#5f5850] text-sm">Ready for your next journey?</p>
          <a href="/book" className="inline-block mt-6 px-6 py-2.5 bg-[#c9a96e] text-[#0a0a0a] text-sm font-medium">
            Book a Ride
          </a>
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
              isUpcoming
            />
          ))}
        </div>
      )}
    </div>
  )
}
