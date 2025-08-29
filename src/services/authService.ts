interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresAt: string
  tokenType: string
}

import { getApiBaseUrl, authConfig } from '../config/auth'

class AuthService {
  private baseUrl = getApiBaseUrl()
  private accessToken: string | null = null
  private refreshToken: string | null = null

  // Login principal
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}${authConfig.endpoints.login}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Login failed')
      }

      const data: LoginResponse = await response.json()

      // Almacenar tokens
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken

      // Guardar en localStorage
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('tokenExpiry', data.expiresAt)

      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Refresh de token
  async refreshAccessToken(): Promise<LoginResponse> {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await fetch(
        `${this.baseUrl}${authConfig.endpoints.refresh}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        }
      )

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data: LoginResponse = await response.json()

      // Actualizar tokens
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('tokenExpiry', data.expiresAt)

      return data
    } catch (error) {
      console.error('Token refresh error:', error)
      this.logout()
      throw error
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        await fetch(`${this.baseUrl}${authConfig.endpoints.logout}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Limpiar tokens
      this.accessToken = null
      this.refreshToken = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('tokenExpiry')
    }
  }

  // Obtener token actual
  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('accessToken')
    }
    return this.accessToken
  }

  // Verificar si el token está expirado
  isTokenExpired(): boolean {
    const expiry = localStorage.getItem('tokenExpiry')
    if (!expiry) return true

    const expiryDate = new Date(expiry)
    const now = new Date()

    // Considerar expirado 5 minutos antes
    return now >= expiryDate
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    const token = this.getAccessToken()
    return !!token && !this.isTokenExpired()
  }
}

export const authService = new AuthService()
