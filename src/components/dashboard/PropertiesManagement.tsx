'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { PropertyImage } from '@/components/ui/PropertyImage'
import { useProperties } from '@/hooks/useProperties'
import { PropertyForm } from './PropertyForm'
import { PropertyModal } from './PropertyModal'
import type { Property } from '@/types'

export function PropertiesManagement() {
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const {
    properties,
    loading,
    error,
    loadMore,
    currentPage,
    totalPages,
    activateProperty,
    deactivateProperty,
  } = useProperties()

  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      filterStatus === 'all' || property.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property)
    setShowAddProperty(true)
  }

  const handleDeleteProperty = async (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        // TODO: Implement delete property API call when backend endpoint is available
        console.log('Deleting property:', propertyId)
        // await millionAPI.deleteProperty(propertyId)
        // Refresh properties list
        // fetchProperties()
      } catch (error) {
        console.error('Error deleting property:', error)
      }
    }
  }

  const handleStatusToggle = async (
    propertyId: string,
    currentStatus: string
  ) => {
    try {
      if (currentStatus === 'Active') {
        await deactivateProperty(propertyId)
      } else {
        await activateProperty(propertyId)
      }
    } catch (error) {
      console.error('Error toggling property status:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">
            Properties Management
          </h1>
          <p className="text-text-muted">
            Manage your property listings, add new properties, and track
            performance.
          </p>
        </div>
        <Button
          onClick={() => setShowAddProperty(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Property</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search properties by name or address..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-text-muted" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-line rounded-lg bg-white text-text"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Sold">Sold</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Properties List */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left py-3 px-4 font-medium text-text">
                  Property
                </th>
                <th className="text-left py-3 px-4 font-medium text-text">
                  Price
                </th>
                <th className="text-left py-3 px-4 font-medium text-text">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-text">
                  Location
                </th>
                <th className="text-left py-3 px-4 font-medium text-text">
                  Views
                </th>
                <th className="text-left py-3 px-4 font-medium text-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map(property => (
                <tr
                  key={property.id}
                  className="border-b border-line hover:bg-surface-elev"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-surface-elev rounded-lg flex items-center justify-center overflow-hidden">
                        <PropertyImage
                          property={property}
                          className="w-12 h-12 object-cover"
                          fallbackIcon={false}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-text">{property.name}</p>
                        <p className="text-sm text-text-muted">
                          {property.bedrooms} bed • {property.bathrooms} bath
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-text">
                      ${property.price.toLocaleString()}
                    </p>
                  </td>
                  <td className="py-4 px-4">
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
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-text">{property.city}</p>
                    <p className="text-sm text-text-muted">
                      {property.neighborhood}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-text">1,234</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProperty(property)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProperty(property)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleStatusToggle(property.id, property.status)
                        }
                      >
                        {property.status === 'Active'
                          ? 'Deactivate'
                          : 'Activate'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProperty(property.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Load More */}
        {currentPage < totalPages && (
          <div className="text-center mt-6">
            <Button
              onClick={loadMore}
              disabled={loading}
              variant="outline"
              size="lg"
            >
              {loading ? 'Loading...' : 'Load More Properties'}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredProperties.length === 0 && !loading && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text mb-2">
              No properties found
            </h3>
            <p className="text-text-muted mb-4">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first property'}
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <Button onClick={() => setShowAddProperty(true)}>
                Add Your First Property
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Property Form Modal */}
      {showAddProperty && (
        <PropertyForm
          property={selectedProperty}
          onClose={() => {
            setShowAddProperty(false)
            setSelectedProperty(null)
          }}
          onSave={async savedProperty => {
            try {
              if (selectedProperty) {
                // Update existing property
                await millionAPI.updateProperty(
                  selectedProperty.id,
                  savedProperty
                )
              } else {
                // Create new property
                await millionAPI.createProperty(savedProperty)
              }
              // Refresh properties list
              // fetchProperties()
              setShowAddProperty(false)
              setSelectedProperty(null)
            } catch (error) {
              console.error('Error saving property:', error)
            }
          }}
        />
      )}

      {/* Property View Modal */}
      {selectedProperty && !showAddProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  )
}
