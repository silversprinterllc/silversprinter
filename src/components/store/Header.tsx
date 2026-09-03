'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Program', href: '#program' },
    { label: 'Modules', href: '#modules' },
    { label: 'Free Tools', href: '#tools-free' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--sf-navy)]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/course" className="flex items-center gap-2.5 group">
            {/* SpokeBnB wheel mark — official geometry */}
            <svg
              className="w-8 h-8 text-[var(--sf-gold)] shrink-0"
              viewBox="0 0 512 512"
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="256" cy="256" r="150" />
              <circle cx="256" cy="256" r="21" />
              <line x1="278.50" y1="256.00" x2="394.00" y2="256.00" />
              <line x1="271.91" y1="271.91" x2="353.58" y2="353.58" />
              <line x1="256.00" y1="278.50" x2="256.00" y2="394.00" />
              <line x1="240.09" y1="271.91" x2="158.42" y2="353.58" />
              <line x1="233.50" y1="256.00" x2="118.00" y2="256.00" />
              <line x1="240.09" y1="240.09" x2="158.42" y2="158.42" />
              <line x1="256.00" y1="233.50" x2="256.00" y2="118.00" />
              <line x1="271.91" y1="240.09" x2="353.58" y2="158.42" />
            </svg>
            <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-white">
              Spoke<span className="text-[var(--sf-gold)]">BnB</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-[var(--sf-gold)] text-white/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="bg-[var(--sf-gold)] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-lg"
            >
              Enroll Now
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[var(--sf-navy)] rounded-b-2xl pb-6 px-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-white/80 hover:text-[var(--sf-gold)] text-sm font-medium border-b border-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 bg-[var(--sf-gold)] text-white px-5 py-3 rounded-lg text-sm font-semibold text-center"
            >
              Enroll Now
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
