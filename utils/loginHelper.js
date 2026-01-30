// This file contains reusable login functions
// So we don't repeat login code in every test

const config = require('../config/config');

/**
 * Login as Learner
 * @param {Page} page - Playwright page object
 * @param {string} email - Learner email
 * @param {string} password - Learner password
 */
async function loginAsLearner(page, email, password) {
  // Navigate to learner login page
  await page.goto(config.urls.learner, { 
    waitUntil: 'networkidle',  // Wait until all network requests complete
    timeout: config.timeout.navigation 
  });

  // Wait for email input field to be visible
  await page.waitForSelector('input[type="email"], input[name="email"]', { 
    timeout: config.timeout.default 
  });

  // Fill in email
  await page.fill('input[type="email"], input[name="email"]', email);

  // Fill in password
  await page.fill('input[type="password"], input[name="password"]', password);

  // Click login button
  await page.click('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")');

  // Wait for navigation to dashboard after successful login
  await page.waitForURL('**/learner/**', { 
    timeout: config.timeout.navigation 
  });

  // Extra wait to ensure page is fully loaded
  await page.waitForLoadState('networkidle');

  console.log(`✅ Logged in as Learner: ${email}`);
}

/**
 * Login as Coach
 * @param {Page} page - Playwright page object
 * @param {string} email - Coach email
 * @param {string} password - Coach password
 */
async function loginAsCoach(page, email, password) {
  // Navigate to coach login page
  await page.goto(config.urls.coach, { 
    waitUntil: 'networkidle',
    timeout: config.timeout.navigation 
  });

  // Wait for email input field
  await page.waitForSelector('input[type="email"], input[name="email"]', { 
    timeout: config.timeout.default 
  });

  // Fill in credentials
  await page.fill('input[type="email"], input[name="email"]', email);
  await page.fill('input[type="password"], input[name="password"]', password);

  // Click login button
  await page.click('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")');

  // Wait for navigation to coach dashboard
  await page.waitForURL('**/coach/**', { 
    timeout: config.timeout.navigation 
  });

  await page.waitForLoadState('networkidle');

  console.log(`✅ Logged in as Coach: ${email}`);
}

// Export functions so they can be used in test files
module.exports = {
  loginAsLearner,
  loginAsCoach
};