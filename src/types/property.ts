// Property Types
export type PropertyType =
  | 'Apartment'
  | 'House'
  | 'Villa'
  | 'Penthouse'
  | 'Townhouse'
  | 'Studio'
  | 'Condo'
  | 'Mansion'

export type PropertyStatus =
  | 'Active'
  | 'Sold'
  | 'OffMarket'
  | 'Pending'
  | 'Rented'

export type MediaType = 'Image' | 'Video'

export type SortField = 'name' | 'price' | 'year' | 'createdAt'
export type SortOrder = 'asc' | 'desc'

// Base Property Interface
export interface Property {
  id: string
  name: string
  description: string
  address: string
  city: string
  neighborhood?: string
  propertyType: PropertyType
  price: number
  size: number
  year?: number
  bedrooms: number
  bathrooms: number
  hasPool: boolean
  hasGarden: boolean
  hasParking: boolean
  isFurnished: boolean
  availableFrom?: string
  availableTo?: string
  status: PropertyStatus
  isActive: boolean
  codeInternal?: string
  cover?: MediaDto
  coverUrl?: string
  gallery: MediaDto[]
  ownerId: string
  createdAt: string
  updatedAt: string
}

// Property DTOs for API
export interface PropertyListDto {
  id: string
  name: string
  address: string
  city: string
  propertyType: PropertyType
  price: number
  size: number
  bedrooms: number
  bathrooms: number
  hasPool: boolean
  hasGarden: boolean
  hasParking: boolean
  isFurnished: boolean
  status: PropertyStatus
  cover?: MediaDto
  createdAt: string
}

export interface PropertyDetailDto extends Property {
  owner: OwnerDto
  traces: PropertyTrace[]
  mediaCount: number
  viewCount: number
  favoriteCount: number
}

export interface CreatePropertyRequest {
  name: string
  description: string
  address: string
  city: string
  neighborhood?: string
  propertyType: PropertyType
  price: number
  size: number
  year?: number
  bedrooms: number
  bathrooms: number
  hasPool: boolean
  hasGarden: boolean
  hasParking: boolean
  isFurnished: boolean
  availableFrom?: string
  availableTo?: string
  codeInternal?: string
}

export interface UpdatePropertyRequest extends Partial<CreatePropertyRequest> {
  status?: PropertyStatus
  isActive?: boolean
}

// Property Filters
export interface PropertyFilters {
  page?: number
  pageSize?: number
  search?: string
  city?: string
  neighborhood?: string
  propertyType?: PropertyType
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  minSize?: number
  maxSize?: number
  hasPool?: boolean
  hasGarden?: boolean
  hasParking?: boolean
  isFurnished?: boolean
  availableFrom?: string
  availableTo?: string
  status?: PropertyStatus
  isActive?: boolean
  sort?: string
}

// Advanced Search
export interface AdvancedSearchRequest {
  query?: string
  filters?: {
    city?: string
    propertyType?: PropertyType
    priceRange?: {
      min: number
      max: number
    }
    sizeRange?: {
      min: number
      max: number
    }
    rooms?: {
      minBedrooms?: number
      minBathrooms?: number
    }
    amenities?: {
      hasPool?: boolean
      hasGarden?: boolean
      hasParking?: boolean
      isFurnished?: boolean
    }
    availability?: {
      from?: string
      to?: string
    }
    status?: PropertyStatus
  }
  sort?: {
    field: SortField
    order: SortOrder
  }
  pagination?: {
    page: number
    pageSize: number
  }
}

// Property Traces (Transaction History)
export interface PropertyTrace {
  id: string
  propertyId: string
  action:
    | 'Created'
    | 'Updated'
    | 'Sold'
    | 'Rented'
    | 'PriceChanged'
    | 'StatusChanged'
    | 'MediaUpdated'
    | 'Activated'
    | 'Deactivated'
  previousValue?: any
  newValue?: any
  timestamp: string
  userId?: string
  notes?: string
  // Enhanced fields for display
  propertyName?: string
  price?: number
  status?: PropertyStatus
  formattedTimestamp?: string
  actionDisplayName?: string
  changeDescription?: string
}

// Media Management
export interface MediaDto {
  id: string
  url: string
  type: MediaType
  index: number
  enabled: boolean
  featured: boolean
  altText?: string
  caption?: string
  createdAt: string
}

export interface MediaPatchDto {
  cover?: {
    url: string
    type: MediaType
    index: number
  }
  gallery?: MediaDto[]
  notes?: string
}

export interface MediaReorderRequest {
  mediaIds: string[]
}

export interface MediaFeatureRequest {
  featured: boolean
}

export interface MediaEnableRequest {
  enabled: boolean
}

// Property Statistics
export interface PropertyStats {
  total: number
  active: number
  sold: number
  rented: number
  averagePrice: number
  medianPrice: number
  priceRange: {
    min: number
    max: number
  }
  byCity: Record<string, number>
  byType: Record<string, number>
  byStatus: Record<string, number>
  trends: MonthlyTrend[]
  priceTrends: PriceTrend[]
  amenities: AmenityStats
}

export interface MonthlyTrend {
  month: string
  count: number
  averagePrice: number
  newListings: number
  sold: number
  rented: number
}

export interface PriceTrend {
  period: string
  averagePrice: number
  priceChange: number
  priceChangePercentage: number
  transactionCount: number
}

export interface AmenityStats {
  withPool: number
  withGarden: number
  withParking: number
  furnished: number
  poolPremium: number
  gardenPremium: number
  parkingPremium: number
}

// Search Analytics
export interface SearchAnalytics {
  query: string
  totalResults: number
  searchTime: number
  filters: Record<string, any>
  suggestions: string[]
  popularSearches: string[]
}

// API Response Types
export interface PropertyResponse {
  items: PropertyListDto[]
  total: number
  page: number
  pageSize: number
}

export interface PagedResult<T> {
  data: T[]
  pagination: PaginationInfo
  total: number
}

export interface PaginationInfo {
  page: number
  pageSize: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

// Search Suggestions
export interface SearchSuggestions {
  suggestions: string[]
  popular: string[]
  recent: string[]
}

// Property Timeline
export interface PropertyTimeline {
  propertyId: string
  traces: PropertyTrace[]
  milestones: TimelineMilestone[]
}

export interface TimelineMilestone {
  date: string
  event: string
  description: string
  type: 'creation' | 'update' | 'transaction' | 'media'
}
