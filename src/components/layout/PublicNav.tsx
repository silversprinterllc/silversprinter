'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PublicNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home', exact: true },
    { href: '/fleet', label: 'The Van', exact: false },
    { href: '/gallery', label: 'Gallery', exact: false },
  ]

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#433d38]/50 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-[#f0e6d0] tracking-wide">
          Silver<span className="text-[#c9a96e]">Sprinter</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition-colors ${isActive(l.href, l.exact) ? 'text-[#c9a96e]' : 'text-[#a09890] hover:text-[#f0e6d0]'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <Button size="sm" asChild>
            <Link href="/book">Book Now</Link>
          </Button>
        </div>

        <button className="md:hidden text-[#a09890]" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#433d38] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${isActive(l.href, l.exact) ? 'text-[#c9a96e]' : 'text-[#a09890] hover:text-[#f0e6d0]'}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Button size="sm" asChild>
            <Link href="/book" onClick={() => setOpen(false)}>Book Now</Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
