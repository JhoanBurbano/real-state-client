'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '../hooks/useAuthNew'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: any
  login: (email: string, password: string) => Promise<any>
  logout: () => Promise<void>
  refreshToken: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
