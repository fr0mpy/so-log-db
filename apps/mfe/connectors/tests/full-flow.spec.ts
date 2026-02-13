import { test, expect } from '@playwright/test'

test.describe('Complete Navigation Flow', () => {
  test('full user journey through all pages', async ({ page }) => {
    console.log('=== COMPLETE NAVIGATION FLOW TEST ===\n')

    // 1. COLD START: First visit to dashboard
    console.log('1. Cold start - Dashboard')
    let start = Date.now()
    await page.goto('/connectors')
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 })
    let time = Date.now() - start
    console.log(`   Initial load: ${time}ms`)

    // Check page content
    const dashboardTitle = await page.textContent('h1')
    expect(dashboardTitle).toContain('Dashboard')

    // 2. Navigate to Logs
    console.log('\n2. Navigate Dashboard → Logs')
    start = Date.now()
    await page.click('a[href="/connectors/logs"]')
    await page.waitForSelector('h1:has-text("Logs")', { timeout: 30000 })
    time = Date.now() - start
    console.log(`   Navigation time: ${time}ms`)

    // 3. Navigate to Search
    console.log('\n3. Navigate Logs → Search')
    start = Date.now()
    await page.click('a[href="/connectors/search"]')
    await page.waitForSelector('h1:has-text("Search")', { timeout: 30000 })
    time = Date.now() - start
    console.log(`   Navigation time: ${time}ms`)

    // 4. Navigate to Explore
    console.log('\n4. Navigate Search → Explore')
    start = Date.now()
    await page.click('a[href="/connectors/explore"]')
    await page.waitForSelector('h1:has-text("Explore")', { timeout: 30000 })
    time = Date.now() - start
    console.log(`   Navigation time: ${time}ms`)

    // 5. Navigate back to Dashboard
    console.log('\n5. Navigate Explore → Dashboard')
    start = Date.now()
    await page.click('a[href="/connectors"]')
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 })
    time = Date.now() - start
    console.log(`   Navigation time: ${time}ms`)

    // 6. Second round - should be faster (cached)
    console.log('\n6. Second round (cached) - Dashboard → Logs')
    start = Date.now()
    await page.click('a[href="/connectors/logs"]')
    await page.waitForSelector('h1:has-text("Logs")')
    time = Date.now() - start
    console.log(`   Navigation time: ${time}ms`)
    expect(time).toBeLessThan(300) // Should be fast after cache

    console.log('\n7. Cached - Logs → Search')
    start = Date.now()
    await page.click('a[href="/connectors/search"]')
    await page.waitForSelector('h1:has-text("Search")')
    time = Date.now() - start
    console.log(`   Navigation time: ${time}ms`)
    expect(time).toBeLessThan(300)

    console.log('\n8. Cached - Search → Explore')
    start = Date.now()
    await page.click('a[href="/connectors/explore"]')
    await page.waitForSelector('h1:has-text("Explore")')
    time = Date.now() - start
    console.log(`   Navigation time: ${time}ms`)
    expect(time).toBeLessThan(300)

    console.log('\n=== FLOW TEST COMPLETE ===')
  })

  test('check spinner visibility during slow navigation', async ({ page }) => {
    console.log('=== SPINNER VISIBILITY TEST ===\n')

    // Go to dashboard first
    await page.goto('/connectors')
    await page.waitForSelector('h1:has-text("Dashboard")')

    // Intercept RSC requests to add delay
    await page.route('**/_rsc*', async (route) => {
      await new Promise((r) => setTimeout(r, 500)) // 500ms delay
      await route.continue()
    })

    console.log('Added 500ms delay to RSC requests')

    // Try to detect spinner during navigation
    const spinnerDetected = page.waitForSelector('[role="status"]', { timeout: 2000 })
      .then(() => true)
      .catch(() => false)

    // Navigate
    await page.click('a[href="/connectors/logs"]')

    const hasSpinner = await spinnerDetected

    console.log(`Spinner appeared: ${hasSpinner ? 'YES' : 'NO'}`)

    // Wait for page
    await page.waitForSelector('h1:has-text("Logs")', { timeout: 10000 })
    console.log('Page loaded successfully')

    console.log('\n=== SPINNER TEST COMPLETE ===')
  })
})
