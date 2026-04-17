'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '../BookingWizard'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { formatCurrency } from '@/lib/utils'
import { Shield, Lock } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Inner form that uses Stripe hooks (must be inside <Elements>)
function PaymentForm({
  depositAmount,
  onSuccess,
  onError,
}: {
  depositAmount: number
  onSuccess: () => void
  onError: (msg: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    onError('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/portal?booked=true`,
      },
      redirect: 'if_required',
    })

    if (error) {
      onError(error.message || 'Payment failed. Please try again.')
      setProcessing(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-[#433d38]/50 bg-[#1a1612] p-6 mb-6">
        <p className="text-xs tracking-widest uppercase text-[#5f5850] mb-4">Card Details</p>
        <PaymentElement
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: { address: { country: 'US' } },
            },
          }}
        />
      </div>

      {/* Security badges */}
      <div className="flex items-center gap-4 text-xs text-[#433d38] mb-6">
        <span className="flex items-center gap-1"><Shield size={12} /> SSL Encrypted</span>
        <span className="flex items-center gap-1"><Lock size={12} /> Stripe Secured</span>
        <span>PCI DSS Compliant</span>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={processing || !stripe || !elements}
      >
        {processing ? (
          <span className="flex items-center gap-2"><LoadingSpinner size="sm" /> Processing...</span>
        ) : (
          `Pay ${formatCurrency(depositAmount)} Deposit`
        )}
      </Button>
    </form>
  )
}

export function Step4Payment() {
  const { state, back } = useWizard()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [bookingCreated, setBookingCreated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Create booking + PaymentIntent on mount
  useEffect(() => {
    if (bookingCreated || !state.quote || !state.vehicleId || !state.serviceType || !state.pickupAt) return

    async function createBooking() {
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
            pickupAt: state.pickupAt!.toISOString(),
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
        if (!res.ok) throw new Error(data.error || 'Failed to create booking')

        setClientSecret(data.clientSecret)
        setBookingCreated(true)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    createBooking()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

      {/* Loading state while creating booking */}
      {loading && (
        <div className="border border-[#433d38]/50 bg-[#1a1612] p-6 mb-6 flex items-center justify-center gap-3">
          <LoadingSpinner size="sm" />
          <span className="text-sm text-[#5f5850]">Preparing secure checkout...</span>
        </div>
      )}

      {/* Stripe Elements payment form */}
      {clientSecret && quote && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#c9a96e',
                colorBackground: '#0a0a0a',
                colorText: '#f0e6d0',
                colorTextSecondary: '#a09890',
                colorDanger: '#ef4444',
                fontFamily: 'Jost, system-ui, sans-serif',
                borderRadius: '2px',
                colorTextPlaceholder: '#433d38',
              },
              rules: {
                '.Input': {
                  border: '1px solid #433d38',
                  backgroundColor: '#0a0a0a',
                },
                '.Input:focus': {
                  border: '1px solid #c9a96e',
                  boxShadow: '0 0 0 1px #c9a96e',
                },
                '.Label': {
                  color: '#a09890',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                },
                '.Tab': {
                  border: '1px solid #433d38',
                  backgroundColor: '#1a1612',
                },
                '.Tab--selected': {
                  border: '1px solid #c9a96e',
                  backgroundColor: '#1a1612',
                },
              },
            },
          }}
        >
          <PaymentForm
            depositAmount={quote.depositAmount}
            onSuccess={() => router.push('/portal?booked=true')}
            onError={(msg) => setError(msg || null)}
          />
        </Elements>
      )}

      {error && (
        <div className="border border-red-800 bg-red-900/20 text-red-400 px-4 py-3 text-sm mb-4 mt-4">
          {error}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="ghost" onClick={back} disabled={loading}>Back</Button>
        {!clientSecret && !loading && (
          <Button size="lg" disabled>
            {`Pay ${quote ? formatCurrency(quote.depositAmount) : ''} Deposit`}
          </Button>
        )}
      </div>
    </div>
  )
}
