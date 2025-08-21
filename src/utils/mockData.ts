/**
 * MILLION Real Estate - Mock Data Service
 * Comprehensive mock data for development and demonstration
 */

import type { Property, Agent, Lead, FilterOptions, ApiResponse } from './api';

// Mock South Florida Luxury Properties
export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop_fisher_island_ph_001',
    price: 12500000,
    address: '7842 Fisher Island Drive, Unit PH-7842',
    city: 'Fisher Island',
    state: 'FL',
    zipCode: '33109',
    latitude: 25.7598,
    longitude: -80.1427,
    bedrooms: 6,
    bathrooms: 7,
    squareFeet: 8200,
    parking: 4,
    yearBuilt: 2019,
    propertyType: 'penthouse',
    status: 'active',
    badge: 'Hot',
    description: 'Spectacular penthouse at the exclusive Fisher Island featuring panoramic views of Biscayne Bay and Atlantic Ocean. This architectural masterpiece offers unparalleled luxury with private elevator access, wine cellar, and rooftop terrace. Access to world-class spa, golf course, marina, and beach club.',
    features: [
      'Private Elevator',
      'Panoramic Bay Views',
      'Rooftop Terrace',
      'Wine Cellar',
      'Butler Pantry',
      'Golf Course Access',
      'Private Beach Club',
      'Marina Privileges',
      'Spa & Fitness Center',
      'Concierge Service'
    ],
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_sofia_rodriguez',
    createdAt: new Date('2025-01-15').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_bal_harbour_st_regis_001',
    price: 8750000,
    address: '10201 Collins Avenue, Unit 2301S',
    city: 'Bal Harbour',
    state: 'FL',
    zipCode: '33154',
    latitude: 25.8962,
    longitude: -80.1208,
    bedrooms: 4,
    bathrooms: 5,
    squareFeet: 4200,
    parking: 3,
    yearBuilt: 2021,
    propertyType: 'condo',
    status: 'active',
    badge: 'New',
    description: 'Exquisite oceanfront residence at the prestigious St. Regis Bal Harbour Resort & Residences. Floor-to-ceiling windows showcase endless ocean views, while the residence features Italian marble throughout and custom Boffi kitchen.',
    features: [
      'Direct Ocean Views',
      'Italian Marble Floors',
      'Boffi Kitchen',
      'Floor-to-Ceiling Windows',
      'Private Beach Service',
      'St. Regis Butler Service',
      'Remède Spa Access',
      'Oceanfront Pool',
      'Fitness Center',
      'Valet Parking'
    ],
    images: ['https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_marcus_chen',
    createdAt: new Date('2025-01-18').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_sunny_isles_porsche_001',
    price: 6200000,
    address: '18975 Collins Avenue, Unit 4301',
    city: 'Sunny Isles Beach',
    state: 'FL',
    zipCode: '33160',
    latitude: 25.9446,
    longitude: -80.1215,
    bedrooms: 3,
    bathrooms: 4,
    squareFeet: 3100,
    parking: 2,
    yearBuilt: 2020,
    propertyType: 'condo',
    status: 'active',
    description: 'Stunning residence at Porsche Design Tower featuring revolutionary car elevator delivering your vehicle directly to your unit. Contemporary design with ocean and Intracoastal views.',
    features: [
      'Robotic Car Elevator',
      'Private Garage in Unit',
      'Ocean & Intracoastal Views',
      'Porsche Design Interiors',
      'Private Beach',
      'Racing Simulator',
      'Sunset Pool',
      'Spa & Wellness',
      'Restaurant & Bar',
      'Concierge Services'
    ],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_isabella_martinez',
    createdAt: new Date('2025-01-16').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_hillsboro_beach_estate_001',
    price: 15200000,
    address: '1155 Hillsboro Mile',
    city: 'Hillsboro Beach',
    state: 'FL',
    zipCode: '33062',
    latitude: 26.2931,
    longitude: -80.0851,
    bedrooms: 7,
    bathrooms: 8,
    squareFeet: 12500,
    parking: 6,
    yearBuilt: 2022,
    propertyType: 'house',
    status: 'active',
    badge: 'Hot',
    description: 'Magnificent oceanfront estate inspired by Rosewood Residences architecture. This contemporary masterpiece features 150 feet of pristine beachfront, infinity pool, and private dock.',
    features: [
      '150 Feet of Ocean Frontage',
      'Private Beach Access',
      'Infinity Pool & Spa',
      'Private Dock',
      'Chef Kitchen',
      'Wine Cellar',
      'Home Theater',
      'Smart Home Automation',
      'Generator Backup',
      'Guest House',
      '3-Car Garage'
    ],
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_sofia_rodriguez',
    createdAt: new Date('2025-01-12').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_coral_gables_mediterranean_001',
    price: 9800000,
    address: '1240 Coral Way',
    city: 'Coral Gables',
    state: 'FL',
    zipCode: '33134',
    latitude: 25.7493,
    longitude: -80.2534,
    bedrooms: 6,
    bathrooms: 7,
    squareFeet: 8800,
    parking: 4,
    yearBuilt: 1925,
    propertyType: 'house',
    status: 'active',
    description: 'Completely renovated Mediterranean Revival estate in prestigious Coral Gables. This historic masterpiece combines old-world charm with modern luxury.',
    features: [
      'Historic Mediterranean Architecture',
      'Over 1 Acre Lot',
      'Mature Landscaping',
      'Saltwater Pool',
      'Guest House',
      'Wine Cellar',
      'Library & Study',
      'Gourmet Kitchen',
      'Formal Dining Room',
      'Circular Driveway',
      'Security System'
    ],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_james_wellington',
    createdAt: new Date('2025-01-10').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_key_biscayne_waterfront_001',
    price: 7350000,
    address: '600 Glenridge Drive',
    city: 'Key Biscayne',
    state: 'FL',
    zipCode: '33149',
    latitude: 25.6918,
    longitude: -80.1618,
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 5200,
    parking: 3,
    yearBuilt: 2018,
    propertyType: 'house',
    status: 'active',
    description: 'Contemporary waterfront masterpiece with panoramic Biscayne Bay views. Open-concept design with floor-to-ceiling windows, gourmet kitchen, and infinity pool.',
    features: [
      'Panoramic Bay Views',
      'Private Dock',
      'Infinity Pool',
      'Open Concept Design',
      'Gourmet Kitchen',
      'Master Suite Balcony',
      'Home Office',
      'Outdoor Kitchen',
      'Boat Lift',
      'Impact Windows',
      'Tropical Landscaping'
    ],
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_marcus_chen',
    createdAt: new Date('2025-01-14').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_aventura_four_seasons_001',
    price: 5850000,
    address: '300 Biscayne Boulevard Way, Unit 4102',
    city: 'Aventura',
    state: 'FL',
    zipCode: '33180',
    latitude: 25.9565,
    longitude: -80.1389,
    bedrooms: 3,
    bathrooms: 4,
    squareFeet: 2800,
    parking: 2,
    yearBuilt: 2023,
    propertyType: 'condo',
    status: 'active',
    badge: 'New',
    description: 'Exquisite Four Seasons Private Residences with breathtaking views of Aventura and the Atlantic Ocean. This turnkey residence features designer furnishings.',
    features: [
      'Four Seasons Services',
      'Ocean & City Views',
      'Designer Furnished',
      'Private Elevator',
      'Spa Access',
      'Fine Dining',
      'Concierge Service',
      'Fitness Center',
      'Pool & Cabanas',
      'Valet Parking',
      'Room Service'
    ],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_isabella_martinez',
    createdAt: new Date('2025-01-17').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_coconut_grove_vita_001',
    price: 11200000,
    address: '4235 Ingraham Highway',
    city: 'Coconut Grove',
    state: 'FL',
    zipCode: '33133',
    latitude: 25.7289,
    longitude: -80.2421,
    bedrooms: 6,
    bathrooms: 8,
    squareFeet: 9200,
    parking: 4,
    yearBuilt: 2020,
    propertyType: 'house',
    status: 'active',
    description: 'Stunning bayfront estate inspired by Vita at Grove Isle design concepts. Modern architecture with clean lines and walls of glass overlooking Biscayne Bay.',
    features: [
      'Bayfront Location',
      'Private Dock',
      'Infinity Pool',
      'Modern Architecture',
      'Floor-to-Ceiling Glass',
      'Gourmet Kitchen',
      'Wine Room',
      'Home Theater',
      'Gym',
      'Guest Suite',
      'Tropical Gardens'
    ],
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_james_wellington',
    createdAt: new Date('2025-01-13').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_miami_beach_art_deco_001',
    price: 4750000,
    address: '1500 Ocean Drive, Penthouse A',
    city: 'Miami Beach',
    state: 'FL',
    zipCode: '33139',
    latitude: 25.7879,
    longitude: -80.1301,
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 2200,
    parking: 2,
    yearBuilt: 2021,
    propertyType: 'penthouse',
    status: 'active',
    description: 'Sophisticated penthouse in beautifully restored Art Deco building on iconic Ocean Drive. Panoramic ocean views, rooftop terrace, and modern interiors.',
    features: [
      'Art Deco Architecture',
      'Ocean Views',
      'Rooftop Terrace',
      'Restored Historic Building',
      'Modern Interiors',
      'South Beach Location',
      'Private Elevator',
      'Outdoor Kitchen',
      'City Lights Views',
      'Concierge',
      'Beach Access'
    ],
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_isabella_martinez',
    createdAt: new Date('2025-01-11').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_doral_golf_estate_001',
    price: 3850000,
    address: '8825 NW 75th Court',
    city: 'Doral',
    state: 'FL',
    zipCode: '33178',
    latitude: 25.8398,
    longitude: -80.3466,
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 6200,
    parking: 4,
    yearBuilt: 2019,
    propertyType: 'house',
    status: 'active',
    description: 'Magnificent estate overlooking the Blue Monster golf course at Trump National Doral. Contemporary design with golf course views, resort-style pool.',
    features: [
      'Golf Course Views',
      'Resort-Style Pool',
      'Outdoor Kitchen',
      'Home Theater',
      'Wine Cellar',
      'Office/Study',
      'Guest Bedrooms',
      'Golf Membership Available',
      'Spa Access',
      '24/7 Security',
      'Landscaped Gardens'
    ],
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_james_wellington',
    createdAt: new Date('2025-01-09').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_pinecrest_family_estate_001',
    price: 2950000,
    address: '12500 Old Cutler Road',
    city: 'Pinecrest',
    state: 'FL',
    zipCode: '33156',
    latitude: 25.6687,
    longitude: -80.3081,
    bedrooms: 5,
    bathrooms: 5,
    squareFeet: 4800,
    parking: 3,
    yearBuilt: 2017,
    propertyType: 'house',
    status: 'active',
    description: 'Elegant family estate in prestigious Pinecrest village. Traditional architecture with modern amenities, chef kitchen, and resort-style backyard.',
    features: [
      'Traditional Architecture',
      'Chef Kitchen',
      'Family Room',
      'Formal Dining',
      'Pool & Spa',
      'Outdoor Pavilion',
      'Circular Driveway',
      'Security System',
      'Guest Bedroom',
      'Laundry Room',
      'Storage Areas'
    ],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_sofia_rodriguez',
    createdAt: new Date('2025-01-08').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_design_district_modern_001',
    price: 3200000,
    address: '3900 Biscayne Boulevard, Unit PH4',
    city: 'Miami',
    state: 'FL',
    zipCode: '33137',
    latitude: 25.8091,
    longitude: -80.1956,
    bedrooms: 2,
    bathrooms: 3,
    squareFeet: 1800,
    parking: 2,
    yearBuilt: 2022,
    propertyType: 'penthouse',
    status: 'active',
    badge: 'New',
    description: 'Ultra-modern penthouse in the heart of Miami Design District. Floor-to-ceiling windows, European kitchen, and private rooftop with city and bay views.',
    features: [
      'Design District Location',
      'Floor-to-Ceiling Windows',
      'European Kitchen',
      'Private Rooftop',
      'City & Bay Views',
      'Modern Fixtures',
      'Walk-in Closets',
      'Smart Home Technology',
      'Concierge',
      'Fitness Center',
      'Luxury Shopping'
    ],
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_marcus_chen',
    createdAt: new Date('2025-01-19').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_brickell_downtown_luxury_001',
    price: 2650000,
    address: '1100 Brickell Bay Drive, Unit 3201',
    city: 'Miami',
    state: 'FL',
    zipCode: '33131',
    latitude: 25.7617,
    longitude: -80.1918,
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 2100,
    parking: 2,
    yearBuilt: 2020,
    propertyType: 'condo',
    status: 'active',
    description: 'Sophisticated residence in Brickell premier luxury tower. Panoramic views of Biscayne Bay and downtown skyline. Building amenities include infinity pool.',
    features: [
      'Bay & City Views',
      'Modern Kitchen',
      'Walk-in Closets',
      'Balcony',
      'Infinity Pool',
      'Spa & Fitness',
      'Concierge',
      'Valet Parking',
      'Business Center',
      'Party Room',
      'Security'
    ],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_isabella_martinez',
    createdAt: new Date('2025-01-07').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_golden_beach_ultra_001',
    price: 18500000,
    address: '455 Ocean Boulevard',
    city: 'Golden Beach',
    state: 'FL',
    zipCode: '33154',
    latitude: 25.9138,
    longitude: -80.1214,
    bedrooms: 8,
    bathrooms: 10,
    squareFeet: 15200,
    parking: 8,
    yearBuilt: 2023,
    propertyType: 'house',
    status: 'active',
    badge: 'Hot',
    description: 'Extraordinary oceanfront estate in ultra-exclusive Golden Beach. This architectural masterpiece features 200 feet of pristine beachfront, multiple pools, tennis court.',
    features: [
      '200 Feet Ocean Frontage',
      'Private Beach',
      'Multiple Pools',
      'Tennis Court',
      'Guest Houses',
      'Wine Cellar',
      'Home Theater',
      'Gym',
      'Spa',
      'Elevator',
      '24/7 Security',
      'Generator'
    ],
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_sofia_rodriguez',
    createdAt: new Date('2025-01-06').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_south_beach_ocean_drive_001',
    price: 4100000,
    address: '1200 Ocean Drive, Unit 801',
    city: 'Miami Beach',
    state: 'FL',
    zipCode: '33139',
    latitude: 25.7817,
    longitude: -80.1326,
    bedrooms: 3,
    bathrooms: 4,
    squareFeet: 2400,
    parking: 2,
    yearBuilt: 2021,
    propertyType: 'condo',
    status: 'active',
    description: 'Stunning oceanfront residence on famous Ocean Drive. Contemporary interiors with Italian finishes, private balconies, and panoramic Atlantic Ocean views.',
    features: [
      'Ocean Drive Address',
      'Direct Ocean Views',
      'Italian Finishes',
      'Private Balconies',
      'Rooftop Pool',
      'Fitness Center',
      '24-Hour Concierge',
      'Valet Parking',
      'Beach Access',
      'Storage Unit',
      'Hurricane Impact Windows'
    ],
    images: ['https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_marcus_chen',
    createdAt: new Date('2025-01-05').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'prop_palmetto_bay_waterfront_001',
    price: 2250000,
    address: '17800 SW 95th Court',
    city: 'Palmetto Bay',
    state: 'FL',
    zipCode: '33157',
    latitude: 25.6212,
    longitude: -80.3319,
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 3600,
    parking: 3,
    yearBuilt: 2018,
    propertyType: 'house',
    status: 'active',
    description: 'Contemporary waterfront home in exclusive Palmetto Bay community. Open floor plan with water views, gourmet kitchen, and outdoor living area.',
    features: [
      'Waterfront Location',
      'Private Dock',
      'Open Floor Plan',
      'Gourmet Kitchen',
      'Water Views',
      'Pool & Spa',
      'Outdoor Living',
      'Tropical Landscaping',
      'Impact Windows',
      'Security System',
      'Boat Access'
    ],
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    agentId: 'agent_james_wellington',
    createdAt: new Date('2025-01-04').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  }
];

// Mock Luxury Agents
export const MOCK_AGENTS: Agent[] = [
  {
    id: 'agent_sofia_rodriguez',
    firstName: 'Sofia',
    lastName: 'Rodriguez',
    email: 'sofia.rodriguez@million.com',
    phone: '(305) 555-MILLION',
    title: 'Founder & Principal Broker',
    bio: 'Leading South Florida luxury real estate for over 15 years. Certified Luxury Home Marketing Specialist with unparalleled expertise in waterfront properties and exclusive developments.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80',
    licenseNumber: 'FL-BK3456789',
    specialties: ['Waterfront Estates', 'Luxury Penthouses', 'New Construction', 'Investment Properties'],
    isActive: true,
  },
  {
    id: 'agent_marcus_chen',
    firstName: 'Marcus',
    lastName: 'Chen',
    email: 'marcus.chen@million.com',
    phone: '(305) 555-0124',
    title: 'Senior Partner & Luxury Specialist',
    bio: 'Former Goldman Sachs executive turned luxury real estate expert. Specializes in ultra-high-net-worth clientele and exclusive oceanfront properties.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80',
    licenseNumber: 'FL-SL7890123',
    specialties: ['Oceanfront Properties', 'Private Islands', 'Commercial Investment', 'International Clients'],
    isActive: true,
  },
  {
    id: 'agent_isabella_martinez',
    firstName: 'Isabella',
    lastName: 'Martinez',
    email: 'isabella.martinez@million.com',
    phone: '(305) 555-0125',
    title: 'Luxury Condominiums Director',
    bio: 'Miami native with deep knowledge of luxury high-rise living. Expert in Four Seasons, St. Regis, and other ultra-luxury condominium developments.',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80',
    licenseNumber: 'FL-SL4567890',
    specialties: ['Luxury Condominiums', 'Penthouse Sales', 'Downtown Miami', 'Brickell Avenue'],
    isActive: true,
  },
  {
    id: 'agent_james_wellington',
    firstName: 'James',
    lastName: 'Wellington',
    email: 'james.wellington@million.com',
    phone: '(305) 555-0126',
    title: 'Coral Gables & Coconut Grove Specialist',
    bio: 'Third-generation Miami realtor with unmatched knowledge of historic Coral Gables and Coconut Grove estates. Graduate of University of Miami School of Business.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80',
    licenseNumber: 'FL-SL2345678',
    specialties: ['Historic Estates', 'Coral Gables', 'Coconut Grove', 'Golf Course Properties'],
    isActive: true,
  }
];

// Mock Filter Options
export const MOCK_FILTER_OPTIONS: FilterOptions = {
  priceRanges: [
    { label: 'Under $3M', min: 0, max: 2999999, count: 3 },
    { label: '$3M - $6M', min: 3000000, max: 5999999, count: 4 },
    { label: '$6M - $10M', min: 6000000, max: 9999999, count: 5 },
    { label: '$10M - $15M', min: 10000000, max: 14999999, count: 3 },
    { label: 'Over $15M', min: 15000000, max: 999999999, count: 1 },
  ],
  locations: [
    { city: 'Miami Beach', count: 3 },
    { city: 'Fisher Island', count: 1 },
    { city: 'Bal Harbour', count: 1 },
    { city: 'Sunny Isles Beach', count: 1 },
    { city: 'Hillsboro Beach', count: 1 },
    { city: 'Coral Gables', count: 1 },
    { city: 'Key Biscayne', count: 1 },
    { city: 'Aventura', count: 1 },
    { city: 'Coconut Grove', count: 1 },
    { city: 'Miami', count: 2 },
    { city: 'Golden Beach', count: 1 },
    { city: 'Doral', count: 1 },
    { city: 'Pinecrest', count: 1 },
    { city: 'Palmetto Bay', count: 1 },
  ],
  propertyTypes: [
    { type: 'house', label: 'House', count: 8 },
    { type: 'condo', label: 'Condominium', count: 6 },
    { type: 'penthouse', label: 'Penthouse', count: 3 },
    { type: 'townhouse', label: 'Townhouse', count: 0 },
  ],
  features: [
    { feature: 'Ocean Views', count: 8 },
    { feature: 'Private Beach', count: 6 },
    { feature: 'Pool', count: 14 },
    { feature: 'Wine Cellar', count: 7 },
    { feature: 'Home Theater', count: 5 },
    { feature: 'Private Dock', count: 6 },
    { feature: 'Concierge Service', count: 8 },
    { feature: 'Fitness Center', count: 6 },
    { feature: 'Spa Access', count: 4 },
    { feature: 'Valet Parking', count: 5 },
    { feature: 'Golf Course Access', count: 2 },
    { feature: 'Private Elevator', count: 5 },
    { feature: 'Smart Home Technology', count: 3 },
    { feature: 'Guest House', count: 3 },
    { feature: 'Security System', count: 4 },
  ],
};

// Mock Leads
export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead_demo_001',
    firstName: 'Alexandra',
    lastName: 'Thompson',
    email: 'alexandra.thompson@email.com',
    phone: '(305) 555-0198',
    interest: 'buying',
    timeline: '3-6months',
    message: 'Looking for waterfront properties in Bal Harbour or Fisher Island. Budget up to $15M.',
    propertyId: 'prop_fisher_island_ph_001',
    agentId: 'agent_sofia_rodriguez',
    status: 'new',
    source: 'website',
    createdAt: new Date('2025-01-18').toISOString(),
    updatedAt: new Date('2025-01-18').toISOString(),
  },
  {
    id: 'lead_demo_002',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'robert.chen@email.com',
    phone: '(305) 555-0199',
    interest: 'investment',
    timeline: '1-3months',
    message: 'International investor seeking luxury condominiums with strong rental potential.',
    agentId: 'agent_marcus_chen',
    status: 'qualified',
    source: 'referral',
    createdAt: new Date('2025-01-16').toISOString(),
    updatedAt: new Date('2025-01-19').toISOString(),
  },
];

// Helper function to simulate API delay
export const simulateDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to filter properties
export const filterProperties = (properties: Property[], filters: any): Property[] => {
  let filtered = [...properties];

  if (filters.minPrice) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }
  if (filters.maxPrice) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }
  if (filters.bedrooms) {
    filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
  }
  if (filters.bathrooms) {
    filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms);
  }
  if (filters.city) {
    filtered = filtered.filter(p => 
      p.city.toLowerCase().includes(filters.city.toLowerCase())
    );
  }
  if (filters.propertyType) {
    filtered = filtered.filter(p => p.propertyType === filters.propertyType);
  }
  if (filters.status) {
    filtered = filtered.filter(p => p.status === filters.status);
  }
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.address.toLowerCase().includes(search) ||
      p.city.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.features.some(feature => feature.toLowerCase().includes(search))
    );
  }
  if (filters.features && Array.isArray(filters.features)) {
    filtered = filtered.filter(p => 
      filters.features.some((feature: string) => 
        p.features.some(pFeature => 
          pFeature.toLowerCase().includes(feature.toLowerCase())
        )
      )
    );
  }

  // Apply sorting
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      let aVal = a[filters.sortBy as keyof Property];
      let bVal = b[filters.sortBy as keyof Property];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (filters.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }

  return filtered;
};

// Helper function to paginate results - removed generic to fix JSX parsing error
export const paginateResults = (items: any[], page: number = 1, limit: number = 20) => {
  const offset = (page - 1) * limit;
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedItems = items.slice(offset, offset + limit);

  return {
    data: paginatedItems,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }
  };
};