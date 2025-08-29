'use client'

import {
  Home,
  Building2,
  Calendar,
  User,
  BarChart3,
  FileText,
  Users,
  MapPin,
} from 'lucide-react'
import { useProperties } from '@/hooks/useProperties'
import { useAgents } from '@/hooks/useAgents'

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardSidebar({
  activeTab,
  onTabChange,
}: DashboardSidebarProps) {
  const { properties } = useProperties()
  const { agents } = useAgents()

  const navigationItems = [
    {
      id: 'overview',
      name: 'Overview',
      icon: Home,
      description: 'Dashboard overview and statistics',
    },
    {
      id: 'properties',
      name: 'Properties',
      icon: Building2,
      description: 'Manage your property listings',
    },
    {
      id: 'visits',
      name: 'Scheduled Visits',
      icon: Calendar,
      description: 'View and manage property visits',
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: User,
      description: 'Your agent profile and settings',
    },
  ]

  return (
    <aside className="w-64 bg-white border-r border-line min-h-screen">
      <div className="p-6">
        {/* Navigation Items */}
        <nav className="space-y-2">
          {navigationItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-accent text-white shadow-md'
                    : 'text-text-muted hover:bg-surface-elev hover:text-text'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? 'text-white' : 'text-text-muted'}`}
                />
                <div>
                  <div
                    className={`font-medium ${isActive ? 'text-white' : 'text-text'}`}
                  >
                    {item.name}
                  </div>
                  <div
                    className={`text-xs ${isActive ? 'text-white/80' : 'text-text-muted'}`}
                  >
                    {item.description}
                  </div>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 pt-6 border-t border-line">
          <h3 className="text-sm font-medium text-text-muted mb-3">
            Quick Stats
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Active Listings</span>
              <span className="font-medium text-text">
                {properties?.filter(p => p.status === 'Active').length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Total Properties</span>
              <span className="font-medium text-text">
                {properties?.length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Active Agents</span>
              <span className="font-medium text-accent">
                {agents?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 pt-4 border-t border-line">
          <div className="text-center">
            <p className="text-xs text-text-muted mb-2">Need help?</p>
            <button className="text-xs text-accent hover:text-accent/80 underline">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
