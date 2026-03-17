'use client'
import { formatCurrency } from '@/lib/utils'
import { Check } from 'lucide-react'

interface AddonCardProps {
  id: string
  name: string
  description: string | null
  price: number
  selected: boolean
  onToggle: (id: string) => void
}

export function AddonCard({ id, name, description, price, selected, onToggle }: AddonCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={`w-full text-left border p-4 transition-all duration-200 ${
        selected
          ? 'border-[#c9a96e] bg-[#c9a96e]/5'
          : 'border-[#433d38]/50 bg-[#1a1612] hover:border-[#c9a96e]/40'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <p className="text-sm font-medium text-[#f0e6d0]">{name}</p>
          {description && <p className="text-xs text-[#5f5850] mt-0.5">{description}</p>}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm text-[#c9a96e]">+{formatCurrency(price)}</span>
          {selected && <Check size={14} className="text-[#c9a96e]" />}
        </div>
      </div>
    </button>
  )
}
