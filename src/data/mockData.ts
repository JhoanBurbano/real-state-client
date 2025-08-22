import type { Property, Agent, Lead } from '@/types/property'

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'agent1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@million.com',
    phone: '+1 (310) 555-0101',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    rating: 4.9,
    experience: 12,
    specialties: ['Luxury Homes', 'Penthouse', 'Ocean View Properties'],
    properties: ['1', '4'],
    bio: 'Top luxury real estate agent with over 12 years of experience in Beverly Hills and surrounding areas.',
  },
  {
    id: 'agent2',
    name: 'Michael Chen',
    email: 'michael.chen@million.com',
    phone: '+1 (310) 555-0102',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.8,
    experience: 15,
    specialties: ['Estate Properties', 'Villas', 'Investment Properties'],
    properties: ['2', '5'],
    bio: 'Specialized in high-end estate properties and investment opportunities across Los Angeles.',
  },
  {
    id: 'agent3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@million.com',
    phone: '+1 (310) 555-0103',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 4.7,
    experience: 8,
    specialties: ['Townhouses', 'Condos', 'First-time Buyers'],
    properties: ['3', '6'],
    bio: 'Expert in helping first-time buyers and families find their perfect home in prime locations.',
  },
]

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse with Ocean View',
    description:
      'Stunning penthouse with panoramic ocean views, high-end finishes, and private terrace. Located in the heart of Beverly Hills.',
    price: 8500000,
    location: 'Beverly Hills, CA',
    bedrooms: 4,
    bathrooms: 5,
    squareFeet: 4500,
    status: 'forSale',
    type: 'penthouse',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
    features: [
      'Ocean View',
      'Private Terrace',
      'Smart Home',
      'Wine Cellar',
      'Gym',
    ],
    amenities: ['Pool', 'Spa', 'Concierge', 'Security', 'Parking'],
    agent: MOCK_AGENTS[0],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    coordinates: { latitude: 34.0736, longitude: -118.4004 },
  },
  {
    id: '2',
    title: 'Modern Villa in Bel Air',
    description:
      'Contemporary villa featuring open-concept design, floor-to-ceiling windows, and stunning city skyline views.',
    price: 12500000,
    location: 'Bel Air, CA',
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 6800,
    status: 'forSale',
    type: 'villa',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    features: [
      'City View',
      'Smart Home',
      'Home Theater',
      'Wine Room',
      'Chef Kitchen',
    ],
    amenities: ['Pool', 'Tennis Court', 'Garden', 'Security', 'Garage'],
    agent: MOCK_AGENTS[1],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    coordinates: { latitude: 34.0928, longitude: -118.4595 },
  },
  {
    id: '3',
    title: 'Elegant Townhouse in Brentwood',
    description:
      'Sophisticated townhouse with classic architecture, premium materials, and private garden oasis.',
    price: 4200000,
    location: 'Brentwood, CA',
    bedrooms: 3,
    bathrooms: 4,
    squareFeet: 3200,
    status: 'forSale',
    type: 'townhouse',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ],
    features: [
      'Garden View',
      'Hardwood Floors',
      'Fireplace',
      'Built-in Shelves',
      'Walk-in Closet',
    ],
    amenities: ['Pool', 'Garden', 'Security', 'Parking', 'Storage'],
    agent: MOCK_AGENTS[2],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    coordinates: { latitude: 34.0522, longitude: -118.2437 },
  },
  {
    id: '4',
    title: 'Luxury Apartment in Century City',
    description:
      'High-end apartment with modern amenities, stunning city views, and access to world-class facilities.',
    price: 2800000,
    location: 'Century City, CA',
    bedrooms: 2,
    bathrooms: 3,
    squareFeet: 1800,
    status: 'forRent',
    type: 'apartment',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    features: [
      'City View',
      'Balcony',
      'Walk-in Closet',
      'Gourmet Kitchen',
      'In-unit Laundry',
    ],
    amenities: ['Pool', 'Gym', 'Concierge', 'Security', 'Parking'],
    agent: MOCK_AGENTS[0],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    coordinates: { latitude: 34.0584, longitude: -118.4176 },
  },
  {
    id: '5',
    title: 'Classic Estate in Pacific Palisades',
    description:
      'Timeless estate with traditional architecture, manicured grounds, and ocean breezes.',
    price: 18500000,
    location: 'Pacific Palisades, CA',
    bedrooms: 6,
    bathrooms: 8,
    squareFeet: 8500,
    status: 'forSale',
    type: 'house',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
    features: [
      'Ocean View',
      'Tennis Court',
      'Guest House',
      'Library',
      'Formal Dining',
    ],
    amenities: ['Pool', 'Spa', 'Garden', 'Security', 'Garage'],
    agent: MOCK_AGENTS[1],
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
    coordinates: { latitude: 34.0469, longitude: -118.5265 },
  },
  {
    id: '6',
    title: 'Contemporary Studio in West Hollywood',
    description:
      'Sleek studio apartment with modern design, high ceilings, and prime location near shopping and dining.',
    price: 850000,
    location: 'West Hollywood, CA',
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 750,
    status: 'forSale',
    type: 'studio',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ],
    features: [
      'High Ceilings',
      'Modern Kitchen',
      'Walk-in Closet',
      'Balcony',
      'Hardwood Floors',
    ],
    amenities: ['Pool', 'Gym', 'Rooftop Deck', 'Security', 'Parking'],
    agent: MOCK_AGENTS[2],
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
    coordinates: { latitude: 34.09, longitude: -118.3617 },
  },
]

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (310) 555-0201',
    message:
      'Interested in the luxury penthouse. Would like to schedule a viewing.',
    propertyId: '1',
    agentId: 'agent1',
    status: 'new',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z',
  },
  {
    id: 'lead2',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (310) 555-0202',
    message:
      'Looking for investment properties in the area. Please contact me.',
    agentId: 'agent2',
    status: 'contacted',
    createdAt: '2024-01-24T14:30:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
  },
  {
    id: 'lead3',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '+1 (310) 555-0203',
    message:
      'Interested in the modern villa. Available for viewing this weekend?',
    propertyId: '2',
    agentId: 'agent2',
    status: 'qualified',
    createdAt: '2024-01-23T16:45:00Z',
    updatedAt: '2024-01-25T11:20:00Z',
  },
]

// Utility functions for simulating API behavior
export const simulateDelay = (ms: number = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const filterProperties = (properties: Property[], filters: unknown) => {
  return properties.filter(property => {
    // Implement filtering logic here
    console.log(property, filters)
    return true
  })
}

export const paginateResults = <T>(items: T[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  return {
    data: items.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit),
    },
  }
}
