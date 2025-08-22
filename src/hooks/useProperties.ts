'use client'

import { useState, useEffect } from 'react'
import { MOCK_PROPERTIES } from '../data/mockData'
import type { Property, PropertyFilters, FilterOptions } from '../types/property'

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setProperties(MOCK_PROPERTIES)
      } catch (err) {
        console.error(err)
        setError('Failed to load properties')
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  const getProperty = (id: string): Property | undefined => {
    return properties.find(property => property.id === id)
  }

  const filterProperties = (filters: Partial<PropertyFilters>): Property[] => {
    return properties.filter(property => {
      if (filters.priceRange) {
        const [min, max] = filters.priceRange
        if (property.price < min || property.price > max) return false
      }

      if (filters.bedrooms && filters.bedrooms.length > 0) {
        if (!filters.bedrooms.includes(property.bedrooms)) return false
      }

      if (filters.bathrooms && filters.bathrooms.length > 0) {
        if (!filters.bathrooms.includes(property.bathrooms)) return false
      }

      if (filters.propertyType && filters.propertyType.length > 0) {
        if (!filters.propertyType.includes(property.type)) return false
      }

      if (filters.location && filters.location.length > 0) {
        if (
          !filters.location.some(loc =>
            property.location.toLowerCase().includes(loc.toLowerCase())
          )
        )
          return false
      }

      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(property.status)) return false
      }

      if (filters.features && filters.features.length > 0) {
        if (
          !filters.features.some(feature => property.features.includes(feature))
        )
          return false
      }

      return true
    })
  }

  const searchProperties = (query: string): Property[] => {
    if (!query.trim()) return properties

    const searchTerm = query.toLowerCase()
    return properties.filter(
      property =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm) ||
        property.type.toLowerCase().includes(searchTerm)
    )
  }

  const getFilterOptions = (): FilterOptions => {
    const priceRanges = [
      { label: 'Under $500K', value: [0, 500000] as [number, number] },
      { label: '$500K - $1M', value: [500000, 1000000] as [number, number] },
      { label: '$1M - $2M', value: [1000000, 2000000] as [number, number] },
      { label: '$2M - $5M', value: [2000000, 5000000] as [number, number] },
      { label: 'Over $5M', value: [5000000, Infinity] as [number, number] },
    ]

    const bedroomOptions = [
      { label: '1+', value: 1 },
      { label: '2+', value: 2 },
      { label: '3+', value: 3 },
      { label: '4+', value: 4 },
      { label: '5+', value: 5 },
    ]

    const bathroomOptions = [
      { label: '1+', value: 1 },
      { label: '2+', value: 2 },
      { label: '3+', value: 3 },
      { label: '4+', value: 4 },
      { label: '5+', value: 5 },
    ]

    const propertyTypes = [
      { label: 'Apartment', value: 'apartment' },
      { label: 'House', value: 'house' },
      { label: 'Villa', value: 'villa' },
      { label: 'Penthouse', value: 'penthouse' },
      { label: 'Townhouse', value: 'townhouse' },
      { label: 'Studio', value: 'studio' },
    ]

    const locations = Array.from(new Set(properties.map(p => p.location))).map(
      location => ({
        label: location,
        value: location,
      })
    )

    const statuses = [
      { label: 'For Sale', value: 'forSale' },
      { label: 'For Rent', value: 'forRent' },
      { label: 'Sold', value: 'sold' },
      { label: 'Rented', value: 'rented' },
      { label: 'Pending', value: 'pending' },
    ]

    const features = Array.from(
      new Set(properties.flatMap(p => p.features))
    ).map(feature => ({
      label: feature,
      value: feature,
    }))

    return {
      priceRanges,
      bedroomOptions,
      bathroomOptions,
      propertyTypes,
      locations,
      statuses,
      features,
    }
  }

  return {
    properties,
    loading,
    error,
    getProperty,
    filterProperties,
    searchProperties,
    getFilterOptions,
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

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const foundProperty = MOCK_PROPERTIES.find(p => p.id === propertyId)
        if (foundProperty) {
          setProperty(foundProperty)
        } else {
          setError('Property not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load property')
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [propertyId])

  return { property, loading, error }
}
