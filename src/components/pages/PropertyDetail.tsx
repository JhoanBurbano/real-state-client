import * as React from "react";
import { ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, Calendar, Car, Phone, Mail, User } from "lucide-react";
import { Navbar } from "../ui/navbar";
import { Footer } from "../ui/footer";
import { MillionButton } from "../ui/million-button";
import { Badge } from "../ui/badge";
import { ContactModal } from "../ui/contact-modal";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useProperty, useFavorites } from "../../hooks/useProperties";
import { announceToScreenReader } from "../../utils/accessibility";

interface PropertyDetailProps {
  propertyId: string;
  onBack?: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ propertyId, onBack }) => {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  
  // Fetch property data and agent info
  const { property, agent, isLoading, error, revalidate } = useProperty(propertyId);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavorite = () => {
    if (!property) return;
    
    if (isFavorite(property.id)) {
      removeFavorite(property.id);
      announceToScreenReader("Property removed from favorites", 'polite');
    } else {
      addFavorite(property.id);
      announceToScreenReader("Property added to favorites", 'polite');
    }
  };

  const handleShare = async () => {
    if (navigator.share && property) {
      try {
        await navigator.share({
          title: `${property.address} - MILLION Real Estate`,
          text: `Check out this luxury property: ${property.address}`,
          url: window.location.href,
        });
        announceToScreenReader("Property shared successfully", 'polite');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else if (property) {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        announceToScreenReader("Property link copied to clipboard", 'polite');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-surface rounded w-32 mb-8"></div>
            <div className="h-96 bg-surface rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-surface rounded w-3/4"></div>
                <div className="h-4 bg-surface rounded w-full"></div>
                <div className="h-4 bg-surface rounded w-5/6"></div>
              </div>
              <div className="h-64 bg-surface rounded-lg"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-h2 font-brand text-text mb-4">Property Not Found</h1>
            <p className="text-body text-text-muted mb-8">
              {error || "The property you're looking for doesn't exist or has been removed."}
            </p>
            <div className="space-x-4">
              <MillionButton 
                variant="primary" 
                onClick={onBack}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Go Back
              </MillionButton>
              <MillionButton 
                variant="outline" 
                onClick={() => revalidate()}
              >
                Try Again
              </MillionButton>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MillionButton
          variant="ghost"
          onClick={onBack}
          icon={<ArrowLeft className="w-4 h-4" />}
          className="mb-8"
          aria-label="Go back to property listings"
        >
          Back to Properties
        </MillionButton>
      </div>

      {/* Property Hero Image */}
      <section className="relative h-96 md:h-[600px] mb-8" aria-label="Property main image">
        <ImageWithFallback
          src={property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
          alt={`Main view of ${property.address}`}
          className="w-full h-full object-cover"
        />
        
        {/* Property Badge */}
        {property.badge && (
          <div className="absolute top-4 left-4">
            <Badge 
              variant={
                property.badge === 'Hot' ? 'destructive' :
                property.badge === 'New' ? 'secondary' :
                'outline'
              }
              className="text-white bg-black/50 backdrop-blur-sm"
            >
              {property.badge}
            </Badge>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          <button
            onClick={handleFavorite}
            className={`p-3 rounded-full backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
              isFavorite(property.id)
                ? 'bg-error text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            aria-label={isFavorite(property.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-5 h-5 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleShare}
            className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label="Share this property"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Property Details */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-h2 font-brand text-text mb-2">{property.address}</h1>
                  <div className="flex items-center text-text-muted mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-body">{property.city}, {property.state} {property.zipCode}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-h2 font-brand text-accent mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-body text-text-muted">
                    ${Math.round(property.price / property.squareFeet).toLocaleString()}/sq ft
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Bed className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-h5 font-medium text-text">{property.bedrooms}</div>
                    <div className="text-sm text-text-muted">Bedrooms</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Bath className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-h5 font-medium text-text">{property.bathrooms}</div>
                    <div className="text-sm text-text-muted">Bathrooms</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Square className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-h5 font-medium text-text">{formatSquareFeet(property.squareFeet)}</div>
                    <div className="text-sm text-text-muted">Sq Ft</div>
                  </div>
                </div>
                
                {property.parking && (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Car className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-h5 font-medium text-text">{property.parking}</div>
                      <div className="text-sm text-text-muted">Parking</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Property Description */}
            <div className="mb-8">
              <h2 className="text-h3 font-brand text-text mb-4">Description</h2>
              <p className="text-body text-text-muted leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Property Features */}
            <div className="mb-8">
              <h2 className="text-h3 font-brand text-text mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-body text-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-h3 font-brand text-text mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-surface rounded-lg">
                <div>
                  <div className="text-body font-medium text-text mb-1">Property Type</div>
                  <div className="text-body text-text-muted capitalize">{property.propertyType}</div>
                </div>
                
                {property.yearBuilt && (
                  <div>
                    <div className="text-body font-medium text-text mb-1">Year Built</div>
                    <div className="text-body text-text-muted">{property.yearBuilt}</div>
                  </div>
                )}
                
                <div>
                  <div className="text-body font-medium text-text mb-1">Status</div>
                  <div className="text-body text-text-muted capitalize">{property.status}</div>
                </div>
                
                <div>
                  <div className="text-body font-medium text-text mb-1">MLS ID</div>
                  <div className="text-body text-text-muted">{property.id}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Agent Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-surface-elev rounded-xl p-6 shadow-luxury-md">
                <h3 className="text-h4 font-brand text-text mb-6">Contact Agent</h3>
                
                {agent ? (
                  <div className="space-y-6">
                    {/* Agent Info */}
                    <div className="flex items-center space-x-4">
                      <ImageWithFallback
                        src={agent.photo}
                        alt={`${agent.firstName} ${agent.lastName}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-h5 font-medium text-text">
                          {agent.firstName} {agent.lastName}
                        </div>
                        <div className="text-body text-text-muted">{agent.title}</div>
                        <div className="text-sm text-text-muted">License: {agent.licenseNumber}</div>
                      </div>
                    </div>

                    {/* Agent Specialties */}
                    <div>
                      <div className="text-body font-medium text-text mb-2">Specialties</div>
                      <div className="flex flex-wrap gap-2">
                        {agent.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="space-y-3">
                      <MillionButton
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={() => setIsContactModalOpen(true)}
                        icon={<Mail className="w-4 h-4" />}
                      >
                        Request Information
                      </MillionButton>
                      
                      <MillionButton
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => window.open(`tel:${agent.phone}`, '_self')}
                        icon={<Phone className="w-4 h-4" />}
                      >
                        {agent.phone}
                      </MillionButton>
                    </div>

                    {/* Agent Bio */}
                    <div className="pt-4 border-t border-line">
                      <p className="text-body text-text-muted text-sm leading-relaxed">
                        {agent.bio}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-text-muted" />
                      </div>
                      <div>
                        <div className="text-h5 font-medium text-text">MILLION Real Estate</div>
                        <div className="text-body text-text-muted">Luxury Property Specialist</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <MillionButton
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={() => setIsContactModalOpen(true)}
                        icon={<Mail className="w-4 h-4" />}
                      >
                        Request Information
                      </MillionButton>
                      
                      <MillionButton
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => window.open('tel:(305) 555-MILLION', '_self')}
                        icon={<Phone className="w-4 h-4" />}
                      >
                        (305) 555-MILLION
                      </MillionButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        propertyAddress={property.address}
        propertyId={property.id}
      />
    </div>
  );
};

export default PropertyDetail;