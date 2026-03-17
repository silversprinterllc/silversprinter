import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime, formatCurrency } from '@/lib/utils'
import type { BookingStatus } from '@prisma/client'

const statusVariants: Record<BookingStatus, 'gold' | 'green' | 'blue' | 'gray' | 'red' | 'amber'> = {
  PENDING: 'amber', CONFIRMED: 'gold', CHAUFFEUR_ASSIGNED: 'blue',
  EN_ROUTE: 'blue', ARRIVED: 'green', IN_PROGRESS: 'green',
  COMPLETED: 'gray', CANCELLED: 'red', NO_SHOW: 'red',
}

export default async function DispatcherBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { user: true, vehicle: true, chauffeur: true },
    orderBy: { pickupAt: 'desc' },
    take: 100,
  })

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Dispatcher</p>
        <h1 className="font-serif text-3xl text-[#f0e6d0]">All Bookings</h1>
      </div>

      <div className="border border-[#433d38]/50 bg-[#1a1612]">
        <div className="divide-y divide-[#433d38]/30">
          {bookings.map((b) => (
            <div key={b.id} className="px-6 py-4 flex items-center gap-4 flex-wrap">
              <div className="w-28 shrink-0">
                <p className="text-xs text-[#5f5850]">{formatDateTime(b.pickupAt)}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#f0e6d0] truncate">{b.user.name ?? b.user.email}</p>
                <p className="text-xs text-[#5f5850]">{b.bookingRef}</p>
              </div>
              <div className="text-sm text-[#a09890]">{b.vehicle.name}</div>
              <div className="text-sm text-[#5f5850]">{b.chauffeur?.name ?? '—'}</div>
              <div className="text-sm text-[#c9a96e]">{formatCurrency(Number(b.totalAmount))}</div>
              <Badge variant={statusVariants[b.status]}>{b.status.replace('_', ' ')}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
