import { fetchProperty } from '@/lib/api/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export default async function PropertyPage({ params }: { params: { id: string } }) {
  let data: Awaited<ReturnType<typeof fetchProperty>> | null = null
  try {
    data = await fetchProperty(params.id)
  } catch {
    notFound()
  }
  const p = data!.data
  const cover = p.images[0]
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p.price)
  const location = `${p.address}, ${p.city}, ${p.state}`
  return (
    <main className="min-h-screen">
      <section className="relative w-full aspect-[16/9]">
        {!!cover && (
          <Image src={cover} alt={`Cover image for ${location}`} fill className="object-cover" sizes="100vw" priority />
        )}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-black/60 to-black/0 text-white">
          <h1 className="text-h2 font-brand">{price}</h1>
          <p className="text-lg opacity-90">{location}</p>
        </div>
      </section>
      <section className="px-4 md:px-8 lg:px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-h4 font-brand mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {p.images.slice(0, 12).map((src, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={src} alt={`Gallery image ${i + 1} for ${location}`} fill className="object-cover" sizes="(max-width: 1024px) 33vw, 20vw" />
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="p-6 rounded-xl border border-line/30 bg-surface-elev">
            <h2 className="text-h5 font-brand mb-2">About this property</h2>
            <p className="text-text-muted leading-relaxed">{p.description}</p>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Residence',
                name: location,
                address: location,
                offers: { '@type': 'Offer', price: p.price, priceCurrency: 'USD' },
                image: p.images
              } as Record<string, unknown>) }}
            />
          </div>
        </aside>
      </section>
    </main>
  )
}

