// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Load environment variables at the config level
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  timeout: 600000, // 10 minutes for your long test
  expect: {
    timeout: 10000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  
  use: {
    actionTimeout: 10000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    
    // Video recording: 'retain-on-failure' or 'on' for always record
    video: {
      mode: 'on', // Always record videos (change to 'retain-on-failure' to save space)
      size: { width: 1280, height: 720 }
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});