'use client'

import { useState, Suspense } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { FilterBar } from '@/modules/FilterBar'
import { useHomeProperties } from '@/hooks/useHomeProperties'
// import { useFavorites } from '@/hooks/useFavorites'
import { EmptyState } from '@/components/ui/EmptyState'
import { PropertyCardSkeleton } from '@/components/ui/PropertySkeleton'
import type { PropertyFilters } from '@/types/property'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Partial<PropertyFilters>>({
    minPrice: 0,
    maxPrice: 10000000,
    propertyType: '',
    bedrooms: undefined,
    bathrooms: undefined,
    city: '',
  })

  const { properties, loading, error, loadMore, currentPage, totalPages } =
    useHomeProperties()
  // const { favorites, toggleFavorite } = useFavorites()

  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.codeInternal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice =
      property.price >= (filters.minPrice || 0) &&
      property.price <= (filters.maxPrice || 10000000)

    const matchesType =
      !filters.propertyType || filters.propertyType === property.propertyType

    const matchesBedrooms =
      !filters.bedrooms || filters.bedrooms === property.bedrooms

    const matchesBathrooms =
      !filters.bathrooms || filters.bathrooms === property.bathrooms

    const matchesLocation =
      !filters.city ||
      property.city.toLowerCase().includes(filters.city.toLowerCase())

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
        description="We're having trouble loading properties. Please try again later."
        actionLabel="Try Again"
        onAction={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-surface to-surface-elev py-20 lg:py-64">
        <div className="absolute inset-0">
          <Suspense
            fallback={
              <div className="w-full h-full bg-surface animate-pulse" />
            }
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt=""
              fill
              className="w-full h-full object-cover"
              role="presentation"
            />
          </Suspense>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 text-center z-10 relative">
          <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-on-accent mb-6 max-w-2xl mx-auto">
            Exclusive South Florida Luxury Properties
          </h1>
          <p className="text-lg text-on-accent mb-8 max-w-2xl mx-auto font-semibold">
            Discover Miami&apos;s most prestigious waterfront estates,
            penthouses, and luxury condominiums in the world&apos;s most
            desirable locations.
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
                minPrice: 0,
                maxPrice: 10000000,
                propertyType: '',
                bedrooms: undefined,
                bathrooms: undefined,
                city: '',
              })
            }}
          />

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Load More Button for Home */}
              {currentPage < totalPages && (
                <div className="text-center mt-8">
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
                    Showing {filteredProperties.length} of {properties.length}{' '}
                    properties
                  </p>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              type="no-results"
              title="No properties found"
              description="Try adjusting your search criteria or filters to find more properties."
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchQuery('')
                setFilters({
                  minPrice: 0,
                  maxPrice: 10000000,
                  propertyType: '',
                  bedrooms: undefined,
                  bathrooms: undefined,
                  city: '',
                })
              }}
            />
          )}
        </div>
      </section>
    </div>
  )
}
