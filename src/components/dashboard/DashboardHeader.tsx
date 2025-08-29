'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Home,
  Building2,
  Calendar,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuthContext } from '@/context/AuthContext'

interface DashboardHeaderProps {
  user: any
  onLogout: () => void
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { isAuthenticated } = useAuthContext()

  return (
    <header className="bg-white border-b border-line shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-accent">MILLION</h1>
                <p className="text-xs text-text-muted -mt-1">
                  Real Estate Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-text hover:text-accent transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/properties"
              className="flex items-center space-x-2 text-text hover:text-accent transition-colors"
            >
              <Building2 className="h-4 w-4" />
              <span>Properties</span>
            </Link>
            <Link
              href="/agents"
              className="flex items-center space-x-2 text-text hover:text-accent transition-colors"
            >
              <MapPin className="h-4 w-4" />
              <span>Agents</span>
            </Link>
          </div>

          {/* Right side - User menu and notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2"
              onClick={() => {
                /* TODO: Open notifications */
              }}
            >
              <Bell className="h-5 w-5 text-text-muted" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => {
                /* TODO: Open settings */
              }}
            >
              <Settings className="h-5 w-5 text-text-muted" />
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 p-2"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-text">
                    {user?.fullName || user?.email || 'Agent'}
                  </p>
                  <p className="text-xs text-text-muted">
                    {user?.role || 'Real Estate Agent'}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-text-muted" />
              </Button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-line">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-surface-elev"
                    onClick={() => {
                      setShowUserMenu(false)
                      // TODO: Navigate to profile
                    }}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-surface-elev"
                    onClick={() => {
                      setShowUserMenu(false)
                      // TODO: Navigate to settings
                    }}
                  >
                    <Settings className="h-4 w-4 inline mr-2" />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setShowUserMenu(false)
                      onLogout()
                    }}
                  >
                    <LogOut className="h-4 w-4 inline mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
