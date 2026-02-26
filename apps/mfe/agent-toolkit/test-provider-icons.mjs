/**
 * Quick test script for provider icons
 * Run with: node test-provider-icons.mjs
 */

const providers = ['attio', 'humaans', 'salesforce', 'hubspot', 'workday']
const baseUrl = 'http://localhost:3001'

async function testProviderIcons() {
  console.log('Testing Provider Icons...\n')

  let allPassed = true

  for (const provider of providers) {
    const url = `${baseUrl}/agent-toolkit/icons/providers/${provider}.svg`
    try {
      const response = await fetch(url)
      const text = await response.text()

      const status = response.ok ? '✅' : '❌'
      const isSvg = text.includes('<svg') && text.includes('</svg>')
      const svgStatus = isSvg ? '✅' : '❌'

      console.log(`${provider}:`)
      console.log(`  HTTP: ${status} ${response.status}`)
      console.log(`  SVG:  ${svgStatus} ${isSvg ? 'Valid SVG content' : 'Invalid content'}`)
      console.log(`  Size: ${text.length} bytes`)

      if (!response.ok || !isSvg) allPassed = false
    } catch (error) {
      console.log(`${provider}: ❌ ${error.message}`)
      allPassed = false
    }
    console.log()
  }

  console.log('---')
  console.log(allPassed ? '✅ All provider icons passed!' : '❌ Some tests failed')

  // Test the logs page HTML
  console.log('\nTesting logs page...')
  try {
    const logsResponse = await fetch(`${baseUrl}/agent-toolkit/logs`)
    console.log(`Logs page: ${logsResponse.ok ? '✅' : '❌'} ${logsResponse.status}`)
  } catch (error) {
    console.log(`Logs page: ❌ ${error.message}`)
    console.log('Make sure dev server is running: pnpm dev')
  }
}

testProviderIcons()
