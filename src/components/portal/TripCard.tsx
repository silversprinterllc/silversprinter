import { Calendar, Car } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const statusColors: Record<string, string> = {
  PENDING: 'text-amber-400 border-amber-400/30',
  CONFIRMED: 'text-[#c9a96e] border-[#c9a96e]/30',
  COMPLETED: 'text-[#5f5850] border-[#433d38]',
  CANCELLED: 'text-red-400 border-red-400/30',
}

interface TripCardProps {
  id: string
  firstName: string
  lastName: string
  startDate: string
  endDate: string
  days: number
  tripType: string | null
  status: string
  subtotal: number
  depositAmount: number
  balanceAmount: number
}

export function TripCard({
  id, firstName, startDate, endDate, days,
  tripType, status, subtotal, depositAmount, balanceAmount,
}: TripCardProps) {
  const ref = id.slice(0, 8).toUpperCase()
  const colors = statusColors[status] || statusColors.PENDING

  return (
    <div className="border border-[#433d38]/50 bg-[#1a1612] p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-[#5f5850] mb-1">#{ref}</p>
          <div className="flex items-center gap-2 text-sm text-[#a09890]">
            <Calendar size={13} className="text-[#c9a96e]" />
            {startDate} &rarr; {endDate}
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 border ${colors}`}>
          {status}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-[#5f5850]">
          <Car size={13} />
          {days} {days === 1 ? 'day' : 'days'}
          {tripType && <span>· {tripType}</span>}
        </div>
        <span className="font-serif text-[#c9a96e]">{formatCurrency(subtotal)}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-[#5f5850] pt-3 border-t border-[#433d38]/30">
        <span>Deposit paid: {formatCurrency(depositAmount)}</span>
        {balanceAmount > 0 && status !== 'COMPLETED' && (
          <span>Balance due: {formatCurrency(balanceAmount)}</span>
        )}
      </div>
    </div>
  )
}
