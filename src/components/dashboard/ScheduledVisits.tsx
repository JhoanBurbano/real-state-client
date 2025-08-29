'use client'

import { useState } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Plus,
  Search,
  Filter,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

interface ScheduledVisit {
  id: string
  propertyName: string
  propertyAddress: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  time: string
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  notes: string
}

export function ScheduledVisits() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAddVisit, setShowAddVisit] = useState(false)

  // TODO: Replace with real API call when backend endpoint is available
  const [visits] = useState<ScheduledVisit[]>([
    {
      id: '1',
      propertyName: 'Luxury Villa Miami Beach',
      propertyAddress: '123 Ocean Drive, Miami Beach, FL',
      clientName: 'John Smith',
      clientEmail: 'john.smith@email.com',
      clientPhone: '+1 (555) 123-4567',
      date: '2024-01-15',
      time: '14:00',
      status: 'scheduled',
      notes: 'Client interested in waterfront properties, prefers 3+ bedrooms',
    },
    {
      id: '2',
      propertyName: 'Downtown Penthouse',
      propertyAddress: '456 Brickell Ave, Miami, FL',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah.j@email.com',
      clientPhone: '+1 (555) 987-6543',
      date: '2024-01-16',
      time: '10:00',
      status: 'confirmed',
      notes: 'High-end buyer, looking for luxury amenities and city views',
    },
    {
      id: '3',
      propertyName: 'Garden Villa',
      propertyAddress: '789 Coral Way, Coral Gables, FL',
      clientName: 'Michael Chen',
      clientEmail: 'm.chen@email.com',
      clientPhone: '+1 (555) 456-7890',
      date: '2024-01-17',
      time: '16:00',
      status: 'scheduled',
      notes: 'Family with children, needs good schools nearby',
    },
  ])

  // TODO: Implement real API calls for visits management
  // const { visits, loading, error, createVisit, updateVisit, deleteVisit } = useVisits()

  const filteredVisits = visits.filter(visit => {
    const matchesSearch =
      visit.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      filterStatus === 'all' || visit.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">
            Scheduled Visits
          </h1>
          <p className="text-text-muted">
            Manage property viewings and client appointments.
          </p>
        </div>
        <Button
          onClick={() => setShowAddVisit(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule Visit</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search visits by property, client, or address..."
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
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Visits List */}
      <div className="grid gap-4">
        {filteredVisits.map(visit => (
          <Card key={visit.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              {/* Visit Details */}
              <div className="flex-1 space-y-4">
                {/* Property Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-surface-elev rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text text-lg">
                      {visit.propertyName}
                    </h3>
                    <div className="flex items-center space-x-2 text-text-muted">
                      <MapPin className="h-4 w-4" />
                      <span>{visit.propertyAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-text-muted" />
                    <span className="text-text">{visit.clientName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-text-muted" />
                    <span className="text-text">{visit.clientEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-text-muted" />
                    <span className="text-text">{visit.clientPhone}</span>
                  </div>
                </div>

                {/* Schedule Info */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-text-muted" />
                    <span className="text-text">{formatDate(visit.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-text-muted" />
                    <span className="text-text">{visit.time}</span>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(visit.status)}`}
                  >
                    {getStatusLabel(visit.status)}
                  </span>
                </div>

                {/* Notes */}
                {visit.notes && (
                  <div className="bg-surface-elev p-3 rounded-lg">
                    <p className="text-sm text-text-muted">
                      <strong>Notes:</strong> {visit.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    /* TODO: Edit visit */
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    /* TODO: Confirm visit */
                  }}
                  disabled={
                    visit.status === 'confirmed' || visit.status === 'completed'
                  }
                >
                  Confirm
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    /* TODO: Mark as completed */
                  }}
                  disabled={visit.status === 'completed'}
                >
                  Complete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    /* TODO: Cancel visit */
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredVisits.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Calendar className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text mb-2">
              No visits found
            </h3>
            <p className="text-text-muted mb-4">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by scheduling your first property visit'}
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <Button onClick={() => setShowAddVisit(true)}>
                Schedule Your First Visit
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Add/Edit Visit Modal - TODO: Implement */}
      {showAddVisit && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-text mb-4">
                Schedule Property Visit
              </h2>
              <p className="text-text-muted mb-4">
                This form will be implemented to schedule new property visits.
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddVisit(false)}
                >
                  Cancel
                </Button>
                <Button>Schedule Visit</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
