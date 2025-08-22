import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display hero section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(
      page.getByPlaceholder('Search by location, property type, or price range'),
    ).toBeVisible()
  })

  test('should show featured properties', async ({ page }) => {
    // Wait for properties to load
    await page.waitForSelector('[data-testid="property-card"]', { timeout: 10000 })

    const propertyCards = page.locator('[data-testid="property-card"]')
    await expect(propertyCards).toHaveCount(6)
  })

  test('should filter properties by search', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search by location, property type, or price range')
    await searchInput.fill('Beverly Hills')
    await searchInput.press('Enter')

    // Should show filtered results
    await expect(page.getByText('Search Results')).toBeVisible()
  })

  test('should toggle filters panel', async ({ page }) => {
    const filterButton = page.getByRole('button', { name: /filter/i })
    await filterButton.click()

    // Filters should be visible
    await expect(page.getByText('Price Range')).toBeVisible()
    await expect(page.getByText('Bedrooms')).toBeVisible()
    await expect(page.getByText('Bathrooms')).toBeVisible()
    await expect(page.getByText('Property Type')).toBeVisible()
  })

  test('should display stats section', async ({ page }) => {
    await expect(page.getByText('Properties')).toBeVisible()
    await expect(page.getByText('Happy Clients')).toBeVisible()
    await expect(page.getByText('Years Experience')).toBeVisible()
  })

  test('should handle empty search results', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search by location, property type, or price range')
    await searchInput.fill('NonExistentLocation12345')
    await searchInput.press('Enter')

    // Should show no results message
    await expect(page.getByText('No Properties Found')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Hero section should be properly sized
    const heroSection = page.locator('section').first()
    await expect(heroSection).toBeVisible()

    // Search form should stack vertically on mobile
    const searchForm = page.locator('form').first()
    await expect(searchForm).toBeVisible()
  })
})

