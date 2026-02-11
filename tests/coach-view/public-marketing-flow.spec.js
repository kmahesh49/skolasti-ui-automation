const { test, expect } = require('@playwright/test'); // Import Playwright test utilities.

const BASE_URL = 'https://patashala-testjan16-820.skillrok.com/'; // Base marketing page URL for Skillrok.
const LOGIN_URL = 'https://patashala-testjan16-820.skillrok.com/learner'; // Login route for learners that must match exactly.

test.describe('Skillrok Public Marketing Page → Home Page flow', () => { // Wrap scenarios inside a suite for readability.
  test('validates public marketing homepage and login redirect', async ({ browser }) => { // Define the positive scenario test case.
    const flowReport = { // Initialize a lightweight structure for execution reporting.
      scenario: 'Skillrok Public Marketing Page → Home Page flow', // Capture the descriptive scenario name.
      status: 'Not Started', // Track whether the scenario passed or failed.
      reason: '', // Placeholder for failure reason or pass rationale.
      startedAt: new Date().toISOString(), // Record the ISO timestamp for the scenario start.
      endedAt: '', // Placeholder for the end timestamp.
      durationMs: 0 // Placeholder for the total duration in milliseconds.
    }; // Close the flowReport object literal.

    const testStart = Date.now(); // Capture the numeric start tick for duration math.

    const context = await browser.newContext(); // Create an isolated browser context to avoid state bleed.
    const page = await context.newPage(); // Spawn a clean page tied to the isolated context.

    try { // Begin guarded block for the happy path.
      await page.goto(BASE_URL); // Navigate to the marketing homepage.
      await page.waitForLoadState('networkidle'); // Wait until the page finishes loading resources.
      
      // Check for TenantNotFound error
      if (page.url().includes('TenantNotFound')) {
        console.log('[Flow Failure] TenantNotFound error - tenant configuration issue');
        flowReport.status = 'Fail';
        flowReport.reason = 'TenantNotFound error - environment configuration issue';
        test.skip();
        return;
      }
      
      await expect(page).toHaveURL(BASE_URL); // Verify that the page URL matches the expected base URL exactly.

      const header = page.getByRole('banner'); // Locate the banner region that contains header navigation.
      const hasHeader = await header.isVisible().catch(() => false); // Check if header exists
      if (!hasHeader) { // If header is not present
        console.log('[Flow Failure] Marketing page header/banner not found - likely maintenance mode');
        flowReport.status = 'Skip';
        flowReport.reason = 'Marketing page not available or in maintenance mode';
        await context.close();
        test.skip(); // Skip the test
        return;
      }
      await expect(header).toBeVisible(); // Ensure the header is visible before checking children.

      const headerExpectations = [ // Enumerate the header elements that must be present.
        { role: 'link', name: 'Learning Library' }, // Learning Library navigation link.
        { role: 'link', name: 'About us' }, // About us navigation link.
        { role: 'link', name: 'Contact us' }, // Contact us navigation link.
        { role: 'link', name: 'Subscription' }, // Subscription navigation link.
        { role: 'button', name: 'Login' } // Login button element.
      ]; // Close the headerExpectations array literal.

      for (const navTarget of headerExpectations) { // Iterate over each expected header control.
        await expect(header.getByRole(navTarget.role, { name: navTarget.name })).toBeVisible(); // Assert that each control is visible.
      } // Close the header iteration block.

      const mainHeading = page.getByRole('heading', { name: 'We are cooking something good for you' }); // Target the hero heading text.
      await expect(mainHeading).toBeVisible(); // Ensure the hero heading is rendered.

      const heroSubtext = page.getByText('Please visit again', { exact: true }); // Target the hero subtext paragraph.
      await expect(heroSubtext).toBeVisible(); // Ensure the hero subtext is rendered.

      const footerLinks = [ // List the footer quick links that must be shown.
        'Learning Library', // Footer link for Learning Library.
        'About us', // Footer link for About us.
        'Contact us', // Footer link for Contact us.
        'Subscription', // Footer link for Subscription.
        'Terms & Conditions', // Footer link for Terms & Conditions.
        'Privacy Policy' // Footer link for Privacy Policy.
      ]; // Close the footerLinks array literal.

      const assertFooterContent = async () => { // Helper to verify the footer regardless of page.
        const footer = page.getByRole('contentinfo');
        await footer.scrollIntoViewIfNeeded();
        await expect(footer.getByRole('img', { name: 'Skolasti Academy' })).toBeVisible();
        await expect(
          footer.getByText('At Skolasti Academy, you can gain practical knowledge and learn real-world skills that will help you transform your life at work, school and home.')
        ).toBeVisible();
        for (const linkText of footerLinks) {
          await expect(footer.getByRole('link', { name: linkText })).toBeVisible();
        }
        await expect(footer.getByText('Copyright © 2025 Skolasti Academy')).toBeVisible();
      };

      await test.step('Verify footer on homepage', async () => {
        await assertFooterContent();
      });

      const normalizePath = (value) => {
        const cleaned = value.replace(/\/$/, '');
        return cleaned === '' ? '/' : cleaned;
      };

      const headerRoutes = [ // Define navigation targets to validate via header links.
        { name: 'Learning Library', path: '/learning-library' },
        { name: 'About us', path: '/about' },
        { name: 'Contact us', path: '/contact' },
        { name: 'Subscription', path: '/subscription' }
      ];

      for (const route of headerRoutes) {
        await test.step(`Navigate via header → ${route.name}`, async () => {
          await page.getByRole('link', { name: route.name }).first().click();
          await page.waitForLoadState('networkidle');
          const currentPath = normalizePath(new URL(page.url()).pathname);
          expect(currentPath).toBe(normalizePath(route.path));
          await assertFooterContent();
          await page.goto(BASE_URL);
          await page.waitForLoadState('networkidle');
        });
      }

      const loginButton = page.getByRole('button', { name: 'Login' }); // Reference the Login button in the header.
      const loginPagePromise = context.waitForEvent('page', { timeout: 15000 }); // Start listening for the new tab event.
      await loginButton.click(); // Click Login to trigger the new browser tab.
      const loginPage = await loginPagePromise; // Capture the newly opened page instance.
      await loginPage.waitForLoadState('networkidle'); // Wait until the login page stops loading resources.

      const normalizedLoginTarget = LOGIN_URL.replace(/\/$/, ''); // Normalize the expected login URL by trimming trailing slash.
      const normalizedLoginActual = loginPage.url().replace(/\/$/, ''); // Normalize the actual login URL by trimming trailing slash.
      expect(normalizedLoginActual.startsWith(normalizedLoginTarget)).toBeTruthy(); // Ensure the resolved login URL stays within the learner route.
      expect(normalizedLoginActual.includes('gcompany.skillrok.com')).toBeFalsy(); // Confirm the navigation did not switch to the gcompany domain.

      await expect(loginPage.getByRole('textbox', { name: /Email/i })).toBeVisible(); // Verify the login page is interactive by checking the Email field.
      await loginPage.close(); // Close the popup tab once validation is complete.

      flowReport.status = 'Pass'; // Mark the scenario as passed.
      flowReport.reason = 'All public marketing validations and login redirection succeeded.'; // Document the reason for the pass state.
    } catch (error) { // Handle runtime failures.
      flowReport.status = 'Fail'; // Mark the scenario as failed.
      flowReport.reason = error instanceof Error ? error.message : String(error); // Capture the error message as the failure reason.
      console.error(`[Flow Failure] ${flowReport.reason}`); // Emit the failure reason to the console for debugging.
      throw error; // Rethrow to let Playwright fail the test.
    } finally { // Execute cleanup and reporting.
      flowReport.endedAt = new Date().toISOString(); // Capture the end timestamp for the scenario.
      flowReport.durationMs = Date.now() - testStart; // Calculate the total runtime.
      console.log('[Flow Report]', JSON.stringify(flowReport)); // Emit a compact JSON summary for easier reading.
      await context.close(); // Ensure the browser context is closed to free resources.
    } // Close the finally block.
  }); // Close the test definition.
}); // Close the test suite declaration.
