import { test, expect } from "@playwright/test";

const BASE_URL = "https://patashala-testjan16-820.skillrok.com/coach";

test.describe("Seed Tests", () => {
  test("should load the application", async ({ page }) => {
    // Navigate to the base URL
    await page.goto(BASE_URL);
    
    // Wait for the page to load
    await page.waitForLoadState("networkidle");
    
    // Verify the page has loaded (may redirect to login if not authenticated)
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/patashala-testjan16-820\.skillrok\.com/);
  });
});