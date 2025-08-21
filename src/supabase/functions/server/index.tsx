import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';
import { SEED_DATA } from './seeds.ts';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Helper function to validate property object
function isValidProperty(property: any): property is {
  id: string;
  price: number;
  address: string;
  city: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  [key: string]: any;
} {
  return property && 
    typeof property.id === 'string' &&
    typeof property.price === 'number' &&
    typeof property.address === 'string' &&
    typeof property.city === 'string' &&
    typeof property.status === 'string' &&
    typeof property.bedrooms === 'number' &&
    typeof property.bathrooms === 'number' &&
    Array.isArray(property.features);
}

// Helper function to generate property ID
function generateId(): string {
  return `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Enhanced sample data initialization with South Florida luxury properties
async function initializeLuxuryProperties() {
  try {
    const existingProperties = await kv.getByPrefix('property:');
    if (existingProperties.length === 0) {
      console.log('🏖️ Initializing MILLION Real Estate luxury property portfolio...');
      
      // Store luxury agents
      console.log('👥 Creating luxury real estate agent profiles...');
      for (const agent of SEED_DATA.agents) {
        await kv.set(`agent:${agent.id}`, agent);
        console.log(`   ✅ Agent: ${agent.firstName} ${agent.lastName} - ${agent.title}`);
      }

      // Store luxury properties with validation
      console.log('🏡 Creating South Florida luxury property listings...');
      for (const property of SEED_DATA.properties) {
        // Ensure all required fields are present
        const validatedProperty = {
          ...property,
          status: property.status || 'active',
          features: property.features || [],
          description: property.description || '',
          images: property.images || [],
        };

        if (isValidProperty(validatedProperty)) {
          await kv.set(`property:${property.id}`, validatedProperty);
          console.log(`   ✅ Property: ${property.address} - $${property.price.toLocaleString()}`);
        } else {
          console.error(`   ❌ Invalid property data for ${property.id}, skipping`);
        }
      }

      console.log(`🎉 Successfully initialized ${SEED_DATA.properties.length} luxury properties across South Florida`);
      console.log('📍 Coverage areas: Fisher Island, Bal Harbour, Sunny Isles, Coral Gables, Key Biscayne, Aventura, and more');
      
      // Display summary statistics
      const validProperties = SEED_DATA.properties.filter(isValidProperty);
      const priceRanges = {
        'Under $2M': validProperties.filter(p => p.price < 2000000).length,
        '$2M - $5M': validProperties.filter(p => p.price >= 2000000 && p.price < 5000000).length,
        '$5M - $10M': validProperties.filter(p => p.price >= 5000000 && p.price < 10000000).length,
        'Over $10M': validProperties.filter(p => p.price >= 10000000).length,
      };
      
      console.log('📊 Portfolio Summary:');
      Object.entries(priceRanges).forEach(([range, count]) => {
        console.log(`   ${range}: ${count} properties`);
      });
      
    } else {
      console.log(`📋 Found ${existingProperties.length} existing properties in database`);
    }
  } catch (error) {
    console.error('❌ Error initializing luxury property data:', error);
  }
}

// Initialize luxury property data on startup
initializeLuxuryProperties();

// Routes

// Properties
app.get('/make-server-59c5b421/properties', async (c) => {
  try {
    const query = c.req.query();
    const page = parseInt(query.page || '1');
    const limit = Math.min(parseInt(query.limit || '20'), 100);
    const offset = (page - 1) * limit;

    // Get all properties with error handling
    let allPropertyItems;
    try {
      allPropertyItems = await kv.getByPrefix('property:');
    } catch (error) {
      console.error('Error fetching properties from KV store:', error);
      return c.json({ error: 'Failed to fetch properties from database' }, 500);
    }

    // Filter out invalid properties and extract values
    const validProperties = allPropertyItems
      .map(item => item.value)
      .filter((property) => {
        if (!isValidProperty(property)) {
          console.warn(`Invalid property found and filtered out: ${property?.id || 'unknown'}`);
          return false;
        }
        return true;
      });

    let properties = validProperties;

    // Apply filters with null safety
    if (query.minPrice) {
      const minPrice = parseInt(query.minPrice);
      if (!isNaN(minPrice)) {
        properties = properties.filter(p => typeof p.price === 'number' && p.price >= minPrice);
      }
    }
    
    if (query.maxPrice) {
      const maxPrice = parseInt(query.maxPrice);
      if (!isNaN(maxPrice)) {
        properties = properties.filter(p => typeof p.price === 'number' && p.price <= maxPrice);
      }
    }
    
    if (query.bedrooms) {
      const bedrooms = parseInt(query.bedrooms);
      if (!isNaN(bedrooms)) {
        properties = properties.filter(p => typeof p.bedrooms === 'number' && p.bedrooms >= bedrooms);
      }
    }
    
    if (query.bathrooms) {
      const bathrooms = parseInt(query.bathrooms);
      if (!isNaN(bathrooms)) {
        properties = properties.filter(p => typeof p.bathrooms === 'number' && p.bathrooms >= bathrooms);
      }
    }
    
    if (query.city) {
      properties = properties.filter(p => 
        p.city && p.city.toLowerCase().includes(query.city.toLowerCase())
      );
    }
    
    if (query.propertyType) {
      properties = properties.filter(p => p.propertyType === query.propertyType);
    }
    
    if (query.status) {
      properties = properties.filter(p => p.status === query.status);
    } else {
      // Default to active properties only
      properties = properties.filter(p => p.status === 'active');
    }
    
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      properties = properties.filter(p => 
        (p.address && p.address.toLowerCase().includes(searchTerm)) ||
        (p.city && p.city.toLowerCase().includes(searchTerm)) ||
        (p.description && p.description.toLowerCase().includes(searchTerm)) ||
        (Array.isArray(p.features) && p.features.some(feature => 
          typeof feature === 'string' && feature.toLowerCase().includes(searchTerm)
        ))
      );
    }

    // Filter by features if specified
    if (query.features) {
      const requestedFeatures = Array.isArray(query.features) ? query.features : [query.features];
      properties = properties.filter(p => 
        Array.isArray(p.features) && requestedFeatures.some(feature => 
          p.features.some(pFeature => 
            typeof pFeature === 'string' && typeof feature === 'string' &&
            pFeature.toLowerCase().includes(feature.toLowerCase())
          )
        )
      );
    }

    // Apply sorting with null safety
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'desc';
    
    properties.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      // Handle undefined values
      if (aVal === undefined && bVal === undefined) return 0;
      if (aVal === undefined) return sortOrder === 'asc' ? 1 : -1;
      if (bVal === undefined) return sortOrder === 'asc' ? -1 : 1;
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Pagination
    const total = properties.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedProperties = properties.slice(offset, offset + limit);

    return c.json({
      data: paginatedProperties,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error in properties endpoint:', error);
    return c.json({ 
      error: 'Failed to fetch properties',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

app.get('/make-server-59c5b421/properties/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const property = await kv.get(`property:${id}`);
    
    if (!property) {
      return c.json({ error: 'Property not found' }, 404);
    }

    if (!isValidProperty(property)) {
      console.error(`Invalid property data for ID ${id}`);
      return c.json({ error: 'Property data is invalid' }, 500);
    }

    // Get agent info
    let agent = null;
    if (property.agentId) {
      try {
        agent = await kv.get(`agent:${property.agentId}`);
      } catch (error) {
        console.warn(`Failed to fetch agent ${property.agentId}:`, error);
      }
    }

    return c.json({
      data: property,
      agent,
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    return c.json({ 
      error: 'Failed to fetch property',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

app.post('/make-server-59c5b421/properties', async (c) => {
  try {
    const body = await c.req.json();
    const id = generateId();
    const now = new Date().toISOString();
    
    const property = {
      id,
      ...body,
      status: body.status || 'active',
      features: Array.isArray(body.features) ? body.features : [],
      images: Array.isArray(body.images) ? body.images : [],
      createdAt: now,
      updatedAt: now,
    };

    // Validate the property before saving
    if (!isValidProperty(property)) {
      return c.json({ error: 'Invalid property data provided' }, 400);
    }

    await kv.set(`property:${id}`, property);
    
    return c.json({ data: property }, 201);
  } catch (error) {
    console.error('Error creating property:', error);
    return c.json({ 
      error: 'Failed to create property',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

app.put('/make-server-59c5b421/properties/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(`property:${id}`);
    if (!existing) {
      return c.json({ error: 'Property not found' }, 404);
    }

    const updated = {
      ...existing,
      ...updates,
      id: existing.id, // Prevent ID from being changed
      createdAt: existing.createdAt, // Prevent createdAt from being changed
      updatedAt: new Date().toISOString(),
    };

    // Validate the updated property
    if (!isValidProperty(updated)) {
      return c.json({ error: 'Updated property data is invalid' }, 400);
    }

    await kv.set(`property:${id}`, updated);
    
    return c.json({ data: updated });
  } catch (error) {
    console.error('Error updating property:', error);
    return c.json({ 
      error: 'Failed to update property',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

app.delete('/make-server-59c5b421/properties/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const existing = await kv.get(`property:${id}`);
    if (!existing) {
      return c.json({ error: 'Property not found' }, 404);
    }

    await kv.del(`property:${id}`);
    
    return c.json({ data: null });
  } catch (error) {
    console.error('Error deleting property:', error);
    return c.json({ 
      error: 'Failed to delete property',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Leads
app.post('/make-server-59c5b421/leads', async (c) => {
  try {
    const body = await c.req.json();
    const id = generateLeadId();
    const now = new Date().toISOString();
    
    const lead = {
      id,
      ...body,
      status: 'new',
      source: body.source || 'website',
      createdAt: now,
      updatedAt: now,
    };

    await kv.set(`lead:${id}`, lead);
    
    console.log(`🎯 New lead captured: ${lead.firstName} ${lead.lastName} - ${lead.email} (Interest: ${lead.interest})`);
    
    return c.json({ data: lead }, 201);
  } catch (error) {
    console.error('Error creating lead:', error);
    return c.json({ 
      error: 'Failed to create lead',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

app.get('/make-server-59c5b421/leads', async (c) => {
  try {
    const query = c.req.query();
    const page = parseInt(query.page || '1');
    const limit = Math.min(parseInt(query.limit || '20'), 100);
    const offset = (page - 1) * limit;

    let leadItems = await kv.getByPrefix('lead:');
    let leads = leadItems
      .map(item => item.value)
      .filter(lead => lead && typeof lead === 'object');

    // Apply filters
    if (query.status) {
      leads = leads.filter(l => l.status === query.status);
    }
    
    if (query.agentId) {
      leads = leads.filter(l => l.agentId === query.agentId);
    }

    // Sort by creation date (newest first)
    leads.sort((a, b) => {
      const aDate = new Date(a.createdAt || 0).getTime();
      const bDate = new Date(b.createdAt || 0).getTime();
      return bDate - aDate;
    });

    // Pagination
    const total = leads.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedLeads = leads.slice(offset, offset + limit);

    return c.json({
      data: paginatedLeads,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return c.json({ 
      error: 'Failed to fetch leads',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

app.put('/make-server-59c5b421/leads/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(`lead:${id}`);
    if (!existing) {
      return c.json({ error: 'Lead not found' }, 404);
    }

    const updated = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`lead:${id}`, updated);
    
    return c.json({ data: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    return c.json({ 
      error: 'Failed to update lead',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Agents
app.get('/make-server-59c5b421/agents', async (c) => {
  try {
    const agentItems = await kv.getByPrefix('agent:');
    const activeAgents = agentItems
      .map(item => item.value)
      .filter(agent => agent && typeof agent === 'object' && agent.isActive);

    return c.json({ data: activeAgents });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return c.json({ 
      error: 'Failed to fetch agents',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

app.get('/make-server-59c5b421/agents/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const agent = await kv.get(`agent:${id}`);
    
    if (!agent) {
      return c.json({ error: 'Agent not found' }, 404);
    }

    return c.json({ data: agent });
  } catch (error) {
    console.error('Error fetching agent:', error);
    return c.json({ 
      error: 'Failed to fetch agent',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Search suggestions
app.get('/make-server-59c5b421/search/suggestions', async (c) => {
  try {
    const query = c.req.query('q')?.toLowerCase() || '';
    
    if (query.length < 2) {
      return c.json({ suggestions: [] });
    }

    const propertyItems = await kv.getByPrefix('property:');
    const properties = propertyItems
      .map(item => item.value)
      .filter(isValidProperty);

    const suggestions = new Map();

    properties.forEach(property => {
      // Address suggestions
      if (property.address && property.address.toLowerCase().includes(query)) {
        const key = `address:${property.address}`;
        suggestions.set(key, {
          type: 'address',
          value: property.address,
          count: (suggestions.get(key)?.count || 0) + 1,
        });
      }
      
      // City suggestions
      if (property.city && property.city.toLowerCase().includes(query)) {
        const key = `city:${property.city}`;
        suggestions.set(key, {
          type: 'city',
          value: property.city,
          count: (suggestions.get(key)?.count || 0) + 1,
        });
      }

      // Feature suggestions
      if (Array.isArray(property.features)) {
        property.features.forEach(feature => {
          if (typeof feature === 'string' && feature.toLowerCase().includes(query)) {
            const key = `feature:${feature}`;
            suggestions.set(key, {
              type: 'feature',
              value: feature,
              count: (suggestions.get(key)?.count || 0) + 1,
            });
          }
        });
      }
    });

    const suggestionArray = Array.from(suggestions.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return c.json({ suggestions: suggestionArray });
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    return c.json({ 
      error: 'Failed to fetch suggestions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Filter options
app.get('/make-server-59c5b421/filters', async (c) => {
  try {
    const propertyItems = await kv.getByPrefix('property:');
    const allProperties = propertyItems
      .map(item => item.value)
      .filter(isValidProperty);

    const activeProperties = allProperties.filter(p => p.status === 'active');

    if (activeProperties.length === 0) {
      return c.json({
        data: {
          priceRanges: [],
          locations: [],
          propertyTypes: [],
          features: [],
        },
      });
    }

    // Price ranges
    const prices = activeProperties.map(p => p.price).sort((a, b) => a - b);
    const priceRanges = [
      { label: 'Under $2M', min: 0, max: 1999999, count: 0 },
      { label: '$2M - $5M', min: 2000000, max: 4999999, count: 0 },
      { label: '$5M - $10M', min: 5000000, max: 9999999, count: 0 },
      { label: '$10M - $20M', min: 10000000, max: 19999999, count: 0 },
      { label: 'Over $20M', min: 20000000, max: 999999999, count: 0 },
    ];

    activeProperties.forEach(property => {
      if (typeof property.price === 'number') {
        priceRanges.forEach(range => {
          if (property.price >= range.min && property.price <= range.max) {
            range.count++;
          }
        });
      }
    });

    // Cities
    const cityMap = new Map();
    activeProperties.forEach(property => {
      if (property.city) {
        const count = cityMap.get(property.city) || 0;
        cityMap.set(property.city, count + 1);
      }
    });
    const locations = Array.from(cityMap.entries()).map(([city, count]) => ({ city, count }));

    // Property types
    const typeMap = new Map();
    activeProperties.forEach(property => {
      if (property.propertyType) {
        const count = typeMap.get(property.propertyType) || 0;
        typeMap.set(property.propertyType, count + 1);
      }
    });
    const propertyTypes = Array.from(typeMap.entries()).map(([type, count]) => ({
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      count,
    }));

    // Features
    const featureMap = new Map();
    activeProperties.forEach(property => {
      if (Array.isArray(property.features)) {
        property.features.forEach(feature => {
          if (typeof feature === 'string') {
            const count = featureMap.get(feature) || 0;
            featureMap.set(feature, count + 1);
          }
        });
      }
    });
    const features = Array.from(featureMap.entries())
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    return c.json({
      data: {
        priceRanges,
        locations,
        propertyTypes,
        features,
      },
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return c.json({ 
      error: 'Failed to fetch filter options',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Newsletter subscription
app.post('/make-server-59c5b421/newsletter/subscribe', async (c) => {
  try {
    const body = await c.req.json();
    const { email, source } = body;

    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    // Store newsletter subscription
    const subscription = {
      email,
      source: source || 'website',
      subscribedAt: new Date().toISOString(),
    };

    await kv.set(`newsletter:${email}`, subscription);
    
    console.log(`📧 Newsletter subscription: ${email} (source: ${source || 'website'})`);
    
    return c.json({ data: subscription }, 201);
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return c.json({ 
      error: 'Failed to subscribe to newsletter',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Analytics dashboard (basic metrics)
app.get('/make-server-59c5b421/analytics/dashboard', async (c) => {
  try {
    const propertyItems = await kv.getByPrefix('property:');
    const leadItems = await kv.getByPrefix('lead:');

    const propertyData = propertyItems
      .map(item => item.value)
      .filter(isValidProperty);
    
    const leadData = leadItems
      .map(item => item.value)
      .filter(lead => lead && typeof lead === 'object');

    // Property metrics
    const propertyMetrics = {
      total: propertyData.length,
      active: propertyData.filter(p => p.status === 'active').length,
      sold: propertyData.filter(p => p.status === 'sold').length,
      pending: propertyData.filter(p => p.status === 'pending').length,
    };

    // Lead metrics
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const leadMetrics = {
      total: leadData.length,
      thisMonth: leadData.filter(l => l.createdAt && new Date(l.createdAt) >= thisMonth).length,
      qualified: leadData.filter(l => l.status === 'qualified').length,
      converted: leadData.filter(l => l.status === 'closed').length,
    };

    // Performance metrics
    const activePrices = propertyData
      .filter(p => p.status === 'active')
      .map(p => p.price)
      .filter(price => typeof price === 'number');
    
    const performance = {
      averageDaysOnMarket: 28, // Mock data
      totalVolume: activePrices.reduce((sum, price) => sum + price, 0),
      averagePrice: activePrices.length > 0 
        ? Math.round(activePrices.reduce((sum, price) => sum + price, 0) / activePrices.length)
        : 0,
      topMarkets: ['Fisher Island', 'Bal Harbour', 'Coral Gables', 'Key Biscayne']
    };

    return c.json({
      data: {
        properties: propertyMetrics,
        leads: leadMetrics,
        performance,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return c.json({ 
      error: 'Failed to fetch dashboard metrics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Health check
app.get('/make-server-59c5b421/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'MILLION Real Estate API',
    version: '1.0.0',
    properties: 'South Florida Luxury Portfolio'
  });
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ 
    error: 'Internal server error',
    message: err.message 
  }, 500);
});

Deno.serve(app.fetch);