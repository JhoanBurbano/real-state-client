'use client'

import { useState, useEffect, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import { useToast } from '@/context/ToastContext'

interface OwnerStats {
  totalProperties: number
  activeProperties: number
  soldProperties: number
  offMarketProperties: number
  totalValue: number
  averagePrice: number
  propertiesByType: Record<string, number>
  propertiesByCity: Record<string, number>
}

interface OwnerStatsState {
  stats: OwnerStats | null
  isLoading: boolean
  error: string | null
}

export function useOwnerStats() {
  const [state, setState] = useState<OwnerStatsState>({
    stats: null,
    isLoading: false,
    error: null,
  })

  const toast = useToast()

  // Fetch owner stats
  const fetchStats = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const stats = await millionAPI.getOwnerPropertyStats()

      setState(prev => ({
        ...prev,
        stats,
        isLoading: false,
        error: null,
      }))

      // Use toast functions directly to avoid dependency issues
      if (toast) {
        toast.showSuccess(
          'Estadísticas cargadas',
          'Se cargaron las estadísticas correctamente'
        )
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al cargar estadísticas'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      if (toast) {
        toast.showError('Error al cargar estadísticas', errorMessage)
      }
    }
  }, []) // Remove toast dependency

  // Refresh stats
  const refresh = useCallback(() => {
    fetchStats()
  }, [fetchStats])

  // Initial load
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Format currency
  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }, [])

  // Get percentage
  const getPercentage = useCallback((value: number, total: number): number => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  }, [])

  // Get top property type
  const getTopPropertyType = useCallback((): string | null => {
    if (!state.stats?.propertiesByType) return null

    const entries = Object.entries(state.stats.propertiesByType)
    if (entries.length === 0) return null

    return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0]
  }, [state.stats])

  // Get top city
  const getTopCity = useCallback((): string | null => {
    if (!state.stats?.propertiesByCity) return null

    const entries = Object.entries(state.stats.propertiesByCity)
    if (entries.length === 0) return null

    return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0]
  }, [state.stats])

  return {
    ...state,
    fetchStats,
    refresh,
    formatCurrency,
    getPercentage,
    getTopPropertyType,
    getTopCity,
  }
}
