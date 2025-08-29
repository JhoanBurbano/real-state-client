import { useState, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import type {
  Notification,
  NotificationPreference,
  ListResponse,
} from '@/types'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [preferences, setPreferences] = useState<NotificationPreference | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get notifications with filters
  const getNotifications = useCallback(
    async (filters?: {
      page?: number
      pageSize?: number
      type?: string
      category?: string
      isRead?: boolean
    }) => {
      setLoading(true)
      setError(null)

      try {
        const response: ListResponse<Notification> =
          await millionAPI.getNotifications(filters)
        setNotifications(response.items)
        return response
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch notifications'
        )
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    setError(null)

    try {
      await millionAPI.markNotificationAsRead(notificationId)
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to mark notification as read'
      )
    }
  }, [])

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    setError(null)

    try {
      await millionAPI.markAllNotificationsAsRead()
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to mark all notifications as read'
      )
    }
  }, [])

  // Get notification preferences
  const getPreferences = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const prefs = await millionAPI.getNotificationPreferences()
      setPreferences(prefs)
      return prefs
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch notification preferences'
      )
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Update notification preferences
  const updatePreferences = useCallback(
    async (newPreferences: Partial<NotificationPreference>) => {
      setError(null)

      try {
        const updatedPrefs =
          await millionAPI.updateNotificationPreferences(newPreferences)
        setPreferences(updatedPrefs)
        return updatedPrefs
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to update notification preferences'
        )
        return null
      }
    },
    []
  )

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Get unread count
  const unreadCount = notifications.filter(n => !n.isRead).length

  // Get notifications by category
  const getNotificationsByCategory = useCallback(
    (category: string) => {
      return notifications.filter(n => n.category === category)
    },
    [notifications]
  )

  // Get notifications by type
  const getNotificationsByType = useCallback(
    (type: string) => {
      return notifications.filter(n => n.type === type)
    },
    [notifications]
  )

  // Get urgent notifications
  const urgentNotifications = notifications.filter(n => n.priority === 'urgent')

  // Get high priority notifications
  const highPriorityNotifications = notifications.filter(
    n => n.priority === 'high'
  )

  return {
    notifications,
    preferences,
    loading,
    error,
    unreadCount,
    urgentNotifications,
    highPriorityNotifications,
    getNotifications,
    markAsRead,
    markAllAsRead,
    getPreferences,
    updatePreferences,
    getNotificationsByCategory,
    getNotificationsByType,
    clearError,
  }
}

// Hook for single notification management
export function useNotification(notificationId: string) {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load notification data
  const loadNotification = useCallback(async () => {
    if (!notificationId) return

    setLoading(true)
    setError(null)

    try {
      // Note: This would need a backend endpoint to get single notification
      // For now, we'll just return null
      setNotification(null)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load notification'
      )
    } finally {
      setLoading(false)
    }
  }, [notificationId])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    notification,
    loading,
    error,
    loadNotification,
    clearError,
  }
}

