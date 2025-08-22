/**
 * MILLION Real Estate API Service
 * Handles all API communications with comprehensive error handling
 */

import { projectId, publicAnonKey } from './supabase/info';

// Types
export interface Property {
  id: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  parking?: number;
  yearBuilt?: number;
  propertyType: 'penthouse' | 'condo' | 'house' | 'townhouse';
  status: 'active' | 'pending' | 'sold' | 'off-market';
  badge?: 'Hot' | 'New' | 'Reduced' | 'Sold' | null;
  description: string;
  features: string[];
  images: string[];
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
  photo: string;
  licenseNumber: string;
  specialties: string[];
  isActive: boolean;
}

export interface Lead {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: 'buying' | 'selling' | 'renting' | 'investment' | 'consultation';
  timeline: 'immediately' | '1-3months' | '3-6months' | '6months+';
  message: string;
  propertyId?: string;
  agentId?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'closed';
  source?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  propertyType?: string;
  features?: string[];
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  agent?: Agent;
}

export interface FilterOptions {
  priceRanges: Array<{
    label: string;
    min: number;
    max: number;
    count: number;
  }>;
  locations: Array<{
    city: string;
    count: number;
  }>;
  propertyTypes: Array<{
    type: string;
    label: string;
    count: number;
  }>;
  features: Array<{
    feature: string;
    count: number;
  }>;
}

// API Configuration
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-59c5b421`;
const API_TIMEOUT = 30000; // 30 seconds

// Error handling utility
class ApiError extends Error {
  constructor(public status: number, message: string, public details?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

// Request wrapper with timeout and error handling
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status, 
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        errorData.details
      );
    }

    const data = await response.json();
    return data;

  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error.name === 'AbortError') {
      throw new ApiError(408, 'Request timeout');
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(503, 'Network error - please check your connection');
    }
    
    throw new ApiError(500, error.message || 'Unknown error occurred');
  }
}

// Fallback data for offline/error scenarios
const FALLBACK_PROPERTIES: Property[] = [
  {
    id: 'fallback_property_1',
    price: 2500000,
    address: '1234 Ocean Drive',
    city: 'Miami Beach',
    state: 'FL',
    zipCode: '33139',
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 2200,
    propertyType: 'condo',
    status: 'active',
    badge: 'Hot',
    description: 'Stunning oceanfront condominium with panoramic views of the Atlantic Ocean. This modern residence features floor-to-ceiling windows, a gourmet kitchen, and access to world-class amenities.',
    features: ['Ocean Views', 'Modern Kitchen', 'Pool', 'Gym', 'Concierge'],
    images: ['https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_demo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fallback_property_2',
    price: 5200000,
    address: '567 Bay Drive',
    city: 'Bal Harbour',
    state: 'FL',
    zipCode: '33154',
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 3800,
    propertyType: 'house',
    status: 'active',
    description: 'Elegant waterfront estate with private dock and spectacular bay views. This custom-built home offers luxurious living with high-end finishes throughout.',
    features: ['Waterfront', 'Private Dock', 'Pool', 'Wine Cellar', 'Guest House'],
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_demo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const FALLBACK_FILTER_OPTIONS: FilterOptions = {
  priceRanges: [
    { label: 'Under $2M', min: 0, max: 1999999, count: 5 },
    { label: '$2M - $5M', min: 2000000, max: 4999999, count: 8 },
    { label: '$5M - $10M', min: 5000000, max: 9999999, count: 6 },
    { label: 'Over $10M', min: 10000000, max: 999999999, count: 3 },
  ],
  locations: [
    { city: 'Miami Beach', count: 8 },
    { city: 'Bal Harbour', count: 5 },
    { city: 'Coral Gables', count: 4 },
    { city: 'Key Biscayne', count: 3 },
  ],
  propertyTypes: [
    { type: 'condo', label: 'Condominium', count: 12 },
    { type: 'house', label: 'House', count: 8 },
    { type: 'penthouse', label: 'Penthouse', count: 4 },
    { type: 'townhouse', label: 'Townhouse', count: 2 },
  ],
  features: [
    { feature: 'Ocean Views', count: 15 },
    { feature: 'Pool', count: 18 },
    { feature: 'Waterfront', count: 10 },
    { feature: 'Private Beach', count: 8 },
    { feature: 'Wine Cellar', count: 6 },
  ],
};

// API Service Class
class ApiService {
  private favorites: Set<string> = new Set();
  private connectionStatus: 'online' | 'offline' | 'error' = 'online';

  // Properties
  async getProperties(filters: PropertyFilters = {}): Promise<ApiResponse<Property[]>> {
    try {
      const searchParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, String(v)));
          } else {
            searchParams.append(key, String(value));
          }
        }
      });

      const endpoint = `/properties${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const response = await apiRequest<Property[]>(endpoint);
      
      this.connectionStatus = 'online';
      return response;

    } catch (error) {
      console.error('API Error on /properties:', error);
      this.connectionStatus = error instanceof ApiError && error.status >= 500 ? 'error' : 'offline';
      
      // Return fallback data with filtered results
      const filteredFallback = this.filterFallbackProperties(FALLBACK_PROPERTIES, filters);
      
      return {
        data: filteredFallback,
        pagination: {
          page: 1,
          limit: 20,
          total: filteredFallback.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
        error: 'Using offline data - please check your connection'
      };
    }
  }

  async getProperty(id: string): Promise<ApiResponse<Property>> {
    try {
      const response = await apiRequest<Property>(`/properties/${id}`);
      this.connectionStatus = 'online';
      return response;

    } catch (error) {
      console.error(`API Error on /properties/${id}:`, error);
      this.connectionStatus = error instanceof ApiError && error.status >= 500 ? 'error' : 'offline';
      
      // Return fallback property
      const fallbackProperty = FALLBACK_PROPERTIES.find(p => p.id === id) || FALLBACK_PROPERTIES[0];
      
      return {
        data: fallbackProperty,
        error: 'Using offline data - please check your connection'
      };
    }
  }

  async createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Property>> {
    try {
      const response = await apiRequest<Property>('/properties', {
        method: 'POST',
        body: JSON.stringify(property),
      });
      this.connectionStatus = 'online';
      return response;

    } catch (error) {
      console.error('API Error on POST /properties:', error);
      return { error: error instanceof ApiError ? error.message : 'Failed to create property' };
    }
  }

  // Filter Options
  async getFilterOptions(): Promise<ApiResponse<FilterOptions>> {
    try {
      const response = await apiRequest<FilterOptions>('/filters');
      this.connectionStatus = 'online';
      return response;

    } catch (error) {
      console.error('API Error on /filters:', error);
      this.connectionStatus = error instanceof ApiError && error.status >= 500 ? 'error' : 'offline';
      
      return {
        data: FALLBACK_FILTER_OPTIONS,
        error: 'Using offline data - please check your connection'
      };
    }
  }

  // Leads
  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Lead>> {
    try {
      const response = await apiRequest<Lead>('/leads', {
        method: 'POST',
        body: JSON.stringify(lead),
      });
      this.connectionStatus = 'online';
      return response;

    } catch (error) {
      console.error('API Error on POST /leads:', error);
      return { error: error instanceof ApiError ? error.message : 'Failed to create lead' };
    }
  }

  async getLeads(filters: any = {}): Promise<ApiResponse<Lead[]>> {
    try {
      const searchParams = new URLSearchParams(filters);
      const endpoint = `/leads${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const response = await apiRequest<Lead[]>(endpoint);
      this.connectionStatus = 'online';
      return response;

    } catch (error) {
      console.error('API Error on /leads:', error);
      return { error: error instanceof ApiError ? error.message : 'Failed to fetch leads' };
    }
  }

  // Agents
  async getAgents(): Promise<ApiResponse<Agent[]>> {
    try {
      const response = await apiRequest<Agent[]>('/agents');
      this.connectionStatus = 'online';
      return response;

    } catch (error) {
      console.error('API Error on /agents:', error);
      return { 
        data: [],
        error: error instanceof ApiError ? error.message : 'Failed to fetch agents' 
      };
    }
  }

  async getAgent(id: string): Promise<ApiResponse<Agent>> {
    try {
      const response = await apiRequest<Agent>(`/agents/${id}`);
      this.connectionStatus = 'online';
      return response;

    } catch (error) {
      console.error(`API Error on /agents/${id}:`, error);
      return { error: error instanceof ApiError ? error.message : 'Failed to fetch agent' };
    }
  }

  // Newsletter
  async subscribeNewsletter(email: string, source: string = 'website'): Promise<ApiResponse<any>> {
    try {
      const response = await apiRequest('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, source }),
      });
      this.connectionStatus = 'online';
      return response;

    } catch (error) {
      console.error('API Error on newsletter subscription:', error);
      return { error: error instanceof ApiError ? error.message : 'Failed to subscribe to newsletter' };
    }
  }

  // Favorites (local storage)
  getFavorites(): string[] {
    try {
      const stored = localStorage.getItem('million-favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  addFavorite(propertyId: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(propertyId)) {
      favorites.push(propertyId);
      this.saveFavorites(favorites);
    }
    this.favorites.add(propertyId);
  }

  removeFavorite(propertyId: string): void {
    const favorites = this.getFavorites().filter(id => id !== propertyId);
    this.saveFavorites(favorites);
    this.favorites.delete(propertyId);
  }

  isFavorite(propertyId: string): boolean {
    if (this.favorites.size === 0) {
      const favorites = this.getFavorites();
      favorites.forEach(id => this.favorites.add(id));
    }
    return this.favorites.has(propertyId);
  }

  private saveFavorites(favorites: string[]): void {
    try {
      localStorage.setItem('million-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn('Failed to save favorites to localStorage:', error);
    }
  }

  // Utility methods
  getConnectionStatus(): 'online' | 'offline' | 'error' {
    return this.connectionStatus;
  }

  private filterFallbackProperties(properties: Property[], filters: PropertyFilters): Property[] {
    let filtered = properties;

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms!);
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms!);
    }
    if (filters.city) {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.address.toLowerCase().includes(search) ||
        p.city.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    return filtered;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await apiRequest<{ status: string; timestamp: string }>('/health');
      return response.data || { status: 'unknown', timestamp: new Date().toISOString() };
    } catch {
      return { status: 'offline', timestamp: new Date().toISOString() };
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;