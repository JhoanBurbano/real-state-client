# MILLION Luxury Real Estate

A modern, responsive luxury real estate platform built with Next.js 14, featuring a sophisticated design system and exceptional user experience.

## ✨ Features

- **Modern Framework**: Next.js 14 with App Router
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Design System**: Comprehensive component library with luxury aesthetics
- **Dark Mode**: Seamless theme switching with next-themes
- **Performance**: Optimized with Next.js Image and lazy loading
- **Accessibility**: WCAG compliant with skip links and semantic HTML
- **Testing**: Comprehensive test suite with Jest and Playwright
- **Code Quality**: ESLint, Prettier, and Stylelint for consistent code

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, PostCSS, Autoprefixer
- **Theming**: next-themes
- **UI Components**: Radix UI components, custom components
- **Icons**: Lucide React
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Testing**: Jest (unit), React Testing Library, Playwright (E2E)
- **Code Quality**: ESLint, Prettier, Stylelint

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   └── pages/             # Page-specific components
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── data/                   # Mock data and constants
├── utils/                  # Utility functions
├── styles/                 # Global styles and CSS
└── lib/                    # Third-party library configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd real-state-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run end-to-end tests
- `npm run format` - Format code with Prettier
- `npm run stylelint` - Run Stylelint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

### Color Palette

- **Primary**: MILLION brand colors with luxury aesthetics
- **Surface**: Multiple elevation levels for depth
- **Text**: High contrast ratios for accessibility
- **Accent**: Strategic use of accent colors for CTAs

### Typography

- **Headings**: Playfair Display for luxury feel
- **Body**: Inter for excellent readability
- **Hierarchy**: Clear typographic scale

### Components

- **Button**: Multiple variants (default, outline, luxury, glass)
- **Card**: Property cards with hover effects
- **Badge**: Status and type indicators
- **Input**: Form inputs with focus states
- **Skeleton**: Loading state components

## 🧪 Testing

### Unit Tests

- **Framework**: Jest with React Testing Library
- **Coverage**: Comprehensive component testing
- **Mocking**: Proper mocking of external dependencies

### E2E Tests

- **Framework**: Playwright
- **Coverage**: Critical user journeys
- **Browsers**: Chrome, Firefox, Safari

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Tailwind CSS responsive utilities
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Optimized images and lazy loading

## ♿ Accessibility

- **WCAG Compliance**: Following accessibility guidelines
- **Skip Links**: Keyboard navigation support
- **Semantic HTML**: Proper HTML structure
- **ARIA Labels**: Screen reader support
- **Focus Management**: Visible focus indicators

## ⚡ Performance

- **Next.js Image**: Optimized image loading
- **Lazy Loading**: Components load when needed
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Optimized bundle sizes

## ⚙️ Configuration

### Tailwind CSS v4

- **Custom Colors**: MILLION brand palette
- **Custom Spacing**: Consistent spacing scale
- **Custom Animations**: Luxury micro-interactions
- **Dark Mode**: Seamless theme switching

### Next.js

- **App Router**: Latest Next.js routing
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **PostCSS**: Advanced CSS processing

## 📊 Data Structure

### Properties

```typescript
interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  type: string
  status: string
  features: string[]
  images: string[]
  agent: Agent
}
```

### Filters

```typescript
interface PropertyFilters {
  priceRange: [number, number]
  bedrooms: number[]
  bathrooms: number[]
  propertyType: string[]
  location: string[]
  status: string[]
  features: string[]
}
```

## 🔑 Key Features

- **Property Search**: Advanced filtering and search
- **Favorites**: Save and manage favorite properties
- **Responsive Grid**: Adaptive property grid layout
- **Theme Toggle**: Light/dark mode switching
- **Filter Panel**: Comprehensive property filtering
- **Hero Section**: Engaging landing experience
- **Stats Display**: Company statistics showcase

## 🚀 Future Enhancements

- **Property Details**: Individual property pages
- **Agent Profiles**: Detailed agent information
- **Contact Forms**: Lead generation forms
- **Map Integration**: Interactive property maps
- **Advanced Search**: Saved searches and alerts
- **User Accounts**: User registration and profiles
- **Admin Panel**: Content management system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
- **Lucide** for beautiful icons
- **MILLION Brand** for the luxury design inspiration
