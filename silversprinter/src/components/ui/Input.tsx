import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-medium tracking-widest uppercase text-[#a09890]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`rounded-sm bg-[#1a1612] border border-[#433d38] text-[#f0e6d0] placeholder-[#5f5850] px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    )
  }
)
Input.displayName = 'Input'
