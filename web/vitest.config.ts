import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/a11y/setup.ts'],
    globals: true,
    include: ['tests/**/*.test.tsx']
  }
})

