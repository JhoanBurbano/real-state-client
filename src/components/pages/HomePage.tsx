'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, DollarSign, Home, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { FilterBar } from '@/modules/FilterBar'
import { useProperties } from '@/hooks/useProperties'
import { useFavorites } from '@/hooks/useFavorites'
import { EmptyState } from '@/components/ui/EmptyState'
import { PropertyCardSkeleton } from '@/components/ui/PropertySkeleton'
import type { PropertyFilters } from '@/types/property'
import { ImageWithFallback } from '../ui/ImageWithFallback'

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Partial<PropertyFilters>>({
    priceRange: [0, 10000000] as [number, number],
    propertyType: [],
    bedrooms: [],
    bathrooms: [],
    location: [],
  })

  const { properties, loading, error } = useProperties()
  const { favorites, toggleFavorite } = useFavorites()

  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice =
      property.price >= filters.priceRange![0] &&
      property.price <= filters.priceRange![1]

    const matchesType =
      !filters.propertyType?.length ||
      filters.propertyType.includes(property.type)
    const matchesBedrooms =
      !filters.bedrooms?.length || filters.bedrooms.includes(property.bedrooms)
    const matchesBathrooms =
      !filters.bathrooms?.length ||
      filters.bathrooms.includes(property.bathrooms)
    const matchesLocation =
      !filters.location?.length ||
      filters.location.some(loc =>
        property.location.toLowerCase().includes(loc.toLowerCase())
      )

    return (
      matchesSearch &&
      matchesPrice &&
      matchesType &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesLocation
    )
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        type="error"
        title="Something went wrong"
        subtitle="We're having trouble loading properties. Please try again later."
        actionText="Try Again"
        onAction={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-surface to-surface-elev py-20 lg:py-64">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt=""
            className="w-full h-full object-cover"
            role="presentation"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 text-center z-10 relative">
          <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-on-accent mb-6 max-w-2xl mx-auto">
            Exclusive South Florida Luxury Properties
          </h1>
          <p className="text-lg text-on-accent mb-8 max-w-2xl mx-auto font-semibold">
            Discover Miami's most prestigious waterfront estates, penthouses,
            and luxury condominiums in the world's most desirable locations.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by location, price, or property type"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>

          <Button size="lg" className="text-lg px-8 py-3">
            Explore Properties
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface-elev">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
                500+
              </div>
              <div className="text-text-muted">Properties</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
                50+
              </div>
              <div className="text-text-muted">Agents</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
                25+
              </div>
              <div className="text-text-muted">Cities</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
                15+
              </div>
              <div className="text-text-muted">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-text mb-4">
              Featured Properties
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Handpicked luxury residences for discerning buyers
            </p>
          </div>

          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            onClear={() => {
              setSearchQuery('')
              setFilters({
                priceRange: [0, 10000000] as [number, number],
                propertyType: [],
                bedrooms: [],
                bathrooms: [],
                location: [],
              })
            }}
          />

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <EmptyState
              type="noResults"
              title="No properties found"
              subtitle="Try adjusting your search criteria or filters to find more properties."
              actionText="Clear Filters"
              onAction={() => {
                setSearchQuery('')
                setFilters({
                  priceRange: [0, 10000000] as [number, number],
                  propertyType: [],
                  bedrooms: [],
                  bathrooms: [],
                  location: [],
                })
              }}
            />
          )}
        </div>
      </section>
    </div>
  )
}
