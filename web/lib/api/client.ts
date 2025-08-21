export interface Property {
  id: string
  price: number
  address: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  squareFeet: number
  propertyType: 'penthouse' | 'condo' | 'house' | 'townhouse'
  status: 'active' | 'pending' | 'sold' | 'off-market'
  badge?: 'Hot' | 'New' | 'Reduced' | 'Sold' | null
  description: string
  features: string[]
  images: string[]
  agentId: string
  createdAt: string
  updatedAt: string
}

export interface ProblemDetails {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
  extensions?: { correlationId?: string; [k: string]: unknown }
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface PropertyFilters {
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  city?: string
  propertyType?: string
  features?: string[]
  status?: string
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

function createCorrelationId() {
  return crypto.randomUUID()
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), 30_000)
  const correlationId = createCorrelationId()
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        'content-type': 'application/json',
        'x-correlation-id': correlationId,
        ...(init.headers || {})
      },
      signal: controller.signal
    })
    clearTimeout(id)
    const contentType = res.headers.get('content-type') || ''
    if (!res.ok) {
      if (contentType.includes('application/problem+json')) {
        const pd = (await res.json()) as ProblemDetails
        pd.extensions = pd.extensions || {}
        pd.extensions.correlationId = pd.extensions.correlationId || correlationId
        throw pd
      }
      const text = await res.text()
      throw { title: res.statusText, status: res.status, detail: text, extensions: { correlationId } } as ProblemDetails
    }
    if (contentType.includes('application/json')) {
      return (await res.json()) as T
    }
    return (await res.text()) as unknown as T
  } catch (err) {
    clearTimeout(id)
    if (typeof window !== 'undefined' && err instanceof DOMException && err.name === 'AbortError') {
      throw { title: 'Timeout', status: 408, detail: 'Request timed out', extensions: { correlationId } } satisfies ProblemDetails
    }
    if ((err as any)?.status) throw err
    throw { title: 'Network error', status: 503, detail: (err as any)?.message ?? 'Network failure', extensions: { correlationId } } satisfies ProblemDetails
  }
}

export async function fetchProperties(filters: PropertyFilters): Promise<ApiResponse<Property[]>> {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return
    params.set(k, String(v))
  })
  return request(`/properties?${params.toString()}`)
}

export async function fetchProperty(id: string): Promise<{ data: Property }>
{ return request(`/properties/${id}`) }

export interface CreatePropertyInput {
  price: number
  address: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  squareFeet: number
  description: string
  propertyType: 'penthouse' | 'condo' | 'house' | 'townhouse'
  images: string[]
}

export async function createProperty(input: CreatePropertyInput): Promise<{ data: Property }>
{ return request(`/properties`, { method: 'POST', body: JSON.stringify(input) }) }

