import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: "Sterling Route — South Florida's Premier Luxury Van Rental",
    template: '%s | Sterling Route',
  },
  description:
    'One custom Mercedes-Benz Sprinter. 10 passengers. Golf trips, game days, corporate tours, and family adventures from Palm Beach County. Self-drive luxury van rental from $795/day.',
  keywords: [
    'luxury van rental Palm Beach County',
    'Mercedes Sprinter rental South Florida',
    'luxury van rental Florida',
    'self drive sprinter van',
    'golf trip van rental Florida',
    'West Palm Beach van rental',
    'MAD Daycruiser rental',
  ],
  authors: [{ name: 'Sterling Route' }],
  creator: 'Sterling Route LLC',
  publisher: 'Sterling Route LLC',
  metadataBase: new URL('https://sterlingroute.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sterlingroute.com',
    siteName: 'Sterling Route',
    title: "Sterling Route — South Florida's Premier Luxury Van Rental",
    description:
      'One custom Mercedes-Benz Sprinter. 10 passengers. Golf trips, game days, corporate tours, and family adventures from Palm Beach County. Self-drive from $795/day.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sterling Route — South Florida's Premier Luxury Van Rental",
    description:
      'One custom Mercedes-Benz Sprinter. 10 passengers. Self-drive luxury van rental from $795/day.',
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Sterling Route',
              description:
                "South Florida's premier self-drive luxury van rental. One custom Mercedes-Benz Sprinter MAD Daycruiser D6. 10 passengers. Palm Beach County.",
              url: 'https://sterlingroute.com',
              email: 'hello@sterlingroute.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '8983 Okeechobee Blvd',
                addressLocality: 'West Palm Beach',
                addressRegion: 'FL',
                postalCode: '33411',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 26.7153,
                longitude: -80.2089,
              },
              areaServed: {
                '@type': 'State',
                name: 'Florida',
              },
              priceRange: '$$$',
              openingHours: 'Mo-Sa 08:00-20:00',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Sterling Route Rentals',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    name: 'Daily Van Rental',
                    description:
                      'Self-drive luxury Mercedes Sprinter MAD Daycruiser D6, 10 passengers',
                    price: '795',
                    priceCurrency: 'USD',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: '795',
                      priceCurrency: 'USD',
                      unitText: 'DAY',
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
