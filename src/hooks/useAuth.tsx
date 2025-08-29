'use client'

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react'
import { millionAPI } from '../lib/api/million-api'
import type {
  Owner,
  UpdateOwnerRequest,
  AuthState,
  AuthContextType,
} from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
  })

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const accessToken = millionAPI.getAccessToken()
        const refreshToken = millionAPI.getRefreshToken()

        if (accessToken && refreshToken) {
          setState(prev => ({
            ...prev,
            isAuthenticated: true,
            accessToken,
            refreshToken,
            loading: false,
          }))

          // Fetch user profile
          fetchProfile()
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
          }))
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setState(prev => ({
          ...prev,
          loading: false,
        }))
      }
    }

    // Only initialize after component mounts (client-side)
    initializeAuth()
  }, [])

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    try {
      const user = await millionAPI.getOwnerProfile()
      setState(prev => ({
        ...prev,
        user,
        error: null,
      }))
    } catch (err) {
      console.error('Failed to fetch profile:', err)
      // If profile fetch fails, user might not be authenticated
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
      }))
    }
  }, [])

  // Login
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))

        const response = await millionAPI.login(email, password)

        setState(prev => ({
          ...prev,
          isAuthenticated: true,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          loading: false,
          error: null,
        }))

        // Fetch user profile after successful login
        await fetchProfile()
      } catch (err) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Login failed',
        }))
        throw err
      }
    },
    [fetchProfile]
  )

  // Logout
  const logout = useCallback(async () => {
    try {
      await millionAPI.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null,
      })
    }
  }, [])

  // Refresh token
  const refreshAccessToken = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const response = await millionAPI.refreshAccessToken()

      setState(prev => ({
        ...prev,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        loading: false,
        error: null,
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Token refresh failed',
      }))

      // If refresh fails, logout user
      await logout()
      throw err
    }
  }, [logout])

  // Update profile
  const updateProfile = useCallback(async (data: UpdateOwnerRequest) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const updatedUser = await millionAPI.updateOwnerProfile(data)

      setState(prev => ({
        ...prev,
        user: updatedUser,
        loading: false,
        error: null,
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Profile update failed',
      }))
      throw err
    }
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAccessToken,
    updateProfile,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Hook for checking if user is authenticated
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

// Hook for getting current user
export function useUser(): Owner | null {
  const { user } = useAuth()
  return user
}
