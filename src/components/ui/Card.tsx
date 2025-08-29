import React from 'react'
import { cn } from '@/lib/utils/api-utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-line shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
