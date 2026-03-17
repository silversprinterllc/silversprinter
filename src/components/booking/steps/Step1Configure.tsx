'use client'
import { useEffect, useState } from 'react'
import { useWizard } from '../BookingWizard'
import { VehicleCard } from '../VehicleCard'
import { QuoteBar } from '../QuoteBar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { ServiceType } from '@prisma/client'

const SERVICE_TYPES: { value: ServiceType; label: string }[] = [
  { value: 'AIRPORT_TRANSFER', label: 'Airport Transfer' },
  { value: 'HOURLY_CHARTER', label: 'Hourly Charter' },
  { value: 'EVENT', label: 'Event' },
  { value: 'CORPORATE', label: 'Corporate' },
]

export function Step1Configure() {
  const { state, update, next } = useWizard()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [quoteLoading, setQuoteLoading] = useState(false)

  useEffect(() => {
    fetch('/api/vehicles').then((r) => r.json()).then(setVehicles).catch(() => {})
  }, [])

  useEffect(() => {
    if (!state.vehicleId || !state.serviceType || !state.pickupAt) return
    setQuoteLoading(true)
    fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vehicleId: state.vehicleId,
        serviceType: state.serviceType,
        pickupAt: state.pickupAt.toISOString(),
        addonIds: state.addonIds,
        estimatedHours: state.serviceType === 'HOURLY_CHARTER' ? 2 : undefined,
      }),
    })
      .then((r) => r.json())
      .then((q) => update({ quote: q }))
      .catch(() => {})
      .finally(() => setQuoteLoading(false))
  }, [state.vehicleId, state.serviceType, state.pickupAt])

  const canProceed = !!(state.serviceType && state.vehicleId && state.pickupAddress && state.destinationAddress && state.pickupAt)

  return (
    <div className="pb-32">
      <h2 className="font-serif text-3xl text-[#f0e6d0] mb-8">Configure your trip</h2>

      {/* Service type */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-[#5f5850] mb-3">Service Type</p>
        <div className="flex flex-wrap gap-2">
          {SERVICE_TYPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => update({ serviceType: value })}
              className={`px-5 py-2 text-sm border transition-colors ${
                state.serviceType === value
                  ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5'
                  : 'border-[#433d38] text-[#5f5850] hover:border-[#5f5850]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Route */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Input
          label="Pickup Address"
          value={state.pickupAddress}
          onChange={(e) => update({ pickupAddress: e.target.value })}
          placeholder="123 Brickell Ave, Miami"
        />
        <Input
          label="Destination"
          value={state.destinationAddress}
          onChange={(e) => update({ destinationAddress: e.target.value })}
          placeholder="MIA Airport Terminal J"
        />
      </div>

      {/* Date/time + passengers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          label="Pickup Date"
          type="date"
          value={state.pickupAt ? state.pickupAt.toISOString().split('T')[0] : ''}
          onChange={(e) => {
            const d = new Date(e.target.value)
            if (!isNaN(d.getTime())) update({ pickupAt: d })
          }}
          min={new Date().toISOString().split('T')[0]}
        />
        <Input
          label="Pickup Time"
          type="time"
          onChange={(e) => {
            if (!state.pickupAt) return
            const [h, m] = e.target.value.split(':').map(Number)
            const d = new Date(state.pickupAt)
            d.setHours(h, m)
            update({ pickupAt: d })
          }}
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium tracking-widest uppercase text-[#a09890]">Passengers</label>
          <div className="flex items-center gap-3 border border-[#433d38] bg-[#1a1612] px-3 py-2.5">
            <button onClick={() => update({ passengers: Math.max(1, state.passengers - 1) })} className="text-[#c9a96e] w-6 text-lg">−</button>
            <span className="flex-1 text-center text-sm text-[#f0e6d0]">{state.passengers}</span>
            <button onClick={() => update({ passengers: Math.min(20, state.passengers + 1) })} className="text-[#c9a96e] w-6 text-lg">+</button>
          </div>
        </div>
      </div>

      {/* Vehicle selection */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-[#5f5850] mb-3">Select Vehicle</p>
        <div className="space-y-3">
          {vehicles.filter((v) => v.capacity >= state.passengers).map((v) => (
            <VehicleCard
              key={v.id}
              id={v.id}
              name={v.name}
              tagline={v.tagline}
              capacity={v.capacity}
              basePrice={Number(v.basePrice)}
              features={v.features}
              selected={state.vehicleId === v.id}
              onSelect={(id) => update({ vehicleId: id })}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={next} disabled={!canProceed}>
          Continue to Customize
        </Button>
      </div>

      <QuoteBar quote={state.quote} loading={quoteLoading} />
    </div>
  )
}
