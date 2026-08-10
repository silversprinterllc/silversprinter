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
    headline: "You're In. Let's Build Your Revenue Machine.",
    sub: "The System is unlocked. Check your inbox for your Kajabi access link — it arrives within 5 minutes.",
    steps: [
      { n: '01', title: 'Check your email', body: 'Look for an email from ben@spokebnb.com with your course login link. Check spam if you don\'t see it in 5 minutes.' },
      { n: '02', title: 'Start Module 0 tonight', body: 'The Foundation module is 45 minutes. It rewires how you think about your property — don\'t skip it.' },
      { n: '03', title: 'Join the community', body: 'Your Kajabi dashboard has a link to the private SpokeBnB community. Introduce yourself and share your property.' },
      { n: '04', title: 'Block 2 hours this week', body: 'Module 1 is where revenue strategy starts. One focused session and you\'ll have your platform decision locked.' },
    ],
    upgrade: {
      show: true,
      headline: 'Want us in the room with you?',
      body: 'Upgrade to The Intensive and get 5 personalized coaching calls, Loom critiques of your site and listings, and Slack access between calls. The difference between knowing what to do and having it done right the first time.',
      cta: 'Upgrade to The Intensive →',
      href: '/course#pricing',
    },
  },
  intensive: {
    headline: "Welcome to The Intensive.",
    sub: "You picked the fastest path to a running system. Your onboarding call scheduling link is in your inbox.",
    steps: [
      { n: '01', title: 'Book your kickoff call', body: 'Check your email for a Calendly link. Pick a time in the next 48 hours. We\'ll choose your track on that call.' },
      { n: '02', title: 'Choose your track', body: 'Direct Booking, Automation, or Content & Growth. Come to the kickoff call with a gut feeling — we\'ll confirm it together.' },
      { n: '03', title: 'Access your course', body: 'Kajabi login is in the same email. Start Module 0 before your kickoff call so we can skip the basics.' },
      { n: '04', title: 'Join the Slack channel', body: 'Your private Slack invite is in the email. Ping me there with your property URL and I\'ll take a first look.' },
    ],
    upgrade: { show: false },
  },
  concierge: {
    headline: "Application Submitted.",
    sub: "We review every Concierge application personally. You'll hear from Ben directly within 1 business day.",
    steps: [
      { n: '01', title: 'Watch your inbox', body: 'A personal reply from ben@spokebnb.com is coming within 24 hours. Add it to your contacts so it doesn\'t hit spam.' },
      { n: '02', title: 'Prepare your property info', body: 'We\'ll ask for your current listing URLs, a rough sense of your revenue goals, and which track you\'re most interested in.' },
      { n: '03', title: 'Strategy call', body: 'Once accepted, we schedule a 60-minute strategy session. That\'s where we scope the build, assign your team, and set milestones.' },
      { n: '04', title: 'Build begins in Week 1', body: 'Our team starts within 7 days of strategy call completion. You approve milestones at each stage — no surprises.' },
    ],
    upgrade: { show: false },
  },
  founding: {
    headline: "Founding Member. You're Early.",
    sub: "This is the best thing you could have done for your STR business. You'll get everything first.",
    steps: [
      { n: '01', title: 'Founding badge unlocked', body: 'Your Founding Member status is permanent. You\'ll be credited in the course and get first access to every new module.' },
      { n: '02', title: 'Direct Slack access', body: 'Your Slack invite is in your email. This is a direct line to Ben — not a general community channel.' },
      { n: '03', title: 'Priority for intensives', body: 'When The Intensive opens, Founding Members get first pick of spots at the original rate.' },
      { n: '04', title: 'Watch your inbox', body: 'Course access drops in the next 24 hours with a personal note from Ben on where to start.' },
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
            </a>{' '}
            or{' '}
            <a href="mailto:ben@thehoadleygroup.com" className="text-[var(--sf-gold)] hover:underline">
              ben@thehoadleygroup.com
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
