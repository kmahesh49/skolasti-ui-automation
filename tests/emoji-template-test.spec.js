const { test, expect } = require('@playwright/test');

test('emoji in template string test', async ({ page }) => {
  const selector = 'button';
  const btnText = 'Click me';
  console.log(`✅ Found enabled Pay button in iframe: "${btnText?.trim()}" using: ${selector}`);
  expect(true).toBe(true);
});
