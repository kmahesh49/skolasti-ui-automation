// spec: specs/coach-view-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Coach View - Home and Navigation', () => {
  test.fixme('Verify Coach Home Page and Live Session Filters', async ({ page }) => {
    // FIXME: This test passes when run individually but fails when run with other tests in parallel
    // due to the login page not loading correctly (503 errors on JavaScript modules).
    // The page gets stuck on the OAuth login screen instead of completing authentication.
    // Login to learner view
    await page.goto('https://skolastidev1.skolasti.com/learner/login');
    await new Promise(f => setTimeout(f, 10 * 1000));
    
    // Try up to 2 times if page doesn't load
    for (let attempt = 0; attempt < 2; attempt++) {
      const emailField = page.getByRole('textbox', { name: 'Email' });
      const isEmailVisible = await emailField.isVisible().catch(() => false);
      if (isEmailVisible) break;
      
      await page.reload();
      await new Promise(f => setTimeout(f, 8 * 1000));
    }
    
    await page.getByRole('textbox', { name: 'Email' }).fill('Sirisha.b@inovar-tech.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Skolasti@123');
    await page.getByRole('button', { name: ' Submit' }).click();
    await new Promise(f => setTimeout(f, 15 * 1000));

    // Switch to coach view (check if button exists first)
    const switchButton = page.getByRole('button', { name: 'Switch to coach view' });
    const isVisible = await switchButton.isVisible().catch(() => false);
    if (isVisible) {
      await switchButton.click();
      await new Promise(f => setTimeout(f, 5 * 1000));
    }

    // Verify page URL is /coach/dashboard
    await expect(page).toHaveURL(/\/coach\/dashboard/);

    // Verify 'Upcoming Live Sessions' heading is visible
    await expect(page.getByRole('heading', { name: 'Upcoming Live Sessions' })).toBeVisible();

    // Verify filter buttons are present: Today, Tomorrow, This Week, This Month, Custom
    await expect(page.getByRole('button', { name: 'Today' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tomorrow' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'This Week' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'This Month' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Custom' })).toBeVisible();

    // Verify statistics cards: Total Sessions count and Active Days count
    await expect(page.getByText('Total Sessions')).toBeVisible();
    await expect(page.getByText('Active Days')).toBeVisible();

    // Click 'Today' filter button
    await page.getByRole('button', { name: 'Today' }).click();
    // Verify filter is applied (date range updates)
    await expect(page.getByText(/Showing sessions from/)).toBeVisible();

    // Click 'This Week' filter button
    await page.getByRole('button', { name: 'This Week' }).click();
    // Verify filter is applied (date range shows week range)
    await expect(page.getByText(/Showing sessions from/)).toBeVisible();

    // Click 'This Month' filter button
    await page.getByRole('button', { name: 'This Month' }).click();
    // Verify filter is applied (date range shows month range)
    await expect(page.getByText(/Showing sessions from/)).toBeVisible();
  });
});
