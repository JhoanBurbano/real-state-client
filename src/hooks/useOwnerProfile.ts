'use client'

import { useState, useEffect, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import { useToast } from '@/context/ToastContext'
import type { OwnerDto, UpdateOwnerRequest } from '@/types'

interface OwnerProfileState {
  profile: OwnerDto | null
  isLoading: boolean
  error: string | null
}

export function useOwnerProfile() {
  const [state, setState] = useState<OwnerProfileState>({
    profile: null,
    isLoading: false,
    error: null,
  })

  const toast = useToast()

  // Fetch owner profile
  const fetchProfile = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const profile = await millionAPI.getOwnerProfile()

      setState(prev => ({
        ...prev,
        profile,
        isLoading: false,
        error: null,
      }))

      if (toast) {
        toast.showSuccess('Perfil cargado', 'Se cargó el perfil correctamente')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al cargar el perfil'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      if (toast) {
        toast.showError('Error al cargar el perfil', errorMessage)
      }
    }
  }, []) // Remove toast dependency

  // Update owner profile
  const updateProfile = useCallback(async (profileData: UpdateOwnerRequest) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const updatedProfile = await millionAPI.updateOwnerProfile(profileData)

      setState(prev => ({
        ...prev,
        profile: updatedProfile,
        isLoading: false,
        error: null,
      }))

      if (toast) {
        toast.showSuccess(
          'Perfil actualizado',
          'El perfil se actualizó correctamente'
        )
      }

      return updatedProfile
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al actualizar el perfil'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      if (toast) {
        toast.showError('Error al actualizar el perfil', errorMessage)
      }
      return null
    }
  }, []) // Remove toast dependency

  // Refresh profile
  const refresh = useCallback(() => {
    fetchProfile()
  }, [fetchProfile])

  // Initial load
  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return {
    ...state,
    fetchProfile,
    updateProfile,
    refresh,
  }
}
