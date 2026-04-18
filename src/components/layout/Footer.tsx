import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#433d38]/50 bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="border-b border-[#433d38]/40 pb-12 mb-12">
          <div className="max-w-md">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Stay in the Loop</p>
            <p className="text-sm text-[#5f5850] mb-5">Availability updates, new routes, and Sterling Reserve openings. No noise.</p>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="flex gap-3"
            >
              <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ''} />
              <input type="hidden" name="subject" value="Sterling Route Newsletter Signup" />
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 bg-[#1a1612] border border-[#433d38]/70 text-[#f0e6d0] placeholder-[#5f5850] px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#c9a96e] text-[#0a0a0a] text-sm font-medium hover:bg-[#d4b87a] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <p className="font-serif text-2xl text-[#f0e6d0] mb-3">
            Silver<span className="text-[#c9a96e]">Sprinter</span>
          </p>
          <p className="text-sm text-[#5f5850] leading-relaxed max-w-xs">
            Self-drive luxury Sprinter rental for those who demand more. The MAD Daycruiser D6 — available by the day.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-[#c9a96e] mb-4">Services</p>
          <ul className="space-y-2">
            {[
              { label: 'Day Rentals', href: '/insurance' },
              { label: 'Multi-Day Trips', href: '/insurance' },
              { label: 'Events & Weddings', href: '/insurance' },
              { label: 'Corporate Travel', href: '/corporate' },
              { label: 'Golf Trips', href: '/golf' },
              { label: 'Game Day', href: '/gameday' },
              { label: 'Family & Occasions', href: '/family' },
              { label: 'Youth Sports', href: '/youth-sports' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-sm text-[#5f5850] hover:text-[#a09890] transition-colors">{label}</Link>
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
