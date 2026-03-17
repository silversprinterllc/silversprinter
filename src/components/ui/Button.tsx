import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'gold', size = 'md', className = '', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const base = 'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
    const variants = {
      gold: 'bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#b8934a] active:bg-[#9a7438]',
      outline: 'border border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e]/10',
      ghost: 'text-[#c9a96e] hover:bg-[#c9a96e]/10',
      danger: 'bg-red-800 text-white hover:bg-red-700',
    }
    const sizes = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    }
    return (
      <Comp ref={ref as any} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'
