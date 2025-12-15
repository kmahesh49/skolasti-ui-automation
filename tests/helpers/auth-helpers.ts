// spec: specs/coach-view-plan.md
// Common authentication and navigation helpers for Coach View tests

import { Page, expect } from '@playwright/test';

const coachEmail = 'gopikrishna2221@gmail.com';
const coachPassword = 'Skolasti@123';

/**
 * Logs in to the application with the provided credentials
 * @param page - Playwright Page object
 * @param email - User email
 * @param password - User password
 */
export async function loginToLearnerView(page: Page, email: string = coachEmail, password: string = coachPassword) {
  // Navigate and wait for page to be ready
  await page.goto('https://harvarduniversitytest.skillrok.com/learner/login');
  await new Promise(f => setTimeout(f, 5 * 1000));
  
  // Fill login credentials
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: ' Submit' }).click();
  await new Promise(f => setTimeout(f, 10 * 1000));
}

/**
 * Switches from learner view to coach view
 * @param page - Playwright Page object
 */
export async function switchToCoachView(page: Page) {
  const switchButton = page.getByRole('button', { name: /Switch to coach view/i });
  if (await switchButton.isVisible().catch(() => false)) {
    await switchButton.click();
    await new Promise(f => setTimeout(f, 3 * 1000));
    return;
  }

  if (!page.url().includes('/coach/')) {
    await page.goto('https://harvarduniversitytest.skillrok.com/coach');
    await page.waitForLoadState('domcontentloaded');
  }
}

/**
 * Switches from coach view to learner view
 * @param page - Playwright Page object
 */
export async function switchToLearnerView(page: Page) {
  await page.getByRole('button', { name: 'Switch to learner view' }).click();
  await new Promise(f => setTimeout(f, 3 * 1000));
}

/**
 * Complete authentication flow: login and switch to coach view
 * @param page - Playwright Page object
 */
export async function loginAndSwitchToCoachView(page: Page) {
  await loginToLearnerView(page);
  await switchToCoachView(page);
}

export async function completeCoachOauth(page: Page, expectedPattern: RegExp = /coach\//, email: string = coachEmail, password: string = coachPassword) {
  if (!page.url().includes('auth.skolasti.com')) {
    return;
  }

  const emailField = page.getByRole('textbox', { name: 'Email' });
  if (await emailField.isVisible().catch(() => false)) {
    await emailField.fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    const submitButton = page.getByRole('button', { name: /Submit/i }).first();
    if (await submitButton.count()) {
      await submitButton.click();
    } else {
      await page.getByRole('button', { name: /Sign in|Login/i }).first().click();
    }
    
    // Wait for OAuth to complete and redirect away from auth page
    await page.waitForURL(expectedPattern, { timeout: 60000, waitUntil: 'domcontentloaded' });
  }
}

/**
 * Navigates to Studio page in Coach View
 * @param page - Playwright Page object
 */
export async function navigateToStudio(page: Page) {
  await page.getByRole('listitem').filter({ hasText: 'Creation HUB' }).click();
  await page.getByRole('link', { name: 'Studio' }).click();
  await new Promise(f => setTimeout(f, 3 * 1000));
}

/**
 * Navigates to Content Library page in Coach View
 * @param page - Playwright Page object
 */
export async function navigateToContentLibrary(page: Page) {
  await page.getByRole('listitem').filter({ hasText: 'Creation HUB' }).click();
  await page.getByRole('link', { name: 'Content Library' }).click();
  await new Promise(f => setTimeout(f, 2 * 1000));
}

/**
 * Navigates to Subscription Plans page in Coach View
 * @param page - Playwright Page object
 */
export async function navigateToSubscriptionPlans(page: Page) {
  await page.getByRole('listitem').filter({ hasText: 'Creation HUB' }).click();
  await page.getByRole('link', { name: 'Subscription Plans' }).click();
  await new Promise(f => setTimeout(f, 2 * 1000));
}

/**
 * Verifies that the current page URL matches the expected pattern
 * @param page - Playwright Page object
 * @param expectedPath - Expected URL path
 */
export async function verifyUrl(page: Page, expectedPath: string) {
  await expect(page).toHaveURL(new RegExp(expectedPath));
}
