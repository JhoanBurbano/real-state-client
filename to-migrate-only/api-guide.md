# MILLION Real Estate API Guide

## Overview

This guide outlines the API endpoints needed to power the MILLION luxury real estate application. The API should provide comprehensive property management, user authentication, lead capture, and content management capabilities.

## Base URL
```
https://api.million-realestate.com/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Core Entities

### Property
```typescript
interface Property {
  id: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  parking: number;
  yearBuilt: number;
  propertyType: 'house' | 'condo' | 'penthouse' | 'townhouse';
  status: 'active' | 'sold' | 'pending' | 'off-market';
  badge?: 'New' | 'Hot' | 'Sold' | 'Reduced';
  description: string;
  features: string[];
  images: PropertyImage[];
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}
```

### Agent
```typescript
interface Agent {
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
```

### Lead
```typescript
interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: 'buying' | 'selling' | 'renting' | 'investment' | 'consultation';
  timeline: 'immediately' | '1-3months' | '3-6months' | '6-12months' | 'over1year';
  message: string;
  propertyId?: string;
  agentId?: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  source: 'website' | 'referral' | 'social' | 'advertising';
  createdAt: string;
  updatedAt: string;
}
```

## API Endpoints

### Properties

#### Get Properties (with filtering and pagination)
```
GET /properties
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `bedrooms` (number): Number of bedrooms
- `bathrooms` (number): Number of bathrooms
- `minSquareFeet` (number): Minimum square footage
- `maxSquareFeet` (number): Maximum square footage
- `propertyType` (string): Property type filter
- `city` (string): City filter
- `features` (string[]): Array of feature filters
- `status` (string): Property status (default: 'active')
- `sortBy` (string): Sort field (price, createdAt, squareFeet, etc.)
- `sortOrder` (string): 'asc' or 'desc' (default: 'desc')
- `search` (string): Search query for address/description

**Response:**
```json
{
  "data": Property[],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "appliedFilters": {
      "minPrice": 500000,
      "maxPrice": 5000000,
      "city": "Miami Beach"
    },
    "availableFilters": {
      "cities": ["Miami Beach", "Bal Harbour", "Key Biscayne"],
      "propertyTypes": ["house", "condo", "penthouse"],
      "priceRange": { "min": 200000, "max": 15000000 },
      "bedroomRange": { "min": 1, "max": 8 },
      "bathroomRange": { "min": 1, "max": 10 }
    }
  }
}
```

#### Get Property by ID
```
GET /properties/{id}
```

**Response:**
```json
{
  "data": Property,
  "agent": Agent,
  "similarProperties": Property[]
}
```

#### Create Property (Admin only)
```
POST /properties
```

**Request Body:**
```json
{
  "price": 2850000,
  "address": "1234 Ocean Drive",
  "city": "Miami Beach",
  "state": "FL",
  "zipCode": "33139",
  "latitude": 25.7617,
  "longitude": -80.1918,
  "bedrooms": 4,
  "bathrooms": 3,
  "squareFeet": 3200,
  "parking": 2,
  "yearBuilt": 2020,
  "propertyType": "house",
  "description": "Stunning waterfront residence...",
  "features": ["Ocean View", "Private Beach Access"],
  "agentId": "agent-123"
}
```

#### Update Property (Admin only)
```
PUT /properties/{id}
```

#### Delete Property (Admin only)
```
DELETE /properties/{id}
```

### Property Images

#### Upload Property Images
```
POST /properties/{id}/images
```

**Content-Type:** `multipart/form-data`

**Form Data:**
- `images`: File uploads (max 20 images, 10MB each)
- `descriptions`: Array of alt text descriptions

#### Reorder Property Images
```
PUT /properties/{id}/images/order
```

**Request Body:**
```json
{
  "imageOrder": [
    { "id": "img-1", "order": 1, "isPrimary": true },
    { "id": "img-2", "order": 2, "isPrimary": false }
  ]
}
```

### Agents

#### Get Agents
```
GET /agents
```

#### Get Agent by ID
```
GET /agents/{id}
```

**Response:**
```json
{
  "data": Agent,
  "properties": Property[],
  "recentSales": Property[],
  "stats": {
    "totalSales": 45,
    "totalVolume": 125000000,
    "averageDaysOnMarket": 32,
    "clientSatisfaction": 4.9
  }
}
```

### Leads

#### Create Lead (Public endpoint)
```
POST /leads
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "interest": "buying",
  "timeline": "1-3months",
  "message": "Looking for a waterfront property...",
  "propertyId": "prop-123",
  "source": "website"
}
```

#### Get Leads (Admin/Agent only)
```
GET /leads
```

**Query Parameters:**
- `page`, `limit`: Pagination
- `status`: Filter by lead status
- `agentId`: Filter by assigned agent
- `dateFrom`, `dateTo`: Date range filter
- `source`: Filter by lead source

#### Update Lead Status (Admin/Agent only)
```
PUT /leads/{id}
```

**Request Body:**
```json
{
  "status": "contacted",
  "agentId": "agent-123",
  "notes": "Initial contact made, scheduling viewing"
}
```

### Search & Filters

#### Get Search Suggestions
```
GET /search/suggestions?q={query}
```

**Response:**
```json
{
  "suggestions": [
    {
      "type": "address",
      "value": "Ocean Drive",
      "count": 12
    },
    {
      "type": "neighborhood",
      "value": "South Beach",
      "count": 45
    },
    {
      "type": "city",
      "value": "Miami Beach",
      "count": 156
    }
  ]
}
```

#### Get Filter Options
```
GET /filters
```

**Response:**
```json
{
  "priceRanges": [
    { "label": "Under $1M", "min": 0, "max": 999999, "count": 23 },
    { "label": "$1M - $2M", "min": 1000000, "max": 1999999, "count": 45 }
  ],
  "locations": [
    { "city": "Miami Beach", "count": 156 },
    { "city": "Bal Harbour", "count": 23 }
  ],
  "propertyTypes": [
    { "type": "house", "label": "Single Family", "count": 89 },
    { "type": "condo", "label": "Condominium", "count": 67 }
  ],
  "features": [
    { "feature": "Ocean View", "count": 45 },
    { "feature": "Pool", "count": 78 }
  ]
}
```

### Analytics (Admin only)

#### Get Dashboard Metrics
```
GET /analytics/dashboard
```

**Response:**
```json
{
  "properties": {
    "total": 234,
    "active": 198,
    "sold": 36,
    "pending": 12
  },
  "leads": {
    "total": 156,
    "thisMonth": 23,
    "qualified": 45,
    "converted": 12
  },
  "performance": {
    "averageDaysOnMarket": 45,
    "totalVolume": 125000000,
    "averagePrice": 2850000
  },
  "topPerformers": {
    "agents": Agent[],
    "properties": Property[]
  }
}
```

### Content Management

#### Get Page Content
```
GET /content/{pageSlug}
```

**Response:**
```json
{
  "slug": "about",
  "title": "About MILLION",
  "content": {
    "hero": {
      "title": "Redefining Luxury Real Estate",
      "subtitle": "...",
      "image": "https://..."
    },
    "sections": [
      {
        "type": "text",
        "title": "Our Story",
        "content": "..."
      }
    ]
  }
}
```

### Notifications

#### Send Newsletter Signup (Public endpoint)
```
POST /newsletter/subscribe
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "source": "footer"
}
```

#### Send Property Alert
```
POST /alerts/property
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "criteria": {
    "minPrice": 1000000,
    "maxPrice": 3000000,
    "cities": ["Miami Beach", "Bal Harbour"],
    "propertyTypes": ["condo", "penthouse"]
  }
}
```

## Error Handling

All endpoints should return consistent error responses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2025-01-20T10:30:00Z",
  "requestId": "req-abc123"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limited
- `500` - Internal Server Error

## Rate Limiting

- Public endpoints: 100 requests/minute per IP
- Authenticated endpoints: 1000 requests/minute per user
- File uploads: 10 requests/minute per user

## Data Validation

### Property Validation
- Price: Required, positive number
- Address: Required, non-empty string
- Bedrooms/Bathrooms: Required, positive integers
- Square feet: Required, positive number
- Images: Max 20 per property, supported formats: JPG, PNG, WebP

### Lead Validation
- Email: Required, valid email format
- Phone: Required, valid phone format
- Names: Required, 2-50 characters
- Interest: Required, one of allowed values

## Security Considerations

1. **Input Sanitization**: All user inputs must be sanitized
2. **SQL Injection Protection**: Use parameterized queries
3. **File Upload Security**: Validate file types, scan for malware
4. **Rate Limiting**: Implement comprehensive rate limiting
5. **CORS**: Configure appropriate CORS policies
6. **Data Privacy**: Comply with GDPR/CCPA for user data

## Performance Requirements

- Response time: < 200ms for property listings
- Image optimization: Auto-resize and compress uploaded images
- Caching: Implement Redis caching for frequently accessed data
- Database: Use indexes on commonly queried fields
- CDN: Use CDN for image delivery

## Monitoring & Logging

- Log all API requests with response times
- Monitor error rates and performance metrics
- Set up alerts for high error rates or slow responses
- Track business metrics (leads, property views, etc.)

## Development Setup

### Environment Variables
```bash
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=million-properties
JWT_SECRET=...
SENDGRID_API_KEY=...
```

### Database Migrations
Ensure proper database schema with indexes on:
- `properties.price`
- `properties.city`
- `properties.bedrooms`
- `properties.bathrooms`
- `properties.status`
- `properties.created_at`
- `leads.created_at`
- `leads.status`

This API specification provides a comprehensive foundation for building the backend services needed to power the MILLION luxury real estate application.