import * as React from "react";
import { Skeleton } from "./skeleton";

interface PropertyCardSkeletonProps {
  className?: string;
}

const PropertyCardSkeleton: React.FC<PropertyCardSkeletonProps> = ({ className = "" }) => {
  return (
    <div 
      className={`bg-surface-elev rounded-2xl overflow-hidden border border-line/30 backdrop-blur-sm ${className}`}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(247,247,248,0.90) 100%)',
        boxShadow: '0 8px 32px rgba(167, 128, 71, 0.08), 0 1px 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <Skeleton className="w-full h-full" />
        
        {/* Badge Skeleton */}
        <div className="absolute top-6 left-6">
          <Skeleton className="w-16 h-7 rounded-lg" />
        </div>
        
        {/* Favorite Button Skeleton */}
        <div className="absolute top-6 right-6">
          <Skeleton className="w-11 h-11 rounded-xl" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-8">
        {/* Decorative Line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
        
        {/* Price Skeleton */}
        <div className="mb-6">
          <Skeleton className="w-32 h-8 mb-3" />
          <div className="flex items-start">
            <Skeleton className="w-5 h-5 mt-0.5 mr-3 rounded" />
            <Skeleton className="flex-1 h-5" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-surface/50 to-surface/30 rounded-xl border border-line/20">
          <div className="flex flex-col items-center space-y-1">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-6 h-4" />
            <Skeleton className="w-8 h-3" />
          </div>
          
          <div className="w-px h-8 bg-line/30" />
          
          <div className="flex flex-col items-center space-y-1">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-6 h-4" />
            <Skeleton className="w-8 h-3" />
          </div>
          
          <div className="w-px h-8 bg-line/30" />
          
          <div className="flex flex-col items-center space-y-1">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-8 h-4" />
            <Skeleton className="w-8 h-3" />
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className="w-full h-12 rounded-xl" />
      </div>
    </div>
  );
};

interface PropertyGridSkeletonProps {
  count?: number;
  className?: string;
}

export const PropertyGridSkeleton: React.FC<PropertyGridSkeletonProps> = ({ 
  count = 8, 
  className = "" 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default PropertyGridSkeleton;