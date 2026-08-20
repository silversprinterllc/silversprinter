import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free STR Saturation Quiz | SpokeBnB',
  description:
    'Find out if your short-term rental market is about to saturate. Get a personalized report in 60 seconds with the 3 things you can fix this week.',
  keywords: [
    'STR saturation quiz',
    'short term rental diagnostic',
    'airbnb saturation',
    'vacation rental assessment',
    'str market analysis',
    'airbnb host quiz',
  ],
  openGraph: {
    title: 'Is Your STR Market About to Saturate? | SpokeBnB',
    description:
      'Free 60-second diagnostic. Score your property across 8 dimensions. Get a personalized report with the 3 moves that raise your score fastest.',
    type: 'website',
    siteName: 'SpokeBnB',
    locale: 'en_US',
    images: [
      {
        url: '/og-quiz.png',
        width: 1200,
        height: 630,
        alt: 'STR Saturation Diagnostic Quiz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your STR Market About to Saturate?',
    description:
      'Free 60-second diagnostic. Personalized score + 3 specific fixes. No email required to see your score.',
    images: ['/og-quiz.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/course/quiz',
  },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
