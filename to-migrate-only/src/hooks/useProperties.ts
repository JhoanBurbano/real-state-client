import useSWR from 'swr'
import { dataService } from '@/utils/dataService'
import type { Property, PropertyFilters, ApiResponse } from '@/utils/api'

interface UsePropertiesOptions extends PropertyFilters {
  revalidateOnFocus?: boolean
  revalidateOnReconnect?: boolean
  refreshInterval?: number
}

export function useProperties(filters: UsePropertiesOptions = {}) {
  const {
    revalidateOnFocus = false,
    revalidateOnReconnect = true,
    refreshInterval = 0,
    ...apiFilters
  } = filters

  // Create a stable key for SWR based on filters
  const key =
    apiFilters && Object.keys(apiFilters).length > 0
      ? ['properties', apiFilters]
      : ['properties']

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate: revalidate,
  } = useSWR(
    key,
    async () => {
      const response = await dataService.getProperties(apiFilters)
      if (response.error) {
        throw new Error(response.error)
      }
      return {
        properties: response.data || [],
        pagination: response.pagination,
      }
    },
    {
      revalidateOnFocus,
      revalidateOnReconnect,
      refreshInterval,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
      dedupingInterval: 5000, // 5 seconds
      onError: error => {
        console.error('Error fetching properties:', error)
      },
    }
  )

  return {
    properties: data?.properties || [],
    pagination: data?.pagination,
    isLoading,
    isValidating,
    error: error?.message || null,
    revalidate,
    isEmpty: !isLoading && !data?.properties?.length,
  }
}

export function useProperty(propertyId: string | null) {
  const {
    data,
    error,
    isLoading,
    mutate: revalidate,
  } = useSWR(
    propertyId ? ['property', propertyId] : null,
    async () => {
      if (!propertyId) return null

      const response = await dataService.getProperty(propertyId)
      if (response.error) {
        throw new Error(response.error)
      }
      return {
        property: response.data,
        agent: response.agent,
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
      onError: error => {
        console.error('Error fetching property:', error)
      },
    }
  )

  return {
    property: data?.property || null,
    agent: data?.agent || null,
    isLoading,
    error: error?.message || null,
    revalidate,
  }
}

export function useFilterOptions() {
  const { data, error, isLoading } = useSWR(
    'filter-options',
    async () => {
      const response = await dataService.getFilterOptions()
      if (response.error) {
        throw new Error(response.error)
      }
      return response.data
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 300000, // 5 minutes
      errorRetryCount: 2,
    }
  )

  return {
    filterOptions: data || null,
    isLoading,
    error: error?.message || null,
  }
}

export function useAgents() {
  const { data, error, isLoading } = useSWR(
    'agents',
    async () => {
      const response = await dataService.getAgents()
      if (response.error) {
        throw new Error(response.error)
      }
      return response.data
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 600000, // 10 minutes
      errorRetryCount: 2,
    }
  )

  return {
    agents: data || [],
    isLoading,
    error: error?.message || null,
  }
}

export function useLeads(filters: any = {}) {
  const {
    data,
    error,
    isLoading,
    mutate: revalidate,
  } = useSWR(
    ['leads', filters],
    async () => {
      const response = await dataService.getLeads(filters)
      if (response.error) {
        throw new Error(response.error)
      }
      return {
        leads: response.data || [],
        pagination: response.pagination,
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 2,
      onError: error => {
        console.error('Error fetching leads:', error)
      },
    }
  )

  return {
    leads: data?.leads || [],
    pagination: data?.pagination,
    isLoading,
    error: error?.message || null,
    revalidate,
  }
}

// Hook for managing favorites
export function useFavorites() {
  const { data: favorites, mutate: revalidateFavorites } = useSWR(
    'favorites',
    () => dataService.getFavorites(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  )

  const addFavorite = (propertyId: string) => {
    dataService.addFavorite(propertyId)
    revalidateFavorites()
  }

  const removeFavorite = (propertyId: string) => {
    dataService.removeFavorite(propertyId)
    revalidateFavorites()
  }

  const isFavorite = (propertyId: string) => {
    return dataService.isFavorite(propertyId)
  }

  return {
    favorites: favorites || [],
    addFavorite,
    removeFavorite,
    isFavorite,
    revalidateFavorites,
  }
}

// Hook for connection status
export function useConnectionStatus() {
  const { data: status, mutate: revalidateStatus } = useSWR(
    'connection-status',
    () => dataService.getConnectionStatus(),
    {
      refreshInterval: 10000, // Check every 10 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  return {
    status: status || 'offline',
    revalidateStatus,
  }
}

// Hook for service mode management
export function useDataService() {
  const getCurrentMode = () => dataService.getCurrentMode()
  const switchToMock = () => dataService.switchToMock()
  const switchToAPI = () => dataService.switchToAPI()
  const resetData = () => dataService.resetData()
  const addSampleLead = () => dataService.addSampleLead()

  const { data: healthData, mutate: revalidateHealth } = useSWR(
    'health-check',
    () => dataService.healthCheck(),
    {
      refreshInterval: 30000, // Check every 30 seconds
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  return {
    currentMode: getCurrentMode(),
    switchToMock,
    switchToAPI,
    resetData,
    addSampleLead,
    health: healthData,
    revalidateHealth,
  }
}
