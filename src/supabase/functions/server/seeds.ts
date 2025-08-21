/**
 * MILLION Real Estate - Property Seeds
 * Realistic luxury properties across South Florida's most exclusive markets
 */

// Utility functions
function generateId(prefix: string = 'prop'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getRandomImage(type: 'oceanfront' | 'waterfront' | 'penthouse' | 'estate' | 'condo' | 'golf'): string {
  const imageMap = {
    oceanfront: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    waterfront: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    penthouse: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    estate: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    condo: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    golf: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };
  return imageMap[type];
}

// Property type definitions
type PropertyType = 'penthouse' | 'condo' | 'house' | 'townhouse';
type PropertyStatus = 'active' | 'pending' | 'sold' | 'off-market';
type PropertyBadge = 'Hot' | 'New' | 'Reduced' | 'Sold' | null;

interface PropertyData {
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
  propertyType: PropertyType;
  status: PropertyStatus;
  badge?: PropertyBadge;
  description: string;
  features: string[];
  images: string[];
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

interface AgentData {
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

// Luxury Agents Data
export const LUXURY_AGENTS: AgentData[] = [
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

// South Florida Luxury Properties Seed Data
export const LUXURY_PROPERTIES: PropertyData[] = [
  // FISHER ISLAND - Ultra-Exclusive
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
      'Butler\'s Pantry',
      'Golf Course Access',
      'Private Beach Club',
      'Marina Privileges',
      'Spa & Fitness Center',
      'Concierge Service'
    ],
    images: [getRandomImage('penthouse')],
    agentId: 'agent_sofia_rodriguez',
    createdAt: new Date('2025-01-15').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },

  // BAL HARBOUR - Oceanfront Luxury
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
    description: 'Exquisite oceanfront residence at the prestigious St. Regis Bal Harbour Resort & Residences. Floor-to-ceiling windows showcase endless ocean views, while the residence features Italian marble throughout and custom Boffi kitchen. Five-star amenities include beach service and world-class spa.',
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
    images: [getRandomImage('oceanfront')],
    agentId: 'agent_marcus_chen',
    createdAt: new Date('2025-01-18').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },

  // SUNNY ISLES BEACH - Luxury High-Rise
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
    description: 'Stunning residence at Porsche Design Tower featuring revolutionary car elevator delivering your vehicle directly to your unit. Contemporary design with ocean and Intracoastal views. Amenities include private beach, spa, and exclusive Porsche Design Studio.',
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
    images: [getRandomImage('condo')],
    agentId: 'agent_isabella_martinez',
    createdAt: new Date('2025-01-16').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },

  // HILLSBORO BEACH - Waterfront Estate
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
    description: 'Magnificent oceanfront estate inspired by Rosewood Residences architecture. This contemporary masterpiece features 150 feet of pristine beachfront, infinity pool, and private dock. Smart home technology throughout with panoramic ocean views from every room.',
    features: [
      '150 Feet of Ocean Frontage',
      'Private Beach Access',
      'Infinity Pool & Spa',
      'Private Dock',
      'Chef\'s Kitchen',
      'Wine Cellar',
      'Home Theater',
      'Smart Home Automation',
      'Generator Backup',
      'Guest House',
      '3-Car Garage'
    ],
    images: [getRandomImage('waterfront')],
    agentId: 'agent_sofia_rodriguez',
    createdAt: new Date('2025-01-12').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },

  // CORAL GABLES - Historic Estate
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
    description: 'Completely renovated Mediterranean Revival estate in prestigious Coral Gables. This historic masterpiece combines old-world charm with modern luxury. Situated on over an acre with mature landscaping, pool, and guest house. Walking distance to Miracle Mile.',
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
    images: [getRandomImage('estate')],
    agentId: 'agent_james_wellington',
    createdAt: new Date('2025-01-10').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },

  // KEY BISCAYNE - Waterfront Luxury
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
    description: 'Contemporary waterfront masterpiece with panoramic Biscayne Bay views. Open-concept design with floor-to-ceiling windows, gourmet kitchen, and infinity pool. Private dock accommodates large yacht. Minutes from downtown Miami and exclusive Key Biscayne beaches.',
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
    images: [getRandomImage('waterfront')],
    agentId: 'agent_marcus_chen',
    createdAt: new Date('2025-01-14').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },

  // Additional properties shortened for brevity...
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
    description: 'Exquisite Four Seasons Private Residences with breathtaking views of Aventura and the Atlantic Ocean. This turnkey residence features designer furnishings and access to all Four Seasons hotel amenities including spa, restaurants, and concierge services.',
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
    images: [getRandomImage('condo')],
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
    description: 'Stunning bayfront estate inspired by Vita at Grove Isle design concepts. Modern architecture with clean lines and walls of glass overlooking Biscayne Bay. Private dock, infinity pool, and lush tropical landscaping create a resort-like atmosphere in the heart of Coconut Grove.',
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
    images: [getRandomImage('waterfront')],
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
    description: 'Sophisticated penthouse in beautifully restored Art Deco building on iconic Ocean Drive. Panoramic ocean views, rooftop terrace, and modern interiors blend seamlessly with historic charm. Steps from South Beach\'s finest dining and entertainment.',
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
    images: [getRandomImage('penthouse')],
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
    description: 'Magnificent estate overlooking the Blue Monster golf course at Trump National Doral. Contemporary design with golf course views, resort-style pool, and outdoor entertaining area. Access to world-class golf and spa facilities.',
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
    images: [getRandomImage('golf')],
    agentId: 'agent_james_wellington',
    createdAt: new Date('2025-01-09').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  }
];

// Export combined seed data
export const SEED_DATA = {
  agents: LUXURY_AGENTS,
  properties: LUXURY_PROPERTIES
};

export default SEED_DATA;