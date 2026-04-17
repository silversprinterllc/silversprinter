'use client'
import { useEffect, useState, useCallback } from 'react'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function toYMD(date: Date) {
  return date.toISOString().split('T')[0]
}

function buildMonth(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const cells: (Date | null)[] = []
  for (let i = 0; i < first.getDay(); i++) cells.push(null)
  for (let d = 1; d <= last.getDate(); d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

interface Props {
  vehicleId: string | null
  selectedDate: string | null // YYYY-MM-DD
  onSelectDate: (date: string) => void
}

export function AvailabilityCalendar({ vehicleId, selectedDate, onSelectDate }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [blocked, setBlocked] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  const fetchAvailability = useCallback(async () => {
    if (!vehicleId) return
    setLoading(true)
    try {
      const monthStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`
      const res = await fetch(`/api/availability?vehicleId=${vehicleId}&month=${monthStr}`)
      if (res.ok) {
        const data = await res.json()
        setBlocked(new Set(data.blocked || []))
      }
    } catch {
      // fail silently — calendar shows all as available
    } finally {
      setLoading(false)
    }
  }, [vehicleId, viewYear, viewMonth])

  useEffect(() => { fetchAvailability() }, [fetchAvailability])

  const cells = buildMonth(viewYear, viewMonth)
  const todayStr = toYMD(today)

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const atMin = viewYear === today.getFullYear() && viewMonth === today.getMonth()
  const maxDate = new Date(today)
  maxDate.setMonth(maxDate.getMonth() + 6)
  const atMax = viewYear === maxDate.getFullYear() && viewMonth === maxDate.getMonth()

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-5 mb-4 text-[9px] font-mono tracking-widest uppercase text-[#5f5850]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5" style={{ background: 'rgba(74,124,89,0.3)' }} />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5" style={{ background: 'rgba(201,169,110,0.25)' }} />
          Booked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5" style={{ background: 'rgba(240,230,208,0.08)' }} />
          Past
        </span>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          disabled={atMin}
          className="text-xs font-mono tracking-wider transition-opacity"
          style={{ color: '#c9a96e', opacity: atMin ? 0.2 : 1, cursor: atMin ? 'default' : 'pointer' }}
        >
          &larr; Prev
        </button>
        <span className="font-serif text-base text-[#f0e6d0]" style={{ fontWeight: 300 }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          disabled={atMax}
          className="text-xs font-mono tracking-wider transition-opacity"
          style={{ color: '#c9a96e', opacity: atMax ? 0.2 : 1, cursor: atMax ? 'default' : 'pointer' }}
        >
          Next &rarr;
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center font-mono text-[9px] tracking-[0.15em] uppercase py-1"
            style={{ color: 'rgba(240,230,208,0.3)' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-8 font-mono text-[10px] tracking-widest uppercase text-[#433d38]">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-px" style={{ background: 'rgba(67,61,56,0.2)' }}>
          {cells.map((date, i) => {
            if (!date) {
              return <div key={`e-${i}`} className="min-h-[42px]" style={{ background: '#0a0a0a' }} />
            }

            const dateStr = toYMD(date)
            const isPast = dateStr < todayStr
            const isBooked = blocked.has(dateStr)
            const isSelected = dateStr === selectedDate
            const isClickable = !isPast && !isBooked

            let bg = '#0a0a0a'
            let color = 'rgba(240,230,208,0.85)'
            let opacity = 1
            let cursor = 'pointer'
            let outline = 'none'

            if (isPast) {
              opacity = 0.25
              cursor = 'default'
            } else if (isBooked) {
              bg = 'rgba(201,169,110,0.1)'
              color = 'rgba(240,230,208,0.3)'
              cursor = 'default'
            } else {
              bg = 'rgba(74,124,89,0.12)'
              color = 'rgba(240,230,208,0.9)'
            }

            if (isSelected) {
              outline = '2px solid #c9a96e'
              bg = 'rgba(201,169,110,0.15)'
              color = '#c9a96e'
            }

            return (
              <button
                key={dateStr}
                onClick={() => isClickable && onSelectDate(dateStr)}
                disabled={!isClickable}
                className="min-h-[42px] flex items-center justify-center relative transition-all"
                style={{ background: bg, opacity, cursor, outline, outlineOffset: '-2px' }}
              >
                <span className="font-mono text-xs" style={{ color, fontWeight: isSelected ? 600 : 300 }}>
                  {date.getDate()}
                </span>
                {isBooked && !isPast && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#c9a96e', opacity: 0.5 }} />
                )}
              </button>
            )
          })}
        </div>
      )}

      {!vehicleId && (
        <p className="mt-3 font-mono text-[9px] text-center tracking-widest uppercase text-[#433d38]">
          Select a vehicle to see availability
        </p>
      )}
    </div>
  )
}
