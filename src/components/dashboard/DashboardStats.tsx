'use client'

import { useState, useEffect } from 'react'
import {
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  MapPin,
  Eye,
  Star,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { useProperties } from '@/hooks/useProperties'
import { useAgents } from '@/hooks/useAgents'
import { millionAPI } from '@/lib/api/million-api'

export function DashboardStats() {
  const { properties, loading: propertiesLoading } = useProperties()
  const { agents, loading: agentsLoading } = useAgents()
  const [stats, setStats] = useState([
    {
      title: 'Total Properties',
      value: '0',
      change: '+0%',
      changeType: 'positive',
      icon: Building2,
      description: 'Active listings',
    },
    {
      title: 'Active Properties',
      value: '0',
      change: '+0',
      changeType: 'positive',
      icon: Calendar,
      description: 'This week',
    },
    {
      title: 'Active Agents',
      value: '0',
      change: '+0',
      changeType: 'positive',
      icon: Users,
      description: 'Total agents',
    },
    {
      title: 'Total Views',
      value: '0',
      change: '+0%',
      changeType: 'positive',
      icon: Eye,
      description: 'Property views',
    },
  ])

  useEffect(() => {
    const updateStats = () => {
      const activeProperties = properties.filter(
        p => p.status === 'Active'
      ).length
      const totalProperties = properties.length
      const totalAgents = agents.length

      setStats([
        {
          title: 'Total Properties',
          value: totalProperties.toString(),
          change: totalProperties > 0 ? `+${totalProperties}` : '0',
          changeType: 'positive',
          icon: Building2,
          description: 'Active listings',
        },
        {
          title: 'Active Properties',
          value: activeProperties.toString(),
          change: activeProperties > 0 ? `+${activeProperties}` : '0',
          changeType: 'positive',
          icon: Calendar,
          description: 'This week',
        },
        {
          title: 'Active Agents',
          value: totalAgents.toString(),
          change: totalAgents > 0 ? `+${totalAgents}` : '0',
          changeType: 'positive',
          icon: Users,
          description: 'Total agents',
        },
        {
          title: 'Total Views',
          value: (totalProperties * 50).toString(), // Mock calculation
          change: totalProperties > 0 ? '+15%' : '0%',
          changeType: 'positive',
          icon: Eye,
          description: 'Property views',
        },
      ])
    }

    if (!propertiesLoading && !agentsLoading) {
      updateStats()
    }
  }, [properties, agents, propertiesLoading, agentsLoading])

  const recentActivities = [
    {
      type: 'property_added',
      message: 'New property "Luxury Villa Miami Beach" added',
      time: '2 hours ago',
      icon: Building2,
    },
    {
      type: 'visit_scheduled',
      message: 'Visit scheduled for "Oceanfront Condo" tomorrow',
      time: '4 hours ago',
      icon: Calendar,
    },
    {
      type: 'inquiry_received',
      message: 'New inquiry for "Downtown Penthouse"',
      time: '6 hours ago',
      icon: Users,
    },
    {
      type: 'property_sold',
      message: 'Property "Garden Villa" sold for $2.1M',
      time: '1 day ago',
      icon: DollarSign,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-text mb-2">
          Welcome back, Agent!
        </h1>
        <p className="text-text-muted">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-muted">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-text">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.description}</p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    stat.changeType === 'positive'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <TrendingUp
                  className={`h-4 w-4 ml-1 ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-surface-elev rounded-full flex items-center justify-center">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text">{activity.message}</p>
                    <p className="text-xs text-text-muted">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-line hover:bg-surface-elev transition-colors">
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-text">Add New Property</p>
                  <p className="text-sm text-text-muted">
                    Create a new listing
                  </p>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 rounded-lg border border-line hover:bg-surface-elev transition-colors">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-text">Schedule Visit</p>
                  <p className="text-sm text-text-muted">
                    Book a property viewing
                  </p>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 rounded-lg border border-line hover:bg-surface-elev transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-text">View Inquiries</p>
                  <p className="text-sm text-text-muted">Check new leads</p>
                </div>
              </div>
            </button>
          </div>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text mb-4">
          Performance Overview
        </h3>
        <div className="h-64 bg-surface-elev rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-accent mx-auto mb-2" />
            <p className="text-text-muted">
              Performance chart will be displayed here
            </p>
            <p className="text-sm text-text-muted">
              Monthly revenue and property views
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
