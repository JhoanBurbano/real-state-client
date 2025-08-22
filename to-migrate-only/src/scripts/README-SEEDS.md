# MILLION Real Estate - Database Seeds

This directory contains comprehensive seed data for the MILLION Real Estate luxury property platform, featuring ~25 realistic properties across South Florida's most exclusive markets.

## 🏖️ Coverage Areas

### Primary Markets
- **Fisher Island** - Ultra-exclusive private island community
- **Bal Harbour** - Luxury oceanfront condominiums and resorts
- **Sunny Isles Beach** - High-rise luxury living with ocean views
- **Coral Gables** - Historic Mediterranean estates and golf course properties
- **Key Biscayne** - Waterfront luxury with bay and ocean access
- **Aventura** - Modern luxury high-rises and gated communities

### Secondary Markets
- **Coconut Grove** - Bayfront estates and bohemian luxury
- **Miami Beach** - Art Deco penthouses and South Beach lifestyle
- **Hillsboro Beach** - Exclusive oceanfront estates
- **Golden Beach** - Ultra-private beachfront community
- **Star Island** - Celebrity enclave with maximum privacy
- **Indian Creek** - "Billionaire Bunker" ultra-exclusive island

## 📋 Property Portfolio

### Property Types
- **Oceanfront Estates** (8 properties) - $5M - $28M
- **Luxury Penthouses** (6 properties) - $3M - $12.5M
- **Waterfront Homes** (5 properties) - $2M - $18.5M
- **Luxury Condominiums** (4 properties) - $1.5M - $8.7M
- **Golf Course Properties** (2 properties) - $2.9M - $3.8M

### Price Distribution
- **Under $2M**: 2 properties (8%)
- **$2M - $5M**: 9 properties (36%)
- **$5M - $10M**: 8 properties (32%)
- **Over $10M**: 6 properties (24%)

### Features Coverage
- Waterfront/Oceanfront: 18 properties
- Private Beach Access: 12 properties
- Private Dock/Marina: 14 properties
- Pool & Spa: 23 properties
- Wine Cellar: 15 properties
- Home Theater: 11 properties
- Elevator Access: 8 properties
- Golf Course Access: 4 properties

## 🏢 Real Estate Agents

### Sofia Rodriguez - Founder & Principal Broker
- **License**: FL-BK3456789
- **Specialties**: Waterfront Estates, Luxury Penthouses, New Construction
- **Portfolio**: 8 properties assigned (highest value listings)

### Marcus Chen - Senior Partner
- **License**: FL-SL7890123  
- **Specialties**: Oceanfront Properties, Private Islands, International Clients
- **Portfolio**: 6 properties assigned (ultra-luxury focus)

### Isabella Martinez - Luxury Condominiums Director
- **License**: FL-SL4567890
- **Specialties**: Luxury Condos, Penthouse Sales, Brickell/Downtown
- **Portfolio**: 6 properties assigned (high-rise expertise)

### James Wellington - Coral Gables Specialist
- **License**: FL-SL2345678
- **Specialties**: Historic Estates, Golf Course Properties, Coconut Grove
- **Portfolio**: 5 properties assigned (estate specialist)

## 🎯 Inspired by Real Projects

The seed data draws inspiration from actual luxury developments while using original content:

### Oceanfront Developments
- **Rosewood Residences** (Hillsboro Beach inspiration)
- **St. Regis Bal Harbour** (ultra-luxury resort residences)
- **Four Seasons Private Residences** (Aventura/Surfside)
- **Porsche Design Tower** (Sunny Isles innovation)

### Historic & Waterfront Communities
- **Vita at Grove Isle** (Coconut Grove bayfront living)
- **Fisher Island Club** (exclusive island lifestyle)
- **Gables Estates** (Coral Gables waterfront community)
- **Indian Creek Island** (ultimate privacy and security)

## 🔧 Usage Instructions

### Automatic Seeding
The seed data is automatically loaded when the Supabase server starts if no existing properties are found.

### Manual Seeding
```bash
# Seed all data
deno run --allow-all scripts/seed-database.ts seed

# Reset and re-seed
deno run --allow-all scripts/seed-database.ts reset

# Clear all data
deno run --allow-all scripts/seed-database.ts clear

# Validate data integrity
deno run --allow-all scripts/seed-database.ts validate

# Show database summary
deno run --allow-all scripts/seed-database.ts summary
```

### NPM Scripts (to be added)
```bash
npm run seed:dev          # Seed development database
npm run seed:prod         # Seed production database  
npm run seed:reset        # Reset and re-seed
npm run seed:validate     # Validate data integrity
```

## 📊 Sample Data Quality

### Address Realism
- Accurate South Florida street names and numbering
- Real zip codes for each municipality
- GPS coordinates for mapping functionality
- Neighborhood-appropriate addressing (e.g., "Collins Avenue" for beach properties)

### Pricing Accuracy
- Market-appropriate pricing based on 2025 South Florida luxury market
- Price per square foot realistic for each area
- Premium pricing for oceanfront and exclusive communities
- Consideration of recent comparable sales

### Feature Authenticity
- Amenities typical of luxury South Florida properties
- Climate-appropriate features (pools, outdoor living, hurricane protection)
- Luxury brand partnerships (Four Seasons, St. Regis, Porsche Design)
- High-end finishes and appointments

### Agent Profiles
- Florida real estate license format compliance
- Realistic specializations and territories
- Professional backgrounds appropriate for luxury market
- Diverse team representing different market segments

## 📋 Legal Compliance

### Fair Housing
- All properties comply with Fair Housing Act requirements
- No discriminatory language or preferences
- Equal opportunity marketing approach

### Real Estate Licensing
- All agents have properly formatted Florida licenses
- Broker supervision structure maintained
- MLS and professional association memberships noted

### Data Privacy
- No real personal information used in sample leads
- Generic email addresses and phone numbers
- GDPR/CCPA compliant data structures

## 🔍 Data Validation

The seed data includes validation for:
- Required field completion
- Realistic price ranges
- Valid agent assignments  
- Proper license number formats
- Geographic coordinate accuracy
- Feature/amenity appropriateness

## 🚀 Development Tips

### Testing Different Scenarios
- **Empty State**: Clear database to test empty state handling
- **Large Dataset**: All 25 properties for performance testing
- **Filtered Results**: Various filter combinations for search testing
- **Price Ranges**: Test filtering across different price segments

### Customization
- Modify `seeds.ts` to add/remove properties
- Adjust agent assignments for different scenarios  
- Update features list for new filter options
- Change pricing for different market conditions

### Production Considerations
- Review all pricing for current market conditions
- Update agent contact information for real deployment
- Replace placeholder images with professional photography
- Implement proper image CDN for production use

---

**Note**: This seed data is for development and demonstration purposes. All property descriptions, pricing, and agent information should be updated with real data before production deployment.