// API Types for Million Real Estate API
// https://million-real-estate-api-sh25jnp3aa-uc.a.run.app

// Webhook Types
export interface WebhookRegistration {
  id: string
  url: string
  events: string[]
  secret: string
  isActive: boolean
  createdAt: string
  lastTriggered?: string
  failureCount: number
  lastFailure?: string
}

export interface WebhookEvent {
  id: string
  type: string
  data: any
  timestamp: string
  webhookId: string
  status: 'pending' | 'sent' | 'failed' | 'retrying'
  attempts: number
  lastAttempt?: string
  errorMessage?: string
}

export interface CreateWebhookRequest {
  url: string
  events: string[]
  secret?: string
}

export interface UpdateWebhookRequest {
  url?: string
  events?: string[]
  isActive?: boolean
}

// Metrics & Monitoring Types
export interface SystemMetrics {
  timestamp: string
  uptime: number
  memory: number
  activeConnections: number
  requestsPerSecond: number
  errorRate: number
  cpuUsage: number
  diskUsage: number
  networkLatency: number
  databaseConnections: number
  cacheHitRate: number
  queueSize: number
}

export interface PerformanceMetrics {
  endpoint: string
  method: string
  averageResponseTime: number
  p95ResponseTime: number
  p99ResponseTime: number
  requestCount: number
  errorCount: number
  successRate: number
  lastUpdated: string
}

export interface BusinessMetrics {
  totalProperties: number
  activeProperties: number
  totalOwners: number
  activeOwners: number
  totalViews: number
  totalContacts: number
  conversionRate: number
  averagePropertyPrice: number
  marketTrends: MarketTrend[]
  lastUpdated: string
}

export interface MarketTrend {
  period: string
  propertyCount: number
  averagePrice: number
  priceChange: number
  priceChangePercentage: number
  newListings: number
  soldProperties: number
  rentedProperties: number
}

// Search & Analytics Types
export interface SearchQuery {
  query: string
  filters: Record<string, any>
  sort: SortOptions
  pagination: PaginationOptions
  userId?: string
  sessionId?: string
  timestamp: string
}

export interface SearchResult {
  query: string
  results: any[]
  totalResults: number
  searchTime: number
  filters: Record<string, any>
  suggestions: string[]
  relatedSearches: string[]
  searchId: string
}

export interface SearchAnalytics {
  query: string
  totalResults: number
  searchTime: number
  filters: Record<string, any>
  suggestions: string[]
  popularSearches: string[]
  userBehavior: {
    clickedResults: string[]
    timeOnPage: number
    bounceRate: number
    conversionRate: number
  }
}

export interface SearchSuggestion {
  text: string
  type: 'property' | 'location' | 'amenity' | 'popular'
  relevance: number
  count: number
  lastSearched?: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: string
  readAt?: string
  expiresAt?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: 'system' | 'property' | 'contact' | 'security' | 'marketing'
}

export interface NotificationTemplate {
  id: string
  name: string
  type: string
  title: string
  message: string
  variables: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface NotificationPreference {
  userId: string
  email: boolean
  push: boolean
  sms: boolean
  inApp: boolean
  categories: {
    system: boolean
    property: boolean
    contact: boolean
    security: boolean
    marketing: boolean
  }
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
  quietHours: {
    enabled: boolean
    start: string
    end: string
    timezone: string
  }
}

// Audit & Logging Types
export interface AuditLog {
  id: string
  userId?: string
  action: string
  resource: string
  resourceId?: string
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  timestamp: string
  correlationId: string
  requestId: string
  endpoint: string
  method: string
  statusCode: number
  responseTime: number
}

export interface ActivityLog {
  id: string
  userId: string
  activity: string
  description: string
  metadata: Record<string, any>
  timestamp: string
  ipAddress: string
  userAgent: string
  sessionId: string
}

// File Upload Types
export interface FileUpload {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string
  metadata: {
    width?: number
    height?: number
    duration?: number
    format?: string
  }
  uploadedBy: string
  uploadedAt: string
  expiresAt?: string
  isPublic: boolean
  tags: string[]
}

export interface FileUploadRequest {
  file: File
  category: 'property' | 'profile' | 'document' | 'temporary'
  tags?: string[]
  isPublic?: boolean
  expiresAt?: string
}

export interface FileUploadResponse {
  id: string
  url: string
  thumbnailUrl?: string
  filename: string
  size: number
  uploadedAt: string
}

// Cache & Performance Types
export interface CacheStats {
  hits: number
  misses: number
  hitRate: number
  size: number
  maxSize: number
  evictions: number
  keys: number
  lastUpdated: string
}

export interface CacheKey {
  key: string
  value: any
  ttl: number
  createdAt: string
  lastAccessed: string
  accessCount: number
  size: number
}

// Rate Limiting Types
export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: number
  retryAfter?: number
  window: number
}

export interface RateLimitConfig {
  endpoint: string
  method: string
  limit: number
  window: number
  burst: number
  cost: number
}

// Health Check Types
export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded'
  timestamp: string
  uptime: number
  version: string
  environment: string
  checks: HealthCheck[]
}

export interface HealthCheck {
  name: string
  status: 'healthy' | 'unhealthy' | 'degraded'
  responseTime: number
  lastChecked: string
  error?: string
  details?: Record<string, any>
}

// Correlation & Tracing Types
export interface CorrelationContext {
  correlationId: string
  requestId: string
  userId?: string
  sessionId?: string
  traceId?: string
  spanId?: string
  parentSpanId?: string
  timestamp: string
  source: string
}

export interface TraceSpan {
  id: string
  traceId: string
  parentId?: string
  name: string
  startTime: number
  endTime?: number
  duration?: number
  tags: Record<string, string>
  logs: TraceLog[]
  error?: string
}

export interface TraceLog {
  timestamp: number
  level: 'debug' | 'info' | 'warn' | 'error'
  message: string
  fields: Record<string, any>
}

// Utility Types
export interface SortOptions {
  field: string
  order: 'asc' | 'desc'
}

export interface PaginationOptions {
  page: number
  pageSize: number
  total?: number
}

export interface FilterOptions {
  [key: string]: any
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
  timestamp: string
  correlationId: string
  pagination?: PaginationInfo
}

export interface ApiErrorResponse {
  error: ApiError
  timestamp: string
  correlationId: string
  requestId: string
}

// Generic Response Types
export interface ListResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface CreateResponse<T> {
  id: string
  data: T
  message: string
}

export interface UpdateResponse<T> {
  data: T
  message: string
  changes: Record<string, any>
}

export interface DeleteResponse {
  message: string
  deletedAt: string
}

// Bulk Operations
export interface BulkOperationRequest<T> {
  operations: Array<{
    action: 'create' | 'update' | 'delete'
    data?: T
    id?: string
  }>
  options?: {
    validateOnly?: boolean
    skipErrors?: boolean
    batchSize?: number
  }
}

export interface BulkOperationResponse {
  total: number
  successful: number
  failed: number
  errors: Array<{
    index: number
    action: string
    error: string
    details?: any
  }>
  results: Array<{
    index: number
    action: string
    success: boolean
    id?: string
    data?: any
  }>
}

