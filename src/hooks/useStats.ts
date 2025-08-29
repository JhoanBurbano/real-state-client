import { useState, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import type {
  PropertyStats,
  SystemMetrics,
  PerformanceMetrics,
  BusinessMetrics,
  MarketTrend,
  CacheStats,
} from '@/types'

export function useStats() {
  const [propertyStats, setPropertyStats] = useState<PropertyStats | null>(null)
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null)
  const [performanceMetrics, setPerformanceMetrics] = useState<
    PerformanceMetrics[]
  >([])
  const [businessMetrics, setBusinessMetrics] =
    useState<BusinessMetrics | null>(null)
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get property statistics
  const getPropertyStats = useCallback(
    async (filters?: {
      city?: string
      propertyType?: string
      from?: string
      to?: string
    }) => {
      setLoading(true)
      setError(null)

      try {
        const stats = await millionAPI.getPropertyStats(filters)
        setPropertyStats(stats)
        return stats
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch property statistics'
        )
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Get property trends
  const getPropertyTrends = useCallback(async (months: number = 12) => {
    setLoading(true)
    setError(null)

    try {
      const trends = await millionAPI.getPropertyTrends(months)
      return trends
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch property trends'
      )
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  // Get price trends
  const getPriceTrends = useCallback(async (periods: number = 12) => {
    setLoading(true)
    setError(null)

    try {
      const trends = await millionAPI.getPriceTrends(periods)
      return trends
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch price trends'
      )
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  // Get system metrics
  const getSystemMetrics = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const metrics = await millionAPI.getMetrics()
      setSystemMetrics(metrics)
      return metrics
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch system metrics'
      )
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Get performance metrics
  const getPerformanceMetrics = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const metrics = await millionAPI.getPerformanceMetrics()
      setPerformanceMetrics(metrics)
      return metrics
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch performance metrics'
      )
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  // Get business metrics
  const getBusinessMetrics = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const metrics = await millionAPI.getBusinessMetrics()
      setBusinessMetrics(metrics)
      return metrics
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch business metrics'
      )
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Get cache stats
  const getCacheStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const stats = await millionAPI.getCacheStats()
      setCacheStats(stats)
      return stats
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch cache stats'
      )
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Get all metrics at once
  const getAllMetrics = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [system, performance, business, cache] = await Promise.all([
        millionAPI.getMetrics(),
        millionAPI.getPerformanceMetrics(),
        millionAPI.getBusinessMetrics(),
        millionAPI.getCacheStats(),
      ])

      setSystemMetrics(system)
      setPerformanceMetrics(performance)
      setBusinessMetrics(business)
      setCacheStats(cache)

      return { system, performance, business, cache }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch all metrics'
      )
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Helper functions for common calculations
  const getAveragePrice = useCallback(() => {
    return propertyStats?.averagePrice || 0
  }, [propertyStats])

  const getTotalProperties = useCallback(() => {
    return propertyStats?.total || 0
  }, [propertyStats])

  const getActiveProperties = useCallback(() => {
    return propertyStats?.active || 0
  }, [propertyStats])

  const getSoldProperties = useCallback(() => {
    return propertyStats?.sold || 0
  }, [propertyStats])

  const getRentedProperties = useCallback(() => {
    return propertyStats?.rented || 0
  }, [propertyStats])

  const getPriceRange = useCallback(() => {
    return propertyStats?.priceRange || { min: 0, max: 0 }
  }, [propertyStats])

  const getPropertiesByCity = useCallback(() => {
    return propertyStats?.byCity || {}
  }, [propertyStats])

  const getPropertiesByType = useCallback(() => {
    return propertyStats?.byType || {}
  }, [propertyStats])

  const getPropertiesByStatus = useCallback(() => {
    return propertyStats?.byStatus || {}
  }, [propertyStats])

  const getAmenityStats = useCallback(() => {
    return (
      propertyStats?.amenities || {
        withPool: 0,
        withGarden: 0,
        withParking: 0,
        furnished: 0,
        poolPremium: 0,
        gardenPremium: 0,
        parkingPremium: 0,
      }
    )
  }, [propertyStats])

  const getSystemHealth = useCallback(() => {
    if (!systemMetrics) return 'unknown'

    if (systemMetrics.errorRate > 0.1) return 'critical'
    if (systemMetrics.errorRate > 0.05) return 'warning'
    if (systemMetrics.errorRate > 0.01) return 'degraded'
    return 'healthy'
  }, [systemMetrics])

  const getCacheEfficiency = useCallback(() => {
    if (!cacheStats) return 0
    return cacheStats.hitRate
  }, [cacheStats])

  return {
    // State
    propertyStats,
    systemMetrics,
    performanceMetrics,
    businessMetrics,
    cacheStats,
    loading,
    error,

    // Actions
    getPropertyStats,
    getPropertyTrends,
    getPriceTrends,
    getSystemMetrics,
    getPerformanceMetrics,
    getBusinessMetrics,
    getCacheStats,
    getAllMetrics,
    clearError,

    // Helper functions
    getAveragePrice,
    getTotalProperties,
    getActiveProperties,
    getSoldProperties,
    getRentedProperties,
    getPriceRange,
    getPropertiesByCity,
    getPropertiesByType,
    getPropertiesByStatus,
    getAmenityStats,
    getSystemHealth,
    getCacheEfficiency,
  }
}

// Hook for specific property statistics
export function usePropertyStats(propertyId?: string) {
  const [stats, setStats] = useState<PropertyStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load property statistics
  const loadStats = useCallback(
    async (filters?: {
      city?: string
      propertyType?: string
      from?: string
      to?: string
    }) => {
      setLoading(true)
      setError(null)

      try {
        const propertyStats = await millionAPI.getPropertyStats(filters)
        setStats(propertyStats)
        return propertyStats
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load property statistics'
        )
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    stats,
    loading,
    error,
    loadStats,
    clearError,
  }
}

