import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test.describe('Inventory Module Tests (POM)', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC11: Verify inventory page loads successfully', async () => {
    const isLoaded = await inventoryPage.isInventoryLoaded();
    expect(isLoaded).toBe(true);
  });

  test('TC12: Verify all products are displayed', async () => {
  const count = await inventoryPage.getProductCount();

  console.log("DEBUG Product Count:", count);

  expect(count).toBe(6);
});

  test('TC13: Sort products A to Z', async () => {
    await inventoryPage.sortProducts('az');
    const firstProduct = await inventoryPage.getFirstProductName();
    expect(firstProduct).toBe('Sauce Labs Backpack');
  });

  test('TC14: Sort products Z to A', async () => {
    await inventoryPage.sortProducts('za');
    const firstProduct = await inventoryPage.getFirstProductName();
    expect(firstProduct).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('TC15: Sort products by price (Low → High)', async () => {
    await inventoryPage.sortProducts('lohi');
    const firstPriceText = await inventoryPage.getFirstProductPrice();
    expect(firstPriceText).toBe('$7.99');
  });

  test('TC16: Sort products by price High → Low', async () => {
  await inventoryPage.sortProducts('hilo');
  const firstPrice = await inventoryPage.getFirstProductPrice();
  expect(firstPrice).toContain('$49.99');
  });

  test('TC17: Verify cart icon visible', async ({ page }) => {
  await expect(page.locator('.shopping_cart_link')).toBeVisible();
  });

  test('TC18: Verify inventory page URL', async ({ page }) => {
  await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('TC19: Verify Add To Cart button changes to Remove', async ({ page }) => {
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await expect(
    page.locator('#remove-sauce-labs-backpack')
  ).toBeVisible();
  });

  test('TC20: Verify product image displayed', async ({ page }) => {
  const image = page.locator('.inventory_item_img').first();
  await expect(image).toBeVisible();
  });

});