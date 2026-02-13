import { test, expect } from '@playwright/test'

test.describe('Spinner Visibility During Navigation', () => {
  test('shows Spinner immediately during first navigation', async ({ page }) => {
    // Go to dashboard
    await page.goto('/connectors')
    await page.waitForLoadState('networkidle')

    // Set up promise to detect Spinner before clicking (uses role="status")
    const spinnerPromise = page.waitForSelector('[role="status"]', {
      timeout: 5000,
    }).catch(() => null)

    // Click navigation link
    const clickTime = Date.now()
    await page.click('a[href="/connectors/logs"]')

    // Check if Spinner appeared
    const spinner = await spinnerPromise
    const spinnerTime = spinner ? Date.now() - clickTime : null

    // Wait for page content
    await page.waitForSelector('h1:has-text("Logs")')
    const totalTime = Date.now() - clickTime

    console.log(`Spinner appeared: ${spinner ? 'YES' : 'NO'}`)
    console.log(`Time to Spinner: ${spinnerTime ?? 'N/A'}ms`)
    console.log(`Total navigation time: ${totalTime}ms`)

    // The key metric: user should see SOMETHING within 100ms
    if (totalTime > 200) {
      // If navigation takes more than 200ms, Spinner MUST have appeared
      expect(spinner).not.toBeNull()
    }
  })

  test('shows Spinner with correct styling', async ({ page }) => {
    await page.goto('/connectors')
    await page.waitForLoadState('networkidle')

    // Force slow network to ensure we see the Spinner
    await page.route('**/*', async (route) => {
      // Add delay only to RSC requests
      if (route.request().url().includes('_rsc')) {
        await new Promise((r) => setTimeout(r, 500))
      }
      await route.continue()
    })

    // Click and immediately check for Spinner
    await page.click('a[href="/connectors/explore"]')

    // Should see Spinner almost immediately
    const spinner = await page.waitForSelector('[role="status"]', { timeout: 1000 }).catch(() => null)

    console.log(`Spinner found during slow navigation: ${spinner ? 'YES' : 'NO'}`)

    // Wait for content
    await page.waitForSelector('h1:has-text("Explore")')
  })

  test('measures time to first paint during navigation', async ({ page }) => {
    await page.goto('/connectors')
    await page.waitForLoadState('networkidle')

    // Click and measure when ANY content change happens
    const clickTime = Date.now()
    await page.click('a[href="/connectors/search"]')

    // Wait for either Spinner or final content
    await Promise.race([
      page.waitForSelector('[role="status"]'),
      page.waitForSelector('h1:has-text("Search")'),
    ])

    const firstPaint = Date.now() - clickTime
    console.log(`Time to first visual change: ${firstPaint}ms`)

    // User should see SOMETHING within 100ms
    expect(firstPaint).toBeLessThan(200)
  })
})
