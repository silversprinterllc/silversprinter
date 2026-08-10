'use client'

import { useState } from 'react'

/* ── Types ── */
interface PropertyData {
  address: string
  city: string
  state: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  sqft: number
}

interface DealCheckData {
  purchasePrice: number
  afterRepairValue: number
  closingCosts: number
  rehabCosts: number
  downPaymentPercent: number
  interestRate: number
  loanTerm: number
  propertyTax: number
  insurance: number
  hoa: number
  propertyManagement: number
  maintenance: number
  utilities: number
  otherExpenses: number
}

interface AirDNAData {
  projectedAnnualRevenue: number
  averageDailyRate: number
  occupancyRate: number
  revpar: number
  marketAvgOccupancy: number
  marketAvgADR: number
  marketAvgRevPAR: number
  marketTop25ADR: number
  marketTop25Occupancy: number
  compCount: number
  supplyGrowth: number
  cleaningFee: number
  peakSeasonMonths: string
  lowSeasonMonths: string
}

interface AnalysisResult {
  score: 'Strong Buy' | 'Buy' | 'Hold' | 'Pass'
  scoreColor: string
  revenuePerNight: number
  revenuePerNightTarget: number
  revenueGap: number
  revenueAfterSystem: number
  noi: number
  monthlyCashFlow: number
  annualCashFlow: number
  capRate: number
  cashOnCash: number
  dscr: number
  totalCashNeeded: number
  monthlyMortgage: number
  annualExpenses: number
  commissionSavings: number
  projectedDirectBookingRevenue: number
  breakEvenMonths: number
  fiveYearEquity: number
  strengths: string[]
  risks: string[]
  recommendation: string
}

/* ── Analysis Engine ── */
function runAnalysis(
  property: PropertyData,
  deal: DealCheckData,
  airbnb: AirDNAData
): AnalysisResult {
  // Loan calculations
  const loanAmount = deal.purchasePrice * (1 - deal.downPaymentPercent / 100)
  const monthlyRate = deal.interestRate / 100 / 12
  const numPayments = deal.loanTerm * 12
  const monthlyMortgage =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments

  const totalCashNeeded =
    deal.purchasePrice * (deal.downPaymentPercent / 100) +
    deal.closingCosts +
    deal.rehabCosts

  // Annual expenses
  const annualExpenses =
    (deal.propertyTax +
      deal.insurance +
      deal.hoa +
      deal.propertyManagement +
      deal.maintenance +
      deal.utilities +
      deal.otherExpenses) *
    12

  // Revenue metrics
  const grossRevenue = airbnb.projectedAnnualRevenue
  const noi = grossRevenue - annualExpenses
  const annualDebtService = monthlyMortgage * 12
  const annualCashFlow = noi - annualDebtService
  const monthlyCashFlow = annualCashFlow / 12

  // Return metrics
  const capRate = deal.purchasePrice > 0 ? (noi / deal.purchasePrice) * 100 : 0
  const cashOnCash =
    totalCashNeeded > 0 ? (annualCashFlow / totalCashNeeded) * 100 : 0
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0

  // Revenue Per Night
  const availableNights = 365
  const revenuePerNight = grossRevenue / availableNights
  const marketTop25RevPAR = airbnb.marketTop25ADR * (airbnb.marketTop25Occupancy / 100)
  const revenuePerNightTarget = marketTop25RevPAR
  const revenueGap = (revenuePerNightTarget - revenuePerNight) * availableNights

  // Hub-and-Spoke projections
  const pricingUplift = grossRevenue * 0.18 // 15-20% from dynamic pricing
  const directBookingSavings = grossRevenue * 0.3 * 0.15 // 30% direct x 15% commission saved
  const retentionRevenue = grossRevenue * 0.08 // 8% from repeat guests
  const experienceRevenue = airbnb.occupancyRate / 100 * 365 * 8 // $8/guest from Viator
  const revenueAfterSystem =
    grossRevenue + pricingUplift + directBookingSavings + retentionRevenue + experienceRevenue
  const commissionSavings = directBookingSavings
  const projectedDirectBookingRevenue = grossRevenue * 0.3

  // Break-even
  const breakEvenMonths =
    monthlyCashFlow > 0
      ? Math.ceil(totalCashNeeded / monthlyCashFlow)
      : 999

  // 5-year equity (simple appreciation + principal paydown)
  const appreciationRate = 0.03
  const fiveYearValue = deal.afterRepairValue > 0
    ? deal.afterRepairValue * Math.pow(1 + appreciationRate, 5)
    : deal.purchasePrice * Math.pow(1 + appreciationRate, 5)
  const fiveYearLoanBalance = loanAmount * Math.pow(1 + monthlyRate, 60) -
    (monthlyMortgage * (Math.pow(1 + monthlyRate, 60) - 1)) / monthlyRate
  const fiveYearEquity = fiveYearValue - Math.max(fiveYearLoanBalance, 0)

  // Scoring
  const strengths: string[] = []
  const risks: string[] = []

  if (capRate >= 8) strengths.push('Strong cap rate (' + capRate.toFixed(1) + '%) — above 8% threshold')
  else if (capRate >= 6) strengths.push('Solid cap rate (' + capRate.toFixed(1) + '%) — above 6% threshold')
  else risks.push('Low cap rate (' + capRate.toFixed(1) + '%) — below 6% target')

  if (cashOnCash >= 12) strengths.push('Excellent cash-on-cash return (' + cashOnCash.toFixed(1) + '%)')
  else if (cashOnCash >= 8) strengths.push('Good cash-on-cash return (' + cashOnCash.toFixed(1) + '%)')
  else if (cashOnCash > 0) risks.push('Low cash-on-cash return (' + cashOnCash.toFixed(1) + '%) — below 8% target')
  else risks.push('Negative cash flow — this property loses money monthly')

  if (dscr >= 1.25) strengths.push('Strong debt service coverage (' + dscr.toFixed(2) + 'x)')
  else if (dscr >= 1.0) risks.push('Thin DSCR (' + dscr.toFixed(2) + 'x) — minimal margin above breakeven')
  else risks.push('DSCR below 1.0 (' + dscr.toFixed(2) + 'x) — income does not cover debt')

  if (airbnb.occupancyRate >= airbnb.marketAvgOccupancy) {
    strengths.push('Occupancy above market average (' + airbnb.occupancyRate + '% vs ' + airbnb.marketAvgOccupancy + '%)')
  } else {
    risks.push('Occupancy below market average (' + airbnb.occupancyRate + '% vs ' + airbnb.marketAvgOccupancy + '%) — room for optimization')
  }

  if (airbnb.averageDailyRate >= airbnb.marketAvgADR) {
    strengths.push('ADR above market average ($' + airbnb.averageDailyRate + ' vs $' + airbnb.marketAvgADR + ')')
  } else {
    risks.push('ADR below market average ($' + airbnb.averageDailyRate + ' vs $' + airbnb.marketAvgADR + ') — pricing optimization needed')
  }

  if (airbnb.supplyGrowth > 10) risks.push('High supply growth (' + airbnb.supplyGrowth + '%) — increasing competition')
  else if (airbnb.supplyGrowth > 5) risks.push('Moderate supply growth (' + airbnb.supplyGrowth + '%) — monitor competition')
  else strengths.push('Low supply growth (' + airbnb.supplyGrowth + '%) — limited new competition')

  if (airbnb.compCount >= 20) strengths.push('Strong comp set (' + airbnb.compCount + ' comparables) — reliable revenue estimate')
  else if (airbnb.compCount >= 10) { /* neutral */ }
  else risks.push('Small comp set (' + airbnb.compCount + ' comparables) — revenue estimate less reliable')

  const revenueUpliftPercent = ((revenueAfterSystem - grossRevenue) / grossRevenue) * 100
  strengths.push('Hub-and-Spoke projected uplift: +' + revenueUpliftPercent.toFixed(0) + '% ($' + (revenueAfterSystem - grossRevenue).toLocaleString() + '/year)')

  // Score
  let scorePoints = 0
  if (capRate >= 6) scorePoints += 2
  if (capRate >= 8) scorePoints += 1
  if (cashOnCash >= 8) scorePoints += 2
  if (cashOnCash >= 12) scorePoints += 1
  if (dscr >= 1.25) scorePoints += 2
  if (dscr >= 1.0 && dscr < 1.25) scorePoints += 1
  if (airbnb.occupancyRate >= airbnb.marketAvgOccupancy) scorePoints += 1
  if (airbnb.averageDailyRate >= airbnb.marketAvgADR) scorePoints += 1
  if (airbnb.supplyGrowth <= 5) scorePoints += 1
  if (monthlyCashFlow > 0) scorePoints += 2

  let score: AnalysisResult['score']
  let scoreColor: string
  let recommendation: string

  if (scorePoints >= 10) {
    score = 'Strong Buy'
    scoreColor = 'text-emerald-600'
    recommendation = 'This property checks every major box — strong returns, healthy cash flow, and favorable market dynamics. The Hub-and-Spoke system would further amplify revenue by an estimated ' + revenueUpliftPercent.toFixed(0) + '%. Recommend moving quickly — properties with these fundamentals don\'t stay on the market long.'
  } else if (scorePoints >= 7) {
    score = 'Buy'
    scoreColor = 'text-blue-600'
    recommendation = 'Solid fundamentals with room for optimization. The Hub-and-Spoke system addresses the identified gaps — particularly ' + (airbnb.averageDailyRate < airbnb.marketAvgADR ? 'ADR through dynamic pricing' : 'occupancy through multi-channel distribution') + '. With the system implemented, projected returns improve significantly. Worth pursuing if acquisition terms are favorable.'
  } else if (scorePoints >= 4) {
    score = 'Hold'
    scoreColor = 'text-amber-600'
    recommendation = 'Mixed signals. The property has potential but carries notable risks. Before acquiring, address: ' + risks.slice(0, 2).join('; ') + '. Consider negotiating a lower purchase price or structuring creative financing to improve returns. The Hub-and-Spoke system helps but can\'t fix fundamentally weak economics.'
  } else {
    score = 'Pass'
    scoreColor = 'text-red-600'
    recommendation = 'The numbers don\'t work at this purchase price. Key concerns: ' + risks.slice(0, 3).join('; ') + '. Unless the seller drops the price significantly or you identify a value-add angle that the data doesn\'t capture, recommend passing on this property.'
  }

  return {
    score, scoreColor, revenuePerNight, revenuePerNightTarget, revenueGap,
    revenueAfterSystem, noi, monthlyCashFlow, annualCashFlow, capRate,
    cashOnCash, dscr, totalCashNeeded, monthlyMortgage, annualExpenses,
    commissionSavings, projectedDirectBookingRevenue, breakEvenMonths,
    fiveYearEquity, strengths, risks, recommendation,
  }
}

/* ── Formatting helpers ── */
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtPct = (n: number) => n.toFixed(1) + '%'

/* ── Form Field Component ── */
function Field({
  label, name, type = 'number', value, onChange, prefix, suffix, hint,
}: {
  label: string; name: string; type?: string; value: string | number;
  onChange: (name: string, value: string) => void;
  prefix?: string; suffix?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--sf-navy)]/60 mb-1">{label}</label>
      <div className="flex items-center">
        {prefix && <span className="text-sm text-[var(--sf-navy)]/40 mr-1">{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="w-full bg-white border border-[var(--sf-navy)]/10 rounded-lg px-3 py-2.5 text-sm text-[var(--sf-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--sf-gold)]/30 focus:border-[var(--sf-gold)]"
        />
        {suffix && <span className="text-sm text-[var(--sf-navy)]/40 ml-1">{suffix}</span>}
      </div>
      {hint && <p className="text-[10px] text-[var(--sf-navy)]/30 mt-0.5">{hint}</p>}
    </div>
  )
}

/* ── Metric Card ── */
function MetricCard({ label, value, sub, good }: { label: string; value: string; sub?: string; good?: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-[var(--sf-navy)]/5 p-4">
      <div className="text-xs text-[var(--sf-navy)]/40 mb-1">{label}</div>
      <div className={`text-xl sm:text-2xl font-bold ${good === true ? 'text-emerald-600' : good === false ? 'text-red-500' : 'text-[var(--sf-navy)]'}`}>
        {value}
      </div>
      {sub && <div className="text-[10px] text-[var(--sf-navy)]/30 mt-0.5">{sub}</div>}
    </div>
  )
}

/* ── Main Page ── */
export default function DealAnalysisPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const [property, setProperty] = useState<PropertyData>({
    address: '', city: '', state: '', propertyType: 'Single Family',
    bedrooms: 3, bathrooms: 2, sqft: 1800,
  })

  const [deal, setDeal] = useState<DealCheckData>({
    purchasePrice: 450000, afterRepairValue: 500000, closingCosts: 12000,
    rehabCosts: 0, downPaymentPercent: 25, interestRate: 7.0,
    loanTerm: 30, propertyTax: 350, insurance: 200, hoa: 0,
    propertyManagement: 0, maintenance: 150, utilities: 200, otherExpenses: 100,
  })

  const [airbnb, setAirbnb] = useState<AirDNAData>({
    projectedAnnualRevenue: 65000, averageDailyRate: 250, occupancyRate: 68,
    revpar: 170, marketAvgOccupancy: 62, marketAvgADR: 225,
    marketAvgRevPAR: 140, marketTop25ADR: 300, marketTop25Occupancy: 75,
    compCount: 25, supplyGrowth: 4, cleaningFee: 150,
    peakSeasonMonths: 'Jun-Aug', lowSeasonMonths: 'Nov-Feb',
  })

  const updateProperty = (name: string, value: string) =>
    setProperty((p) => ({ ...p, [name]: isNaN(Number(value)) ? value : Number(value) }))
  const updateDeal = (name: string, value: string) =>
    setDeal((d) => ({ ...d, [name]: Number(value) || 0 }))
  const updateAirbnb = (name: string, value: string) =>
    setAirbnb((a) => ({ ...a, [name]: isNaN(Number(value)) ? value : Number(value) }))

  const handleAnalyze = () => {
    const r = runAnalysis(property, deal, airbnb)
    setResult(r)
    setStep(3)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="sf-navy-gradient py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--sf-gold)] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white">
                Deal Analysis Tool
              </h1>
              <p className="text-white/40 text-sm">Powered by DealCheck + AirDNA + Hub-and-Spoke</p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex gap-2 mt-6">
            {[
              { n: 1, label: 'Property & Financials' },
              { n: 2, label: 'Market Data (AirDNA)' },
              { n: 3, label: 'Analysis Report' },
            ].map((s) => (
              <button
                key={s.n}
                onClick={() => s.n < 3 ? setStep(s.n as 1 | 2) : undefined}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  step === s.n
                    ? 'bg-[var(--sf-gold)] text-white'
                    : step > s.n
                    ? 'bg-white/10 text-white/60'
                    : 'bg-white/5 text-white/30'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                  {step > s.n ? '✓' : s.n}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Step 1: Property + DealCheck */}
        {step === 1 && (
          <div className="space-y-8">
            {/* Property Info */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--sf-navy)] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--sf-navy)] text-white text-xs flex items-center justify-center">1</span>
                Property Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2 lg:col-span-3">
                  <Field label="Property Address" name="address" type="text" value={property.address} onChange={updateProperty} />
                </div>
                <Field label="City" name="city" type="text" value={property.city} onChange={updateProperty} />
                <Field label="State" name="state" type="text" value={property.state} onChange={updateProperty} />
                <Field label="Property Type" name="propertyType" type="text" value={property.propertyType} onChange={updateProperty} />
                <Field label="Bedrooms" name="bedrooms" value={property.bedrooms} onChange={updateProperty} />
                <Field label="Bathrooms" name="bathrooms" value={property.bathrooms} onChange={updateProperty} />
                <Field label="Square Feet" name="sqft" value={property.sqft} onChange={updateProperty} />
              </div>
            </div>

            {/* Purchase & Financing (from DealCheck) */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--sf-navy)] mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--sf-navy)] text-white text-xs flex items-center justify-center">2</span>
                Purchase & Financing
                <span className="text-xs font-normal text-[var(--sf-navy)]/30 ml-2">from DealCheck</span>
              </h2>
              <p className="text-xs text-[var(--sf-navy)]/40 mb-4">Enter the numbers from your DealCheck property analysis.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field label="Purchase Price" name="purchasePrice" value={deal.purchasePrice} onChange={updateDeal} prefix="$" />
                <Field label="After Repair Value (ARV)" name="afterRepairValue" value={deal.afterRepairValue} onChange={updateDeal} prefix="$" />
                <Field label="Closing Costs" name="closingCosts" value={deal.closingCosts} onChange={updateDeal} prefix="$" />
                <Field label="Rehab / Renovation Costs" name="rehabCosts" value={deal.rehabCosts} onChange={updateDeal} prefix="$" />
                <Field label="Down Payment" name="downPaymentPercent" value={deal.downPaymentPercent} onChange={updateDeal} suffix="%" />
                <Field label="Interest Rate" name="interestRate" value={deal.interestRate} onChange={updateDeal} suffix="%" />
                <Field label="Loan Term" name="loanTerm" value={deal.loanTerm} onChange={updateDeal} suffix="years" />
              </div>
            </div>

            {/* Monthly Expenses (from DealCheck) */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--sf-navy)] mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--sf-navy)] text-white text-xs flex items-center justify-center">3</span>
                Monthly Operating Expenses
                <span className="text-xs font-normal text-[var(--sf-navy)]/30 ml-2">from DealCheck</span>
              </h2>
              <p className="text-xs text-[var(--sf-navy)]/40 mb-4">Enter monthly amounts for each expense category.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field label="Property Tax" name="propertyTax" value={deal.propertyTax} onChange={updateDeal} prefix="$" suffix="/mo" />
                <Field label="Insurance" name="insurance" value={deal.insurance} onChange={updateDeal} prefix="$" suffix="/mo" />
                <Field label="HOA Fees" name="hoa" value={deal.hoa} onChange={updateDeal} prefix="$" suffix="/mo" />
                <Field label="Property Management" name="propertyManagement" value={deal.propertyManagement} onChange={updateDeal} prefix="$" suffix="/mo" hint="0 if self-managing" />
                <Field label="Maintenance / Repairs" name="maintenance" value={deal.maintenance} onChange={updateDeal} prefix="$" suffix="/mo" />
                <Field label="Utilities" name="utilities" value={deal.utilities} onChange={updateDeal} prefix="$" suffix="/mo" />
                <Field label="Other Expenses" name="otherExpenses" value={deal.otherExpenses} onChange={updateDeal} prefix="$" suffix="/mo" />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="bg-[var(--sf-gold)] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[var(--sf-gold)]/90 transition-all"
            >
              Next: Market Data (AirDNA) →
            </button>
          </div>
        )}

        {/* Step 2: AirDNA Data */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-[var(--sf-navy)] mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--sf-navy)] text-white text-xs flex items-center justify-center">4</span>
                Rentalizer Projections
                <span className="text-xs font-normal text-[var(--sf-navy)]/30 ml-2">from AirDNA</span>
              </h2>
              <p className="text-xs text-[var(--sf-navy)]/40 mb-4">Enter the numbers from your AirDNA Rentalizer report for this property.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field label="Projected Annual Revenue" name="projectedAnnualRevenue" value={airbnb.projectedAnnualRevenue} onChange={updateAirbnb} prefix="$" hint="Gross including cleaning fees" />
                <Field label="Average Daily Rate (ADR)" name="averageDailyRate" value={airbnb.averageDailyRate} onChange={updateAirbnb} prefix="$" />
                <Field label="Occupancy Rate" name="occupancyRate" value={airbnb.occupancyRate} onChange={updateAirbnb} suffix="%" />
                <Field label="RevPAR" name="revpar" value={airbnb.revpar} onChange={updateAirbnb} prefix="$" hint="ADR × Occupancy Rate" />
                <Field label="Cleaning Fee" name="cleaningFee" value={airbnb.cleaningFee} onChange={updateAirbnb} prefix="$" />
                <Field label="# of Comparables" name="compCount" value={airbnb.compCount} onChange={updateAirbnb} hint="Comp set count from Rentalizer" />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[var(--sf-navy)] mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--sf-navy)] text-white text-xs flex items-center justify-center">5</span>
                Market Benchmarks
                <span className="text-xs font-normal text-[var(--sf-navy)]/30 ml-2">from AirDNA MarketMinder</span>
              </h2>
              <p className="text-xs text-[var(--sf-navy)]/40 mb-4">Enter market-level data for the area (filter by matching property type/bedroom count).</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field label="Market Avg Occupancy" name="marketAvgOccupancy" value={airbnb.marketAvgOccupancy} onChange={updateAirbnb} suffix="%" />
                <Field label="Market Avg ADR" name="marketAvgADR" value={airbnb.marketAvgADR} onChange={updateAirbnb} prefix="$" />
                <Field label="Market Avg RevPAR" name="marketAvgRevPAR" value={airbnb.marketAvgRevPAR} onChange={updateAirbnb} prefix="$" />
                <Field label="Market Top 25% ADR" name="marketTop25ADR" value={airbnb.marketTop25ADR} onChange={updateAirbnb} prefix="$" />
                <Field label="Market Top 25% Occupancy" name="marketTop25Occupancy" value={airbnb.marketTop25Occupancy} onChange={updateAirbnb} suffix="%" />
                <Field label="Supply Growth (YoY)" name="supplyGrowth" value={airbnb.supplyGrowth} onChange={updateAirbnb} suffix="%" hint="Annual % increase in listings" />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[var(--sf-navy)] mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--sf-navy)] text-white text-xs flex items-center justify-center">6</span>
                Seasonality
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Peak Season Months" name="peakSeasonMonths" type="text" value={airbnb.peakSeasonMonths} onChange={updateAirbnb} hint="e.g., Jun-Aug" />
                <Field label="Low Season Months" name="lowSeasonMonths" type="text" value={airbnb.lowSeasonMonths} onChange={updateAirbnb} hint="e.g., Nov-Feb" />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="border-2 border-[var(--sf-navy)]/10 text-[var(--sf-navy)] px-6 py-3.5 rounded-xl font-semibold hover:bg-[var(--sf-navy)]/5 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleAnalyze}
                className="bg-[var(--sf-gold)] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[var(--sf-gold)]/90 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Run Analysis
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Report */}
        {step === 3 && result && (
          <div className="space-y-8">
            {/* Score Banner */}
            <div className="bg-white rounded-2xl border border-[var(--sf-navy)]/5 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[var(--sf-navy)]/40 uppercase tracking-wider mb-1">Deal Score</p>
                  <h2 className={`font-[var(--font-display)] text-4xl sm:text-5xl font-bold ${result.scoreColor}`}>
                    {result.score}
                  </h2>
                  <p className="text-sm text-[var(--sf-navy)]/50 mt-2 max-w-md">
                    {property.address ? property.address + ', ' : ''}{property.city}{property.state ? ', ' + property.state : ''}
                    {property.bedrooms ? ' — ' + property.bedrooms + 'BR / ' + property.bathrooms + 'BA' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--sf-navy)]/40">Purchase Price</p>
                  <p className="text-2xl font-bold text-[var(--sf-navy)]">{fmt(deal.purchasePrice)}</p>
                  <p className="text-xs text-[var(--sf-navy)]/40 mt-1">Total Cash Needed</p>
                  <p className="text-lg font-semibold text-[var(--sf-navy)]">{fmt(result.totalCashNeeded)}</p>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--sf-navy)]/60 uppercase tracking-wider mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                <MetricCard label="Revenue Per Night" value={fmt(result.revenuePerNight)} sub={'Target: ' + fmt(result.revenuePerNightTarget)} good={result.revenuePerNight >= result.revenuePerNightTarget} />
                <MetricCard label="Net Operating Income" value={fmt(result.noi)} sub="Annual" good={result.noi > 0} />
                <MetricCard label="Monthly Cash Flow" value={fmt(result.monthlyCashFlow)} sub="After debt service" good={result.monthlyCashFlow > 0} />
                <MetricCard label="Cap Rate" value={fmtPct(result.capRate)} sub="Target: 6%+" good={result.capRate >= 6} />
                <MetricCard label="Cash-on-Cash" value={fmtPct(result.cashOnCash)} sub="Target: 8%+" good={result.cashOnCash >= 8} />
                <MetricCard label="DSCR" value={result.dscr.toFixed(2) + 'x'} sub="Target: 1.25x+" good={result.dscr >= 1.25} />
                <MetricCard label="Break-Even" value={result.breakEvenMonths < 999 ? result.breakEvenMonths + ' months' : 'N/A'} sub="Time to recoup cash invested" good={result.breakEvenMonths <= 60} />
                <MetricCard label="5-Year Equity" value={fmt(result.fiveYearEquity)} sub="Appreciation + paydown" />
              </div>
            </div>

            {/* Hub-and-Spoke Projection */}
            <div className="bg-[var(--sf-gold)]/5 border border-[var(--sf-gold)]/20 rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-[var(--sf-gold)] uppercase tracking-wider mb-4">
                Hub-and-Spoke Revenue Projection
              </h3>
              <p className="text-xs text-[var(--sf-navy)]/50 mb-6">
                Projected revenue after implementing the RevenuePerNight system (dynamic pricing, direct booking, guest retention, experiences).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-xs text-[var(--sf-navy)]/40">Current (AirDNA Estimate)</div>
                  <div className="text-2xl font-bold text-[var(--sf-navy)] mt-1">{fmt(airbnb.projectedAnnualRevenue)}</div>
                  <div className="text-xs text-[var(--sf-navy)]/30">per year</div>
                </div>
                <div className="flex items-center justify-center text-[var(--sf-gold)] text-2xl font-bold">→</div>
                <div className="bg-white rounded-xl p-4 text-center border-2 border-[var(--sf-gold)]/30">
                  <div className="text-xs text-[var(--sf-gold)]">After Hub-and-Spoke</div>
                  <div className="text-2xl font-bold text-[var(--sf-gold)] mt-1">{fmt(result.revenueAfterSystem)}</div>
                  <div className="text-xs text-emerald-600">+{fmt(result.revenueAfterSystem - airbnb.projectedAnnualRevenue)}/year</div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-xs text-[var(--sf-navy)]/40">Dynamic Pricing</div>
                  <div className="text-sm font-bold text-[var(--sf-navy)]">+{fmt(airbnb.projectedAnnualRevenue * 0.18)}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-xs text-[var(--sf-navy)]/40">Commission Savings</div>
                  <div className="text-sm font-bold text-[var(--sf-navy)]">+{fmt(result.commissionSavings)}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-xs text-[var(--sf-navy)]/40">Guest Retention</div>
                  <div className="text-sm font-bold text-[var(--sf-navy)]">+{fmt(airbnb.projectedAnnualRevenue * 0.08)}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-xs text-[var(--sf-navy)]/40">Experiences</div>
                  <div className="text-sm font-bold text-[var(--sf-navy)]">+{fmt(airbnb.occupancyRate / 100 * 365 * 8)}</div>
                </div>
              </div>
            </div>

            {/* Strengths & Risks */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-4">Strengths</h3>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm text-emerald-800/70">
                      <span className="text-emerald-500 mt-0.5 shrink-0">&#x2713;</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-4">Risks & Considerations</h3>
                <ul className="space-y-2">
                  {result.risks.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm text-red-800/70">
                      <span className="text-red-400 mt-0.5 shrink-0">&#x26A0;</span>
                      {r}
                    </li>
                  ))}
                  {result.risks.length === 0 && (
                    <li className="text-sm text-emerald-600">No significant risks identified.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-white rounded-2xl border border-[var(--sf-navy)]/5 p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-[var(--sf-navy)]/60 uppercase tracking-wider mb-3">Recommendation</h3>
              <p className="text-[var(--sf-navy)]/70 leading-relaxed">{result.recommendation}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center bg-[var(--sf-navy)] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[var(--sf-navy)]/90 transition-all gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print / Save as PDF
              </button>
              <button
                onClick={() => { setStep(1); setResult(null) }}
                className="inline-flex items-center justify-center border-2 border-[var(--sf-navy)]/10 text-[var(--sf-navy)] px-6 py-3.5 rounded-xl font-semibold hover:bg-[var(--sf-navy)]/5 transition-all"
              >
                Analyze Another Property
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
