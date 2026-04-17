export function ReferralSection() {
  return (
    <section className="py-16 px-6 border-t border-[#433d38]/40">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Spread the Word</p>
        <h2 className="font-serif text-3xl text-[#f0e6d0] mb-6">Know Someone Who Should Know About This?</h2>
        <p className="text-[#a09890] text-sm leading-relaxed mb-8 max-w-xl mx-auto">
          Sterling Route runs on referrals. If you&apos;ve ridden with us — or know someone who should —
          we&apos;d love the introduction. Refer a group that books and we&apos;ll take care of you on your next rental.
        </p>
        <a
          href="mailto:hello@sterlingroute.com?subject=Referral"
          className="inline-flex items-center gap-2 text-sm text-[#c9a96e] border border-[#c9a96e]/40 px-8 py-3 hover:bg-[#c9a96e]/10 transition-colors"
        >
          Make an Introduction →
        </a>
      </div>
    </section>
  )
}
