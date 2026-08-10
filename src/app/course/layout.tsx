import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RevenuePerNight — Turn Your Rental Into a Revenue Machine',
  description:
    'The performance-driven growth platform that transforms short-term rentals into high-earning, fully optimized hospitality businesses. 10 modules. 8 demand channels. One system.',
  keywords: [
    'short term rental course',
    'airbnb optimization',
    'airbnb hosting course',
    'vacation rental marketing',
    'vacation rental business',
    'direct booking strategy',
    'STR revenue optimization',
    'revenue per night',
    'short term rental pricing',
    'airbnb algorithm',
    'vacation rental automation',
    'STR course online',
    'how to increase airbnb revenue',
    'direct booking website vacation rental',
    'dynamic pricing short term rental',
    'vacation rental systems',
  ],
  openGraph: {
    title: 'RevenuePerNight — The Hub-and-Spoke Revenue System for STR Owners',
    description:
      'Stop relying on Airbnb alone. Build 8 demand channels that drive bookings, maximize nightly rates, and turn your rental into a scalable business.',
    type: 'website',
    siteName: 'RevenuePerNight',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RevenuePerNight — Turn Your Rental Into a Revenue Machine',
    description:
      'The Hub-and-Spoke Revenue System: 10 modules, 8 demand channels, 60+ templates. Transform your STR from a passive listing into a scalable business.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/course',
  },
}

function CourseJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'The RevenuePerNight System',
    description:
      'The Hub-and-Spoke Revenue System that transforms short-term rentals into high-earning, fully optimized hospitality businesses with 8 demand channels.',
    provider: {
      '@type': 'Organization',
      name: 'RevenuePerNight',
      description: 'A product of Barefoot Realty & Investments',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'The System — Self-Paced Course',
        price: '1997',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        category: 'Self-Paced Online Course',
      },
      {
        '@type': 'Offer',
        name: 'The Intensive — Done-With-You Cohort',
        price: '2997',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        category: 'Live Cohort Program',
      },
      {
        '@type': 'Offer',
        name: 'The Concierge — Done-For-You Build',
        price: '7500',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        category: 'Done-For-You Service',
      },
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT40H',
    },
    numberOfCredits: 10,
    educationalLevel: 'Intermediate',
    about: [
      'Short-Term Rental Management',
      'Airbnb Optimization',
      'Vacation Rental Revenue',
      'Direct Booking Strategy',
      'Dynamic Pricing',
      'STR Automation',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function FaqJsonLd() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is RevenuePerNight for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Experienced or aspiring STR hosts and operators running 1-30 units who want to stop relying on a single platform and build a diversified, high-revenue hospitality business.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is this different from other STR courses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most courses teach one thing. RevenuePerNight teaches the entire ecosystem with the Hub-and-Spoke model — 8 demand channels, distribution, direct booking, dynamic pricing, automation, content, influencer marketing, guest retention, and experiences in one system.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to see results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dynamic pricing improvements show within days. Direct booking websites can be live in 1-2 weeks. Most students see measurable revenue increases within 30-60 days.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the 30-day money-back guarantee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you complete Module 0 and Module 1 within 30 days and do not see the value, email us for a full refund. No questions asked.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
  )
}

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="storefront bg-[var(--sf-cream)] text-[var(--sf-navy)] min-h-screen">
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <CourseJsonLd />
      <FaqJsonLd />
      {children}
    </div>
  )
}
