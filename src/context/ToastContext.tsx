'use client'

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { Toast, ToastType } from '@/components/ui/Toast'
import { AnimatePresence } from 'framer-motion'

interface ToastContextType {
  showToast: (
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
}

interface ToastItem {
  id: string
  type: ToastType
  title: string
  message?: string
  duration: number
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (
      type: ToastType,
      title: string,
      message?: string,
      duration: number = 5000
    ) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      setToasts(prev => [...prev, { id, type, title, message, duration }])
    },
    []
  )

  const showSuccess = useCallback(
    (title: string, message?: string) => {
      showToast('success', title, message)
    },
    [showToast]
  )

  const showError = useCallback(
    (title: string, message?: string) => {
      showToast('error', title, message)
    },
    [showToast]
  )

  const showWarning = useCallback(
    (title: string, message?: string) => {
      showToast('warning', title, message)
    },
    [showToast]
  )

  const showInfo = useCallback(
    (title: string, message?: string) => {
      showToast('info', title, message)
    },
    [showToast]
  )

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              id={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              duration={toast.duration}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
