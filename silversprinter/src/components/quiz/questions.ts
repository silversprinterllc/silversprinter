// Saturation Quiz question bank
// 11 scored questions + 1 optional segmentation question
// Scoring: sum answer scores across Q1-Q11, range 0-100 (Q9 caps at 10)

export type QuestionType = 'single' | 'multi'

export interface QuizOption {
  label: string
  value: number
  /** Short tag used for personalized finding generation */
  tag?: string
}

export interface QuizQuestion {
  id: number
  /** Internal label used when generating personalized findings */
  intent: string
  /** Short tag used by the scoring logic + finding bank */
  key:
    | 'propertyType'
    | 'units'
    | 'platforms'
    | 'bookingTrend'
    | 'adrTrend'
    | 'occupancy'
    | 'directBookings'
    | 'compAwareness'
    | 'marketingChannels'
    | 'pricingStrategy'
    | 'repeatGuests'
    | 'tenure'
  question: string
  helper?: string
  type: QuestionType
  /** Used when Q9 (multi) needs a cap */
  maxScore?: number
  /** For multi-select, check if "none" option overrides total */
  overrideOnSelection?: { value: number; score: number }
  scored: boolean
  options: QuizOption[]
}

export const questions: QuizQuestion[] = [
  {
    id: 1,
    key: 'propertyType',
    intent: 'Market classification + benchmark cohort assignment',
    question: 'What type of STR do you operate?',
    type: 'single',
    scored: true,
    options: [
      { label: 'Urban / downtown city rental', value: 7, tag: 'urban' },
      { label: 'Beach / coastal destination', value: 5, tag: 'beach' },
      { label: 'Lakefront / waterfront inland', value: 8, tag: 'lakefront' },
      { label: 'Mountain / ski / cabin', value: 7, tag: 'mountain' },
      { label: 'Suburban / residential', value: 4, tag: 'suburban' },
      { label: 'Rural / countryside / farm stay', value: 6, tag: 'rural' },
      { label: 'Unique stay (treehouse, dome, yurt, etc.)', value: 9, tag: 'unique' },
    ],
  },
  {
    id: 2,
    key: 'units',
    intent: 'Operator scale — determines which tier is relevant',
    question: 'How many STR units do you personally manage?',
    type: 'single',
    scored: true,
    options: [
      { label: '1 unit', value: 6, tag: '1' },
      { label: '2-3 units', value: 8, tag: '2-3' },
      { label: '4-10 units', value: 9, tag: '4-10' },
      { label: '11-25 units', value: 10, tag: '11-25' },
      { label: '26+ units', value: 10, tag: '26+' },
    ],
  },
  {
    id: 3,
    key: 'platforms',
    intent: 'Distribution diversification — the #1 spoke',
    question: 'How many booking platforms do you actively list on?',
    type: 'single',
    scored: true,
    options: [
      { label: 'Just Airbnb', value: 2, tag: 'single' },
      { label: 'Airbnb + Vrbo', value: 5, tag: 'dual' },
      {
        label: 'Airbnb + Vrbo + 1 niche platform (Hipcamp, Glamping Hub, Furnished Finder, etc.)',
        value: 7,
        tag: 'triple',
      },
      { label: '4+ platforms including a direct booking site', value: 10, tag: 'diversified' },
      { label: "I'm not sure / my PMS handles it", value: 4, tag: 'unknown' },
    ],
  },
  {
    id: 4,
    key: 'bookingTrend',
    intent: 'Revenue trajectory — leading indicator of saturation pain',
    question: 'Over the last 12 months, how has your booking volume trended?',
    type: 'single',
    scored: true,
    options: [
      { label: 'Up 10%+ vs prior year', value: 10, tag: 'up-strong' },
      { label: 'Up slightly (0-10%)', value: 8, tag: 'up-slight' },
      { label: 'Flat — about the same', value: 6, tag: 'flat' },
      { label: 'Down slightly (0-15%)', value: 3, tag: 'down-slight' },
      { label: 'Down significantly (15%+)', value: 1, tag: 'down-hard' },
      { label: "I don't track this", value: 2, tag: 'untracked' },
    ],
  },
  {
    id: 5,
    key: 'adrTrend',
    intent: 'Pricing power — can they raise rates or are they being squeezed?',
    question: 'And your Average Daily Rate (ADR) over the same period?',
    type: 'single',
    scored: true,
    options: [
      { label: 'Up 8%+ (beating inflation)', value: 10, tag: 'up-strong' },
      { label: 'Up 0-8%', value: 7, tag: 'up-slight' },
      { label: 'Flat', value: 5, tag: 'flat' },
      { label: 'Down 0-10%', value: 2, tag: 'down-slight' },
      { label: 'Down 10%+ (discounting to fill)', value: 0, tag: 'down-hard' },
      { label: "I don't know my ADR", value: 2, tag: 'untracked' },
    ],
  },
  {
    id: 6,
    key: 'occupancy',
    intent: 'Performance benchmark — AirDNA median is ~57% nationally',
    question: 'What is your current occupancy rate (trailing 12 months)?',
    helper: 'National median is around 57%. Sweet spot: 65-75%.',
    type: 'single',
    scored: true,
    options: [
      { label: '0-40%', value: 2, tag: 'very-low' },
      { label: '41-55%', value: 5, tag: 'low' },
      { label: '56-65% (benchmark band)', value: 7, tag: 'mid' },
      { label: '66-75%', value: 9, tag: 'high' },
      { label: '76-100%', value: 10, tag: 'very-high' },
      { label: "I don't know", value: 3, tag: 'untracked' },
    ],
  },
  {
    id: 7,
    key: 'directBookings',
    intent: 'Platform-dependency risk — the #2 spoke',
    question: 'What percentage of bookings come from direct channels (your own website, repeat guests, referrals)?',
    type: 'single',
    scored: true,
    options: [
      { label: '0% (100% OTA-dependent)', value: 1, tag: '0' },
      { label: '1-10%', value: 4, tag: '1-10' },
      { label: '11-25%', value: 7, tag: '11-25' },
      { label: '26-50%', value: 9, tag: '26-50' },
      { label: '51%+ (majority direct)', value: 10, tag: '51+' },
    ],
  },
  {
    id: 8,
    key: 'compAwareness',
    intent: 'Market awareness — proxy for operational sophistication',
    question: 'Do you know how many comparable STRs operate within 5 miles of your property?',
    type: 'single',
    scored: true,
    options: [
      { label: 'Yes, I track this monthly', value: 10, tag: 'tracked' },
      { label: 'I checked once, roughly know', value: 6, tag: 'rough' },
      { label: 'No, but I could guess', value: 3, tag: 'guess' },
      { label: 'No idea', value: 1, tag: 'none' },
    ],
  },
  {
    id: 9,
    key: 'marketingChannels',
    intent: 'Demand-generation capacity — content, creator, sponsor spokes',
    question: 'Which marketing activities do you do CONSISTENTLY (at least monthly)?',
    helper: 'Select all that apply.',
    type: 'multi',
    scored: true,
    maxScore: 10,
    overrideOnSelection: { value: -1, score: 0 },
    options: [
      { label: 'Post on Instagram/TikTok/Reels', value: 2, tag: 'social' },
      { label: 'Email marketing to past guests', value: 3, tag: 'email' },
      { label: 'Blog or SEO content', value: 2, tag: 'seo' },
      { label: 'Partner with creators/influencers', value: 3, tag: 'creators' },
      { label: 'Run paid ads (Meta/Google)', value: 2, tag: 'ads' },
      { label: 'Local business partnerships / sponsors', value: 3, tag: 'sponsors' },
      { label: 'None of the above', value: -1, tag: 'none' },
    ],
  },
  {
    id: 10,
    key: 'pricingStrategy',
    intent: 'Pricing sophistication — the #3 spoke',
    question: 'How do you set your nightly prices?',
    type: 'single',
    scored: true,
    options: [
      { label: 'I set them once and rarely change them', value: 1, tag: 'static' },
      { label: 'I adjust manually for weekends/holidays', value: 4, tag: 'manual' },
      { label: "I use Airbnb's Smart Pricing", value: 3, tag: 'smart' },
      {
        label: 'I use a dynamic pricing tool (PriceLabs, Wheelhouse, Beyond)',
        value: 8,
        tag: 'dynamic',
      },
      {
        label: 'I use a dynamic tool AND override with my own strategy',
        value: 10,
        tag: 'dynamic-plus',
      },
    ],
  },
  {
    id: 11,
    key: 'repeatGuests',
    intent: 'Guest network / retention — the #7 spoke',
    question: 'What percentage of your bookings are from REPEAT guests or referrals?',
    type: 'single',
    scored: true,
    options: [
      { label: '0% — all new guests every time', value: 2, tag: '0' },
      { label: '1-5%', value: 4, tag: '1-5' },
      { label: '6-15%', value: 7, tag: '6-15' },
      { label: '16-30%', value: 9, tag: '16-30' },
      { label: '31%+', value: 10, tag: '31+' },
      { label: "I don't track this", value: 3, tag: 'untracked' },
    ],
  },
  {
    id: 12,
    key: 'tenure',
    intent: 'Segmentation for email sequence — NOT scored',
    question: 'How long have you been hosting?',
    helper: 'Optional — helps personalize your report. Not part of your score.',
    type: 'single',
    scored: false,
    options: [
      { label: 'Less than 1 year', value: 0, tag: 'new' },
      { label: '1-2 years', value: 0, tag: 'mid-new' },
      { label: '3-5 years', value: 0, tag: 'mid-veteran' },
      { label: '6+ years', value: 0, tag: 'veteran' },
    ],
  },
]

export const TOTAL_SCORED_QUESTIONS = questions.filter((q) => q.scored).length
