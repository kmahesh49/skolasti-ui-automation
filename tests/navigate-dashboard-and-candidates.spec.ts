// spec: Enter.instructions.md
// seed: tests/coach-view/seed.spec.ts

import { test, expect } from '@playwright/test';

const ATS_URL = 'https://inovar.sharepoint.com/sites/atstest';
const SIGN_IN_TIMEOUT = 180000;

test.describe('ATS Dashboard Navigation', () => {
  test('Navigate Dashboard and Candidates', async ({ page }) => {
    // 1. Open Chromium browser.
    // The Playwright test runner provisions the Chromium page fixture.

    // 2. Navigate to https://inovar.sharepoint.com/sites/atstest.
    await page.goto(ATS_URL);

    // 3. Wait for user to complete manual sign-in.
    await expect(page).toHaveURL(/inovar\.sharepoint\.com\/sites\/atstest/i, {
      timeout: SIGN_IN_TIMEOUT,
    });
    const dashboardNav = page.getByText(/Dashboard/i).first();
    await expect(dashboardNav).toBeVisible({ timeout: SIGN_IN_TIMEOUT });

    // 4. Click Dashboard button present in the navigation bar.
    await dashboardNav.click();
    await expect(page).toHaveURL(/inovar\.sharepoint\.com\/sites\/atstest/i);

    // 5. Click Candidates button present in the navigation.
    const candidatesNav = page.getByText(/Candidates/i).first();
    await expect(candidatesNav).toBeVisible();
    await candidatesNav.click();
    await expect(page).toHaveURL(/inovar\.sharepoint\.com\/sites\/atstest/i);

    // 6. Close the browser.
    await page.context().close();
  });
});
