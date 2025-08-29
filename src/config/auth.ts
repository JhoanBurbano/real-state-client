// Authentication configuration

export const authConfig = {
  // API Base URLs
  baseUrl:
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_DEV_URL
      : process.env.NEXT_PUBLIC_API_BASE_URL ||
        'https://million-real-estate-api-sh25jnp3aa-uc.a.run.app',
  localUrl: 'http://localhost:5209',

  // Endpoints
  endpoints: {
    login: '/auth/owner/login',
    refresh: '/auth/owner/refresh',
    logout: '/auth/owner/logout',
  },

  // Token configuration
  token: {
    // Consider token expired 5 minutes before actual expiry
    expiryBuffer: 5 * 60 * 1000, // 5 minutes in milliseconds
    // Check token expiry every minute
    checkInterval: 60 * 1000, // 1 minute in milliseconds
  },

  // Demo credentials
  demoCredentials: {
    'sarah-johnson': {
      email: 'sarah.johnson@millionrealestate.com',
      password: 'test1234',
      role: 'CEO & Founder',
    },
    'michael-chen': {
      email: 'michael.chen@millionrealestate.com',
      password: 'test1234',
      role: 'Head of Sales',
    },
    'david-thompson': {
      email: 'david.thompson@millionrealestate.com',
      password: 'test1234',
      role: 'Investment Advisor',
    },
  },

  // Error messages
  errors: {
    loginFailed: 'Login failed. Please check your credentials.',
    tokenRefreshFailed: 'Token refresh failed. Please log in again.',
    unauthorized: 'You are not authorized to access this resource.',
    accountLocked: 'Account temporarily locked. Please try again later.',
    networkError: 'Network error. Please check your connection.',
    validationFailed: 'Please fill in all required fields.',
  },
}

// Environment check
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'

// Get appropriate base URL based on environment
export const getApiBaseUrl = () => {
  if (isDevelopment && process.env.NEXT_PUBLIC_USE_LOCAL_API === 'true') {
    return authConfig.localUrl
  }
  return authConfig.baseUrl
}
