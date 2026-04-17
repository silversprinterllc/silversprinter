import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(160deg, #1B2A4A 0%, #0f1d36 100%)' }}
    >
      <div className="max-w-lg text-center">
        <div className="mb-6" style={{ color: '#D4A017', fontSize: '48px' }}>&#10003;</div>
        <h1
          className="font-bold text-3xl mb-4"
          style={{ color: '#FAF7F2' }}
        >
          You&apos;re In.
        </h1>
        <p
          className="text-lg mb-8"
          style={{ color: 'rgba(250,247,242,0.65)', lineHeight: 1.7 }}
        >
          Welcome to SpokeBnB. Check your email for access details and your
          onboarding guide. We&apos;ll be in touch within 24 hours to get you started.
        </p>
        <p
          className="text-sm mb-10"
          style={{ color: 'rgba(250,247,242,0.4)' }}
        >
          Questions? Email{' '}
          <a href="mailto:ben@thehoadleygroup.com" style={{ color: '#D4A017' }}>
            ben@thehoadleygroup.com
          </a>
        </p>
        <Link
          href="/course"
          className="inline-block text-sm font-semibold px-8 py-3 rounded-xl transition-all hover:opacity-90"
          style={{ background: '#D4A017', color: '#1B2A4A' }}
        >
          Back to SpokeBnB
        </Link>
      </div>
    </div>
  )
}
