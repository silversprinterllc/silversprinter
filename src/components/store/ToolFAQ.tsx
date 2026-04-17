'use client'

import { useState } from 'react'

export interface FAQItem {
  q: string
  a: string
}

interface ToolFAQProps {
  items: FAQItem[]
  title?: string
  subtitle?: string
}

export default function ToolFAQ({
  items,
  title = 'Frequently Asked Questions',
  subtitle,
}: ToolFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[var(--sf-cream)]" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-3">
            {title}
          </h2>
          {subtitle && <p className="text-[var(--sf-navy)]/60 mt-3">{subtitle}</p>}
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[var(--sf-navy)]/10 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-5 hover:bg-[var(--sf-cream)]/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[var(--sf-navy)] text-base sm:text-lg pr-4">
                    {item.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[var(--sf-gold)] flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`sf-accordion-content ${isOpen ? 'open' : ''}`}>
                  <div className="sf-accordion-inner">
                    <p className="px-5 sm:px-6 pb-5 text-[var(--sf-navy)]/70 text-sm sm:text-base leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
