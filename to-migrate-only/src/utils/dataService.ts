/**
 * MILLION Real Estate - Data Service Abstraction Layer
 * Provides a unified interface that can switch between mock and real API
 */

import type { Property, Agent, Lead, FilterOptions, ApiResponse, PropertyFilters } from './api';
import { apiService } from './api';
import { mockApiService } from './mockApiService';

// Environment configuration
const USE_MOCK_DATA = true; // Set to false to use real Supabase API
const ENABLE_LOGGING = true; // Set to false in production

// Service mode type
export type ServiceMode = 'mock' | 'api' | 'hybrid';

interface DataServiceConfig {
  mode: ServiceMode;
  enableLogging: boolean;
  fallbackToMock: boolean; // If API fails, fallback to mock
}

class DataService {
  private config: DataServiceConfig;
  private currentService: typeof apiService | typeof mockApiService;

  constructor(config: Partial<DataServiceConfig> = {}) {
    this.config = {
      mode: USE_MOCK_DATA ? 'mock' : 'api',
      enableLogging: ENABLE_LOGGING,
      fallbackToMock: true,
      ...config
    };

    this.currentService = this.config.mode === 'mock' ? mockApiService : apiService;
    
    if (this.config.enableLogging) {
      console.log(`🔗 DataService initialized in ${this.config.mode} mode`);
    }
  }

  // Service mode management
  switchToMock(): void {
    this.config.mode = 'mock';
    this.currentService = mockApiService;
    if (this.config.enableLogging) {
      console.log('🔗 DataService switched to mock mode');
    }
  }

  switchToAPI(): void {
    this.config.mode = 'api';
    this.currentService = apiService;
    if (this.config.enableLogging) {
      console.log('🔗 DataService switched to API mode');
    }
  }

  getCurrentMode(): ServiceMode {
    return this.config.mode;
  }

  // Wrapper method with fallback logic
  private async executeWithFallback<T>(
    operation: () => Promise<ApiResponse<T>>,
    operationName: string
  ): Promise<ApiResponse<T>> {
    try {
      const result = await operation();
      
      if (this.config.enableLogging && !result.error) {
        console.log(`✅ ${operationName} successful (${this.config.mode} mode)`);
      }
      
      return result;
      
    } catch (error) {
      if (this.config.enableLogging) {
        console.error(`❌ ${operationName} failed in ${this.config.mode} mode:`, error);
      }

      // Fallback to mock if enabled and we're not already using mock
      if (this.config.fallbackToMock && this.config.mode !== 'mock') {
        if (this.config.enableLogging) {
          console.log(`🔄 Falling back to mock for ${operationName}`);
        }
        
        try {
          return await this.executeWithMockFallback(operation, operationName);
        } catch (fallbackError) {
          if (this.config.enableLogging) {
            console.error(`❌ Mock fallback also failed for ${operationName}:`, fallbackError);
          }
          return { error: `Both API and mock failed for ${operationName}` };
        }
      }

      return { error: error instanceof Error ? error.message : `${operationName} failed` };
    }
  }

  private async executeWithMockFallback<T>(
    operation: () => Promise<ApiResponse<T>>,
    operationName: string
  ): Promise<ApiResponse<T>> {
    const originalService = this.currentService;
    this.currentService = mockApiService;
    
    try {
      const result = await operation();
      return {
        ...result,
        error: result.error || 'Using offline data due to connection issues'
      };
    } finally {
      this.currentService = originalService;
    }
  }

  // Properties API
  async getProperties(filters: PropertyFilters = {}): Promise<ApiResponse<Property[]>> {
    return this.executeWithFallback(
      () => this.currentService.getProperties(filters),
      'getProperties'
    );
  }

  async getProperty(id: string): Promise<ApiResponse<Property>> {
    return this.executeWithFallback(
      () => this.currentService.getProperty(id),
      'getProperty'
    );
  }

  async createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Property>> {
    return this.executeWithFallback(
      () => this.currentService.createProperty(property),
      'createProperty'
    );
  }

  // Filter Options API
  async getFilterOptions(): Promise<ApiResponse<FilterOptions>> {
    return this.executeWithFallback(
      () => this.currentService.getFilterOptions(),
      'getFilterOptions'
    );
  }

  // Leads API
  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Lead>> {
    return this.executeWithFallback(
      () => this.currentService.createLead(lead),
      'createLead'
    );
  }

  async getLeads(filters: any = {}): Promise<ApiResponse<Lead[]>> {
    return this.executeWithFallback(
      () => this.currentService.getLeads(filters),
      'getLeads'
    );
  }

  // Agents API
  async getAgents(): Promise<ApiResponse<Agent[]>> {
    return this.executeWithFallback(
      () => this.currentService.getAgents(),
      'getAgents'
    );
  }

  async getAgent(id: string): Promise<ApiResponse<Agent>> {
    return this.executeWithFallback(
      () => this.currentService.getAgent(id),
      'getAgent'
    );
  }

  // Newsletter API
  async subscribeNewsletter(email: string, source: string = 'website'): Promise<ApiResponse<any>> {
    return this.executeWithFallback(
      () => this.currentService.subscribeNewsletter(email, source),
      'subscribeNewsletter'
    );
  }

  // Search API
  async getSearchSuggestions(query: string): Promise<ApiResponse<any[]>> {
    // Search suggestions should be fast, so only use current service without fallback
    try {
      if (this.currentService === mockApiService) {
        return await mockApiService.getSearchSuggestions(query);
      } else {
        // For real API, we don't have this method yet, so use mock
        return await mockApiService.getSearchSuggestions(query);
      }
    } catch (error) {
      return { 
        data: [],
        error: 'Failed to fetch search suggestions'
      };
    }
  }

  // Favorites API (always uses current service's implementation)
  getFavorites(): string[] {
    return this.currentService.getFavorites();
  }

  addFavorite(propertyId: string): void {
    this.currentService.addFavorite(propertyId);
  }

  removeFavorite(propertyId: string): void {
    this.currentService.removeFavorite(propertyId);
  }

  isFavorite(propertyId: string): boolean {
    return this.currentService.isFavorite(propertyId);
  }

  // Utility methods
  getConnectionStatus(): 'online' | 'offline' | 'error' | 'mock' {
    if (this.config.mode === 'mock') {
      return 'mock';
    }
    return this.currentService.getConnectionStatus();
  }

  async healthCheck(): Promise<{ status: string; timestamp: string; mode?: string }> {
    try {
      const result = await this.currentService.healthCheck();
      return {
        ...result,
        mode: this.config.mode
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        mode: this.config.mode
      };
    }
  }

  // Development utilities (only available in mock mode)
  resetData(): void {
    if (this.config.mode === 'mock' && 'resetData' in mockApiService) {
      mockApiService.resetData();
    } else {
      console.warn('resetData() is only available in mock mode');
    }
  }

  addSampleLead(): void {
    if (this.config.mode === 'mock' && 'addSampleLead' in mockApiService) {
      mockApiService.addSampleLead();
    } else {
      console.warn('addSampleLead() is only available in mock mode');
    }
  }

  togglePropertyStatus(propertyId: string): void {
    if (this.config.mode === 'mock' && 'togglePropertyStatus' in mockApiService) {
      mockApiService.togglePropertyStatus(propertyId);
    } else {
      console.warn('togglePropertyStatus() is only available in mock mode');
    }
  }

  // Configuration management
  setLogging(enabled: boolean): void {
    this.config.enableLogging = enabled;
  }

  setFallbackEnabled(enabled: boolean): void {
    this.config.fallbackToMock = enabled;
  }

  getConfig(): DataServiceConfig {
    return { ...this.config };
  }

  // Migration utilities
  async migrateToSupabase(): Promise<{ success: boolean; message: string }> {
    if (this.config.mode !== 'mock') {
      return { success: false, message: 'Can only migrate from mock mode' };
    }

    try {
      // Test API connection
      const healthCheck = await apiService.healthCheck();
      
      if (healthCheck.status !== 'healthy') {
        return { success: false, message: 'API health check failed' };
      }

      // Switch to API mode
      this.switchToAPI();
      
      if (this.config.enableLogging) {
        console.log('🚀 Successfully migrated to Supabase API');
      }

      return { success: true, message: 'Successfully migrated to Supabase API' };

    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Migration failed' 
      };
    }
  }

  async testConnection(): Promise<{ success: boolean; latency: number; mode: string }> {
    const startTime = Date.now();
    
    try {
      await this.healthCheck();
      const latency = Date.now() - startTime;
      
      return {
        success: true,
        latency,
        mode: this.config.mode
      };
      
    } catch (error) {
      return {
        success: false,
        latency: Date.now() - startTime,
        mode: this.config.mode
      };
    }
  }
}

// Export singleton instance
export const dataService = new DataService();

// Export for React Context if needed
export { DataService };

// Default export
export default dataService;