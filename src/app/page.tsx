import { Suspense } from 'react'
import { HomePage } from '@/components/pages/HomePage'
import { PropertyCardSkeleton } from '@/components/ui/PropertySkeleton'

export default function Home() {
  return (
    <Suspense fallback={<PropertyCardSkeleton />}>
      <HomePage />
    </Suspense>
  )
}
