import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import Providers from '@/components/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WebVitalsClient } from '@/components/WebVitalsClient'

export const metadata: Metadata = {
  title: {
    default: 'MILLION Real Estate',
    template: '%s · MILLION Real Estate'
  },
  description: 'Luxury real estate listings and property experiences',
  metadataBase: new URL('https://www.example.com')
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-base bg-bg text-text">
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <WebVitalsClient />
        </Providers>
      </body>
    </html>
  )
}

