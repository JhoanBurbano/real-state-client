'use client'

import { useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardHeader } from './DashboardHeader'
import { PropertiesManagement } from './PropertiesManagement'
import { ScheduledVisits } from './ScheduledVisits'
import { AgentProfile } from './AgentProfile'
import { DashboardStats } from './DashboardStats'

type DashboardTab = 'overview' | 'properties' | 'visits' | 'profile'

export function AgentDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview')
  const { user, logout } = useAuthContext()

  const handleLogout = async () => {
    try {
      await logout()
      // Router will handle redirect in useEffect
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardStats />
      case 'properties':
        return <PropertiesManagement />
      case 'visits':
        return <ScheduledVisits />
      case 'profile':
        return <AgentProfile />
      default:
        return <DashboardStats />
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <DashboardHeader user={user} onLogout={handleLogout} />

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
        </main>
      </div>
    </div>
  )
}
