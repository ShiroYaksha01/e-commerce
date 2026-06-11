import { test, expect } from '@playwright/test';

test('Challenge 3: logout from the system', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // Open menu
  await page.getByRole('button', { name: /open menu/i }).click();

  // Click logout
  await page.getByRole('link', { name: /logout/i }).click();

  // Assert login page visible
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
});
