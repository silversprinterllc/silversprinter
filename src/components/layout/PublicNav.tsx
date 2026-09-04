'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const tripTypes = [
  { href: '/golf', label: 'Golf Trips' },
  { href: '/gameday', label: 'Game Day' },
  { href: '/corporate', label: 'Corporate' },
  { href: '/family', label: 'Family & Occasions' },
  { href: '/youth-sports', label: 'Youth Sports' },
]

export function PublicNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [tripsOpen, setTripsOpen] = useState(false)

  const tripPaths = tripTypes.map((t) => t.href)
  const isTripsActive = tripPaths.some((p) => pathname.startsWith(p))

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#433d38]/50 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-[#f0e6d0] tracking-wide">
          Silver<span className="text-[#c9a96e]">Sprinter</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/fleet', label: 'The Van' },
            { href: '/gallery', label: 'Gallery' },
            { href: '/rates', label: 'Rates' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition-colors ${pathname.startsWith(l.href) ? 'text-[#c9a96e]' : 'text-[#a09890] hover:text-[#f0e6d0]'}`}
            >
              {l.label}
            </Link>
          ))}

          {/* Trip Types dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTripsOpen(true)}
            onMouseLeave={() => setTripsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm tracking-wide transition-colors ${isTripsActive ? 'text-[#c9a96e]' : 'text-[#a09890] hover:text-[#f0e6d0]'}`}
            >
              Trip Types <ChevronDown size={14} className={`transition-transform duration-200 ${tripsOpen ? 'rotate-180' : ''}`} />
            </button>
            {tripsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="bg-[#0a0a0a] border border-[#433d38]/70 py-2 min-w-[180px]">
                  {tripTypes.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className={`block px-5 py-2.5 text-sm transition-colors ${pathname.startsWith(t.href) ? 'text-[#c9a96e]' : 'text-[#a09890] hover:text-[#f0e6d0] hover:bg-[#1a1612]'}`}
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={`text-sm tracking-wide transition-colors ${pathname.startsWith('/about') ? 'text-[#c9a96e]' : 'text-[#a09890] hover:text-[#f0e6d0]'}`}
          >
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/sterling-reserve" className="text-sm text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors tracking-wide">
            Road Club
          </Link>
          <Button size="sm" asChild>
            <Link href="/insurance">Book Now</Link>
          </Button>
        </div>

        <button className="md:hidden text-[#a09890]" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#433d38] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-1">
          {[
            { href: '/fleet', label: 'The Van' },
            { href: '/gallery', label: 'Gallery' },
            { href: '/rates', label: 'Rates' },
            { href: '/about', label: 'About' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="py-2 text-sm text-[#a09890] hover:text-[#f0e6d0]" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="border-t border-[#433d38]/40 mt-2 pt-2">
            <p className="text-xs tracking-widest uppercase text-[#5f5850] mb-2 mt-1">Trip Types</p>
            {tripTypes.map((t) => (
              <Link key={t.href} href={t.href} className="py-2 text-sm text-[#a09890] hover:text-[#f0e6d0] block" onClick={() => setOpen(false)}>
                {t.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#433d38]/40 mt-2 pt-3 flex flex-col gap-3">
            <Link href="/sterling-reserve" className="text-sm text-[#c9a96e]/70" onClick={() => setOpen(false)}>
              Road Club
            </Link>
            <Button size="sm" asChild>
              <Link href="/insurance" onClick={() => setOpen(false)}>Book Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
