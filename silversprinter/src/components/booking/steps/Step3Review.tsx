'use client'
import { useWizard } from '../BookingWizard'
import { Button } from '@/components/ui/Button'
import { formatDateTime, formatCurrency } from '@/lib/utils'
import { Edit2 } from 'lucide-react'

export function Step3Review() {
  const { state, next, back, goTo } = useWizard()
  const { quote } = state

  return (
    <div className="pb-16">
      <h2 className="font-serif text-3xl text-[#f0e6d0] mb-8">Review your booking</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trip summary */}
        <div>
          <div className="border border-[#433d38]/50 bg-[#1a1612]">
            <div className="px-6 py-4 border-b border-[#433d38]/50 flex items-center justify-between">
              <h3 className="font-serif text-lg text-[#f0e6d0]">Trip Details</h3>
              <button onClick={() => goTo(1)} className="text-xs text-[#c9a96e] flex items-center gap-1 hover:text-[#b8934a]">
                <Edit2 size={12} /> Edit
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 text-sm">
              <Row label="Service" value={state.serviceType?.replace('_', ' ') ?? '—'} />
              <Row label="Pickup" value={state.pickupAddress} />
              <Row label="Destination" value={state.destinationAddress} />
              <Row label="Date & Time" value={state.pickupAt ? formatDateTime(state.pickupAt) : '—'} />
              <Row label="Passengers" value={String(state.passengers)} />
            </div>
          </div>

          {(state.addonIds.length > 0 || state.cabinTemp || state.musicPreference) && (
            <div className="border border-[#433d38]/50 bg-[#1a1612] mt-4">
              <div className="px-6 py-4 border-b border-[#433d38]/50 flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#f0e6d0]">Customizations</h3>
                <button onClick={() => goTo(2)} className="text-xs text-[#c9a96e] flex items-center gap-1 hover:text-[#b8934a]">
                  <Edit2 size={12} /> Edit
                </button>
              </div>
              <div className="px-6 py-5 space-y-2 text-sm">
                {state.addonIds.length > 0 && (
                  <Row label="Enhancements" value={`${state.addonIds.length} selected`} />
                )}
                {state.musicPreference && <Row label="Music" value={state.musicPreference} />}
                {state.lightingMood && <Row label="Lighting" value={state.lightingMood} />}
                <Row label="Temperature" value={`${state.cabinTemp}°F`} />
                {state.welcomeNote && <Row label="Welcome Note" value={state.welcomeNote} />}
              </div>
            </div>
          )}
        </div>

        {/* Price breakdown */}
        <div>
          <div className="border border-[#433d38]/50 bg-[#1a1612]">
            <div className="px-6 py-4 border-b border-[#433d38]/50">
              <h3 className="font-serif text-lg text-[#f0e6d0]">Price Breakdown</h3>
            </div>
            {quote ? (
              <div className="px-6 py-5">
                <div className="space-y-3 text-sm mb-6">
                  {quote.lineItems.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-[#a09890]">{item.label}</span>
                      <span className={item.amount < 0 ? 'text-emerald-400' : 'text-[#f0e6d0]'}>
                        {item.amount < 0 ? '−' : ''}{formatCurrency(Math.abs(item.amount))}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-[#5f5850] italic">
                    <span>Suggested gratuity (20%)</span>
                    <span>{formatCurrency(quote.gratuityAmount)}</span>
                  </div>
                </div>
                <div className="border-t border-[#433d38] pt-4 mb-4">
                  <div className="flex justify-between font-serif text-xl">
                    <span className="text-[#f0e6d0]">Total</span>
                    <span className="text-[#c9a96e]">{formatCurrency(quote.totalAmount)}</span>
                  </div>
                </div>
                <div className="bg-[#c9a96e]/5 border border-[#c9a96e]/20 px-4 py-3 text-sm">
                  <div className="flex justify-between text-[#c9a96e]">
                    <span>Deposit due today (20%)</span>
                    <span>{formatCurrency(quote.depositAmount)}</span>
                  </div>
                  <div className="flex justify-between text-[#5f5850] mt-1">
                    <span>Balance due 48h before trip</span>
                    <span>{formatCurrency(quote.balanceAmount)}</span>
                  </div>
                </div>
                {quote.isSurgePriced && (
                  <p className="text-xs text-amber-400 mt-3">
                    ⚡ Surge pricing applies for this time slot (×{quote.surgeMultiplier})
                  </p>
                )}
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-[#5f5850]">Quote unavailable</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={back}>Back</Button>
        <Button size="lg" onClick={next} disabled={!quote}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#5f5850]">{label}</span>
      <span className="text-[#f0e6d0] text-right max-w-[60%]">{value}</span>
    </div>
  )
}
