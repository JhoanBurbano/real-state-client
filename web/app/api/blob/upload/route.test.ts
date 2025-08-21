import { describe, it, expect } from 'vitest'

describe('blob upload route config', () => {
  it('has NEXT_PUBLIC_MAX_GALLERY_IMAGES default', () => {
    expect(Number(process.env.NEXT_PUBLIC_MAX_GALLERY_IMAGES || 12)).toBeGreaterThan(0)
  })
})

