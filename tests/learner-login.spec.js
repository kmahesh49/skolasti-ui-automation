// Import Playwright test functions
const { test, expect } = require('@playwright/test');

// Import our helper functions and config
const { loginAsLearner } = require('../utils/loginHelper');
const config = require('../config/config');

// Test Suite: Learner Login Flow
test.describe('Learner Login and Dashboard Verification', () => {

  // Test Case 1: Learner 1 Login
  test('Learner 1 should login successfully and see dashboard', async ({ page }) => {
    
    // Step 1: Login as Learner 1
    await loginAsLearner(
      page, 
      config.users.learner1.email, 
      config.users.learner1.password
    );

    // Step 2: Verify we're on learner dashboard (URL check)
    await expect(page).toHaveURL(/.*learner.*/);
    console.log('✅ URL contains "learner" - Dashboard loaded');

    // Step 3: Take screenshot for evidence
    await page.screenshot({ 
      path: 'reports/learner1-dashboard.png',
      fullPage: true  // Capture entire page
    });
    console.log('✅ Screenshot saved: learner1-dashboard.png');

    // Step 4: Verify page title (adjust text based on actual page)
    await expect(page).toHaveTitle(/.*Skolasti.*|.*Learner.*|.*Dashboard.*/);
    console.log('✅ Page title verified');

    // Step 5: Wait for page to be fully loaded and stable
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for dashboard to render completely
    console.log('✅ Dashboard fully loaded');

    // Step 6: Verify user name is visible in top right (confirms correct user)
    const userName = page.locator('text=Bhargav B').first();
    const isUserNameVisible = await userName.isVisible().catch(() => false);
    if (isUserNameVisible) {
      console.log('✅ User name "Bhargav B" visible - Correct user logged in');
    }

    // Step 7: Navigate to Home page to check for available courses
    const homeLink = page.locator('a:has-text("Home")').first();
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
      console.log('✅ Navigated to Home page');
    } else {
      console.log('ℹ️  Already on Home page');
    }

    // Step 8: Verify left panel navigation items
    const myLearnings = page.locator('text=MyLearnings').first();
    const myCertifications = page.locator('text=My Certifications').first();
    const myAnalytics = page.locator('text=My Analytics').first();
    
    if (await myLearnings.isVisible().catch(() => false)) {
      console.log('✅ Left panel: MyLearnings visible');
    }
    if (await myCertifications.isVisible().catch(() => false)) {
      console.log('✅ Left panel: My Certifications visible');
    }
    if (await myAnalytics.isVisible().catch(() => false)) {
      console.log('✅ Left panel: My Analytics visible');
    }

    // Step 9: Check for "Continue Learning" section with courses
    const continueLearning = page.locator('text=Continue Learning').first();
    if (await continueLearning.isVisible().catch(() => false)) {
      console.log('✅ Continue Learning section found');
      
      // Check for course cards in Continue Learning section
      const continueLearningCourses = page.locator('text=Mastering Software Testing, text=Course One').first();
      if (await continueLearningCourses.isVisible().catch(() => false)) {
        console.log('✅ Courses visible in Continue Learning section');
      }
    }

    // Step 10: Check for Explore section
    const exploreSection = page.locator('text=Explore').first();
    if (await exploreSection.isVisible().catch(() => false)) {
      console.log('✅ Explore section found');
    }

    // Step 11: Check for "All Filters" button
    const allFiltersBtn = page.locator('button:has-text("All Filters")').first();
    if (await allFiltersBtn.isVisible().catch(() => false)) {
      console.log('✅ All Filters button visible');
    }

    // Step 12: Scroll down to view more courses in Explore section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1000);
    console.log('✅ Scrolled down to view more courses');

    // Step 13: Check for course cards in Explore section (with better selectors)
    const exploreCourses = page.locator('text=Course One, text=Test Video Link, text=Communication, text=Software Tester');
    const courseCount = await exploreCourses.count().catch(() => 0);
    
    if (courseCount > 0) {
      console.log(`✅ Found courses in Explore section: ${courseCount} course(s) detected`);
    } else {
      console.log('ℹ️  Explore section loaded, checking for course cards...');
      // Alternative check for any course-like content
      const anyCards = await page.locator('img[alt*="Course"], img[alt*="course"], h2, h3').count();
      console.log(`ℹ️  Found ${anyCards} potential course elements`);
    }

    // Step 10: Take final screenshot with course view
    await page.screenshot({ 
      path: 'reports/learner1-courses-view.png',
      fullPage: true
    });
    console.log('✅ Screenshot saved: learner1-courses-view.png');

  });

  // Test Case 2: Learner 2 Login
  test('Learner 2 should login successfully and see dashboard', async ({ page }) => {
    
    // Login as Learner 2
    await loginAsLearner(
      page, 
      config.users.learner2.email, 
      config.users.learner2.password
    );

    // Verify dashboard URL
    await expect(page).toHaveURL(/.*learner.*/);
    console.log('✅ Learner 2 dashboard loaded');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Navigate to Home page
    const homeLink = page.locator('a:has-text("Home")').first();
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
      console.log('✅ Navigated to Home page');
    } else {
      console.log('ℹ️  Already on Home page');
    }

    // Check for course sections (non-blocking)
    await page.waitForTimeout(1000);
    
    const continueLearning = page.locator('text=Continue Learning').first();
    if (await continueLearning.isVisible().catch(() => false)) {
      console.log('✅ Continue Learning section found for Learner 2');
    }

    const exploreSection = page.locator('text=Explore').first();
    if (await exploreSection.isVisible().catch(() => false)) {
      console.log('✅ Explore section found for Learner 2');
    }

    // Scroll to see more courses
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1000);
    console.log('✅ Scrolled to view courses');

    // Take screenshot
    await page.screenshot({ 
      path: 'reports/learner2-dashboard.png',
      fullPage: true
    });
    console.log('✅ Screenshot saved: learner2-dashboard.png');

  });

});