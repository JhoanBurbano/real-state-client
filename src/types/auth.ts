// Owner/Agent Types
export interface Owner {
  id: string
  fullName: string
  email: string
  phoneE164?: string
  photoUrl?: string
  role: 'Owner' | 'Agent' | 'Admin'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface OwnerDto extends Owner {
  propertiesCount: number
  totalValue: number
  averageRating?: number
  experience?: number
  specialties?: string[]
  bio?: string
  languages?: string[]
  certifications?: string[]
  socialMedia?: {
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
  }
  contactPreferences?: {
    email: boolean
    phone: boolean
    sms: boolean
    whatsapp: boolean
  }
}

export interface CreateOwnerRequest {
  fullName: string
  email: string
  password: string
  phoneE164?: string
  photoUrl?: string
  role?: 'Owner' | 'Agent' | 'Admin'
  bio?: string
  specialties?: string[]
  languages?: string[]
  certifications?: string[]
  socialMedia?: {
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
  }
  contactPreferences?: {
    email: boolean
    phone: boolean
    sms: boolean
    whatsapp: boolean
  }
}

export interface UpdateOwnerRequest {
  fullName?: string
  phoneE164?: string
  photoUrl?: string
  bio?: string
  specialties?: string[]
  languages?: string[]
  certifications?: string[]
  socialMedia?: {
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
  }
  contactPreferences?: {
    email: boolean
    phone: boolean
    sms: boolean
    whatsapp: boolean
  }
}

// Authentication Types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
  owner: OwnerDto
}

export interface RefreshRequest {
  refreshToken: string
}

export interface LogoutRequest {
  refreshToken: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface VerifyEmailRequest {
  token: string
}

export interface ResendVerificationRequest {
  email: string
}

// API Error Types (RFC 7807)
export interface ApiError {
  type: string
  title: string
  status: number
  detail: string
  instance: string
  timestamp: string
  extensions?: {
    correlationId?: string
    requestId?: string
    endpoint?: string
    method?: string
    clientIp?: string
    fieldErrors?: Record<string, string[]>
  }
}

// Authentication State
export interface AuthState {
  owner: OwnerDto | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextType {
  owner: OwnerDto | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshAccessToken: () => Promise<void>
  updateProfile: (data: UpdateOwnerRequest) => Promise<void>
  changePassword: (data: ChangePasswordRequest) => Promise<void>
  clearError: () => void
}

// Session Management
export interface SessionInfo {
  ownerId: string
  sessionId: string
  ipAddress: string
  userAgent: string
  lastActivity: string
  expiresAt: string
  isActive: boolean
}

export interface ActiveSessionsResponse {
  sessions: SessionInfo[]
  total: number
}

// Two-Factor Authentication
export interface TwoFactorSetupRequest {
  method: 'sms' | 'email' | 'authenticator'
  phoneNumber?: string
}

export interface TwoFactorVerifyRequest {
  code: string
  method: 'sms' | 'email' | 'authenticator'
}

export interface TwoFactorStatus {
  isEnabled: boolean
  method: 'sms' | 'email' | 'authenticator' | null
  backupCodes: string[]
  lastUsed?: string
}

// Security & Privacy
export interface SecuritySettings {
  twoFactorEnabled: boolean
  loginNotifications: boolean
  suspiciousActivityAlerts: boolean
  sessionTimeout: number
  maxConcurrentSessions: number
  passwordExpiryDays: number
  requirePasswordChange: boolean
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts'
  showEmail: boolean
  showPhone: boolean
  showProperties: boolean
  allowContactRequests: boolean
  marketingEmails: boolean
  analyticsTracking: boolean
}

// Agent/Realtor Specific Types
export interface AgentProfile extends OwnerDto {
  licenseNumber: string
  licenseExpiry: string
  brokerage: string
  officeAddress: string
  officePhone: string
  officeEmail: string
  workingHours: {
    monday: { start: string; end: string; available: boolean }
    tuesday: { start: string; end: string; available: boolean }
    wednesday: { start: string; end: string; available: boolean }
    thursday: { start: string; end: string; available: boolean }
    friday: { start: string; end: string; available: boolean }
    saturday: { start: string; end: string; available: boolean }
    sunday: { start: string; end: string; available: boolean }
  }
  availability: 'available' | 'busy' | 'away' | 'offline'
  responseTime: number // in hours
  languages: string[]
  specializations: string[]
  awards: string[]
  testimonials: AgentTestimonial[]
}

export interface AgentTestimonial {
  id: string
  clientName: string
  clientPhoto?: string
  rating: number
  comment: string
  date: string
  propertyId?: string
  transactionType: 'sale' | 'rental' | 'consultation'
}

export interface AgentAvailability {
  agentId: string
  status: 'available' | 'busy' | 'away' | 'offline'
  nextAvailable?: string
  workingHours: {
    [key: string]: { start: string; end: string; available: boolean }
  }
  timezone: string
  responseTime: number
}

// Contact & Lead Management
export interface ContactRequest {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  propertyId?: string
  agentId?: string
  source: 'website' | 'listing' | 'referral' | 'social' | 'other'
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  tags: string[]
  notes: string[]
  createdAt: string
  updatedAt: string
  lastContacted?: string
  nextFollowUp?: string
}

export interface ContactResponse {
  id: string
  message: string
  responseType: 'email' | 'phone' | 'sms' | 'whatsapp'
  status: 'sent' | 'delivered' | 'read' | 'failed'
  sentAt: string
  deliveredAt?: string
  readAt?: string
  errorMessage?: string
}

// Notification Preferences
export interface NotificationPreferences {
  email: {
    newLeads: boolean
    propertyUpdates: boolean
    marketNews: boolean
    securityAlerts: boolean
    marketing: boolean
  }
  push: {
    newLeads: boolean
    propertyUpdates: boolean
    marketNews: boolean
    securityAlerts: boolean
  }
  sms: {
    urgentLeads: boolean
    securityAlerts: boolean
    appointmentReminders: boolean
  }
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
  quietHours: {
    enabled: boolean
    start: string
    end: string
    timezone: string
  }
}
