'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map, List, Truck, Users, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const navItems = [
  { href: '/dispatcher', label: 'Live Map', icon: Map, exact: true },
  { href: '/dispatcher/bookings', label: 'Bookings', icon: List },
  { href: '/dispatcher/fleet', label: 'Fleet', icon: Truck },
  { href: '/dispatcher/chauffeurs', label: 'Chauffeurs', icon: Users },
]

export function DispatcherSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-56 shrink-0 border-r border-[#433d38]/50 min-h-screen pt-8 px-4 flex flex-col">
      <div className="font-serif text-lg text-[#f0e6d0] px-2 mb-2">SilverSprinter</div>
      <div className="text-xs text-[#c9a96e] tracking-widest uppercase px-2 mb-8">Dispatch</div>
      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${active ? 'bg-[#c9a96e]/10 text-[#c9a96e]' : 'text-[#5f5850] hover:text-[#a09890] hover:bg-[#1a1612]'}`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#5f5850] hover:text-[#a09890] transition-colors mb-4"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </aside>
  )
}
