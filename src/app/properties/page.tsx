import { Suspense } from 'react'
import { PropertyCardSkeleton } from '@/components/ui/PropertySkeleton'
import { PropertiesPage } from '@/components/pages/PropertiesPage'

export default function PropertiesPageRoute() {
  return (
    <Suspense fallback={<PropertyCardSkeleton />}>
      <PropertiesPage />
    </Suspense>
  )
}
