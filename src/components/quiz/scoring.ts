import { questions } from './questions'

export type Bucket = 'strong' | 'competitive' | 'at-risk' | 'critical'

export interface BucketMeta {
  id: Bucket
  label: string
  color: string
  bgClass: string
  textClass: string
  borderClass: string
  range: [number, number]
  headline: string
  summary: string
  primaryCta: string
  secondaryCta: string
  tertiaryCta: string
}

export const BUCKETS: Record<Bucket, BucketMeta> = {
  strong: {
    id: 'strong',
    label: 'STRONG POSITION',
    color: '#10B981',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-500',
    range: [80, 100],
    headline: "You're Winning. Here's How to Widen the Gap.",
    summary:
      "Your score puts you in the top 12% of STR hosts we've diagnosed. You're doing the hard things right: diversified distribution, direct bookings, dynamic pricing, and a real demand engine. The uncomfortable truth — your competitors are studying you. In 18 months, your moat narrows unless you keep building.",
    primaryCta: 'Get My Advanced Playbook',
    secondaryCta: 'Take the Free 7-Day Course',
    tertiaryCta: 'Show Me the SpokeBnB System',
  },
  competitive: {
    id: 'competitive',
    label: 'COMPETITIVE',
    color: '#3B82F6',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
    borderClass: 'border-blue-500',
    range: [60, 79],
    headline: "You're Profitable — But One Market Shift From Trouble.",
    summary:
      "Your score says you're doing a lot right. You're bringing in bookings, your ADR is defensible, and your operation runs. But we've flagged specific spokes where you're exposed — places where a sharper competitor would take your market share in the next 12-18 months. The gap between 'profitable' and 'dominant' is usually 3-4 specific moves.",
    primaryCta: 'Get My Full Personalized Report',
    secondaryCta: 'Take the Free 7-Day Course',
    tertiaryCta: 'Show Me the SpokeBnB System',
  },
  'at-risk': {
    id: 'at-risk',
    label: 'AT RISK',
    color: '#F59E0B',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-500',
    range: [40, 59],
    headline: 'Your Market Is Saturating. You Need a System — Not More Tips.',
    summary:
      "Your score reveals what you already feel: something is off. Bookings aren't what they were. ADR is flat or slipping. You're working harder for the same revenue. This isn't your fault — your market is saturating and the operators who built systems 18-24 months ago are now absorbing the demand you used to get. The good news: the playbook exists.",
    primaryCta: 'Get My Full Report + 7-Day Action Plan',
    secondaryCta: 'Take the Free 7-Day Course',
    tertiaryCta: 'Show Me the SpokeBnB System',
  },
  critical: {
    id: 'critical',
    label: 'CRITICAL',
    color: '#EF4444',
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
    borderClass: 'border-red-500',
    range: [0, 39],
    headline: "You're Losing Share Fast. Here's the Triage Plan.",
    summary:
      "We're going to be honest — this is the score we see right before a host decides to exit. Your bookings are down, your pricing is compressed, and the operational systems that would insulate you from the market shift haven't been built yet. We're not piling on. Every host we've worked with at this score has come back — but only if they actually run the system.",
    primaryCta: 'Get My Triage Report + 72-Hour Plan',
    secondaryCta: 'Book a Free 15-Min Diagnostic Call',
    tertiaryCta: 'Start the SpokeBnB System Now',
  },
}

/**
 * Calculate total score from answers map.
 * answers[questionId] holds either a single number (option index) for single-select
 * or number[] (option indices) for multi-select.
 */
export function calculateScore(answers: Record<number, number | number[]>): number {
  let total = 0

  for (const question of questions) {
    if (!question.scored) continue
    const answer = answers[question.id]
    if (answer === undefined) continue

    if (question.type === 'single') {
      const idx = answer as number
      const option = question.options[idx]
      if (option) total += option.value
    } else {
      // multi
      const indices = answer as number[]
      if (!Array.isArray(indices) || indices.length === 0) continue

      // Check override (e.g. "none of the above")
      const overrideIdx = question.options.findIndex(
        (o) => o.value === question.overrideOnSelection?.value,
      )
      if (overrideIdx !== -1 && indices.includes(overrideIdx)) {
        total += question.overrideOnSelection?.score ?? 0
        continue
      }

      let sum = 0
      for (const i of indices) {
        const option = question.options[i]
        if (option && option.value > 0) sum += option.value
      }
      if (question.maxScore !== undefined) sum = Math.min(sum, question.maxScore)
      total += sum
    }
  }

  return Math.min(Math.max(total, 0), 100)
}

export function bucketForScore(score: number): BucketMeta {
  if (score >= 80) return BUCKETS.strong
  if (score >= 60) return BUCKETS.competitive
  if (score >= 40) return BUCKETS['at-risk']
  return BUCKETS.critical
}

/** Get the selected option label(s) for a given question */
export function getAnswerLabel(
  questionId: number,
  answer: number | number[] | undefined,
): string {
  const question = questions.find((q) => q.id === questionId)
  if (!question || answer === undefined) return ''
  if (question.type === 'single') {
    const option = question.options[answer as number]
    return option?.label ?? ''
  }
  const indices = answer as number[]
  if (!Array.isArray(indices) || indices.length === 0) return 'None'
  return indices.map((i) => question.options[i]?.label).filter(Boolean).join(', ')
}

export function getAnswerTag(
  questionId: number,
  answer: number | number[] | undefined,
): string | undefined {
  const question = questions.find((q) => q.id === questionId)
  if (!question || answer === undefined) return undefined
  if (question.type === 'single') {
    return question.options[answer as number]?.tag
  }
  return undefined
}

export function getMultiSelectCount(
  questionId: number,
  answer: number | number[] | undefined,
): number {
  const question = questions.find((q) => q.id === questionId)
  if (!question || !Array.isArray(answer)) return 0
  const overrideIdx = question.options.findIndex(
    (o) => o.value === question.overrideOnSelection?.value,
  )
  if (overrideIdx !== -1 && answer.includes(overrideIdx)) return 0
  return answer.length
}

export interface Finding {
  title: string
  body: string
  tone: 'positive' | 'warning' | 'critical'
}

/**
 * Generate 3-5 personalized findings based on the answers + bucket.
 * Findings tie directly to the weakest / strongest spokes for that user.
 */
export function generateFindings(
  answers: Record<number, number | number[]>,
  bucket: Bucket,
): Finding[] {
  const findings: Finding[] = []

  const platformsTag = getAnswerTag(3, answers[3])
  const bookingTag = getAnswerTag(4, answers[4])
  const adrTag = getAnswerTag(5, answers[5])
  const occupancyTag = getAnswerTag(6, answers[6])
  const directTag = getAnswerTag(7, answers[7])
  const compTag = getAnswerTag(8, answers[8])
  const pricingTag = getAnswerTag(10, answers[10])
  const repeatTag = getAnswerTag(11, answers[11])
  const marketingCount = getMultiSelectCount(9, answers[9])

  // Q3 — Distribution
  if (platformsTag === 'single') {
    findings.push({
      title: 'Single-platform exposure',
      body: "You're on Airbnb alone. One algorithm change = one bad quarter. Hosts scoring 20+ points higher than you average 3.4 platforms. This is the fastest fix in the playbook.",
      tone: 'critical',
    })
  } else if (platformsTag === 'dual') {
    findings.push({
      title: 'Distribution is partial',
      body: "You're on Airbnb + Vrbo — better than most, but hosts scoring 80+ average 4+ platforms and a direct booking site. You're leaving 15-25% of potential demand on the table.",
      tone: 'warning',
    })
  } else if (platformsTag === 'diversified') {
    findings.push({
      title: 'Distribution is a competitive moat',
      body: "You're on 4+ platforms with a direct booking site. No single OTA can tank your year. This is one of the reasons your score is strong.",
      tone: 'positive',
    })
  } else if (platformsTag === 'unknown') {
    findings.push({
      title: 'You don\'t know your distribution footprint',
      body: "Your PMS handles listings — but not knowing where you are is the first risk. Audit your distribution this week: which platforms, which performance, which are bleeding commission.",
      tone: 'warning',
    })
  }

  // Q4 + Q5 — Death spiral
  if (
    (bookingTag === 'down-slight' || bookingTag === 'down-hard') &&
    (adrTag === 'down-slight' || adrTag === 'down-hard')
  ) {
    findings.push({
      title: 'Classic saturation death spiral',
      body: "Bookings down AND ADR down is the textbook saturation signal. You're discounting to fill — and competitors with systems are absorbing the demand you used to get. This requires immediate structural intervention, not marketing tweaks.",
      tone: 'critical',
    })
  } else if (bookingTag === 'down-hard') {
    findings.push({
      title: 'Your booking trend is the clearest red flag',
      body: "A 15%+ booking decline isn't a marketing problem — it's a systems problem. Lakeside Landing FLX grew 22% in the same kind of market. The playbook works, but only if you run it.",
      tone: 'critical',
    })
  } else if (bookingTag === 'up-strong' && adrTag === 'up-strong') {
    findings.push({
      title: 'You have real pricing power',
      body: "Growing bookings AND beating inflation on ADR — you're not a commodity in your market. Very few hosts pull this off. Now the question is how to widen the moat before competitors copy your moves.",
      tone: 'positive',
    })
  }

  // Q7 — Direct bookings
  if (directTag === '0' || directTag === '1-10') {
    findings.push({
      title: 'You\'re paying the full OTA tax',
      body: `At your direct booking rate, you're paying roughly $2,400-$4,800/unit/year in unnecessary OTA fees — and you have no insulation from Airbnb's algorithm. Building this channel is a top-3 priority.`,
      tone: 'critical',
    })
  } else if (directTag === '11-25') {
    findings.push({
      title: 'Direct bookings are started but under-built',
      body: "You've proven the channel works — now you need to push past 25%, which is the threshold where hosts become genuinely OTA-independent.",
      tone: 'warning',
    })
  } else if (directTag === '26-50' || directTag === '51+') {
    findings.push({
      title: 'Direct booking is a real asset',
      body: 'Your direct booking percentage is above the industry average of 12%. You\'ve already built the channel most hosts never will — that\'s a compounding competitive advantage.',
      tone: 'positive',
    })
  }

  // Q10 — Pricing
  if (pricingTag === 'static') {
    findings.push({
      title: 'Static pricing is costing you 20-30% of revenue',
      body: 'Setting prices once and rarely changing them is mathematically the single most expensive habit in STR. A dynamic pricing tool alone would likely raise your RevPAN 15-25% in 90 days.',
      tone: 'critical',
    })
  } else if (pricingTag === 'manual' || pricingTag === 'smart') {
    findings.push({
      title: 'Pricing is sub-optimized',
      body: 'Manual and Smart Pricing both leave 10-18% of revenue on the table in most markets. The fix — PriceLabs or Wheelhouse + a light overlay strategy — is the lowest-effort highest-leverage move in the course.',
      tone: 'warning',
    })
  } else if (pricingTag === 'dynamic-plus') {
    findings.push({
      title: 'Your pricing strategy is best-in-class',
      body: "Dynamic tool + your own override strategy is how top-12% hosts operate. You're capturing demand most hosts don't even know is there.",
      tone: 'positive',
    })
  }

  // Q9 — Marketing channels
  if (marketingCount === 0) {
    findings.push({
      title: 'Zero demand-generation outside the OTAs',
      body: "You're 100% dependent on Airbnb's algorithm for demand. When (not if) it changes, your revenue moves with it. Content, email, creators, and sponsors are the 4 spokes that fix this — and none of them require paid ads to start.",
      tone: 'critical',
    })
  } else if (marketingCount <= 2) {
    findings.push({
      title: 'Thin demand-generation surface',
      body: `You're active on ${marketingCount} marketing channel${marketingCount === 1 ? '' : 's'} — growth hosts average 4+. Each additional channel compounds your insulation from algorithm changes.`,
      tone: 'warning',
    })
  } else if (marketingCount >= 4) {
    findings.push({
      title: 'Your demand engine compounds',
      body: `Marketing consistently across ${marketingCount} channels means your demand doesn't rely on Airbnb's algorithm. This is what top-12% operators have in common.`,
      tone: 'positive',
    })
  }

  // Q11 — Repeat guests
  if (repeatTag === '0' || repeatTag === '1-5') {
    findings.push({
      title: 'No repeat-guest engine',
      body: "You're acquiring every booking from scratch. Repeat guests book more often, cancel less, and refer. Hosts at 16%+ repeat rate have a marketing channel their competitors can't copy.",
      tone: 'warning',
    })
  } else if (repeatTag === '16-30' || repeatTag === '31+') {
    findings.push({
      title: 'Repeat guests are doing compounding work',
      body: "Your repeat/referral rate is doing the work most hosts pay ads to replicate. This is one of the quietest moats in STR — keep building it.",
      tone: 'positive',
    })
  }

  // Q8 — Comp awareness
  if (compTag === 'none' || compTag === 'guess') {
    findings.push({
      title: 'No visibility into your comp set',
      body: "Hosts who don't know their competition get eaten by hosts who do. AirDNA and PriceLabs both surface this data — not using it is a choice that costs you.",
      tone: 'warning',
    })
  }

  // Q6 — Occupancy
  if (occupancyTag === 'very-low' || occupancyTag === 'low') {
    findings.push({
      title: 'Occupancy is below the structural threshold',
      body: 'Below 55% occupancy, the math stops working unless your ADR is exceptional. You\'re either mispriced, under-distributed, or under-marketed — usually all three.',
      tone: 'warning',
    })
  } else if (occupancyTag === 'very-high') {
    findings.push({
      title: 'You may be underpricing',
      body: 'Above 75% occupancy is usually a sign of underpricing — each additional point of occupancy above that should come with a corresponding ADR bump.',
      tone: 'warning',
    })
  }

  // Ensure at least 3 findings — backfill from bucket-generic
  if (findings.length < 3) {
    if (bucket === 'strong') {
      findings.push({
        title: 'Widen the gap before it closes',
        body: "Top-12% hosts don't stay there passively. The same moves that got you here are being copied. The advanced playbook focuses on what the top 1% do differently — proprietary audience, data moats, and sponsor revenue.",
        tone: 'positive',
      })
    } else if (bucket === 'critical') {
      findings.push({
        title: 'Triage before tactics',
        body: 'At your score, generic "optimize your title" advice is noise. The first 72 hours should be structural: distribution audit, dynamic pricing, and a direct booking landing page.',
        tone: 'critical',
      })
    } else {
      findings.push({
        title: 'You\'re one system away',
        body: 'Scores in your range almost always come down to 3-4 missing systems, not effort. The full report identifies exactly which spokes are yours.',
        tone: 'warning',
      })
    }
  }

  // Cap at 5 for readability
  return findings.slice(0, 5)
}

/**
 * Return the 3 highest-leverage next moves for this answer set.
 */
export function generateMoves(
  answers: Record<number, number | number[]>,
): { title: string; body: string }[] {
  const moves: { title: string; body: string }[] = []

  const platformsTag = getAnswerTag(3, answers[3])
  const directTag = getAnswerTag(7, answers[7])
  const pricingTag = getAnswerTag(10, answers[10])
  const repeatTag = getAnswerTag(11, answers[11])
  const marketingCount = getMultiSelectCount(9, answers[9])

  if (platformsTag === 'single' || platformsTag === 'dual' || platformsTag === 'unknown') {
    moves.push({
      title: 'Add 2 more booking channels this month',
      body: 'Pick the two highest-fit platforms for your property type (Vrbo + Furnished Finder, Hipcamp + Glamping Hub, etc.) and get listings live in 30 days. Each additional channel compounds.',
    })
  }

  if (pricingTag === 'static' || pricingTag === 'manual' || pricingTag === 'smart') {
    moves.push({
      title: 'Move to dynamic pricing this week',
      body: 'PriceLabs or Wheelhouse + a light seasonal override strategy typically lifts RevPAN 10-25% in 60-90 days. This is the highest-ROI fix you can make.',
    })
  }

  if (directTag === '0' || directTag === '1-10' || directTag === '11-25') {
    moves.push({
      title: 'Build a direct booking asset in 30 days',
      body: 'Lodgify or Hospitable direct site + email capture on every confirmation. Target 10% direct bookings in 90 days, 25%+ in year one.',
    })
  }

  if (marketingCount <= 2) {
    moves.push({
      title: 'Pick one demand channel and run it weekly',
      body: 'Email to past guests, one social platform, or one creator partnership. One channel run consistently beats three channels run occasionally.',
    })
  }

  if (repeatTag === '0' || repeatTag === '1-5') {
    moves.push({
      title: 'Launch a 3-email post-stay sequence',
      body: 'Thank-you, loyalty offer, anniversary reminder. A repeat-guest system is the cheapest marketing channel you will ever have.',
    })
  }

  // Cap at 3 — highest-priority moves
  if (moves.length === 0) {
    moves.push({
      title: 'Audit your weakest spoke quarterly',
      body: 'Top-12% hosts stay there by measuring. Which spoke did the least work for you last quarter? Fix that one before chasing new tactics.',
    })
  }

  return moves.slice(0, 3)
}
