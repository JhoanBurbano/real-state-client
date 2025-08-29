import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { HydrationWrapper } from '@/components/providers/HydrationWrapper'
import { SkipLink } from '@/components/layout/SkipLink'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MILLION Luxury Real Estate',
    template: '%s | MILLION Luxury Real Estate',
  },
  description:
    'Exclusive luxury real estate properties in the most prestigious locations worldwide.',
  keywords:
    'luxury real estate, premium properties, exclusive homes, luxury condos, penthouses',
  authors: [{ name: 'MILLION Luxury Real Estate' }],
  creator: 'MILLION Luxury Real Estate',
  publisher: 'MILLION Luxury Real Estate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://million-realestate.com'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      es: '/es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://million-realestate.com',
    title: 'MILLION Luxury Real Estate',
    description:
      'Exclusive luxury real estate properties in the most prestigious locations worldwide.',
    siteName: 'MILLION Luxury Real Estate',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MILLION Luxury Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MILLION Luxury Real Estate',
    description:
      'Exclusive luxury real estate properties in the most prestigious locations worldwide.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-base antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HydrationWrapper>
            <AuthProvider>
              <SkipLink />
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1" id="main-content">
                  {children}
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </HydrationWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
