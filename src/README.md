# MILLION Real Estate - Luxury Property Platform

A sophisticated real estate platform for luxury properties in South Florida, built with React, TypeScript, Tailwind CSS, and Supabase.

## 🏗️ Architecture Overview

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase Edge Functions (Hono server)
- **Database**: Supabase (PostgreSQL + KV Store)
- **Data Fetching**: SWR for caching and revalidation
- **Testing**: Vitest (Unit) + Playwright (E2E)
- **Deployment**: Supabase + CDN

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Supabase CLI (for local development)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd million-real-estate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Add your Supabase credentials
   # SUPABASE_URL=your-project-url
   # SUPABASE_ANON_KEY=your-anon-key
   # SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start Supabase locally** (optional)
   ```bash
   supabase start
   npm run dev:backend
   ```

Visit `http://localhost:5173` to see the application.

## 🧪 Testing

### Unit Tests (Vitest + Testing Library)

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### End-to-End Tests (Playwright)

```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## 📦 Build & Deployment

### Production Build

```bash
# Type check
npm run type-check

# Lint and format
npm run lint
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🎨 Design System

### Color Tokens

- **Primary**: Gold accent (`#A78047`) for luxury branding
- **Neutral**: Sophisticated grays for backgrounds and text
- **Semantic**: Success, warning, error, and info colors
- **Support**: Light and dark theme variants

### Typography

- **Brand Font**: Playfair Display (headings, luxury feel)
- **Base Font**: Inter (body text, readability)
- **Scale**: 6-level heading hierarchy + body text

### Components

All components follow WCAG AA accessibility standards:

- `MillionButton` - Primary action buttons
- `PropertyCard` - Property listing cards
- `FilterPill` - Search filter pills
- `ContactModal` - Lead capture modal
- `Navbar` / `Footer` - Navigation components
- `EmptyState` / `Skeleton` - Loading states

## 🔧 API Documentation

### Properties Endpoint

```typescript
GET /make-server-59c5b421/properties
Query Parameters:
- minPrice: number
- maxPrice: number
- bedrooms: number
- bathrooms: number
- city: string
- features: string[]
- search: string
- page: number
- limit: number
```

### Leads Endpoint

```typescript
POST /make-server-59c5b421/leads
Body: {
  firstName: string
  lastName: string
  email: string
  phone: string
  interest: 'buying' | 'selling' | 'renting' | 'investment' | 'consultation'
  timeline: string
  message: string
  propertyId?: string
}
```

See [`api-guide.md`](./api-guide.md) for complete API documentation.

## ♿ Accessibility Features

- **WCAG AA Compliance**: All text meets contrast requirements
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and live regions
- **Focus Management**: Visible focus indicators and logical tab order
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

## 🚀 Performance Optimizations

- **Image Optimization**: Next-gen formats with fallbacks
- **Code Splitting**: Lazy-loaded routes and components
- **Caching Strategy**: SWR for API calls, service worker for assets
- **Bundle Analysis**: Optimized bundle sizes
- **Web Vitals**: Core Web Vitals monitoring

## 📊 Monitoring & Analytics

### Performance Monitoring

```typescript
// Web Vitals tracking
import { measureWebVital } from './utils/seo';

measureWebVital('LCP', value); // Largest Contentful Paint
measureWebVital('FID', value); // First Input Delay
measureWebVital('CLS', value); // Cumulative Layout Shift
```

### Error Tracking

```typescript
// Error boundary with reporting
<ErrorBoundary onError={(error, errorInfo) => {
  // Send to monitoring service
  console.error('Application error:', error, errorInfo);
}}>
  <App />
</ErrorBoundary>
```

## 🔐 Security & Privacy

- **Data Encryption**: All sensitive data encrypted at rest
- **GDPR Compliance**: Privacy controls and data portability
- **Rate Limiting**: API endpoints protected from abuse
- **Input Validation**: All user inputs sanitized
- **HTTPS Only**: Secure connections enforced

## 📱 Mobile Responsiveness

- **Mobile-First Design**: Optimized for mobile experiences
- **Responsive Breakpoints**: 
  - Mobile: 0-768px
  - Tablet: 768-1024px  
  - Desktop: 1024px+
- **Touch-Friendly**: Properly sized touch targets
- **Progressive Enhancement**: Works without JavaScript

## 🧩 Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Android 88+
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📚 Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb config with custom rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality assurance

### Git Workflow

```bash
# Feature branch
git checkout -b feature/property-search
git commit -m "feat: add property search functionality"
git push origin feature/property-search
```

### Commit Message Format

```
type(scope): description

feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructuring
test: adding tests
chore: maintenance
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 Legal Compliance

### Real Estate Licensing

- **Florida Real Estate License**: #BK3456789
- **Licensed Broker**: Sofia Rodriguez #SL1234567
- **MLS Member**: Miami Association of Realtors
- **Equal Housing Opportunity**: Full compliance

### Privacy & Terms

- **Privacy Policy**: [`/privacy`](./privacy.md)
- **Terms of Service**: [`/terms`](./terms.md)
- **Cookie Policy**: [`/cookies`](./cookies.md)
- **CCPA Compliance**: California privacy rights

## 📞 Support

- **Technical Issues**: tech@million.com
- **Sales Inquiries**: sales@million.com
- **General Questions**: info@million.com
- **Phone**: (305) 555-MILLION

## 📈 Roadmap

### Q1 2025
- [ ] Advanced search filters
- [ ] Mortgage calculator integration
- [ ] Virtual tour integration
- [ ] Multi-language support (Spanish)

### Q2 2025
- [ ] Mobile app (React Native)
- [ ] CRM integration
- [ ] Advanced analytics dashboard
- [ ] AI-powered recommendations

### Q3 2025
- [ ] Blockchain property records
- [ ] IoT smart home integration
- [ ] Augmented reality features
- [ ] Investment analysis tools

---

**Built with ❤️ for luxury real estate professionals**

For more information, visit [million-realestate.com](https://million-realestate.com)