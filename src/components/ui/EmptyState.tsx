'use client'

import { Search, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  type?: 'loading' | 'no-results' | 'error' | 'no-data'
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  showAction?: boolean
}

export function EmptyState({
  type = 'no-data',
  title,
  description,
  actionLabel,
  onAction,
  showAction = true,
}: EmptyStateProps) {
  const getDefaultContent = () => {
    switch (type) {
      case 'loading':
        return {
          icon: Loader2,
          title: 'Loading Properties...',
          description:
            'Please wait while we fetch the latest properties for you.',
          className: 'text-accent',
        }
      case 'no-results':
        return {
          icon: Search,
          title: 'No Properties Found',
          description:
            'Try adjusting your search criteria or filters to find more properties.',
          className: 'text-accent',
        }
      case 'error':
        return {
          icon: AlertCircle,
          title: 'Something Went Wrong',
          description:
            'We encountered an error while loading properties. Please try again.',
          className: 'text-red-500',
        }
      case 'no-data':
      default:
        return {
          icon: Search,
          title: 'No Properties Available',
          description:
            'There are currently no properties listed. Check back later for new listings.',
          className: 'text-accent',
        }
    }
  }

  const content = getDefaultContent()
  const IconComponent = content.icon

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className={`${content.className} mb-4`}>
        <IconComponent className="h-16 w-16 mx-auto" />
      </div>

      <h3 className="text-xl font-semibold text-text mb-2">
        {title || content.title}
      </h3>

      <p className="text-text-muted max-w-md mb-6">
        {description || content.description}
      </p>

      {showAction && actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}

      {type === 'loading' && (
        <div className="mt-4">
          <Loader2 className="h-6 w-6 animate-spin text-accent mx-auto" />
        </div>
      )}
    </div>
  )
}
