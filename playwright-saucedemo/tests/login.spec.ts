import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('login with valid credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('login fails with wrong password', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username and password do not match');
  });

  test('Challenge 1: login fails with locked out user', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Sorry, this user has been locked out');
  });
});
