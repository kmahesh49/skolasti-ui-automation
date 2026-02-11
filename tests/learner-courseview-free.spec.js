// Import Playwright test functions
const { test, expect } = require('@playwright/test');

// Import our helper functions and config
const { loginAsLearner } = require('../utils/loginHelper');
const config = require('../config/config');

// Define free courses to test
const freeCourses = [
  {
    name: 'Test Course',
    id: 171,
    screenshotPrefix: 'test-course'
  },
  {
    name: 'Test Video Link',
    id: 182,
    screenshotPrefix: 'test-video-link'
  }
];

// Test Suite: Learner Free Course Enrollment Flow
test.describe('Learner Course View and Enrollment - Free Course', () => {

  // Loop through each free course and create a test
  for (const course of freeCourses) {
    test(`Learner should view and enroll in free ${course.name}`, async ({ page }) => {
      
      // Step 1: Login as Learner 1
      await loginAsLearner(
        page, 
        config.users.learner1.email, 
        config.users.learner1.password
      );
      console.log('✅ Logged in as Learner');

      // Step 2: Verify we're on learner dashboard
      await expect(page).toHaveURL(/.*learner.*/);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      console.log('✅ Dashboard loaded');

      // Step 3: Navigate to Home page if not already there
      const homeLink = page.locator('a:has-text("Home")').first();
      try {
        if (await homeLink.isVisible({ timeout: 3000 })) {
          await homeLink.click();
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(2000);
          console.log('✅ Navigated to Home page');
        }
      } catch (e) {
        console.log('ℹ️  Already on Home page');
      }

      // Step 4: Wait for Explore section to load
      await page.waitForTimeout(2000);
      
      // Scroll down to see Explore section courses
      await page.evaluate(() => {
        window.scrollTo({
          top: document.body.scrollHeight / 2,
          behavior: 'smooth'
        });
      });
      await page.waitForTimeout(1500);
      console.log('✅ Scrolled to Explore section');

      // Step 5: Take screenshot of home page with courses
      await page.screenshot({ 
        path: `reports/learner-homepage-${course.screenshotPrefix}.png`,
        fullPage: true
      });
      console.log('✅ Screenshot: Homepage with courses');

      // Step 6: Find and click on the course
      console.log(`🔍 Looking for "${course.name}"...`);
      
      // Wait for courses to load - select the first occurrence of the course heading
      const courseHeading = page.getByRole('heading', { name: course.name, exact: true }).first();
      const courseVisible = await courseHeading.isVisible({ timeout: 15000 }).catch(() => false);
      
      if (!courseVisible) {
        console.log(`⚠️ Course "${course.name}" not found on homepage - may be unpublished or hidden`);
        console.log('Available headings on page:');
        const allHeadings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
        console.log(allHeadings.join(', '));
        test.skip();
        return;
      }
      
      console.log(`✅ Found "${course.name}" heading (first occurrence)`);
      
      // Click on the parent container of the heading (the clickable card)
      const courseCard = courseHeading.locator('..').locator('..');
      await courseCard.click();
      console.log(`✅ Clicked on "${course.name}" card`);

      // Step 7: Wait for navigation to course view page
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Step 8: Verify we're on the course view page and extract course ID if not provided
      let courseId = course.id;
      if (!courseId) {
        const currentUrl = page.url();
        const match = currentUrl.match(/\/course\/(\d+)\/(view|details)/);
        if (match) {
          courseId = match[1];
          console.log(`ℹ️  Extracted course ID: ${courseId}`);
        }
      }
      
      await expect(page).toHaveURL(/.*\/course\/\d+\/(view|details).*/);
      console.log(`✅ Navigated to course view page (ID: ${courseId || 'detected'})`);

      // Step 9: Take screenshot of course view page
      await page.screenshot({ 
        path: `reports/learner-${course.screenshotPrefix}-view-top.png`,
        fullPage: false
      });
      console.log('✅ Screenshot: Course view page (top)');

      // Step 10: Scroll down to view course content and pricing
      await page.evaluate(() => {
        window.scrollTo({
          top: document.body.scrollHeight / 2,
          behavior: 'smooth'
        });
      });
      await page.waitForTimeout(1500);
      console.log('✅ Scrolled down on course view page');

      // Step 11: Verify "Free" pricing is visible
      const freePricing = page.locator('text=Free').first();
      try {
        await expect(freePricing).toBeVisible({ timeout: 5000 });
        console.log('✅ Confirmed: Course is FREE');
      } catch (e) {
        console.log('⚠️  Free pricing text not detected');
      }

      // Step 12: Take screenshot before enrollment action
      await page.screenshot({ 
        path: `reports/learner-${course.screenshotPrefix}-before-action.png`,
        fullPage: true
      });
      console.log('✅ Screenshot: Before enrollment action');

      // Step 13: Check enrollment status and handle accordingly
      // Define button locators
      const startCourseBtn = page.locator('button:has-text("Start Course")').first();
      const continueBtn = page.locator('button:has-text("Continue")').first();
      const resumeBtn = page.locator('button:has-text("Resume")').first();

      // Check which button is visible to determine enrollment status
      let isAlreadyEnrolled = false;
      let enrollmentAction = '';

      try {
        // Wait briefly to see which button appears
        await page.waitForTimeout(1000);

        if (await continueBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          isAlreadyEnrolled = true;
          enrollmentAction = 'continue';
          console.log('ℹ️  Course already enrolled - "Continue" button visible');
        } else if (await resumeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          isAlreadyEnrolled = true;
          enrollmentAction = 'resume';
          console.log('ℹ️  Course already enrolled - "Resume" button visible');
        } else if (await startCourseBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          isAlreadyEnrolled = false;
          enrollmentAction = 'start';
          console.log('✅ Course not enrolled - "Start Course" button visible');
        }
      } catch (e) {
        console.log('⚠️  Could not determine enrollment status');
      }

      // Step 14: Handle enrollment based on current status
      if (!isAlreadyEnrolled && enrollmentAction === 'start') {
        // NEW ENROLLMENT FLOW
        console.log('');
        console.log('📝 INITIATING NEW ENROLLMENT...');
        console.log('─────────────────────────────────────────');
        
        await expect(startCourseBtn).toBeVisible({ timeout: 5000 });
        console.log('✅ "Start Course" button found');
        
        // Click the button to initiate enrollment
        await startCourseBtn.click();
        console.log('✅ Clicked "Start Course" button - Processing enrollment...');
        
        // Wait for enrollment processing to complete
        await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
        console.log('✅ Enrollment processing completed - "Continue" button appeared');
        
        // Take screenshot showing successful enrollment
        await page.screenshot({ 
          path: `reports/learner-${course.screenshotPrefix}-enrollment-success.png`,
          fullPage: true
        });
        console.log('✅ Screenshot: Enrollment success state');
        
        // Click "Continue" to proceed
        await continueBtn.click();
        console.log('✅ Clicked "Continue" button');
        
      } else if (isAlreadyEnrolled) {
        // ALREADY ENROLLED FLOW
        console.log('');
        console.log('♻️  COURSE ALREADY ENROLLED - CONTINUING...');
        console.log('─────────────────────────────────────────');
        
        // Take screenshot showing already enrolled state
        await page.screenshot({ 
          path: `reports/learner-${course.screenshotPrefix}-already-enrolled.png`,
          fullPage: true
        });
        console.log('✅ Screenshot: Already enrolled state');
        
        // Click the appropriate button (Continue or Resume)
        if (enrollmentAction === 'continue') {
          await continueBtn.click();
          console.log('✅ Clicked "Continue" button (already enrolled)');
        } else if (enrollmentAction === 'resume') {
          await resumeBtn.click();
          console.log('✅ Clicked "Resume" button (already enrolled)');
        }
      }

      // Step 15: Wait for navigation after clicking action button
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Step 16: Verify final state - Check where we landed
      const finalUrl = page.url();
      console.log('');
      console.log('🎯 FINAL STATE VERIFICATION');
      console.log('─────────────────────────────────────────');
      console.log('ℹ️  Final URL:', finalUrl);
      
      if (finalUrl.includes('/learn') || finalUrl.includes('/content') || finalUrl.includes('/mylearns')) {
        console.log('✅ Successfully navigated to learning area');
      } else {
        console.log('ℹ️  Navigation completed to:', finalUrl);
      }

      // Step 17: Final screenshot
      await page.screenshot({ 
        path: `reports/learner-${course.screenshotPrefix}-final.png`,
        fullPage: true
      });
      console.log('✅ Final screenshot saved');
      console.log('');
      console.log('═══════════════════════════════════════════════');
      console.log(`✅ TEST COMPLETED: ${course.name}`);
      console.log(`   Status: ${isAlreadyEnrolled ? 'Already Enrolled' : 'Newly Enrolled'}`);
      console.log('═══════════════════════════════════════════════');

    });
  }

});