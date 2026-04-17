'use client'

import { useEffect, useState, useRef } from 'react'
import { questions } from './questions'
import { calculateScore } from './scoring'
import QuizResult from './QuizResult'

type Answer = number | number[]
type AnswersMap = Record<number, Answer>

type Stage = 'intro' | 'quiz' | 'calculating' | 'result'

export default function SaturationQuiz() {
  const [stage, setStage] = useState<Stage>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswersMap>({})
  const [score, setScore] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const quizRef = useRef<HTMLDivElement>(null)
  const question = questions[currentIndex]
  const totalQuestions = questions.length
  const progress = ((currentIndex + 1) / totalQuestions) * 100

  // Scroll top on stage change
  useEffect(() => {
    if (stage === 'quiz' || stage === 'result' || stage === 'calculating') {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [stage, currentIndex])

  function startQuiz() {
    setAnswers({})
    setCurrentIndex(0)
    setStage('quiz')
  }

  function restartQuiz() {
    setAnswers({})
    setCurrentIndex(0)
    setScore(0)
    setStage('intro')
  }

  function goBack() {
    if (currentIndex === 0) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(currentIndex - 1)
      setTransitioning(false)
    }, 180)
  }

  function goNext() {
    if (question.scored && !hasAnswer(question, answers)) return
    setTransitioning(true)
    setTimeout(() => {
      if (currentIndex === totalQuestions - 1) {
        // Finish: calculate + reveal
        setStage('calculating')
        const finalScore = calculateScore(answers)
        setScore(finalScore)
        setTimeout(() => {
          setStage('result')
        }, 2500)
      } else {
        setCurrentIndex(currentIndex + 1)
      }
      setTransitioning(false)
    }, 180)
  }

  function selectSingle(optionIdx: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIdx }))
  }

  function toggleMulti(optionIdx: number) {
    setAnswers((prev) => {
      const existing = (prev[question.id] as number[] | undefined) ?? []
      const noneIdx = question.options.findIndex(
        (o) => o.value === question.overrideOnSelection?.value,
      )

      if (optionIdx === noneIdx) {
        // Selecting "none" clears everything else
        if (existing.includes(noneIdx)) {
          return { ...prev, [question.id]: [] }
        }
        return { ...prev, [question.id]: [noneIdx] }
      }

      // Regular option: if "none" was selected, remove it
      let next = existing.filter((i) => i !== noneIdx)
      if (next.includes(optionIdx)) {
        next = next.filter((i) => i !== optionIdx)
      } else {
        next = [...next, optionIdx]
      }
      return { ...prev, [question.id]: next }
    })
  }

  function hasAnswer(q: typeof questions[number], a: AnswersMap): boolean {
    const val = a[q.id]
    if (val === undefined) return false
    if (q.type === 'multi') {
      return Array.isArray(val) && val.length > 0
    }
    return typeof val === 'number'
  }

  function isSelected(optionIdx: number): boolean {
    const val = answers[question.id]
    if (val === undefined) return false
    if (question.type === 'multi') {
      return Array.isArray(val) && val.includes(optionIdx)
    }
    return val === optionIdx
  }

  // Keyboard navigation
  function onOptionKeyDown(e: React.KeyboardEvent, optionIdx: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (question.type === 'multi') {
        toggleMulti(optionIdx)
      } else {
        selectSingle(optionIdx)
      }
    }
  }

  return (
    <div ref={quizRef} className="relative">
      {stage === 'intro' && <Intro onStart={startQuiz} />}

      {stage === 'quiz' && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2 text-sm text-[var(--sf-navy)]/60">
              <span className="font-medium">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-[var(--sf-navy)]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--sf-gold)] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div
            className={`transition-all duration-200 ${
              transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--sf-navy)] mb-3 leading-tight">
              {question.question}
            </h2>
            {question.helper && (
              <p className="text-[var(--sf-navy)]/60 text-sm sm:text-base mb-6">
                {question.helper}
              </p>
            )}
            {!question.scored && (
              <p className="inline-block bg-[var(--sf-navy)]/5 text-[var(--sf-navy)]/60 text-xs font-medium px-3 py-1 rounded-full mb-6">
                Optional — not scored
              </p>
            )}

            {/* Options */}
            <div
              className="grid gap-3 sm:grid-cols-2"
              role={question.type === 'multi' ? 'group' : 'radiogroup'}
              aria-label={question.question}
            >
              {question.options.map((option, idx) => {
                const selected = isSelected(idx)
                return (
                  <button
                    key={idx}
                    type="button"
                    role={question.type === 'multi' ? 'checkbox' : 'radio'}
                    aria-checked={selected}
                    onClick={() =>
                      question.type === 'multi' ? toggleMulti(idx) : selectSingle(idx)
                    }
                    onKeyDown={(e) => onOptionKeyDown(e, idx)}
                    className={`group relative text-left px-5 py-4 rounded-xl border-2 transition-all min-h-[56px] flex items-center gap-3 ${
                      selected
                        ? 'border-[var(--sf-gold)] bg-[var(--sf-gold)]/10 shadow-md'
                        : 'border-[var(--sf-navy)]/10 bg-white hover:border-[var(--sf-navy)]/30 hover:shadow-sm'
                    } focus:outline-none focus:ring-2 focus:ring-[var(--sf-gold)] focus:ring-offset-2`}
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 ${question.type === 'multi' ? 'rounded-md' : 'rounded-full'} border-2 flex items-center justify-center transition-colors ${
                        selected
                          ? 'border-[var(--sf-gold)] bg-[var(--sf-gold)]'
                          : 'border-[var(--sf-navy)]/30 bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {selected && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={question.type === 'multi' ? 'M5 13l4 4L19 7' : 'M5 13l4 4L19 7'} />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`text-sm sm:text-base font-medium ${
                        selected ? 'text-[var(--sf-navy)]' : 'text-[var(--sf-navy)]/80'
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={goBack}
                disabled={currentIndex === 0}
                className={`inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  currentIndex === 0
                    ? 'text-[var(--sf-navy)]/30 cursor-not-allowed'
                    : 'text-[var(--sf-navy)]/70 hover:text-[var(--sf-navy)] hover:bg-[var(--sf-navy)]/5'
                }`}
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={!hasAnswer(question, answers) && question.scored}
                className={`inline-flex items-center px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all min-h-[48px] ${
                  hasAnswer(question, answers) || !question.scored
                    ? 'bg-[var(--sf-gold)] text-white hover:bg-[var(--sf-gold)]/90 hover:shadow-xl hover:shadow-[var(--sf-gold)]/20 hover:-translate-y-0.5 active:scale-[0.98]'
                    : 'bg-[var(--sf-navy)]/10 text-[var(--sf-navy)]/40 cursor-not-allowed'
                }`}
              >
                {currentIndex === totalQuestions - 1
                  ? 'See My Score'
                  : !question.scored && !hasAnswer(question, answers)
                    ? 'Skip'
                    : 'Next Question'}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === 'calculating' && <Calculating />}

      {stage === 'result' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <QuizResult score={score} answers={answers} onRestart={restartQuiz} />
        </div>
      )}
    </div>
  )
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden sf-navy-gradient min-h-[80vh] flex items-center pt-20 lg:pt-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(212,160,23,0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="absolute top-1/4 right-1/4 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[var(--sf-gold)]/5 rounded-full blur-[80px] lg:blur-[120px]" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--sf-gold)] animate-pulse" />
          <span className="text-white/70 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
            Free 60-Second Diagnostic
          </span>
        </div>

        <h1 className="font-[var(--font-display)] text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
          Is Your STR Market
          <br />
          <span className="sf-gold-gradient">About to Saturate?</span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
          Find out in 60 seconds. Get a personalized report with the 3 things you can fix this week — no fluff, no generic tips, just your numbers.
        </p>

        <button
          onClick={onStart}
          className="inline-flex items-center justify-center bg-[var(--sf-gold)] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-2xl hover:shadow-[var(--sf-gold)]/30 hover:-translate-y-0.5 active:scale-[0.98] min-h-[56px]"
        >
          Start Quiz — Get My Score
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Trust signals */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto text-center">
          {[
            { value: '6,000+', label: 'STR hosts' },
            { value: '11', label: 'Questions' },
            { value: '60s', label: 'To complete' },
            { value: 'Free', label: 'No card required' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-xl sm:text-2xl font-bold text-[var(--sf-gold)]">{stat.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Calculating() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-[var(--sf-gold)]/20 border-t-[var(--sf-gold)] animate-spin mb-8" aria-hidden="true" />
      <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--sf-navy)] mb-3">
        Calculating your saturation risk...
      </h2>
      <p className="text-[var(--sf-navy)]/60">
        Scoring your answers across the 8 spokes. This takes a few seconds.
      </p>
    </div>
  )
}
