/**
 * MILLION Real Estate - Mock API Service
 * Simulates API calls with realistic delays and responses
 * Designed to match the real API service interface exactly
 */

import type { Property, Agent, Lead, FilterOptions, ApiResponse, PropertyFilters } from './api';
import { 
  MOCK_PROPERTIES, 
  MOCK_AGENTS, 
  MOCK_LEADS, 
  MOCK_FILTER_OPTIONS,
  simulateDelay,
  filterProperties,
  paginateResults
} from './mockData';

// Environment configuration
const USE_MOCK_DATA = true; // Set to false to use real API
const MOCK_DELAY = 300; // Simulate network delay in milliseconds

class MockApiService {
  private favorites: Set<string> = new Set();
  private connectionStatus: 'online' | 'offline' | 'error' = 'online';
  private properties: Property[] = [...MOCK_PROPERTIES];
  private agents: Agent[] = [...MOCK_AGENTS];
  private leads: Lead[] = [...MOCK_LEADS];

  constructor() {
    // Initialize favorites from localStorage
    this.loadFavorites();
  }

  // Properties
  async getProperties(filters: PropertyFilters = {}): Promise<ApiResponse<Property[]>> {
    await simulateDelay(MOCK_DELAY);

    try {
      // Filter active properties by default
      const activeProperties = this.properties.filter(p => 
        filters.status ? p.status === filters.status : p.status === 'active'
      );

      // Apply filters
      const filteredProperties = filterProperties(activeProperties, filters);

      // Apply pagination
      const page = filters.page || 1;
      const limit = Math.min(filters.limit || 20, 100);
      const result = paginateResults(filteredProperties, page, limit);

      console.log(`🏠 Mock API: Found ${result.pagination.total} properties (page ${page})`);

      return {
        data: result.data,
        pagination: result.pagination,
      };

    } catch (error) {
      console.error('Mock API Error on /properties:', error);
      return { 
        error: 'Failed to fetch properties',
        data: []
      };
    }
  }

  async getProperty(id: string): Promise<ApiResponse<Property>> {
    await simulateDelay(MOCK_DELAY);

    try {
      const property = this.properties.find(p => p.id === id);
      
      if (!property) {
        return { error: 'Property not found' };
      }

      // Get agent info
      const agent = this.agents.find(a => a.id === property.agentId);

      console.log(`🏠 Mock API: Retrieved property ${id}`);

      return {
        data: property,
        agent,
      };

    } catch (error) {
      console.error(`Mock API Error on /properties/${id}:`, error);
      return { error: 'Failed to fetch property' };
    }
  }

  async createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Property>> {
    await simulateDelay(MOCK_DELAY);

    try {
      const now = new Date().toISOString();
      const newProperty: Property = {
        ...property,
        id: `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: property.status || 'active',
        createdAt: now,
        updatedAt: now,
      };

      this.properties.unshift(newProperty);

      console.log(`🏠 Mock API: Created property ${newProperty.id}`);

      return { data: newProperty };

    } catch (error) {
      console.error('Mock API Error on POST /properties:', error);
      return { error: 'Failed to create property' };
    }
  }

  // Filter Options
  async getFilterOptions(): Promise<ApiResponse<FilterOptions>> {
    await simulateDelay(MOCK_DELAY);

    try {
      // Dynamically calculate filter options from current properties
      const activeProperties = this.properties.filter(p => p.status === 'active');
      
      // Recalculate price ranges
      const priceRanges = MOCK_FILTER_OPTIONS.priceRanges.map(range => ({
        ...range,
        count: activeProperties.filter(p => p.price >= range.min && p.price <= range.max).length
      }));

      // Recalculate locations
      const locationMap = new Map<string, number>();
      activeProperties.forEach(property => {
        locationMap.set(property.city, (locationMap.get(property.city) || 0) + 1);
      });
      const locations = Array.from(locationMap.entries()).map(([city, count]) => ({ city, count }));

      // Recalculate property types
      const typeMap = new Map<string, number>();
      activeProperties.forEach(property => {
        typeMap.set(property.propertyType, (typeMap.get(property.propertyType) || 0) + 1);
      });
      const propertyTypes = Array.from(typeMap.entries()).map(([type, count]) => ({
        type,
        label: type.charAt(0).toUpperCase() + type.slice(1),
        count,
      }));

      // Recalculate features
      const featureMap = new Map<string, number>();
      activeProperties.forEach(property => {
        property.features.forEach(feature => {
          featureMap.set(feature, (featureMap.get(feature) || 0) + 1);
        });
      });
      const features = Array.from(featureMap.entries())
        .map(([feature, count]) => ({ feature, count }))
        .sort((a, b) => b.count - a.count);

      const filterOptions: FilterOptions = {
        priceRanges,
        locations,
        propertyTypes,
        features,
      };

      console.log('🔍 Mock API: Retrieved filter options');

      return { data: filterOptions };

    } catch (error) {
      console.error('Mock API Error on /filters:', error);
      return { 
        data: MOCK_FILTER_OPTIONS,
        error: 'Using fallback filter options'
      };
    }
  }

  // Leads
  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Lead>> {
    await simulateDelay(MOCK_DELAY);

    try {
      const now = new Date().toISOString();
      const newLead: Lead = {
        ...lead,
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'new',
        source: lead.source || 'website',
        createdAt: now,
        updatedAt: now,
      };

      this.leads.unshift(newLead);

      console.log(`📋 Mock API: Created lead ${newLead.id} - ${newLead.firstName} ${newLead.lastName}`);

      return { data: newLead };

    } catch (error) {
      console.error('Mock API Error on POST /leads:', error);
      return { error: 'Failed to create lead' };
    }
  }

  async getLeads(filters: any = {}): Promise<ApiResponse<Lead[]>> {
    await simulateDelay(MOCK_DELAY);

    try {
      let filteredLeads = [...this.leads];

      // Apply filters
      if (filters.status) {
        filteredLeads = filteredLeads.filter(l => l.status === filters.status);
      }
      if (filters.agentId) {
        filteredLeads = filteredLeads.filter(l => l.agentId === filters.agentId);
      }

      // Sort by creation date (newest first)
      filteredLeads.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );

      // Apply pagination
      const page = filters.page || 1;
      const limit = Math.min(filters.limit || 20, 100);
      const result = paginateResults(filteredLeads, page, limit);

      console.log(`📋 Mock API: Retrieved ${result.pagination.total} leads`);

      return {
        data: result.data,
        pagination: result.pagination,
      };

    } catch (error) {
      console.error('Mock API Error on /leads:', error);
      return { error: 'Failed to fetch leads' };
    }
  }

  // Agents
  async getAgents(): Promise<ApiResponse<Agent[]>> {
    await simulateDelay(MOCK_DELAY);

    try {
      const activeAgents = this.agents.filter(agent => agent.isActive);

      console.log(`👥 Mock API: Retrieved ${activeAgents.length} agents`);

      return { data: activeAgents };

    } catch (error) {
      console.error('Mock API Error on /agents:', error);
      return { 
        data: [],
        error: 'Failed to fetch agents'
      };
    }
  }

  async getAgent(id: string): Promise<ApiResponse<Agent>> {
    await simulateDelay(MOCK_DELAY);

    try {
      const agent = this.agents.find(a => a.id === id);
      
      if (!agent) {
        return { error: 'Agent not found' };
      }

      console.log(`👥 Mock API: Retrieved agent ${id}`);

      return { data: agent };

    } catch (error) {
      console.error(`Mock API Error on /agents/${id}:`, error);
      return { error: 'Failed to fetch agent' };
    }
  }

  // Newsletter
  async subscribeNewsletter(email: string, source: string = 'website'): Promise<ApiResponse<any>> {
    await simulateDelay(MOCK_DELAY);

    try {
      const subscription = {
        email,
        source,
        subscribedAt: new Date().toISOString(),
      };

      console.log(`📧 Mock API: Newsletter subscription - ${email}`);

      return { data: subscription };

    } catch (error) {
      console.error('Mock API Error on newsletter subscription:', error);
      return { error: 'Failed to subscribe to newsletter' };
    }
  }

  // Search suggestions
  async getSearchSuggestions(query: string): Promise<ApiResponse<any[]>> {
    await simulateDelay(200); // Faster for autocomplete

    try {
      if (query.length < 2) {
        return { data: [] };
      }

      const suggestions = new Map();
      const searchTerm = query.toLowerCase();

      this.properties.forEach(property => {
        // Address suggestions
        if (property.address.toLowerCase().includes(searchTerm)) {
          const key = `address:${property.address}`;
          suggestions.set(key, {
            type: 'address',
            value: property.address,
            count: (suggestions.get(key)?.count || 0) + 1,
          });
        }
        
        // City suggestions
        if (property.city.toLowerCase().includes(searchTerm)) {
          const key = `city:${property.city}`;
          suggestions.set(key, {
            type: 'city',
            value: property.city,
            count: (suggestions.get(key)?.count || 0) + 1,
          });
        }

        // Feature suggestions
        property.features.forEach(feature => {
          if (feature.toLowerCase().includes(searchTerm)) {
            const key = `feature:${feature}`;
            suggestions.set(key, {
              type: 'feature',
              value: feature,
              count: (suggestions.get(key)?.count || 0) + 1,
            });
          }
        });
      });

      const suggestionArray = Array.from(suggestions.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

      return { data: suggestionArray };

    } catch (error) {
      console.error('Mock API Error on search suggestions:', error);
      return { 
        data: [],
        error: 'Failed to fetch suggestions'
      };
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
    console.log(`⭐ Mock API: Added property ${propertyId} to favorites`);
  }

  removeFavorite(propertyId: string): void {
    const favorites = this.getFavorites().filter(id => id !== propertyId);
    this.saveFavorites(favorites);
    this.favorites.delete(propertyId);
    console.log(`⭐ Mock API: Removed property ${propertyId} from favorites`);
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

  private loadFavorites(): void {
    const favorites = this.getFavorites();
    favorites.forEach(id => this.favorites.add(id));
  }

  // Utility methods
  getConnectionStatus(): 'online' | 'offline' | 'error' {
    return this.connectionStatus;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; mode: string }> {
    await simulateDelay(100);
    return { 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      mode: 'mock'
    };
  }

  // Analytics/Dashboard
  async getDashboardMetrics(): Promise<ApiResponse<any>> {
    await simulateDelay(MOCK_DELAY);

    try {
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const propertyMetrics = {
        total: this.properties.length,
        active: this.properties.filter(p => p.status === 'active').length,
        sold: this.properties.filter(p => p.status === 'sold').length,
        pending: this.properties.filter(p => p.status === 'pending').length,
      };

      const leadMetrics = {
        total: this.leads.length,
        thisMonth: this.leads.filter(l => l.createdAt && new Date(l.createdAt) >= thisMonth).length,
        qualified: this.leads.filter(l => l.status === 'qualified').length,
        converted: this.leads.filter(l => l.status === 'closed').length,
      };

      const activePrices = this.properties
        .filter(p => p.status === 'active')
        .map(p => p.price);

      const performance = {
        averageDaysOnMarket: 28,
        totalVolume: activePrices.reduce((sum, price) => sum + price, 0),
        averagePrice: activePrices.length > 0 
          ? Math.round(activePrices.reduce((sum, price) => sum + price, 0) / activePrices.length)
          : 0,
        topMarkets: ['Fisher Island', 'Bal Harbour', 'Coral Gables', 'Key Biscayne']
      };

      console.log('📊 Mock API: Retrieved dashboard metrics');

      return {
        data: {
          properties: propertyMetrics,
          leads: leadMetrics,
          performance,
        }
      };

    } catch (error) {
      console.error('Mock API Error on dashboard metrics:', error);
      return { error: 'Failed to fetch dashboard metrics' };
    }
  }

  // Development utilities
  resetData(): void {
    this.properties = [...MOCK_PROPERTIES];
    this.agents = [...MOCK_AGENTS];
    this.leads = [...MOCK_LEADS];
    this.favorites.clear();
    localStorage.removeItem('million-favorites');
    console.log('🔄 Mock API: Reset all data to initial state');
  }

  addSampleLead(): void {
    const sampleLead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> = {
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@example.com',
      phone: '(305) 555-DEMO',
      interest: 'buying',
      timeline: '1-3months',
      message: 'Interested in luxury waterfront properties. Please contact me.',
      source: 'website',
    };

    this.createLead(sampleLead);
  }

  // Property status management for demo
  togglePropertyStatus(propertyId: string): void {
    const property = this.properties.find(p => p.id === propertyId);
    if (property) {
      const statuses: Property['status'][] = ['active', 'pending', 'sold', 'off-market'];
      const currentIndex = statuses.indexOf(property.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      property.status = statuses[nextIndex];
      property.updatedAt = new Date().toISOString();
      console.log(`🏠 Mock API: Changed property ${propertyId} status to ${property.status}`);
    }
  }
}

// Export singleton instance
export const mockApiService = new MockApiService();
export default mockApiService;