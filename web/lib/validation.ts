import { z } from 'zod'

export const createPropertySchema = z.object({
  price: z.number().min(0),
  address: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(3),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  squareFeet: z.number().min(0).optional().default(0),
  description: z.string().optional().default(''),
  propertyType: z.enum(['penthouse','condo','house','townhouse']),
  images: z.array(z.string().url()).min(1).max(Number(process.env.NEXT_PUBLIC_MAX_GALLERY_IMAGES || 12))
})

