'use client'

import { useState, useEffect, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import { useToast } from '@/context/ToastContext'
import type { PropertyListDto, PropertyDetailDto } from '@/types'

interface OwnerPropertiesState {
  properties: PropertyListDto[]
  isLoading: boolean
  error: string | null
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

export function useOwnerProperties(initialPageSize: number = 20) {
  const [state, setState] = useState<OwnerPropertiesState>({
    properties: [],
    isLoading: false,
    error: null,
    totalCount: 0,
    page: 1,
    pageSize: initialPageSize,
    totalPages: 0,
  })

  const toast = useToast()

  // Fetch owner properties
  const fetchProperties = useCallback(
    async (page: number = 1) => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const response = await millionAPI.getOwnerProperties(
          page,
          state.pageSize
        )

        setState(prev => ({
          ...prev,
          properties: response.items,
          totalCount: response.totalCount,
          page: response.page,
          totalPages: response.totalPages,
          isLoading: false,
          error: null,
        }))

        // Use toast functions directly to avoid dependency issues
        if (toast) {
          toast.showSuccess(
            'Propiedades cargadas',
            `Se cargaron ${response.items.length} propiedades`
          )
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al cargar propiedades'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        if (toast) {
          toast.showError('Error al cargar propiedades', errorMessage)
        }
      }
    },
    [state.pageSize] // Remove toast dependency
  )

  // Load more properties
  const loadMore = useCallback(async () => {
    if (state.page >= state.totalPages) return

    try {
      setState(prev => ({ ...prev, isLoading: true }))

      const nextPage = state.page + 1
      const response = await millionAPI.getOwnerProperties(
        nextPage,
        state.pageSize
      )

      setState(prev => ({
        ...prev,
        properties: [...prev.properties, ...response.items],
        page: response.page,
        totalPages: response.totalPages,
        isLoading: false,
      }))

      // Use toast functions directly to avoid dependency issues
      if (toast) {
        toast.showSuccess(
          'Más propiedades cargadas',
          `Se agregaron ${response.items.length} propiedades`
        )
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al cargar más propiedades'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      if (toast) {
        toast.showError('Error al cargar más propiedades', errorMessage)
      }
    }
  }, [state.page, state.totalPages, state.pageSize]) // Remove toast dependency

  // Get single property by ID
  const getPropertyById = useCallback(
    async (id: string): Promise<PropertyDetailDto | null> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const property = await millionAPI.getOwnerPropertyById(id)

        setState(prev => ({ ...prev, isLoading: false }))
        return property
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al cargar la propiedad'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        if (toast) {
          toast.showError('Error al cargar la propiedad', errorMessage)
        }
        return null
      }
    },
    [] // Remove toast dependency
  )

  // Refresh properties
  const refresh = useCallback(() => {
    fetchProperties(1)
  }, [fetchProperties])

  // Change page size
  const changePageSize = useCallback((newPageSize: number) => {
    setState(prev => ({ ...prev, pageSize: newPageSize, page: 1 }))
  }, [])

  // Initial load
  useEffect(() => {
    fetchProperties(1)
  }, [fetchProperties])

  return {
    ...state,
    fetchProperties,
    loadMore,
    getPropertyById,
    refresh,
    changePageSize,
  }
}
