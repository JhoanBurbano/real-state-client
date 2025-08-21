import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PropertyCard } from '@/components/ui/PropertyCard'

describe('PropertyCard', () => {
  it('renders price and address', () => {
    render(
      <PropertyCard property={{
        id: '1', price: 1234567, address: '123 Ocean', city: 'Miami', state: 'FL', zipCode: '33139',
        bedrooms: 3, bathrooms: 2, squareFeet: 2000, propertyType: 'house', status: 'active', description: '', features: [], images: ['https://picsum.photos/800'], agentId: 'a', createdAt: '', updatedAt: ''
      }} />
    )
    expect(screen.getByText(/Miami/)).toBeInTheDocument()
  })
})

