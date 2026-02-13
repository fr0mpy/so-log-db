import { test, expect } from '@playwright/test'

test.describe('Navigation Performance', () => {
  test.beforeEach(async ({ page }) => {
    // Start at dashboard
    await page.goto('/connectors')
    await page.waitForLoadState('networkidle')
  })

  test('measures navigation from Dashboard to Logs', async ({ page }) => {
    const startTime = Date.now()

    // Click the Logs link
    await page.click('a[href="/connectors/logs"]')

    // Wait for the Logs page content
    await page.waitForSelector('h1:has-text("Logs")')

    const navigationTime = Date.now() - startTime
    console.log(`Dashboard → Logs: ${navigationTime}ms`)

    expect(navigationTime).toBeLessThan(500)
  })

  test('measures navigation from Dashboard to Search', async ({ page }) => {
    const startTime = Date.now()

    await page.click('a[href="/connectors/search"]')
    await page.waitForSelector('h1:has-text("Search")')

    const navigationTime = Date.now() - startTime
    console.log(`Dashboard → Search: ${navigationTime}ms`)

    expect(navigationTime).toBeLessThan(500)
  })

  test('measures navigation from Dashboard to Explore', async ({ page }) => {
    const startTime = Date.now()

    await page.click('a[href="/connectors/explore"]')
    await page.waitForSelector('h1:has-text("Explore")')

    const navigationTime = Date.now() - startTime
    console.log(`Dashboard → Explore: ${navigationTime}ms`)

    expect(navigationTime).toBeLessThan(500)
  })

  test('measures round-trip navigation', async ({ page }) => {
    // Dashboard → Logs
    let start = Date.now()
    await page.click('a[href="/connectors/logs"]')
    await page.waitForSelector('h1:has-text("Logs")')
    console.log(`Dashboard → Logs: ${Date.now() - start}ms`)

    // Logs → Search
    start = Date.now()
    await page.click('a[href="/connectors/search"]')
    await page.waitForSelector('h1:has-text("Search")')
    console.log(`Logs → Search: ${Date.now() - start}ms`)

    // Search → Explore
    start = Date.now()
    await page.click('a[href="/connectors/explore"]')
    await page.waitForSelector('h1:has-text("Explore")')
    console.log(`Search → Explore: ${Date.now() - start}ms`)

    // Explore → Dashboard
    start = Date.now()
    await page.click('a[href="/connectors"]')
    await page.waitForSelector('h1:has-text("Dashboard")')
    console.log(`Explore → Dashboard: ${Date.now() - start}ms`)
  })
})
