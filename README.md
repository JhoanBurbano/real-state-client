# MILLION Real Estate

A luxury real estate platform built with Next.js 14, featuring modern design, internationalization, and comprehensive property management capabilities.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS v4
- **Luxury Design System**: Custom design tokens and components for premium real estate
- **Internationalization**: Full i18n support for English and Spanish
- **Responsive Design**: Mobile-first approach with luxury aesthetics
- **Property Management**: Comprehensive property search, filtering, and display
- **Favorites System**: User favorites management with localStorage
- **Accessibility**: WCAG compliant with skip links and ARIA attributes
- **Testing**: Jest for unit tests and Playwright for E2E testing
- **Performance**: Optimized images, lazy loading, and modern web vitals

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **Internationalization**: next-intl
- **Theming**: next-themes
- **Icons**: Lucide React
- **Testing**: Jest + Playwright
- **Linting**: ESLint
- **Formatting**: Prettier

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   ├── pages/             # Page-specific components
│   └── providers/         # Context providers
├── hooks/                  # Custom React hooks
├── modules/                # Feature modules
├── types/                  # TypeScript type definitions
├── data/                   # Mock data and utilities
├── lib/                    # Utility functions
├── i18n/                   # Internationalization
└── styles/                 # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/million-realestate.git
cd million-realestate
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run type-check` - Run TypeScript type checking

## 🌍 Internationalization

The application supports multiple languages:

- **English** (en) - Default language
- **Spanish** (es) - Full translation support

Language switching is available through the language toggle in the navigation bar.

## 🎨 Design System

### Colors

- **Primary**: Luxury Gold (#A78047)
- **Surface**: Clean whites and grays
- **Text**: High contrast for readability
- **Accent**: Strategic use of brand colors

### Typography

- **Brand Font**: Playfair Display (serif)
- **Base Font**: Inter (sans-serif)
- **Hierarchy**: Clear heading scale from H1 to H6

### Components

- **Button**: Multiple variants (default, luxury, glass, outline)
- **Card**: Luxury card design with hover effects
- **Input**: Consistent form styling
- **Badge**: Status and feature indicators

## 🧪 Testing

### Unit Tests

Tests are written with Jest and React Testing Library:

```bash
npm run test
```

### E2E Tests

End-to-end tests use Playwright:

```bash
npm run test:e2e
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Skip links for keyboard navigation
- Proper ARIA labels and roles
- High contrast mode support
- Screen reader optimization

## 🚀 Performance

- Next.js Image optimization
- Lazy loading for components
- Efficient bundle splitting
- Modern web vitals optimization
- SEO best practices

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your-api-url
```

### Tailwind Configuration

Custom design tokens are defined in `tailwind.config.ts`:

- Color palette
- Typography scale
- Spacing system
- Animation definitions
- Custom utilities

## 📊 Data Structure

### Property Model

```typescript
interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  squareFeet: number
  status: 'forSale' | 'forRent' | 'sold' | 'rented' | 'pending'
  type: 'apartment' | 'house' | 'villa' | 'penthouse' | 'townhouse' | 'studio'
  images: string[]
  features: string[]
  amenities: string[]
  agentId: string
  coordinates?: { latitude: number; longitude: number }
}
```

## 🌟 Key Features

### Property Search

- Full-text search across titles, descriptions, and locations
- Advanced filtering by price, bedrooms, bathrooms, and type
- Real-time search results

### Favorites System

- Add/remove properties to favorites
- Persistent storage with localStorage
- Favorites count display

### Responsive Navigation

- Mobile-friendly navigation menu
- Language and theme toggles
- Smooth animations and transitions

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Advanced property analytics
- [ ] Virtual tour integration
- [ ] Agent dashboard
- [ ] Property comparison tools
- [ ] Advanced search algorithms
- [ ] Real-time notifications
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Lucide for the beautiful icons
- The real estate community for inspiration

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ by the MILLION Real Estate team
