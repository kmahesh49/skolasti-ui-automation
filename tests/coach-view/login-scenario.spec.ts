// spec: Login_Test_Plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const credentials = {
  email: 'gopikrishna2221@gmail.com',
  password: 'Skolasti@123',
};

// Test execution metrics
const testMetrics = {
  testSuiteStartTime: '',
  testStartTime: '',
  testEndTime: '',
  stepTimings: [] as Array<{ step: string; startTime: string; endTime: string; duration: number }>,
  totalPassCount: 0,
  totalFailCount: 0,
};

// Utility function to format timestamp
function getFormattedTimestamp(): string {
  const now = new Date();
  return now.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

// Utility function to calculate duration in seconds
function calculateDuration(startTime: string, endTime: string): number {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  return Number(((end - start) / 1000).toFixed(2));
}

// Function to log test metrics to console and browser console
async function logTestMetrics(page: any, logToBrowser = true) {
  const totalDuration = calculateDuration(testMetrics.testStartTime, testMetrics.testEndTime);
  
  const metricsReport = {
    '═══════════════════════════════════════════════════════════════': '',
    '                    TEST EXECUTION REPORT                      ': '',
    '═══════════════════════════════════════════════════════════════': '',
    'Test Suite Start Time': testMetrics.testSuiteStartTime,
    'Test Start Time': testMetrics.testStartTime,
    'Test End Time': testMetrics.testEndTime,
    'Total Test Duration': `${totalDuration}s`,
    'Test Pass Count': testMetrics.totalPassCount,
    'Test Failed Count': testMetrics.totalFailCount,
    '───────────────────────────────────────────────────────────────': '',
    'Step-by-Step Timings': testMetrics.stepTimings,
  };

  // Log to Node.js console
  console.log('\n' + '═'.repeat(65));
  console.log('                    TEST EXECUTION REPORT                      ');
  console.log('═'.repeat(65));
  console.log(`Test Suite Start Time    : ${testMetrics.testSuiteStartTime}`);
  console.log(`Test Start Time          : ${testMetrics.testStartTime}`);
  console.log(`Test End Time            : ${testMetrics.testEndTime}`);
  console.log(`Total Test Duration      : ${totalDuration}s`);
  console.log(`Test Pass Count          : ${testMetrics.totalPassCount}`);
  console.log(`Test Failed Count        : ${testMetrics.totalFailCount}`);
  console.log('─'.repeat(65));
  console.log('Step-by-Step Timings:');
  testMetrics.stepTimings.forEach((step, index) => {
    console.log(`  ${index + 1}. ${step.step}`);
    console.log(`     Start: ${step.startTime} | End: ${step.endTime} | Duration: ${step.duration}s`);
  });
  console.log('═'.repeat(65) + '\n');

  // Log to browser console only if page is still active and logToBrowser is true
  if (logToBrowser) {
    try {
      if (!page.isClosed()) {
        await page.evaluate((metrics: any) => {
          console.log('%c═══════════════════════════════════════════════════════════════', 'color: #4CAF50; font-weight: bold');
          console.log('%c                    TEST EXECUTION REPORT                      ', 'color: #4CAF50; font-weight: bold');
          console.log('%c═══════════════════════════════════════════════════════════════', 'color: #4CAF50; font-weight: bold');
          console.log('%cTest Suite Start Time    : ' + metrics.testSuiteStartTime, 'color: #2196F3');
          console.log('%cTest Start Time          : ' + metrics.testStartTime, 'color: #2196F3');
          console.log('%cTest End Time            : ' + metrics.testEndTime, 'color: #2196F3');
          console.log('%cTotal Test Duration      : ' + metrics.totalDuration + 's', 'color: #FF9800; font-weight: bold');
          console.log('%cTest Pass Count          : ' + metrics.totalPassCount, 'color: #4CAF50; font-weight: bold');
          console.log('%cTest Failed Count        : ' + metrics.totalFailCount, 'color: #F44336; font-weight: bold');
          console.log('%c───────────────────────────────────────────────────────────────', 'color: #4CAF50');
          console.log('%cStep-by-Step Timings:', 'color: #9C27B0; font-weight: bold');
          metrics.stepTimings.forEach((step: any, index: number) => {
            console.log(`%c  ${index + 1}. ${step.step}`, 'color: #673AB7');
            console.log(`     Start: ${step.startTime} | End: ${step.endTime} | Duration: ${step.duration}s`);
          });
          console.log('%c═══════════════════════════════════════════════════════════════', 'color: #4CAF50; font-weight: bold');
        }, { ...metricsReport, totalDuration });
      }
    } catch (error) {
      // Page might be closed, skip browser console logging
    }
  }
}

test.describe('Login Scenario', () => {
  test.beforeAll(() => {
    testMetrics.testSuiteStartTime = getFormattedTimestamp();
    console.log(`\\n🚀 Test Suite Started at: ${testMetrics.testSuiteStartTime}\\n`);
  });

  test.beforeEach(async ({ context }) => {
    // Clear all cookies and storage to ensure fresh session for each test
    await context.clearCookies();
  });

  test('Login with valid credentials and logout', async ({ page }, testInfo) => {
    testMetrics.testStartTime = getFormattedTimestamp();
    console.log(`\n▶️  Test Started at: ${testMetrics.testStartTime}`);

    test.setTimeout(240000);
    page.setDefaultTimeout(45000); // Reduced from 60000ms for faster failures
    page.setDefaultNavigationTimeout(120000); // Reduced from 150000ms

    // Step 1: Navigate to homepage
    let stepStart = getFormattedTimestamp();
    await page.goto('https://brightpathacademy.skillrok.com/', { waitUntil: 'domcontentloaded' });
    let stepEnd = getFormattedTimestamp();
    testMetrics.stepTimings.push({
      step: 'Navigate to homepage',
      startTime: stepStart,
      endTime: stepEnd,
      duration: calculateDuration(stepStart, stepEnd),
    });

    // Step 2: Navigate to coach login page (skip homepage, go directly)
    stepStart = getFormattedTimestamp();
    await page.goto('https://brightpathacademy.skillrok.com/coach', { waitUntil: 'domcontentloaded' });
    stepEnd = getFormattedTimestamp();
    testMetrics.stepTimings.push({
      step: 'Navigate to coach login page',
      startTime: stepStart,
      endTime: stepEnd,
      duration: calculateDuration(stepStart, stepEnd),
    });

    // Step 3: Fill email and password
    stepStart = getFormattedTimestamp();
    await page.getByRole('textbox', { name: 'Email' }).fill(credentials.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
    stepEnd = getFormattedTimestamp();
    testMetrics.stepTimings.push({
      step: 'Fill login credentials',
      startTime: stepStart,
      endTime: stepEnd,
      duration: calculateDuration(stepStart, stepEnd),
    });

    const waitForDashboardNavigation = () => page.waitForURL(/.*coach\/dashboard/, { timeout: 120000 });

    // Step 4: Click Submit button and wait for either FusionAuth redirect or direct dashboard navigation
    stepStart = getFormattedTimestamp();
    await Promise.all([
      page.waitForURL(
        (url: URL) => {
          const target = url.toString();
          return target.includes('auth.skillrok.com') || target.includes('/coach/dashboard');
        },
        { timeout: 45000 },
      ),
      page.getByRole('button', { name: 'Submit' }).click(),
    ]);
    stepEnd = getFormattedTimestamp();
    testMetrics.stepTimings.push({
      step: 'Submit login form and await redirect',
      startTime: stepStart,
      endTime: stepEnd,
      duration: calculateDuration(stepStart, stepEnd),
    });

    // Step 5: Complete FusionAuth hosted login when required
    if (page.url().includes('auth.skillrok.com')) {
      stepStart = getFormattedTimestamp();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      
      // Wait for the form to be ready
      const fusionEmail = page.locator('input#loginId');
      const passwordInput = page.locator('input#password');
      
      // Check if login form is present with a reasonable timeout
      const loginFieldExists = await fusionEmail.isVisible({ timeout: 5000 }).catch(() => false);

      if (loginFieldExists) {
        // Wait for fields to be ready
        await fusionEmail.waitFor({ state: 'visible', timeout: 10000 });
        await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
        
        // Fill fields with better clearing method (click, select all, then type)
        await fusionEmail.click();
        await fusionEmail.fill('', { timeout: 5000 }); // Clear by filling empty string
        await fusionEmail.fill(credentials.email, { timeout: 45000 });
        
        await passwordInput.click();
        await passwordInput.fill('', { timeout: 5000 }); // Clear by filling empty string  
        await passwordInput.fill(credentials.password, { timeout: 45000 });
        
        // Small delay to ensure field values are properly set (helps with Edge)
        await page.waitForTimeout(500);
        
        // Try multiple submission methods with proper error handling
        const submitButton = page.locator('button:has-text("Submit")').first();
        await submitButton.waitFor({ state: 'visible', timeout: 10000 });
        
        let navigationSuccessful = false;
        
        // Method 1: Enter key on password field (works well for Edge and WebKit)
        if (!navigationSuccessful) {
          try {
            await Promise.all([
              page.waitForURL((url: URL) => !url.toString().includes('auth.skillrok.com'), { timeout: 25000 }),
              passwordInput.press('Enter'),
            ]);
            navigationSuccessful = true;
          } catch (error) {
            // Continue to next method
          }
        }
        
        // Method 2: Direct button click (works well for Chromium)
        if (!navigationSuccessful) {
          try {
            await submitButton.click({ force: true });
            await page.waitForURL((url: URL) => !url.toString().includes('auth.skillrok.com'), { timeout: 25000 });
            navigationSuccessful = true;
          } catch (error) {
            // Continue to next method
          }
        }
        
        // Method 3: JavaScript form submission (final fallback)
        if (!navigationSuccessful) {
          await page.evaluate(() => {
            const form = document.querySelector('form');
            if (form) {
              const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
              form.dispatchEvent(submitEvent);
              if (!submitEvent.defaultPrevented) {
                form.submit();
              }
            }
          });
          await page.waitForURL((url: URL) => !url.toString().includes('auth.skillrok.com'), { timeout: 60000 });
        }
      }

      // Wait for dashboard if not already there
      if (!page.url().includes('/coach/dashboard')) {
        await waitForDashboardNavigation();
      }
      stepEnd = getFormattedTimestamp();
      testMetrics.stepTimings.push({
        step: 'Complete FusionAuth SSO login',
        startTime: stepStart,
        endTime: stepEnd,
        duration: calculateDuration(stepStart, stepEnd),
      });
    } else if (!page.url().includes('/coach/dashboard')) {
      await waitForDashboardNavigation();
    }

    // Step 6: Wait for dashboard heading to confirm authentication
    stepStart = getFormattedTimestamp();
    await expect(page.getByRole('heading', { name: 'Upcoming Live Sessions' })).toBeVisible({ timeout: 30000 });
    stepEnd = getFormattedTimestamp();
    testMetrics.stepTimings.push({
      step: 'Verify dashboard loaded',
      startTime: stepStart,
      endTime: stepEnd,
      duration: calculateDuration(stepStart, stepEnd),
    });

    // Step 7: Verify Profile Menu is visible
    stepStart = getFormattedTimestamp();
    const profileMenu = page.locator('[title="Profile Menu"]');
    await expect(profileMenu).toBeVisible({ timeout: 10000 });
    stepEnd = getFormattedTimestamp();
    testMetrics.stepTimings.push({
      step: 'Verify profile menu visible',
      startTime: stepStart,
      endTime: stepEnd,
      duration: calculateDuration(stepStart, stepEnd),
    });

    // Step 8: Open Profile Menu and click Logout
    stepStart = getFormattedTimestamp();
    await profileMenu.click();
    const logoutButton = page.getByText('Logout', { exact: true });
    await expect(logoutButton).toBeVisible({ timeout: 8000 });
    await logoutButton.click();
    await page.waitForURL('https://brightpathacademy.skillrok.com/', { timeout: 12000 });
    stepEnd = getFormattedTimestamp();
    testMetrics.stepTimings.push({
      step: 'Logout and return to homepage',
      startTime: stepStart,
      endTime: stepEnd,
      duration: calculateDuration(stepStart, stepEnd),
    });

    // Step 9: Verify homepage URL after logout
    stepStart = getFormattedTimestamp();
    await expect(page).toHaveURL('https://brightpathacademy.skillrok.com/');
    stepEnd = getFormattedTimestamp();
    testMetrics.stepTimings.push({
      step: 'Verify homepage after logout',
      startTime: stepStart,
      endTime: stepEnd,
      duration: calculateDuration(stepStart, stepEnd),
    });

    // Step 10: Navigate back to coach page and verify login screen
    stepStart = getFormattedTimestamp();
    await page.goto('https://brightpathacademy.skillrok.com/coach', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible({ timeout: 8000 });
    stepEnd = getFormattedTimestamp();
    testMetrics.stepTimings.push({
      step: 'Verify login screen reloaded',
      startTime: stepStart,
      endTime: stepEnd,
      duration: calculateDuration(stepStart, stepEnd),
    });

    // Mark test as passed and log metrics
    testMetrics.testEndTime = getFormattedTimestamp();
    testMetrics.totalPassCount += 1;
    console.log(`\n✅ Test Completed at: ${testMetrics.testEndTime}\n`);
    
    // Log comprehensive test metrics (browser console logging while page is active)
    await logTestMetrics(page, true);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      testMetrics.testEndTime = getFormattedTimestamp();
      testMetrics.totalFailCount += 1;
      console.log(`\n❌ Test Failed at: ${testMetrics.testEndTime}\n`);
      // Don't log to browser console in afterEach as page might be closed
      await logTestMetrics(page, false);
    }
  });
});
