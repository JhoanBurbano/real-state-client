'use client'

import { useState } from 'react'
import { Building2 } from 'lucide-react'
import type { Property } from '@/types'

interface PropertyImageProps {
  property: Property
  className?: string
  fallbackIcon?: boolean
  alt?: string
}

export function PropertyImage({
  property,
  className = 'w-full h-full object-cover',
  fallbackIcon = true,
  alt,
}: PropertyImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const imageUrl =
    property.coverUrl ||
    (property.media && property.media.length > 0 ? property.media[0].url : null)

  const imageAlt = alt || property.name

  if (!imageUrl || imageError) {
    return (
      <div className="w-full h-full bg-surface-elev flex items-center justify-center">
        {fallbackIcon && (
          <div className="text-center">
            <Building2 className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-xs text-text-muted">No image</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={imageAlt}
      className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageError(true)}
    />
  )
}
