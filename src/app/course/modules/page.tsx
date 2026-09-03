import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const CORE_MODULES = [
  { id: 'module-00', num: '00', title: 'Foundation', sub: 'Hub-and-Spoke Model · Your Three Numbers', start: true },
  { id: 'module-01', num: '01', title: 'Market Analysis', sub: 'AirDNA · Demand Zones · Regulatory Risk' },
  { id: 'module-02', num: '02', title: 'Tech Stack', sub: 'Tool Audit · Three-Question Filter' },
  { id: 'module-03', num: '03', title: 'Listing & Platforms', sub: 'Airbnb · VRBO · Listing Optimization' },
  { id: 'module-04', num: '04', title: 'Pricing & Revenue', sub: 'PriceLabs · Dynamic Pricing · RevPAR' },
  { id: 'module-05', num: '05', title: 'Automation & Operations', sub: 'OwnerRez · Guest Messaging · SOPs' },
  { id: 'module-06', num: '06', title: 'Guest Capture', sub: 'StayFi · Email Capture · Loyalty' },
  { id: 'module-07', num: '07', title: 'Direct Booking Engine', sub: 'Website · Kit · Campaign Strategy' },
  { id: 'module-08', num: '08', title: 'Local Guide & SEO', sub: 'Google · Neighborhood Authority · SEO' },
  { id: 'module-09', num: '09', title: 'Content & Reviews', sub: 'Review Strategy · Content System' },
  { id: 'module-10', num: '10', title: 'Creator Network & Upsells', sub: 'Influencer Partnerships · Revenue Stacks' },
  { id: 'module-11', num: '11', title: 'Curated Experiences', sub: 'Experience Packages · Upsell Ladder' },
  { id: 'module-12', num: '12', title: 'Sponsors & Scale', sub: 'Brand Partnerships · Multi-Property Systems' },
  { id: 'module-13', num: '13', title: 'Acquisition at Scale', sub: 'Deal Analysis · Capital · Underwriting' },
  { id: 'module-14', num: '14', title: 'Build It for Others', sub: 'STR Service Business · Exit Strategy' },
]

const BONUS_MODULES = [
  { id: 'module-15', num: '15', title: 'STR Insurance', sub: 'Coverage Gaps · Host Protection' },
  { id: 'module-16', num: '16', title: 'Tax Strategy', sub: 'STR Deductions · Cost Segregation' },
  { id: 'module-17', num: '17', title: 'Mid-Term Rentals', sub: 'MTR Positioning · 30+ Day Strategy' },
  { id: 'module-18', num: '18', title: 'Guest Damage Protection', sub: 'Claims · Deposits · Resolution' },
  { id: 'module-19', num: '19', title: 'Paid Traffic & Social Advertising', sub: 'Meta Ads · Retargeting · ROI' },
  { id: 'module-20', num: '20', title: 'Guest Security & Fraud Prevention', sub: 'Vetting · Smart Locks · Risk' },
]

const TIER_LABELS: Record<string, string> = {
  system: 'The System',
  build: 'The Build',
  bundle: 'The Bundle',
  founding: 'Founding Member',
}

export default async function CourseDashboard() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('sbnb_access')?.value

  if (!raw) {
    redirect('/course#pricing')
  }

  const tier = raw.split(':')[0] || 'system'
  const tierLabel = TIER_LABELS[tier] || 'The System'

  return (
    <div className="min-h-screen" style={{ background: '#09263A', fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-30 border-b"
        style={{
          background: 'rgba(9, 38, 58, 0.95)',
          borderColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/course" className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-tight" style={{ color: '#D4A017' }}>SpokeBnB</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full border" style={{ color: 'rgba(247,243,234,0.4)', borderColor: 'rgba(255,255,255,0.12)' }}>
              Academy
            </span>
          </Link>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(212,160,23,0.15)', color: '#D4A017', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            {tierLabel}
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#D4A017' }}>
            Your Course
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#F7F3EA', fontFamily: 'var(--font-display, Georgia, serif)' }}>
            The Hub-and-Spoke System
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'rgba(247,243,234,0.55)' }}>
            15 core modules + 6 bonus modules. Start with Foundation — it reframes everything that follows. Open each module in its own tab and work at your own pace.
          </p>
        </div>

        {/* Core Curriculum */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(247,243,234,0.35)' }}>
              Core Curriculum
            </h2>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span className="text-xs" style={{ color: 'rgba(247,243,234,0.25)' }}>15 modules</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_MODULES.map((mod) => (
              <a
                key={mod.id}
                href={`/course/modules/${mod.id}.html`}
                className="group flex gap-4 p-5 rounded-xl border transition-all duration-150"
                style={{
                  background: mod.start ? 'rgba(212,160,23,0.06)' : 'rgba(255,255,255,0.03)',
                  borderColor: mod.start ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.07)',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget
                  el.style.background = mod.start ? 'rgba(212,160,23,0.1)' : 'rgba(255,255,255,0.06)'
                  el.style.borderColor = mod.start ? 'rgba(212,160,23,0.45)' : 'rgba(255,255,255,0.14)'
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget
                  el.style.background = mod.start ? 'rgba(212,160,23,0.06)' : 'rgba(255,255,255,0.03)'
                  el.style.borderColor = mod.start ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.07)'
                }}
              >
                {/* Number badge */}
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{
                    background: mod.start ? 'rgba(212,160,23,0.2)' : 'rgba(255,255,255,0.06)',
                    color: mod.start ? '#D4A017' : 'rgba(247,243,234,0.4)',
                  }}
                >
                  {mod.num}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm leading-snug" style={{ color: '#F7F3EA' }}>
                      {mod.title}
                    </h3>
                    {mod.start && (
                      <span
                        className="shrink-0 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(212,160,23,0.2)', color: '#D4A017' }}
                      >
                        Start
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(247,243,234,0.35)' }}>
                    {mod.sub}
                  </p>
                  <p
                    className="text-xs font-semibold mt-2 flex items-center gap-1"
                    style={{ color: mod.start ? '#D4A017' : 'rgba(247,243,234,0.3)' }}
                  >
                    Open module
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Bonus Modules */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(247,243,234,0.35)' }}>
              Bonus Modules
            </h2>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span className="text-xs" style={{ color: 'rgba(247,243,234,0.25)' }}>6 modules</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BONUS_MODULES.map((mod) => (
              <a
                key={mod.id}
                href={`/course/modules/${mod.id}.html`}
                className="group flex gap-4 p-5 rounded-xl border transition-all duration-150"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(247,243,234,0.3)' }}
                >
                  {mod.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm" style={{ color: '#F7F3EA' }}>
                    {mod.title}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(247,243,234,0.3)' }}>
                    {mod.sub}
                  </p>
                  <p className="text-xs font-semibold mt-2 flex items-center gap-1" style={{ color: 'rgba(247,243,234,0.25)' }}>
                    Open module
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-14 pt-8 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-sm" style={{ color: 'rgba(247,243,234,0.25)' }}>
            Questions?{' '}
            <a href="mailto:ben@spokebnb.com" style={{ color: '#D4A017' }}>
              ben@spokebnb.com
            </a>
            {' '}· Lifetime access · All future updates included
          </p>
        </div>
      </main>
    </div>
  )
}
