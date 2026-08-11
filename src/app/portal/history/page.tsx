export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TripCard } from '@/components/portal/TripCard'

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const bookings = await prisma.rentalBooking.findMany({
    where: {
      email: session.user.email!,
      status: { in: ['COMPLETED', 'CANCELLED'] },
    },
    orderBy: { startDate: 'desc' },
    take: 50,
  })

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
              firstName={b.firstName}
              lastName={b.lastName}
              startDate={b.startDate}
              endDate={b.endDate}
              days={b.days}
              tripType={b.tripType}
              status={b.status}
              subtotal={b.subtotal}
              depositAmount={b.depositAmount}
              balanceAmount={b.balanceAmount}
            />
          ))}
        </div>
      )}
    </div>
  )
}
