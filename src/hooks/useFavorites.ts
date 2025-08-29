'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Property } from '@/types'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem('million_favorites')
        if (stored) {
          const parsedFavorites = JSON.parse(stored)
          setFavorites(parsedFavorites)
        }
      } catch (error) {
        console.error('Failed to load favorites:', error)
        // Clear corrupted favorites
        localStorage.removeItem('million_favorites')
      }
    }

    loadFavorites()
  }, [])

  // Save favorites to localStorage
  const saveFavorites = useCallback((newFavorites: Property[]) => {
    try {
      localStorage.setItem('million_favorites', JSON.stringify(newFavorites))
    } catch (error) {
      console.error('Failed to save favorites:', error)
    }
  }, [])

  // Add property to favorites
  const addToFavorites = useCallback(
    (property: Property) => {
      setFavorites(prev => {
        const isAlreadyFavorite = prev.some(fav => fav.id === property.id)
        if (isAlreadyFavorite) {
          return prev
        }

        const newFavorites = [...prev, property]
        saveFavorites(newFavorites)
        return newFavorites
      })
    },
    [saveFavorites]
  )

  // Remove property from favorites
  const removeFromFavorites = useCallback(
    (propertyId: string) => {
      setFavorites(prev => {
        const newFavorites = prev.filter(fav => fav.id !== propertyId)
        saveFavorites(newFavorites)
        return newFavorites
      })
    },
    [saveFavorites]
  )

  // Toggle favorite status
  const toggleFavorite = useCallback(
    (property: Property) => {
      setFavorites(prev => {
        const isFavorite = prev.some(fav => fav.id === property.id)

        if (isFavorite) {
          const newFavorites = prev.filter(fav => fav.id !== property.id)
          saveFavorites(newFavorites)
          return newFavorites
        } else {
          const newFavorites = [...prev, property]
          saveFavorites(newFavorites)
          return newFavorites
        }
      })
    },
    [saveFavorites]
  )

  // Check if property is in favorites
  const isFavorite = useCallback(
    (propertyId: string): boolean => {
      return favorites.some(fav => fav.id === propertyId)
    },
    [favorites]
  )

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([])
    localStorage.removeItem('million_favorites')
  }, [])

  // Get favorites count
  const favoritesCount = favorites.length

  return {
    favorites,
    loading,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  }
}
