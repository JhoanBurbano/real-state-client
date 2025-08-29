'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, User, Heart, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useAuthContext } from '@/context/AuthContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Properties', href: '/properties' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Agents', href: '/agents' },
]

const authenticatedNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Properties', href: '/properties' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Agents', href: '/agents' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthContext()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-surface-elev border-b border-line shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MILLION Luxury Real Estate</span>
            <div className="flex items-center space-x-2">
              <span className="font-playfair text-xl font-bold text-accent">
                REAL ESTATE
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {(isAuthenticated ? authenticatedNavigation : navigation).map(
            item => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-colors ${
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-text hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Right side actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost" size="sm" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" aria-label="Favorites">
            <Heart className="h-4 w-4" />
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-x-2">
              <span className="text-sm text-text-muted">
                {user?.fullName || user?.email}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm" aria-label="Login">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          )}

          {/* <ThemeToggle /> */}
          {/* <LanguageToggle /> */}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-surface-elev px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-line">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">MILLION Luxury Real Estate</span>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-on-accent font-bold text-lg">M</span>
                  </div>
                  <span className="font-playfair text-xl font-bold text-text">
                    MILLION
                  </span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-2 divide-y divide-line">
                <div className="space-y-2 py-6">
                  {(isAuthenticated ? authenticatedNavigation : navigation).map(
                    item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors ${
                          isActive(item.href)
                            ? 'text-accent bg-accent/10'
                            : 'text-text hover:text-accent hover:bg-accent/5'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
                <div className="py-6 space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    {/* <ThemeToggle /> */}
                    {/* <LanguageToggle /> */}
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="ghost" size="sm" aria-label="Search">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Favorites">
                      <Heart className="h-4 w-4" />
                    </Button>

                    {isAuthenticated ? (
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-sm text-text-muted text-center">
                          {user?.fullName || user?.email}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            logout()
                            setMobileMenuOpen(false)
                          }}
                          aria-label="Logout"
                        >
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button variant="ghost" size="sm" aria-label="Login">
                          <User className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
