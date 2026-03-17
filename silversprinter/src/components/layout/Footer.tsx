import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#433d38]/50 bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <p className="font-serif text-2xl text-[#f0e6d0] mb-3">
            Silver<span className="text-[#c9a96e]">Sprinter</span>
          </p>
          <p className="text-sm text-[#5f5850] leading-relaxed max-w-xs">
            Luxury sprinter van charters for those who demand more. Professional chauffeurs, curated cabins, 24/7 concierge.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-[#c9a96e] mb-4">Services</p>
          <ul className="space-y-2">
            {['Airport Transfers', 'Hourly Charter', 'Events & Weddings', 'Corporate Travel'].map((s) => (
              <li key={s}>
                <Link href="/book" className="text-sm text-[#5f5850] hover:text-[#a09890] transition-colors">{s}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-[#c9a96e] mb-4">Company</p>
          <ul className="space-y-2">
            {[['About', '/about'], ['Fleet', '/fleet'], ['Corporate', '/corporate'], ['Contact', '/contact']].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-sm text-[#5f5850] hover:text-[#a09890] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#433d38]/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#433d38]">© {new Date().getFullYear()} SilverSprinter. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Cookies'].map((l) => (
            <Link key={l} href={`/${l.toLowerCase()}`} className="text-xs text-[#433d38] hover:text-[#5f5850] transition-colors">{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
