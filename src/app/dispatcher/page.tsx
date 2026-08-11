export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import type { VerificationStatus } from '@prisma/client'
import { ReviewModerationRow } from '@/components/dispatcher/ReviewModerationRow'
import { VerificationBadge } from '@/components/dispatcher/VerificationBadge'

const statusColors: Record<string, string> = {
  PENDING: 'text-amber-400',
  CONFIRMED: 'text-[#c9a96e]',
  COMPLETED: 'text-[#5f5850]',
  CANCELLED: 'text-red-400',
}

export default async function DispatcherPage() {
  const rentalBookings = await prisma.rentalBooking.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  const pendingReviews = await prisma.rentalReview.findMany({
    where: { status: 'PENDING' },
    include: {
      booking: {
        select: { startDate: true, endDate: true, firstName: true, lastName: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const active = rentalBookings.filter((b) => b.status === 'CONFIRMED')

  return (
    <div className="space-y-10">
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Dispatcher</p>
        <h1 className="font-serif text-3xl text-[#f0e6d0]">Operations</h1>
        <p className="text-sm text-[#5f5850] mt-1">{rentalBookings.length} bookings · {active.length} confirmed</p>
      </div>

      {/* Rental Bookings */}
      <div className="border border-[#433d38]/50 bg-[#1a1612]">
        <div className="px-6 py-4 border-b border-[#433d38]/50">
          <h2 className="font-serif text-lg text-[#f0e6d0]">Rental Bookings</h2>
        </div>
        {rentalBookings.length === 0 ? (
          <div className="p-12 text-center text-[#5f5850]">No bookings yet.</div>
        ) : (
          <>
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
                    <p className="text-xs text-[#5f5850]">&rarr; {b.endDate}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#f0e6d0] truncate">
                      {b.firstName} {b.lastName}
                    </p>
                    <p className="text-xs text-[#5f5850] truncate">{b.email} · {b.phone}</p>
                  </div>
                  <div className="w-28 shrink-0">
                    <span className={`text-xs ${statusColors[b.status] || 'text-[#5f5850]'}`}>{b.status}</span>
                  </div>
                  <div className="w-24 shrink-0">
                    <p className="text-sm text-[#c9a96e]">{formatCurrency(b.subtotal)}</p>
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
