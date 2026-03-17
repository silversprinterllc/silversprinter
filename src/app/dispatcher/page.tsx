export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime, formatCurrency } from '@/lib/utils'
import type { BookingStatus } from '@prisma/client'

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

  let bookings: Awaited<ReturnType<typeof prisma.booking.findMany<{ include: { user: true; vehicle: true; chauffeur: true } }>>> = []
  try {
    bookings = await prisma.booking.findMany({
      where: { pickupAt: { gte: today, lt: tomorrow } },
      include: { user: true, vehicle: true, chauffeur: true },
      orderBy: { pickupAt: 'asc' },
    })
  } catch { /* DB not connected */ }

  const active = bookings.filter((b) =>
    ['EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'].includes(b.status)
  )

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Dispatcher</p>
        <h1 className="font-serif text-3xl text-[#f0e6d0]">Today's Operations</h1>
        <p className="text-sm text-[#5f5850] mt-1">{bookings.length} bookings · {active.length} active</p>
      </div>

      <div className="border border-[#433d38]/50 bg-[#1a1612]">
        <div className="px-6 py-4 border-b border-[#433d38]/50 flex items-center justify-between">
          <h2 className="font-serif text-lg text-[#f0e6d0]">Today's Bookings</h2>
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
                <Badge variant={statusVariants[b.status]}>{b.status.replace('_', ' ')}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
