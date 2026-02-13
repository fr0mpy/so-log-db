import { test, expect } from '@playwright/test'

test.describe('Cold Start Performance', () => {
  test('measures first visit to each page (no cache)', async ({ browser }) => {
    // Create fresh context for each test (no cache)
    const context = await browser.newContext()
    const page = await context.newPage()

    console.log('\n=== Cold Start (First Visit) ===')

    // First visit to Dashboard
    let start = Date.now()
    await page.goto('/agent-toolkit')
    await page.waitForSelector('h1:has-text("Dashboard")')
    console.log(`Cold: /agent-toolkit (Dashboard): ${Date.now() - start}ms`)

    await context.close()

    // Fresh context for Logs
    const context2 = await browser.newContext()
    const page2 = await context2.newPage()

    start = Date.now()
    await page2.goto('/agent-toolkit/logs')
    await page2.waitForSelector('h1:has-text("Logs")')
    console.log(`Cold: /agent-toolkit/logs: ${Date.now() - start}ms`)

    await context2.close()

    // Fresh context for Search
    const context3 = await browser.newContext()
    const page3 = await context3.newPage()

    start = Date.now()
    await page3.goto('/agent-toolkit/search')
    await page3.waitForSelector('h1:has-text("Search")')
    console.log(`Cold: /agent-toolkit/search: ${Date.now() - start}ms`)

    await context3.close()
  })

  test('measures navigation WITH visible spinner timing', async ({ page }) => {
    await page.goto('/agent-toolkit')
    await page.waitForLoadState('networkidle')

    console.log('\n=== Navigation with Spinner Detection ===')

    // Click and measure time until content appears
    const start = Date.now()
    await page.click('a[href="/agent-toolkit/logs"]')

    // Check if spinner appears
    const spinnerAppeared = await page.locator('[role="status"]').isVisible().catch(() => false)
    if (spinnerAppeared) {
      console.log(`Spinner appeared at: ${Date.now() - start}ms`)
    }

    // Wait for actual content
    await page.waitForSelector('h1:has-text("Logs")')
    console.log(`Content visible at: ${Date.now() - start}ms`)
    console.log(`Spinner shown: ${spinnerAppeared}`)
  })
})
