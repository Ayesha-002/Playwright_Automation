import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
test.describe('Login Module Tests (POM)', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC01: Login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('TC02: Login with invalid username', async ({ page }) => {
    await loginPage.login('invalid_user', 'secret_sauce');
    const err = await loginPage.getErrorMessage();
    await expect(err).toContain('Username and password do not match any user in this service');
  });

  test('TC03: Login with invalid password', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong_password');
    const err = await loginPage.getErrorMessage();
    await expect(err).toContain('Username and password do not match any user in this service');
  });

  test('TC04: Login with empty username and password', async ({ page }) => {
    await loginPage.login('', '');
    const err = await loginPage.getErrorMessage();
    await expect(err).toContain('Username is required');
  });

  test('TC05: Verify error message for locked out user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    const err = await loginPage.getErrorMessage();
    await expect(err).toContain('Sorry, this user has been locked out.');
  });

  test('TC06: Verify login page title', async ({ page }) => {
  await expect(page).toHaveTitle('Swag Labs');
  });

  test('TC07: Verify username field is visible', async ({ page }) => {
  await expect(page.locator('#user-name')).toBeVisible();
  });

  test('TC08: Verify password field is visible', async ({ page }) => {
  await expect(page.locator('#password')).toBeVisible();
  });

  test('TC09: Verify login with empty username', async () => {
  await loginPage.login('', 'secret_sauce');
  const err = await loginPage.getErrorMessage();
  expect(err).toContain('Username is required');
  });

  test('TC10: Verify login with empty password', async () => {
  await loginPage.login('standard_user', '');
  const err = await loginPage.getErrorMessage();
  expect(err).toContain('Password is required');
  });

});