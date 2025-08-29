'use client'

import { useState, useEffect } from 'react'
import { AuthProvider } from '@/hooks/useAuth'
import { AuthFallback } from './AuthFallback'

interface AuthHydrationWrapperProps {
  children: React.ReactNode
}

export function AuthHydrationWrapper({ children }: AuthHydrationWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Small delay to ensure proper hydration
    const timer = setTimeout(() => {
      setIsHydrated(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Show fallback while hydrating
  if (!isHydrated) {
    return <AuthFallback />
  }

  return <AuthProvider>{children}</AuthProvider>
}
