import { test as setup } from '@playwright/test';

setup('authenticate as coach', async ({ page }) => {
  // Login to coach view directly
  await page.goto('https://patashala-testjan16-820.skillrok.com/coach/login');
  await new Promise(f => setTimeout(f, 5 * 1000));
  
  await page.getByRole('textbox', { name: /Email/i }).fill('gopikrishna2221@gmail.com');
  await page.getByRole('textbox', { name: /Password/i }).fill('Skolasti@123');
  await page.getByRole('button', { name: /Sign In|Submit/i }).click();
  await new Promise(f => setTimeout(f, 10 * 1000));

  // Save signed-in state to reuse in tests
  await page.context().storageState({ path: 'tests/.auth/coach-user.json' });
});
