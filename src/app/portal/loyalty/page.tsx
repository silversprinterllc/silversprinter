import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getLoyaltySummary, TIER_PERKS } from '@/services/loyalty.service'
import { formatDateTime } from '@/lib/utils'

const TIER_THRESHOLDS: Record<string, number> = {
  SILVER: 0, GOLD: 1000, PLATINUM: 3000, BLACK: 7500,
}

export default async function LoyaltyPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const summary = await getLoyaltySummary(session.user.id)
  const nextThreshold = summary.nextTier ? TIER_THRESHOLDS[summary.nextTier] : null
  const currentThreshold = TIER_THRESHOLDS[summary.tier]
  const progress = nextThreshold
    ? ((summary.points - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    : 100

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Portal</p>
        <h1 className="font-serif text-3xl text-[#f0e6d0]">Loyalty Rewards</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Points balance */}
        <div className="lg:col-span-2 border border-[#433d38]/50 bg-[#1a1612] p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-1">Your Points</p>
              <p className="font-serif text-6xl text-[#c9a96e]">{summary.points.toLocaleString()}</p>
            </div>
            <span className="px-3 py-1 border border-[#c9a96e]/30 text-[#c9a96e] text-sm tracking-wide">
              {summary.tier}
            </span>
          </div>

          {summary.nextTier && (
            <div>
              <div className="flex justify-between text-xs text-[#5f5850] mb-2">
                <span>{summary.tier}</span>
                <span>{summary.nextTier} in {summary.pointsToNextTier?.toLocaleString()} pts</span>
              </div>
              <div className="h-1 bg-[#2a2520] w-full">
                <div
                  className="h-1 bg-[#c9a96e] transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-[#433d38]/50">
            <p className="text-sm text-[#a09890]">{summary.perks.description}</p>
          </div>
        </div>

        {/* Cash value */}
        <div className="border border-[#433d38]/50 bg-[#1a1612] p-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-2">Cash Value</p>
          <p className="font-serif text-3xl text-[#c9a96e]">${summary.cashValue.toFixed(2)}</p>
          <p className="text-xs text-[#5f5850] mt-2">100 pts = $1</p>
        </div>
      </div>

      {/* Transaction history */}
      <div className="border border-[#433d38]/50 bg-[#1a1612]">
        <div className="px-6 py-4 border-b border-[#433d38]/50">
          <h2 className="font-serif text-lg text-[#f0e6d0]">Transaction History</h2>
        </div>
        {summary.transactions.length === 0 ? (
          <div className="p-8 text-center text-[#5f5850] text-sm">No transactions yet.</div>
        ) : (
          <div className="divide-y divide-[#433d38]/30">
            {summary.transactions.map((t) => (
              <div key={t.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#f0e6d0]">{t.reason.replace('_', ' ')}</p>
                  <p className="text-xs text-[#5f5850]">{formatDateTime(t.createdAt)}</p>
                </div>
                <span className={`font-serif text-lg ${t.points > 0 ? 'text-[#c9a96e]' : 'text-red-400'}`}>
                  {t.points > 0 ? '+' : ''}{t.points}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
