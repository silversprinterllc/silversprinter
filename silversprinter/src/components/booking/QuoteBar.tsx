'use client'
import { formatCurrency } from '@/lib/utils'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { QuoteResult } from '@/types/booking'

interface QuoteBarProps {
  quote: QuoteResult | null
  loading: boolean
}

export function QuoteBar({ quote, loading }: QuoteBarProps) {
  return (
    <div className="sticky bottom-0 border-t border-[#433d38] bg-[#1a1612]/95 backdrop-blur-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-[#5f5850]">
            <LoadingSpinner size="sm" /> Calculating quote...
          </div>
        ) : quote ? (
          <>
            <div className="flex items-center gap-8 text-sm text-[#a09890]">
              <span>Base: {formatCurrency(quote.baseAmount)}</span>
              {quote.extrasAmount > 0 && <span>Extras: +{formatCurrency(quote.extrasAmount)}</span>}
              <span>Fee: +{formatCurrency(quote.serviceFeeAmount)}</span>
              {quote.isSurgePriced && (
                <span className="text-amber-400 text-xs">Surge ×{quote.surgeMultiplier}</span>
              )}
            </div>
            <div className="text-right">
              <p className="font-serif text-2xl text-[#c9a96e]">{formatCurrency(quote.totalAmount)}</p>
              <p className="text-xs text-[#5f5850]">Deposit today: {formatCurrency(quote.depositAmount)}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-[#5f5850]">Configure your trip to see pricing</p>
        )}
      </div>
    </div>
  )
}
