import { test, expect } from '@playwright/test'

test.describe('Shell to MFE Complete Flow', () => {
  test('start at Shell → click MFE link → navigate MFE pages', async ({ page }) => {
    console.log('=== SHELL TO MFE COMPLETE FLOW ===\n')

    // 1. Start at Shell homepage (port 3000)
    console.log('1. Load Shell homepage')
    let start = Date.now()
    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('domcontentloaded')
    let time = Date.now() - start
    console.log(`   Shell loaded: ${time}ms`)

    // Take screenshot of Shell
    const shellUrl = page.url()
    console.log(`   URL: ${shellUrl}`)

    // 2. Find and click link to MFE (Agent Toolkit)
    console.log('\n2. Click to MFE (Agent Toolkit)')

    // Look for link to /agent-toolkit
    const mfeLink = page.locator('a[href="/agent-toolkit"], a[href*="agent-toolkit"]').first()
    const hasLink = await mfeLink.count() > 0

    if (hasLink) {
      start = Date.now()
      await mfeLink.click()
      await page.waitForSelector('h1', { timeout: 30000 })
      time = Date.now() - start
      console.log(`   Shell → MFE navigation: ${time}ms`)
    } else {
      // If no link, navigate directly
      console.log('   No MFE link found, navigating directly')
      start = Date.now()
      await page.goto('http://localhost:3000/agent-toolkit')
      await page.waitForSelector('h1', { timeout: 30000 })
      time = Date.now() - start
      console.log(`   Direct navigation to MFE: ${time}ms`)
    }

    const mfeUrl = page.url()
    console.log(`   URL: ${mfeUrl}`)
    expect(mfeUrl).toContain('/agent-toolkit')

    // 3. Navigate within MFE: Dashboard → Logs
    console.log('\n3. MFE: Dashboard → Logs')
    start = Date.now()
    await page.click('a[href="/agent-toolkit/logs"]')
    await page.waitForSelector('h1:has-text("Logs")', { timeout: 30000 })
    time = Date.now() - start
    console.log(`   Navigation: ${time}ms`)

    // 4. Navigate: Logs → Search
    console.log('\n4. MFE: Logs → Search')
    start = Date.now()
    await page.click('a[href="/agent-toolkit/search"]')
    await page.waitForSelector('h1:has-text("Search")', { timeout: 30000 })
    time = Date.now() - start
    console.log(`   Navigation: ${time}ms`)

    // 5. Navigate: Search → Explore
    console.log('\n5. MFE: Search → Explore')
    start = Date.now()
    await page.click('a[href="/agent-toolkit/explore"]')
    await page.waitForSelector('h1:has-text("Explore")', { timeout: 30000 })
    time = Date.now() - start
    console.log(`   Navigation: ${time}ms`)

    // 6. Navigate: Explore → Dashboard
    console.log('\n6. MFE: Explore → Dashboard')
    start = Date.now()
    await page.click('a[href="/agent-toolkit"]')
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 })
    time = Date.now() - start
    console.log(`   Navigation: ${time}ms`)

    // 7. Second pass - should be instant (cached/prefetched)
    console.log('\n7. Second pass (cached):')

    start = Date.now()
    await page.click('a[href="/agent-toolkit/logs"]')
    await page.waitForSelector('h1:has-text("Logs")')
    time = Date.now() - start
    console.log(`   Dashboard → Logs: ${time}ms`)
    expect(time).toBeLessThan(300)

    start = Date.now()
    await page.click('a[href="/agent-toolkit/search"]')
    await page.waitForSelector('h1:has-text("Search")')
    time = Date.now() - start
    console.log(`   Logs → Search: ${time}ms`)
    expect(time).toBeLessThan(300)

    start = Date.now()
    await page.click('a[href="/agent-toolkit/explore"]')
    await page.waitForSelector('h1:has-text("Explore")')
    time = Date.now() - start
    console.log(`   Search → Explore: ${time}ms`)
    expect(time).toBeLessThan(300)

    start = Date.now()
    await page.click('a[href="/agent-toolkit"]')
    await page.waitForSelector('h1:has-text("Dashboard")')
    time = Date.now() - start
    console.log(`   Explore → Dashboard: ${time}ms`)
    expect(time).toBeLessThan(300)

    console.log('\n=== ALL NAVIGATION TESTS PASSED ===')
  })
})
