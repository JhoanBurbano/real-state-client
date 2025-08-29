// Environment configuration for Million Real Estate
export const ENV_CONFIG = {
  // API Configuration
  API: {
    BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      'https://million-real-estate-api-sh25jnp3aa-uc.a.run.app',
    DEV_URL: process.env.NEXT_PUBLIC_API_DEV_URL || 'http://localhost:5208',
  },

  // App Configuration
  APP: {
    URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    NAME: 'MILLION Luxury Real Estate',
    VERSION: '1.0.0',
  },

  // Environment
  ENV: {
    IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    IS_TEST: process.env.NODE_ENV === 'test',
  },

  // Features
  FEATURES: {
    ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
    ENABLE_MOCK_DATA: process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === 'true',
  },

  // External Services
  SERVICES: {
    GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    VERCEL_BLOB_TOKEN: process.env.VERCEL_BLOB_READ_WRITE_TOKEN,
  },

  // Database (if needed)
  DATABASE: {
    URL: process.env.DATABASE_URL,
  },

  // Authentication (if needed)
  AUTH: {
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  },

  // Email (if needed)
  EMAIL: {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  },
}

// Helper functions
export const isDevelopment = () => ENV_CONFIG.ENV.IS_DEVELOPMENT
export const isProduction = () => ENV_CONFIG.ENV.IS_PRODUCTION
export const isTest = () => ENV_CONFIG.ENV.IS_TEST

export const getApiUrl = () => {
  return isDevelopment() ? ENV_CONFIG.API.DEV_URL : ENV_CONFIG.API.BASE_URL
}

export const getAppUrl = () => ENV_CONFIG.APP.URL

export const isFeatureEnabled = (feature: keyof typeof ENV_CONFIG.FEATURES) => {
  return ENV_CONFIG.FEATURES[feature] || false
}

export const getServiceConfig = (service: keyof typeof ENV_CONFIG.SERVICES) => {
  return ENV_CONFIG.SERVICES[service]
}

// Validate required environment variables
export const validateEnvironment = () => {
  const required = ['NEXT_PUBLIC_API_BASE_URL', 'NEXT_PUBLIC_API_DEV_URL']

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing)
    console.warn('Using default values')
  }

  return missing.length === 0
}

// Export default
export default ENV_CONFIG

