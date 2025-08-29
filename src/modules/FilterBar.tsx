'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { PropertyFilters } from '@/types/property'

interface FilterBarProps {
  filters: Partial<PropertyFilters>
  onFiltersChange: (filters: Partial<PropertyFilters>) => void
  onClear: () => void
}

export function FilterBar({
  filters,
  onFiltersChange,
  onClear,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters = Object.values(filters).some(value =>
    Array.isArray(value)
      ? value.length > 0
      : value !== undefined && value !== ''
  )

  const getActiveFiltersCount = () => {
    let count = 0
    if (
      (filters.minPrice !== undefined && filters.minPrice > 0) ||
      (filters.maxPrice !== undefined && filters.maxPrice < 10000000)
    )
      count++
    if (filters.propertyType) count++
    if (filters.bedrooms !== undefined) count++
    if (filters.bathrooms !== undefined) count++
    if (filters.city) count++
    return count
  }

  const handleFilterChange = (
    key: keyof PropertyFilters,
    value: string | number | (string | number)[]
  ) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleFilter = (key: keyof PropertyFilters, value: string | number) => {
    // For single value filters, just set the value
    handleFilterChange(key, value)
  }

  return (
    <div className="bg-surface-elev border border-line rounded-lg p-4 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-text-muted" />
          <h3 className="font-semibold text-text">Filters</h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </div>

      {/* Filters Content */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-medium text-text mb-3">Price Range</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-muted mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  value={filters.minPrice || 0}
                  onChange={e =>
                    handleFilterChange(
                      'minPrice',
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-line rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  value={filters.maxPrice || 10000000}
                  onChange={e =>
                    handleFilterChange(
                      'maxPrice',
                      parseInt(e.target.value) || 10000000
                    )
                  }
                  className="w-full px-3 py-2 border border-line rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="10000000"
                />
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h4 className="font-medium text-text mb-3">Property Type</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'apartment',
                'house',
                'villa',
                'penthouse',
                'townhouse',
                'studio',
              ].map(type => (
                <Button
                  key={type}
                  variant={
                    filters.propertyType === type ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => toggleFilter('propertyType', type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <h4 className="font-medium text-text mb-3">Bedrooms</h4>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, '5+'].map(beds => (
                <Button
                  key={beds}
                  variant={filters.bedrooms === beds ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleFilter('bedrooms', beds)}
                >
                  {beds}
                </Button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <h4 className="font-medium text-text mb-3">Bathrooms</h4>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, '4+'].map(baths => (
                <Button
                  key={baths}
                  variant={filters.bathrooms === baths ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleFilter('bathrooms', baths)}
                >
                  {baths}
                </Button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-medium text-text mb-3">Location</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'New York',
                'Los Angeles',
                'Miami',
                'Chicago',
                'Las Vegas',
                'San Francisco',
              ].map(city => (
                <Button
                  key={city}
                  variant={filters.city === city ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleFilter('city', city)}
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
