import { test, expect } from '@playwright/test';

test('Challenge 2: sorting products by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // Change sort order
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // Assert first item price is lowest
  const prices = await page.locator('.inventory_item_price').allInnerTexts();
  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
  
  expect(numericPrices[0]).toBe(Math.min(...numericPrices));
});
