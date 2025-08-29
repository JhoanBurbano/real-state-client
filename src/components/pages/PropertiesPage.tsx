'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Filter, Grid3X3, List } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { FilterBar } from '@/modules/FilterBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { useProperties } from '@/hooks/useProperties'
import { useFavorites } from '@/hooks/useFavorites'
import type { PropertyFilters } from '@/types/property'
import { ApiDebugInfo } from '@/components/ui/ApiDebugInfo'

export function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Partial<PropertyFilters>>({})

  const {
    properties,
    loading,
    error,
    initialLoading,
    filterProperties,
    loadMore,
    currentPage,
    totalPages,
    // getFilterOptions,
  } = useProperties()
  const { favorites, toggleFavorite } = useFavorites()

  // Apply filters to loaded properties
  const filteredProperties = filterProperties(filters as any)

  // Apply search query to filtered properties
  const searchResults = searchQuery
    ? filteredProperties?.filter(
        property =>
          property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProperties

  const handleFiltersChange = (newFilters: Partial<PropertyFilters>) => {
    setFilters(newFilters)
    // Reset pagination when filters change
    // Note: In a real implementation, you would call the API with new filters
    // For now, we'll just update the local state
  }

  const clearFilters = () => {
    setFilters({})
    setSearchQuery('')
    // Reset pagination when clearing filters
    // Note: In a real implementation, you would reset to page 1
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-line rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-line rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            type="error"
            actionLabel="Try Again"
            onAction={() => window.location.reload()}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-text mb-4">
              Discover Your Dream Property
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Explore our curated collection of luxury properties in the most
              prestigious locations worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                type="text"
                placeholder="Search properties, locations, or features..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-surface-elev rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClear={clearFilters}
          // filterOptions={getFilterOptions()}
        />

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-text-muted">
            {searchResults.length} property
            {searchResults.length !== 1 ? 'ies' : 'y'} found
          </p>
          {Object.keys(filters).length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>

        {/* Properties Grid/List */}
        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2 text-accent">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
              <span>Loading properties...</span>
            </div>
          </div>
        )}

        {!loading && searchResults.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {searchResults.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                //isFavorite={favorites.includes(property.id)}
                //onToggleFavorite={() => toggleFavorite(property.id)}
              />
            ))}
          </div>
        ) : !loading ? (
          <EmptyState
            type="no-results"
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        ) : null}

        {/* Load More Button - Always show when there are more properties */}
        {!loading && searchResults.length > 0 && (
          <div className="text-center mt-8">
            {currentPage < totalPages ? (
              <>
                <Button
                  onClick={loadMore}
                  disabled={loading}
                  size="lg"
                  className="px-8"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    'Load More Properties'
                  )}
                </Button>
                <p className="text-sm text-text-muted mt-2">
                  Showing {searchResults.length} of {properties.length}{' '}
                  properties
                </p>
              </>
            ) : (
              <p className="text-sm text-text-muted">
                All {searchResults.length} properties loaded
              </p>
            )}
          </div>
        )}

        {/* Debug Information */}
        {/* <div className="mt-12">
          <ApiDebugInfo />
        </div> */}
      </div>
    </div>
  )
}
