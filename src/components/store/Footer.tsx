const footerLinks = [
  {
    heading: 'Program',
    links: [
      { label: 'Curriculum', href: '#modules' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Tools', href: '#tools' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    heading: 'Offers',
    links: [
      { label: 'The System', href: '#pricing' },
      { label: 'The Build', href: '#pricing' },
      { label: 'The Bundle', href: '#pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#instructor' },
      { label: 'Barefoot Realty', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/course/legal/terms' },
      { label: 'Privacy Policy', href: '/course/legal/privacy' },
      { label: 'Refund Policy', href: '/course/legal/refund' },
      { label: 'Earnings Disclaimer', href: '/course/legal/earnings-disclaimer' },
      { label: 'Affiliate Disclosure', href: '/course/legal/affiliate-disclosure' },
    ],
  },
]


export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-[var(--sf-navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
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
              <span className="font-[var(--font-display)] text-lg font-semibold">
                Spoke<span className="text-[var(--sf-gold)]">BnB</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              The Hub-and-Spoke Revenue System that transforms short-term rentals
              into scalable, revenue-generating businesses.
            </p>

          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-white/70 mb-4">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/30 hover:text-[var(--sf-gold)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} SpokeBnB. A product of Barefoot
            Realty &amp; Investments. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Built with systems. Powered by results.
          </p>
        </div>
      </div>
    </footer>
  )
}
