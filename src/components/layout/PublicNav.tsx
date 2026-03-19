'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const tripLinks = [
  { href: '/golf',      label: 'Golf Trips' },
  { href: '/gameday',   label: 'Game Day' },
  { href: '/corporate', label: 'Corporate' },
  { href: '/family',    label: 'Family & Occasions' },
]

export function PublicNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const mainLinks = [
    { href: '/',        label: 'Home',    exact: true },
    { href: '/fleet',   label: 'The Van', exact: false },
    { href: '/gallery', label: 'Gallery', exact: false },
  ]

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const tripActive = tripLinks.some((t) => pathname.startsWith(t.href))

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#433d38]/50 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-serif text-xl text-[#f0e6d0] tracking-wide">
          Silver<span className="text-[#c9a96e]">Sprinter</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {mainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition-colors ${
                isActive(l.href, l.exact) ? 'text-[#c9a96e]' : 'text-[#a09890] hover:text-[#f0e6d0]'
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Trip type dropdown */}
          <div ref={dropRef} className="relative">
            <button
              onClick={() => setDropOpen((v) => !v)}
              className={`flex items-center gap-1 text-sm tracking-wide transition-colors ${
                tripActive ? 'text-[#c9a96e]' : 'text-[#a09890] hover:text-[#f0e6d0]'
              }`}
            >
              Trip Types
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 border border-[#433d38] bg-[#0a0a0a] shadow-xl">
                {tripLinks.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    onClick={() => setDropOpen(false)}
                    className={`block px-5 py-3 text-sm tracking-wide border-b border-[#433d38]/50 last:border-0 transition-colors ${
                      pathname.startsWith(t.href)
                        ? 'text-[#c9a96e] bg-[#1a1612]'
                        : 'text-[#a09890] hover:text-[#f0e6d0] hover:bg-[#1a1612]'
                    }`}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Book Now */}
        <div className="hidden md:flex items-center">
          <Button size="sm" asChild>
            <Link href="/book">Book Now</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#a09890]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#433d38] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-1">
          {mainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`py-2 text-sm transition-colors ${
                isActive(l.href, l.exact) ? 'text-[#c9a96e]' : 'text-[#a09890]'
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <div className="pt-2 pb-1">
            <p className="text-xs tracking-[0.3em] uppercase text-[#433d38] mb-2">Trip Types</p>
            {tripLinks.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`block py-2 pl-3 text-sm transition-colors border-l border-[#433d38]/50 ${
                  pathname.startsWith(t.href) ? 'text-[#c9a96e] border-[#c9a96e]' : 'text-[#a09890]'
                }`}
                onClick={() => setOpen(false)}
              >
                {t.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Button size="sm" asChild>
              <Link href="/book" onClick={() => setOpen(false)}>Book Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
