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
          {/* Logo — wheel embedded as the 'o' in SpokeBnB, matching brand geometry */}
          <a href="/course" className="flex items-center group" aria-label="SpokeBnB">
            <svg
              viewBox="105 65 755 165"
              className="h-8 w-auto"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <text
                x="112" y="165"
                fill="white"
                fontFamily="'Playfair Display', Didot, 'Bodoni MT', Georgia, serif"
                fontSize="112"
              >Sp</text>
              <circle cx="330" cy="132" r="43" fill="none" stroke="#D4A017" strokeWidth="4" />
              <circle cx="330" cy="132" r="6.02" fill="none" stroke="#D4A017" strokeWidth="4" />
              <line x1="336.45" y1="132.00" x2="369.56" y2="132.00" stroke="#D4A017" strokeWidth="4" />
              <line x1="334.56" y1="136.56" x2="357.97" y2="159.97" stroke="#D4A017" strokeWidth="4" />
              <line x1="330.00" y1="138.45" x2="330.00" y2="171.56" stroke="#D4A017" strokeWidth="4" />
              <line x1="325.44" y1="136.56" x2="302.03" y2="159.97" stroke="#D4A017" strokeWidth="4" />
              <line x1="323.55" y1="132.00" x2="290.44" y2="132.00" stroke="#D4A017" strokeWidth="4" />
              <line x1="325.44" y1="127.44" x2="302.03" y2="104.03" stroke="#D4A017" strokeWidth="4" />
              <line x1="330.00" y1="125.55" x2="330.00" y2="92.44" stroke="#D4A017" strokeWidth="4" />
              <line x1="334.56" y1="127.44" x2="357.97" y2="104.03" stroke="#D4A017" strokeWidth="4" />
              <text
                x="372" y="165"
                fill="white"
                fontFamily="'Playfair Display', Didot, 'Bodoni MT', Georgia, serif"
                fontSize="112"
              >keBnB</text>
            </svg>
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
