export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.pageTitle = page.locator('.title');
    this.successHeader = page.locator('.complete-header');
    this.successText = page.locator('.complete-text');
    this.errorMessage = page.locator('[data-test="error"]');
    this.cancelButton = page.locator('#cancel');
    this.backHomeButton = page.locator('#back-to-products');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.totalAmount = page.locator('.summary_total_label');
  }

  async fillInformation(firstName, lastName, postalCode) {
    if (firstName !== undefined && firstName !== '') await this.firstNameInput.fill(firstName);
    if (lastName !== undefined && lastName !== '') await this.lastNameInput.fill(lastName);
    if (postalCode !== undefined && postalCode !== '') await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async isOverviewLoaded() {
    return await this.pageTitle.isVisible() && (await this.pageTitle.textContent() === 'Checkout: Overview');
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async getSuccessHeader() {
    return await this.successHeader.textContent();
  }

  async getSuccessText() {
    return await this.successText.textContent();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async clickCancel() {
  await this.cancelButton.click();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }

  async isItemTotalVisible() {
    return await this.itemTotal.isVisible();
  }

  async isTotalAmountVisible() {
    return await this.totalAmount.isVisible();
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}