'use client'

import { useState, useRef, useEffect } from 'react'

type VerificationStatus = 'PENDING' | 'CLEARED' | 'FLAGGED'

interface VerificationBadgeProps {
  bookingId: string
  initial: VerificationStatus
}

const badgeConfig: Record<
  VerificationStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: '⚠ Verify',
    className:
      'bg-amber-900/40 text-amber-400 border border-amber-700/50 hover:bg-amber-900/60',
  },
  CLEARED: {
    label: '✓ Cleared',
    className:
      'bg-green-900/40 text-green-400 border border-green-700/50 hover:bg-green-900/60',
  },
  FLAGGED: {
    label: '🚩 Flagged',
    className:
      'bg-red-900/40 text-red-400 border border-red-700/50 hover:bg-red-900/60',
  },
}

export function VerificationBadge({ bookingId, initial }: VerificationBadgeProps) {
  const [status, setStatus] = useState<VerificationStatus>(initial)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function applyStatus(next: VerificationStatus) {
    setOpen(false)
    setLoading(true)
    try {
      const res = await fetch(`/api/bookings/${bookingId}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationStatus: next }),
      })
      if (res.ok) {
        setStatus(next)
      }
    } catch {
      // silently keep previous state on error
    } finally {
      setLoading(false)
    }
  }

  const cfg = badgeConfig[status]

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={loading}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${cfg.className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {cfg.label}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-40 bg-[#1a1612] border border-[#433d38]/70 rounded shadow-xl">
          <button
            onClick={() => applyStatus('CLEARED')}
            className="w-full text-left px-3 py-2 text-xs text-green-400 hover:bg-[#2a2420] transition-colors"
          >
            ✓ Mark Cleared
          </button>
          <button
            onClick={() => applyStatus('FLAGGED')}
            className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-[#2a2420] transition-colors"
          >
            🚩 Mark Flagged
          </button>
          <button
            onClick={() => applyStatus('PENDING')}
            className="w-full text-left px-3 py-2 text-xs text-amber-400 hover:bg-[#2a2420] transition-colors border-t border-[#433d38]/50"
          >
            ⚠ Reset to Pending
          </button>
        </div>
      )}
    </div>
  )
}
