'use client'

import {
  X,
  Building2,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Ruler,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PropertyImage } from '@/components/ui/PropertyImage'
import type { Property } from '@/types'

interface PropertyModalProps {
  property: Property
  onClose: () => void
}

export function PropertyModal({ property, onClose }: PropertyModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-semibold text-text">
                Property Details
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Property Image */}
          <div className="w-full h-64 bg-surface-elev rounded-lg mb-6 overflow-hidden">
            <PropertyImage
              property={property}
              className="w-full h-full object-cover"
              fallbackIcon={true}
            />
          </div>

          {/* Property Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-3">
                {property.name}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-surface-elev rounded-lg">
                <DollarSign className="h-6 w-6 text-accent mx-auto mb-2" />
                <div className="text-lg font-bold text-text">
                  ${property.price.toLocaleString()}
                </div>
                <div className="text-sm text-text-muted">Price</div>
              </div>

              <div className="text-center p-4 bg-surface-elev rounded-lg">
                <Bed className="h-6 w-6 text-accent mx-auto mb-2" />
                <div className="text-lg font-bold text-text">
                  {property.bedrooms}
                </div>
                <div className="text-sm text-text-muted">Bedrooms</div>
              </div>

              <div className="text-center p-4 bg-surface-elev rounded-lg">
                <Bath className="h-6 w-6 text-accent mx-auto mb-2" />
                <div className="text-lg font-bold text-text">
                  {property.bathrooms}
                </div>
                <div className="text-sm text-text-muted">Bathrooms</div>
              </div>

              <div className="text-center p-4 bg-surface-elev rounded-lg">
                <Ruler className="h-6 w-6 text-accent mx-auto mb-2" />
                <div className="text-lg font-bold text-text">
                  {property.size.toLocaleString()}
                </div>
                <div className="text-sm text-text-muted">Sq Ft</div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-surface-elev p-4 rounded-lg">
              <h4 className="font-semibold text-text mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-accent" />
                Location
              </h4>
              <p className="text-text">{property.address}</p>
              <p className="text-text-muted">
                {property.neighborhood}, {property.city}
              </p>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-text mb-3">
                  Property Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Type:</span>
                    <span className="text-text">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Status:</span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        property.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : property.status === 'Sold'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Year Built:</span>
                    <span className="text-text">{property.year || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Code:</span>
                    <span className="text-text">{property.codeInternal}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text mb-3">Amenities</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Pool:</span>
                    <span className="text-text">
                      {property.hasPool ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Garden:</span>
                    <span className="text-text">
                      {property.hasGarden ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Parking:</span>
                    <span className="text-text">
                      {property.hasParking ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Furnished:</span>
                    <span className="text-text">
                      {property.isFurnished ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            {property.availableFrom && (
              <div className="bg-surface-elev p-4 rounded-lg">
                <h4 className="font-semibold text-text mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-accent" />
                  Availability
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-text-muted">Available From:</span>
                    <p className="text-text">{property.availableFrom}</p>
                  </div>
                  {property.availableTo && (
                    <div>
                      <span className="text-text-muted">Available To:</span>
                      <p className="text-text">{property.availableTo}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-line">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>Schedule Visit</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
