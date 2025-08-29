'use client'

import { useState, useEffect } from 'react'

interface HydrationWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationWrapper({
  children,
  fallback = <div className="min-h-screen bg-surface animate-pulse" />,
}: HydrationWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Show fallback during SSR and initial hydration
  if (!isHydrated) {
    return <>{fallback}</>
  }

  // Show actual content after hydration
  return <>{children}</>
}
