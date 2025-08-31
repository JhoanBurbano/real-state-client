'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

const toastVariants = {
  initial: {
    opacity: 0,
    y: -50,
    scale: 0.8,
    x: '100%',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.8,
    x: '100%',
  },
}

const toastIcons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
}

const toastColors = {
  success: 'border-green-200 bg-green-50 text-green-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
}

export function Toast({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }}
      className={`relative flex items-start space-x-3 p-4 border rounded-lg shadow-lg max-w-sm ${toastColors[type]}`}
    >
      <div className="flex-shrink-0 mt-0.5">{toastIcons[type]}</div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {message && <p className="text-sm opacity-90 mt-1">{message}</p>}
      </div>

      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/10 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}
