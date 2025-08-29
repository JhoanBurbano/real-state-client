'use client'

import React, { useState, useEffect } from 'react'
import {
  Search,
  Star,
  Phone,
  Mail,
  MapPin,
  Award,
  Users,
  TrendingUp,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useAgents } from '@/hooks/useAgents'

export function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')

  const { agents, loading, error, getAgents } = useAgents()

  // Load agents on component mount
  useEffect(() => {
    getAgents()
  }, [getAgents])

  // Mock specialties for now - these should come from the API in the future
  const specialties = [
    'all',
    'Luxury Residential',
    'Investment Properties',
    'International Markets',
    'Commercial Properties',
    'Interior Design',
  ]

  // Filter agents based on search and specialty
  const filteredAgents = agents.filter(agent => {
    const matchesSearch =
      agent.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialty =
      selectedSpecialty === 'all' || agent.role === selectedSpecialty

    return matchesSearch && matchesSpecialty
  })

  // Loading state
  if (loading && agents.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-text mb-4">
            Loading Agents...
          </h1>
          <p className="text-text-muted">
            Please wait while we fetch our team information.
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && agents.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text mb-4">
            Error Loading Agents
          </h1>
          <p className="text-text-muted mb-6">{error}</p>
          <Button onClick={() => getAgents()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-text mb-4">
              Meet Our Expert Agents
            </h1>
            <p className="text-lg text-text-muted max-w-3xl mx-auto">
              Our team of experienced professionals is dedicated to providing
              exceptional service and expertise in luxury real estate.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                type="text"
                placeholder="Search agents by name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Specialty Filter */}
            <div className="flex flex-wrap gap-2">
              {specialties.map(specialty => (
                <Button
                  key={specialty}
                  variant={
                    selectedSpecialty === specialty ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty)}
                  className="capitalize"
                >
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-surface-elev rounded-lg">
            <Users className="h-8 w-8 text-accent mx-auto mb-3" />
            <div className="text-2xl font-bold text-text">{agents.length}</div>
            <div className="text-text-muted">Expert Agents</div>
          </div>
          <div className="text-center p-6 bg-surface-elev rounded-lg">
            <Award className="h-8 w-8 text-accent mx-auto mb-3" />
            <div className="text-2xl font-bold text-text">25+</div>
            <div className="text-text-muted">Years Experience</div>
          </div>
          <div className="text-center p-6 bg-surface-elev rounded-lg">
            <TrendingUp className="h-8 w-8 text-accent mx-auto mb-3" />
            <div className="text-2xl font-bold text-text">690+</div>
            <div className="text-text-muted">Properties Sold</div>
          </div>
          <div className="text-center p-6 bg-surface-elev rounded-lg">
            <Star className="h-8 w-8 text-accent mx-auto mb-3" />
            <div className="text-2xl font-bold text-text">4.9</div>
            <div className="text-text-muted">Average Rating</div>
          </div>
        </div>

        {/* Loading indicator for refresh */}
        {loading && agents.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2 text-accent">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Refreshing agents...</span>
            </div>
          </div>
        )}

        {/* Agents Grid */}
        {!loading && filteredAgents.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map(agent => (
              <div
                key={agent.id}
                className="bg-surface-elev rounded-lg overflow-hidden shadow-sm hover:shadow-luxury-md transition-all duration-300"
              >
                {/* Agent Header */}
                <div className="relative">
                  <img
                    src={
                      agent.photoUrl || 'https://picsum.photos/400/400?random=1'
                    }
                    alt={agent.fullName || 'Agent'}
                    className="w-full h-64 object-cover object-top"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-text"
                    >
                      <Star className="h-3 w-3 text-accent mr-1" />
                      {agent.role || 'Agent'}
                    </Badge>
                  </div>
                </div>

                {/* Agent Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-text mb-1">
                      {agent.fullName || 'Agent Name'}
                    </h3>
                    <p className="text-accent font-medium mb-2">
                      {agent.role || 'Real Estate Agent'}
                    </p>
                    <p className="text-text-muted text-sm mb-3">
                      Professional real estate agent with expertise in luxury
                      properties.
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {agent?.specialties
                        ?.slice(0, 2)
                        .map((specialty: string) => (
                          <Badge
                            key={specialty}
                            variant="outline"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      {agent?.specialties?.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{agent?.specialties?.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <div className="text-text-muted">Experience</div>
                      <div className="font-semibold text-text">
                        {agent.experience || Math.floor(Math.random() * 10)}{' '}
                        years
                      </div>
                    </div>
                    <div>
                      <div className="text-text-muted">Properties Sold</div>
                      <div className="font-semibold text-text">
                        {agent.propertiesSold ||
                          Math.floor(Math.random() * 100)}
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center text-text-muted">
                      <Mail className="h-4 w-4 mr-2" />
                      {agent.email || 'email@example.com'}
                    </div>
                    {agent.phoneE164 && (
                      <div className="flex items-center text-text-muted">
                        <Phone className="h-4 w-4 mr-2" />
                        {agent.phoneE164}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 hidden">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {!loading && filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-text mb-4">
              No agents found
            </h3>
            <p className="text-text-muted mb-6">
              Try adjusting your search criteria or contact us directly for
              assistance.
            </p>
            <Button size="lg">Contact Us</Button>
          </div>
        )}

        {/* Join Our Team CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-12">
          <h2 className="font-playfair text-3xl font-bold text-text mb-4">
            Join Our Elite Team
          </h2>
          <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
            Are you a passionate real estate professional looking to join the
            premier luxury real estate company? We're always looking for
            exceptional talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold">
              View Open Positions
            </Button>
            <Button variant="outline" size="lg" className="font-semibold">
              Submit Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
