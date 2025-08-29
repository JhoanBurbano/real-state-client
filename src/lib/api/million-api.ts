import type {
  Property,
  PropertyListDto,
  PropertyDetailDto,
  PropertyTrace,
  MediaDto,
  MediaPatchDto,
  PropertyFilters,
  AdvancedSearchRequest,
  PropertyStats,
  PropertyResponse,
  PagedResult,
  Owner,
  OwnerDto,
  AgentProfile,
  AgentAvailability,
  AgentTestimonial,
  CreateOwnerRequest,
  UpdateOwnerRequest,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  LogoutRequest,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  WebhookRegistration,
  WebhookEvent,
  CreateWebhookRequest,
  UpdateWebhookRequest,
  SystemMetrics,
  SearchAnalytics,
  SearchSuggestions,
  ContactRequest,
  Notification,
  NotificationPreference,
  SecuritySettings,
  PrivacySettings,
  TwoFactorStatus,
  TwoFactorSetupRequest,
  TwoFactorVerifyRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
  SessionInfo,
  ActiveSessionsResponse,
  AuditLog,
  ActivityLog,
  FileUpload,
  FileUploadRequest,
  FileUploadResponse,
  CacheStats,
  RateLimitInfo,
  HealthStatus,
  CorrelationContext,
  TraceSpan,
  PerformanceMetrics,
  BusinessMetrics,
  MarketTrend,
  SearchSuggestion,
  SearchQuery,
  SearchResult,
  NotificationTemplate,
  BulkOperationRequest,
  BulkOperationResponse,
  MediaReorderRequest,
  MediaFeatureRequest,
  MediaEnableRequest,
  ApiError,
  ApiResponse,
  ListResponse,
  CreateResponse,
  UpdateResponse,
  DeleteResponse,
  PaginationInfo,
  SortOptions,
  FilterOptions,
} from '@/types'
import { ENV_CONFIG } from '@/lib/config/environment'

class MillionAPI {
  private baseUrl: string
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private correlationId: string | null = null

  constructor() {
    this.baseUrl = ENV_CONFIG.ENV.IS_DEVELOPMENT
      ? ENV_CONFIG.API.DEV_URL
      : ENV_CONFIG.API.BASE_URL
    this.initializeFromStorage()
    this.generateCorrelationId()
  }

  // ===== HEALTH CHECK ENDPOINTS =====
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${this.baseUrl}/health/live`)

    if (!response.ok) {
      throw new Error('Health check failed')
    }

    return response.json()
  }

  async readinessCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${this.baseUrl}/health/ready`)

    if (!response.ok) {
      throw new Error('Readiness check failed')
    }

    return response.json()
  }

  async getHealthStatus(): Promise<HealthStatus> {
    const response = await fetch(`${this.baseUrl}/health`)

    if (!response.ok) {
      throw new Error('Failed to get health status')
    }

    return response.json()
  }

  // ===== AUTHENTICATION ENDPOINTS =====
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': this.correlationId || '',
      },
      body: JSON.stringify({ email, password } as LoginRequest),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Login failed')
    }

    const data = await response.json()

    // Store tokens
    this.accessToken = data.accessToken
    this.refreshToken = data.refreshToken
    this.saveToStorage()

    return data
  }

  async refreshAccessToken(): Promise<LoginResponse> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': this.correlationId || '',
      },
      body: JSON.stringify({
        refreshToken: this.refreshToken,
      } as RefreshRequest),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Token refresh failed')
    }

    const data = await response.json()

    // Update tokens
    this.accessToken = data.accessToken
    this.refreshToken = data.refreshToken
    this.saveToStorage()

    return data
  }

  async logout(): Promise<void> {
    if (!this.refreshToken) {
      return
    }

    try {
      await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-ID': this.correlationId || '',
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken,
        } as LogoutRequest),
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear tokens regardless of response
      this.accessToken = null
      this.refreshToken = null
      this.clearStorage()
    }
  }

  async changePassword(
    data: ChangePasswordRequest
  ): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/change-password`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to change password')
    }

    return response.json()
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': this.correlationId || '',
      },
      body: JSON.stringify({ email } as ForgotPasswordRequest),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to send reset email')
    }

    return response.json()
  }

  async resetPassword(
    data: ResetPasswordRequest
  ): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': this.correlationId || '',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to reset password')
    }

    return response.json()
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': this.correlationId || '',
      },
      body: JSON.stringify({ token } as VerifyEmailRequest),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to verify email')
    }

    return response.json()
  }

  async resendVerification(email: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': this.correlationId || '',
      },
      body: JSON.stringify({ email } as ResendVerificationRequest),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to resend verification')
    }

    return response.json()
  }

  // ===== TWO-FACTOR AUTHENTICATION =====
  async setupTwoFactor(
    data: TwoFactorSetupRequest
  ): Promise<{ qrCode?: string; backupCodes: string[] }> {
    const response = await fetch(`${this.baseUrl}/auth/2fa/setup`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        error.detail || 'Failed to setup two-factor authentication'
      )
    }

    return response.json()
  }

  async verifyTwoFactor(
    data: TwoFactorVerifyRequest
  ): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/2fa/verify`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        error.detail || 'Failed to verify two-factor authentication'
      )
    }

    return response.json()
  }

  async getTwoFactorStatus(): Promise<TwoFactorStatus> {
    const response = await fetch(`${this.baseUrl}/auth/2fa/status`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to get two-factor status')
    }

    return response.json()
  }

  // ===== PROPERTIES CRUD ENDPOINTS =====
  async getProperties(
    filters: PropertyFilters = {}
  ): Promise<PropertyResponse> {
    const params = new URLSearchParams()

    if (filters.page) params.append('page', filters.page.toString())
    if (filters.pageSize) params.append('pageSize', filters.pageSize.toString())
    if (filters.search) params.append('search', filters.search)
    if (filters.city) params.append('city', filters.city)
    if (filters.neighborhood)
      params.append('neighborhood', filters.neighborhood)
    if (filters.propertyType)
      params.append('propertyType', filters.propertyType)
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms.toString())
    if (filters.bathrooms)
      params.append('bathrooms', filters.bathrooms.toString())
    if (filters.minSize) params.append('minSize', filters.minSize.toString())
    if (filters.maxSize) params.append('maxSize', filters.maxSize.toString())
    if (filters.hasPool !== undefined)
      params.append('hasPool', filters.hasPool.toString())
    if (filters.hasGarden !== undefined)
      params.append('hasGarden', filters.hasGarden.toString())
    if (filters.hasParking !== undefined)
      params.append('hasParking', filters.hasParking.toString())
    if (filters.isFurnished !== undefined)
      params.append('isFurnished', filters.isFurnished.toString())
    if (filters.availableFrom)
      params.append('availableFrom', filters.availableFrom)
    if (filters.availableTo) params.append('availableTo', filters.availableTo)
    if (filters.status) params.append('status', filters.status)
    if (filters.isActive !== undefined)
      params.append('isActive', filters.isActive.toString())
    if (filters.sort) params.append('sort', filters.sort)

    const response = await fetch(`${this.baseUrl}/properties?${params}`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch properties')
    }

    return response.json()
  }

  async getPropertyById(id: string): Promise<PropertyDetailDto | null> {
    const response = await fetch(`${this.baseUrl}/properties/${id}`)

    console.log('response', response)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch property')
    }

    return response.json()
  }

  async createProperty(
    propertyData: CreatePropertyRequest
  ): Promise<PropertyDetailDto> {
    const response = await fetch(`${this.baseUrl}/properties`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(propertyData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to create property')
    }

    return response.json()
  }

  async updateProperty(
    id: string,
    propertyData: UpdatePropertyRequest
  ): Promise<PropertyDetailDto> {
    const response = await fetch(`${this.baseUrl}/properties/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(propertyData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to update property')
    }

    return response.json()
  }

  async deleteProperty(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/properties/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to delete property')
    }
  }

  // ===== PROPERTY STATUS MANAGEMENT =====
  async activateProperty(id: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/properties/${id}/activate`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to activate property')
    }

    return response.json()
  }

  async deactivateProperty(id: string): Promise<{ message: string }> {
    const response = await fetch(
      `${this.baseUrl}/properties/${id}/deactivate`,
      {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to deactivate property')
    }

    return response.json()
  }

  // ===== PROPERTY MEDIA MANAGEMENT =====
  async updatePropertyMedia(
    id: string,
    mediaData: MediaPatchDto
  ): Promise<PropertyDetailDto> {
    const response = await fetch(`${this.baseUrl}/properties/${id}/media`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(mediaData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to update property media')
    }

    return response.json()
  }

  async getPropertyMedia(
    id: string,
    filters?: {
      type?: string
      featured?: boolean
      page?: number
      pageSize?: number
    }
  ): Promise<MediaDto[]> {
    const params = new URLSearchParams()
    if (filters) {
      if (filters.type) params.append('type', filters.type)
      if (filters.featured !== undefined)
        params.append('featured', filters.featured.toString())
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.pageSize)
        params.append('pageSize', filters.pageSize.toString())
    }

    const response = await fetch(
      `${this.baseUrl}/properties/${id}/media?${params}`
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch property media')
    }

    return response.json()
  }

  async reorderPropertyMedia(id: string, mediaIds: string[]): Promise<boolean> {
    const response = await fetch(
      `${this.baseUrl}/properties/${id}/media/reorder`,
      {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(mediaIds),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to reorder property media')
    }

    return response.json()
  }

  async setMediaFeatured(
    id: string,
    mediaId: string,
    featured: boolean
  ): Promise<boolean> {
    const response = await fetch(
      `${this.baseUrl}/properties/${id}/media/${mediaId}/feature`,
      {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ featured } as MediaFeatureRequest),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to set media featured')
    }

    return response.json()
  }

  async setMediaEnabled(
    id: string,
    mediaId: string,
    enabled: boolean
  ): Promise<boolean> {
    const response = await fetch(
      `${this.baseUrl}/properties/${id}/media/${mediaId}/enable`,
      {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ enabled } as MediaEnableRequest),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to set media enabled')
    }

    return response.json()
  }

  async deletePropertyMedia(id: string, mediaId: string): Promise<boolean> {
    const response = await fetch(
      `${this.baseUrl}/properties/${id}/media/${mediaId}`,
      {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to delete property media')
    }

    return response.json()
  }

  // ===== PROPERTY TRACES & TIMELINE =====
  async getPropertyTraces(id: string): Promise<PropertyTrace[]> {
    const response = await fetch(`${this.baseUrl}/properties/${id}/traces`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch property traces')
    }

    return response.json()
  }

  async getPropertyTimeline(id: string): Promise<PropertyTrace[]> {
    const response = await fetch(`${this.baseUrl}/properties/${id}/timeline`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch property timeline')
    }

    return response.json()
  }

  // ===== ADVANCED SEARCH =====
  async advancedSearch(
    searchRequest: AdvancedSearchRequest
  ): Promise<PagedResult<PropertyListDto>> {
    const response = await fetch(`${this.baseUrl}/properties/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': this.correlationId || '',
      },
      body: JSON.stringify(searchRequest),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Advanced search failed')
    }

    return response.json()
  }

  async getSearchSuggestions(
    query: string,
    limit: number = 10
  ): Promise<string[]> {
    const params = new URLSearchParams({
      query,
      limit: limit.toString(),
    })

    const response = await fetch(
      `${this.baseUrl}/properties/search/suggestions?${params}`
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to get search suggestions')
    }

    return response.json()
  }

  async getPopularSearches(limit: number = 10): Promise<string[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
    })

    const response = await fetch(
      `${this.baseUrl}/properties/search/popular?${params}`
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to get popular searches')
    }

    return response.json()
  }

  async getSearchAnalytics(query: string): Promise<SearchAnalytics> {
    const response = await fetch(
      `${this.baseUrl}/properties/search/analytics`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-ID': this.correlationId || '',
        },
        body: JSON.stringify({ query }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to get search analytics')
    }

    return response.json()
  }

  // ===== PROPERTY STATISTICS =====
  async getPropertyStats(filters?: {
    city?: string
    propertyType?: string
    from?: string
    to?: string
  }): Promise<PropertyStats> {
    const params = new URLSearchParams()
    if (filters) {
      if (filters.city) params.append('city', filters.city)
      if (filters.propertyType)
        params.append('propertyType', filters.propertyType)
      if (filters.from) params.append('from', filters.from)
      if (filters.to) params.append('to', filters.to)
    }

    const response = await fetch(`${this.baseUrl}/stats/properties?${params}`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch property statistics')
    }

    return response.json()
  }

  async getPropertyTrends(months: number = 12): Promise<MarketTrend[]> {
    const params = new URLSearchParams({
      months: months.toString(),
    })

    const response = await fetch(
      `${this.baseUrl}/stats/properties/trends?${params}`,
      {
        headers: this.getAuthHeaders(),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch property trends')
    }

    return response.json()
  }

  async getPriceTrends(periods: number = 12): Promise<MarketTrend[]> {
    const params = new URLSearchParams({
      periods: periods.toString(),
    })

    const response = await fetch(
      `${this.baseUrl}/stats/properties/prices?${params}`,
      {
        headers: this.getAuthHeaders(),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch price trends')
    }

    return response.json()
  }

  // ===== OWNERS/AGENTS ENDPOINTS =====
  async getOwners(): Promise<OwnerDto[]> {
    const response = await fetch(`${this.baseUrl}/owners`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch owners')
    }

    return response.json()
  }

  async createOwner(ownerData: CreateOwnerRequest): Promise<OwnerDto> {
    const response = await fetch(`${this.baseUrl}/owners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': this.correlationId || '',
      },
      body: JSON.stringify(ownerData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to create owner')
    }

    return response.json()
  }

  async getOwnerProfile(): Promise<OwnerDto> {
    const response = await fetch(`${this.baseUrl}/owners/profile`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch owner profile')
    }

    return response.json()
  }

  async updateOwnerProfile(ownerData: UpdateOwnerRequest): Promise<OwnerDto> {
    const response = await fetch(`${this.baseUrl}/owners/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(ownerData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to update owner profile')
    }

    return response.json()
  }

  async getAgentProfile(agentId: string): Promise<AgentProfile> {
    const response = await fetch(
      `${this.baseUrl}/owners/${agentId}/agent-profile`
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch agent profile')
    }

    return response.json()
  }

  async getAgentAvailability(agentId: string): Promise<AgentAvailability> {
    const response = await fetch(
      `${this.baseUrl}/owners/${agentId}/availability`
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch agent availability')
    }

    return response.json()
  }

  async getAgentTestimonials(agentId: string): Promise<AgentTestimonial[]> {
    const response = await fetch(
      `${this.baseUrl}/owners/${agentId}/testimonials`
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch agent testimonials')
    }

    return response.json()
  }

  // ===== SESSION MANAGEMENT =====
  async getActiveSessions(): Promise<ActiveSessionsResponse> {
    const response = await fetch(`${this.baseUrl}/auth/sessions`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch active sessions')
    }

    return response.json()
  }

  async revokeSession(sessionId: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to revoke session')
    }

    return response.json()
  }

  async revokeAllSessions(): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/sessions`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to revoke all sessions')
    }

    return response.json()
  }

  // ===== SECURITY & PRIVACY SETTINGS =====
  async getSecuritySettings(): Promise<SecuritySettings> {
    const response = await fetch(`${this.baseUrl}/auth/security`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch security settings')
    }

    return response.json()
  }

  async updateSecuritySettings(
    settings: Partial<SecuritySettings>
  ): Promise<SecuritySettings> {
    const response = await fetch(`${this.baseUrl}/auth/security`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(settings),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to update security settings')
    }

    return response.json()
  }

  async getPrivacySettings(): Promise<PrivacySettings> {
    const response = await fetch(`${this.baseUrl}/auth/privacy`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch privacy settings')
    }

    return response.json()
  }

  async updatePrivacySettings(
    settings: Partial<PrivacySettings>
  ): Promise<PrivacySettings> {
    const response = await fetch(`${this.baseUrl}/auth/privacy`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(settings),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to update privacy settings')
    }

    return response.json()
  }

  // ===== NOTIFICATION MANAGEMENT =====
  async getNotifications(filters?: {
    page?: number
    pageSize?: number
    type?: string
    category?: string
    isRead?: boolean
  }): Promise<ListResponse<Notification>> {
    const params = new URLSearchParams()
    if (filters) {
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.pageSize)
        params.append('pageSize', filters.pageSize.toString())
      if (filters.type) params.append('type', filters.type)
      if (filters.category) params.append('category', filters.category)
      if (filters.isRead !== undefined)
        params.append('isRead', filters.isRead.toString())
    }

    const response = await fetch(`${this.baseUrl}/notifications?${params}`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch notifications')
    }

    return response.json()
  }

  async markNotificationAsRead(
    notificationId: string
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${this.baseUrl}/notifications/${notificationId}/read`,
      {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to mark notification as read')
    }

    return response.json()
  }

  async markAllNotificationsAsRead(): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/notifications/read-all`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        error.detail || 'Failed to mark all notifications as read'
      )
    }

    return response.json()
  }

  async getNotificationPreferences(): Promise<NotificationPreference> {
    const response = await fetch(`${this.baseUrl}/notifications/preferences`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        error.detail || 'Failed to fetch notification preferences'
      )
    }

    return response.json()
  }

  async updateNotificationPreferences(
    preferences: Partial<NotificationPreference>
  ): Promise<NotificationPreference> {
    const response = await fetch(`${this.baseUrl}/notifications/preferences`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(preferences),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        error.detail || 'Failed to update notification preferences'
      )
    }

    return response.json()
  }

  // ===== WEBHOOK MANAGEMENT =====
  async registerWebhook(
    webhookData: CreateWebhookRequest
  ): Promise<WebhookRegistration> {
    const response = await fetch(`${this.baseUrl}/webhooks`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(webhookData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to register webhook')
    }

    return response.json()
  }

  async getWebhooks(): Promise<WebhookRegistration[]> {
    const response = await fetch(`${this.baseUrl}/webhooks`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch webhooks')
    }

    return response.json()
  }

  async updateWebhook(
    webhookId: string,
    webhookData: UpdateWebhookRequest
  ): Promise<WebhookRegistration> {
    const response = await fetch(`${this.baseUrl}/webhooks/${webhookId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(webhookData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to update webhook')
    }

    return response.json()
  }

  async deleteWebhook(webhookId: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/webhooks/${webhookId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to delete webhook')
    }

    return response.json()
  }

  async getWebhookEvents(webhookId: string): Promise<WebhookEvent[]> {
    const response = await fetch(
      `${this.baseUrl}/webhooks/${webhookId}/events`,
      {
        headers: this.getAuthHeaders(),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch webhook events')
    }

    return response.json()
  }

  // ===== METRICS & MONITORING =====
  async getMetrics(): Promise<SystemMetrics> {
    const response = await fetch(`${this.baseUrl}/metrics`)

    if (!response.ok) {
      throw new Error('Failed to fetch metrics')
    }

    return response.json()
  }

  async getPerformanceMetrics(): Promise<PerformanceMetrics[]> {
    const response = await fetch(`${this.baseUrl}/metrics/performance`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch performance metrics')
    }

    return response.json()
  }

  async getBusinessMetrics(): Promise<BusinessMetrics> {
    const response = await fetch(`${this.baseUrl}/metrics/business`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch business metrics')
    }

    return response.json()
  }

  async getCacheStats(): Promise<CacheStats> {
    const response = await fetch(`${this.baseUrl}/metrics/cache`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch cache stats')
    }

    return response.json()
  }

  // ===== FILE UPLOAD =====
  async uploadFile(uploadData: FileUploadRequest): Promise<FileUploadResponse> {
    const formData = new FormData()
    formData.append('file', uploadData.file)
    formData.append('category', uploadData.category)
    if (uploadData.tags) {
      uploadData.tags.forEach((tag: string) => formData.append('tags', tag))
    }
    if (uploadData.isPublic !== undefined) {
      formData.append('isPublic', uploadData.isPublic.toString())
    }
    if (uploadData.expiresAt) {
      formData.append('expiresAt', uploadData.expiresAt)
    }

    const response = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'X-Correlation-ID': this.correlationId || '',
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to upload file')
    }

    return response.json()
  }

  async deleteFile(fileId: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/upload/${fileId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to delete file')
    }

    return response.json()
  }

  // ===== CONTACT & LEAD MANAGEMENT =====
  async createContactRequest(
    contactData: Omit<ContactRequest, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ContactRequest> {
    const response = await fetch(`${this.baseUrl}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': this.correlationId || '',
      },
      body: JSON.stringify(contactData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to create contact request')
    }

    return response.json()
  }

  async getContactRequests(filters?: {
    page?: number
    pageSize?: number
    status?: string
    priority?: string
    agentId?: string
  }): Promise<ListResponse<ContactRequest>> {
    const params = new URLSearchParams()
    if (filters) {
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.pageSize)
        params.append('pageSize', filters.pageSize.toString())
      if (filters.status) params.append('status', filters.status)
      if (filters.priority) params.append('priority', filters.priority)
      if (filters.agentId) params.append('agentId', filters.agentId)
    }

    const response = await fetch(`${this.baseUrl}/contacts?${params}`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch contact requests')
    }

    return response.json()
  }

  async updateContactRequest(
    contactId: string,
    updates: Partial<ContactRequest>
  ): Promise<ContactRequest> {
    const response = await fetch(`${this.baseUrl}/contacts/${contactId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to update contact request')
    }

    return response.json()
  }

  // ===== AUDIT & LOGGING =====
  async getAuditLogs(filters?: {
    page?: number
    pageSize?: number
    userId?: string
    action?: string
    resource?: string
    from?: string
    to?: string
  }): Promise<ListResponse<AuditLog>> {
    const params = new URLSearchParams()
    if (filters) {
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.pageSize)
        params.append('pageSize', filters.pageSize.toString())
      if (filters.userId) params.append('userId', filters.userId)
      if (filters.action) params.append('action', filters.action)
      if (filters.resource) params.append('resource', filters.resource)
      if (filters.from) params.append('from', filters.from)
      if (filters.to) params.append('to', filters.to)
    }

    const response = await fetch(`${this.baseUrl}/audit/logs?${params}`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch audit logs')
    }

    return response.json()
  }

  async getActivityLogs(filters?: {
    page?: number
    pageSize?: number
    userId?: string
    activity?: string
    from?: string
    to?: string
  }): Promise<ListResponse<ActivityLog>> {
    const params = new URLSearchParams()
    if (filters) {
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.pageSize)
        params.append('pageSize', filters.pageSize.toString())
      if (filters.userId) params.append('userId', filters.userId)
      if (filters.activity) params.append('activity', filters.activity)
      if (filters.from) params.append('from', filters.from)
      if (filters.to) params.append('to', filters.to)
    }

    const response = await fetch(`${this.baseUrl}/audit/activities?${params}`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch activity logs')
    }

    return response.json()
  }

  // ===== BULK OPERATIONS =====
  async bulkPropertyOperations<T>(
    operations: BulkOperationRequest<T>
  ): Promise<BulkOperationResponse> {
    const response = await fetch(`${this.baseUrl}/properties/bulk`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(operations),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to perform bulk operations')
    }

    return response.json()
  }

  // ===== UTILITY METHODS =====
  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Correlation-ID': this.correlationId || '',
    }

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`
    }

    return headers
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('million_access_token', this.accessToken || '')
      localStorage.setItem('million_refresh_token', this.refreshToken || '')
    }
  }

  private clearStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('million_access_token')
      localStorage.removeItem('million_refresh_token')
    }
  }

  private initializeFromStorage(): void {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('million_access_token')
      this.refreshToken = localStorage.getItem('million_refresh_token')
    }
  }

  private generateCorrelationId(): void {
    this.correlationId = `corr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // ===== PUBLIC GETTERS =====
  isAuthenticated(): boolean {
    return !!(this.accessToken && this.refreshToken)
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  getRefreshToken(): string | null {
    return this.refreshToken
  }

  getCorrelationId(): string | null {
    return this.correlationId
  }

  // ===== DEBUG INFORMATION =====
  getDebugInfo() {
    return {
      baseUrl: this.baseUrl,
      isDevelopment: ENV_CONFIG.ENV.IS_DEVELOPMENT,
      isProduction: ENV_CONFIG.ENV.IS_PRODUCTION,
      appUrl: ENV_CONFIG.APP.URL,
      features: ENV_CONFIG.FEATURES,
      apiConfig: {
        baseUrl: ENV_CONFIG.API.BASE_URL,
        devUrl: ENV_CONFIG.API.DEV_URL,
      },
      auth: {
        isAuthenticated: this.isAuthenticated(),
        hasAccessToken: !!this.accessToken,
        hasRefreshToken: !!this.refreshToken,
      },
      correlation: {
        correlationId: this.correlationId,
      },
    }
  }
}

// Export singleton instance
export const millionAPI = new MillionAPI()
