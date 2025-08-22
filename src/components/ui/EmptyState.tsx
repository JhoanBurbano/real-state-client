'use client'

import { Button } from './Button'
import { Search, Heart, Home, AlertCircle } from 'lucide-react'

interface EmptyStateProps {
  type: 'noResults' | 'noFavorites' | 'noProperties' | 'error'
  title?: string
  subtitle?: string
  actionText?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  type,
  title,
  subtitle,
  actionText,
  onAction,
  className = '',
}: EmptyStateProps) {
  const getDefaultContent = () => {
    switch (type) {
      case 'noResults':
        return {
          icon: Search,
          title: 'No results found',
          subtitle:
            'Try adjusting your search criteria or filters to find more properties.',
          actionText: 'Clear Filters',
        }
      case 'noFavorites':
        return {
          icon: Heart,
          title: 'No favorites yet',
          subtitle:
            'Start exploring properties and add your favorites to see them here.',
          actionText: 'Explore Properties',
        }
      case 'noProperties':
        return {
          icon: Home,
          title: 'No properties available',
          subtitle:
            'Check back later for new listings or try adjusting your search criteria.',
          actionText: 'Search Again',
        }
      case 'error':
        return {
          icon: AlertCircle,
          title: 'Something went wrong',
          subtitle:
            "We're having trouble loading the content. Please try again later.",
          actionText: 'Try Again',
        }
      default:
        return {
          icon: Search,
          title: 'No items found',
          subtitle: 'Try adjusting your search criteria',
          actionText: 'Search again',
        }
    }
  }

  const { icon: Icon, ...defaultContent } = getDefaultContent()

  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="mx-auto w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-text-muted" />
      </div>

      <h3 className="text-xl font-semibold text-text mb-2">
        {title || defaultContent.title}
      </h3>

      <p className="text-text-muted mb-6 max-w-md mx-auto">
        {subtitle || defaultContent.subtitle}
      </p>

      {(actionText || defaultContent.actionText) && (
        <Button variant="default" onClick={onAction} className="mx-auto">
          {actionText || defaultContent.actionText}
        </Button>
      )}
    </div>
  )
}
