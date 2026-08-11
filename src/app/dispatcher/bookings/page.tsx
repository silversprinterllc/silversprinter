export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'

const statusColors: Record<string, string> = {
  PENDING: 'text-amber-400',
  CONFIRMED: 'text-[#c9a96e]',
  COMPLETED: 'text-[#5f5850]',
  CANCELLED: 'text-red-400',
}

export default async function DispatcherBookingsPage() {
  const bookings = await prisma.rentalBooking.findMany({
    include: { addOns: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Dispatcher</p>
        <h1 className="font-serif text-3xl text-[#f0e6d0]">All Bookings</h1>
        <p className="text-sm text-[#5f5850] mt-1">{bookings.length} total</p>
      </div>

      <div className="border border-[#433d38]/50 bg-[#1a1612]">
        <div className="px-6 py-2 flex items-center gap-4 border-b border-[#433d38]/30 bg-[#16120f]">
          <div className="w-28 shrink-0 text-xs uppercase tracking-widest text-[#5f5850]">Ref</div>
          <div className="w-36 shrink-0 text-xs uppercase tracking-widest text-[#5f5850]">Dates</div>
          <div className="flex-1 min-w-0 text-xs uppercase tracking-widest text-[#5f5850]">Renter</div>
          <div className="w-24 shrink-0 text-xs uppercase tracking-widest text-[#5f5850]">Type</div>
          <div className="w-24 shrink-0 text-xs uppercase tracking-widest text-[#5f5850] text-right">Total</div>
          <div className="w-28 shrink-0 text-xs uppercase tracking-widest text-[#5f5850] text-right">Status</div>
        </div>
        <div className="divide-y divide-[#433d38]/30">
          {bookings.map((b) => (
            <div key={b.id} className="px-6 py-4 flex items-center gap-4">
              <div className="w-28 shrink-0">
                <p className="text-xs font-mono text-[#a09890]">{b.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div className="w-36 shrink-0">
                <p className="text-xs text-[#a09890]">{b.startDate}</p>
                <p className="text-xs text-[#5f5850]">&rarr; {b.endDate}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#f0e6d0] truncate">{b.firstName} {b.lastName}</p>
                <p className="text-xs text-[#5f5850] truncate">{b.email}</p>
              </div>
              <div className="w-24 shrink-0">
                <p className="text-xs text-[#5f5850]">{b.tripType || '—'}</p>
              </div>
              <div className="w-24 shrink-0 text-right">
                <p className="text-sm text-[#c9a96e]">{formatCurrency(b.subtotal)}</p>
              </div>
              <div className="w-28 shrink-0 text-right">
                <span className={`text-xs ${statusColors[b.status] || 'text-[#5f5850]'}`}>{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
