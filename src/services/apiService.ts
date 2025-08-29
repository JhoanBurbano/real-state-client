import { authService } from './authService'
import { getApiBaseUrl } from '../config/auth'

class ApiService {
  private baseUrl = getApiBaseUrl()
  private authService: typeof authService

  constructor(authService: typeof authService) {
    this.authService = authService
  }

  // Request con auto-refresh de token
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Agregar token de autorización
    const token = this.authService.getAccessToken()
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options)

      // Si es 401, intentar refresh
      if (response.status === 401) {
        await this.authService.refreshAccessToken()

        // Reintentar con nuevo token
        const newToken = this.authService.getAccessToken()
        if (newToken) {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          }

          const retryResponse = await fetch(
            `${this.baseUrl}${endpoint}`,
            options
          )
          if (retryResponse.ok) {
            return await retryResponse.json()
          }
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request error:', error)
      throw error
    }
  }

  // Métodos específicos
  async getProperties(page = 1, pageSize = 20) {
    return this.request(`/properties?page=${page}&pageSize=${pageSize}`)
  }

  async getOwners() {
    return this.request('/owners')
  }

  async getPropertyById(id: string) {
    return this.request(`/properties/${id}`)
  }
}

export const apiService = new ApiService(authService)
