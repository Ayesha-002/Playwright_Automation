import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test.describe('Checkout Module Tests (POM)', () => {
  let loginPage, inventoryPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC21: Complete checkout with valid data', async () => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.clickCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillInformation('Sheza', 'Rafiq', '12345');
    await checkoutPage.clickContinue();

    expect(await checkoutPage.isOverviewLoaded()).toBe(true);
    await checkoutPage.clickFinish();

    expect(await checkoutPage.getSuccessHeader()).toBe('Thank you for your order!');
  });

  test('TC22: Checkout with empty first name', async () => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.clickCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillInformation('', 'Rafiq', '12345');
    await checkoutPage.clickContinue();

    const err = await checkoutPage.getErrorMessage();
    expect(err).toContain('Error: First Name is required');
  });

  test('TC23: Checkout with empty last name', async () => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.clickCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillInformation('Sheza', '', '12345');
    await checkoutPage.clickContinue();

    const err = await checkoutPage.getErrorMessage();
    expect(err).toContain('Error: Last Name is required');
  });

  test('TC24: Checkout with empty postal code', async () => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.clickCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillInformation('Sheza', 'Rafiq', '');
    await checkoutPage.clickContinue();

    const err = await checkoutPage.getErrorMessage();
    expect(err).toContain('Error: Postal Code is required');
  });

  test('TC25: Verify order confirmation message', async () => {
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.clickCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillInformation('Sheza', 'Rafiq', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    expect(await checkoutPage.getSuccessHeader()).toBe('Thank you for your order!');
    expect(await checkoutPage.getSuccessText()).toContain('Your order has been dispatched');
  });

  test('TC26: Verify cancel button from checkout information page', async ({ page }) => {
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.clickCart();
  await cartPage.clickCheckout();
  await page.click('#cancel');
  await expect(page).toHaveURL(/.*cart.html/);
  });

  test('TC27: Verify item total is displayed', async ({ page }) => {
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.clickCart();
  await cartPage.clickCheckout();
  await checkoutPage.fillInformation('Sheza', 'Rafiq', '12345');
  await checkoutPage.clickContinue();
  await expect(page.locator('.summary_subtotal_label')).toBeVisible();
  });

  test('TC28: Verify total amount is displayed', async ({ page }) => {
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.clickCart();
  await cartPage.clickCheckout();
  await checkoutPage.fillInformation('Sheza', 'Rafiq', '12345');
  await checkoutPage.clickContinue();
  await expect(page.locator('.summary_total_label')).toBeVisible();
  });

  test('TC29: Verify Back Home button functionality', async ({ page }) => {
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.clickCart();
  await cartPage.clickCheckout();
  await checkoutPage.fillInformation('Sheza', 'Rafiq', '12345');
  await checkoutPage.clickContinue();
  await checkoutPage.clickFinish();
  await page.click('#back-to-products');
  await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('TC30: Verify checkout with alphanumeric postal code', async () => {
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.clickCart();
  await cartPage.clickCheckout();
  await checkoutPage.fillInformation('Sheza', 'Rafiq', 'AB123');
  await checkoutPage.clickContinue();
  expect(await checkoutPage.isOverviewLoaded()).toBe(true);
  });
});