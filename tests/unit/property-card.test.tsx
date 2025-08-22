import React from 'react'
import { render, screen } from '@testing-library/react'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { MOCK_PROPERTIES } from '@/data/mockData'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  },
}))

describe('PropertyCard', () => {
  const mockProperty = MOCK_PROPERTIES[0]

  it('renders property information correctly', () => {
    render(<PropertyCard property={mockProperty} />)
    
    expect(screen.getByText(mockProperty.title)).toBeInTheDocument()
    expect(screen.getByText(mockProperty.location)).toBeInTheDocument()
    expect(screen.getByText(`${mockProperty.bedrooms}`)).toBeInTheDocument()
    expect(screen.getByText(`${mockProperty.bathrooms}`)).toBeInTheDocument()
  })

  it('has view and contact buttons', () => {
    render(<PropertyCard property={mockProperty} />)
    
    expect(screen.getByText('View Details')).toBeInTheDocument()
    expect(screen.getByText('Contact Agent')).toBeInTheDocument()
  })

  it('displays property type badge', () => {
    render(<PropertyCard property={mockProperty} />)
    
    expect(screen.getByText(mockProperty.type)).toBeInTheDocument()
  })
})
