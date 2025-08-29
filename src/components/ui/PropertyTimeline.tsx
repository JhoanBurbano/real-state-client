import { Calendar, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import type { PropertyTrace } from '@/types'

interface PropertyTimelineProps {
  traces: PropertyTrace[]
  loading: boolean
  error: string | null
}

export function PropertyTimeline({
  traces,
  loading,
  error,
}: PropertyTimelineProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getActionIcon = (action: PropertyTrace['action']) => {
    switch (action) {
      case 'Created':
        return '🏠'
      case 'Updated':
        return '✏️'
      case 'Sold':
        return '💰'
      case 'Rented':
        return '🔑'
      case 'PriceChanged':
        return '💵'
      case 'StatusChanged':
        return '🔄'
      case 'MediaUpdated':
        return '📸'
      case 'Activated':
        return '✅'
      case 'Deactivated':
        return '⏸️'
      default:
        return '📋'
    }
  }

  const getActionDisplayName = (action: PropertyTrace['action']) => {
    switch (action) {
      case 'Created':
        return 'Property Created'
      case 'Updated':
        return 'Property Updated'
      case 'Sold':
        return 'Property Sold'
      case 'Rented':
        return 'Property Rented'
      case 'PriceChanged':
        return 'Price Changed'
      case 'StatusChanged':
        return 'Status Changed'
      case 'MediaUpdated':
        return 'Media Updated'
      case 'Activated':
        return 'Property Activated'
      case 'Deactivated':
        return 'Property Deactivated'
      default:
        return action
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
          <span className="text-text-muted">Loading property timeline...</span>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <span>Error loading timeline: {error}</span>
        </div>
      </div>
    )
  }

  // Empty state
  if (!traces || traces.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-text-muted mb-4">
          <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-text mb-2">
            No Timeline Available
          </h3>
          <p className="text-text-muted">
            This property doesn't have any activity history yet.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-line"></div>

      <div className="space-y-6">
        {traces.map((trace, index) => (
          <div key={trace.id} className="relative flex items-start space-x-4">
            {/* Timeline Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {getActionIcon(trace.action)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-surface-elev rounded-lg p-4 border border-line">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-text">
                    {trace.actionDisplayName ||
                      getActionDisplayName(trace.action)}
                  </h4>
                  <div className="flex items-center text-sm text-text-muted">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(trace.timestamp)}
                  </div>
                </div>
                <p className="text-text-muted">
                  {trace.changeDescription ||
                    trace.notes ||
                    `Property ${trace.action.toLowerCase()}`}
                </p>
                {trace.price && (
                  <div className="mt-2 text-sm text-accent font-medium">
                    Price: ${trace.price.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Current Status Indicator */}
      {traces.length > 0 && (
        <div className="mt-8 p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-accent" />
            <div>
              <h4 className="font-semibold text-text">Latest Activity</h4>
              <p className="text-text-muted">
                {traces[0].changeDescription ||
                  `Property was last ${traces[0].action.toLowerCase()} on ${formatDate(traces[0].timestamp)}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
