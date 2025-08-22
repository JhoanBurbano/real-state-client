export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  squareFeet: number
  status: 'forSale' | 'forRent' | 'sold' | 'rented' | 'pending'
  type: 'apartment' | 'house' | 'villa' | 'penthouse' | 'townhouse' | 'studio'
  images: string[]
  features: string[]
  amenities: string[]
  agent: Agent
  createdAt: string
  updatedAt: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  rating?: number
  experience: number
  specialties: string[]
  properties: string[]
  bio: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
  agentId?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  createdAt: string
  updatedAt: string
}

export interface PropertyFilters {
  priceRange: [number, number]
  bedrooms: number[]
  bathrooms: number[]
  propertyType: string[]
  location: string[]
  status: string[]
  features: string[]
}

export interface FilterOptions {
  priceRanges: Array<{ label: string; value: [number, number] }>
  bedroomOptions: Array<{ label: string; value: number }>
  bathroomOptions: Array<{ label: string; value: number }>
  propertyTypes: Array<{ label: string; value: string }>
  locations: Array<{ label: string; value: string }>
  statuses: Array<{ label: string; value: string }>
  features: Array<{ label: string; value: string }>
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SearchParams {
  query?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Partial<PropertyFilters>
}
