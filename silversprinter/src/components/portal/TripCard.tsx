import Link from 'next/link'
import { MapPin, Calendar, Car } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDateTime, formatCurrency } from '@/lib/utils'
import type { BookingStatus } from '@prisma/client'

const statusVariants: Record<BookingStatus, 'gold' | 'green' | 'blue' | 'gray' | 'red' | 'amber'> = {
  PENDING: 'amber',
  CONFIRMED: 'gold',
  CHAUFFEUR_ASSIGNED: 'blue',
  EN_ROUTE: 'blue',
  ARRIVED: 'green',
  IN_PROGRESS: 'green',
  COMPLETED: 'gray',
  CANCELLED: 'red',
  NO_SHOW: 'red',
}

interface TripCardProps {
  id: string
  bookingRef: string
  pickupAddress: string
  destinationAddress: string
  pickupAt: Date
  vehicleName: string
  chauffeurName?: string | null
  status: BookingStatus
  totalAmount: number
  isUpcoming?: boolean
}

export function TripCard({
  id, bookingRef, pickupAddress, destinationAddress, pickupAt,
  vehicleName, chauffeurName, status, totalAmount, isUpcoming,
}: TripCardProps) {
  return (
    <div className="border border-[#433d38]/50 bg-[#1a1612] p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-[#5f5850] mb-1">{bookingRef}</p>
          <div className="flex items-center gap-2 text-sm text-[#a09890]">
            <Calendar size={13} className="text-[#c9a96e]" />
            {formatDateTime(pickupAt)}
          </div>
        </div>
        <Badge variant={statusVariants[status]}>{status.replace('_', ' ')}</Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2 text-sm">
          <MapPin size={13} className="text-[#c9a96e] mt-0.5 flex-shrink-0" />
          <span className="text-[#a09890] truncate">{pickupAddress}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <MapPin size={13} className="text-[#5f5850] mt-0.5 flex-shrink-0" />
          <span className="text-[#5f5850] truncate">{destinationAddress}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#5f5850]">
          <Car size={13} />
          {vehicleName}
          {chauffeurName && <span>· {chauffeurName}</span>}
        </div>
        <span className="font-serif text-[#c9a96e]">{formatCurrency(totalAmount)}</span>
      </div>

      {isUpcoming && (
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href={`/portal/tracking/${id}`}>Track Live</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
