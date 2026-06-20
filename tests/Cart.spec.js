import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test.describe('Cart Module Tests (POM)', () => {
  let loginPage, inventoryPage, cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC31: Add single product to cart', async () => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe('1');
  });

  test('TC32: Add multiple products to cart', async () => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.addProductToCart('sauce-labs-bike-light');
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe('2');
  });

  test('TC33: Remove product from cart', async () => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    expect(await inventoryPage.isCartBadgeVisible()).toBe(true);
    await inventoryPage.removeProductFromCart('sauce-labs-backpack');
    expect(await inventoryPage.isCartBadgeVisible()).toBe(false);
  });

  test('TC34: Verify cart badge count updates correctly', async () => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.addProductToCart('sauce-labs-bike-light');
    expect(await inventoryPage.getCartBadgeCount()).toBe('2');
    
    await inventoryPage.removeProductFromCart('sauce-labs-backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');
  });

  test('TC35: Verify product details in cart page', async ({ page }) => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.clickCart();

    await expect(page).toHaveURL(/.*cart.html/);
    expect(await cartPage.getFirstItemName()).toBe('Sauce Labs Backpack');
    expect(await cartPage.getFirstItemPrice()).toBe('$29.99');
    expect(await cartPage.getFirstItemQuantity()).toBe('1');
  });

  test('TC36: Verify cart is empty initially', async ({ page }) => {
  await inventoryPage.clickCart();
  const items = await page.locator('.cart_item').count();
  expect(items).toBe(0);
  });

  test('TC37: Verify Checkout button navigation', async ({ page }) => {
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.clickCart();
  await page.click('#checkout');
  await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test('TC38: Verify multiple products displayed in cart', async ({ page }) => {
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.addProductToCart('sauce-labs-bike-light');
  await inventoryPage.clickCart();
  const items = await page.locator('.cart_item').count();
  expect(items).toBe(2);
  });

  test('TC39: Verify cart badge removed after deleting last item', async ({ page }) => {
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.clickCart();
  await page.click('#remove-sauce-labs-backpack');
  await page.click('#continue-shopping');
  expect(await inventoryPage.isCartBadgeVisible()).toBe(false);
  });

  test('TC40: Verify cart item name matches inventory item', async ({ page }) => {
  await inventoryPage.addProductToCart('sauce-labs-bike-light');
  await inventoryPage.clickCart();
  const itemName = await page.locator('.inventory_item_name').first().textContent();
  expect(itemName).toContain('Sauce Labs Bike Light');
  });
});