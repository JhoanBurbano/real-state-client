'use client'

import { useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Verificar estado de autenticación al cargar
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authService.login({ email, password })
      setIsAuthenticated(true)
      return response
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      await authService.logout()
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refreshToken = useCallback(async () => {
    try {
      const response = await authService.refreshAccessToken()
      setIsAuthenticated(true)
      return response
    } catch (error) {
      setIsAuthenticated(false)
      throw error
    }
  }, [])

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    refreshToken,
  }
}
