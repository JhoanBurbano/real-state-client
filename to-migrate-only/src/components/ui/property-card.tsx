import * as React from "react";
import { Heart, MapPin, Bed, Bath, Square, ArrowRight, Sparkles } from "lucide-react";
import { MillionButton } from "./million-button";
import { Badge } from "./badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { announceToScreenReader, useReducedMotion } from "../../utils/accessibility";

interface PropertyCardProps {
  image: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  badge?: string | null;
  onViewDetails?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  price,
  location,
  beds,
  baths,
  sqft,
  badge,
  onViewDetails,
  onFavorite,
  isFavorite = false,
  className = "",
  'aria-label': ariaLabel,
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleFavorite = () => {
    onFavorite?.();
    announceToScreenReader(
      isFavorite ? "Property removed from favorites" : "Property added to favorites",
      'polite'
    );
  };

  const handleViewDetails = () => {
    onViewDetails?.();
    announceToScreenReader("Navigating to property details", 'polite');
  };

  return (
    <div 
      className={`group relative bg-surface-elev rounded-2xl overflow-hidden border border-line/30 backdrop-blur-sm transition-all duration-500 ease-out ${
        prefersReducedMotion ? 'shadow-luxury-md hover:shadow-luxury-lg' : 'shadow-luxury-md hover:shadow-luxury-lg hover:-translate-y-3 hover:scale-[1.02]'
      } hover:border-accent/20 ${className}`}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(247,247,248,0.90) 100%)',
        boxShadow: '0 8px 32px rgba(167, 128, 71, 0.08), 0 1px 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
      aria-label={ariaLabel}
    >
      {/* Luxury Border Accent */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Premium Shimmer Effect */}
      <div className="absolute inset-0 -top-4 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-all duration-1000 ease-out" />

      {/* Property Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <ImageWithFallback
          src={image}
          alt={`Property at ${location}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
        />
        
        {/* Luxury Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500" />
        
        {/* Premium Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-all duration-500" />
        
        {/* Badge with Luxury Styling */}
        {badge && (
          <div className="absolute top-6 left-6">
            <Badge 
              variant={
                badge === 'Hot' ? 'destructive' :
                badge === 'New' ? 'secondary' :
                'outline'
              }
              className={`
                px-3 py-1.5 font-medium tracking-wide backdrop-blur-md border-0 shadow-lg
                ${badge === 'Hot' ? 'bg-gradient-to-r from-red-500/90 to-red-600/90 text-white' :
                  badge === 'New' ? 'bg-gradient-to-r from-accent/90 to-accent/80 text-on-accent' :
                  'bg-black/40 text-white border border-white/20'
                }
              `}
            >
              {badge === 'Hot' && <Sparkles className="w-3 h-3 mr-1 animate-pulse" />}
              {badge}
            </Badge>
          </div>
        )}
        
        {/* Premium Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-6 right-6 p-3 rounded-xl backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-white/50 group-hover:scale-110 ${
            isFavorite
              ? 'bg-gradient-to-br from-error/90 to-error/80 text-white shadow-lg'
              : 'bg-black/30 text-white hover:bg-black/50 border border-white/20 hover:border-white/40'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-5 h-5 transition-transform duration-200 ${isFavorite ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
        </button>

        {/* Luxury Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-elev/95 to-transparent" />
      </div>

      {/* Property Details with Premium Styling */}
      <div className="relative p-8">
        {/* Decorative Line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        
        {/* Price with Luxury Typography */}
        <div className="mb-6">
          <h3 className="text-h3 font-brand text-text mb-3 tracking-tight bg-gradient-to-br from-text to-text/80 bg-clip-text">
            {price}
          </h3>
          <div className="flex items-start text-text-muted group-hover:text-text transition-colors duration-300">
            <MapPin className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0 text-accent/70" />
            <span className="text-body leading-relaxed font-medium">{location}</span>
          </div>
        </div>

        {/* Premium Property Stats */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-surface/50 to-surface/30 rounded-xl border border-line/20">
          <div className="flex flex-col items-center space-y-1 text-center">
            <Bed className="w-5 h-5 text-accent/80" />
            <span className="text-sm font-semibold text-text">{beds}</span>
            <span className="text-xs text-text-muted font-medium">Beds</span>
          </div>
          
          <div className="w-px h-8 bg-line/30" />
          
          <div className="flex flex-col items-center space-y-1 text-center">
            <Bath className="w-5 h-5 text-accent/80" />
            <span className="text-sm font-semibold text-text">{baths}</span>
            <span className="text-xs text-text-muted font-medium">Baths</span>
          </div>
          
          <div className="w-px h-8 bg-line/30" />
          
          <div className="flex flex-col items-center space-y-1 text-center">
            <Square className="w-5 h-5 text-accent/80" />
            <span className="text-sm font-semibold text-text">{formatNumber(sqft)}</span>
            <span className="text-xs text-text-muted font-medium">Sq ft</span>
          </div>
        </div>

        {/* Premium View Details Button */}
        <MillionButton
          variant="primary"
          size="lg"
          onClick={handleViewDetails}
          className={`
            w-full group/button relative overflow-hidden
            bg-gradient-to-r from-accent via-accent to-accent/90 
            hover:from-accent hover:via-accent/90 hover:to-accent/80
            text-on-accent font-semibold tracking-wide
            shadow-lg hover:shadow-xl
            border-0
            ${prefersReducedMotion ? '' : 'transition-all duration-300 hover:scale-[1.02]'}
          `}
          icon={
            <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
              prefersReducedMotion ? '' : 'group-hover/button:translate-x-2 group-hover/button:scale-110'
            }`} />
          }
        >
          <span className="relative z-10">View Details</span>
          
          {/* Button Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/button:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover/button:translate-x-[200%] transition-all duration-500" />
        </MillionButton>

        {/* Luxury Bottom Border */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};