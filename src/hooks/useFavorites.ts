'use client'

import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'million-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch {
        setFavorites([])
      }
    }
  }, [])

  const addFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, propertyId]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const removeFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((id) => id !== propertyId)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const toggleFavorite = (propertyId: string) => {
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId)
    } else {
      addFavorite(propertyId)
    }
  }

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId)
  }

  const clearFavorites = () => {
    setFavorites([])
    localStorage.removeItem(FAVORITES_KEY)
  }

  const getFavoritesCount = () => {
    return favorites.length
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesCount,
  }
}
