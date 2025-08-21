"use client"
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { fetchProperties, type Property, type PropertyFilters } from '@/lib/api/client'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { FilterBar } from '@/components/modules/FilterBar'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'

export default function HomePage() {
  const [filters, setFilters] = useState<PropertyFilters>({ page: 1, limit: 12, sortBy: 'price', sortOrder: 'desc' })
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 60_000
  })

  const properties: Property[] = data?.data ?? []

  return (
    <main id="main" className="min-h-screen px-4 md:px-8 lg:px-12 py-8">
      <FilterBar value={filters} onChange={setFilters} isLoading={isFetching} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6" aria-live="polite" aria-busy>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <EmptyState title="No listings found" description="Try adjusting your filters or search criteria." />
      ) : (
        <section aria-label="Property listings" className="mt-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
            {properties.map((p) => (
              <li key={p.id}>
                <PropertyCard property={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

