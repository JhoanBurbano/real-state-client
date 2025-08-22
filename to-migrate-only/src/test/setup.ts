import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(callback => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(callback => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock Supabase environment variables
vi.mock('@/utils/supabase/info', () => ({
  projectId: 'test-project',
  publicAnonKey: 'test-key',
}))

// Mock API service
vi.mock('@/utils/api', () => ({
  apiService: {
    getProperties: vi.fn().mockResolvedValue({
      data: [
        {
          id: 'test-1',
          price: 1000000,
          address: '123 Test St',
          city: 'Miami Beach',
          state: 'FL',
          zipCode: '33139',
          bedrooms: 3,
          bathrooms: 2,
          squareFeet: 2000,
          propertyType: 'house',
          status: 'active',
          description: 'Test property',
          features: ['Pool', 'Ocean View'],
          images: ['/test-image.jpg'],
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    }),
    getProperty: vi.fn().mockResolvedValue({
      data: {
        id: 'test-1',
        price: 1000000,
        address: '123 Test St',
        city: 'Miami Beach',
        state: 'FL',
        zipCode: '33139',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 2000,
        propertyType: 'house',
        status: 'active',
        description: 'Test property',
        features: ['Pool', 'Ocean View'],
        images: ['/test-image.jpg'],
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      agent: {
        id: 'agent-1',
        firstName: 'Test',
        lastName: 'Agent',
        email: 'test@million.com',
        phone: '305-555-0123',
        title: 'Test Agent',
        bio: 'Test bio',
        photo: '/test-agent.jpg',
        licenseNumber: 'FL123456',
        specialties: ['Luxury'],
        isActive: true,
      },
    }),
    createLead: vi.fn().mockResolvedValue({
      data: { id: 'lead-1', status: 'new' },
    }),
    isFavorite: vi.fn().mockReturnValue(false),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    getFavorites: vi.fn().mockReturnValue([]),
  },
}))

// Mock SWR
vi.mock('swr', () => ({
  default: vi.fn((key, fetcher) => ({
    data: null,
    error: null,
    isLoading: false,
    isValidating: false,
    mutate: vi.fn(),
  })),
}))

// Global test utilities
global.testUtils = {
  mockProperty: {
    id: 'test-1',
    price: 1000000,
    address: '123 Test St',
    city: 'Miami Beach',
    state: 'FL',
    zipCode: '33139',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2000,
    propertyType: 'house' as const,
    status: 'active' as const,
    description: 'Test property description',
    features: ['Pool', 'Ocean View'],
    images: ['/test-image.jpg'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
}
