'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { Step1Configure } from './steps/Step1Configure'
import { Step2Customize } from './steps/Step2Customize'
import { Step3Review } from './steps/Step3Review'
import { Step4Payment } from './steps/Step4Payment'
import type { BookingWizardState, QuoteResult } from '@/types/booking'
import type { ServiceType } from '@prisma/client'

const initialState: BookingWizardState = {
  step: 1,
  serviceType: null,
  vehicleId: null,
  pickupAddress: '',
  destinationAddress: '',
  pickupAt: null,
  passengers: 1,
  addonIds: [],
  chauffeurId: null,
  cabinTemp: 68,
  musicPreference: '',
  lightingMood: '',
  welcomeNote: '',
  notes: '',
  quote: null,
}

interface WizardContextValue {
  state: BookingWizardState
  update: (patch: Partial<BookingWizardState>) => void
  next: () => void
  back: () => void
  goTo: (step: 1 | 2 | 3 | 4) => void
}

const WizardContext = createContext<WizardContextValue | null>(null)

export function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used inside BookingWizard')
  return ctx
}

interface Props {
  initialVehicleId?: string
}

export function BookingWizard({ initialVehicleId }: Props) {
  const [state, setState] = useState<BookingWizardState>({
    ...initialState,
    vehicleId: initialVehicleId ?? null,
  })

  const update = useCallback((patch: Partial<BookingWizardState>) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  const next = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, 4) as 1 | 2 | 3 | 4 }))
  }, [])

  const back = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) as 1 | 2 | 3 | 4 }))
  }, [])

  const goTo = useCallback((step: 1 | 2 | 3 | 4) => {
    setState((prev) => ({ ...prev, step }))
  }, [])

  const steps = ['Configure', 'Customize', 'Review', 'Payment']

  return (
    <WizardContext.Provider value={{ state, update, next, back, goTo }}>
      <div className="min-h-screen bg-[#0a0a0a] pt-16">
        {/* Progress bar */}
        <div className="sticky top-16 z-30 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#433d38]/50 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center gap-0">
            {steps.map((label, i) => {
              const stepNum = (i + 1) as 1 | 2 | 3 | 4
              const isActive = state.step === stepNum
              const isDone = state.step > stepNum
              return (
                <div key={label} className="flex items-center flex-1">
                  <button
                    onClick={() => isDone && goTo(stepNum)}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      isActive ? 'text-[#c9a96e]' : isDone ? 'text-[#5f5850] hover:text-[#a09890] cursor-pointer' : 'text-[#2a2520] cursor-default'
                    }`}
                  >
                    <span className={`w-6 h-6 flex items-center justify-center text-xs border ${
                      isActive ? 'border-[#c9a96e] text-[#c9a96e]' : isDone ? 'border-[#433d38] bg-[#433d38] text-[#f0e6d0]' : 'border-[#2a2520] text-[#2a2520]'
                    }`}>
                      {isDone ? '✓' : stepNum}
                    </span>
                    <span className="hidden sm:block">{label}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 mx-4 h-px ${isDone ? 'bg-[#433d38]' : 'bg-[#1a1612]'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step content */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          {state.step === 1 && <Step1Configure />}
          {state.step === 2 && <Step2Customize />}
          {state.step === 3 && <Step3Review />}
          {state.step === 4 && <Step4Payment />}
        </div>
      </div>
    </WizardContext.Provider>
  )
}
