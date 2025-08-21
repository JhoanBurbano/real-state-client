"use client"
import React, { useCallback, useId, useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'

const MAX = Number(process.env.NEXT_PUBLIC_MAX_GALLERY_IMAGES || 12)

export function UploadWidget({ images, setImages }: { images: string[]; setImages: (v: string[]) => void }) {
  const inputId = useId()
  const [busy, setBusy] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)

  const onFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const remaining = MAX - images.length
    const selected = Array.from(files).slice(0, remaining)
    setBusy(true)
    const propertyId = crypto.randomUUID()
    const uploads = await Promise.all(selected.map(async (file, index) => {
      const ac = new AbortController()
      controllerRef.current = ac
      const kind = images.length === 0 && index === 0 ? 'cover' : 'gallery'
      const galleryIndex = images.length + index
      const pseudoPath = kind === 'cover' ? `properties/${propertyId}/cover.${(file.type.split('/')[1]||'jpg')}` : `properties/${propertyId}/${galleryIndex + 1}.${(file.type.split('/')[1]||'jpg')}`
      const res = await upload(pseudoPath, file, {
        access: 'public',
        handleUploadUrl: '/api/blob/upload',
        contentType: file.type,
        multipart: true,
        clientPayload: JSON.stringify({ propertyId, kind, index: galleryIndex + 1 })
      })
      return res.url
    }))
    setImages([...images, ...uploads])
    setBusy(false)
  }, [images, setImages])

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    onFiles(e.dataTransfer.files)
  }

  return (
    <section aria-label="Images" className="border border-line/40 rounded-lg p-4 bg-surface">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') (document.getElementById(inputId) as HTMLInputElement)?.click() }}
        onClick={() => (document.getElementById(inputId) as HTMLInputElement)?.click()}
        onDrop={onDrop}
        onDragOver={(e)=>e.preventDefault()}
        className="rounded-md border-2 border-dashed border-line/40 p-6 text-center cursor-pointer focus:outline-none focus-visible:focus-outline"
        aria-describedby="drop-help"
      >
        <p className="text-text-muted">Drop images here or click to upload (JPEG/PNG/WebP/AVIF). Max {MAX}.</p>
        <input id={inputId} type="file" accept="image/*" multiple className="hidden" onChange={(e)=>onFiles(e.target.files)} />
      </div>
      <p id="drop-help" className="sr-only">Use Space or Enter to open file picker. You can also drag and drop files.</p>
      {busy && <div role="status" aria-live="polite" className="mt-2 text-sm text-text-muted">Uploading…</div>}
      {images.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3" role="list">
          {images.map((src, i) => (
            <li key={i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Uploaded image ${i+1}`} className="w-full aspect-[4/3] object-cover rounded-md" />
              <button type="button" className="absolute top-2 right-2 bg-bg/80 rounded px-2 py-1 text-sm" onClick={()=>setImages(images.filter((_,x)=>x!==i))}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

