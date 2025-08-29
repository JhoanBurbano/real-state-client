// API Utilities for Million Real Estate API
// Based on RFC 7807 Problem Details and API documentation

// Utility function for combining class names
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

import type { ApiError } from '@/types'
import { API_CONFIG } from '@/lib/config/api'

/**
 * Parse API error response according to RFC 7807
 */
export function parseApiError(error: any): ApiError {
  if (error && typeof error === 'object' && 'status' in error) {
    return error as ApiError
  }

  // Default error structure
  return {
    type: API_CONFIG.ERROR_TYPES.INTERNAL_SERVER_ERROR,
    title: 'Unknown Error',
    status: 500,
    detail: error?.message || 'An unexpected error occurred',
    instance: '/unknown',
    timestamp: new Date().toISOString(),
  }
}

/**
 * Get user-friendly error message from API error
 */
export function getErrorMessage(error: ApiError | any): string {
  const apiError = parseApiError(error)

  // Map common error types to user-friendly messages
  switch (apiError.status) {
    case 400:
      return (
        apiError.detail ||
        'Invalid request. Please check your input and try again.'
      )
    case 401:
      return 'You are not authorized to perform this action. Please log in and try again.'
    case 403:
      return 'Access denied. You do not have permission to perform this action.'
    case 404:
      return 'The requested resource was not found.'
    case 429:
      return 'Too many requests. Please wait a moment and try again.'
    case 500:
      return 'Server error. Please try again later.'
    default:
      return (
        apiError.detail || 'An unexpected error occurred. Please try again.'
      )
  }
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error: ApiError | any): boolean {
  const apiError = parseApiError(error)
  return apiError.status === 400
}

/**
 * Get validation errors for specific fields
 */
export function getFieldErrors(
  error: ApiError | any
): Record<string, string[]> {
  // For now, return empty object since ApiError doesn't have field-level errors
  // This can be extended when the backend provides field-level validation errors
  return {}
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Format property size
 */
export function formatSize(size: number, unit: string = 'sqm'): string {
  return `${size.toLocaleString()} ${unit}`
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format date and time for display
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Get property status display text
 */
export function getPropertyStatusText(status: string): string {
  switch (status) {
    case 'Active':
      return 'Available'
    case 'Sold':
      return 'Sold'
    case 'OffMarket':
      return 'Off Market'
    case 'Pending':
      return 'Pending'
    default:
      return status
  }
}

/**
 * Get property status color
 */
export function getPropertyStatusColor(status: string): string {
  switch (status) {
    case 'Active':
      return 'green'
    case 'Sold':
      return 'red'
    case 'OffMarket':
      return 'gray'
    case 'Pending':
      return 'yellow'
    default:
      return 'blue'
  }
}

/**
 * Validate property data according to API rules
 */
export function validatePropertyData(data: any): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Required fields
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Property name is required')
  } else if (data.name.length > API_CONFIG.VALIDATION.NAME_MAX_LENGTH) {
    errors.push(
      `Property name cannot exceed ${API_CONFIG.VALIDATION.NAME_MAX_LENGTH} characters`
    )
  }

  if (!data.address || data.address.trim().length === 0) {
    errors.push('Property address is required')
  } else if (data.address.length > API_CONFIG.VALIDATION.ADDRESS_MAX_LENGTH) {
    errors.push(
      `Property address cannot exceed ${API_CONFIG.VALIDATION.ADDRESS_MAX_LENGTH} characters`
    )
  }

  if (!data.city || data.city.trim().length === 0) {
    errors.push('City is required')
  } else if (data.city.length > API_CONFIG.VALIDATION.CITY_MAX_LENGTH) {
    errors.push(
      `City cannot exceed ${API_CONFIG.VALIDATION.CITY_MAX_LENGTH} characters`
    )
  }

  if (!data.propertyType || data.propertyType.trim().length === 0) {
    errors.push('Property type is required')
  } else if (
    data.propertyType.length > API_CONFIG.VALIDATION.PROPERTY_TYPE_MAX_LENGTH
  ) {
    errors.push(
      `Property type cannot exceed ${API_CONFIG.VALIDATION.PROPERTY_TYPE_MAX_LENGTH} characters`
    )
  }

  if (!data.price || data.price <= 0) {
    errors.push('Property price must be greater than 0')
  }

  // Optional fields validation
  if (
    data.description &&
    data.description.length > API_CONFIG.VALIDATION.DESCRIPTION_MAX_LENGTH
  ) {
    errors.push(
      `Description cannot exceed ${API_CONFIG.VALIDATION.DESCRIPTION_MAX_LENGTH} characters`
    )
  }

  if (
    data.neighborhood &&
    data.neighborhood.length > API_CONFIG.VALIDATION.NEIGHBORHOOD_MAX_LENGTH
  ) {
    errors.push(
      `Neighborhood cannot exceed ${API_CONFIG.VALIDATION.NEIGHBORHOOD_MAX_LENGTH} characters`
    )
  }

  if (data.bedrooms !== undefined) {
    if (
      data.bedrooms < API_CONFIG.VALIDATION.BEDROOMS_MIN ||
      data.bedrooms > API_CONFIG.VALIDATION.BEDROOMS_MAX
    ) {
      errors.push(
        `Bedrooms must be between ${API_CONFIG.VALIDATION.BEDROOMS_MIN} and ${API_CONFIG.VALIDATION.BEDROOMS_MAX}`
      )
    }
  }

  if (data.bathrooms !== undefined) {
    if (
      data.bathrooms < API_CONFIG.VALIDATION.BATHROOMS_MIN ||
      data.bathrooms > API_CONFIG.VALIDATION.BATHROOMS_MAX
    ) {
      errors.push(
        `Bathrooms must be between ${API_CONFIG.VALIDATION.BATHROOMS_MIN} and ${API_CONFIG.VALIDATION.BATHROOMS_MAX}`
      )
    }
  }

  if (data.size !== undefined && data.size < 0) {
    errors.push('Property size cannot be negative')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Generate correlation ID for request tracing
 */
export function generateCorrelationId(): string {
  return `corr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Sanitize search query
 */
export function sanitizeSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, API_CONFIG.SEARCH.MAX_QUERY_LENGTH)
}

/**
 * Build search filters object
 */
export function buildSearchFilters(
  filters: Record<string, any>
): Record<string, any> {
  const cleanFilters: Record<string, any> = {}

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          cleanFilters[key] = value
        }
      } else {
        cleanFilters[key] = value
      }
    }
  })

  return cleanFilters
}

/**
 * Format property amenities for display
 */
export function formatAmenities(property: any): string[] {
  const amenities: string[] = []

  if (property.hasPool) amenities.push('Swimming Pool')
  if (property.hasGarden) amenities.push('Garden')
  if (property.hasParking) amenities.push('Parking')
  if (property.isFurnished) amenities.push('Furnished')

  return amenities
}

/**
 * Get property image URL with fallback
 */
export function getPropertyImageUrl(property: any, index: number = 0): string {
  if (index === 0 && property.coverUrl) {
    return property.cover.url
  }

  if (property.media && property.media[index - 1]?.url) {
    return property.media[index - 1].url
  }

  // Fallback image
  return ''
}

/**
 * Check if property has media
 */
export function hasPropertyMedia(property: any): boolean {
  return !!(property.coverUrl || (property.media && property.media.length > 0))
}

/**
 * Get property media count
 */
export function getPropertyMediaCount(property: any): number {
  let count = 0
  if (property.coverUrl) count++
  if (property.media) count += property.media.length
  return count
}
