'use client'

import { useEffect, useState, useMemo, FormEvent } from 'react'
import {
  bucketForScore,
  generateFindings,
  generateMoves,
  BucketMeta,
} from './scoring'

interface Props {
  score: number
  answers: Record<number, number | number[]>
  onRestart: () => void
}

const BRAND = '{{BRAND_NAME}}'

function substituteBrand(text: string): string {
  return text.replace(/\{\{BRAND_NAME\}\}/g, BRAND)
}

/** Animated SVG gauge showing score out of 100 */
function ScoreGauge({ score, bucket }: { score: number; bucket: BucketMeta }) {
  const [displayScore, setDisplayScore] = useState(0)
  const size = 220
  const strokeWidth = 18
  const radius = (size - strokeWidth) / 2
  const circumference = Math.PI * radius // half circle
  const progress = (displayScore / 100) * circumference

  useEffect(() => {
    // Animate score counting up
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setDisplayScore(Math.round(score * eased))
      if (elapsed < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [score])

  return (
    <div
      className="relative"
      style={{ width: size, height: size / 2 + 32 }}
      role="img"
      aria-label={`Your saturation risk score is ${score} out of 100`}
    >
      <svg
        width={size}
        height={size / 2 + strokeWidth}
        viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}
        className="overflow-visible"
      >
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={bucket.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: 'stroke-dashoffset 50ms linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
        <div className="text-5xl font-bold text-[var(--sf-navy)] font-[var(--font-display)] leading-none">
          {displayScore}
        </div>
        <div className="text-sm text-[var(--sf-navy)]/50 mt-1">of 100</div>
      </div>
    </div>
  )
}

/** Icon that matches the bucket */
function BucketIcon({ bucket }: { bucket: BucketMeta }) {
  if (bucket.id === 'strong') {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  }
  if (bucket.id === 'competitive') {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
  if (bucket.id === 'at-risk') {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  }
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function FindingToneIcon({ tone }: { tone: 'positive' | 'warning' | 'critical' }) {
  if (tone === 'positive') {
    return (
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    )
  }
  if (tone === 'warning') {
    return (
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </span>
    )
  }
  return (
    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  )
}

export default function QuizResult({ score, answers, onRestart }: Props) {
  const bucket = useMemo(() => bucketForScore(score), [score])
  const findings = useMemo(() => generateFindings(answers, bucket.id), [answers, bucket.id])
  const moves = useMemo(() => generateMoves(answers), [answers])

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const trimmed = email.trim()
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    // Hook for future CRM/Kit integration
    console.log('[SaturationQuiz] Report requested', {
      email: trimmed,
      name: name.trim() || undefined,
      location: location.trim() || undefined,
      score,
      bucket: bucket.id,
      answers,
      timestamp: new Date().toISOString(),
    })
    setSubmitted(true)
  }

  return (
    <div className="animate-[fade-in_0.5s_ease-out]">
      {/* Score hero */}
      <div className="text-center mb-10">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 ${bucket.bgClass} ${bucket.textClass}`}
        >
          <BucketIcon bucket={bucket} />
          {bucket.label}
        </div>

        <div className="flex justify-center mb-2">
          <ScoreGauge score={score} bucket={bucket} />
        </div>

        <p className="text-[var(--sf-navy)]/60 text-sm uppercase tracking-widest mt-4">
          Your Saturation Risk Score
        </p>

        <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--sf-navy)] mt-6 mb-4 max-w-3xl mx-auto leading-tight">
          {substituteBrand(bucket.headline)}
        </h2>
        <p className="text-base sm:text-lg text-[var(--sf-navy)]/70 max-w-2xl mx-auto leading-relaxed">
          {substituteBrand(bucket.summary)}
        </p>
      </div>

      {/* Findings */}
      <div className="mb-10">
        <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--sf-navy)] mb-6 text-center">
          Here's What We Found
        </h3>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {findings.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[var(--sf-navy)]/5 shadow-sm flex gap-4"
            >
              <FindingToneIcon tone={f.tone} />
              <div>
                <h4 className="font-semibold text-[var(--sf-navy)] mb-1">{f.title}</h4>
                <p className="text-sm text-[var(--sf-navy)]/70 leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Moves */}
      <div className="mb-10">
        <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--sf-navy)] mb-6 text-center">
          The {moves.length} Moves That Would Raise Your Score
        </h3>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {moves.map((move, i) => (
            <div
              key={i}
              className="bg-[var(--sf-navy)]/[0.03] rounded-2xl p-5 sm:p-6 border border-[var(--sf-navy)]/5 flex gap-4"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--sf-gold)] text-white font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h4 className="font-semibold text-[var(--sf-navy)] mb-1">{move.title}</h4>
                <p className="text-sm text-[var(--sf-navy)]/70 leading-relaxed">{move.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email capture */}
      <div className="max-w-2xl mx-auto mb-10">
        {submitted ? (
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-[var(--font-display)] text-2xl font-bold text-[var(--sf-navy)] mb-2">
              Report on its way.
            </h3>
            <p className="text-[var(--sf-navy)]/70">
              Your personalized 12-page report will hit{' '}
              <span className="font-semibold">{email}</span> in the next 2 minutes. Check your spam folder if you don't see it.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-[var(--sf-navy)] to-[#0f1a2e] rounded-2xl p-6 sm:p-10 shadow-xl"
          >
            <div className="text-center mb-6">
              <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white mb-3">
                {substituteBrand(bucket.primaryCta)}
              </h3>
              <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto">
                We'll email you a 12-page personalized PDF with your full diagnosis, benchmarks vs hosts in your market type, and a day-by-day action plan.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="quiz-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="quiz-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--sf-gold)] focus:border-transparent"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="quiz-name" className="sr-only">
                    First name (optional)
                  </label>
                  <input
                    id="quiz-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name (optional)"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--sf-gold)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="quiz-location" className="sr-only">
                    Property location (optional)
                  </label>
                  <input
                    id="quiz-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Property location (optional)"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--sf-gold)] focus:border-transparent"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-300 text-sm" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[var(--sf-gold)] text-white px-6 py-4 rounded-xl text-base font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-xl hover:shadow-[var(--sf-gold)]/20 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Send Me My Full Report
                <svg className="inline w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <p className="text-white/50 text-xs text-center">
                No spam. Unsubscribe any time. We use your answers to personalize — we never share your data.
              </p>
            </div>
          </form>
        )}
      </div>

      {/* Secondary & Tertiary CTAs */}
      <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-3 mb-10">
        <a
          href="#free-course"
          className="inline-flex items-center justify-center border-2 border-[var(--sf-navy)]/20 text-[var(--sf-navy)] px-5 py-3.5 rounded-xl text-sm font-semibold hover:border-[var(--sf-navy)]/40 hover:bg-[var(--sf-navy)]/5 transition-all text-center"
        >
          {substituteBrand(bucket.secondaryCta)}
        </a>
        <a
          href="/course"
          className="inline-flex items-center justify-center bg-[var(--sf-navy)] text-white px-5 py-3.5 rounded-xl text-sm font-semibold hover:bg-[var(--sf-navy)]/90 transition-all text-center"
        >
          {substituteBrand(bucket.tertiaryCta)}
        </a>
      </div>

      {/* Social proof */}
      <div className="max-w-3xl mx-auto">
        <figure className="bg-[var(--sf-gold)]/5 border border-[var(--sf-gold)]/20 rounded-2xl p-6 sm:p-8">
          <svg className="w-8 h-8 text-[var(--sf-gold)] mb-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
          <blockquote className="text-lg text-[var(--sf-navy)] leading-relaxed mb-4">
            I scored 47 on this quiz. Eight months later I was at 81 and had grown revenue 41%. The diagnostic was the first time someone actually told me WHAT was broken.
          </blockquote>
          <figcaption className="text-sm text-[var(--sf-navy)]/60">
            — Jana M., 4-unit lakefront operator
          </figcaption>
        </figure>
      </div>

      {/* Retake */}
      <div className="text-center mt-10">
        <button
          onClick={onRestart}
          className="text-sm text-[var(--sf-navy)]/50 hover:text-[var(--sf-navy)] underline underline-offset-4"
        >
          Retake the quiz
        </button>
      </div>
    </div>
  )
}
