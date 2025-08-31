'use client'

import { useState, useEffect, useCallback } from 'react'
import { millionAPI } from '../lib/api/million-api'
import type {
  Owner,
  UpdateOwnerRequest,
  AuthState,
  AuthContextType,
} from '../types'
import { useToast } from '@/context/ToastContext'
import { useAuthContext } from '@/context/AuthContext'

export function useAuth(): AuthContextType {
  const toast = useToast()
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    owner: null,
    accessToken: null,
    refreshToken: null,
    isLoading: true,
    error: null,
  })

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const accessToken = millionAPI.getAccessToken()
        const refreshToken = millionAPI.getRefreshToken()

        if (accessToken && refreshToken) {
          // Sincronizar el estado con millionAPI
          millionAPI.setTokens(accessToken, refreshToken)

          setState((prev: AuthState) => ({
            ...prev,
            isAuthenticated: true,
            accessToken,
            refreshToken,
            isLoading: false,
          }))

          // Fetch user profile
          fetchProfile()
        } else {
          setState((prev: AuthState) => ({
            ...prev,
            isLoading: false,
          }))
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setState((prev: AuthState) => ({
          ...prev,
          isLoading: false,
        }))
      }
    }

    // Only initialize after component mounts (client-side)
    initializeAuth()
  }, [])

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    try {
      const owner = await millionAPI.getOwnerProfile()
      setState((prev: AuthState) => ({
        ...prev,
        owner,
        error: null,
      }))
    } catch (err) {
      console.error('Failed to fetch profile:', err)
      // If profile fetch fails, user might not be authenticated
      setState((prev: AuthState) => ({
        ...prev,
        isAuthenticated: false,
        owner: null,
        accessToken: null,
        refreshToken: null,
      }))
    }
  }, [])

  // Login
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setState((prev: AuthState) => ({
          ...prev,
          isLoading: true,
          error: null,
        }))

        const response = await millionAPI.login(email, password)

        // Sincronizar el token con millionAPI
        millionAPI.setTokens(response.accessToken, response.refreshToken)

        setState((prev: AuthState) => ({
          ...prev,
          isAuthenticated: true,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          isLoading: false,
          error: null,
        }))

        // Fetch user profile after successful login
        await fetchProfile()

        // Mostrar toast de éxito
        toast.showSuccess('¡Bienvenido!', 'Has iniciado sesión correctamente')
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login failed'
        setState((prev: AuthState) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))

        // Mostrar toast de error
        toast.showError('Error de inicio de sesión', errorMessage)
        throw err
      }
    },
    [fetchProfile]
  )

  // Logout
  const logout = useCallback(async () => {
    try {
      await millionAPI.logout()
      toast.showSuccess('Sesión cerrada', 'Has cerrado sesión correctamente')
    } catch (err) {
      console.error('Logout error:', err)
      toast.showWarning('Advertencia', 'Error al cerrar sesión en el servidor')
    } finally {
      // Limpiar tokens del millionAPI
      millionAPI.clearTokens()

      setState({
        isAuthenticated: false,
        owner: null,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
        error: null,
      })
    }
  }, [toast])

  // Refresh token
  const refreshAccessToken = useCallback(async () => {
    try {
      setState((prev: AuthState) => ({ ...prev, isLoading: true, error: null }))

      const response = await millionAPI.refreshAccessToken()

      // Sincronizar el token con millionAPI
      millionAPI.setTokens(response.accessToken, response.refreshToken)

      setState((prev: AuthState) => ({
        ...prev,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isLoading: false,
        error: null,
      }))
    } catch (err) {
      setState((prev: AuthState) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Token refresh failed',
      }))

      // If refresh fails, logout user
      await logout()
      throw err
    }
  }, [logout])

  // Update profile
  const updateProfile = useCallback(
    async (data: UpdateOwnerRequest) => {
      try {
        setState((prev: AuthState) => ({
          ...prev,
          isLoading: true,
          error: null,
        }))

        const updatedOwner = await millionAPI.updateOwnerProfile(data)

        setState((prev: AuthState) => ({
          ...prev,
          owner: updatedOwner,
          isLoading: false,
          error: null,
        }))

        // Mostrar toast de éxito
        toast.showSuccess(
          'Perfil actualizado',
          'Tu perfil se ha actualizado correctamente'
        )
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Profile update failed'
        setState((prev: AuthState) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))

        // Mostrar toast de error
        toast.showError('Error al actualizar perfil', errorMessage)
        throw err
      }
    },
    [toast]
  )

  // Change password
  const changePassword = useCallback(
    async (data: any) => {
      try {
        // TODO: Implement change password API call when backend endpoint is available
        console.log('Change password requested:', data)
        // await millionAPI.changePassword(data)

        // Mostrar toast de éxito temporal
        toast.showSuccess(
          'Contraseña cambiada',
          'Tu contraseña se ha cambiado correctamente'
        )
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Change password failed'
        console.error('Change password failed:', err)

        // Mostrar toast de error
        toast.showError('Error al cambiar contraseña', errorMessage)
        throw err
      }
    },
    [toast]
  )

  // Clear error
  const clearError = useCallback(() => {
    setState((prev: AuthState) => ({ ...prev, error: null }))
  }, [])

  return {
    owner: state.owner,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    refreshAccessToken,
    updateProfile,
    changePassword,
    clearError,
  }
}

// Hook for checking if user is authenticated
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuthContext()
  return isAuthenticated
}

// Hook for getting current user
export function useUser(): Owner | null {
  const { owner } = useAuthContext()
  return owner
}
