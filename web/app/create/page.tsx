"use client"
import { useState } from 'react'
import { createProperty } from '@/lib/api/client'
import { UploadWidget } from '@/components/modules/UploadWidget'
import { toast } from 'sonner'

export default function CreatePage() {
  const [images, setImages] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZip] = useState('')
  const [description, setDescription] = useState('')
  const [squareFeet, setSqft] = useState<number>(0)
  const [bedrooms, setBeds] = useState<number>(1)
  const [bathrooms, setBaths] = useState<number>(1)
  const [propertyType, setType] = useState<'penthouse'|'condo'|'house'|'townhouse'>('house')

  const disabled = !price || !address || !city || !state || !zipCode || images.length === 0

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await createProperty({
        price, address, city, state, zipCode, bedrooms, bathrooms, squareFeet,
        description, propertyType, images
      })
      toast.success('Property created')
    } catch (err: any) {
      toast.error(err?.title || 'Failed to create property')
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-h3 font-brand mb-6">Create Property</h1>
      <form onSubmit={onSubmit} className="space-y-4" aria-describedby="form-help">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm text-text-muted mb-1">Price</span>
            <input type="number" className="w-full rounded-md border border-line/40 px-3 py-2" value={price || ''} onChange={e=>setPrice(Number(e.target.value))} required />
          </label>
          <label className="block">
            <span className="block text-sm text-text-muted mb-1">Square Feet</span>
            <input type="number" className="w-full rounded-md border border-line/40 px-3 py-2" value={squareFeet || ''} onChange={e=>setSqft(Number(e.target.value))} />
          </label>
          <label className="block md:col-span-2">
            <span className="block text-sm text-text-muted mb-1">Address</span>
            <input className="w-full rounded-md border border-line/40 px-3 py-2" value={address} onChange={e=>setAddress(e.target.value)} required />
          </label>
          <label className="block">
            <span className="block text-sm text-text-muted mb-1">City</span>
            <input className="w-full rounded-md border border-line/40 px-3 py-2" value={city} onChange={e=>setCity(e.target.value)} required />
          </label>
          <label className="block">
            <span className="block text-sm text-text-muted mb-1">State</span>
            <input className="w-full rounded-md border border-line/40 px-3 py-2" value={state} onChange={e=>setState(e.target.value)} required />
          </label>
          <label className="block">
            <span className="block text-sm text-text-muted mb-1">Zip Code</span>
            <input className="w-full rounded-md border border-line/40 px-3 py-2" value={zipCode} onChange={e=>setZip(e.target.value)} required />
          </label>
          <label className="block">
            <span className="block text-sm text-text-muted mb-1">Bedrooms</span>
            <input type="number" className="w-full rounded-md border border-line/40 px-3 py-2" value={bedrooms || ''} onChange={e=>setBeds(Number(e.target.value))} min={0} />
          </label>
          <label className="block">
            <span className="block text-sm text-text-muted mb-1">Bathrooms</span>
            <input type="number" className="w-full rounded-md border border-line/40 px-3 py-2" value={bathrooms || ''} onChange={e=>setBaths(Number(e.target.value))} min={0} />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm text-text-muted mb-1">Description</span>
          <textarea className="w-full rounded-md border border-line/40 px-3 py-2" rows={4} value={description} onChange={e=>setDescription(e.target.value)} />
        </label>
        <UploadWidget images={images} setImages={setImages} />
        <button type="submit" className="px-4 py-2 rounded-md bg-accent text-on-accent disabled:opacity-50" disabled={disabled}>Create</button>
      </form>
      <p id="form-help" className="sr-only">All fields are required unless marked optional. Upload at least one image.</p>
    </main>
  )
}

