import { test as setup } from '@playwright/test';

setup('authenticate as coach', async ({ page }) => {
  // Login to learner view
  await page.goto('https://skolastidev1.skolasti.com/learner/login');
  await new Promise(f => setTimeout(f, 5 * 1000));
  
  await page.getByRole('textbox', { name: 'Email' }).fill('Sirisha.b@inovar-tech.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Skolasti@123');
  await page.getByRole('button', { name: ' Submit' }).click();
  await new Promise(f => setTimeout(f, 10 * 1000));

  // Switch to coach view
  await page.getByRole('button', { name: 'Switch to coach view' }).click();
  await new Promise(f => setTimeout(f, 5 * 1000));

  // Save signed-in state to reuse in tests
  await page.context().storageState({ path: 'tests/.auth/coach-user.json' });
});
