import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '@/components/pages/HomePage'
import { axe } from 'jest-axe'

describe('Home a11y', () => {
  it('has no critical violations', async () => {
    const { container } = render(<HomePage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

