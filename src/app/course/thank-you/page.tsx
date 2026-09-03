'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

type UpgradeBlock =
  | { show: true; headline: string; body: string; cta: string; href: string }
  | { show: false }

type TierContent = {
  headline: string
  sub: string
  steps: { n: string; title: string; body: string }[]
  upgrade: UpgradeBlock
}

const NEXT_STEPS: Record<string, TierContent> = {
  system: {
    headline: "You're In. The System is Unlocked.",
    sub: "Check your inbox — your course access link arrives within 5 minutes. Don't see it? Check spam.",
    steps: [
      { n: '01', title: 'Check your email', body: 'Look for an email from ben@spokebnb.com with your access link. If it isn\'t there in 5 minutes, check spam or email ben@spokebnb.com.' },
      { n: '02', title: 'Start Module 0 tonight', body: 'The Foundation module is 45 minutes. It reframes how you think about your property and where demand actually comes from. Don\'t skip it.' },
      { n: '03', title: 'Join the community', body: 'Your dashboard includes access to the private SpokeBnB community. Introduce yourself and share your property.' },
      { n: '04', title: 'Block 2 hours this week', body: 'Module 04 is where revenue strategy begins. One focused session and you\'ll have your pricing framework and platform decision locked.' },
    ],
    upgrade: {
      show: true,
      headline: 'Want SpokeBnB to build your site?',
      body: 'The Build delivers your property-specific direct-booking website — responsive, PMS-connected, SEO-ready, and handed off in 3–4 weeks. Buy the infrastructure while you\'re learning the system.',
      cta: 'Get The Build →',
      href: '/course#pricing',
    },
  },
  build: {
    headline: "Build Confirmed. Intake Coming.",
    sub: "Your site is on the schedule. Expect a message from ben@spokebnb.com within 1 business day with the intake questionnaire.",
    steps: [
      { n: '01', title: 'Watch your inbox', body: 'You\'ll receive the intake questionnaire within 1 business day. The stronger your intake, the stronger your first build.' },
      { n: '02', title: 'Complete the intake thoroughly', body: 'We build from your intake — property facts, photos, PMS access, and positioning. Incomplete intake delays the build.' },
      { n: '03', title: 'Gather your assets', body: 'Professional photos, your logo (if you have one), your Airbnb/VRBO links, and any existing reviews you want to feature.' },
      { n: '04', title: 'Domain and PMS access', body: 'You\'ll need to share domain login (or point DNS to us) and PMS API credentials. We\'ll walk you through both.' },
    ],
    upgrade: { show: false },
  },
}

function ThankYouContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const tierParam = searchParams.get('tier') as keyof typeof NEXT_STEPS | null
  const [tier, setTier] = useState<keyof typeof NEXT_STEPS>('system')

  useEffect(() => {
    if (tierParam && NEXT_STEPS[tierParam]) {
      setTier(tierParam)
    }
  }, [tierParam])

  const content = NEXT_STEPS[tier]

  return (
    <div className="min-h-screen bg-[var(--sf-navy)]">
      {/* Hero */}
      <div className="pt-20 pb-16 px-6 text-center border-b border-white/10">
        <div className="mx-auto w-16 h-16 rounded-full bg-[var(--sf-gold)]/20 flex items-center justify-center mb-8">
          <svg className="w-8 h-8 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
          {content.headline}
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
          {content.sub}
        </p>
        {sessionId && (
          <p className="mt-4 text-xs text-white/20 font-mono">
            Order #{sessionId.slice(-12).toUpperCase()}
          </p>
        )}
      </div>

      {/* Next Steps */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-[var(--sf-gold)] mb-8 text-center">
          Your Next 4 Steps
        </p>
        <div className="space-y-4">
          {content.steps.map((step) => (
            <div key={step.n} className="flex gap-5 bg-white/5 rounded-2xl p-6 border border-white/8">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--sf-gold)]/20 flex items-center justify-center">
                <span className="text-xs font-bold text-[var(--sf-gold)]">{step.n}</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade prompt (System buyers only) */}
        {content.upgrade.show && (
          <div className="mt-10 rounded-2xl border border-[var(--sf-gold)]/30 bg-[var(--sf-gold)]/5 p-8">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--sf-gold)] mb-3">
              Optional Upgrade
            </p>
            {'headline' in content.upgrade && (
              <>
                <h3 className="font-[var(--font-display)] text-xl font-bold text-white mb-3">
                  {content.upgrade.headline}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  {content.upgrade.body}
                </p>
                <a
                  href={content.upgrade.href}
                  className="inline-flex items-center gap-2 bg-[var(--sf-gold)] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[var(--sf-gold)]/90 transition-all"
                >
                  {content.upgrade.cta}
                </a>
              </>
            )}
          </div>
        )}

        {/* Support */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-sm text-white/30">
            Questions?{' '}
            <a href="mailto:ben@spokebnb.com" className="text-[var(--sf-gold)] hover:underline">
              ben@spokebnb.com
            </a>
          </p>
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to SpokeBnB
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--sf-navy)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--sf-gold)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
