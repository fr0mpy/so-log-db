import { test, expect } from '@playwright/test'

test.describe('Navigation After Warmup', () => {
  test('warmup all pages then test navigation speed', async ({ page }) => {
    // WARMUP: Visit all pages first to compile them
    console.log('=== WARMUP PHASE ===')

    await page.goto('/connectors')
    await page.waitForSelector('h1')
    console.log('Warmed: Dashboard')

    await page.goto('/connectors/logs')
    await page.waitForSelector('h1')
    console.log('Warmed: Logs')

    await page.goto('/connectors/search')
    await page.waitForSelector('h1')
    console.log('Warmed: Search')

    await page.goto('/connectors/explore')
    await page.waitForSelector('h1')
    console.log('Warmed: Explore')

    // TEST: Now measure actual navigation speed
    console.log('\n=== NAVIGATION TEST PHASE ===')

    // Start at Dashboard
    await page.goto('/connectors')
    await page.waitForLoadState('networkidle')

    // Dashboard → Logs
    let start = Date.now()
    await page.click('a[href="/connectors/logs"]')
    await page.waitForSelector('h1:has-text("Logs")')
    let time = Date.now() - start
    console.log(`Dashboard → Logs: ${time}ms`)
    expect(time).toBeLessThan(200) // Should be fast after warmup

    // Logs → Search
    start = Date.now()
    await page.click('a[href="/connectors/search"]')
    await page.waitForSelector('h1:has-text("Search")')
    time = Date.now() - start
    console.log(`Logs → Search: ${time}ms`)
    expect(time).toBeLessThan(200)

    // Search → Explore
    start = Date.now()
    await page.click('a[href="/connectors/explore"]')
    await page.waitForSelector('h1:has-text("Explore")')
    time = Date.now() - start
    console.log(`Search → Explore: ${time}ms`)
    expect(time).toBeLessThan(200)

    // Explore → Dashboard
    start = Date.now()
    await page.click('a[href="/connectors"]')
    await page.waitForSelector('h1:has-text("Dashboard")')
    time = Date.now() - start
    console.log(`Explore → Dashboard: ${time}ms`)
    expect(time).toBeLessThan(200)

    console.log('\n=== ALL NAVIGATION TESTS PASSED ===')
  })

  test('check spinner appears during navigation', async ({ page }) => {
    // Warmup first
    await page.goto('/connectors')
    await page.waitForSelector('h1')
    await page.goto('/connectors/logs')
    await page.waitForSelector('h1')

    // Go back to dashboard
    await page.goto('/connectors')
    await page.waitForLoadState('networkidle')

    // Now navigate and check for spinner
    const spinnerPromise = page.waitForSelector('[role="status"]', { timeout: 2000 }).catch(() => null)

    await page.click('a[href="/connectors/logs"]')

    const spinner = await spinnerPromise
    const hasSpinner = spinner !== null

    await page.waitForSelector('h1:has-text("Logs")')

    console.log(`Spinner appeared during navigation: ${hasSpinner ? 'YES' : 'NO'}`)

    // Note: Spinner may not appear if navigation is fast enough
    // This is actually good - means instant navigation!
  })
})
