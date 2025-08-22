'use client'

import { useState } from 'react'
import { X, DollarSign, Bed, Bath, MapPin, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useProperties } from '@/hooks/useProperties'

interface FilterBarProps {
  filters: {
    minPrice: string
    maxPrice: string
    bedrooms: string
    bathrooms: string
    propertyType: string
    location: string
  }
  onFilterChange: (filters: any) => void
  onClose: () => void
}

export function FilterBar({
  filters,
  onFilterChange,
  onClose,
}: FilterBarProps) {
  const [localFilters, setLocalFilters] = useState(filters)
  const { getFilterOptions } = useProperties()
  const filterOptions = getFilterOptions()

  const handleInputChange = (field: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
    onClose()
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      location: '',
    }
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const handleReset = () => {
    setLocalFilters(filters)
  }

  return (
    <div className="bg-surface-elev border-b border-line/20 shadow-luxury-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-h5 font-semibold text-text">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Price Range */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min Price"
                value={localFilters.minPrice}
                onChange={e => handleInputChange('minPrice', e.target.value)}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max Price"
                value={localFilters.maxPrice}
                onChange={e => handleInputChange('maxPrice', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text flex items-center gap-2">
              <Bed className="h-4 w-4" />
              Bedrooms
            </label>
            <select
              value={localFilters.bedrooms}
              onChange={e => handleInputChange('bedrooms', e.target.value)}
              className="w-full px-3 py-2 border border-line rounded-md focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            >
              <option value="">All Bedrooms</option>
              {filterOptions.bedroomOptions.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bathrooms */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text flex items-center gap-2">
              <Bath className="h-4 w-4" />
              Bathrooms
            </label>
            <select
              value={localFilters.bathrooms}
              onChange={e => handleInputChange('bathrooms', e.target.value)}
              className="w-full px-3 py-2 border border-line rounded-md focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            >
              <option value="">All Bathrooms</option>
              {filterOptions.bathroomOptions.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text flex items-center gap-2">
              <Home className="h-4 w-4" />
              Property Type
            </label>
            <select
              value={localFilters.propertyType}
              onChange={e => handleInputChange('propertyType', e.target.value)}
              className="w-full px-3 py-2 border border-line rounded-md focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            >
              <option value="">All Types</option>
              {filterOptions.propertyTypes.map((type: any) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </label>
            <select
              value={localFilters.location}
              onChange={e => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-line rounded-md focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            >
              <option value="">All Locations</option>
              {filterOptions.locations.map((location: any) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-line/20">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            Clear All
          </Button>
          <Button size="sm" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
