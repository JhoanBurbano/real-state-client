import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
}

export function ImageWithFallback({
  fallbackSrc = ERROR_IMG_SRC,
  ...props
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${
          props.className ?? ''
        }`}
        style={props.style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <Image
            {...props}
            src={fallbackSrc}
            alt="Error loading image"
            onError={() => {}} // Prevent infinite error loop
            data-original-url={props.src}
          />
        </div>
      </div>
    )
  }

  return <Image {...props} onError={handleError} />
}
