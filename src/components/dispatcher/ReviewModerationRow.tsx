'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Review = {
  id: string
  renterName: string
  rating: number
  body: string
  tripType: string | null
  createdAt: Date | string
  booking: {
    startDate: string
    endDate: string
    firstName: string
    lastName: string
  }
}

export function ReviewModerationRow({ review }: { review: Review }) {
  const router = useRouter()
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)
  const [done, setDone] = useState(false)

  async function moderate(status: 'APPROVED' | 'REJECTED') {
    setLoading(status === 'APPROVED' ? 'approve' : 'reject')
    try {
      await fetch(`/api/reviews/${review.id}/moderate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setDone(true)
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  if (done) return null

  return (
    <div className="px-6 py-5">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <p className="text-sm font-medium text-[#f0e6d0]">{review.renterName}</p>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s <= review.rating ? 'text-[#c9a96e] fill-[#c9a96e]' : 'text-[#433d38]'
                  }
                  strokeWidth={1.5}
                />
              ))}
            </div>
            {review.tripType && (
              <span className="text-xs text-[#5f5850] border border-[#433d38]/50 px-2 py-0.5">
                {review.tripType}
              </span>
            )}
          </div>
          <p className="text-sm text-[#a09890] leading-relaxed mb-2">{review.body}</p>
          <p className="text-xs text-[#433d38]">
            Trip: {review.booking.startDate} → {review.booking.endDate}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => moderate('APPROVED')}
            disabled={!!loading}
            className="px-4 py-2 text-xs tracking-widest uppercase font-medium bg-emerald-900/40 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60 transition-colors disabled:opacity-50"
          >
            {loading === 'approve' ? '…' : 'Approve'}
          </button>
          <button
            onClick={() => moderate('REJECTED')}
            disabled={!!loading}
            className="px-4 py-2 text-xs tracking-widest uppercase font-medium bg-red-900/30 text-red-400 border border-red-800/40 hover:bg-red-900/50 transition-colors disabled:opacity-50"
          >
            {loading === 'reject' ? '…' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  )
}
