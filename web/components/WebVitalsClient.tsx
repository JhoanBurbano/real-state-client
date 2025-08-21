"use client"
import { useEffect } from 'react'
import { initWebVitalsLogger } from '@/lib/web-vitals'

export function WebVitalsClient() {
  useEffect(() => {
    initWebVitalsLogger()
  }, [])
  return null
}

