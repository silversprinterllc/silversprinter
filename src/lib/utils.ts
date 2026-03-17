export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date))
}

export function generateBookingRef(): string {
  const year = new Date().getFullYear()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `SS-${year}-${rand}`
}

export function isSurgePeriod(date: Date): boolean {
  const day = date.getDay() // 0=Sun, 5=Fri, 6=Sat
  const hour = date.getHours()
  const isFriSat = day === 5 || day === 6
  const isEvening = hour >= 17 || hour < 2
  return isFriSat && isEvening
}

export const HOLIDAYS_2025 = [
  '2025-01-01', '2025-01-20', '2025-02-17', '2025-05-26',
  '2025-07-04', '2025-09-01', '2025-11-27', '2025-12-25',
]

export const HOLIDAYS_2026 = [
  '2026-01-01', '2026-01-19', '2026-02-16', '2026-05-25',
  '2026-07-04', '2026-09-07', '2026-11-26', '2026-12-25',
]

export function isHoliday(date: Date): boolean {
  const dateStr = date.toISOString().split('T')[0]
  return [...HOLIDAYS_2025, ...HOLIDAYS_2026].includes(dateStr)
}
