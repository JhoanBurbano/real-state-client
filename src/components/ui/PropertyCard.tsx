'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Bed, Bath, Square, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, formatSquareFeet, truncateText } from '@/lib/utils'
import { useFavorites } from '@/hooks/useFavorites'
import type { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  className?: string
}

export function PropertyCard({ property, className = '' }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  console.log('property', property)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const isFav = isFavorite(property.id)

  return (
    <div className={`group luxury-card ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 bg-surface animate-pulse" />
        )}
        {!imageError ? (
          <Image
            src={property.coverUrl}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            onLoad={handleImageLoad}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-surface flex items-center justify-center">
            <div className="text-text-muted text-center">
              <div className="w-16 h-16 bg-line/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-8 h-8" />
              </div>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleFavorite(property)}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-text hover:text-accent transition-all"
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isFav ? 'fill-accent text-accent' : 'text-text-muted'
            }`}
          />
        </Button>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={property.status === 'Active' ? 'default' : 'secondary'}
          >
            {property.status === 'Active'
              ? 'For Sale'
              : property.status === 'Sold'
                ? 'Sold'
                : property.status === 'OffMarket'
                  ? 'Off Market'
                  : property.status === 'Pending'
                    ? 'Pending'
                    : property.status}
          </Badge>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-lg font-bold text-text">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Location */}
        <div>
          <Link href={`/properties/${property.id}`}>
            <h3 className="font-semibold text-text hover:text-accent transition-colors line-clamp-1">
              {property.name}
            </h3>
          </Link>
          <div className="flex items-center text-text-muted text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.address}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-text-muted">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{formatSquareFeet(property.size)}</span>
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="capitalize">
            {property.propertyType}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-text-muted text-sm line-clamp-2">
          {truncateText(
            property?.description || 'No description available',
            120
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Link href={`/properties/${property.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          {/* <Link href={`/properties/${property.id}`}>
            <Button variant="default">Contact Agent</Button>
          </Link> */}
        </div>
      </div>
    </div>
  )
}
