const { test, expect } = require('@playwright/test');

test('emoji test', async ({ page }) => {
  console.log('✅ This is a test with emoji');
  expect(true).toBe(true);
});
