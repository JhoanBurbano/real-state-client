import React from 'react'
import { useAuthContext } from '../../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-text mb-4">Loading...</h1>
          <p className="text-text-muted">
            Please wait while we verify your authentication.
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text mb-4">
            Access Denied
          </h1>
          <p className="text-text-muted mb-6">
            Please log in to access this page.
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}


