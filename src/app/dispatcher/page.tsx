export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime, formatCurrency } from '@/lib/utils'
import type { BookingStatus, VerificationStatus } from '@prisma/client'
import { ReviewModerationRow } from '@/components/dispatcher/ReviewModerationRow'
import { VerificationBadge } from '@/components/dispatcher/VerificationBadge'

const statusVariants: Record<BookingStatus, 'gold' | 'green' | 'blue' | 'gray' | 'red' | 'amber'> = {
  PENDING: 'amber', CONFIRMED: 'gold', CHAUFFEUR_ASSIGNED: 'blue',
  EN_ROUTE: 'blue', ARRIVED: 'green', IN_PROGRESS: 'green',
  COMPLETED: 'gray', CANCELLED: 'red', NO_SHOW: 'red',
}

export default async function DispatcherPage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let bookings: any[] = []
  try {
    bookings = await prisma.booking.findMany({
      where: { pickupAt: { gte: today, lt: tomorrow } },
      include: { user: true, vehicle: true, chauffeur: true },
      orderBy: { pickupAt: 'asc' },
    })
  } catch { /* DB not yet connected */ }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rentalBookings: any[] = []
  try {
    rentalBookings = await prisma.rentalBooking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  } catch { /* DB not yet connected */ }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pendingReviews: any[] = []
  try {
    pendingReviews = await prisma.rentalReview.findMany({
      where: { status: 'PENDING' },
      include: {
        booking: {
          select: { startDate: true, endDate: true, firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch { /* DB not yet connected */ }

  const active = bookings.filter((b) =>
    ['EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'].includes(b.status)
  )

  return (
    <div className="space-y-10">
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Dispatcher</p>
        <h1 className="font-serif text-3xl text-[#f0e6d0]">Today&apos;s Operations</h1>
        <p className="text-sm text-[#5f5850] mt-1">{bookings.length} bookings · {active.length} active</p>
      </div>

      {/* Bookings Table */}
      <div className="border border-[#433d38]/50 bg-[#1a1612]">
        <div className="px-6 py-4 border-b border-[#433d38]/50 flex items-center justify-between">
          <h2 className="font-serif text-lg text-[#f0e6d0]">Today&apos;s Bookings</h2>
        </div>
        {bookings.length === 0 ? (
          <div className="p-12 text-center text-[#5f5850]">No bookings today.</div>
        ) : (
          <div className="divide-y divide-[#433d38]/30">
            {bookings.map((b) => (
              <div key={b.id} className="px-6 py-4 flex items-center gap-6">
                <div className="w-36 shrink-0">
                  <p className="text-xs text-[#5f5850]">{formatDateTime(b.pickupAt).split(',')[1]?.trim()}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#f0e6d0] truncate">{b.user.name ?? b.user.email}</p>
                  <p className="text-xs text-[#5f5850] truncate">{b.pickupAddress} → {b.destinationAddress}</p>
                </div>
                <div className="w-32 shrink-0 text-sm text-[#a09890]">{b.vehicle.name}</div>
                <div className="w-28 shrink-0 text-sm text-[#5f5850]">
                  {b.chauffeur?.name ?? <span className="text-amber-400">Unassigned</span>}
                </div>
                <div className="w-24 shrink-0 text-right">
                  <p className="text-sm text-[#c9a96e]">{formatCurrency(Number(b.totalAmount))}</p>
                </div>
                <Badge variant={statusVariants[b.status as BookingStatus]}>{b.status.replace('_', ' ')}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sterling Route Rental Bookings */}
      <div className="border border-[#433d38]/50 bg-[#1a1612]">
        <div className="px-6 py-4 border-b border-[#433d38]/50 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg text-[#f0e6d0]">Sterling Route Rentals</h2>
            <p className="text-xs text-[#5f5850] mt-0.5">{rentalBookings.length} rental bookings</p>
          </div>
        </div>
        {rentalBookings.length === 0 ? (
          <div className="p-12 text-center text-[#5f5850]">No rental bookings.</div>
        ) : (
          <>
            {/* Table Header */}
            <div className="px-6 py-2 flex items-center gap-4 border-b border-[#433d38]/30 bg-[#16120f]">
              <div className="w-36 shrink-0 text-xs uppercase tracking-widest text-[#5f5850]">Dates</div>
              <div className="flex-1 min-w-0 text-xs uppercase tracking-widest text-[#5f5850]">Renter</div>
              <div className="w-28 shrink-0 text-xs uppercase tracking-widest text-[#5f5850]">Status</div>
              <div className="w-24 shrink-0 text-xs uppercase tracking-widest text-[#5f5850]">Total</div>
              <div className="w-28 shrink-0 text-xs uppercase tracking-widest text-[#5f5850]">Verification</div>
            </div>

            <div className="divide-y divide-[#433d38]/30">
              {rentalBookings.map((b) => (
                <div key={b.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="w-36 shrink-0">
                    <p className="text-xs text-[#a09890]">{b.startDate}</p>
                    <p className="text-xs text-[#5f5850]">→ {b.endDate}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#f0e6d0] truncate">
                      {b.firstName} {b.lastName}
                    </p>
                    <p className="text-xs text-[#5f5850] truncate">{b.email} · {b.phone}</p>
                  </div>
                  <div className="w-28 shrink-0">
                    <span className="text-xs text-[#a09890]">{b.status}</span>
                  </div>
                  <div className="w-24 shrink-0">
                    <p className="text-sm text-[#c9a96e]">${b.subtotal.toFixed(2)}</p>
                  </div>
                  <div className="w-28 shrink-0">
                    <VerificationBadge
                      bookingId={b.id}
                      initial={b.verificationStatus as VerificationStatus}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Forewarn Legend */}
            <div className="px-6 py-3 border-t border-[#433d38]/50 bg-[#16120f]">
              <p className="text-xs text-[#5f5850]">
                <span className="text-[#c9a96e] font-medium">Forewarn:</span>{' '}
                Run a Forewarn check before marking a renter Cleared.{' '}
                Use the renter&apos;s{' '}
                <span className="text-[#a09890]">Phone</span> and{' '}
                <span className="text-[#a09890]">Name</span> shown in each row above.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Pending Reviews */}
      <div className="border border-[#433d38]/50 bg-[#1a1612]">
        <div className="px-6 py-4 border-b border-[#433d38]/50">
          <h2 className="font-serif text-lg text-[#f0e6d0]">Pending Reviews</h2>
          <p className="text-xs text-[#5f5850] mt-0.5">{pendingReviews.length} awaiting moderation</p>
        </div>
        {pendingReviews.length === 0 ? (
          <div className="p-12 text-center text-[#5f5850]">No pending reviews.</div>
        ) : (
          <div className="divide-y divide-[#433d38]/30">
            {pendingReviews.map((r) => (
              <ReviewModerationRow key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
