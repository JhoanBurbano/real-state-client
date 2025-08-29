import { Suspense } from 'react'
import { PropertyDetailPage } from '@/components/pages/PropertyDetailPage'
import { PropertyCardSkeleton } from '@/components/ui/PropertySkeleton'

interface PropertyDetailPageProps {
  params: {
    id: string
  }
}

export default async function PropertyDetailPageRoute({
  params,
}: PropertyDetailPageProps) {
  const { id } = await params

  return (
    <Suspense fallback={<PropertyCardSkeleton />}>
      <PropertyDetailPage propertyId={id} />
    </Suspense>
  )
}
