import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Haute Route — South Florida\'s Premier Luxury Van',
  description: 'One custom Mercedes Sprinter. 10 passengers. Golf trips, game days, corporate tours, and family adventures from Palm Beach County. Self-drive. The high road, always.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
