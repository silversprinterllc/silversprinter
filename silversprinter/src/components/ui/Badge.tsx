interface BadgeProps {
  variant?: 'gold' | 'green' | 'blue' | 'gray' | 'red' | 'amber'
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<string, string> = {
  gold: 'bg-[#c9a96e]/20 text-[#c9a96e] border border-[#c9a96e]/30',
  green: 'bg-emerald-900/40 text-emerald-400 border border-emerald-700/30',
  blue: 'bg-blue-900/40 text-blue-400 border border-blue-700/30',
  gray: 'bg-[#2a2520] text-[#a09890] border border-[#433d38]',
  red: 'bg-red-900/40 text-red-400 border border-red-700/30',
  amber: 'bg-amber-900/40 text-amber-400 border border-amber-700/30',
}

export function Badge({ variant = 'gray', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium tracking-wide ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}
