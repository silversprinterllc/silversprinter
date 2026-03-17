'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '../BookingWizard'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { formatCurrency } from '@/lib/utils'
import { Shield, Lock } from 'lucide-react'

export function Step4Payment() {
  const { state, back } = useWizard()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleBook() {
    if (!state.quote || !state.vehicleId || !state.serviceType || !state.pickupAt) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: state.vehicleId,
          serviceType: state.serviceType,
          pickupAddress: state.pickupAddress,
          pickupLat: state.pickupLat,
          pickupLng: state.pickupLng,
          destinationAddress: state.destinationAddress,
          destinationLat: state.destinationLat,
          destinationLng: state.destinationLng,
          pickupAt: state.pickupAt.toISOString(),
          passengers: state.passengers,
          addonIds: state.addonIds,
          chauffeurId: state.chauffeurId,
          cabinTemp: state.cabinTemp,
          musicPreference: state.musicPreference,
          lightingMood: state.lightingMood,
          welcomeNote: state.welcomeNote,
          notes: state.notes,
          corporateAccountId: state.corporateAccountId,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')

      // In a real implementation, use Stripe Elements to confirm the payment intent
      // For now, redirect to portal with success message
      router.push('/portal?booked=true')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const { quote } = state

  return (
    <div className="pb-16 max-w-lg mx-auto">
      <h2 className="font-serif text-3xl text-[#f0e6d0] mb-8">Payment</h2>

      {quote && (
        <div className="border border-[#433d38]/50 bg-[#1a1612] p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-[#a09890]">Total</span>
            <span className="font-serif text-xl text-[#f0e6d0]">{formatCurrency(quote.totalAmount)}</span>
          </div>
          <div className="bg-[#c9a96e]/5 border border-[#c9a96e]/20 px-4 py-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#c9a96e] font-medium">Due today (deposit)</span>
              <span className="text-[#c9a96e] font-medium">{formatCurrency(quote.depositAmount)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#5f5850] mt-1">
              <span>Balance due 48h before trip</span>
              <span>{formatCurrency(quote.balanceAmount)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Stripe Elements placeholder */}
      <div className="border border-[#433d38]/50 bg-[#1a1612] p-6 mb-6">
        <p className="text-xs tracking-widest uppercase text-[#5f5850] mb-4">Card Details</p>
        <div className="h-10 bg-[#0a0a0a] border border-[#433d38] rounded-sm flex items-center px-3 text-[#433d38] text-sm">
          Stripe Elements loads here
        </div>
        <p className="text-xs text-[#433d38] mt-2">Apple Pay & Google Pay also available</p>
      </div>

      {/* Security badges */}
      <div className="flex items-center gap-4 text-xs text-[#433d38] mb-6">
        <span className="flex items-center gap-1"><Shield size={12} /> SSL Encrypted</span>
        <span className="flex items-center gap-1"><Lock size={12} /> Stripe Secured</span>
        <span>PCI DSS Compliant</span>
      </div>

      {error && (
        <div className="border border-red-800 bg-red-900/20 text-red-400 px-4 py-3 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={back} disabled={loading}>Back</Button>
        <Button size="lg" onClick={handleBook} disabled={loading || !quote}>
          {loading ? (
            <span className="flex items-center gap-2"><LoadingSpinner size="sm" /> Processing...</span>
          ) : (
            `Pay ${quote ? formatCurrency(quote.depositAmount) : ''} Deposit`
          )}
        </Button>
      </div>
    </div>
  )
}
