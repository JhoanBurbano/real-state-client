/**
 * SEO and metadata utilities for MILLION Real Estate
 */

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  price?: string;
  availability?: 'InStock' | 'OutOfStock';
  location?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export function generateMetaTags(seoData: SEOData): string {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
    price,
    availability,
    location
  } = seoData;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://million-realestate.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const imageUrl = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/og-default.jpg`;

  const metaTags = [
    // Basic meta tags
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    ...(keywords.length > 0 ? [`<meta name="keywords" content="${keywords.join(', ')}" />`] : []),
    
    // Open Graph
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:url" content="${fullUrl}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="MILLION Real Estate" />`,
    
    // Twitter Card
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    
    // Real Estate specific
    ...(price ? [`<meta property="product:price:amount" content="${price.replace(/[^0-9.]/g, '')}" />`, `<meta property="product:price:currency" content="USD" />`] : []),
    ...(availability ? [`<meta property="product:availability" content="${availability}" />`] : []),
    
    // Location data
    ...(location ? [
      `<meta property="place:location:latitude" content="" />`, // Would need geocoding
      `<meta property="place:location:longitude" content="" />`,
      `<meta property="og:locale" content="en_US" />`
    ] : [])
  ];

  return metaTags.join('\n');
}

export function generateStructuredData(seoData: SEOData & { 
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  yearBuilt?: number;
}) {
  const {
    title,
    description,
    price,
    location,
    propertyType,
    bedrooms,
    bathrooms,
    squareFeet,
    yearBuilt,
    image,
    availability = 'InStock'
  } = seoData;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": title,
    "description": description,
    ...(price && {
      "offers": {
        "@type": "Offer",
        "price": price.replace(/[^0-9.]/g, ''),
        "priceCurrency": "USD",
        "availability": `https://schema.org/${availability}`
      }
    }),
    ...(location && {
      "address": {
        "@type": "PostalAddress",
        "streetAddress": location.address,
        "addressLocality": location.city,
        "addressRegion": location.state,
        "postalCode": location.zipCode,
        "addressCountry": "US"
      }
    }),
    ...(image && {
      "image": image.startsWith('http') ? image : `https://million-realestate.com${image}`
    }),
    ...(propertyType && { "propertyType": propertyType }),
    ...(bedrooms && { "numberOfBedrooms": bedrooms }),
    ...(bathrooms && { "numberOfBathrooms": bathrooms }),
    ...(squareFeet && { "floorSize": { "@type": "QuantitativeValue", "value": squareFeet, "unitCode": "SQF" } }),
    ...(yearBuilt && { "yearBuilt": yearBuilt }),
    "broker": {
      "@type": "RealEstateAgent",
      "name": "MILLION Real Estate",
      "url": "https://million-realestate.com",
      "telephone": "+1-305-555-MILLION",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami Beach",
        "addressRegion": "FL",
        "addressCountry": "US"
      }
    }
  };

  return JSON.stringify(structuredData, null, 2);
}

export function generatePropertySEO(property: {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: string;
  description: string;
  images: string[];
  yearBuilt?: number;
  status: string;
}): SEOData {
  const title = `${property.address} - $${property.price.toLocaleString()} | Luxury ${property.propertyType} in ${property.city}`;
  const description = `${property.bedrooms} bed, ${property.bathrooms} bath luxury ${property.propertyType} for sale in ${property.city}, FL. ${property.squareFeet.toLocaleString()} sq ft. ${property.description.substring(0, 100)}...`;
  
  return {
    title,
    description,
    keywords: [
      'luxury real estate',
      property.city.toLowerCase(),
      'south florida real estate',
      property.propertyType,
      `${property.bedrooms} bedroom`,
      `${property.bathrooms} bathroom`,
      'waterfront property',
      'million real estate'
    ],
    image: property.images[0],
    url: `/property/${property.id}`,
    type: 'product',
    price: `$${property.price.toLocaleString()}`,
    availability: property.status === 'active' ? 'InStock' : 'OutOfStock',
    location: {
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode
    }
  };
}

export function generatePageSEO(pageType: 'home' | 'about' | 'search'): SEOData {
  const seoData: Record<string, SEOData> = {
    home: {
      title: 'MILLION Real Estate - Luxury Properties in South Florida | Miami Beach, Bal Harbour',
      description: 'Discover exclusive luxury real estate in South Florida. Waterfront estates, penthouses, and luxury condominiums in Miami Beach, Bal Harbour, and beyond. Expert luxury real estate services.',
      keywords: [
        'luxury real estate south florida',
        'miami beach luxury properties',
        'bal harbour real estate',
        'waterfront properties miami',
        'luxury condos south florida',
        'million real estate',
        'south florida luxury homes'
      ],
      url: '/',
      type: 'website'
    },
    about: {
      title: 'About MILLION Real Estate - Luxury Real Estate Experts in South Florida',
      description: 'Meet the team behind South Florida\'s premier luxury real estate firm. 15+ years of expertise in waterfront properties, luxury condos, and exclusive estates.',
      keywords: [
        'million real estate team',
        'luxury real estate brokers',
        'south florida real estate experts',
        'miami luxury real estate agents'
      ],
      url: '/about',
      type: 'website'
    },
    search: {
      title: 'Search Luxury Properties - MILLION Real Estate',
      description: 'Search and filter luxury real estate properties in South Florida. Advanced search by price, location, features, and more.',
      keywords: [
        'search luxury properties',
        'south florida real estate search',
        'luxury property filters',
        'miami real estate listings'
      ],
      url: '/search',
      type: 'website'
    }
  };

  return seoData[pageType];
}

// Sitemap generation
export function generateSitemap(properties: Array<{ id: string; updatedAt: string }>): string {
  const baseUrl = 'https://million-realestate.com';
  const currentDate = new Date().toISOString();

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/search', priority: '0.9', changefreq: 'daily' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' }
  ];

  const propertyPages = properties.map(property => ({
    url: `/property/${property.id}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: property.updatedAt
  }));

  const allPages = [...staticPages, ...propertyPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemap;
}

// Performance monitoring utilities
export function measureWebVital(name: string, value: number) {
  // Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_category: 'Web Vitals',
      event_label: name,
      non_interaction: true,
    });
  }

  console.log(`${name}: ${value}`);
}

// Image optimization utilities
export function getOptimizedImageUrl(
  src: string, 
  width: number, 
  height: number, 
  quality: number = 85
): string {
  // In a real app, this would integrate with your image CDN
  // For now, return the original src
  return src;
}