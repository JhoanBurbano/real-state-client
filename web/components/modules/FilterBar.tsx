"use client"
import { useEffect, useMemo, useState } from 'react'
import type { PropertyFilters } from '@/lib/api/client'

function useDebounced<T>(value: T, delay = 400) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return v
}

export function FilterBar({ value, onChange, isLoading }: { value: PropertyFilters; onChange: (v: PropertyFilters) => void; isLoading?: boolean }) {
  const [local, setLocal] = useState<PropertyFilters>(value)
  const debounced = useDebounced(local, 500)

  useEffect(() => {
    onChange({ ...value, ...debounced, page: 1 })
  }, [debounced, onChange, value])

  return (
    <aside className="sticky top-2 z-10 bg-surface-elev/90 backdrop-blur supports-backdrop-blur:border border-line/30 rounded-xl p-4" aria-label="Filters">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <label className="block">
          <span className="block text-sm text-text-muted mb-1">Search</span>
          <input
            type="text"
            value={local.search ?? ''}
            onChange={(e) => setLocal((p) => ({ ...p, search: e.target.value }))}
            className="w-full rounded-md border border-line/40 bg-bg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Search by name or address"
          />
        </label>
        <label className="block">
          <span className="block text-sm text-text-muted mb-1">Min price</span>
          <input
            type="number"
            inputMode="numeric"
            value={local.minPrice ?? ''}
            onChange={(e) => setLocal((p) => ({ ...p, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
            className="w-full rounded-md border border-line/40 bg-bg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Minimum price"
            aria-describedby="price-help"
          />
        </label>
        <label className="block">
          <span className="block text-sm text-text-muted mb-1">Max price</span>
          <input
            type="number"
            inputMode="numeric"
            value={local.maxPrice ?? ''}
            onChange={(e) => setLocal((p) => ({ ...p, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
            className="w-full rounded-md border border-line/40 bg-bg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Maximum price"
          />
        </label>
        <label className="block">
          <span className="block text-sm text-text-muted mb-1">Sort</span>
          <select
            value={`${local.sortBy ?? 'price'}:${local.sortOrder ?? 'desc'}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split(':') as [string, 'asc' | 'desc']
              setLocal((p) => ({ ...p, sortBy, sortOrder }))
            }}
            className="w-full rounded-md border border-line/40 bg-bg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Sort results"
          >
            <option value="price:desc">Price: High to Low</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="address:asc">Name: A-Z</option>
            <option value="address:desc">Name: Z-A</option>
          </select>
        </label>
      </div>
      <p id="price-help" className="sr-only">Use number inputs to set price range for accessibility.</p>
      {isLoading && <div role="status" aria-live="polite" className="mt-2 text-sm text-text-muted">Loading results…</div>}
    </aside>
  )
}

