import * as React from "react";
import { Search, SlidersHorizontal, Grid, List, Loader2, X } from "lucide-react";
import { Navbar } from "../ui/navbar";
import { Footer } from "../ui/footer";
import { PropertyCard } from "../ui/property-card";
import { FilterPill } from "../ui/filter-pill";
import { MillionButton } from "../ui/million-button";
import { Slider } from "../ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { EmptyState } from "../ui/empty-state";
import { PropertyGridSkeleton } from "../ui/property-skeleton";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useProperties, useFilterOptions, useFavorites } from "../../hooks/useProperties";
import { announceToScreenReader, useReducedMotion, handleKeyboardNavigation, KEYBOARD_KEYS, generateAriaLabel } from "../../utils/accessibility";
import type { PropertyFilters } from "../../utils/api";

interface HomePageProps {
  onPropertySelect?: (propertyId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPropertySelect }) => {
  const prefersReducedMotion = useReducedMotion();
  
  // State management
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = React.useState([500000, 5000000]);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [currentPage, setCurrentPage] = React.useState(1);

  // API data fetching with optimized caching
  const filters: PropertyFilters = React.useMemo(() => ({
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    search: searchQuery || undefined,
    features: selectedFilters.length > 0 ? selectedFilters : undefined,
    sortBy,
    sortOrder: sortBy === 'price' ? 'desc' : 'desc',
    page: currentPage,
    limit: 20,
  }), [priceRange, searchQuery, selectedFilters, sortBy, currentPage]);

  const { 
    properties, 
    pagination, 
    isLoading, 
    isValidating, 
    error, 
    revalidate, 
    isEmpty 
  } = useProperties(filters);

  const { filterOptions } = useFilterOptions();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Refs for accessibility
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const resultsHeadingRef = React.useRef<HTMLHeadingElement>(null);
  const filtersRef = React.useRef<HTMLDivElement>(null);

  // Available filter options (fallback to static list if API fails)
  const availableFilters = filterOptions?.features?.map(f => f.feature) || [
    "Ocean Views", "Pool", "Waterfront", "Private Beach", "Wine Cellar", 
    "Home Theater", "Private Dock", "Concierge Service", "Fitness Center", 
    "Spa Access", "Valet Parking", "Golf Course Access", "Private Elevator",
    "Smart Home Technology", "Guest House", "Security System"
  ];

  // Reset page when filters change
  React.useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery, priceRange, selectedFilters, sortBy]);

  // Announce results to screen readers
  React.useEffect(() => {
    if (!isLoading && pagination?.total !== undefined) {
      const message = isEmpty 
        ? "No properties found matching your criteria"
        : `Found ${pagination.total} properties. Results updated.`;
      
      announceToScreenReader(message, 'polite');
    }
  }, [isLoading, pagination?.total, isEmpty]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter];
      
      announceToScreenReader(
        `Filter ${filter} ${prev.includes(filter) ? 'removed' : 'added'}`, 
        'polite'
      );
      
      return newFilters;
    });
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(prev => {
      const newFilters = prev.filter(f => f !== filter);
      announceToScreenReader(`Filter ${filter} removed`, 'polite');
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setPriceRange([100000, 10000000]);
    setSearchQuery("");
    setSortBy("createdAt");
    announceToScreenReader("All filters cleared", 'polite');
  };

  const handleFavorite = (propertyId: string) => {
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId);
      announceToScreenReader("Property removed from favorites", 'polite');
    } else {
      addFavorite(propertyId);
      announceToScreenReader("Property added to favorites", 'polite');
    }
  };

  const handleSearchKeyboard = (e: React.KeyboardEvent) => {
    handleKeyboardNavigation(e, {
      ENTER: () => {
        revalidate();
        announceToScreenReader("Search submitted", 'polite');
      }
    });
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    announceToScreenReader(`View changed to ${mode} layout`, 'polite');
  };

  const loadMore = () => {
    if (pagination?.hasNext) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Skip to main content link for screen readers
  const skipToContent = () => {
    resultsHeadingRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Skip to main content - accessibility */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          skipToContent();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-accent text-on-accent px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <Navbar />
      
      {/* Hero Section */}
      <section 
        className={`relative h-screen flex items-center justify-center ${
          prefersReducedMotion ? '' : 'transition-all duration-700'
        }`}
        aria-label="Hero section with search"
      >
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt=""
            className="w-full h-full object-cover"
            role="presentation"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-h1 font-brand mb-6">
            Exclusive South Florida
            <br />
            Luxury Properties
          </h1>
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto">
            Discover Miami's most prestigious waterfront estates, penthouses, 
            and luxury condominiums in the world's most desirable locations.
          </p>
          
          {/* Hero Search */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="hero-search" className="sr-only">
                  Search properties by address, neighborhood, or property type
                </label>
                <input
                  id="hero-search"
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by address, neighborhood, or property type"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyboard}
                  className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  aria-describedby="search-help"
                />
                <div id="search-help" className="sr-only">
                  Enter search terms and press Enter or click the search button to find properties
                </div>
              </div>
              <MillionButton 
                variant="primary" 
                size="lg" 
                icon={<Search className="w-5 h-5" />}
                onClick={() => revalidate()}
                aria-label="Search for properties"
              >
                Search
              </MillionButton>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section - Sticky */}
      <section 
        className="sticky top-16 z-40 bg-bg/95 backdrop-blur-sm border-b border-line py-6"
        aria-label="Property filters and sorting options"
        ref={filtersRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3" role="group" aria-label="Property feature filters">
              {availableFilters.slice(0, 8).map((filter) => (
                <FilterPill
                  key={filter}
                  selected={selectedFilters.includes(filter)}
                  dismissible={selectedFilters.includes(filter)}
                  onClick={() => toggleFilter(filter)}
                  onDismiss={() => removeFilter(filter)}
                  aria-label={generateAriaLabel({
                    type: 'button',
                    action: selectedFilters.includes(filter) ? 'Remove filter' : 'Add filter',
                    label: filter
                  })}
                >
                  {filter}
                </FilterPill>
              ))}
              {selectedFilters.length > 0 && (
                <MillionButton 
                  variant="ghost" 
                  size="md"
                  onClick={clearAllFilters}
                  className="text-sm"
                  aria-label="Clear all active filters"
                  icon={<X className="w-4 h-4" />}
                >
                  Clear All
                </MillionButton>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <div className="min-w-[180px]">
                <label htmlFor="sort-select" className="sr-only">Sort properties by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-select" className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price: High to Low</SelectItem>
                    <SelectItem value="createdAt">Newest First</SelectItem>
                    <SelectItem value="squareFeet">Largest First</SelectItem>
                    <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2" role="group" aria-label="View mode selection">
                <button
                  onClick={() => handleViewModeChange("grid")}
                  className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                    viewMode === "grid" ? "bg-accent text-on-accent" : "text-text-muted hover:text-accent"
                  }`}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange("list")}
                  className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                    viewMode === "list" ? "bg-accent text-on-accent" : "text-text-muted hover:text-accent"
                  }`}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mt-6 max-w-md">
            <label htmlFor="price-range" className="block text-body font-medium text-text mb-3">
              Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </label>
            <Slider
              id="price-range"
              value={priceRange}
              onValueChange={setPriceRange}
              min={100000}
              max={10000000}
              step={50000}
              className="w-full"
              aria-label="Filter properties by price range"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 
              ref={resultsHeadingRef}
              className="text-h2 font-brand text-text"
              tabIndex={-1}
            >
              {selectedFilters.length > 0 || searchQuery ? 'Search Results' : 'Featured Properties'}
            </h2>
            <div className="text-body text-text-muted" aria-live="polite" aria-atomic="true">
              {isLoading || isValidating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                `${pagination?.total || 0} properties found`
              )}
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-8" role="alert" aria-live="assertive">
              <div className="bg-error/10 text-error px-4 py-3 rounded-lg inline-block mb-4">
                {error}
              </div>
              <div>
                <MillionButton 
                  variant="outline" 
                  onClick={() => revalidate()}
                  aria-label="Retry loading properties"
                >
                  Try Again
                </MillionButton>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && <PropertyGridSkeleton count={8} />}

          {/* Empty State */}
          {!isLoading && !error && isEmpty && (
            <EmptyState 
              type="search"
              onAction={clearAllFilters}
            />
          )}

          {/* Properties Grid */}
          {!isLoading && !error && properties.length > 0 && (
            <>
              <div 
                className={`grid gap-8 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1 max-w-4xl mx-auto"
                }`}
                role="list"
                aria-label={`Property listings in ${viewMode} view`}
              >
                {properties.map((property) => (
                  <div key={property.id} role="listitem">
                    <PropertyCard
                      image={property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                      price={`$${property.price.toLocaleString()}`}
                      location={`${property.address}, ${property.city}`}
                      beds={property.bedrooms}
                      baths={property.bathrooms}
                      sqft={property.squareFeet}
                      badge={property.badge}
                      onViewDetails={() => onPropertySelect?.(property.id)}
                      onFavorite={() => handleFavorite(property.id)}
                      isFavorite={isFavorite(property.id)}
                      className={viewMode === "list" ? "flex flex-col sm:flex-row" : ""}
                      aria-label={generateAriaLabel({
                        type: 'property',
                        price: `$${property.price.toLocaleString()}`,
                        location: `${property.address}, ${property.city}`,
                        bedrooms: property.bedrooms,
                        bathrooms: property.bathrooms,
                        status: property.status
                      })}
                    />
                  </div>
                ))}
              </div>

              {/* Load More */}
              {pagination?.hasNext && (
                <div className="text-center mt-12">
                  <MillionButton 
                    variant="outline" 
                    size="lg"
                    onClick={loadMore}
                    disabled={isValidating}
                    icon={isValidating ? <Loader2 className="w-5 h-5 animate-spin" /> : undefined}
                    aria-label="Load more properties"
                  >
                    {isValidating ? 'Loading...' : 'Load More Properties'}
                  </MillionButton>
                </div>
              )}

              {/* Pagination Info */}
              <div className="text-center mt-8 text-body text-text-muted" aria-live="polite">
                Showing {Math.min((pagination?.page || 1) * (pagination?.limit || 20), pagination?.total || 0)} of {pagination?.total || 0} properties
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;