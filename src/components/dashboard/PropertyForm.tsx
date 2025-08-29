'use client'

import { useState, useEffect } from 'react'
import { X, Save, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import type { Property } from '@/types'

interface PropertyFormProps {
  property?: Property | null
  onClose: () => void
  onSave: (property: Partial<Property>) => void
}

export function PropertyForm({ property, onClose, onSave }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    name: property?.name || '',
    description: property?.description || '',
    address: property?.address || '',
    city: property?.city || '',
    neighborhood: property?.neighborhood || '',
    price: property?.price || 0,
    bedrooms: property?.bedrooms || 0,
    bathrooms: property?.bathrooms || 0,
    size: property?.size || 0,
    propertyType: property?.propertyType || 'House',
    status: property?.status || 'Active',
  })

  const propertyTypes = [
    'House',
    'Apartment',
    'Condo',
    'Villa',
    'Penthouse',
    'Townhouse',
  ]
  const statusOptions = ['Active', 'Inactive', 'Sold', 'Pending']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-semibold text-text">
                {property ? 'Edit Property' : 'Add New Property'}
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Property Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  placeholder="Enter property name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Property Type *
                </label>
                <select
                  value={formData.propertyType}
                  onChange={e =>
                    handleInputChange('propertyType', e.target.value)
                  }
                  className="w-full p-3 border border-line rounded-lg bg-white text-text"
                  required
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                placeholder="Describe the property..."
                className="w-full p-3 border border-line rounded-lg resize-none"
                rows={4}
              />
            </div>

            {/* Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Address *
                </label>
                <Input
                  value={formData.address}
                  onChange={e => handleInputChange('address', e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  City *
                </label>
                <Input
                  value={formData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Neighborhood
                </label>
                <Input
                  value={formData.neighborhood}
                  onChange={e =>
                    handleInputChange('neighborhood', e.target.value)
                  }
                  placeholder="Neighborhood"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Price *
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={e =>
                    handleInputChange('price', parseInt(e.target.value) || 0)
                  }
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Bedrooms *
                </label>
                <Input
                  type="number"
                  value={formData.bedrooms}
                  onChange={e =>
                    handleInputChange('bedrooms', parseInt(e.target.value) || 0)
                  }
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Bathrooms *
                </label>
                <Input
                  type="number"
                  value={formData.bathrooms}
                  onChange={e =>
                    handleInputChange(
                      'bathrooms',
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Size (sq ft)
                </label>
                <Input
                  type="number"
                  value={formData.size}
                  onChange={e =>
                    handleInputChange('size', parseInt(e.target.value) || 0)
                  }
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={e => handleInputChange('status', e.target.value)}
                className="w-full p-3 border border-line rounded-lg bg-white text-text"
                required
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-line">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>{property ? 'Update Property' : 'Add Property'}</span>
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
