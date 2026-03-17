'use client'
import { Users, Check } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface VehicleCardProps {
  id: string
  name: string
  tagline: string | null
  capacity: number
  basePrice: number
  features: string[]
  selected: boolean
  onSelect: (id: string) => void
}

export function VehicleCard({ id, name, tagline, capacity, basePrice, features, selected, onSelect }: VehicleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`w-full text-left border rounded-lg p-5 transition-all duration-200 ${
        selected
          ? 'border-[#c9a96e] bg-[#c9a96e]/5'
          : 'border-[#433d38]/50 bg-[#1a1612] hover:border-[#c9a96e]/40'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-serif text-lg text-[#f0e6d0]">{name}</h3>
          {tagline && <p className="text-xs text-[#5f5850] mt-0.5">{tagline}</p>}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-serif text-[#c9a96e]">from {formatCurrency(basePrice)}</span>
          <span className="flex items-center gap-1 text-xs text-[#5f5850]"><Users size={12} />{capacity} pax</span>
        </div>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {features.slice(0, 4).map((f) => (
          <li key={f} className="text-xs text-[#a09890] flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#c9a96e]/60 flex-shrink-0" />{f}
          </li>
        ))}
      </ul>
      {selected && (
        <div className="mt-3 flex items-center gap-1 text-xs text-[#c9a96e]">
          <Check size={12} /> Selected
        </div>
      )}
    </button>
  )
}
