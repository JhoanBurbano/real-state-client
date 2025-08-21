"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/lib/api/client'

export function PropertyCard({ property }: { property: Property }) {
  const cover = property.images[0]
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property.price)
  const location = `${property.address}, ${property.city}, ${property.state}`
  return (
    <article className="group relative bg-surface-elev rounded-2xl overflow-hidden border border-line/30 transition-all shadow-luxury-md hover:shadow-luxury-lg" aria-label={`Property at ${location}`}>
      <div className="relative aspect-[4/3]">
        {!!cover && (
          <Image src={cover} alt={`Cover image for ${location}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover" priority={false} />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-h4 font-brand text-text">{price}</h3>
        <p className="text-text-muted">{location}</p>
        <div className="mt-4">
          <Link href={`/property/${property.id}`} className="inline-flex items-center text-accent underline-offset-4 hover:underline focus:outline-none focus-visible:focus-outline">View details</Link>
        </div>
      </div>
    </article>
  )
}

