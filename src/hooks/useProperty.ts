'use client'

import { useState, useEffect, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import type { PropertyDetailDto } from '@/types'

export function useProperty(propertyId: string | null) {
  const [property, setProperty] = useState<PropertyDetailDto | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProperty = useCallback(async () => {
    if (!propertyId) return

    try {
      setLoading(true)
      setError(null)

      const propertyData = await millionAPI.getPropertyById(propertyId)
      setProperty(propertyData)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch property details'
      )
      console.error('Error fetching property:', err)
    } finally {
      setLoading(false)
    }
  }, [propertyId])

  useEffect(() => {
    fetchProperty()
  }, [fetchProperty])

  const refresh = useCallback(() => {
    fetchProperty()
  }, [fetchProperty])

  return { property, loading, error, refresh }
}

