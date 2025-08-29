// Utility functions for token storage and management

export const tokenStorage = {
  // Store tokens
  setTokens(accessToken: string, refreshToken: string, expiresAt: string) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('tokenExpiry', expiresAt)
  },

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  },

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  },

  // Get token expiry
  getTokenExpiry(): string | null {
    return localStorage.getItem('tokenExpiry')
  },

  // Check if token is expired
  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry()
    if (!expiry) return true

    const expiryDate = new Date(expiry)
    const now = new Date()

    // Consider expired 5 minutes before
    return now >= expiryDate
  },

  // Clear all tokens
  clearTokens() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('removeItem')
    localStorage.removeItem('tokenExpiry')
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getAccessToken()
    return !!token && !this.isTokenExpired()
  },
}

// Auto-refresh token utility
export const setupTokenRefresh = (refreshCallback: () => Promise<void>) => {
  const checkTokenExpiry = () => {
    if (tokenStorage.isTokenExpired()) {
      refreshCallback()
    }
  }

  // Check every minute
  const interval = setInterval(checkTokenExpiry, 60000)

  return () => clearInterval(interval)
}


