import { ENV_CONFIG } from './environment'

// API Configuration based on environment variables
export const API_CONFIG = {
  BASE_URL: ENV_CONFIG.API.BASE_URL,
  DEVELOPMENT_URL: ENV_CONFIG.API.DEV_URL,

  // Endpoints
  ENDPOINTS: {
    // Health & Status
    HEALTH_LIVE: '/health/live',
    HEALTH_READY: '/health/ready',

    // Authentication
    AUTH_LOGIN: '/auth/login',
    AUTH_REFRESH: '/auth/refresh',
    AUTH_LOGOUT: '/auth/logout',

    // Properties
    PROPERTIES: '/properties',
    PROPERTY_BY_ID: (id: string) => `/properties/${id}`,
    PROPERTY_ACTIVATE: (id: string) => `/properties/${id}/activate`,
    PROPERTY_DEACTIVATE: (id: string) => `/properties/${id}/deactivate`,
    PROPERTY_MEDIA: (id: string) => `/properties/${id}/media`,
    PROPERTY_TRACES: (id: string) => `/properties/${id}/traces`,

    // Search
    PROPERTIES_SEARCH: '/properties/search',

    // Statistics
    PROPERTY_STATS: '/stats/properties',

    // Owners
    OWNERS: '/owners',
    OWNER_PROFILE: '/owners/profile',

    // Webhooks
    WEBHOOKS: '/webhooks',
    WEBHOOK_PROPERTY_UPDATED: '/webhooks/property-updated',

    // Metrics
    METRICS: '/metrics',
  },

  // Rate Limiting
  RATE_LIMITS: {
    DEFAULT: 100,
    AUTH: 10,
    PROPERTIES: 200,
    SEARCH: 300,
    WEBHOOKS: 100,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    MIN_PAGE_SIZE: 1,
  },

  // Sorting Options
  SORT_OPTIONS: {
    PRICE_ASC: 'price',
    PRICE_DESC: '-price',
    DATE_ASC: 'createdAt',
    DATE_DESC: '-createdAt',
    SIZE_ASC: 'size',
    SIZE_DESC: '-size',
    BEDROOMS_ASC: 'bedrooms',
    BEDROOMS_DESC: '-bedrooms',
    BATHROOMS_ASC: 'bathrooms',
    BATHROOMS_DESC: '-bathrooms',
  },

  // Property Types
  PROPERTY_TYPES: [
    'Apartment',
    'House',
    'Villa',
    'Penthouse',
    'Townhouse',
    'Studio',
    'Condo',
    'Mansion',
  ],

  // Property Status
  PROPERTY_STATUS: {
    ACTIVE: 'Active',
    SOLD: 'Sold',
    OFF_MARKET: 'OffMarket',
    PENDING: 'Pending',
  },

  // Media Types
  MEDIA_TYPES: {
    IMAGE: 'Image',
    VIDEO: 'Video',
  },

  // Validation Rules
  VALIDATION: {
    NAME_MAX_LENGTH: 100,
    ADDRESS_MAX_LENGTH: 200,
    CITY_MAX_LENGTH: 50,
    NEIGHBORHOOD_MAX_LENGTH: 100,
    PROPERTY_TYPE_MAX_LENGTH: 50,
    DESCRIPTION_MAX_LENGTH: 1000,
    CODE_INTERNAL_MAX_LENGTH: 20,
    YEAR_MIN: 1800,
    YEAR_MAX: new Date().getFullYear() + 1,
    SIZE_MIN: 1,
    SIZE_MAX: 100000,
    BEDROOMS_MIN: 0,
    BEDROOMS_MAX: 20,
    BATHROOMS_MIN: 1,
    BATHROOMS_MAX: 20,
    PRICE_MIN: 0,
    PRICE_MAX: 1000000000,
    GALLERY_MAX_IMAGES: 12,
  },

  // Error Types (RFC 7807)
  ERROR_TYPES: {
    VALIDATION_ERROR: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
    UNAUTHORIZED: 'https://tools.ietf.org/html/rfc7235#section-3.1',
    FORBIDDEN: 'https://tools.ietf.org/html/rfc7231#section-6.5.3',
    NOT_FOUND: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
    CONFLICT: 'https://tools.ietf.org/html/rfc7231#section-6.5.8',
    INTERNAL_SERVER_ERROR: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
  },

  // HTTP Status Codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  },

  // CORS Configuration
  CORS: {
    ALLOWED_ORIGINS: [ENV_CONFIG.APP.URL, 'https://million-realestate.com'],
    ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    ALLOWED_HEADERS: ['Content-Type', 'Authorization', 'X-Correlation-ID'],
    ALLOW_CREDENTIALS: false,
  },

  // Cache Configuration
  CACHE: {
    PROPERTIES: 300, // 5 minutes
    PROPERTY_DETAIL: 600, // 10 minutes
    SEARCH_RESULTS: 180, // 3 minutes
    USER_PROFILE: 1800, // 30 minutes
  },

  // File Upload
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'],
    THUMBNAIL_SIZE: { width: 300, height: 200 },
  },

  // Search Configuration
  SEARCH: {
    MIN_QUERY_LENGTH: 2,
    MAX_QUERY_LENGTH: 100,
    FUZZY_MATCH_THRESHOLD: 0.7,
    MAX_RESULTS: 1000,
  },

  // Notification Settings
  NOTIFICATIONS: {
    EMAIL_ENABLED: false,
    PUSH_ENABLED: false,
    WEBHOOK_ENABLED: true,
  },
}

// Get environment-specific configuration
export const getApiConfig = () => {
  return {
    ...API_CONFIG,
    BASE_URL: ENV_CONFIG.ENV.IS_DEVELOPMENT
      ? ENV_CONFIG.API.DEV_URL
      : ENV_CONFIG.API.BASE_URL,
  }
}

// Export default config
export default getApiConfig()
