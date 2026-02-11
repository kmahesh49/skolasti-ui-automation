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
  await page.goto('https://patashala-testjan16-820.skillrok.com/learner/login');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  
  // Fill login credentials
  await page.getByRole('textbox', { name: /Email/i }).fill(email);
  await page.getByRole('textbox', { name: /Password/i }).fill(password);
  
  // Click submit and wait for navigation
  await page.getByRole('button', { name: /Sign In|Submit/i }).click();
  await page.waitForURL(/learner/, { timeout: 60000 });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000);
}

/**
 * Logs in directly to coach view
 * @param page - Playwright Page object
 * @param email - User email
 * @param password - User password
 */
export async function loginToCoachView(page: Page, email: string = coachEmail, password: string = coachPassword) {
  // Navigate directly to coach login
  await page.goto('https://patashala-testjan16-820.skillrok.com/coach/login', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  
  // Fill login credentials
  await page.getByRole('textbox', { name: /Email/i }).fill(email);
  await page.getByRole('textbox', { name: /Password/i }).fill(password);
  
  // Click submit and wait for navigation (either to OAuth or dashboard)
  await Promise.all([
    page.waitForURL(url => {
      const urlStr = url.toString();
      return urlStr.includes('auth.skillrok.com') || urlStr.includes('auth.skolasti.com') || urlStr.includes('/coach/');
    }, { timeout: 90000 }),
    page.getByRole('button', { name: /Sign In|Submit/i }).click()
  ]);
  
  // Handle OAuth redirect if present
  if (page.url().includes('auth.skillrok.com') || page.url().includes('auth.skolasti.com')) {
    await completeCoachOauth(page, /coach/);
  }
  
  // Ensure we're on coach dashboard
  await page.waitForURL(/coach/, { timeout: 60000 });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000);
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
    await page.goto('https://patashala-testjan16-820.skillrok.com/coach');
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
  await loginToCoachView(page);
}

export async function completeCoachOauth(page: Page, expectedPattern: RegExp = /coach\//, email: string = coachEmail, password: string = coachPassword) {
  if (!page.url().includes('auth.skolasti.com') && !page.url().includes('auth.skillrok.com')) {
    return;
  }

  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  // Try multiple selectors for login fields
  const emailField = page.locator('input#loginId, input[name="loginId"], input[type="email"]').first();
  const isEmailVisible = await emailField.isVisible({ timeout: 5000 }).catch(() => false);
  
  if (isEmailVisible) {
    await emailField.fill(email);
    const passwordField = page.locator('input#password, input[name="password"], input[type="password"]').first();
    await passwordField.fill(password);
    
    const submitButton = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Sign in"), button:has-text("Login")').first();
    await submitButton.click();
    
    // Wait for OAuth to complete and redirect away from auth page
    await page.waitForURL(expectedPattern, { timeout: 90000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  }
}

/**
 * Navigates to Studio page in Coach View
 * @param page - Playwright Page object
 */
export async function navigateToStudio(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  // Try multiple selectors for Creation HUB
  const creationHub = page.locator('li:has-text("Creation HUB"), [role="listitem"]:has-text("Creation HUB")').first();
  const isVisible = await creationHub.isVisible({ timeout: 10000 }).catch(() => false);
  
  if (isVisible) {
    await creationHub.click();
    await page.waitForTimeout(1000);
    await page.locator('a:has-text("Studio"), [role="link"]:has-text("Studio")').first().click();
  } else {
    // Direct navigation fallback
    await page.goto('https://patashala-testjan16-820.skillrok.com/coach/studio', { waitUntil: 'domcontentloaded' });
  }
  
  await new Promise(f => setTimeout(f, 3 * 1000));
}

/**
 * Navigates to Content Library page in Coach View
 * @param page - Playwright Page object
 */
export async function navigateToContentLibrary(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  const creationHub = page.locator('li:has-text("Creation HUB"), [role="listitem"]:has-text("Creation HUB")').first();
  const isVisible = await creationHub.isVisible({ timeout: 10000 }).catch(() => false);
  
  if (isVisible) {
    await creationHub.click();
    await page.waitForTimeout(1000);
    await page.locator('a:has-text("Content Library")').first().click();
  } else {
    await page.goto('https://patashala-testjan16-820.skillrok.com/coach/content-library', { waitUntil: 'domcontentloaded' });
  }
  
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
