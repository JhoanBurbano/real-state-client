'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart,
  Bed,
  Bath,
  Square,
  MapPin,
  Share2,
  Car,
  Wifi,
  Waves,
  Dumbbell,
  Shield,
  TreePine,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ContactForm } from '@/components/forms/ContactForm'
import { PropertyTimeline } from '@/components/ui/PropertyTimeline'
import { useProperty } from '@/hooks/useProperty'
import { usePropertyTraces } from '@/hooks/useProperties'
import { useFavorites } from '@/hooks/useFavorites'
import { formatPrice, formatNumber } from '@/lib/utils'

interface PropertyDetailPageProps {
  propertyId: string
}

export function PropertyDetailPage({ propertyId }: PropertyDetailPageProps) {
  const [showContactForm, setShowContactForm] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const {
    property,
    loading: propertyLoading,
    error: propertyError,
  } = useProperty(propertyId)
  const { favorites, toggleFavorite } = useFavorites()
  const {
    traces,
    loading: tracesLoading,
    error: tracesError,
  } = usePropertyTraces(propertyId)

  const isFavorite = property
    ? favorites.some(fav => fav.id === property.id)
    : false

  // Loading state for property
  if (propertyLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-text mb-4">
            Loading Property...
          </h1>
          <p className="text-text-muted">
            Please wait while we fetch the property details.
          </p>
        </div>
      </div>
    )
  }

  // Error state for property
  if (propertyError) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text mb-4">
            Error Loading Property
          </h1>
          <p className="text-text-muted mb-6">{propertyError}</p>
          <div className="space-x-4">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <Link href="/properties">
              <Button variant="outline">Browse Properties</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Property not found
  if (!property) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text mb-4">
            Property Not Found
          </h1>
          <p className="text-text-muted mb-6">
            The property you're looking for doesn't exist.
          </p>
          <Link href="/properties">
            <Button>Browse Properties</Button>
          </Link>
        </div>
      </div>
    )
  }

  const amenities = [
    { name: 'Swimming Pool', icon: Waves, available: true },
    { name: 'Gym', icon: Dumbbell, available: true },
    { name: 'Security System', icon: Shield, available: true },
    { name: 'Garden', icon: TreePine, available: true },
    { name: 'Parking', icon: Car, available: true },
    { name: 'High-Speed WiFi', icon: Wifi, available: true },
  ]

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section with Images */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-96 lg:h-[600px] overflow-hidden">
          <Image
            src={property.coverUrl}
            alt={property.name}
            fill
            className="object-cover"
            priority
          />

          {/* Overlay with property info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h1 className="font-playfair text-3xl lg:text-5xl font-bold mb-2">
                      {property.name}
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90 flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      {property.address}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => toggleFavorite(property)}
                      className="bg-white/20 text-white hover:bg-white/30"
                    >
                      <Heart
                        className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="bg-white/20 text-white hover:bg-white/30"
                    >
                      <Share2 className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Thumbnails */}
        {property.media && property.media.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              {property.media.slice(0, 5).map((media, index) => (
                <button
                  key={media.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? 'border-accent scale-110'
                      : 'border-white/50 hover:border-white/80'
                  }`}
                >
                  <Image
                    src={media.url}
                    alt={`${property.name} - Image ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price and Status */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-text mb-2">
                  {formatPrice(property.price)}
                </div>
                <Badge
                  variant={
                    property.status === 'Active' ? 'default' : 'secondary'
                  }
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
              <Button size="lg" onClick={() => setShowContactForm(true)}>
                I'm Interested
              </Button>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-surface-elev rounded-lg">
              <div className="text-center">
                <Bed className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text">
                  {property.bedrooms}
                </div>
                <div className="text-text-muted">Bedrooms</div>
              </div>
              <div className="text-center">
                <Bath className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text">
                  {property.bathrooms}
                </div>
                <div className="text-text-muted">Bathrooms</div>
              </div>
              <div className="text-center">
                <Square className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text">
                  {formatNumber(property.size)}
                </div>
                <div className="text-text-muted">Sq Ft</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-playfair text-2xl font-bold text-text mb-4">
                About This Property
              </h2>
              <p className="text-text-muted leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-playfair text-2xl font-bold text-text mb-4">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map(amenity => {
                  const Icon = amenity.icon
                  return (
                    <div
                      key={amenity.name}
                      className="flex items-center space-x-3 p-3 bg-surface-elev rounded-lg"
                    >
                      <Icon
                        className={`h-5 w-5 ${amenity.available ? 'text-success' : 'text-text-muted'}`}
                      />
                      <span
                        className={`text-sm ${amenity.available ? 'text-text' : 'text-text-muted'}`}
                      >
                        {amenity.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Property Timeline */}
            <div>
              <h2 className="font-playfair text-2xl font-bold text-text mb-6">
                Property Timeline
              </h2>
              <PropertyTimeline
                traces={traces}
                loading={tracesLoading}
                error={tracesError}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Owner Info */}
            <div className="bg-surface-elev rounded-lg p-6">
              <h3 className="font-playfair text-xl font-bold text-text mb-4">
                Property Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Owner ID:</span>
                  <span className="text-text font-medium">
                    {property.ownerId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Internal Code:</span>
                  <span className="text-text font-medium">
                    {property.codeInternal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Year Built:</span>
                  <span className="text-text font-medium">{property.year}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-6">
              <h3 className="font-playfair text-xl font-bold text-text mb-4">
                Interested in this property?
              </h3>
              <p className="text-text-muted mb-4">
                Get in touch with us to schedule a viewing or learn more about
                this exceptional property.
              </p>
              <Button
                onClick={() => setShowContactForm(true)}
                className="w-full"
              >
                Schedule Viewing
              </Button>
            </div>

            {/* Property Details */}
            <div className="bg-surface-elev rounded-lg p-6">
              <h3 className="font-playfair text-xl font-bold text-text mb-4">
                Property Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Property Type:</span>
                  <span className="text-text font-medium capitalize">
                    {property.propertyType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Status:</span>
                  <span className="text-text font-medium capitalize">
                    {property.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Square Feet:</span>
                  <span className="text-text font-medium">
                    {formatNumber(property.size)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Listed:</span>
                  <span className="text-text font-medium">
                    January 15, 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm
          property={property}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  )
}
