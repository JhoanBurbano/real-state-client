'use client'

import { useState, useEffect, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import type { Property, PropertyFilters, PropertyResponse } from '@/types'

export function useHomeProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // Fetch properties from API with larger page size for home
  const fetchProperties = useCallback(async (filters: PropertyFilters = {}) => {
    try {
      setLoading(true)
      setError(null)

      const response: PropertyResponse = await millionAPI.getProperties({
        page: filters.page || 1,
        pageSize: filters.pageSize || 30, // Larger page size for home
        ...filters,
      })

      setProperties(response.items)
      setTotal(response.total)
      setCurrentPage(response.page)
      setTotalPages(response.totalPages)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch properties'
      )
      console.error('Error fetching properties:', err)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [])

  // Load initial properties
  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // Load more properties (pagination)
  const loadMore = useCallback(async () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1
      try {
        setLoading(true)
        const response: PropertyResponse = await millionAPI.getProperties({
          page: nextPage,
          pageSize: 30, // Larger page size for home
        })

        setProperties(prev => [...prev, ...response.items])
        setCurrentPage(response.page)
        setTotalPages(response.totalPages)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load more properties'
        )
      } finally {
        setLoading(false)
      }
    }
  }, [currentPage, totalPages, loading])

  // Refresh properties
  const refresh = useCallback(() => {
    fetchProperties()
  }, [fetchProperties])

  return {
    properties,
    loading,
    error,
    initialLoading,
    total,
    currentPage,
    totalPages,
    loadMore,
    refresh,
    fetchProperties,
  }
}
