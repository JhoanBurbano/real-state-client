'use client'

import { useState, useEffect, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import type {
  Property,
  PropertyFilters,
  PropertyResponse,
  PropertyTrace,
  MediaDto,
  MediaPatchDto,
  PropertyStats,
  AdvancedSearchRequest,
} from '@/types'

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // Fetch properties from API
  const fetchProperties = useCallback(async (filters: PropertyFilters = {}) => {
    try {
      setLoading(true)
      setError(null)

      console.log('🔍 Fetching properties with filters:', filters)

      const response: PropertyResponse = await millionAPI.getProperties({
        page: filters.page || 1,
        pageSize: filters.pageSize || 20, // Increased default page size
        ...filters,
      })

      console.log('📊 API Response received:', {
        total: response.total,
        page: response.page,
        pageSize: response.pageSize,
        itemsCount: response.items?.length || 0,
      })

      console.log('🏠 Properties data:', response.items)

      // Log each property individually for detailed inspection
      if (response.items && response.items.length > 0) {
        console.log('🔍 Individual Properties Analysis:')
        response.items.forEach((property: any, index: number) => {
          console.log(`Property ${index + 1}:`, {
            id: property.id,
            name: property.name,
            price: property.price,
            status: property.status,
            coverUrl: property.coverUrl,
            hasMoreMedia: property.hasMoreMedia,
            totalImages: property.totalImages,
            totalVideos: property.totalVideos,
            hasCover: !!property.coverUrl,
          })
        })
      } else {
        console.log('⚠️ No properties returned from API')
      }

      setProperties(response.items)
      setTotal(response.total)
      setCurrentPage(response.page)
      setTotalPages(Math.ceil(response.total / response.pageSize))
    } catch (err) {
      console.error('❌ Error fetching properties:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to fetch properties'
      )
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [])

  // Load initial properties
  useEffect(() => {
    console.log('🔍 useEffect: Fetching properties')
    fetchProperties()
  }, [fetchProperties])

  // Filter properties based on criteria
  const filterProperties = useCallback(
    (filters: Partial<PropertyFilters>): Property[] => {
      return properties?.filter(property => {
        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          const matchesSearch =
            property.name.toLowerCase().includes(searchLower) ||
            property.description.toLowerCase().includes(searchLower) ||
            property.address.toLowerCase().includes(searchLower) ||
            property.city.toLowerCase().includes(searchLower) ||
            property.neighborhood.toLowerCase().includes(searchLower)

          if (!matchesSearch) return false
        }

        // City filter
        if (filters.city && property.city !== filters.city) return false

        // Neighborhood filter
        if (
          filters.neighborhood &&
          property.neighborhood !== filters.neighborhood
        )
          return false

        // Property type filter
        if (
          filters.propertyType &&
          property.propertyType !== filters.propertyType
        )
          return false

        // Price range filter
        if (filters.minPrice && property.price < filters.minPrice) return false
        if (filters.maxPrice && property.price > filters.maxPrice) return false

        // Bedrooms filter
        if (filters.bedrooms && property.bedrooms !== filters.bedrooms)
          return false

        // Bathrooms filter
        if (filters.bathrooms && property.bathrooms !== filters.bathrooms)
          return false

        // Size range filter
        if (filters.minSize && property.size < filters.minSize) return false
        if (filters.maxSize && property.size > filters.maxSize) return false

        // Amenities filters
        if (
          filters.hasPool !== undefined &&
          property.hasPool !== filters.hasPool
        )
          return false
        if (
          filters.hasGarden !== undefined &&
          property.hasGarden !== filters.hasGarden
        )
          return false
        if (
          filters.hasParking !== undefined &&
          property.hasParking !== filters.hasParking
        )
          return false
        if (
          filters.isFurnished !== undefined &&
          property.isFurnished !== filters.isFurnished
        )
          return false

        return true
      })
    },
    [properties]
  )

  // Get filter options for UI
  const getFilterOptions = useCallback(() => {
    const cities = [...new Set(properties.map((p: Property) => p.city))].sort()
    const neighborhoods = [
      ...new Set(properties.map((p: Property) => p.neighborhood)),
    ].sort()
    const propertyTypes = [
      ...new Set(properties.map((p: Property) => p.propertyType)),
    ].sort()

    const priceRange =
      properties.length > 0
        ? {
            min: Math.min(...properties.map((p: Property) => p.price)),
            max: Math.max(...properties.map((p: Property) => p.price)),
          }
        : { min: 0, max: 0 }

    const sizeRange =
      properties.length > 0
        ? {
            min: Math.min(...properties.map((p: Property) => p.size)),
            max: Math.max(...properties.map((p: Property) => p.size)),
          }
        : { min: 0, max: 0 }

    return {
      cities,
      neighborhoods,
      propertyTypes,
      priceRange,
      sizeRange,
    }
  }, [properties])

  // Load more properties (pagination)
  const loadMore = useCallback(async () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1
      try {
        setLoading(true)
        console.log('🔄 Loading more properties, page:', nextPage)

        const response: PropertyResponse = await millionAPI.getProperties({
          page: nextPage,
          pageSize: 20, // Increased page size for load more
        })

        console.log('📄 Load more response:', {
          total: response.total,
          page: response.page,
          pageSize: response.pageSize,
          newPropertiesCount: response.items?.length || 0,
        })

        setProperties(prev => [...prev, ...response.items])
        setCurrentPage(response.page)
        setTotalPages(Math.ceil(response.total / response.pageSize))
      } catch (err) {
        console.error('❌ Error loading more properties:', err)
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

  // Get property by ID
  const getPropertyById = useCallback(
    async (id: string): Promise<Property | null> => {
      try {
        console.log('🔍 Fetching property by ID:', id)
        const property = await millionAPI.getPropertyById(id)
        console.log('🏠 Property found:', {
          id: property?.id,
          name: property?.name,
          cover: property?.cover,
          media: property?.media,
          hasCover: !!property?.coverUrl,
          hasMedia: property?.media && property?.media.length > 0,
          coverUrl: property?.coverUrl,
          firstMediaUrl: property?.media?.[0]?.url,
        })
        return property
      } catch (err) {
        console.error('❌ Error fetching property by ID:', err)
        return null
      }
    },
    []
  )

  // NEW: Advanced search functionality
  const advancedSearch = useCallback(
    async (searchRequest: AdvancedSearchRequest) => {
      try {
        setLoading(true)
        setError(null)

        const response = await millionAPI.advancedSearch(searchRequest)

        // Convert PropertyListDto to Property for compatibility
        const convertedProperties = response.data.map(
          (item: any) =>
            ({
              ...item,
              ownerId: '', // PropertyListDto doesn't have ownerId
              description: '', // PropertyListDto doesn't have description
              codeInternal: '', // PropertyListDto doesn't have codeInternal
              year: 0, // PropertyListDto doesn't have year
              hasPool: false, // PropertyListDto doesn't have hasPool
              hasGarden: false, // PropertyListDto doesn't have hasGarden
              hasParking: false, // PropertyListDto doesn't have hasParking
              isFurnished: false, // PropertyListDto doesn't have isFurnished
              availableFrom: '', // PropertyListDto doesn't have availableTo
              availableTo: '', // PropertyListDto doesn't have availableTo
              status: 'Active' as const, // PropertyListDto doesn't have status
              media: [], // PropertyListDto doesn't have media
              createdAt: item.createdAt || new Date().toISOString(),
              updatedAt: item.createdAt || new Date().toISOString(), // Use createdAt as fallback
            }) as Property
        )
        setProperties(convertedProperties)
        setTotal(response.total)
        setCurrentPage(response.pagination.page)
        setTotalPages(response.pagination.totalPages)

        return response
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Advanced search failed')
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // NEW: Property status management
  const activateProperty = useCallback(
    async (id: string) => {
      try {
        await millionAPI.activateProperty(id)
        // Refresh properties to get updated status
        await fetchProperties()
        return true
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to activate property'
        )
        return false
      }
    },
    [fetchProperties]
  )

  const deactivateProperty = useCallback(
    async (id: string) => {
      try {
        await millionAPI.deactivateProperty(id)
        // Refresh properties to get updated status
        await fetchProperties()
        return true
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to deactivate property'
        )
        return false
      }
    },
    [fetchProperties]
  )

  return {
    properties,
    loading,
    error,
    initialLoading,
    total,
    currentPage,
    totalPages,
    filterProperties,
    getFilterOptions,
    loadMore,
    refresh,
    getPropertyById,
    fetchProperties,
    advancedSearch,
    activateProperty,
    deactivateProperty,
  }
}

export function useProperty(propertyId: string | null) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!propertyId) {
      setProperty(null)
      setLoading(false)
      return
    }

    const loadProperty = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log('🔍 useProperty: Loading property with ID:', propertyId)

        const foundProperty = await millionAPI.getPropertyById(propertyId)
        console.log('🏠 useProperty: Property loaded:', {
          id: foundProperty?.id,
          name: foundProperty?.name,
          cover: foundProperty?.cover,
          media: foundProperty?.media,
          hasCover: !!foundProperty?.coverUrl,
          hasMedia: foundProperty?.media && foundProperty?.media.length > 0,
          coverUrl: foundProperty?.coverUrl,
          firstMediaUrl: foundProperty?.media?.[0]?.url,
        })

        if (foundProperty) {
          setProperty(foundProperty)
        } else {
          setError('Property not found')
        }
      } catch (err) {
        console.error('❌ useProperty: Error loading property:', err)
        setError(err instanceof Error ? err.message : 'Failed to load property')
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [propertyId])

  return { property, loading, error }
}

// NEW: Hook for property traces/transaction history
export function usePropertyTraces(propertyId: string | null) {
  const [traces, setTraces] = useState<PropertyTrace[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTraces = useCallback(async () => {
    if (!propertyId) return

    try {
      setLoading(true)
      setError(null)

      const tracesData = await millionAPI.getPropertyTraces(propertyId)
      setTraces(tracesData)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch property traces'
      )
    } finally {
      setLoading(false)
    }
  }, [propertyId])

  useEffect(() => {
    fetchTraces()
  }, [fetchTraces])

  return { traces, loading, error, refetch: fetchTraces }
}

// NEW: Hook for property media management
export function usePropertyMedia(propertyId: string | null) {
  const [media, setMedia] = useState<MediaDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMedia = useCallback(async () => {
    if (!propertyId) return

    try {
      setLoading(true)
      setError(null)

      const mediaData = await millionAPI.getPropertyMedia(propertyId)
      setMedia(mediaData)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch property media'
      )
    } finally {
      setLoading(false)
    }
  }, [propertyId])

  const updateMedia = useCallback(
    async (mediaData: MediaPatchDto) => {
      if (!propertyId) return

      try {
        setLoading(true)
        setError(null)

        const updatedProperty = await millionAPI.updatePropertyMedia(
          propertyId,
          mediaData
        )
        // Refresh media after update
        await fetchMedia()
        return updatedProperty
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update property media'
        )
        throw err
      } finally {
        setLoading(false)
      }
    },
    [propertyId, fetchMedia]
  )

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  return { media, loading, error, updateMedia, refetch: fetchMedia }
}

// NEW: Hook for property statistics
export function usePropertyStats(filters?: {
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  city?: string
  propertyType?: string
}) {
  const [stats, setStats] = useState<PropertyStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const statsData = await millionAPI.getPropertyStats(filters)
      setStats(statsData)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch property statistics'
      )
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, loading, error, refetch: fetchStats }
}
