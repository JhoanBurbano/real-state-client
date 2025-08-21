import { NextRequest } from 'next/server'
import { handleUpload } from '@vercel/blob/client'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = await handleUpload({
    token: process.env.BLOB_READ_WRITE_TOKEN,
    request,
    body,
    onBeforeGenerateToken: async (pathname, clientPayload, _multipart) => {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        throw new Error('BLOB_READ_WRITE_TOKEN not configured')
      }
      // Validate pathname against expected rules using client payload
      const payload = clientPayload ? JSON.parse(clientPayload) as { propertyId: string; kind: 'cover'|'gallery'; index?: number } : undefined
      if (!payload?.propertyId || !payload?.kind) {
        throw new Error('Missing propertyId or kind')
      }
      const isCover = payload.kind === 'cover'
      if (isCover) {
        if (!pathname.startsWith(`properties/${payload.propertyId}/cover.`)) {
          throw new Error('Invalid pathname for cover')
        }
      } else {
        const idx = payload.index ?? 1
        const max = Number(process.env.NEXT_PUBLIC_MAX_GALLERY_IMAGES || 12)
        if (idx < 1 || idx > max) throw new Error('Invalid gallery index')
        if (!pathname.startsWith(`properties/${payload.propertyId}/${idx}.`)) {
          throw new Error('Invalid pathname for gallery')
        }
      }

      return {
        addRandomSuffix: false,
        maximumSizeInBytes: 20 * 1024 * 1024,
        allowedContentTypes: ['image/jpeg','image/png','image/webp','image/avif'],
        tokenPayload: clientPayload ?? null
      }
    },
    onUploadCompleted: async (_payload) => {
      // Optional: log or analytics
    }
  })
  return new Response(JSON.stringify(result), { headers: { 'content-type': 'application/json' } })
}

