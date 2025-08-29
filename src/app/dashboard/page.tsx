'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
import { AgentDashboard } from '@/components/dashboard/AgentDashboard'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-text mb-4">
            Loading Dashboard...
          </h1>
          <p className="text-text-muted">
            Please wait while we load your agent dashboard.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <AgentDashboard />
    </ProtectedRoute>
  )
}
